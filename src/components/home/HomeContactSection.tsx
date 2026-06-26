"use client";

import { useEffect } from "react";
import { homeContactContent } from "@/data/homeContact";
import "./home-contact-section.css";

export default function HomeContactSection() {
  const {
    label,
    titleLine1,
    titleLine2,
    subtitle,
    email,
    cta,
    socials,
    footerText,
  } = homeContactContent;

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".mat-contact-section .reveal-up",
    );
    if (!elements.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById("mat-footer-time");
    if (!el) return;

    const timeEl = el;

    function update() {
      timeEl.textContent = new Date().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    }

    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <section id="contatti" className="mat-contact-section">
        <div className="contact-inner">
          <p className="section-label reveal-up">{label}</p>

          <h2 className="contact-title reveal-up">
            <span className="contact-line">{titleLine1}</span>
            <span className="contact-line contact-line--accent">{titleLine2}</span>
          </h2>

          <p className="contact-sub reveal-up">{subtitle}</p>

          <a
            href={`mailto:${email}`}
            className="contact-email magnetic-item reveal-up"
            data-cursor="hover"
          >
            {email}
          </a>

          <div className="contact-actions reveal-up">
            <a
              href={`mailto:${email}`}
              className="btn-primary magnetic-item btn-lg"
              data-cursor="hover"
            >
              <span>{cta}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          <div className="contact-socials reveal-up">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link magnetic-item"
                data-cursor="hover"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="mat-contact-footer">
        <p>{footerText}</p>
        <p className="footer-time" id="mat-footer-time" />
      </footer>
    </>
  );
}
