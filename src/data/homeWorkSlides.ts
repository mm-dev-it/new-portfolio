export type HomeWorkSlide = {
  title: string;
  slug: string;
  description?: string;
};

/** Home — slide work orizzontale (ordine allineato a homeWorkSlideImages) */
export const homeWorkSlides: HomeWorkSlide[] = [
  { title: "BarraKuda", slug: "barrakuda" },
  { title: "GM Shop", slug: "gm-shop" },
  { title: "Ecom-Ai", slug: "ecom-ai" },
  { title: "Roger SushiLab", slug: "roger-sushi-lab" },
  { title: "Explora Expedition", slug: "explora-expedition" },
  { title: "Rita Gas", slug: "rita-gas" },
  { title: "Samiflox", slug: "samiflox" },
  { title: "Le Castellane", slug: "le-castellane" },
];

export function getHomeWorkSlideHref(slide: HomeWorkSlide): string {
  return `/${slide.slug}`;
}
