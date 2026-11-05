"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/v2/lib/gsap";
import { highlight } from "@/v2/lib/highlight";
import type { Snippet } from "@/v2/data/code";

/**
 * Finestra di codice che si "digita" quando entra nel viewport.
 * Sintassi colorata via classi .tk-*.
 */
export default function CodeBlock({
  snippet,
  className = "",
}: {
  snippet: Snippet;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState(0);
  const total = snippet.code.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setChars(total));
      return () => cancelAnimationFrame(id);
    }
    const state = { n: 0 };
    let raf = 0;
    const tween = gsap.to(state, {
      n: total,
      duration: Math.min(3.2, 0.6 + total / 220),
      ease: "none",
      paused: true,
      onUpdate: () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setChars(Math.round(state.n)));
      },
    });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });
    return () => {
      st.kill();
      tween.kill();
      cancelAnimationFrame(raf);
    };
  }, [total]);

  const visible = snippet.code.slice(0, chars);
  const lines = highlight(visible);
  const done = chars >= total;

  return (
    <div className={`v2-code ${className}`} ref={ref}>
      <div className="v2-code-bar">
        <span className="v2-code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="v2-code-file">{snippet.file}</span>
        <span className="v2-code-lang">{snippet.lang}</span>
      </div>
      <pre className="v2-code-body">
        <code>
          {lines.map((tokens, i) => (
            <span className="v2-code-line" key={i}>
              <span className="v2-code-ln">{i + 1}</span>
              <span>
                {tokens.map((t, j) => (
                  <span className={`tk-${t.cls}`} key={j}>
                    {t.text}
                  </span>
                ))}
                {i === lines.length - 1 && !done && <span className="v2-caret" />}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
