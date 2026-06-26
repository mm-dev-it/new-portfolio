"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type MatFeaturesProps = {
  showPreloader?: boolean;
};

declare global {
  interface Window {
    Scrollbar?: {
      get: (el: Element) => {
        offset: { x: number; y: number };
        limit: { x: number; y: number };
        addListener: (fn: () => void) => void;
        removeListener?: (fn: () => void) => void;
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

    function usesNativeScroll() {
      return (
        document.documentElement.classList.contains("home-native-scroll") ||
        document.body.classList.contains("tt-no-smooth-scroll")
      );
    }

    function getScrollbar() {
      if (usesNativeScroll()) return null;
      const el = document.getElementById("scroll-container");
      if (!el || !window.Scrollbar) return null;
      try {
        return window.Scrollbar.get(el);
      } catch {
        return null;
      }
    }

    function getScrollTop() {
      if (usesNativeScroll()) {
        return window.scrollY || document.documentElement.scrollTop;
      }

      const sb = getScrollbar();
      if (sb) return sb.offset.y;

      const container = document.getElementById("scroll-container");
      if (container && container.scrollHeight > container.clientHeight) {
        return container.scrollTop;
      }

      return window.scrollY || document.documentElement.scrollTop;
    }

    function getScrollLimit() {
      if (usesNativeScroll()) {
        return Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
      }

      const sb = getScrollbar();
      if (sb && sb.limit.y > 0) return sb.limit.y;

      const container = document.getElementById("scroll-container");
      if (container) {
        return Math.max(container.scrollHeight - container.clientHeight, 1);
      }

      return Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
    }

    function update() {
      if (!bar) return;
      const progress = getScrollTop() / getScrollLimit();
      bar.style.width = `${Math.min(1, Math.max(0, progress)) * 100}%`;
    }

    let scrollbarListener: (() => void) | null = null;
    const waitForScrollbar = window.setInterval(() => {
      const sb = getScrollbar();
      if (!sb) return;

      scrollbarListener = update;
      sb.addListener(scrollbarListener);
      window.clearInterval(waitForScrollbar);
      update();
    }, 80);

    const stopWaiting = window.setTimeout(() => {
      window.clearInterval(waitForScrollbar);
      update();
    }, 6000);

    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    update();

    return () => {
      window.clearInterval(waitForScrollbar);
      window.clearTimeout(stopWaiting);
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      const sb = getScrollbar();
      if (sb && scrollbarListener && sb.removeListener) {
        sb.removeListener(scrollbarListener);
      }
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
      {showPreloader ? <MatPreloader active /> : null}
    </>
  );
}
