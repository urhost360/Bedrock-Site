export function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 8 });
  return (
    <div className="relative overflow-hidden border-y border-primary/30 bg-bark py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((_, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl tracking-widest text-primary flex items-center gap-12"
          >
            {text}
            <span className="text-cream/60">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}