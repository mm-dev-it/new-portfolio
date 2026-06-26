"use client";

import { useEffect } from "react";
import "./mat-cursor.css";

const HOVER_SELECTOR =
  "a, button, .magnetic-item, [data-cursor], input, textarea, select, label";

function getHoverTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest(HOVER_SELECTOR);
}

export default function MatCursor() {
  useEffect(() => {
    const isTouch =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouch || prefersReduced || document.body.classList.contains("is-mobile")) {
      return;
    }

    document.body.classList.add("mat-custom-cursor");

    const dot = document.getElementById("mat-cursor-dot");
    const ring = document.getElementById("mat-cursor-ring");
    const pnBall = document.getElementById("mat-cursor-pn-ball");
    if (!dot || !ring || !pnBall) return;

    const dotEl = dot;
    const ringEl = ring;
    const pnBallEl = pnBall;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function animate() {
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      dotEl.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ringEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      pnBallEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(animate);
    }

    const hoverCleanups: Array<() => void> = [];

    function onHoverOver(e: MouseEvent) {
      const target = getHoverTarget(e.target);
      if (
        target?.closest(".tt-pn-link") &&
        target.closest(".tt-page-nav")?.querySelector(".tt-pn-image")
      ) {
        return;
      }
      if (target) {
        ringEl.classList.add("is-hover");
      }
    }

    function onHoverOut(e: MouseEvent) {
      const from = getHoverTarget(e.target);
      const to = getHoverTarget(e.relatedTarget);
      if (from && from !== to) {
        ringEl.classList.remove("is-hover");
      }
    }

    document.addEventListener("mouseover", onHoverOver);
    document.addEventListener("mouseout", onHoverOut);
    hoverCleanups.push(() => {
      document.removeEventListener("mouseover", onHoverOver);
      document.removeEventListener("mouseout", onHoverOut);
    });

    const pageNavCleanups: Array<() => void> = [];

    function bindPageNavHovers() {
      if (window.matchMedia("(max-width: 1024px)").matches) return;

      document.querySelectorAll(".tt-page-nav").forEach((nav) => {
        const imageWrap = nav.querySelector(".tt-pn-image") as HTMLElement | null;
        const link = nav.querySelector(".tt-pn-link") as HTMLElement | null;
        if (!imageWrap || !link || link.dataset.matPnBound === "true") return;

        const imageWrapEl = imageWrap;
        const linkEl = link;
        linkEl.dataset.matPnBound = "true";
        const home = imageWrapEl.parentElement;

        function onPnEnter() {
          ringEl.classList.remove("is-hover");
          pnBallEl.classList.add("is-active");
          document.body.classList.add("mat-pn-hover-on");
          imageWrapEl.style.display = "block";
          pnBallEl.appendChild(imageWrapEl);
        }

        function onPnLeave() {
          pnBallEl.classList.remove("is-active");
          document.body.classList.remove("mat-pn-hover-on");
          if (home) home.appendChild(imageWrapEl);
          imageWrapEl.style.display = "";
        }

        linkEl.addEventListener("mouseenter", onPnEnter);
        linkEl.addEventListener("mouseleave", onPnLeave);
        pageNavCleanups.push(() => {
          linkEl.removeEventListener("mouseenter", onPnEnter);
          linkEl.removeEventListener("mouseleave", onPnLeave);
          delete linkEl.dataset.matPnBound;
          if (ringEl.contains(imageWrapEl) && home) home.appendChild(imageWrapEl);
          if (pnBallEl.contains(imageWrapEl) && home) home.appendChild(imageWrapEl);
        });
      });
    }

    bindPageNavHovers();

    const contentRoot = document.getElementById("content-wrap");
    let pnTimer = 0;
    const pnObserver =
      contentRoot && window.MutationObserver
        ? new MutationObserver(() => {
            window.clearTimeout(pnTimer);
            pnTimer = window.setTimeout(bindPageNavHovers, 100);
          })
        : null;
    pnObserver?.observe(contentRoot ?? document.body, {
      childList: true,
      subtree: true,
    });

    const magneticCleanups: Array<() => void> = [];

    document.querySelectorAll(".magnetic-item").forEach((el) => {
      const node = el as HTMLElement;

      function onMagMove(e: MouseEvent) {
        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        node.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      }

      function onMagLeave() {
        node.style.transform = "";
        node.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        window.setTimeout(() => {
          node.style.transition = "";
        }, 500);
      }

      node.addEventListener("mousemove", onMagMove);
      node.addEventListener("mouseleave", onMagLeave);
      magneticCleanups.push(() => {
        node.removeEventListener("mousemove", onMagMove);
        node.removeEventListener("mouseleave", onMagLeave);
      });
    });

    document.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("mat-custom-cursor");
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      hoverCleanups.forEach((fn) => fn());
      pageNavCleanups.forEach((fn) => fn());
      pnObserver?.disconnect();
      window.clearTimeout(pnTimer);
      magneticCleanups.forEach((fn) => fn());
      ringEl.classList.remove("is-hover");
      pnBallEl.classList.remove("is-active");
      document.body.classList.remove("mat-pn-hover-on");
    };
  }, []);

  return (
    <>
      <div id="mat-cursor-dot" className="mat-cursor-dot" aria-hidden="true" />
      <div id="mat-cursor-pn-ball" className="mat-cursor-pn-ball" aria-hidden="true" />
      <div id="mat-cursor-ring" className="mat-cursor-ring" aria-hidden="true" />
    </>
  );
}
