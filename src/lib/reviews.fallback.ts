import type { GoogleReviewsPayload } from "./reviews";
import { SITE } from "./site";

const writeReviewUri = `https://search.google.com/local/writereview?placeid=${SITE.googlePlaceId}`;

export const FALLBACK_GOOGLE_REVIEWS: GoogleReviewsPayload = {
  placeId: SITE.googlePlaceId,
  rating: 4.2,
  userRatingCount: 400,
  googleMapsUri: SITE.mapsUrl,
  writeReviewUri,
  reviews: [
    {
      id: "fallback-1",
      authorName: "Dany S.",
      rating: 5,
      text: "This is my favorite little diner for chicken country-fried steak with eggs and hash browns! If I'm in the mood for something sweet, their pancakes always hit the spot. And for lunch, I go straight for the burger.",
      relativeTime: "2 months ago",
    },
    {
      id: "fallback-2",
      authorName: "Tav S.",
      rating: 5,
      text: "This was the first deli I tried when I moved from Florida to Texas. I went in for brunch, and it didn't miss. The staff was pretty dope, and the food was on point. Whenever I need something quick that still feels homemade, this is the spot.",
      relativeTime: "2 months ago",
    },
    {
      id: "fallback-3",
      authorName: "Ken D.",
      rating: 5,
      text: "Quickly becoming our favorite Saturday breakfast stop. Good basic breakfast items especially the biscuits, gravy and sausage. Plus you can talk in a normal voice unlike the big chains — feels like a real neighborhood place.",
      relativeTime: "4 months ago",
    },
    {
      id: "fallback-4",
      authorName: "Tomas T.",
      rating: 5,
      text: "Breakfast and lunch here consistently deliver comforting flavors, from the rich broccoli and cheese soup paired perfectly with a grilled cheese to the savory Philly cheesesteak and crispy onion rings. Friendly, attentive staff every visit.",
      relativeTime: "3 months ago",
    },
    {
      id: "fallback-5",
      authorName: "Yoshi B.",
      rating: 4,
      text: "The restaurant offers a diverse menu with options ranging from burgers and chicken to grilled cheese and soup. The drive-thru service ensures that everything is prepared fresh, and the staff is friendly and attentive.",
      relativeTime: "6 months ago",
    },
    {
      id: "fallback-6",
      authorName: "Sabrina C.",
      rating: 5,
      text: "Excellent food and great Southern hospitality. We've been coming here for years and it never disappoints — breakfast tacos, migas, and that burger everyone talks about.",
      relativeTime: "8 months ago",
    },
  ],
};
