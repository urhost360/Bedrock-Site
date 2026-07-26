import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useRestaurantOpen } from "@/hooks/use-restaurant-open";
import { ArrowRight, Clock, MapPin, Phone, Star, UtensilsCrossed } from "lucide-react";
import { FEATURED_PHOTOS } from "@/lib/photos";
import { SITE } from "@/lib/site";
import { Marquee } from "@/components/site/Marquee";
import { GoogleReviews } from "@/components/site/GoogleReviews";
import { OrderLink } from "@/components/site/OrderLink";
import { SiteImage } from "@/components/site/SiteImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pecan St. Station Deli & Grill — Best Burger in Pflugerville, TX" },
      { name: "description", content: "Southern hospitality served all day. Breakfast, lunch and dinner on Pecan Street in Pflugerville, Texas since 2000." },
      { property: "og:title", content: "Pecan St. Station Deli & Grill" },
      { property: "og:description", content: "Southern hospitality served all day in Pflugerville, TX." },
      { property: "og:image", content: SITE.logoUrl },
    ],
  }),
  component: Index,
});

function StatusMarquee() {
  const isOpen = useRestaurantOpen();
  return <Marquee text={`${isOpen ? "NOW OPEN" : "CLOSED"} SUNDAYS · 7AM–3PM`} />;
}

