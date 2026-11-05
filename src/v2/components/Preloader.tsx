"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/v2/lib/gsap";
import { markReady } from "@/v2/lib/ready";
import { preloaderLines } from "@/v2/data/code";
import { highlightLine } from "@/v2/lib/highlight";

const SESSION_KEY = "v2-preloaded";

/**
 * Schermata di apertura a terminale: `npm run matteo`, output che scorre,
 * poi il sipario sale. Una volta per sessione.
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShow(false));
      markReady();
      return () => cancelAnimationFrame(id);
    }

    const el = root.current;
    if (!el) return;
    document.documentElement.classList.add("v2-locked");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {}
          document.documentElement.classList.remove("v2-locked");
          setShow(false);
          markReady();
        },
      });

      // Prima riga: si digita carattere per carattere.
      const first = el.querySelector<HTMLElement>(".v2-pre-line[data-i='0'] .v2-pre-text");
      if (first) {
        const full = first.textContent ?? "";
        first.textContent = "";
        const st = { n: 0 };
        tl.to(st, {
          n: full.length,
          duration: 0.9,
          ease: "none",
          onUpdate: () => (first.textContent = full.slice(0, Math.round(st.n))),
        });
      }
      // Le altre compaiono a scatti, come un vero output.
      tl.to(".v2-pre-line:not([data-i='0'])", {
        autoAlpha: 1,
        duration: 0.01,
        stagger: { each: 0.14, from: "start" },
      }, "+=0.25");
      tl.to(".v2-pre-bar i", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0.4);
      tl.to(".v2-pre-inner", { autoAlpha: 0, duration: 0.35 }, "+=0.45");
      tl.to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<0.1");
    }, el);

    return () => ctx.revert();
  }, []);

  if (!show) return null;

  return (
    <div className="v2-pre" ref={root} aria-hidden="true">
      <div className="v2-pre-inner">
        <div className="v2-pre-head">
          <span className="v2-code-dots">
            <i />
            <i />
            <i />
          </span>
          <span>matteo@fermo — zsh</span>
        </div>
        <pre className="v2-pre-term">
          {preloaderLines.map((line, i) => (
            <span className="v2-pre-line" data-i={i} key={i}>
              <span className="v2-pre-text">
                {highlightLine(line).map((t, j) => (
                  <span className={`tk-${t.cls}`} key={j}>
                    {t.text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </pre>
        <div className="v2-pre-bar">
          <i />
        </div>
      </div>
    </div>
  );
}
