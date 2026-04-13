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

type PlaceDetailsResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
  };
  status: string;
};

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
