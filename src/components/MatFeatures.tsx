"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MatCookieConsent from "./MatCookieConsent";
import MatPageEnter from "./MatPageEnter";

type MatFeaturesProps = {
  showPreloader?: boolean;
};

declare global {
  interface Window {
    ScrollSmoother?: {
      get: () => {
        progress: number;
        scrollTop: (value?: number) => number | void;
      } | null;
    };
    gsap?: {
      ticker: {
        add: (fn: () => void) => void;
        remove: (fn: () => void) => void;
      };
    };
    jQuery?: (sel: unknown) => {
      trigger: (event: string) => void;
    };
  }
}

function ScrollProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("mat-scroll-bar");
    if (!bar) return;

    function update() {
      if (!bar) return;

      const smoother = window.ScrollSmoother?.get?.();
      if (smoother && typeof smoother.progress === "number") {
        bar.style.width = `${Math.min(1, Math.max(0, smoother.progress)) * 100}%`;
        return;
      }

      const limit = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress =
        (window.scrollY || document.documentElement.scrollTop) / limit;
      bar.style.width = `${Math.min(1, Math.max(0, progress)) * 100}%`;
    }

    const ticker = window.gsap?.ticker;
    if (ticker) {
      ticker.add(update);
      update();
      return () => {
        ticker.remove(update);
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="mat-scroll-progress mat-accent" aria-hidden="true">
      <div id="mat-scroll-bar" className="mat-scroll-progress-bar" />
    </div>
  );
}

function MatPreloader({ active }: { active: boolean }) {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  useLayoutEffect(() => {
    if (!active) return;
    document.body.classList.add("mat-preloader-active");
    document.body.dataset.matPreloader = "true";
    return () => {
      document.body.classList.remove("mat-preloader-active");
      delete document.body.dataset.matPreloader;
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = prefersReduced ? 300 : 1800;
    const start = performance.now();
    let raf = 0;

    function finish() {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setDone(true);

      window.setTimeout(() => {
        document.documentElement.classList.add("mat-preload-done");
        document.body.classList.remove("mat-preloader-active");
        delete document.body.dataset.matPreloader;

        window.dispatchEvent(new Event("mat-preload-done"));

        if (window.jQuery) {
          window.jQuery(window).trigger("load");
        }

        window.dispatchEvent(new Event("mat-work-scroll-refresh"));
      }, prefersReduced ? 0 : 400);
    }

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      const value = Math.floor(eased * 100);

      setCount(value);
      if (progressRef.current) {
        progressRef.current.style.width = `${value}%`;
      }

      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (!active) return null;

  return (
    <div
      id="mat-preloader"
      className={`mat-preloader mat-accent${done ? " done" : ""}`}
      aria-hidden={done}
    >
      <div className="mat-preloader-inner">
        <span className="mat-preloader-label">Loading</span>
        <span className="mat-preloader-counter">{count}</span>
        <div className="mat-preloader-bar">
          <div ref={progressRef} className="mat-preloader-progress" />
        </div>
      </div>
    </div>
  );
}

export default function MatFeatures({ showPreloader = false }: MatFeaturesProps) {
  return (
    <>
      <ScrollProgressBar />
      <MatPageEnter />
      {showPreloader ? <MatPreloader active /> : null}
      <MatCookieConsent waitForPreloader={showPreloader} />
    </>
  );
}
