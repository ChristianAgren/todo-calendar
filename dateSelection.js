// function toggleSelectedGridItem() {
//   $(".grid-item").click(function(element) {
//     const targetDate = element.currentTarget.children[1].id;
//     if (!$(this).hasClass("active-item")) {
//       let gridItemList = document.querySelectorAll(".grid-item");
//       gridItemList.forEach(item => {
//         $(item).removeClass("active-item");
//       });
//     }
//     $(this).toggleClass("active-item");
//   });
//   defineTODOs(targetDate)
// }

function toggleSelectedGridItem() {
  const dayCardArray = document.querySelectorAll('.grid-item');

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
        localStorage.setItem('selectedDay', JSON.stringify('not available'))
        updateTodolistInDOM(JSON.parse(localStorage.getItem('selectedDay')))
      }
      else {
        card.classList.add('active-item')      
        localStorage.setItem('selectedDay', JSON.stringify(targetDate))
        updateTodolistInDOM(targetDate)
      }
    })
  });
}
