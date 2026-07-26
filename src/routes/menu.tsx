import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site";
import { OrderLink } from "@/components/site/OrderLink";
import { FEATURED_PHOTOS } from "@/lib/photos";
import { SiteImage } from "@/components/site/SiteImage";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Pecan St. Station Deli & Grill" },
      { name: "description", content: "Breakfast, burgers, and Southern classics served all day in Pflugerville, TX." },
      { property: "og:title", content: "Menu — Pecan St. Station Deli & Grill" },
      { property: "og:description", content: "Breakfast, burgers, and Southern classics in Pflugerville, TX." },
    ],
  }),
  component: MenuPage,
});

const sections = [
  {
    tag: "Breakfast · 7AM–10:30AM Daily",
    title: "Morning on Pecan Street",
    copy: "Omelets, migas, breakfast tacos, hash browns, and stacks of fluffy pancakes. Coffee stays hot, seconds are free.",
    photo: FEATURED_PHOTOS.breakfast,
    href: SITE.menus.breakfast,
  },
  {
    tag: "Lunch & Dinner · Until 9PM",
    title: "The Burger. And Everything Else.",
    copy: "Char-grilled, hand-pattied burgers piled with the works. Baskets, plates and Southern classics that keep folks coming back.",
    photo: FEATURED_PHOTOS.burger,
    href: SITE.menus.lunchDinner,
  },
  {
    tag: "Southern Classics",
    title: "Chicken-Fried Comfort",
    copy: "Golden-crusted chicken-fried steak, peppered cream gravy, mashed potatoes, and the sides you grew up on.",
    photo: FEATURED_PHOTOS.chicken,
    href: SITE.menus.lunchDinner,
  },
  {
    tag: "Sides & Sweets",
    title: "The Little Things",
    copy: "Golden onion rings, hand-cut fries, and sweet finishes worth saving room for.",
    photo: FEATURED_PHOTOS.bakery,
    href: SITE.menus.lunchDinner,
  },
];

function MenuPage() {
  return (
    <>
      <section className="relative bg-bark text-cream pt-28 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <SiteImage photo={FEATURED_PHOTOS.diningRoom} alt="" sizes="100vw" loading="eager" className="absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-bark/70 to-bark" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Our Menu</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-[9rem] leading-[0.9] tracking-wide text-balance">
            EAT<br /><span className="italic font-serif font-medium text-primary">good.</span>
          </h1>
          <p className="mt-8 max-w-xl text-cream/80 text-lg leading-relaxed">
            Whether you drive-thru or stay a while, we've got something for everyone at the table. Made fresh. Priced fair. Served warm.
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest text-cream/50">* Menu prices subject to change.</p>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 space-y-24">
          {sections.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`grid gap-10 md:gap-16 md:grid-cols-2 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <SiteImage photo={s.photo} alt={s.title} sizes="(max-width: 768px) 100vw, 50vw" className="h-full w-full" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">{s.tag}</p>
                <h2 className="mt-4 font-serif text-4xl md:text-6xl text-bark text-balance">{s.title}</h2>
                <p className="mt-6 text-bark/75 text-lg leading-relaxed">{s.copy}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-sm bg-bark px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-cream hover:bg-primary transition-colors"
                  >
                    View Menu <ExternalLink size={14} />
                  </a>
                  <OrderLink className="group inline-flex items-center gap-2 rounded-sm border border-bark/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-bark hover:border-primary hover:text-primary transition-colors">
                    Order online <ArrowRight size={14} />
                  </OrderLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-bark text-cream py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Ready to eat?</h2>
          <p className="mt-4 text-cream/70">Order online and skip the wait, or come sit a while.</p>
          <OrderLink className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:-translate-y-1 transition-transform">
            Order Online <ArrowRight size={16} />
          </OrderLink>
        </div>
      </section>
    </>
  );
}