/**
 * Contenuti della v2. Tutto il testo del sito nuovo sta qui,
 * così si cambia senza toccare i componenti.
 * Le parti in corsivo nei titoli vanno tra *asterischi*.
 */

export const v2Site = {
  name: "Matteo Malaspina",
  short: "mm",
  role: "Sviluppatore web & CTO",
  location: "Fermo, Marche",
  coords: "43.16°N · 13.72°E",
  version: "v2.0.0",
  email: "mtt.malaspina@gmail.com",
  linkedin: "https://www.linkedin.com/in/matteo-malaspina-web-developer/",
  whatsapp: `https://wa.me/393347145447?text=${encodeURIComponent(
    "Ciao Matteo! Vorrei parlarti del mio progetto.",
  )}`,
  available: true,
  nav: [
    { label: "chi-sono", href: "#about" },
    { label: "lavori", href: "#work" },
    { label: "promis-music", href: "#promis" },
    { label: "contatti", href: "#contact" },
  ],
} as const;

export const v2Hero = {
  eyebrow: "// sviluppatore web · cto @ promis music",
  title: ["Costruisco prodotti", "digitali che *funzionano*", "davvero."],
  lead:
    "Siti, e-commerce e web app dal primo confronto alla pubblicazione. Dal 2025 guido lo sviluppo di una startup musicale.",
  cta: { label: "Parliamone", href: "#contact" },
  secondary: { label: "Vedi i lavori", href: "#work" },
  scrollHint: "scroll",
  status: [
    ["status", "available"],
    ["stack", "react · next · supabase"],
    ["since", "2020"],
  ],
} as const;

export const v2About = {
  label: "// 01 — chi sono",
  title: ["Dall'idea", "al *lancio*."],
  paragraphs: [
    "Sono Matteo, 28 anni, Fermo. Lavoro con chi ha un'idea e vuole portarla online: analizzo il progetto, definisco struttura e interfaccia, sviluppo e metto tutto live.",
    "Sono socio e CTO di una startup innovativa nel mondo della musica, dove seguo l'intero sviluppo della piattaforma. Essere l'unico referente tecnico significa prendere decisioni ogni giorno e tenere il prodotto stabile mentre cresce.",
  ],
  timeline: [
    { year: "2025 — oggi", role: "CTO & co-founder", where: "Promis Music" },
    { year: "2022 — 2025", role: "Freelance developer", where: "Wemadeit Studio" },
    { year: "2020 — 2022", role: "Junior web developer", where: "Agenzie digitali" },
  ],
  stack: [
    { title: "frontend", items: "React, Next.js, TypeScript, Tailwind, GSAP, Three.js" },
    { title: "backend", items: "Node.js, PostgreSQL, Supabase, REST API" },
    { title: "infra", items: "Netlify, Vercel, Docker, GTM, GA4, Mixpanel" },
    { title: "ai tools", items: "Cursor, Claude, Higgsfield, Luma" },
  ],
} as const;

export const v2Work = {
  label: "// 02 — lavori selezionati",
  title: ["Progetti", "*recenti*."],
  allLabel: "Tutti i progetti",
  allHref: "/i-miei-lavori",
} as const;

/**
 * SEZIONE PROMIS MUSIC — da completare con i numeri reali.
 * I valori "—" sono segnaposto: sostituiscili prima di andare online.
 */
export const v2Promis = {
  label: "// 03 — startup",
  name: "Promis Music",
  tagline: ["La piattaforma", "che collega *artisti*", "e professionisti."],
  description:
    "Promis Music è una startup innovativa nel settore musicale. Come CTO e co-founder ho progettato e sviluppato l'intera piattaforma, dall'architettura al rilascio.",
  stats: [
    { value: "—", label: "artisti iscritti" },
    { value: "—", label: "mesi dal lancio" },
    { value: "—", label: "crescita mensile" },
  ],
  cta: {
    label: "Richiedi il deck investitori",
    href: "mailto:mtt.malaspina@gmail.com?subject=Promis%20Music%20%E2%80%94%20richiesta%20deck",
  },
  secondary: { label: "Visita Promis Music", href: "https://promismusic.com" },
} as const;

export const v2Contact = {
  label: "// 04 — contatti",
  title: ["Hai un progetto", "in *mente*?"],
  lead: "Scrivimi: rispondo entro un giorno lavorativo.",
} as const;
