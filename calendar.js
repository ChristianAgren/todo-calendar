async function logData() {
  let year = 2019,
    monthIndex = 11,
    response = await fetch(`https://api.dryg.net/dagar/v2.1/${year}`);

  const myJson = await response.json();

  updateMonth(myJson, monthIndex, year);
  mouseEvents(myJson, monthIndex, year);
  toggleSelectedGridItem();
}

function buildCalendar(myJson, months, monthIndex) {
  myJson.dagar.forEach(dag => {
    if (
      dag.datum.split("-")[1] ===
      months.number[monthIndex % months.number.length]
    ) {
      createDayCard(dag);
    }
  });
}

function updateMonth(myJson, monthIndex, year) {
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
    months.name[monthIndex % months.number.length];
  document.querySelector(".year").innerHTML = year;

  buildCalendar(myJson, months, monthIndex);
}

function clearCalendar() {
  let clearArr = document.querySelectorAll(".grid-item");

  clearArr.forEach(day => {
    day.parentNode.removeChild(day);
  });
}

function createDayCard(dag) {
  const div = document.createElement("div"),
    h5 = document.createElement("h5"),
    p = document.createElement("p");

  div.classList.add("grid-item");

  div.append(p);
  p.append(dag.veckodag);

  div.append(h5);
  h5.append(dag.datum.split("-")[2]);

  document.querySelector(".cal-grid").append(div);
}

function mouseEvents(myJson, monthIndex, year) {
  let buttons = document.querySelectorAll("button");

  (monthIndex = 11), (year = 2019);

  buttons.forEach(button => {
    button.addEventListener("click", function(event) {
      clearCalendar();

      if (event.target.id === "left") {
        monthIndex--;
        if (monthIndex < 0) {
          monthIndex = 11;
          year--;
        }

        updateMonth(myJson, monthIndex, year);
      } else if (event.target.id === "right") {
        monthIndex++;
        if (monthIndex > 11) {
          monthIndex = 0;
          year++;
        }

        updateMonth(myJson, monthIndex, year);
      }
    });
  });

//   $(".grid-item").click( function() {
//       $(this).toggleClass("active-item")
//   })
}
