import Icon from "@/components/Icon";

export default function HomeContactSection() {
  return (
    <div className="tt-section">
      <div className="tt-section-inner tt-wrap">
        <div className="tt-row">
          <div className="tt-col-lg-5 padding-right-lg-5-p">
            <div className="tt-heading tt-heading-lg margin-bottom-10-p anim-fadeinup">
              <h2 className="tt-heading-title">Contattami</h2>
              <h3 className="tt-heading-subtitle text-gray">
                Richiedi gratuitamente il tuo preventivo!
              </h3>
            </div>

            <ul className="tt-contact-info padding-bottom-40 text-gray">
              <li className="anim-fadeinup">
                <span className="tt-ci-icon">
                  <Icon name="map-marker" />
                </span>
                Contrada Santo Stefano 3, 63900 Fermo (FM) Italy
              </li>
              <li className="anim-fadeinup">
                <span className="tt-ci-icon">
                  <Icon name="phone" />
                </span>
                <a href="tel:+393347145447" className="tt-link">
                  +39 3347145447
                </a>
              </li>
              <li className="anim-fadeinup">
                <span className="tt-ci-icon">
                  <Icon name="envelope" />
                </span>
                <a href="mailto:info@matteomalaspina.it" className="tt-link">
                  info@matteomalaspina.it
                </a>
              </li>
              <li className="anim-fadeinup">
                <h6 className="no-margin-bottom margin-top-40">Seguimi:</h6>
                <div className="social-buttons">
                  <ul>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/matteo-malaspina-web-developer/"
                        className="magnetic-item"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="tt-col-lg-7">
            <form id="tt-contact-form" className="tt-form-minimal anim-fadeinup">
              <input type="hidden" name="project_name" value="matteomalaspina.it" />
              <input type="hidden" name="admin_email" value="info@matteomalaspina.it" />
              <input
                type="hidden"
                name="form_subject"
                value="Nuovo messaggio dal sito matteomalaspina.it"
              />

              <div className="tt-row">
                <div className="tt-col-md-6">
                  <div className="tt-form-group">
                    <label>
                      Nome e Cognome <span className="required">*</span>
                    </label>
                    <input
                      className="tt-form-control"
                      type="text"
                      name="Name"
                      required
                    />
                  </div>
                </div>
                <div className="tt-col-md-6">
                  <div className="tt-form-group">
                    <label>
                      Email<span className="required">*</span>
                    </label>
                    <input
                      className="tt-form-control"
                      type="email"
                      name="Email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="tt-form-group">
                <label>
                  Oggetto<span className="required">*</span>
                </label>
                <input
                  className="tt-form-control"
                  type="text"
                  name="Subject"
                  required
                />
              </div>

              <div className="tt-form-group">
                <label>
                  Seleziona un&apos;opzione<span className="required">*</span>
                </label>
                <select className="tt-form-control" name="option" required defaultValue="">
                  <option value="" disabled>
                    Per favore, seleziona un&apos;opzione
                  </option>
                  <option value="Sito Web">Sito Web</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Landing Page">Landing Page</option>
                </select>
              </div>

              <div className="tt-form-group">
                <label>
                  Messaggio <span className="required">*</span>
                </label>
                <textarea
                  className="tt-form-control"
                  rows={6}
                  name="Message"
                  required
                ></textarea>
              </div>

              <small className="tt-form-text">
                <em>
                  I campi contrassegnati da un asterisco (*) sono obbligatori!
                </em>
              </small>

              <div className="tt-btn tt-btn-light-outline margin-top-40">
                <button type="submit" data-hover="Invia Messaggio">
                  Invia Messaggio
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
