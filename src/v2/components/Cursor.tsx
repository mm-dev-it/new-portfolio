"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/v2/lib/gsap";

/** Cursore custom: puntino + anello che segue con un po' di ritardo. Solo desktop con mouse. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    document.documentElement.classList.add("v2-has-cursor");

    const xTo = gsap.quickTo(r, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      document.documentElement.classList.add("v2-cursor-moved");
      // alone sullo sfondo a griglia che segue il mouse
      document.body.style.setProperty("--mx", `${e.clientX}px`);
      document.body.style.setProperty("--my", `${e.clientY}px`);
      gsap.set(d, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      r.classList.toggle("is-hover", !!t);
      const label = t?.getAttribute("data-cursor");
      r.dataset.label = label ?? "";
      r.classList.toggle("has-label", !!label);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("v2-has-cursor", "v2-cursor-moved");
    };
  }, []);

  return (
    <>
      <div className="v2-cursor-dot" ref={dot} aria-hidden="true" />
      <div className="v2-cursor-ring" ref={ring} aria-hidden="true" />
    </>
  );
}
