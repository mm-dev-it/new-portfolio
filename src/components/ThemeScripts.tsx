import Script from "next/script";

export default function ThemeScripts() {
  return (
    <>
      <Script src="/assets/vendor/jquery/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/assets/vendor/gsap/gsap.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/gsap-shim.js" strategy="beforeInteractive" />
      <Script src="/assets/vendor/gsap/ScrollToPlugin.min.js" strategy="beforeInteractive" />
      <Script src="/assets/vendor/gsap/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="/assets/vendor/gsap/ScrollSmoother.min.js" strategy="beforeInteractive" />
      <Script src="/assets/vendor/swiper/js/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/isotope/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/isotope/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/isotope/packery-mode.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/lightgallery/js/lightgallery-all.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/jquery.mousewheel.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/theme.js" strategy="afterInteractive" />
      <Script src="/assets/js/next-init.js" strategy="afterInteractive" />
      <Script src="/assets/js/form-handler.js" strategy="afterInteractive" />
    </>
  );
}
