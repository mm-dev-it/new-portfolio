(function () {
  "use strict";

  var initialized = false;

  function waitForImages(container) {
    var images = container.querySelectorAll("img");
    return Promise.all(
      Array.prototype.map.call(images, function (img) {
        return new Promise(function (resolve) {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }),
    );
  }

  function canInit() {
    if (document.body.dataset.matPreloader === "true") return false;
    if (
      document.documentElement.classList.contains("mat-preload-home") &&
      !document.documentElement.classList.contains("mat-preload-done")
    ) {
      return false;
    }
    if (
      document.documentElement.classList.contains("mat-preload-home") &&
      !document.documentElement.classList.contains("mat-page-enter")
    ) {
      return false;
    }
    return true;
  }

  function getScroller() {
    return document.documentElement.classList.contains("home-native-scroll") ||
      document.body.classList.contains("tt-no-smooth-scroll")
      ? window
      : "body";
  }

  function init() {
    if (initialized || !canInit()) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      initialized = true;
      return;
    }

    var track = document.getElementById("mat-work-track");
    var workSection = document.querySelector(".mat-work-section");
    var trackWrap = document.querySelector(".mat-work-track-wrap");
    if (!track || !workSection || !trackWrap) return;

    initialized = true;
    gsap.registerPlugin(ScrollTrigger);

    waitForImages(track).then(function () {
      var scroller = getScroller();

      var getScrollAmount = function () {
        var amount = track.scrollWidth - trackWrap.clientWidth;
        return amount > 0 ? -amount : 0;
      };

      var scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: workSection,
          scroller: scroller,
          start: "top top",
          end: function () {
            var amount = track.scrollWidth - trackWrap.clientWidth;
            return "+=" + Math.max(amount, window.innerHeight);
          },
          pin: ".mat-work-pin",
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      var slides = gsap.utils.toArray(".mat-work-slide");
      slides.forEach(function (slide, index) {
        if (slide.classList.contains("mat-work-slide--intro")) return;

        var inner = slide.querySelector(".mat-work-slide-inner");
        if (!inner) return;

        var isLast = index === slides.length - 1;
        var enterY = isLast ? 0 : "38vh";

        gsap.fromTo(
          inner,
          {
            y: enterY,
            opacity: isLast ? 0.45 : 0.3,
          },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              scroller: scroller,
              containerAnimation: scrollTween,
              start: "left 98%",
              end: isLast ? "left 72%" : "left 38%",
              scrub: 1,
            },
          },
        );
      });

      window.requestAnimationFrame(function () {
        ScrollTrigger.refresh(true);
      });
    });
  }

  function tryInit(attempt) {
    if (initialized) return;
    init();
    if (!initialized && attempt < 50) {
      window.setTimeout(function () {
        tryInit(attempt + 1);
      }, 120);
    }
  }

  function start() {
    window.setTimeout(function () {
      tryInit(0);
    }, 400);
  }

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }

  window.addEventListener("mat-work-scroll-refresh", function () {
    if (!initialized) {
      tryInit(0);
      return;
    }
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh(true);
    }
  });

  if (document.documentElement.classList.contains("mat-preload-home")) {
    window.addEventListener(
      "mat-preload-done",
      function () {
        window.setTimeout(function () {
          tryInit(0);
        }, 100);
      },
      { once: true },
    );
  }
})();
