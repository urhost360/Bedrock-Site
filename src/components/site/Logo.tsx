import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-12 sm:h-14",
  md: "h-16",
  lg: "h-24",
};

export function Logo({ className = "", showTagline = true, size = "md" }: LogoProps) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`}>
      <img
        src={SITE.logoUrl}
        alt="Pecan St. Station Deli & Grill"
        className={`${sizes[size]} w-auto bg-transparent transition-transform group-hover:scale-[1.02]`}
        width={480}
        height={294}
        decoding="async"
      />
      {showTagline && (
        <span className="hidden lg:flex flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70">Pflugerville, Texas · Since 2000</span>
        </span>
      )}
    </Link>
  );
}
