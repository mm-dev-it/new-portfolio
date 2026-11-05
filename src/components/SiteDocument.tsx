import { IBM_Plex_Mono, Syne } from "next/font/google";
import ThemeScripts from "@/components/ThemeScripts";

// Font self-hosted da Next (niente CSS esterno render-blocking da Google Fonts).
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/*
 * Script inline eseguito prima di tutto:
 * 1) Preloader solo in home e solo su desktop: su mobile la hero deve comparire subito (LCP),
 *    senza aspettare contatore + hydration.
 * 2) Su touch niente ScrollSmoother: scroll nativo, più fluido.
 * 3) Senza preloader l'animazione d'ingresso parte da qui, prima che React sia pronto.
 */
const bootScript = `(function(){var p=location.pathname,h=document.documentElement,t=matchMedia("(pointer: coarse)").matches||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);if(t){h.classList.add("mat-no-enter");}if((p==="/"||p==="")&&!t){h.classList.add("mat-preload-home");}document.addEventListener("DOMContentLoaded",function(){var b=document.body;if(h.classList.contains("mat-preload-home")){b.classList.add("mat-preloader-active");b.dataset.matPreloader="true";}else if(t){h.classList.add("mat-page-enter");var ph=document.querySelector("#page-header.mat-ph-enter");if(ph){ph.classList.add("mat-ph-enter-done");}}else{requestAnimationFrame(function(){h.classList.add("mat-page-enter");});}if(t){b.classList.add("tt-no-smooth-scroll");}});})();`;

type SiteDocumentProps = {
  children: React.ReactNode;
  /** contenuto extra per <head> (es. JSON-LD) */
  head?: React.ReactNode;
};

/** <html>/<head>/<body> del sito: usato dal layout principale e dalla 404 globale. */
export default function SiteDocument({ children, head }: SiteDocumentProps) {
  return (
    <html lang="it" className={`${syne.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="stylesheet" href="/assets/vendor/normalize.min.css" />
        <link rel="stylesheet" href="/assets/css/helper.min.css" />
        <link rel="stylesheet" href="/assets/css/theme.min.css" />
        <link rel="stylesheet" href="/assets/css/mat-overrides.css" />
        {head}
      </head>
      <body id="body" className="tt-transition tt-boxed tt-smooth-scroll">
        {children}
        <ThemeScripts />
      </body>
    </html>
  );
}
