export type NavKey = "home" | "portfolio" | "about";

type SiteHeaderProps = {
  active?: NavKey;
};

export default function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header id="tt-header" className="tt-header-fixed">
      <div className="tt-header-inner">
        <div className="tt-header-col">
          <div className="tt-logo">
            <a href="/">
              <img
                src="/assets/img/matteo-malaspina-logo-white.png"
                className="tt-logo-light magnetic-item"
                alt="Logo"
              />
              <img
                src="/assets/img/matteo-malaspina-logo-dark.png"
                className="tt-logo-dark magnetic-item"
                alt="Logo"
              />
            </a>
          </div>
        </div>

        <div className="tt-header-col">
          <div id="tt-ol-menu-toggle-btn-wrap">
            <div className="tt-ol-menu-toggle-btn-text">
              <span className="text-menu" data-hover="Apri">
                Menu
              </span>
              <span className="text-close">Chiudi</span>
            </div>
            <div className="tt-ol-menu-toggle-btn-holder">
              <a href="#" className="tt-ol-menu-toggle-btn magnetic-item">
                <span></span>
              </a>
            </div>
          </div>

          <nav className="tt-overlay-menu tt-ol-menu-center tt-ol-menu-count">
            <div className="tt-ol-menu-holder">
              <div className="tt-ol-menu-inner tt-wrap">
                <div className="tt-ol-menu-content">
                  <ul className="tt-ol-menu-list">
                    <li
                      className={`tt-ol-submenu-wrap${active === "home" ? " active" : ""}`}
                    >
                      <div className="tt-ol-submenu-trigger">
                        <a href="/">Home</a>
                      </div>
                    </li>
                    <li
                      className={`tt-ol-submenu-wrap${active === "portfolio" ? " active" : ""}`}
                    >
                      <div className="tt-ol-submenu-trigger">
                        <a href="/i-miei-lavori">Portfolio</a>
                      </div>
                    </li>
                    <li
                      className={`tt-ol-submenu-wrap${active === "about" ? " active" : ""}`}
                    >
                      <div className="tt-ol-submenu-trigger">
                        <a href="/about-me">Chi Sono</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-noise"></div>
          </nav>
        </div>
      </div>
    </header>
  );
}
