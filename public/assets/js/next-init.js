(function () {
  "use strict";

  function fireLoad() {
    if (!window.jQuery) return;
    window.jQuery(window).trigger("load");
  }

  function fireLoadWhenReady() {
    if (!window.jQuery) {
      setTimeout(fireLoadWhenReady, 16);
      return;
    }
    fireLoad();
  }

  function init() {
    if (document.body.dataset.matPreloader === "true") return;
    var isMatPh = !!document.querySelector("#page-header.mat-ph-enter");
    setTimeout(fireLoad, isMatPh ? 0 : 50);
  }

  function ensureHeroVisible() {
    var header = document.querySelector("#page-header.mat-ph-enter:not(.mat-ph-enter-done)");
    if (!header) return;
    header.classList.add("mat-ph-enter-done");
    header.querySelectorAll(
      ".page-header-inner, .ph-appear, .project-info-list > ul, .ph-image img, .scroll-down-circle, .made-with-love"
    ).forEach(function (el) {
      el.style.opacity = "1";
      el.style.visibility = "visible";
      el.style.transform = "none";
    });
  }

  function watchMatPhEnter() {
    var root = document.getElementById("content-wrap") || document.body;
    if (!root || !window.MutationObserver) return;

    var timer;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (!document.querySelector("#page-header.mat-ph-enter:not(.mat-ph-enter-done)")) return;
        fireLoadWhenReady();
        setTimeout(ensureHeroVisible, 2500);
      }, 80);
    }).observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === "complete") {
    init();
    setTimeout(ensureHeroVisible, 2500);
  } else {
    window.addEventListener("load", function () {
      init();
      setTimeout(ensureHeroVisible, 2500);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchMatPhEnter);
  } else {
    watchMatPhEnter();
  }
})();
