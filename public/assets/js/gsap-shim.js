/* GSAP 3 compatibility shim for theme.js (written for GSAP 2 / TweenMax) */
(function () {
  var easings = ["Power0", "Power1", "Power2", "Power3", "Power4"];
  easings.forEach(function (name, i) {
    var n = i;
    window[name] = {
      easeIn: "power" + n + ".in",
      easeOut: "power" + n + ".out",
      easeInOut: "power" + n + ".inOut",
    };
  });

  window.Expo = {
    easeIn: "expo.in",
    easeOut: "expo.out",
    easeInOut: "expo.inOut",
  };

  window.Sine = {
    easeIn: "sine.in",
    easeOut: "sine.out",
    easeInOut: "sine.inOut",
  };

  window.Circ = {
    easeIn: "circ.in",
    easeOut: "circ.out",
    easeInOut: "circ.inOut",
  };
})();
