import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — Pecan St. Station Deli & Grill" },
      { name: "description", content: "Order online from Pecan St. Station Deli & Grill in Pflugerville, TX." },
    ],
  }),
  component: OrderPage,
});

const SPLASH_MS = 800;
const EXIT_MS = 700;

function OrderPage() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_MS);
    return () => clearTimeout(timer);
  }, []);

  function goBackToSite() {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      void navigate({ to: "/" });
    }, EXIT_MS);
  }

  return (
    <div className="fixed inset-0 z-[100] bg-bark">
      <AnimatePresence>
        {showSplash && !leaving && (
          <motion.div
            key="enter-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bark text-cream"
          >
            <img src={SITE.logoUrl} alt="" className="h-24 sm:h-28 w-auto bg-transparent" width={480} height={294} decoding="async" />
            <div className="mt-8 flex items-center gap-3">
              <UtensilsCrossed className="text-primary animate-pulse" size={20} />
              <span className="text-sm uppercase tracking-[0.35em] text-cream/80">Loading menu…</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {leaving && (
          <motion.div
            key="exit-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-bark text-cream"
          >
            <motion.img
              src={SITE.logoUrl}
              alt=""
              className="h-24 sm:h-28 w-auto"
              decoding="async"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.p
              className="mt-8 text-sm uppercase tracking-[0.35em] text-cream/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              Back to site…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <iframe
        title="Order online from Pecan St. Station"
        src={SITE.orderUrl}
        onLoad={() => setShowSplash(false)}
        className="h-full w-full border-0 bg-white pb-14"
      />

      <div className="absolute bottom-0 inset-x-0 z-30 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between bg-bark/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
          <button
            type="button"
            onClick={goBackToSite}
            disabled={leaving}
            className="group inline-flex items-center gap-2 rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream hover:text-primary transition-colors disabled:opacity-60"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to site
          </button>
          <span className="hidden sm:block text-xs uppercase tracking-[0.25em] text-cream/60">
            Pecan St. Station · Order Online
          </span>
        </div>
      </div>
    </div>
  );
}
