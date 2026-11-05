"use client";

import { useLineReveal, useFadeUp } from "@/v2/lib/useReveal";
import { v2Contact, v2Site } from "@/v2/data/content";
import { sectionSnippets } from "@/v2/data/code";
import RichTitle from "./RichTitle";
import CodeBlock from "./CodeBlock";

export default function Contact() {
  const titleRef = useLineReveal<HTMLDivElement>();
  const bodyRef = useFadeUp<HTMLDivElement>({ selector: "[data-reveal]", stagger: 0.1 });

  return (
    <section className="v2-section v2-contact" id="contact">
      <div className="v2-container">
        <p className="v2-eyebrow">{v2Contact.label}</p>
        <div ref={titleRef}>
          <RichTitle lines={v2Contact.title} className="v2-h1" />
        </div>

        <div className="v2-contact-body" ref={bodyRef}>
          <div className="v2-contact-main">
            <p data-reveal>{v2Contact.lead}</p>
            <a href={`mailto:${v2Site.email}`} className="v2-contact-mail" data-reveal data-cursor="✉">
              {v2Site.email}
            </a>
            <ul className="v2-contact-links v2-mono" data-reveal>
              <li>
                <a href={v2Site.linkedin} target="_blank" rel="noreferrer">
                  linkedin ↗
                </a>
              </li>
              <li>
                <a href={v2Site.whatsapp} target="_blank" rel="noreferrer">
                  whatsapp ↗
                </a>
              </li>
            </ul>
          </div>
          <div data-reveal className="v2-contact-code">
            <CodeBlock snippet={sectionSnippets.contact} />
          </div>
        </div>
      </div>
    </section>
  );
}
