import SmoothScroll from "@/v2/components/SmoothScroll";
import Preloader from "@/v2/components/Preloader";
import Cursor from "@/v2/components/Cursor";
import Nav from "@/v2/components/Nav";
import Scene from "@/v2/components/Scene";
import Hero from "@/v2/components/Hero";
import About from "@/v2/components/About";
import Work from "@/v2/components/Work";
import Promis from "@/v2/components/Promis";
import Contact from "@/v2/components/Contact";
import Footer from "@/v2/components/Footer";

export default function V2HomePage() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Nav />
      <Scene />
      <main className="v2-main">
        <Hero />
        <About />
        <Work />
        <Promis />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
