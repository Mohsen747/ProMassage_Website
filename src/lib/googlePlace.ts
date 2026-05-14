/**
 * Opens the business in Google Maps using a Place ID.
 * @see https://developers.google.com/maps/documentation/urls/get-started
 */
export function googleMapsPlaceUrl(placeId: string, queryLabel = "ProMassage") {
  const params = new URLSearchParams({
    api: "1",
    query: queryLabel,
    query_place_id: placeId.trim(),
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export type GooglePlaceReviewRaw = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type PlaceDetailsResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlaceReviewRaw[];
  };
  status: string;
};

export type GooglePlaceReview = {
  name: string;
  quote: string;
  photoUrl: string | null;
  rating: number | null;
};

/**
 * Latest public reviews for a place (legacy Place Details JSON).
 * Returns up to `limit` reviews that include text. Requires server `GOOGLE_MAPS_API_KEY`
 * with Places API enabled; `placeId` is typically `NEXT_PUBLIC_GOOGLE_PLACE_ID`.
 */
export async function getGooglePlaceReviews(
  placeId: string,
  limit = 3,
): Promise<GooglePlaceReview[] | null> {
  const id = placeId.trim();
  const key = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!id || !key) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", id);
  url.searchParams.set("fields", "reviews");
  url.searchParams.set("key", key);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PlaceDetailsResponse;
    if (data.status !== "OK" || !data.result?.reviews?.length) return null;

    const mapped = data.result.reviews
      .filter((r) => (r.text ?? "").trim().length > 0)
      .sort((a, b) => (b.time ?? 0) - (a.time ?? 0))
      .slice(0, limit)
      .map((r) => ({
        name: (r.author_name ?? "").trim() || "Google reviewer",
        quote: (r.text ?? "").trim(),
        photoUrl: (r.profile_photo_url ?? "").trim() || null,
        rating: typeof r.rating === "number" ? r.rating : null,
      }));

    return mapped.length ? mapped : null;
  } catch {
    return null;
  }
}

/**
 * Fetches rating from Google Places Details (legacy JSON API).
 * Requires `GOOGLE_MAPS_API_KEY` (server-only) with Places API enabled.
 * Cached 24h via Next fetch revalidate.
 */
export async function getGooglePlaceRating(
  placeId: string,
): Promise<{ rating: number; userRatingsTotal: number } | null> {
  const id = placeId.trim();
  const key = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!id || !key) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", id);
  url.searchParams.set("fields", "rating,user_ratings_total");
  url.searchParams.set("key", key);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PlaceDetailsResponse;
    if (data.status !== "OK" || data.result?.rating == null) return null;
    return {
      rating: data.result.rating,
      userRatingsTotal: data.result.user_ratings_total ?? 0,
    };
  } catch {
    return null;
  }
}
