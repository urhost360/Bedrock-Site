import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import { SiteImage } from "@/components/site/SiteImage";
import { GALLERY_PHOTOS, type Photo } from "@/lib/photos";

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "Photos — Pecan St. Station Deli & Grill" },
      { name: "description", content: "Photos of food, dining room, and the Pecan St. Station experience in Pflugerville, TX." },
      { property: "og:title", content: "Photos — Pecan St. Station Deli & Grill" },
      { property: "og:description", content: "See the food, the dining room, and the Pecan St. Station experience." },
    ],
  }),
  component: PhotosPage,
});

function aspectRatio(photo: Photo) {
  return photo.width / photo.height;
}

function PhotosPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const heroPhoto = GALLERY_PHOTOS[0];

  return (
    <>
      <section className="relative bg-bark text-cream pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {heroPhoto && (
          <SiteImage
            photo={heroPhoto}
            alt=""
            sizes="100vw"
            loading="eager"
            className="absolute inset-0 opacity-25"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bark/70 to-bark" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Gallery</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-[8rem] leading-[0.9] tracking-wide text-balance">
            COME SEE<br /><span className="italic font-serif font-medium text-primary">for yourself.</span>
          </h1>
          <p className="mt-6 max-w-xl text-cream/80 text-base md:text-lg leading-relaxed">
            {GALLERY_PHOTOS.length} photos of the food, dining room, and the neighborhood feel that keeps Pflugerville coming back — from official shoots and real visits.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {GALLERY_PHOTOS.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-sm bg-bark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ aspectRatio: aspectRatio(photo) }}
              >
                <SiteImage
                  photo={photo}
                  alt={photo.alt}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 420px"
                  loading={i < 8 ? "eager" : "lazy"}
                  className="absolute inset-0"
                  hoverZoom
                />
                <div className="absolute inset-0 bg-bark/0 transition-colors group-hover:bg-bark/15" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bark/95 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream hover:bg-primary transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <motion.img
            key={lightbox}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={GALLERY_PHOTOS[lightbox].src}
            alt={GALLERY_PHOTOS[lightbox].alt}
            width={GALLERY_PHOTOS[lightbox].width}
            height={GALLERY_PHOTOS[lightbox].height}
            className="max-h-[90vh] max-w-[min(95vw,1400px)] rounded-sm object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
