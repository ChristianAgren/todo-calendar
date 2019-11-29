function toggleSelectedGridItem() {
  $(".grid-item").click(function(element) {
    console.log(element.currentTarget);

    if (!$(this).hasClass("active-item")) {
      let gridItemList = document.querySelectorAll(".grid-item");
      gridItemList.forEach(item => {
        $(item).removeClass("active-item");
      });
    }
    $(this).toggleClass("active-item");
  });
}
