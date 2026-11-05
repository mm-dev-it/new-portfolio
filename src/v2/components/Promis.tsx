"use client";

import { useLineReveal, useFadeUp } from "@/v2/lib/useReveal";
import { v2Promis } from "@/v2/data/content";
import { sectionSnippets } from "@/v2/data/code";
import RichTitle from "./RichTitle";
import CodeBlock from "./CodeBlock";

export default function Promis() {
  const titleRef = useLineReveal<HTMLDivElement>();
  const bodyRef = useFadeUp<HTMLDivElement>({ selector: "[data-reveal]", stagger: 0.1 });

  return (
    <section className="v2-section v2-promis" id="promis">
      <div className="v2-container">
        <div className="v2-promis-panel">
          <p className="v2-eyebrow">
            {v2Promis.label} · {v2Promis.name}
          </p>

          <div ref={titleRef}>
            <RichTitle lines={v2Promis.tagline} className="v2-h2" />
          </div>

          <div className="v2-promis-grid" ref={bodyRef}>
            <p className="v2-promis-desc" data-reveal>
              {v2Promis.description}
            </p>

            <ul className="v2-stats">
              {v2Promis.stats.map((s) => (
                <li key={s.label} data-reveal>
                  <strong>{s.value}</strong>
                  <span className="v2-mono">{s.label}</span>
                </li>
              ))}
            </ul>

            <div data-reveal className="v2-promis-code">
              <CodeBlock snippet={sectionSnippets.promis} />
            </div>

            <div className="v2-promis-actions" data-reveal>
              <a href={v2Promis.cta.href} className="v2-btn v2-btn-primary" data-cursor="→">
                {v2Promis.cta.label}
              </a>
              <a href={v2Promis.secondary.href} className="v2-btn v2-btn-ghost" target="_blank" rel="noreferrer">
                {v2Promis.secondary.label} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
