import type { Metadata } from "next";

import Script from "next/script";

import SiteLayout from "@/components/SiteLayout";

import HomeHeroSection from "@/components/home/HomeHeroSection";

import HomeSections from "@/components/legacy/HomeSections";



export const metadata: Metadata = {

  title:

    "Creazione Siti Web a Fermo | Matteo Malaspina - Sviluppatore Web Marche",

  description:

    "Sviluppatore web freelance a Fermo, Marche. Realizzo siti web vetrina, e-commerce e landing page su misura per professionisti e aziende nella provincia di Fermo.",

  alternates: { canonical: "/" },

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


