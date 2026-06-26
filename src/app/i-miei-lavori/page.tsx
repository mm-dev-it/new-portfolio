import type { Metadata } from "next";
import SiteLayout, { SiteFooter } from "@/components/SiteLayout";
import PortfolioListLegacy from "@/components/legacy/PortfolioListLegacy";
import { worksPageProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio | Lavori e Progetti Web - Matteo Malaspina, Fermo",
  description:
    "Scopri i progetti web realizzati da Matteo Malaspina: siti vetrina, e-commerce e piattaforme online per clienti in Italia.",
  alternates: { canonical: "/i-miei-lavori" },
};

export default function WorksPage() {
  return (
    <SiteLayout active="portfolio">
      <div
        id="page-header"
        className="ph-full ph-center ph-cap-xxlg ph-image-cropped ph-image-cover-2 ph-content-parallax mat-ph-enter"
      >
        <div className="page-header-inner tt-wrap">
          <div className="ph-image">
            <div className="ph-image-inner">
              <img src="/assets/img/page-header/work-hero-mm.jpg" alt="Portfolio — I miei lavori" />
            </div>
          </div>
          <div className="ph-caption">
            <h1 className="ph-caption-title ph-appear">Portfolio</h1>
            <div className="ph-caption-title-ghost ph-appear">Portfolio</div>
            <div className="ph-caption-subtitle ph-appear">I miei Lavori</div>
          </div>
        </div>

        <a href="#page-content" className="scroll-down-circle" data-offset="30">
          <div className="sdc-inner ph-appear">
            <div className="sdc-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
            <svg viewBox="0 0 500 500">
              <defs>
                <path
                  d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                  id="textcircle-works"
                />
              </defs>
              <text dy="30">
                <textPath xlinkHref="#textcircle-works">
                  Scorri in basso - Scorri in basso -
                </textPath>
              </text>
            </svg>
          </div>
        </a>

        <div className="made-with-love ph-appear">
          <div className="mwl-inner">
            <div className="mwl-text">Sogna in Grande</div>
            <div className="mwl-icon">
              <i className="far fa-heart"></i>
            </div>
          </div>
        </div>
      </div>

      <div id="page-content">
        <div id="sdc-target" className="tt-section padding-bottom-150">
          <div className="tt-section-inner">
            <PortfolioListLegacy projects={worksPageProjects} />
          </div>
        </div>

        <div className="tt-section padding-bottom-xlg-150">
          <div className="tt-section-inner tt-wrap">
            <div className="tt-page-nav tt-pn-scroll">
              <a href="/about-me" className="tt-pn-link anim-fadeinup">
                <div className="tt-pn-title">Chi Sono</div>
                <div className="tt-pn-hover-title">Chi Sono</div>
              </a>
              <div className="tt-pn-subtitle anim-fadeinup">Biografia</div>
              <div className="tt-pn-image">
                <img src="/assets/img/page-header/bg_2.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </SiteLayout>
  );
}
