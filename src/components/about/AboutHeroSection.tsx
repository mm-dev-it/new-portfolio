import { aboutHeroContent } from "@/data/aboutHero";
import "../works/works-hero-section.css";
import Icon from "@/components/Icon";

export default function AboutHeroSection() {
  const {
    eyebrow,
    title,
    titleGhost,
    subtitlePrefix,
    subtitleAccent,
    scrollText,
    aside,
    image,
    imageAlt,
  } = aboutHeroContent;

  return (
    <div
      id="page-header"
      className="mat-page-hero ph-full ph-center ph-cap-xxlg ph-image-cropped ph-image-cover-2 ph-content-parallax"
    >
      <div className="page-header-inner tt-wrap">
        <div className="ph-image">
          <div className="ph-image-inner">
            <link rel="preload" as="image" href={image} fetchPriority="high" />
            <img src={image} alt={imageAlt} loading="eager" decoding="async" fetchPriority="high" />
          </div>
        </div>

        <div className="ph-caption">
          <p className="mat-page-hero-eyebrow ph-appear">
            <span className="mat-page-hero-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>

          <h1 className="ph-caption-title ph-appear">{title}</h1>
          <div className="ph-caption-title-ghost ph-appear" aria-hidden="true">
            {titleGhost}
          </div>
          <div className="ph-caption-subtitle ph-appear">
            {subtitlePrefix}
            <span className="accent">{subtitleAccent}</span>
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
                id="mat-about-hero-textcircle"
              />
            </defs>
            <text dy="30">
              <textPath xlinkHref="#mat-about-hero-textcircle">{scrollText}</textPath>
            </text>
          </svg>
        </div>
      </a>

      <div className="made-with-love ph-appear">
        <div className="mwl-inner">
          <div className="mwl-text">{aside}</div>
          <div className="mwl-icon">
            <Icon name="heart" />
          </div>
        </div>
      </div>
    </div>
  );
}
