window.addEventListener("load", init);

function init() {
  updateMonth();
  addStaticEventListeners();
  defineClock();
  initTODOs();
}
