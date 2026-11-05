"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/v2/lib/gsap";
import { onReady } from "@/v2/lib/ready";
import { v2Site } from "@/v2/data/content";

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 0, y: -12 });
    return onReady(() => {
      gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 });
    });
  }, []);

  return (
    <header className="v2-nav v2-mono" ref={ref}>
      <a href="#top" className="v2-nav-logo" aria-label={v2Site.name}>
        <span className="tk-punct">&lt;</span>
        {v2Site.short}
        <span className="tk-punct"> /&gt;</span>
      </a>
      <nav className="v2-nav-links" aria-label="Sezioni">
        {v2Site.nav.map((item, i) => (
          <a key={item.href} href={item.href}>
            <span className="v2-nav-idx">0{i + 1}.</span>
            {item.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="v2-nav-status">
        <span className={`v2-dot ${v2Site.available ? "is-on" : ""}`} aria-hidden="true" />
        {v2Site.available ? "available" : "busy"}
      </a>
    </header>
  );
}
