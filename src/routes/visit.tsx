import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { OrderLink } from "@/components/site/OrderLink";
import { GoogleReviews } from "@/components/site/GoogleReviews";
import { FEATURED_PHOTOS } from "@/lib/photos";
import { SiteImage } from "@/components/site/SiteImage";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit — Pecan St. Station Deli & Grill" },
      { name: "description", content: "Hours, address and phone for Pecan St. Station Deli & Grill in Pflugerville, TX." },
      { property: "og:title", content: "Visit Pecan St. Station" },
      { property: "og:description", content: "1005 W Pecan St, Pflugerville, TX. Open daily." },
    ],
  }),
  component: VisitPage,
});

function VisitPage() {
  return (
    <>
      <section className="relative bg-bark text-cream pt-28 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <SiteImage photo={FEATURED_PHOTOS.monument} alt="" sizes="100vw" className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-bark/70 to-bark" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Visit Us</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-[8rem] leading-[0.9] tracking-wide">
            PULL UP<br /><span className="italic font-serif font-medium text-primary">a chair.</span>
          </h1>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-sm border border-bark/15 p-8">
              <MapPin className="text-primary" />
              <h2 className="mt-4 font-serif text-3xl text-bark">Where we are</h2>
              <p className="mt-3 text-bark/75">{SITE.address}</p>
              <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Get directions <ArrowRight size={14} />
              </a>
            </div>

            <div className="rounded-sm border border-bark/15 p-8">
              <Phone className="text-primary" />
              <h2 className="mt-4 font-serif text-3xl text-bark">Call ahead</h2>
              <a href={SITE.phoneHref} className="mt-3 block text-2xl font-serif text-bark hover:text-primary">{SITE.phone}</a>
            </div>

            <OrderLink className="block rounded-sm bg-bark p-8 text-cream hover:bg-primary transition-colors group">
              <div className="text-xs uppercase tracking-[0.3em] text-primary group-hover:text-cream">Skip the wait</div>
              <div className="mt-3 font-serif text-3xl">Order online</div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em]">Start your order <ArrowRight size={14} /></div>
            </OrderLink>
          </div>

          <div className="rounded-sm border border-bark/15 p-8">
            <Clock className="text-primary" />
            <h2 className="mt-4 font-serif text-3xl text-bark">Hours</h2>
            <ul className="mt-6 divide-y divide-bark/10">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between py-3 text-bark">
                  <span className="uppercase tracking-[0.25em] text-sm text-bark/70">{h.day}</span>
                  <span className="font-serif text-lg">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-widest text-primary">Breakfast served daily · 7AM–10:30AM</p>
            {SITE.specialHours.length > 0 && (
              <div className="mt-8 pt-6 border-t border-bark/10">
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Upcoming Special Hours</h3>
                <ul className="mt-4 divide-y divide-bark/10">
                  {SITE.specialHours.map((s) => (
                    <li key={s.date} className="flex justify-between py-3 text-bark text-sm">
                      <span className="text-bark/70">{s.date}</span>
                      <span className="font-serif">{s.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <GoogleReviews variant="dark" />

      <section className="bg-bark">
        <iframe
          title="Map to Pecan St. Station"
          src="https://maps.google.com/maps?q=1005%20W%20Pecan%20St%2C%20Pflugerville%2C%20TX%2078660&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-[420px] grayscale contrast-125"
          loading="lazy"
        />
      </section>
    </>
  );
}