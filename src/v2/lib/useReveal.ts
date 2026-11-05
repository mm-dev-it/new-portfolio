"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "./gsap";

/**
 * Rivela il testo riga per riga quando entra nel viewport.
 * Da usare su titoli e paragrafi: ogni riga scorre su dal basso.
 */
export function useLineReveal<T extends HTMLElement>(options?: {
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: "lines",
        linesClass: "v2-line",
        mask: "lines",
      });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: options?.stagger ?? 0.08,
        delay: options?.delay ?? 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [options?.delay, options?.stagger]);

  return ref;
}

/** Fade + slide semplice su un blocco quando entra nel viewport. */
export function useFadeUp<T extends HTMLElement>(options?: {
  y?: number;
  delay?: number;
  stagger?: number;
  selector?: string;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = options?.selector ? el.querySelectorAll(options.selector) : el;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: options?.y ?? 32,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: options?.stagger ?? 0.08,
        delay: options?.delay ?? 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
    return () => ctx.revert();
  }, [options?.y, options?.delay, options?.stagger, options?.selector]);

  return ref;
}

export { ScrollTrigger };
