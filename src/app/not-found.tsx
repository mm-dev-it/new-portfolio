import SiteLayout, { SiteFooter } from "@/components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div
        id="page-header"
        className="ph-full ph-cap-xxlg ph-center ph-image-cropped ph-image-cover-2 ph-content-parallax"
      >
        <div className="page-header-inner tt-wrap">
          <div className="ph-image">
            <div className="ph-image-inner">
              <img src="/assets/img/page-header/ph-7.jpg" alt="Immagine" />
            </div>
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
  );
}
