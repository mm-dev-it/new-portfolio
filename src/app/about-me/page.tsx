import type { Metadata } from "next";
import SiteLayout, { SiteFooter } from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Chi Sono | Matteo Malaspina - Sviluppatore Web Freelance a Fermo",
  description:
    "Sono Matteo Malaspina, sviluppatore web di Fermo (FM), Marche. Creo siti web, e-commerce e landing page per aziende e professionisti.",
  alternates: { canonical: "/about-me" },
};

export default function AboutPage() {
  return (
    <SiteLayout active="about">
      <div
        id="page-header"
        className="ph-full ph-cap-xxlg ph-center ph-image-cropped ph-content-parallax"
      >
        <div className="page-header-inner tt-wrap">
          <div className="ph-image">
            <div className="ph-image-inner">
              <img src="/assets/img/page-header/bg_2.png" alt="Image" />
            </div>
          </div>
          <div className="ph-caption">
            <h1 className="ph-caption-title ph-appear">Chi Sono</h1>
            <div className="ph-caption-title-ghost ph-appear">Chi Sono</div>
            <div className="ph-caption-subtitle ph-appear">Matteo Malaspina</div>
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
                  id="textcircle-about"
                />
              </defs>
              <text dy="30">
                <textPath xlinkHref="#textcircle-about">
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
        <div className="tt-section padding-bottom-xlg-150">
          <div className="tt-section-inner tt-wrap max-width-900">
            <div className="text-xxlg font-alter text-gray-2">
              <p className="anim-fadeinup">
                Ciao, mi chiamo <strong className="text-white">Matteo Malaspina</strong>{" "}
                ho 25 anni ed abito a Fermo (FM). Dopo il diploma di scuola secondaria
                superiore ho frequentato il corso biennale all&apos;Istituto Tecnico
                Superiore (ITS SMART) ottenendo il titolo di &quot;Tecnico Superiore
                delle produzioni e del Marketing&quot; con votazione 90/100.
              </p>
              <p className="anim-fadeinup">
                Grazie a questo percorso di studi è nata la mia passione per la
                Programmazione e lo Sviluppo Web. Ho migliorato le mie conoscenze in
                questo ambito lavorando 1 anno come stagista presso{" "}
                <a href="https://andriy.tech/" target="_blank" rel="noopener noreferrer">
                  Andriy Sidletskyy
                </a>{" "}
                (Web Developer Freelance) ottime sono le mie nozioni in:
                <br />- Sviluppo di siti vetrina ed E-commerce tramite un C.M.S;
                <br />- Sviluppo di siti tramite Html, Css e Javascript;
                <br />- Strumenti e tecniche SEO;
                <br />- Strumenti di Google (Analytics, Google ADS e AdSense;
              </p>
              <p className="anim-fadeinup">
                Da Gennaio 2022 ho avuto modo di consolidare le mie competenze lavorando
                come stagista presso la Web Agency{" "}
                <a href="https://wemadeit.it/" target="_blank" rel="noopener noreferrer">
                  WeMadeIt Studio
                </a>{" "}
                dove attualmente ricopro il ruolo di Programmatore Web.
              </p>
            </div>
          </div>
        </div>

        <div className="tt-section padding-bottom-xlg-150">
          <div className="tt-section-inner tt-wrap">
            <div className="tt-page-nav tt-pn-scroll">
              <a href="/i-miei-lavori" className="tt-pn-link anim-fadeinup">
                <div className="tt-pn-title">Portfolio</div>
                <div className="tt-pn-hover-title">Portfolio</div>
              </a>
              <div className="tt-pn-subtitle anim-fadeinup">I miei lavori</div>
              <div className="tt-pn-image">
                <img src="/assets/img/page-header/my-works.jpg" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </SiteLayout>
  );
}
