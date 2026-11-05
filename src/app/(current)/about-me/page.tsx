import type { Metadata } from "next";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import SiteLayout, { SiteFooter } from "@/components/SiteLayout";
import { worksHeroContent } from "@/data/worksHero";
import "./about-me.css";

export const metadata: Metadata = {
  title: "Chi Sono | Matteo Malaspina - Sviluppatore Web Freelance a Fermo",
  description:
    "Sono Matteo Malaspina, sviluppatore web di Fermo (FM), Marche. Creo siti web, e-commerce e landing page per aziende e professionisti.",
  alternates: { canonical: "/about-me" },
};

export default function AboutPage() {
  return (
    <SiteLayout active="about">
      <AboutHeroSection />

      <div id="page-content">
        <div className="tt-section padding-bottom-xlg-150">
          <div className="tt-section-inner tt-wrap max-width-900">
            <div className="about-me-content text-xxlg font-alter text-gray-2">
              <p className="anim-fadeinup">
                Mi chiamo Matteo Malaspina, ho 28 anni e vivo a Fermo.
              </p>
              <p className="anim-fadeinup">
                Lavoro come Web Developer e, negli ultimi anni, ho costruito il mio
                percorso partendo dalla pratica. Dopo il diploma e il percorso ITS SMART
                ho scelto di lavorare a stretto contatto con sviluppatori senior e agenzie
                digitali, trasformando quella che era una semplice esperienza di
                formazione in una collaborazione professionale.
              </p>
              <p className="anim-fadeinup">
                Questa esperienza mi ha permesso di seguire progetti dall&apos;inizio alla
                fine, non limitandomi allo sviluppo del codice ma occupandomi anche
                dell&apos;organizzazione del lavoro, del rapporto con il cliente e delle
                decisioni tecniche necessarie per portare un prodotto online.
              </p>
              <p className="anim-fadeinup">
                Oggi sviluppo principalmente applicazioni web con React, utilizzando
                Supabase per il backend e Netlify per il deployment. Mi occupo inoltre
                della gestione dell&apos;infrastruttura, della configurazione dei server e
                dell&apos;implementazione di sistemi di tracking e analytics con GTM, GA4,
                Microsoft Clarity e Mixpanel.
              </p>
              <p className="anim-fadeinup">
                Parallelamente sono socio e CTO di una startup innovativa, dove seguo
                l&apos;intero sviluppo della piattaforma. Essere l&apos;unico referente
                tecnico significa prendere decisioni ogni giorno, trovare soluzioni ai
                problemi e mantenere il prodotto stabile mentre continua a crescere.
              </p>
              <p className="anim-fadeinup">
                È probabilmente questo l&apos;aspetto del mio lavoro che mi piace di più,
                affrontare problemi complessi, capire perché qualcosa non funziona e
                trovare il modo migliore per risolverlo. Più che scrivere codice, mi piace
                costruire prodotti che funzionano davvero e che siano semplici da
                utilizzare, mantenere e far evolvere nel tempo.
              </p>
              <p className="anim-fadeinup">
                Credo molto nell&apos;autonomia e nella responsabilità. Quando seguo un
                progetto cerco sempre di essere una figura su cui il cliente o il team
                possano contare, capace di gestire il lavoro con metodo e senza bisogno
                di supervisione continua.
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
                <img src={worksHeroContent.image} alt={worksHeroContent.imageAlt} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </SiteLayout>
  );
}
