export default function SiteFooter() {
  return (
    <footer id="tt-footer">
      <div className="tt-footer-inner">
        <div className="footer-col tt-align-center-left">
          <div className="footer-col-inner">
            <div className="tt-btn tt-btn-link">
              <a href="#" className="scroll-to-top" data-hover="Torna in alto">
                Torna in alto
              </a>
            </div>
          </div>
        </div>

        <div className="footer-col tt-align-center order-m-last">
          <div className="footer-col-inner">
            <div className="tt-copyright">© Copyright - Matteo Malaspina</div>
          </div>
        </div>

        <div className="footer-col tt-align-center-right">
          <div className="footer-col-inner">
            <div className="footer-social">
              <div className="footer-social-text">
                <span>Seguimi</span>
                <i className="fas fa-share-alt"></i>
              </div>
              <div className="social-buttons">
                <ul>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/matteo-malaspina-front-end-developer/"
                      className="magnetic-item"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
