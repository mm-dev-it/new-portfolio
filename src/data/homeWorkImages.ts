/** Immagini home — scroll orizzontale progetti (8 slide, ordine 1→8) */
export const homeWorkSlideImages = [
  "/assets/img/home-work/barrakuda-menu-work-mm-web-app.jpg",
  "/assets/img/home-work/work-slide-02.jpg",
  "/assets/img/home-work/ecom-ai-solutions-work-mm.jpg",
  "/assets/img/home-work/work-slide-04.jpg",
  "/assets/img/home-work/work-slide-05.jpg",
  "/assets/img/home-work/work-slide-06.jpg",
  "/assets/img/home-work/work-slide-07.jpg",
  "/assets/img/home-work/work-slide-08.jpg",
] as const;

export function getHomeWorkSlideImage(index: number): string {
  return homeWorkSlideImages[index] ?? homeWorkSlideImages[0];
}
