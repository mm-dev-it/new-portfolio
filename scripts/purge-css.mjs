/**
 * Rimuove dal CSS del tema (helper.css + theme.css, ~430 KB) le regole che il sito non usa.
 * Sorgenti: legacy/css/*.css  →  output: public/assets/css/*.min.css
 * Uso: node scripts/purge-css.mjs
 */
import { PurgeCSS } from "purgecss";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "legacy", "css");
const OUT = path.join(ROOT, "public", "assets", "css");

// Classi che theme.js/home-work-scroll.js aggiungono a runtime o che appartengono
// a componenti usati: tenute sempre (il purge analizza anche il JS, questa è la rete di sicurezza).
// Classi aggiunte a runtime da theme.js / home-work-scroll.js / componenti (estratte con grep su
// addClass/toggleClass/classList.add/markup iniettato). theme.js NON è tra i content: contiene i
// selettori di tutte le feature del template, anche quelle che il sito non usa.
const runtimeClasses = `active ball-close-enabled bi-item-image-on blog-interactive-hover-on is-firefox is-mobile
made-with-love-on mat-ph-enter-done not-hide-cursor olm-toggle-no-click ph-appear ph-bg-image-light-on ph-bg-image-on
ph-image-on ph-share-on ph-share-open pi-item-hover portfolio-interactive-hover-on project-info-list-on
psi-light-image-on swtr-smooth tt-header-fixed-on tt-header-tools-dynamic-on tt-header-tools-on tt-m-menu-open
tt-m-menu-toggle-no-click tt-m-submenu-open tt-mm-hover tt-no-scroll tt-ol-menu-hover tt-ol-menu-open
tt-ol-submenu-open tt-pn-hover-on tt-submenu-open is-active is-hover is-visible mat-custom-cursor mat-page-enter
mat-pn-hover-on mat-preload-done mat-preloader-active anim-image-parallax-inner anim-image-parallax-wrap
anim-zoomin-wrap magnetic-wrap ph-cat-parallax ph-ghost-parallax ph-pil-parallax ph-subt-parallax ph-title-parallax
pli-image-hover-zoom tt-m-caret tt-ps-appear tt-submenu-trigger-m tt-smooth-scroll tt-no-smooth-scroll
html body`.split(/\s+/).filter(Boolean);

const safelist = {
  standard: runtimeClasses,
  deep: [/^tt-ol-/, /^tt-m-menu/, /^tt-header/, /^tt-pn/, /^tt-page-nav/, /^ph-/, /^mat-/, /^magnetic/],
};

await mkdir(OUT, { recursive: true });

const results = await new PurgeCSS().purge({
  content: [
    path.join(ROOT, "src/**/*.{tsx,ts,css}"),
    path.join(ROOT, "public/assets/js/home-work-scroll.js"),
    path.join(ROOT, "public/assets/js/form-handler.js"),
  ],
  css: [path.join(SRC, "helper.css"), path.join(SRC, "theme.css")],
  safelist,
  fontFace: true,
  keyframes: true,
  variables: false,
});

for (const r of results) {
  const name = path.basename(r.file, ".css") + ".min.css";
  const before = (await readFile(r.file, "utf8")).length;
  await writeFile(path.join(OUT, name), r.css);
  console.log(`${name.padEnd(16)} ${(before / 1024).toFixed(0)}KB → ${(r.css.length / 1024).toFixed(0)}KB`);
}
