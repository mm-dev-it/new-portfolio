/** Immagini home — scroll orizzontale progetti (8 slide, ordine 1→8) */
export const homeWorkSlideImages = [
  "/assets/img/home-work/barrakuda-menu-work-mm-web-app.webp",
  "/assets/img/home-work/work-slide-02.webp",
  "/assets/img/home-work/ecom-ai-solutions-work-mm.webp",
  "/assets/img/home-work/work-slide-04.webp",
  "/assets/img/home-work/work-slide-05.webp",
  "/assets/img/home-work/work-slide-06.webp",
  "/assets/img/home-work/work-slide-07.webp",
  "/assets/img/home-work/work-slide-08.webp",
] as const;

export function getHomeWorkSlideImage(index: number): string {
  return homeWorkSlideImages[index] ?? homeWorkSlideImages[0];
}
