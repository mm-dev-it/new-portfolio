"use client";

import Link from "next/link";
import { getHomeWorkSlideImage } from "@/data/homeWorkImages";
import {
  getHomeWorkSlideHref,
  homeWorkSlides,
} from "@/data/homeWorkSlides";
import "./home-work-section.css";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function WorkIntroContent({
  linkLabel = "Vedi tutti i progetti",
}: {
  linkLabel?: string;
}) {
  return (
    <>
      <p className="mat-work-section-label">Selected Work</p>
      <h2 className="mat-work-intro-title">
        Ultimi
        <br />
        <span className="mat-work-intro-accent">Lavori</span>
      </h2>
      <Link
        href="/i-miei-lavori"
        className="mat-work-sidebar-link magnetic-item"
        data-cursor="Vedi tutti<br>i progetti"
      >
        <span>{linkLabel}</span>
        <ArrowIcon />
      </Link>
    </>
  );
}

export default function HomeWorkSection() {
  return (
    <section id="work" className="mat-work-section">
      <div className="mat-work-pin">
        <div className="mat-work-layout">
          <div
            className="mat-work-grid-line mat-work-grid-line--h"
            aria-hidden="true"
          />

          <header className="mat-work-mobile-intro" aria-label="Ultimi Lavori">
            <div className="mat-work-slide-intro-inner">
              <WorkIntroContent linkLabel="Scopri di più" />
            </div>
          </header>

          <div className="mat-work-track-wrap">
            <div className="mat-work-track" id="mat-work-track">
              <article className="mat-work-slide mat-work-slide--intro">
                <span className="mat-work-grid-plus" aria-hidden="true">
                  +
                </span>
                <div className="mat-work-slide-intro-inner">
                  <WorkIntroContent />
                </div>
              </article>

              {homeWorkSlides.map((slide, index) => (
                <article key={slide.slug} className="mat-work-slide">
                  <div className="mat-work-slide-inner">
                    <Link
                      href={getHomeWorkSlideHref(slide)}
                      className="mat-work-slide-media"
                      data-cursor={`Esplora<br>${slide.title}`}
                    >
                      <img
                        src={getHomeWorkSlideImage(index)}
                        alt={slide.title}
                        loading="eager"
                        width={1200}
                        height={825}
                      />
                    </Link>
                    <div className="mat-work-slide-footer">
                      <div className="mat-work-slide-info">
                        <h3 className="mat-work-slide-title">{slide.title}</h3>
                      </div>
                      <Link
                        href="/i-miei-lavori"
                        className="mat-work-slide-link"
                        data-cursor="Esplora<br>progetti"
                      >
                        Esplora progetti
                        <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              <article className="mat-work-slide mat-work-slide--cta" id="work-all">
                <div className="mat-work-slide-inner">
                  <div className="mat-work-slide-media mat-work-slide-media--cta">
                    <p className="mat-work-slide-cta-text">
                      Scopri la collezione completa di esperienze digitali, brand
                      e piattaforme.
                    </p>
                  </div>
                  <div className="mat-work-slide-footer">
                    <div
                      className="mat-work-slide-info mat-work-slide-info--cta"
                      aria-hidden="true"
                    >
                      <h3 className="mat-work-slide-title">&nbsp;</h3>
                    </div>
                    <Link
                      href="/i-miei-lavori"
                      className="mat-work-slide-link mat-work-slide-cta-link magnetic-item"
                      data-cursor="Vedi tutti<br>i progetti"
                    >
                      Vedi tutti i progetti
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
