import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { OrderLink } from "@/components/site/OrderLink";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/photos", label: "Photos" },
  { to: "/visit", label: "Visit" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--bark)_88%,transparent)] border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Logo showTagline={false} size="sm" />

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm uppercase tracking-[0.2em] text-cream/85 hover:text-cream transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
          <OrderLink className="rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/30">
            Order Online
          </OrderLink>
        </nav>

        <button
          className="md:hidden text-cream"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-bark px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-cream/90 text-lg font-display tracking-widest"
            >
              {l.label}
            </Link>
          ))}
          <OrderLink className="block rounded-sm bg-primary px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground">
            Order Online
          </OrderLink>
        </div>
      )}
    </header>
  );
}
