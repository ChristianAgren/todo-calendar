async function updateMonth() {
  const currentCalendarMonth = await defineAPI();
  clearCalendarMonth();
  buildCalendarMonth(currentCalendarMonth);  
}

async function defineAPI() {

  const date = new Date(),
        calendarActive = JSON.parse(localStorage.getItem('calendarstatus')) || false,
        year = (calendarActive) ? calendarActive[0] : date.getFullYear(),
        month = (calendarActive) ? calendarActive[1] : date.getMonth(),
        firstTime = JSON.parse(localStorage.getItem('selectedDay')) || false;

        let   day = date.getDate();
              day = (day < 10) ? "0" + day : day
        
  const today = `${date.getFullYear()}-${date.getMonth()+1}-${day}`;
          
  const response = await fetch(`https://api.dryg.net/dagar/v2.1/${year}/${month+1}`),
  myJson = await response.json();
  
  localStorage.setItem('calendarstatus', JSON.stringify([year, month]))
  localStorage.setItem('apiMonth', JSON.stringify(myJson.dagar))
  if (!firstTime) {
    localStorage.setItem('selectedDay', JSON.stringify(today))
  }
  return myJson.dagar
}

function addStaticEventListeners() {
  const buttons = document.querySelectorAll(".cal-header button"),
    toggleCalButton = document.querySelector(".cal-toggle");
      
  
  toggleCalButton.addEventListener("click", function () {
    $(".calendar").toggleClass("short-mode")

    if($(".short-mode").css("display") === undefined) {
      $(".todo-list").hide()
      $(".add-todo").hide()
    }
    else {
      $(".todo-list").show()
      $(".add-todo").show()
    }

  })
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const currentLocation = JSON.parse(localStorage.getItem('calendarstatus'));
            
      let   year = currentLocation[0],
            month = currentLocation[1];      

      if (event.target.id === 'left') {
        if (month === 0) {
          month = 11
          year--
        }
        else{
          month--
        }
        localStorage.setItem('calendarstatus', JSON.stringify([year, month]))
      }
      else {
        if (month === 11) {
          month = 0
          year++
        }
        else{
          month++
        }
        localStorage.setItem('calendarstatus', JSON.stringify([year, month]))
      }
      updateMonth()
    })
  });
}

function clearCalendarMonth() {
  let clearArr = document.querySelectorAll(".cal-grid > div");

  clearArr.forEach(day => {
    day.parentNode.removeChild(day);
  });
}

function buildCalendarMonth(month) {
  const firstDayOfMonthIndex = month[0]['dag i vecka']-1,
        lastDayOfMonthIndex = month[month.length-1]['dag i vecka'],
        calendar = document.querySelector(".cal-grid");        

  for (i = 0; i < firstDayOfMonthIndex; i++) {
    createEmptyDayCard(calendar)
  }
  month.forEach(day => {
    createDayCard(day, calendar)
  });

  for (i = lastDayOfMonthIndex; i < 7; i++) {
    createEmptyDayCard(calendar)
  }

  toggleSelectedGridItem();
  updateMonthInDOM();
}

function findIndexOfCurrentDay(myJson, today) {
  
  for (i = 0; i < myJson.dagar.length; i++) {
    if (myJson.dagar[i].datum === today){
      return i  
    }
  }
}

function updateMonthInDOM() {

  const calendarStatus = JSON.parse(localStorage.getItem('calendarstatus'))
  
  const months = {
    number: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ],
    name: [
      "JANUARI",
      "FEBRUARI",
      "MARS",
      "APRIL",
      "MAJ",
      "JUNI",
      "JULI",
      "AUGUSTI",
      "SEPTEMBER",
      "OKTOBER",
      "NOVEMBER",
      "DECEMBER"
    ]
  };
  document.querySelector('.unselected h2').innerHTML = 
  months.name[calendarStatus[1] % months.name.length];

  document.querySelector(".month").innerHTML =
    months.name[calendarStatus[1] % months.name.length];
  document.querySelector(".year").innerHTML = calendarStatus[0];
}

function createEmptyDayCard(calendar) {
  const div = document.createElement('div');

  div.classList.add('empty-item')
  calendar.append(div)
}

function createDayCard(dag, calendar) {
  const div = document.createElement("div"),
    h5 = document.createElement("h5"),
    p = document.createElement("p"),
    ul = document.createElement('ul'),
    activeDay = JSON.parse(localStorage.getItem('selectedDay'));
    

  div.classList.add("grid-item");
  ul.classList.add("todos-for-day")
  ul.id = dag.datum
  div.append(p, ul);
  div.append(h5);
  p.append(dag.veckodag);

  if (activeDay === dag.datum) {
    div.classList.add("active-item")
    updateTodolistInDOM(activeDay)
    toggleSidebarDateSelection(activeDay)
  }

  if ('helgdag' in dag) {
    const helgdag = document.createElement('p');
    helgdag.classList.add("helgdag")
    helgdag.append(dag.helgdag)
    div.append(helgdag)
  }
  h5.append(dag.datum.split("-")[2]);
  calendar.append(div);
  addTodosToDayCard(ul, dag)
}

function addTodosToDayCard(ul, dag) {
  const localstorageTodoArray = JSON.parse(localStorage.getItem(dag.datum)) || undefined
  
  if (localstorageTodoArray != undefined) {
    if (localstorageTodoArray.length < 5) {
      localstorageTodoArray.forEach(todo => {
        const li = document.createElement('li')
        ul.append(li)
      });
    }
    else {
      const li = document.createElement('li')
      li.append(localstorageTodoArray.length)
      ul.append(li)
    }
  }
}

  