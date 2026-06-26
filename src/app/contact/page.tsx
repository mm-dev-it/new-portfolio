import type { Metadata } from "next";
import SiteLayout, { SiteFooter } from "@/components/SiteLayout";
import HomeContactSection from "@/components/legacy/HomeContactSection";

export const metadata: Metadata = {
  title: "Contatti | Matteo Malaspina - Sviluppatore Web Fermo",
  description:
    "Contatta Matteo Malaspina per un preventivo gratuito. Sviluppatore web freelance a Fermo, Marche.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SiteLayout active="contact">
      <div
        id="page-header"
        className="ph-full ph-cap-xxlg ph-center ph-image-cropped ph-image-cover-2 ph-content-parallax"
      >
        <div className="page-header-inner tt-wrap">
          <div className="ph-image">
            <div className="ph-image-inner">
              <img src="/assets/img/page-header/ph-3.jpg" alt="Image" />
            </div>
          </div>
          <div className="ph-caption">
            <h1 className="ph-caption-title ph-appear">Contatti</h1>
            <div className="ph-caption-title-ghost ph-appear">Contatti</div>
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
                  id="textcircle-contact"
                />
              </defs>
              <text dy="30">
                <textPath xlinkHref="#textcircle-contact">
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
        <HomeContactSection />

        <div className="tt-section padding-bottom-xlg-150">
          <div className="tt-section-inner tt-wrap">
            <div className="tt-page-nav tt-pn-scroll">
              <a href="/i-miei-lavori" className="tt-pn-link anim-fadeinup">
                <div className="tt-pn-title">Portfolio</div>
                <div className="tt-pn-hover-title">Portfolio</div>
              </a>
              <div className="tt-pn-subtitle anim-fadeinup">I miei lavori</div>
              <div className="tt-pn-image">
                <img src="/assets/img/page-header/ph-1.jpg" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </SiteLayout>
  );
}
