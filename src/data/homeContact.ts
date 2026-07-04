import { siteConfig } from "./site";

export const homeContactContent = {
  label: "Get in Touch",
  titleLine1: "Hai un progetto",
  titleLine2: "in mente?",
  subtitle: "Scrivimi e costruiamo qualcosa di straordinario insieme.",
  email: siteConfig.email,
  cta: "Inizia un progetto",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/matteo-malaspina-web-developer/",
    },
    { label: "Gmail", href: "mailto:mtt.malaspina@gmail.com" },
  ],
  footerText: "2026 _ M.M. P.iva 02514710447 _ © Tutti i diritti riservati",
} as const;
