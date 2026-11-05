/**
 * Codice "di scena": realistico ma inventato. Serve come decorazione viva
 * (si digita da solo) sul monitor 3D e nei blocchi delle sezioni.
 */

export type Snippet = { file: string; lang: string; code: string };

/** Contenuti del monitor 3D, uno per sezione (stesso ordine delle sezioni). */
export const monitorSnippets: Record<"top" | "about" | "work" | "promis" | "contact", Snippet> = {
  top: {
    file: "hero.tsx",
    lang: "tsx",
    code: `import { useState } from "react";
import { motion } from "framer-motion";

export function Hero({ name }: { name: string }) {
  const [ready, setReady] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      onAnimationComplete={() => setReady(true)}
    >
      <h1>{name}</h1>
      <p>Prodotti digitali che funzionano.</p>
      {ready && <Cta href="#contact">Parliamone</Cta>}
    </motion.section>
  );
}`,
  },
  about: {
    file: "zsh — matteo@fermo",
    lang: "shell",
    code: `$ whoami
matteo — sviluppatore web, Fermo (MC)

$ git log --oneline --author="Matteo" | head -5
a3f9c21 feat(promis): rilascio pipeline v2
7d20e4b perf(web): immagini AVIF, -62% peso
c91b7aa feat(api): auth + realtime con Supabase
e4f1d03 chore(deploy): edge functions su Netlify
0b8a6f2 init: dall'idea al lancio

$ uptime
2020 → oggi · 60+ progetti online`,
  },
  work: {
    file: "projects.ts",
    lang: "ts",
    code: `export const selected = [
  { name: "BarraKuda", type: "web app", year: 2026 },
  { name: "GM Shop", type: "e-commerce", year: 2026 },
  { name: "Ecom-Ai", type: "landing", year: 2026 },
  { name: "Explora", type: "sito vetrina", year: 2025 },
  { name: "Samiflox", type: "e-commerce", year: 2026 },
] satisfies Project[];

export const stack = {
  frontend: ["Next.js", "React", "TypeScript"],
  backend: ["Supabase", "Node.js", "PostgreSQL"],
  deploy: ["Netlify", "Vercel", "Docker"],
};`,
  },
  promis: {
    file: "platform.ts",
    lang: "ts",
    code: `// Promis Music — architettura
export const promis = defineStack({
  web: next({ version: 16, app: true }),
  api: supabase({ auth: true, realtime: true }),
  db: postgres({ rls: true }),
  media: stream({ cdn: "edge" }),
  payments: stripe({ connect: true }),
  deploy: netlify({ edge: true }),
});

await promis.deploy();
✓ build passing · 0 errori`,
  },
  contact: {
    file: "contact.ts",
    lang: "ts",
    code: `const reply = await sendMessage({
  to: "mtt.malaspina@gmail.com",
  subject: "Nuovo progetto",
  body: "Ciao Matteo, avrei un'idea...",
});

→ 200 OK · risposta entro 1 giorno lavorativo`,
  },
};

/** Blocchi di codice nelle sezioni (DOM). */
export const sectionSnippets = {
  about: {
    file: "profile.ts",
    lang: "ts",
    code: `export const matteo = {
  role: "Sviluppatore web · CTO",
  base: "Fermo, Marche",
  since: 2020,
  focus: ["React", "Next.js", "Supabase"],
  startup: { name: "Promis Music", role: "co-founder" },
  available: true,
};`,
  },
  promis: {
    file: "architecture.ts",
    lang: "ts",
    code: `// Un solo referente tecnico, tutta la piattaforma
const platform = compose(
  frontend(next16),
  auth(supabase),
  data(postgres),
  media(stream),
  billing(stripe),
);

export default deploy(platform, { region: "eu" });`,
  },
  contact: {
    file: "status.json",
    lang: "json",
    code: `{
  "status": "available",
  "reply_within": "1 giorno lavorativo",
  "timezone": "Europe/Rome",
  "coords": [43.16, 13.72]
}`,
  },
} satisfies Record<string, Snippet>;

/** Righe del preloader a terminale. */
export const preloaderLines = [
  "$ npm run matteo",
  "",
  "> portfolio@2.0.0 dev",
  "> next dev --turbopack",
  "",
  "▲ Next.js 16 · Turbopack",
  "- Local:   http://localhost:3000",
  "✓ Compilato in 861ms",
  "✓ Scena 3D pronta",
  "✓ Ready",
];
