// Client-taugliche TikTok-Bausteine (kein Server-Import): werden sowohl
// von der Carousel-Komponente als auch von der Server-Datenschicht genutzt.

export const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@flatties.ch";

export type TikTokPost = {
  url: string;
  title: string;
  thumbnailUrl: string;
};
