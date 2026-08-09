// Kuratierte TikTok-Beiträge fürs Karten-Carousel: Video-URLs hier ergänzen
// (TikTok-App: Teilen → Link kopieren). Titel und Vorschaubild kommen
// serverseitig über den öffentlichen oEmbed-Endpunkt — kein API-Key, kein
// TikTok-Script im Browser. Die signierten Thumbnail-URLs laufen nach ~48h
// ab; mit dem 6h-Cache wird immer rechtzeitig eine frische geholt.

const TIKTOK_VIDEO_URLS = [
  "https://www.tiktok.com/@flatties.ch/video/7620931353512561942",
];

export const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@flatties.ch";

const OEMBED_REVALIDATE = 21600;

export type TikTokPost = {
  url: string;
  title: string;
  thumbnailUrl: string;
};

/**
 * Holt die oEmbed-Daten aller kuratierten Videos. Nicht erreichbare oder
 * gelöschte Videos fallen still raus — bleibt nichts übrig, rendert die
 * Website die Sektion einfach nicht.
 */
export async function getTikTokPosts(): Promise<TikTokPost[]> {
  const posts = await Promise.all(
    TIKTOK_VIDEO_URLS.map(async (url): Promise<TikTokPost | null> => {
      try {
        const res = await fetch(
          `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
          { next: { revalidate: OEMBED_REVALIDATE } }
        );
        if (!res.ok) {
          console.error("tiktok oembed failed:", res.status, url);
          return null;
        }
        const data = await res.json();
        if (typeof data.thumbnail_url !== "string") return null;
        const rawTitle = typeof data.title === "string" ? data.title : "";
        return {
          url,
          // Hashtags aus dem Titel entfernen — auf den Karten stört das nur
          title: rawTitle.replace(/#\S+/g, "").replace(/\s+/g, " ").trim(),
          thumbnailUrl: data.thumbnail_url,
        };
      } catch (err) {
        console.error("tiktok oembed failed:", url, err);
        return null;
      }
    })
  );
  return posts.filter((p): p is TikTokPost => p !== null);
}
