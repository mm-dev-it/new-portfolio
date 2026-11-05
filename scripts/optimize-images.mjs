/**
 * Genera versioni WebP ridimensionate delle immagini usate dal sito.
 * Uso: node scripts/optimize-images.mjs
 * Gli originali restano in git (non vengono esportati se non referenziati).
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const OUT_ROOT = path.resolve(import.meta.dirname, "..", "public", "assets", "img");
// Gli originali JPG/PNG stanno fuori da public (non vengono esportati): legacy/img-src/<cartella>
const SRC_ROOT = path.resolve(import.meta.dirname, "..", "legacy", "img-src");
const ROOT = OUT_ROOT;

/** cartella → larghezza massima */
const JOBS = [
  { dir: "home-work", maxWidth: 1400, quality: 78 },
  { dir: "home-work", maxWidth: 760, quality: 76, suffix: "-760" }, // variante mobile per srcset
  { dir: "portfolio", maxWidth: 1400, quality: 78 },
  { dir: "page-header", maxWidth: 1600, quality: 78 },
  { dir: ".", maxWidth: 854, quality: 82, only: /^matteo-malaspina-hero-2\.png$/, src: OUT_ROOT }, // resta in public: è l'immagine OG
];

const SRC_EXT = /\.(jpe?g|png)$/i;

async function convert(file, { maxWidth, quality, suffix = "" }, outDir) {
  const out = path.join(outDir, path.basename(file).replace(SRC_EXT, `${suffix}.webp`));
  const meta = await sharp(file).metadata();
  const width = Math.min(meta.width ?? maxWidth, maxWidth);
  await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(out);
  const [a, b] = await Promise.all([stat(file), stat(out)]);
  console.log(
    `${path.relative(ROOT, out).padEnd(60)} ${(a.size / 1024).toFixed(0).padStart(5)}KB → ${(b.size / 1024).toFixed(0).padStart(4)}KB`,
  );
}

for (const job of JOBS) {
  const dir = path.join(job.src ?? SRC_ROOT, job.dir);
  const outDir = path.join(OUT_ROOT, job.dir);
  await mkdir(outDir, { recursive: true });
  for (const name of await readdir(dir)) {
    if (!SRC_EXT.test(name)) continue;
    if (job.only && !job.only.test(name)) continue;
    await convert(path.join(dir, name), job, outDir);
  }
}
