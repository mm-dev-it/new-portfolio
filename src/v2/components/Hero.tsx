"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/v2/lib/gsap";
import { onReady } from "@/v2/lib/ready";
import { v2Hero, v2Site } from "@/v2/data/content";
import RichTitle from "./RichTitle";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    const items = el.querySelectorAll<HTMLElement>(
      ".v2-hero-eyebrow, .v2-hero-lead, .v2-hero-actions, .v2-hero-status, .v2-hero-scroll",
    );
    const ctx = gsap.context(() => {
      const title = el.querySelector<HTMLElement>(".v2-hero-title");
      if (title) split = new SplitText(title, { type: "lines", linesClass: "v2-line", mask: "lines" });
      gsap.set(items, { autoAlpha: 0, y: 24 });
      if (split) gsap.set(split.lines, { yPercent: 110 });
    }, el);

    const off = onReady(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
      tl.to(".v2-hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.8 });
      if (split) tl.to(split.lines, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.1);
      tl.to(".v2-hero-lead", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.6)
        .to(".v2-hero-actions", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.75)
        .to(".v2-hero-status, .v2-hero-scroll", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.9);
    });

    return () => {
      off();
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section className="v2-hero" id="top" ref={ref} aria-label="Introduzione">
      <div className="v2-container v2-hero-grid">
        <p className="v2-eyebrow v2-hero-eyebrow">{v2Hero.eyebrow}</p>

        <RichTitle as="h1" lines={v2Hero.title} className="v2-hero-title" />

        <p className="v2-hero-lead">{v2Hero.lead}</p>

        <div className="v2-hero-actions">
          <a href={v2Hero.cta.href} className="v2-btn v2-btn-primary" data-cursor="→">
            {v2Hero.cta.label}
          </a>
          <a href={v2Hero.secondary.href} className="v2-btn v2-btn-ghost">
            {v2Hero.secondary.label}
          </a>
        </div>

        <dl className="v2-hero-status v2-mono">
          {v2Hero.status.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd className={k === "status" ? "is-accent" : ""}>
                {k === "status" && <span className="v2-dot is-on" aria-hidden="true" />}
                {v}
              </dd>
            </div>
          ))}
          <div>
            <dt>base</dt>
            <dd>{v2Site.coords}</dd>
          </div>
        </dl>
      </div>

      <div className="v2-hero-scroll v2-mono" aria-hidden="true">
        <span>{v2Hero.scrollHint}</span>
        <i />
      </div>
    </section>
  );
}
