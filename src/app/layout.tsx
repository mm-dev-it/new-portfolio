import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import ThemeScripts from "@/components/ThemeScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Creazione Siti Web a Fermo | Matteo Malaspina - Sviluppatore Web Marche",
    template: "%s | Matteo Malaspina",
  },
  description:
    "Sviluppatore web freelance a Fermo, Marche. Realizzo siti web vetrina, e-commerce e landing page su misura per professionisti e aziende nella provincia di Fermo.",
  authors: [{ name: siteConfig.name }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: siteConfig.title,
    images: [{ url: "/assets/img/mm.png" }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/img/mm.png", type: "image/png" },
    ],
    shortcut: "/assets/img/mm.png",
    apple: [
      { url: "/assets/img/mm.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.title,
  description:
    "Sviluppatore web freelance specializzato nella creazione di siti web vetrina, e-commerce e landing page a Fermo, Marche.",
  url: siteConfig.url,
  telephone: "+393347145447",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Contrada Santo Stefano 3",
    addressLocality: "Fermo",
    addressRegion: "Marche",
    postalCode: "63900",
    addressCountry: "IT",
  },
  founder: {
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Sviluppatore Web",
    sameAs: [siteConfig.linkedin],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=location.pathname;if(p==="/"||p===""){document.documentElement.classList.add("mat-preload-home","home-native-scroll");document.addEventListener("DOMContentLoaded",function(){document.body.classList.add("mat-preloader-active","tt-no-smooth-scroll");document.body.dataset.matPreloader="true";});}})();`,
          }}
        />
        <link rel="stylesheet" href="/assets/vendor/normalize.min.css" />
        <link
          rel="stylesheet"
          href="/assets/vendor/fontawesome/css/fontawesome-all.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/swiper/css/swiper-bundle.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/lightgallery/css/lightgallery.min.css"
        />
        <link rel="stylesheet" href="/assets/css/helper.css" />
        <link rel="stylesheet" href="/assets/css/theme.css" />
        <link rel="stylesheet" href="/assets/css/mat-overrides.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        id="body"
        className="tt-transition tt-boxed tt-smooth-scroll"
      >
        {children}
        <ThemeScripts />
      </body>
    </html>
  );
}
