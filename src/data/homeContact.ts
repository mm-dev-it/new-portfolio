import { siteConfig } from "./site";

export const homeContactContent = {
  label: "Get in Touch",
  titleLine1: "Hai un progetto",
  titleLine2: "in mente?",
  subtitle: "Scrivimi e costruiamo qualcosa di straordinario insieme.",
  email: siteConfig.email,
  cta: "Inizia un progetto",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: siteConfig.linkedin },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
  footerText: `© ${new Date().getFullYear()} Matteo Malaspina — Crafted with code & passion`,
} as const;
