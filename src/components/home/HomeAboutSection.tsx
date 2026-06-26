"use client";

import { useEffect } from "react";
import { homeAboutContent } from "@/data/homeAbout";
import "./home-about-section.css";

export default function HomeAboutSection() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".mat-about-section .reveal-up",
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

  const { label, title, titleAccent, paragraphs, profile, timeline, skills } =
    homeAboutContent;

  return (
    <section id="about" className="mat-about-section about-section">
      <div className="about-grid">
        <div className="about-left">
          <p className="section-label reveal-up">{label}</p>
          <h2 className="about-title reveal-up">
            {title}
            <br />
            <span className="accent">{titleAccent}</span>
          </h2>
          {paragraphs.map((text) => (
            <p key={text} className="about-text reveal-up">
              {text}
            </p>
          ))}
        </div>

        <div className="about-right">
          <div className="about-card reveal-up">
            <div className="about-card-header">
              <div className="about-avatar">{profile.initials}</div>
              <div>
                <p className="about-name">{profile.name}</p>
                <p className="about-role">{profile.role}</p>
              </div>
              <div className="about-status">
                <span className="status-dot" aria-hidden="true" />
                {profile.status}
              </div>
            </div>

            <div className="about-timeline">
              {timeline.map((item) => (
                <div key={item.year} className="timeline-item">
                  <span className="timeline-year">{item.year}</span>
                  <p className="timeline-role">{item.role}</p>
                  <p className="timeline-company">{item.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.num} className="skill-item reveal-up">
            <span className="skill-num">{skill.num}</span>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
