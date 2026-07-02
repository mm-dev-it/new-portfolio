import type { Metadata } from "next";
import SiteLayout, { SiteFooter } from "@/components/SiteLayout";
import PortfolioListLegacy from "@/components/legacy/PortfolioListLegacy";
import WorksHeroSection from "@/components/works/WorksHeroSection";
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
      <WorksHeroSection />

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
