/**
 * Concatena gli script del tema legacy in un unico file: public/assets/js/theme.bundle.js
 * (10 richieste → 1: su mobile ogni richiesta costa ~150 ms di latenza).
 * Da rilanciare dopo ogni modifica a theme.js / home-work-scroll.js: node scripts/bundle-theme.mjs
 */
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "public");
const FILES = [
  "assets/vendor/jquery/jquery.min.js",
  "assets/vendor/gsap/gsap.min.js",
  "assets/js/gsap-shim.js",
  "assets/vendor/gsap/ScrollToPlugin.min.js",
  "assets/vendor/gsap/ScrollTrigger.min.js",
  "assets/vendor/gsap/ScrollSmoother.min.js",
  "assets/js/theme.js",
  "assets/js/next-init.js",
  "assets/js/form-handler.js",
  "assets/js/home-work-scroll.js",
];

const parts = [];
for (const f of FILES) {
  const src = await readFile(path.join(ROOT, f), "utf8");
  // ";" di sicurezza tra file minificati che non terminano con punto e virgola
  parts.push(`/* ---- ${f} ---- */\n;${src}\n`);
}
const out = path.join(ROOT, "assets/js/theme.bundle.js");
await writeFile(out, parts.join("\n"));
console.log(`theme.bundle.js: ${((await stat(out)).size / 1024).toFixed(0)}KB da ${FILES.length} file`);
