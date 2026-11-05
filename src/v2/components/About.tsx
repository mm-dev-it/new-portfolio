"use client";

import { useLineReveal, useFadeUp } from "@/v2/lib/useReveal";
import { v2About } from "@/v2/data/content";
import { sectionSnippets } from "@/v2/data/code";
import RichTitle from "./RichTitle";
import CodeBlock from "./CodeBlock";

export default function About() {
  const titleRef = useLineReveal<HTMLDivElement>();
  const textRef = useFadeUp<HTMLDivElement>({ selector: "p, .v2-code", stagger: 0.12 });
  const listRef = useFadeUp<HTMLDivElement>({ selector: "li", stagger: 0.06 });

  return (
    <section className="v2-section v2-about" id="about">
      <div className="v2-container">
        <p className="v2-eyebrow">{v2About.label}</p>

        <div className="v2-about-head" ref={titleRef}>
          <RichTitle lines={v2About.title} className="v2-h2" />
        </div>

        <div className="v2-about-grid">
          <div className="v2-about-text" ref={textRef}>
            {v2About.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <CodeBlock snippet={sectionSnippets.about} />
          </div>

          <div className="v2-about-aside" ref={listRef}>
            <ul className="v2-timeline">
              {v2About.timeline.map((t) => (
                <li key={t.year}>
                  <span className="v2-timeline-year v2-mono">{t.year}</span>
                  <span className="v2-timeline-role">{t.role}</span>
                  <span className="v2-timeline-where">{t.where}</span>
                </li>
              ))}
            </ul>
            <ul className="v2-stack">
              {v2About.stack.map((s) => (
                <li key={s.title}>
                  <span className="v2-stack-title v2-mono">{s.title}</span>
                  <span className="v2-stack-items">{s.items}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
