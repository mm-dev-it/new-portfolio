import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import ThemeScripts from "@/components/ThemeScripts";
import "./globals.css";

const heroImageUrl = `${siteConfig.url}${siteConfig.heroImage}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Matteo Malaspina | Creazione Siti Web a Fermo - Sviluppatore Web",
    template: "%s | Matteo Malaspina",
  },
  description:
    "Matteo Malaspina, sviluppatore web a Fermo (Marche). Creazione siti web vetrina, e-commerce, landing page e web app con React, Next.js e TypeScript.",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Matteo Malaspina",
    "Matteo Malaspina sviluppatore web",
    "creazione siti web Fermo",
    "sviluppatore web Fermo",
    "web developer Marche",
    "React",
    "Next.js",
    "TypeScript",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: "Matteo Malaspina | Sviluppatore Web a Fermo",
    description:
      "Portfolio di Matteo Malaspina: creazione siti web, e-commerce, landing page e web app a Fermo, Marche.",
    images: [
      {
        url: siteConfig.heroImage,
        width: 1200,
        height: 1600,
        alt: "Matteo Malaspina — Sviluppatore Web a Fermo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matteo Malaspina | Sviluppatore Web a Fermo",
    description:
      "Creazione siti web vetrina, e-commerce, landing page e web app. Fermo, Marche.",
    images: [siteConfig.heroImage],
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
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: heroImageUrl,
      jobTitle: "Sviluppatore Web",
      description:
        "Sviluppatore web freelance a Fermo specializzato in React, Next.js e TypeScript. Creazione siti web, e-commerce, landing page e web app.",
      email: siteConfig.email,
      telephone: "+393347145447",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Contrada Santo Stefano 3",
        addressLocality: "Fermo",
        addressRegion: "Marche",
        postalCode: "63900",
        addressCountry: "IT",
      },
      sameAs: [siteConfig.linkedin],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Sviluppo web",
        "Creazione siti web",
        "E-commerce",
        "Landing page",
        "Web app",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.title,
      image: heroImageUrl,
      url: siteConfig.url,
      description:
        "Creazione siti web vetrina, e-commerce, landing page e web app a Fermo, Marche.",
      telephone: "+393347145447",
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Contrada Santo Stefano 3",
        addressLocality: "Fermo",
        addressRegion: "Marche",
        postalCode: "63900",
        addressCountry: "IT",
      },
      areaServed: [
        { "@type": "City", name: "Fermo" },
        { "@type": "AdministrativeArea", name: "Marche" },
        { "@type": "Country", name: "Italia" },
      ],
      founder: { "@id": `${siteConfig.url}/#person` },
      sameAs: [siteConfig.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.title,
      description:
        "Portfolio ufficiale di Matteo Malaspina, sviluppatore web a Fermo.",
      publisher: { "@id": `${siteConfig.url}/#person` },
      inLanguage: "it-IT",
    },
  ],
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
            __html: `(function(){var p=location.pathname;if(p==="/"||p===""){document.documentElement.classList.add("mat-preload-home");document.addEventListener("DOMContentLoaded",function(){document.body.classList.add("mat-preloader-active");document.body.dataset.matPreloader="true";});}})();`,
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
