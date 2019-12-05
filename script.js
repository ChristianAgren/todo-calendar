window.addEventListener("load", init);

function init() {
  updateMonth();
  // defineToday();
  addStaticEventListeners();
  defineClock();
  initTODOs();
}
