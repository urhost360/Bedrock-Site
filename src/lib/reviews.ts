import { FALLBACK_GOOGLE_REVIEWS } from "./reviews.fallback";

export type GoogleReview = {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime?: string;
};

export type GoogleReviewsPayload = {
  placeId: string;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string;
  writeReviewUri?: string;
  reviews: GoogleReview[];
};

export type GoogleReviewsError = {
  error: "not_configured" | "fetch_failed" | "not_found";
  message: string;
};

export async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  try {
    const response = await fetch("/api/reviews");
    const data = (await response.json()) as GoogleReviewsPayload | GoogleReviewsError;

    if (!response.ok) {
      throw new Error("error" in data ? data.message : "Failed to load reviews");
    }

    return data as GoogleReviewsPayload;
  } catch {
    return FALLBACK_GOOGLE_REVIEWS;
  }
}