function Index() {
  return (
    <>
      <Hero />
      <StatusMarquee />
      <Signatures />
      <Story />
      <GoogleReviews />
      <PhotoStrip />
      <MenuTeaser />
      <VisitStrip />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-bark">
      {parallax ? (
        <HeroParallaxBackground targetRef={ref} />
      ) : (
        <div className="absolute inset-0">
          <SiteImage
            photo={FEATURED_PHOTOS.hero}
            alt="Friends enjoying a meal at Pecan St. Station Deli & Grill"
            sizes="100vw"
            loading="eager"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bark/80 via-bark/50 to-bark" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-5 sm:px-6 pt-24 pb-12 sm:pb-16 md:pb-28">
        <h1 className="font-display text-[10vw] sm:text-[9vw] md:text-[7vw] leading-[0.92] tracking-wide text-cream text-balance">
          SOUTHERN HOSPITALITY.
          <br />
          <span className="italic font-serif font-medium text-primary">Great food, all day.</span>
        </h1>

        <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg md:text-xl text-cream/85 leading-relaxed">
          Pancakes at sunrise. Burgers at noon. Chicken-fried steak at sundown. A Pflugerville staple on Pecan Street since 2000.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
          <OrderLink className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-xl shadow-primary/40 transition-all hover:-translate-y-1">
            Order Online
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </OrderLink>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-sm border border-cream/40 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-[0.2em] text-cream hover:bg-cream hover:text-bark transition-colors"
          >
            See the Menu
          </Link>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cream/70">
          <span className="flex items-center gap-2"><Clock size={14} className="text-primary shrink-0" /> Mon–Fri 6AM–9PM</span>
          <span className="flex items-center gap-2"><MapPin size={14} className="text-primary shrink-0" /> 1005 W Pecan St</span>
          <span className="flex items-center gap-2"><Phone size={14} className="text-primary shrink-0" /> (512) 251-0296</span>
          <span className="flex items-center gap-2"><Star size={14} className="text-primary shrink-0" fill="currentColor" /> Family-Owned Since 2016</span>
        </div>
      </div>
    </section>
  );
}

function HeroParallaxBackground({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <motion.div style={{ y, opacity }} className="absolute inset-0">
      <SiteImage
        photo={FEATURED_PHOTOS.hero}
        alt="Friends enjoying a meal at Pecan St. Station Deli & Grill"
        sizes="100vw"
        loading="eager"
        className="h-full w-full scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bark/80 via-bark/50 to-bark" />
    </motion.div>
  );
}

const signatures = [
  { name: "The Best Burger", desc: "Hand-pattied, char-grilled, stacked tall.", photo: FEATURED_PHOTOS.burger, tag: "Lunch & Dinner" },
  { name: "Grilled Sandwiches", desc: "Fresh deli sandwiches on checkered paper.", photo: FEATURED_PHOTOS.sandwich, tag: "Lunch & Dinner" },
  { name: "Homemade Soup", desc: "Warm bowls with toasted bread on the side.", photo: FEATURED_PHOTOS.soup, tag: "Southern Classic" },
  { name: "Fresh Baked Goods", desc: "Cookies and muffins at the counter daily.", photo: FEATURED_PHOTOS.bakery, tag: "All Morning" },
];

function Signatures() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Signatures</p>
            <h2 className="mt-4 font-serif text-5xl md:text-7xl text-bark text-balance max-w-2xl">
              The plates people <span className="italic">drive across town</span> for.
            </h2>
          </div>
          <Link to="/menu" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-bark hover:text-primary transition-colors">
            Full menu <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {signatures.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-sm bg-bark aspect-[3/4]"
            >
              <SiteImage
                photo={s.photo}
                alt={s.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="absolute inset-0"
                hoverZoom
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bark via-bark/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{s.tag}</span>
                <h3 className="mt-2 font-serif text-2xl text-cream">{s.name}</h3>
                <p className="mt-2 text-sm text-cream/75">{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative bg-bark text-cream pb-24 pt-0 md:py-36 overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl md:block" />

      {/* Full-bleed on mobile; padded + rounded on desktop */}
      <div className="md:mx-auto md:max-w-7xl md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[1684/934] w-full overflow-hidden bg-bark/40 md:rounded-sm"
        >
          <SiteImage
            photo={FEATURED_PHOTOS.facade}
            alt="Front of Pecan St. Station Deli & Grill on Pecan Street"
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 ring-0 md:ring-1 md:ring-inset md:ring-cream/10" />
        </motion.div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-6 md:mt-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Our Story · Est. 2000</p>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl text-balance">
            He didn&apos;t invent the Station.
            <br />
            <span className="italic text-primary">He fought to keep it.</span>
          </h2>
          <div className="mt-8 space-y-5 text-cream/80 leading-relaxed text-lg">
            <p>
              For sixteen years, Pecan St. Station fed this town before Paul Prestridge ever put his name on the deed. Then, in 2016, after a lifetime cooking other people&apos;s dreams, he bought the place he&apos;d always been proud to eat at.
            </p>
            <p>
              Same promise, no shortcuts: plates made fresh, coffee that keeps coming, and a dining room where strangers still get treated like regulars.
            </p>
            <p className="text-cream/90 font-serif text-xl italic text-primary">
              Great food. Warm hospitality. Fair prices. That&apos;s the whole job.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/10 pt-8 text-xs uppercase tracking-[0.25em] text-cream/55">
            <span>West of downtown</span>
            <span>East of the High School</span>
            <span>Drive-thru or stay awhile</span>
          </div>
          <Link
            to="/about"
            className="mt-10 group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary hover:text-cream transition-colors"
          >
            Read the full story <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const previewPhotos = FEATURED_PHOTOS.strip;

function PhotoStrip() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Inside the Station</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-6xl text-bark text-balance">
              Real food. <span className="italic">Real folks.</span>
            </h2>
          </div>
          <Link to="/photos" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-bark hover:text-primary transition-colors">
            View all photos <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mt-8 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {previewPhotos.map((photo) => (
            <Link
              key={photo.id}
              to="/photos"
              className="group relative aspect-[4/3] w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-sm bg-bark"
            >
              <SiteImage photo={photo} alt={photo.alt} sizes="80vw" className="h-full w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop: bento grid — taller for sharper widescreen hero tile */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4 md:h-[560px] lg:h-[620px]">
          <Link to="/photos" className="group relative col-span-2 row-span-2 overflow-hidden rounded-sm bg-bark">
            <SiteImage photo={previewPhotos[0]} alt={previewPhotos[0].alt} sizes="66vw" className="h-full w-full" hoverZoom />
          </Link>
          {previewPhotos.slice(1).map((photo) => (
            <Link key={photo.id} to="/photos" className="group relative overflow-hidden rounded-sm bg-bark">
              <SiteImage photo={photo} alt={photo.alt} sizes="33vw" className="h-full w-full" hoverZoom />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuTeaser() {
  return (
    <section className="relative bg-cream py-24 md:py-32 border-t border-bark/10">
      <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-3">
        {[
          { title: "Breakfast", hours: "Daily · 7AM–10:30AM", photo: FEATURED_PHOTOS.breakfast, href: SITE.menus.breakfast, blurb: "Omelets, migas, breakfast tacos, pancakes, and coffee that keeps coming." },
          { title: "Lunch & Dinner", hours: "Daily · Until 9PM", photo: FEATURED_PHOTOS.lunch, href: SITE.menus.lunchDinner, blurb: "The burger everyone talks about. Plus baskets, plates and Southern classics." },
          { title: "Sides & Extras", hours: "All Day", photo: FEATURED_PHOTOS.chicken, href: SITE.menus.lunchDinner, blurb: "Chicken tender baskets, hand-cut fries, and the sauces to match." },
        ].map((c, i) => (
          <motion.a
            key={c.title}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden rounded-sm bg-bark">
              <SiteImage photo={c.photo} alt={c.title} sizes="(max-width: 768px) 100vw, 33vw" className="h-full w-full" hoverZoom />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-primary">{c.hours}</p>
            <h3 className="mt-2 font-serif text-3xl text-bark group-hover:text-primary transition-colors">{c.title}</h3>
            <p className="mt-3 text-bark/70 leading-relaxed">{c.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-bark group-hover:text-primary">
              View menu <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function VisitStrip() {
  return (
    <section className="bg-bark text-cream py-24">
      <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <UtensilsCrossed className="text-primary" />
          <h2 className="mt-6 font-serif text-5xl md:text-6xl text-balance">
            Come hungry. <span className="italic text-primary">Leave family.</span>
          </h2>
          <p className="mt-6 text-cream/75 text-lg max-w-xl">
            Just west of downtown Pflugerville. Drive-thru if you're rushing, dining room if you're staying — either way, we're glad you came.
          </p>
        </div>
        <div className="grid gap-4">
          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-start gap-4 rounded-sm border border-cream/15 p-6 hover:border-primary transition-colors">
            <MapPin className="text-primary shrink-0 mt-1" />
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-cream/60">Find us</div>
              <div className="mt-2 font-serif text-xl text-cream">{SITE.address}</div>
              <div className="mt-2 text-sm text-primary flex items-center gap-1">Get directions <ArrowRight size={14} /></div>
            </div>
          </a>
          <a href={SITE.phoneHref} className="flex items-start gap-4 rounded-sm border border-cream/15 p-6 hover:border-primary transition-colors">
            <Phone className="text-primary shrink-0 mt-1" />
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-cream/60">Call ahead</div>
              <div className="mt-2 font-serif text-xl text-cream">{SITE.phone}</div>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-sm border border-cream/15 p-6">
            <Clock className="text-primary shrink-0 mt-1" />
            <div className="w-full">
              <div className="text-xs uppercase tracking-[0.3em] text-cream/60">Hours</div>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                {SITE.hours.map((h) => (
                  <div key={h.day} className="flex justify-between border-b border-cream/10 py-1">
                    <span className="text-cream/70">{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
              {SITE.specialHours.length > 0 && (
                <div className="mt-4 pt-4 border-t border-cream/10">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Upcoming Special Hours</div>
                  {SITE.specialHours.map((s) => (
                    <div key={s.date} className="flex justify-between text-xs py-1 text-cream/70">
                      <span>{s.date}</span>
                      <span>{s.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
