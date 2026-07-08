// Live-Anbindung an die Google Places API (New): holt Bewertung, Anzahl
// und die aktuellen Rezensionen des Flatties-Eintrags. Serverseitig gecacht,
// damit neue Rezensionen automatisch erscheinen, ohne Google bei jedem
// Seitenaufruf zu fragen.

const PLACE_QUERY = "Flatties Smashburger St. Gallen";

// Place-ID ändert sich nie → 24h cachen; Details/Rezensionen alle 6h auffrischen
const PLACE_ID_REVALIDATE = 86400;
const DETAILS_REVALIDATE = 21600;

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
};

export type GoogleReviewsData = {
  rating: number;
  count: number;
  mapsUri: string;
  reviews: GoogleReview[];
};

type RawReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
};

async function resolvePlaceId(key: string): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID;
  if (configured) return configured;

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: PLACE_QUERY }),
    next: { revalidate: PLACE_ID_REVALIDATE },
  });
  if (!res.ok) {
    console.error("places searchText failed:", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return data.places?.[0]?.id ?? null;
}

/**
 * Liefert die besten 5-Sterne-Rezensionen (max. 6) plus Gesamtbewertung.
 * Gibt null zurück, wenn kein API-Key gesetzt ist oder Google nicht
 * erreichbar ist — die Website rendert die Sektion dann einfach nicht.
 *
 * Hinweis: Die Places API liefert pro Abruf die ~5 relevantesten
 * Rezensionen; daraus filtern wir die 5-Sterne-Bewertungen.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return null;

  try {
    const placeId = await resolvePlaceId(key);
    if (!placeId) return null;

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=de`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: DETAILS_REVALIDATE },
      }
    );
    if (!res.ok) {
      console.error("places details failed:", res.status, await res.text());
      return null;
    }
    const data = await res.json();

    const reviews: GoogleReview[] = ((data.reviews ?? []) as RawReview[])
      .filter((r) => r.rating === 5 && r.text?.text?.trim())
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google Nutzer",
        rating: r.rating ?? 5,
        text: r.text!.text!.trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
      }))
      .slice(0, 6);

    return {
      rating: data.rating ?? 0,
      count: data.userRatingCount ?? 0,
      mapsUri: data.googleMapsUri ?? "https://maps.google.com",
      reviews,
    };
  } catch (err) {
    console.error("google reviews failed:", err);
    return null;
  }
}
