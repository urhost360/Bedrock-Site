import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getGoogleReviews } from "@/lib/google-reviews.server";

export const Route = createFileRoute("/api/reviews")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const payload = await getGoogleReviews();

          return Response.json(payload, {
            headers: {
              "Cache-Control": "public, max-age=1800, s-maxage=3600",
            },
          });
        } catch (error) {
          console.error("Failed to fetch Google reviews:", error);
          return Response.json(
            {
              error: "fetch_failed",
              message: "Unable to load Google reviews right now.",
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
