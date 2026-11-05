"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/v2/lib/gsap";
import { useLineReveal, useFadeUp } from "@/v2/lib/useReveal";
import { portfolioProjects } from "@/data/projects";
import { v2Work } from "@/v2/data/content";
import RichTitle from "./RichTitle";

/**
 * Lista progetti: ogni riga mostra al passaggio del mouse l'anteprima
 * che segue il cursore. Su touch l'immagine è dentro la riga.
 */
export default function Work() {
  const titleRef = useLineReveal<HTMLDivElement>();
  const listRef = useFadeUp<HTMLUListElement>({ selector: "li", stagger: 0.05, y: 24 });
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const el = preview.current;
    if (!el) return;
    gsap.to(el, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.9 : 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  }, [active]);

  return (
    <section className="v2-section v2-work" id="work">
      <div className="v2-container">
        <div className="v2-section-head">
          <p className="v2-eyebrow">{v2Work.label}</p>
          <div ref={titleRef}>
            <RichTitle lines={v2Work.title} className="v2-h2" />
          </div>
        </div>

        <ul className="v2-work-list" ref={listRef} onPointerLeave={() => setActive(null)}>
          {portfolioProjects.map((p, i) => (
            <li key={p.slug}>
              <a
                href={`/${p.slug}`}
                className="v2-work-row"
                onPointerEnter={() => setActive(i)}
                data-cursor="Apri"
              >
                <span className="v2-work-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="v2-work-title">{p.title}</span>
                <span className="v2-work-cat">{p.category}</span>
                <span className="v2-work-year">{p.year}</span>
                <img className="v2-work-thumb" src={p.image} alt="" loading="lazy" decoding="async" />
              </a>
            </li>
          ))}
        </ul>

        <a href={v2Work.allHref} className="v2-btn v2-btn-ghost v2-work-all">
          {v2Work.allLabel} <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="v2-work-preview" ref={preview} aria-hidden="true">
        {portfolioProjects.map((p, i) => (
          <img
            key={p.slug}
            src={p.image}
            alt=""
            loading="lazy"
            decoding="async"
            className={active === i ? "is-active" : ""}
          />
        ))}
      </div>
    </section>
  );
}
