"use client";

import { useEffect } from "react";
import "./mat-page-enter.css";

function triggerPageEnter() {
  const root = document.documentElement;
  if (root.classList.contains("mat-page-enter")) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) {
    root.classList.add("mat-page-enter");
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.add("mat-page-enter");
    });
  });
}

export default function MatPageEnter() {
  useEffect(() => {
    const isHome =
      window.location.pathname === "/" || window.location.pathname === "";

    if (
      isHome &&
      document.documentElement.classList.contains("mat-preload-home")
    ) {
      if (document.documentElement.classList.contains("mat-preload-done")) {
        triggerPageEnter();
        return;
      }

      window.addEventListener("mat-preload-done", triggerPageEnter, {
        once: true,
      });
      return () =>
        window.removeEventListener("mat-preload-done", triggerPageEnter);
    }

    triggerPageEnter();
    return undefined;
  }, []);

  return null;
}
