import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, PenLine, Star } from "lucide-react";
import { fetchGoogleReviews } from "@/lib/reviews";
import { FALLBACK_GOOGLE_REVIEWS } from "@/lib/reviews.fallback";
import { SITE } from "@/lib/site";

type GoogleReviewsProps = {
  variant?: "light" | "dark";
  className?: string;
};

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? "text-primary fill-primary" : "text-current/20"}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  variant,
  touchDevice = false,
  onTextClick,
}: {
  review: {
    id: string;
    authorName: string;
    authorPhotoUrl?: string;
    rating: number;
    text: string;
    relativeTime: string;
  };
  variant: "light" | "dark";
  touchDevice?: boolean;
  onTextClick?: () => void;
}) {
  const isDark = variant === "dark";
  const cardClass = isDark
    ? "border-cream/15 bg-cream/5"
    : "border-bark/10 bg-white";
  const textClass = isDark ? "text-cream/85" : "text-bark/80";
  const metaClass = isDark ? "text-cream/55" : "text-bark/55";

  return (
    <article className={`flex h-full flex-col rounded-sm border p-6 ${cardClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {review.authorPhotoUrl ? (
            <img
              src={review.authorPhotoUrl}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 font-semibold text-primary">
              {review.authorName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <div className={`truncate font-semibold ${isDark ? "text-cream" : "text-bark"}`}>
              {review.authorName}
            </div>
            {review.relativeTime && (
              <div className={`text-xs ${metaClass}`}>{review.relativeTime}</div>
            )}
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p
        className={`mt-4 flex-1 text-sm leading-relaxed line-clamp-6 ${textClass} ${
          touchDevice ? "cursor-pointer" : ""
        }`}
        onClick={onTextClick}
        onKeyDown={(e) => {
          if (touchDevice && onTextClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onTextClick();
          }
        }}
        role={touchDevice && onTextClick ? "button" : undefined}
        tabIndex={touchDevice && onTextClick ? 0 : undefined}
        aria-label={touchDevice && onTextClick ? "Tap to leave a Google review" : undefined}
      >
        {review.text}
      </p>
    </article>
  );
}

function LeaveReviewCta({
  href,
  variant,
}: {
  href: string;
  variant: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={`mx-auto max-w-lg rounded-sm border p-8 md:p-10 text-center shadow-2xl ${
        isDark ? "border-primary/30 bg-bark" : "border-primary/25 bg-cream"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <PenLine className="mx-auto text-primary" size={28} />
      <h3 className={`mt-4 font-serif text-2xl md:text-3xl ${isDark ? "text-cream" : "text-bark"}`}>
        Had a great visit?
      </h3>
      <p className={`mt-3 text-sm md:text-base leading-relaxed ${isDark ? "text-cream/75" : "text-bark/70"}`}>
        We&apos;d love to hear from you. Leave a quick Google review and help more neighbors find their way to Pecan Street.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5"
      >
        Leave a Google Review <ExternalLink size={14} />
      </a>
    </div>
  );
}

function ReviewsSkeleton({ variant }: { variant: "light" | "dark" }) {
  const pulse = variant === "dark" ? "bg-cream/10" : "bg-bark/10";
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`h-48 animate-pulse rounded-sm ${pulse}`} />
      ))}
    </div>
  );
}

function ReviewsWithCtaOverlay({
  reviews,
  writeReviewHref,
  variant,
}: {
  reviews: Array<{
    id: string;
    authorName: string;
    authorPhotoUrl?: string;
    rating: number;
    text: string;
    relativeTime: string;
  }>;
  writeReviewHref: string;
  variant: "light" | "dark";
}) {
  const [ctaOpen, setCtaOpen] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dwellLockedRef = useRef(false);
  const hoveringRef = useRef(false);
  const isDark = variant === "dark";

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setTouchDevice(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const clearDwellTimer = () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (dwellLockedRef.current || dwellTimerRef.current) return;
          dwellTimerRef.current = setTimeout(() => {
            dwellLockedRef.current = true;
            dwellTimerRef.current = null;
            setCtaOpen(true);
          }, 6000);
          return;
        }

        clearDwellTimer();
        dwellLockedRef.current = false;
        if (!hoveringRef.current) setCtaOpen(false);
      },
      { threshold: [0, 0.35, 0.5, 0.75, 1] },
    );

    observer.observe(el);
    return () => {
      clearDwellTimer();
      observer.disconnect();
    };
  }, []);

  function handleMouseEnter() {
    if (touchDevice) return;
    hoveringRef.current = true;
    setCtaOpen(true);
  }

  function handleMouseLeave() {
    if (touchDevice) return;
    hoveringRef.current = false;
    if (!dwellLockedRef.current) setCtaOpen(false);
  }

  const showCta = ctaOpen;

  return (
    <div
      ref={sectionRef}
      className="relative mt-12 rounded-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "Escape") setCtaOpen(false);
      }}
    >
      <div
        className={`flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-300 ${
          showCta ? "opacity-40" : "opacity-100"
        }`}
      >
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="w-[85vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none"
          >
            <ReviewCard
              review={review}
              variant={variant}
              touchDevice={touchDevice}
              onTextClick={touchDevice ? () => setCtaOpen((open) => !open) : undefined}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showCta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`absolute inset-0 z-10 flex items-center justify-center p-4 backdrop-blur-sm ${
              isDark ? "bg-bark/60" : "bg-cream/70"
            }`}
            onClick={() => touchDevice && setCtaOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <LeaveReviewCta href={writeReviewHref} variant={variant} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GoogleReviews({ variant = "light", className = "" }: GoogleReviewsProps) {
  const isDark = variant === "dark";
  const { data, isLoading } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: fetchGoogleReviews,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  const reviewsData = data ?? FALLBACK_GOOGLE_REVIEWS;

  const sectionClass = isDark ? "bg-bark text-cream" : "bg-cream text-bark";
  const linkClass = isDark
    ? "border-cream/20 hover:border-primary text-cream"
    : "border-bark/15 hover:border-primary text-bark";
  const writeReviewHref =
    reviewsData.writeReviewUri ??
    `https://search.google.com/local/writereview?placeid=${SITE.googlePlaceId}`;

  if (isLoading) {
    return (
      <section className={`py-24 md:py-32 ${sectionClass} ${className}`}>
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Google Reviews</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-balance">
            The word on Pecan <span className="italic text-primary">Street.</span>
          </h2>
          <ReviewsSkeleton variant={variant} />
        </div>
      </section>
    );
  }

  return (
    <section className={`py-24 md:py-32 ${sectionClass} ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Google Reviews</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-balance">
              The word on Pecan <span className="italic text-primary">Street.</span>
            </h2>
            {reviewsData.rating != null && reviewsData.userRatingCount != null && (
              <div className={`mt-6 flex flex-wrap items-center gap-4 ${isDark ? "text-cream/80" : "text-bark/75"}`}>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-4xl text-primary">{reviewsData.rating.toFixed(1)}</span>
                  <StarRating rating={reviewsData.rating} size={18} />
                </div>
                <span className="text-sm uppercase tracking-[0.2em]">
                  {reviewsData.userRatingCount.toLocaleString()} Google reviews
                </span>
              </div>
            )}
          </div>
          <a
            href={reviewsData.googleMapsUri}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${linkClass}`}
          >
            View on Google <ExternalLink size={14} />
          </a>
        </div>

        {reviewsData.reviews.length > 0 && (
          <ReviewsWithCtaOverlay
            reviews={reviewsData.reviews}
            writeReviewHref={writeReviewHref}
            variant={variant}
          />
        )}
      </div>
    </section>
  );
}
