function toggleSelectedGridItem() {
  console.log("JEH");

  $(".grid-item").click(function() {
    if (!$(this).hasClass("active-item")) {
      let gridItemList = document.querySelectorAll(".grid-item");
      gridItemList.forEach(item => {
        $(item).removeClass("active-item");
      });
    }
    $(this).toggleClass("active-item");
  });
}