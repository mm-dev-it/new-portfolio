"use client";

import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import "./mat-cookie-consent.css";

const CONSENT_KEY = "mat-cookie-consent";

const cookieTextPreview =
  "Utilizziamo cookie tecnici necessari al funzionamento del sito e per memorizzare la tua scelta sui cookie. I font sono caricati tramite Google Fonts e possono comportare un trattamento limitato di dati tecnici (es. indirizzo IP) da parte di Google.";

const cookieTextMore =
  "Non utilizziamo cookie di profilazione o marketing. Titolare: Matteo Malaspina";

type MatCookieConsentProps = {
  waitForPreloader?: boolean;
};

export default function MatCookieConsent({
  waitForPreloader = false,
}: MatCookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const accept = useCallback((level: "all" | "necessary") => {
    try {
      localStorage.setItem(CONSENT_KEY, level);
      localStorage.setItem(`${CONSENT_KEY}-date`, new Date().toISOString());
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY)) return;
    } catch {
      return;
    }

    function reveal() {
      window.setTimeout(() => setVisible(true), 450);
    }

    if (waitForPreloader) {
      if (document.documentElement.classList.contains("mat-preload-done")) {
        reveal();
        return;
      }

      window.addEventListener("mat-preload-done", reveal, { once: true });
      return () => window.removeEventListener("mat-preload-done", reveal);
    }

    reveal();
  }, [waitForPreloader]);

  if (!visible) return null;

  return (
    <div
      className="mat-cookie-consent is-visible"
      role="dialog"
      aria-live="polite"
      aria-label="Informativa cookie"
    >
      <div className="mat-cookie-consent__inner">
        <div className="mat-cookie-consent__content">
          <p className="mat-cookie-consent__label">Privacy</p>
          <h2 className="mat-cookie-consent__title">Cookie e trattamento dati</h2>

          <p className="mat-cookie-consent__text mat-cookie-consent__text--desktop">
            {cookieTextPreview} {cookieTextMore}{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>

          <div className="mat-cookie-consent__text-mobile">
            <p className="mat-cookie-consent__text">{cookieTextPreview}</p>
            {expanded ? (
              <p className="mat-cookie-consent__text mat-cookie-consent__text--more">
                {cookieTextMore}{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            ) : null}
            <button
              type="button"
              className="mat-cookie-consent__read-more"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              {expanded ? "Mostra meno" : "Leggi di più"}
            </button>
          </div>
        </div>

        <div className="mat-cookie-consent__actions">
          <button
            type="button"
            className="mat-cookie-consent__btn mat-cookie-consent__btn--ghost"
            onClick={() => accept("necessary")}
          >
            Solo necessari
          </button>
          <button
            type="button"
            className="mat-cookie-consent__btn mat-cookie-consent__btn--primary"
            onClick={() => accept("all")}
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
