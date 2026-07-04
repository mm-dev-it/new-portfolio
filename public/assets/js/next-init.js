(function () {
  "use strict";

  function fireLoad() {
    if (!window.jQuery) return;
    window.jQuery(window).trigger("load");
  }

  function init() {
    if (document.body.dataset.matPreloader === "true") return;
    setTimeout(fireLoad, 50);
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
