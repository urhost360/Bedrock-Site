import type { GoogleReview, GoogleReviewsPayload } from "./reviews";
import { FALLBACK_GOOGLE_REVIEWS } from "./reviews.fallback";
import { SITE } from "./site";

const PLACES_BASE = "https://places.googleapis.com/v1";
const CACHE_TTL_MS = 60 * 60 * 1000;

type PlacesReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  rating?: number;
  publishTime?: string;
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
};

type PlacesDetails = {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  googleMapsLinks?: {
    writeAReviewUri?: string;
    reviewsUri?: string;
    placeUri?: string;
  };
  reviews?: PlacesReview[];
};

type CacheEntry = {
  expiresAt: number;
  payload: GoogleReviewsPayload;
};

let cache: CacheEntry | null = null;

function getApiKey(): string | undefined {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || undefined;
}

function mapReview(review: PlacesReview, index: number): GoogleReview | null {
  const text = review.text?.text?.trim() || review.originalText?.text?.trim();
  if (!text) return null;

  const rating = review.rating ?? 5;
  if (rating < 3) return null;

  return {
    id: review.name ?? `review-${index}`,
    authorName: review.authorAttribution?.displayName?.trim() || "Google reviewer",
    authorPhotoUrl: review.authorAttribution?.photoUri,
    rating,
    text,
    relativeTime: review.relativePublishTimeDescription ?? "",
    publishTime: review.publishTime,
  };
}

async function searchPlaceId(apiKey: string): Promise<string | null> {
  const response = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({
      textQuery: `${SITE.fullName}, ${SITE.address}`,
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as { places?: Array<{ id?: string }> };
  return data.places?.[0]?.id ?? null;
}

async function fetchPlaceDetails(apiKey: string, placeId: string): Promise<PlacesDetails | null> {
  const fieldMask = [
    "id",
    "rating",
    "userRatingCount",
    "googleMapsUri",
    "googleMapsLinks.writeAReviewUri",
    "googleMapsLinks.reviewsUri",
    "reviews",
  ].join(",");

  const response = await fetch(`${PLACES_BASE}/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
  });

  if (!response.ok) return null;
  return (await response.json()) as PlacesDetails;
}

export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.payload;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return FALLBACK_GOOGLE_REVIEWS;
  }

  try {
    let placeId = SITE.googlePlaceId;
    let details = await fetchPlaceDetails(apiKey, placeId);

    if (!details?.reviews?.length) {
      const resolvedId = await searchPlaceId(apiKey);
      if (resolvedId && resolvedId !== placeId) {
        placeId = resolvedId;
        details = await fetchPlaceDetails(apiKey, placeId);
      }
    }

    if (!details) {
      return FALLBACK_GOOGLE_REVIEWS;
    }

    const reviews = (details.reviews ?? [])
      .map(mapReview)
      .filter((review): review is GoogleReview => review !== null)
      .sort((a, b) => b.rating - a.rating || (b.publishTime ?? "").localeCompare(a.publishTime ?? ""));

    if (!reviews.length) {
      return {
        ...FALLBACK_GOOGLE_REVIEWS,
        placeId: details.id ?? placeId,
        rating: details.rating ?? FALLBACK_GOOGLE_REVIEWS.rating,
        userRatingCount: details.userRatingCount ?? FALLBACK_GOOGLE_REVIEWS.userRatingCount,
        googleMapsUri: details.googleMapsLinks?.reviewsUri ?? details.googleMapsUri ?? SITE.mapsUrl,
        writeReviewUri:
          details.googleMapsLinks?.writeAReviewUri ??
          `https://search.google.com/local/writereview?placeid=${details.id ?? placeId}`,
      };
    }

    const writeReviewUri =
      details.googleMapsLinks?.writeAReviewUri ??
      `https://search.google.com/local/writereview?placeid=${details.id ?? placeId}`;

    const payload: GoogleReviewsPayload = {
      placeId: details.id ?? placeId,
      rating: details.rating ?? null,
      userRatingCount: details.userRatingCount ?? null,
      googleMapsUri: details.googleMapsLinks?.reviewsUri ?? details.googleMapsUri ?? SITE.mapsUrl,
      writeReviewUri,
      reviews,
    };

    cache = { expiresAt: Date.now() + CACHE_TTL_MS, payload };
    return payload;
  } catch (error) {
    console.error("Failed to fetch Google reviews, using fallback:", error);
    return FALLBACK_GOOGLE_REVIEWS;
  }
}
