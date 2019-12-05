function toggleSelectedGridItem() {
  const   dayCardArray = document.querySelectorAll('.grid-item');

  dayCardArray.forEach(card => {
    card.addEventListener('click', (e) => {
      const targetDate = e.currentTarget.children[1].id;            
            
      dayCardArray.forEach(card => {
        if (!(targetDate === JSON.parse(localStorage.getItem('selectedDay')))){
          card.classList.remove('active-item')  
        }
      })
      if ((targetDate === JSON.parse(localStorage.getItem('selectedDay')) && (card.classList.contains('active-item')))) {
        card.classList.remove('active-item')
        toggleSidebarDateSelection()
        localStorage.setItem('selectedDay', JSON.stringify('unspecified'))
        updateTodolistInDOM(JSON.parse(localStorage.getItem('selectedDay')))
      }
      else {
        card.classList.add('active-item')
        localStorage.setItem('selectedDay', JSON.stringify(targetDate))
        toggleSidebarDateSelection(targetDate)
        updateTodolistInDOM(targetDate)
      }
    })
  });
}

function toggleSidebarDateSelection(targetDate) {
  const selectedDate = document.querySelector('.selected-date'),
        unselectedDate = document.querySelector('.unselected');

  if (targetDate) {
    selectedDate.style = 'display: flex'
    unselectedDate.style = 'display: none'
    buildSidebarDate(targetDate)
  }
  else {
    selectedDate.style = 'display: none'
    unselectedDate.style = 'display: flex'
  }
}

function buildSidebarDate(targetDate) {
  const selectedDateTitle = document.querySelector('.selected-date h3'),
        selectedDayOfTheWeek = document.querySelector('.selected-date h2'),
        selectedDateHoliday = document.querySelector('.selected-date p'),
        selectedDateInfoArray = JSON.parse(localStorage.getItem('apiMonth'));
        
  selectedDateInfoArray.forEach(dag => {
    if (dag.datum === targetDate) {
      let helgdagText;
      
      selectedDateTitle.innerText = dag.datum
      selectedDayOfTheWeek.innerText = dag.veckodag
      helgdagText = (dag.helgdag === undefined) ? 'Inte en helgdag!' : dag.helgdag
      selectedDateHoliday.innerText = helgdagText
      if (helgdagText != 'Inte en helgdag!') {
        selectedDateHoliday.style.color = '#fefefe'
      }
      else {
        selectedDateHoliday.style.color = '#fefefe60'
      }
    }   
  });

}
