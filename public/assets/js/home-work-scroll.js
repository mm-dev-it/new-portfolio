(function () {
  "use strict";

  var initialized = false;
  var ctx = null;
  var runId = 0;

  function waitForImages(container) {
    var images = container.querySelectorAll("img");
    return Promise.all(
      Array.prototype.map.call(images, function (img) {
        return new Promise(function (resolve) {
          // Le slide fuori viewport sono loading="lazy": non aspettarle, hanno già width/height.
          if (img.complete || img.loading === "lazy") {
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

  function wantsSmoother() {
    return (
      document.body.classList.contains("tt-smooth-scroll") &&
      !document.body.classList.contains("tt-no-smooth-scroll")
    );
  }

  function waitForSmoother(cb, attempt) {
    attempt = attempt || 0;
    var hasLib = typeof ScrollSmoother !== "undefined";
    var smoother = hasLib ? ScrollSmoother.get() : null;

    if (wantsSmoother() && hasLib && !smoother && attempt < 80) {
      window.setTimeout(function () {
        waitForSmoother(cb, attempt + 1);
      }, 50);
      return;
    }

    cb(smoother || null);
  }

  function killExisting() {
    runId += 1;
    if (ctx) {
      ctx.revert();
      ctx = null;
    }
    initialized = false;
  }

  function build(smoother, track, workSection, trackWrap, pinEl, myRun) {
    if (myRun !== runId) return;

    // ScrollSmoother applies a transform on #content-wrap.
    // position:fixed pins break inside transformed ancestors → blank/black pin.
    var useTransformPin = !!smoother;

    ctx = gsap.context(function () {
      var getScrollAmount = function () {
        var amount = track.scrollWidth - trackWrap.clientWidth;
        return amount > 0 ? -amount : 0;
      };

      var scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: workSection,
          start: "top top",
          end: function () {
            var amount = track.scrollWidth - trackWrap.clientWidth;
            return "+=" + Math.max(amount, window.innerHeight);
          },
          pin: pinEl,
          pinSpacing: true,
          pinType: useTransformPin ? "transform" : "fixed",
          scrub: true,
          invalidateOnRefresh: true,
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
              containerAnimation: scrollTween,
              start: "left 98%",
              end: isLast ? "left 72%" : "left 38%",
              scrub: true,
            },
          },
        );
      });
    }, workSection);

    window.requestAnimationFrame(function () {
      if (myRun !== runId) return;
      ScrollTrigger.refresh(true);
    });
  }

  function init() {
    if (initialized || !canInit()) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

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
    var pinEl = document.querySelector(".mat-work-pin");
    if (!track || !workSection || !trackWrap || !pinEl) return;

    initialized = true;
    gsap.registerPlugin(ScrollTrigger);

    var myRun = runId;

    waitForSmoother(function (smoother) {
      if (myRun !== runId) return;

      waitForImages(track).then(function () {
        build(smoother, track, workSection, trackWrap, pinEl, myRun);
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
          killExisting();
          tryInit(0);
        }, 150);
      },
      { once: true },
    );
  }
})();
