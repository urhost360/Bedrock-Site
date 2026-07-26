import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FEATURED_PHOTOS } from "@/lib/photos";
import { SITE } from "@/lib/site";
import { OrderLink } from "@/components/site/OrderLink";
import { SiteImage } from "@/components/site/SiteImage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Pecan St. Station Deli & Grill" },
      {
        name: "description",
        content:
          "Pecan St. Station has fed Pflugerville since 2000. In 2016, Paul Prestridge bought the place he loved eating at — and kept the mission simple: great food, warm hospitality, fair prices.",
      },
      { property: "og:title", content: "Our Story — Pecan St. Station" },
      {
        property: "og:description",
        content: "A Pflugerville staple since 2000. Family-run since 2016. Come hungry. Leave family.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative min-h-[70dvh] bg-bark text-cream overflow-hidden">
        <SiteImage photo={FEATURED_PHOTOS.storefront} alt="" sizes="100vw" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-bark/75 via-bark/55 to-bark" />
        <div className="relative mx-auto flex min-h-[70dvh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Our Story</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl sm:text-6xl md:text-[7.5rem] leading-[0.9] tracking-wide text-balance">
              COME AS A STRANGER.
              <br />
              <span className="italic font-serif font-medium text-primary">Leave as family.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80 leading-relaxed">
              On Pecan Street since 2000. Family-run since 2016. Still the kind of place where the coffee refill comes before you ask.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-3">
          {[
            { year: "2000", label: "Doors open on Pecan Street", copy: "A neighborhood deli & grill becomes part of daily life in Pflugerville." },
            { year: "2016", label: "Paul takes the keys", copy: "After years in the business, he buys the restaurant he was proud to eat at." },
            { year: "Today", label: "Same mission, every shift", copy: "Fresh plates, fair prices, and hospitality that makes regulars out of first-timers." },
          ].map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="border-t border-bark/15 pt-6"
            >
              <p className="font-display text-5xl text-primary tracking-wide">{item.year}</p>
              <h2 className="mt-4 font-serif text-2xl text-bark">{item.label}</h2>
              <p className="mt-3 text-bark/70 leading-relaxed">{item.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-cream pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 grid gap-14 md:grid-cols-2 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bark"
          >
            <SiteImage
              photo={FEATURED_PHOTOS.interior}
              alt="Dining room at Pecan St. Station"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full"
            />
          </motion.div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">How we got here</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-bark text-balance">
              Paul didn&apos;t buy a brand.
              <span className="italic text-primary"> He bought a promise.</span>
            </h2>
            <div className="mt-8 space-y-5 text-bark/80 text-lg leading-relaxed">
              <p>
                Paul Prestridge spent years in kitchens and dining rooms before he ever owned one. He knew what mediocre felt like — and he knew what special tasted like. For him, that special place was already open: Pecan Street Station Deli & Grill.
              </p>
              <p>
                So in 2016, after years of showing up as a guest, he showed up as the owner. Not to reinvent it. To protect what worked: made-from-scratch food, prices that make sense, and a room that still feels like Pflugerville — not a franchise whiteboard.
              </p>
              <p>
                Twenty-five years later, the Station is still open early, still plating breakfast the way folks remember, and still stacking lunch and dinner for whoever walks through the door — drive-thru in a hurry, dining room when you&apos;ve got time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-bark text-cream py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <SiteImage photo={FEATURED_PHOTOS.patio} alt="" sizes="100vw" className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-bark/85" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">What we believe</p>
          <blockquote className="mt-8 font-serif text-3xl sm:text-4xl md:text-5xl leading-snug text-balance">
            &ldquo;Come hungry. Leave wanting one more bite — and already planning the next visit.&rdquo;
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-cream/55">Paul Prestridge · Owner</p>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">The everyday craft</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-bark text-balance">
              From sunrise coffee to <span className="italic text-primary">sundown supper.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                photo: FEATURED_PHOTOS.breakfast,
                title: "Morning starts early",
                copy: "Migas, breakfast tacos, pancakes, eggs — the kind of breakfast that gets farmers, teachers, and regulars through the day.",
              },
              {
                photo: FEATURED_PHOTOS.burger,
                title: "Lunch that earns its name",
                copy: "Burgers, baskets, grilled sandwiches, bowls of soup. Nothing precious. Everything made to be eaten with both hands if needed.",
              },
              {
                photo: FEATURED_PHOTOS.saladBar,
                title: "Little things, done right",
                copy: "A real salad bar, Best of Pflugerville hardware on the wall, and hospitality that still feels hometown — not franchise.",
              },
            ].map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bark">
                  <SiteImage photo={item.photo} alt={item.title} sizes="(max-width: 768px) 100vw, 33vw" className="h-full w-full" hoverZoom />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-bark">{item.title}</h3>
                <p className="mt-3 text-bark/70 leading-relaxed">{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bark text-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Find us</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-balance">
              Just west of downtown.
              <span className="italic text-primary"> Just east of the High School.</span>
            </h2>
            <p className="mt-6 text-cream/75 text-lg leading-relaxed max-w-xl">
              {SITE.address}. Pull through the drive-thru if you&apos;re rushing. Pull up a chair if you&apos;re staying. Either way — we&apos;re glad you came.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <OrderLink className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:-translate-y-0.5 transition-transform">
                Order Online <ArrowRight size={14} />
              </OrderLink>
              <Link
                to="/visit"
                className="inline-flex items-center gap-2 rounded-sm border border-cream/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-cream hover:bg-cream hover:text-bark transition-colors"
              >
                Hours & Directions
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <SiteImage photo={FEATURED_PHOTOS.monument} alt="Pecan St. Station drive-thru monument sign" sizes="(max-width: 768px) 100vw, 50vw" className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="bg-cream border-t border-bark/10 py-20">
        <div className="mx-auto max-w-5xl px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">
          {[
            { k: "25+", v: "Years on Pecan Street" },
            { k: "6AM", v: "Doors open, coffee on" },
            { k: "1", v: "Best burger in town" },
          ].map((s) => (
            <div key={s.k}>
              <div className="font-display text-6xl text-primary">{s.k}</div>
              <div className="mt-2 text-bark/60 uppercase tracking-[0.25em] text-xs">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
