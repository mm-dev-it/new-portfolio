import type { Metadata } from "next";
import SiteDocument from "@/components/SiteDocument";
import SiteLayout, { SiteFooter } from "@/components/SiteLayout";
import "./globals.css";

/*
 * 404 globale: con due root layout ((current) e (v2)) Next non può comporre la 404 da un
 * layout solo, quindi la pagina porta con sé <html>/<body> tramite SiteDocument.
 * Richiede experimental.globalNotFound in next.config.ts.
 */
export const metadata: Metadata = {
  title: "Pagina non trovata | Matteo Malaspina",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <SiteLayout>
        <div
          id="page-header"
          className="ph-full ph-cap-xxlg ph-center ph-image-cropped ph-image-cover-2 ph-content-parallax"
        >
          <div className="page-header-inner tt-wrap">
            <div className="ph-image">
              <div
                className="ph-image-inner"
                style={{
                  backgroundImage: "url(/assets/img/page-header/ph-7.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
            <div className="ph-caption">
              <h1 className="ph-caption-title ph-appear">404</h1>
              <div className="ph-caption-title-ghost ph-appear">404</div>
              <div className="ph-caption-subtitle ph-appear">Pagina non trovata</div>
            </div>
          </div>
        </div>

        <div id="page-content" className="tt-section">
          <div className="tt-section-inner tt-wrap text-center">
            <div className="tt-btn tt-btn-link margin-top-40">
              <a href="/" data-hover="Torna alla Home">
                Torna alla Home
              </a>
            </div>
          </div>
        </div>

        <SiteFooter />
      </SiteLayout>
    </SiteDocument>
  );
}
