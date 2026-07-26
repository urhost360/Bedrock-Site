import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { OrderLink } from "@/components/site/OrderLink";
import { useRouterState } from "@tanstack/react-router";

const DELAY_MS = 15_000;
const SEEN_KEY = "pecan-order-prompt-dismissed";
const START_KEY = "pecan-visit-start";

export function OrderPromptPopup() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOrderPage = pathname === "/order";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isOrderPage) {
      setOpen(false);
      return;
    }
    if (sessionStorage.getItem(SEEN_KEY)) return;

    const now = Date.now();
    const storedStart = Number(sessionStorage.getItem(START_KEY));
    const start = Number.isFinite(storedStart) && storedStart > 0 ? storedStart : now;
    if (!storedStart) sessionStorage.setItem(START_KEY, String(start));

    const remaining = Math.max(0, DELAY_MS - (now - start));
    const timer = window.setTimeout(() => setOpen(true), remaining);
    return () => window.clearTimeout(timer);
  }, [isOrderPage]);

  function dismiss() {
    sessionStorage.setItem(SEEN_KEY, "1");
    setOpen(false);
  }

  function goOrder() {
    sessionStorage.setItem(SEEN_KEY, "1");
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && !isOrderPage && (
        <motion.div
          key="order-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-prompt-title"
        >
          <button
            type="button"
            aria-label="Dismiss order prompt"
            className="absolute inset-0 bg-bark/55 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-sm border border-primary/25 bg-cream p-8 text-center shadow-2xl md:p-10"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sm text-bark/50 hover:bg-bark/5 hover:text-bark transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <img
              src="/logo.png?v=2"
              alt=""
              className="mx-auto h-14 w-auto"
              width={120}
              height={80}
              decoding="async"
            />
            <h2
              id="order-prompt-title"
              className="mt-5 font-serif text-3xl text-bark text-balance"
            >
              Hungry yet?
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-bark/70">
              Skip the wait — order breakfast, lunch, or dinner online and pick it up when you&apos;re ready.
            </p>
            <OrderLink
              onClick={goOrder}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              Order Online
            </OrderLink>
            <button
              type="button"
              onClick={dismiss}
              className="mt-4 text-xs uppercase tracking-[0.25em] text-bark/45 hover:text-bark/70 transition-colors"
            >
              Keep browsing
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
