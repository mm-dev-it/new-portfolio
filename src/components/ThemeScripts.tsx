import Script from "next/script";

/**
 * Script del tema legacy (jQuery + GSAP + theme.js).
 * Un solo loader, dopo l'hydration, che carica theme.bundle.js (tutto concatenato: 1 richiesta)
 * (prima jQuery/GSAP erano sincroni nell'<head>). Swiper, Isotope, lightGallery e mousewheel
 * sono stati rimossi: nessuna pagina li usa. home-work-scroll.js si auto-disattiva fuori dalla home.
 */
export default function ThemeScripts() {
  return (
    <Script src="/assets/js/theme-loader.js" strategy="afterInteractive" />
  );
}
