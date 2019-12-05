async function updateMonth() {
  const currentCalendarMonth = await defineAPI();
  clearCalendarMonth();
  buildCalendarMonth(currentCalendarMonth);
}

async function defineAPI() {

  const date = new Date(),
        calendarActive = JSON.parse(localStorage.getItem('calendarstatus')) || false,
        year = (calendarActive) ? calendarActive[0] : date.getFullYear(),
        month = (calendarActive) ? calendarActive[1] : date.getMonth();

        let   day = date.getDate();
              day = (day < 10) ? "0" + day : day
        
  const today = `${date.getFullYear()}-${date.getMonth()+1}-${day}`;
          
  localStorage.setItem('calendarstatus', JSON.stringify([year, month]))
          
  const response = await fetch(`https://api.dryg.net/dagar/v2.1/${year}/${month+1}`),
        myJson = await response.json();
          
  defineToday(myJson, today)

  return myJson.dagar
}

function addStaticEventListeners() {
  let buttons = document.querySelectorAll(".cal-header button");

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
  let clearArr = document.querySelectorAll(".grid-item");

  clearArr.forEach(day => {
    day.parentNode.removeChild(day);
  });
}

function buildCalendarMonth(month) {
  month.forEach(day => {
    createDayCard(day)
  });
  toggleSelectedGridItem();
  updateMonthInDOM();
}

function defineToday(myJson, today) {
  const checkLocalstorage = JSON.parse(localStorage.getItem('dayOfTheWeek')) || false

  if (!checkLocalstorage) {
    localStorage.setItem('selectedDay', JSON.stringify(today))
    const indexOfCurrentDay = findIndexOfCurrentDay(myJson, today),
          currentDayInfo = myJson.dagar[indexOfCurrentDay],
          dayOfWeek = currentDayInfo.veckodag,
          helgdag = currentDayInfo.helgdag || 'Inte en helgdag!',
          dayInfoToLocalstorage = [dayOfWeek, helgdag];
    localStorage.setItem('dayOfTheWeek', JSON.stringify(dayInfoToLocalstorage ))  
          
  }
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

  document.querySelector(".month").innerHTML =
    months.name[calendarStatus[1] % months.name.length];
  document.querySelector(".year").innerHTML = calendarStatus[0];
}

function createDayCard(dag) {
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
  document.querySelector(".cal-grid").append(div);
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
