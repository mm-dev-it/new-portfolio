import { homeHeroContent } from "@/data/homeHero";
import "./home-hero-section.css";
import Icon from "@/components/Icon";

export default function HomeHeroSection() {
  const {
    eyebrow,
    name,
    line1,
    line2Prefix,
    line2Accent,
    line2Suffix,
    ghost,
    scrollText,
    aside,
    image,
    imageAlt,
  } = homeHeroContent;

  return (
    <section
      id="hero"
      className="mat-hero-section"
      aria-label="Introduzione"
    >
      <div className="mat-hero-inner">
        <div className="mat-hero-content">
          <p className="mat-hero-eyebrow ph-appear">
            <span className="mat-hero-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>

          <h1 className="mat-hero-title ph-appear">{name}</h1>

          <p className="mat-hero-subtitle ph-appear">
            {line1}
            <br />
            {line2Prefix}
            <span className="accent">{line2Accent}</span>
            {line2Suffix}
          </p>

          <div className="mat-hero-ghost ph-appear" aria-hidden="true">
            {ghost}
          </div>
        </div>

        <div className="ph-image">
          <div className="mat-hero-visual">
            <div className="mat-hero-visual-backdrop" aria-hidden="true">
              <div className="mat-hero-visual-backdrop__glow" />
              <div className="mat-hero-visual-backdrop__square">
                <div className="mat-hero-visual-backdrop__accent" />
                <div className="mat-hero-visual-backdrop__base" />
                <div className="mat-hero-visual-backdrop__frame" />
              </div>
            </div>
            <link rel="preload" as="image" href={image} fetchPriority="high" />
            <img
              src={image}
              alt={imageAlt}
              className="mat-hero-visual-photo"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={854}
              height={1049}
            />
          </div>
        </div>
      </div>

      <a
        href="#page-content"
        className="scroll-down-circle magnetic-item"
        data-offset="30"
        data-cursor="hover"
        aria-label="Scorri verso il contenuto"
      >
        <div className="sdc-inner ph-appear">
          <div className="sdc-icon">
            <Icon name="chevron-down" />
          </div>
          <svg viewBox="0 0 500 500" aria-hidden="true">
            <defs>
              <path
                d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                id="mat-hero-textcircle"
              />
            </defs>
            <text dy="30">
              <textPath xlinkHref="#mat-hero-textcircle">{scrollText}</textPath>
            </text>
          </svg>
        </div>
      </a>

      <div className="made-with-love ph-appear">
        <div className="mwl-inner">
          <div className="mwl-icon">
            <Icon name="heart" />
          </div>
          <div className="mwl-text">{aside}</div>
        </div>
      </div>
    </section>
  );
}
