// TikTok-Beiträge fürs Karten-Carousel. Primäre Quelle ist die Display API
// (verbundener @flatties.ch-Account, immer die neuesten Videos); solange kein
// Account verbunden ist oder die API nicht antwortet, greift die kuratierte
// Liste unten über den öffentlichen oEmbed-Endpunkt. In beiden Fällen läuft
// alles serverseitig — kein TikTok-Script, keine Cookies im Browser. Die
// signierten Thumbnail-URLs laufen nach ~48h ab; mit dem 6h-Cache der Seite
// wird immer rechtzeitig eine frische geholt.

import { getValidAccessToken } from "./tiktok-auth";
import type { TikTokPost } from "./tiktok-shared";

export { TIKTOK_PROFILE_URL, type TikTokPost } from "./tiktok-shared";

// Fallback: Video-URLs hier ergänzen (TikTok-App: Teilen → Link kopieren)
const TIKTOK_VIDEO_URLS = [
  "https://www.tiktok.com/@flatties.ch/video/7620931353512561942",
];

const MAX_POSTS = 12;

const OEMBED_REVALIDATE = 21600;

/** Hashtags aus Videotiteln entfernen — auf den Karten stören sie nur. */
function cleanTitle(raw: unknown): string {
  return typeof raw === "string"
    ? raw.replace(/#\S+/g, "").replace(/\s+/g, " ").trim()
    : "";
}

type ApiVideo = {
  id?: string;
  title?: string;
  cover_image_url?: string;
  share_url?: string;
};

/** Neueste Videos des verbundenen Accounts über die Display API. */
async function getPostsFromApi(): Promise<TikTokPost[] | null> {
  const token = await getValidAccessToken();
  if (!token) return null;

  const res = await fetch(
    "https://open.tiktokapis.com/v2/video/list/?fields=id,title,cover_image_url,share_url",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ max_count: MAX_POSTS }),
      // Kein cache:"no-store" — siehe tiktok-auth.ts: würde die ISR-Seite
      // fälschlich dynamisch machen; POST wird von Next nie gecacht.
    }
  );
  if (!res.ok) {
    console.error("tiktok video.list failed:", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  const videos: ApiVideo[] = data?.data?.videos ?? [];
  const posts = videos
    .filter((v) => v.share_url && v.cover_image_url)
    .map((v) => ({
      url: v.share_url!,
      title: cleanTitle(v.title),
      thumbnailUrl: v.cover_image_url!,
    }));
  return posts.length > 0 ? posts : null;
}

/**
 * Liefert die Carousel-Beiträge: bevorzugt live aus der Display API,
 * sonst die kuratierte oEmbed-Liste. Bleibt nichts übrig, rendert die
 * Website die Sektion einfach nicht.
 */
export async function getTikTokPosts(): Promise<TikTokPost[]> {
  try {
    const apiPosts = await getPostsFromApi();
    if (apiPosts) return apiPosts;
  } catch (err) {
    console.error("tiktok display api failed:", err);
  }
  return getCuratedPosts();
}

/** Fallback: oEmbed-Daten der kuratierten Videoliste. */
async function getCuratedPosts(): Promise<TikTokPost[]> {
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
        return {
          url,
          title: cleanTitle(data.title),
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
