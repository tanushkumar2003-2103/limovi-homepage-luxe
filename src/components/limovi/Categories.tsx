import { SectionHeading } from "./SectionHeading";
import necklaces from "@/assets/cat-necklaces.jpg";
import earrings from "@/assets/cat-earrings.jpg";
import bangles from "@/assets/cat-bangles.jpg";
import rings from "@/assets/cat-rings.jpg";
import pendants from "@/assets/cat-pendants.jpg";
import nosepins from "@/assets/cat-nosepins.jpg";

const categories = [
  { name: "Necklaces", count: "120+ designs", img: necklaces },
  { name: "Earrings", count: "240+ designs", img: earrings },
  { name: "Bangles", count: "85+ designs", img: bangles },
  { name: "Rings", count: "180+ designs", img: rings },
  { name: "Mangalsutras", count: "60+ designs", img: pendants },
  { name: "Nose Pins", count: "45+ designs", img: nosepins },
];

export function Categories() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Curated Edits"
          title="Shop by Category"
          subtitle="Six timeless silhouettes — each meticulously designed to honour your everyday and your most cherished moments."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((c, i) => (
            <a
              key={c.name}
              href="#"
              className="group relative block rounded-2xl overflow-hidden bg-card hover-lift hover-zoom-img"
              style={{ animation: `fade-up 0.7s var(--ease-luxe) ${i * 80}ms both` }}
            >
              <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-plum-deep/85 via-plum-deep/30 to-transparent">
                <h3 className="font-display text-xl md:text-2xl text-champagne font-medium">
                  {c.name}
                </h3>
                <p className="text-[11px] tracking-[0.22em] uppercase text-champagne/70 mt-1">
                  {c.count}
                </p>
              </div>
              <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-champagne/90 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="text-plum-deep text-lg">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
