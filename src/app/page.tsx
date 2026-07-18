import type { Metadata } from "next";

import Script from "next/script";

import SiteLayout from "@/components/SiteLayout";

import HomeHeroSection from "@/components/home/HomeHeroSection";

import HomeSections from "@/components/legacy/HomeSections";



export const metadata: Metadata = {
  title:
    "Matteo Malaspina | Creazione Siti Web a Fermo - Sviluppatore Web",
  description:
    "Matteo Malaspina, sviluppatore web a Fermo (Marche). Creazione siti web vetrina, e-commerce, landing page e web app con React, Next.js e TypeScript.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Matteo Malaspina | Creazione Siti Web a Fermo",
    description:
      "Portfolio ufficiale: siti web, e-commerce, landing page e web app a Fermo, Marche.",
    images: [
      {
        url: "/assets/img/matteo-malaspina-hero-2.png",
        alt: "Matteo Malaspina — Sviluppatore Web a Fermo",
      },
    ],
  },
};



export default function HomePage() {

  return (

    <SiteLayout active="home" matPreloader>

      <HomeHeroSection />



      <div id="page-content">

        <HomeSections />

      </div>



      <Script src="/assets/js/home-work-scroll.js" strategy="afterInteractive" />

    </SiteLayout>

  );

}


