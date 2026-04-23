const items = [
  {
    quote:
      "My grandmother's polki necklace was reimagined by Limovi into something I'll wear every week. Their craftsmanship is uncompromising.",
    name: "Anaïra Mehta",
    title: "Mumbai",
  },
  {
    quote:
      "I bought my engagement ring from Limovi. Three years later, the stone sparkles like the day I first saw it. Pure poetry.",
    name: "Saanvi Rao",
    title: "Bangalore",
  },
  {
    quote:
      "Their virtual consultation made my bridal trousseau effortless. Every piece arrived more beautiful than the renders.",
    name: "Ishaani Kapoor",
    title: "New Delhi",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-plum-deep text-champagne overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold blur-3xl" />
      </div>
      <div className="container-luxe relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow text-gold-soft">In Their Words</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-light">
            Worn by women who know
          </h2>
          <span className="divider-gold mt-4 mx-auto block" />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((t, i) => (
            <figure
              key={t.name}
              className="relative bg-champagne/[0.04] backdrop-blur border border-champagne/10 rounded-2xl p-8 md:p-10 hover:border-gold/40 transition-colors duration-500"
              style={{ animation: `fade-up 0.7s var(--ease-luxe) ${i * 100}ms both` }}
            >
              <span className="absolute -top-4 left-8 font-display text-7xl text-gold leading-none select-none">
                "
              </span>
              <blockquote className="font-display text-lg md:text-xl leading-relaxed text-champagne/95 font-light">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-champagne/15">
                <div className="text-sm font-medium tracking-wide">{t.name}</div>
                <div className="text-xs text-champagne/60 tracking-[0.2em] uppercase mt-1">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
