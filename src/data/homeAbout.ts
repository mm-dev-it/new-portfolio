/** Contenuti identici alla sezione About di portfolio-mat */
export const homeAboutContent = {
  label: "About Me",
  title: "Dall'idea",
  titleAccent: "al lancio",
  paragraphs: [
    "Sono Mat, sviluppatore web. Lavoro con chi ha un'idea e vuole portarla online, con siti vetrina, e-commerce, landing page e web app dal primo confronto alla pubblicazione.",
    "Analizzo il progetto, definisco struttura e interfaccia, sviluppo e metto tutto live, dall'idea al sito che puoi mostrare e usare.",
  ],
  profile: {
    initials: "M",
    name: "Mat",
    role: "Sviluppatore Web",
    status: "Disponibile",
  },
  timeline: [
    {
      year: "2025 — now",
      role: "CTO Startup / Freelancer",
      company: "React, Node.js, Netifly, Supabase",
    },
    {
      year: "2022 — 2025",
      role: "Freelance Developer",
      company: "Wemadeit Studio · Ecommerce, Siti Vetrina, Landing Page",
    },
    {
      year: "2020 — 2022",
      role: "Junior Web Developer",
      company: "HTML, CSS, JS",
    },
  ],
  skills: [
    {
      num: "01",
      title: "Frontend",
      description: "React, Next.js, TypeScript, Tailwind, GSAP, HTML/CSS",
    },
    {
      num: "02",
      title: "Backend",
      description: "Node.js, PostgreSQL, Supabase, REST APIs",
    },
    {
      num: "03",
      title: "AI tools",
      description:
        "Cursor, Claude, Higgsfield, Open Design, Luma Dream Machine",
    },
    {
      num: "04",
      title: "DevOps",
      description: "Netlify, Plesk, Vercel, Docker, Git",
    },
  ],
} as const;
