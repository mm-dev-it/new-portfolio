/*
 * Carica gli script del tema legacy in sequenza, senza bloccare il rendering.
 * Prima jQuery/GSAP stavano in <head> come script sincroni (~290 KB che bloccavano il primo paint).
 * Gli script inseriti dinamicamente con async=false vengono eseguiti nell'ordine di inserimento,
 * quindi theme.js trova sempre jQuery e GSAP già pronti.
 */
(function () {
  "use strict";
  // theme.bundle.js = jQuery + GSAP + plugin + theme.js + init (generato da scripts/bundle-theme.mjs).
  var scripts = ["/assets/js/theme.bundle.js"];
  var extra = document.currentScript && document.currentScript.getAttribute("data-extra");
  if (extra) scripts = scripts.concat(extra.split(","));

  var frag = document.createDocumentFragment();
  scripts.forEach(function (src) {
    var s = document.createElement("script");
    s.src = src;
    s.async = false;
    frag.appendChild(s);
  });
  document.body.appendChild(frag);
})();
