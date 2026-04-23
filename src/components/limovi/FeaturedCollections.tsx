import bridal from "@/assets/collection-bridal.jpg";
import everyday from "@/assets/collection-everyday.jpg";
import diamond from "@/assets/collection-diamond.jpg";
import { SectionHeading } from "./SectionHeading";

const collections = [
  {
    name: "Vivaha",
    tag: "Bridal Heritage",
    desc: "Polki, kundan and uncut diamond regalia — for the bride who wears a story.",
    img: bridal,
  },
  {
    name: "Solène",
    tag: "Everyday Luxe",
    desc: "Featherlight diamond essentials, designed to be worn from boardroom to soirée.",
    img: everyday,
  },
  {
    name: "Éclat",
    tag: "Diamond Atelier",
    desc: "Statement solitaires and tennis lines, set in 18K gold with VVS clarity.",
    img: diamond,
  },
];

export function FeaturedCollections() {
  return (
    <section id="collections" className="py-20 md:py-28 bg-secondary/40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Signature Edits"
          title="Featured Collections"
          subtitle="Three universes, each conceived around a singular muse and crafted by hand in our Jaipur atelier."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {collections.map((c, i) => (
            <article
              key={c.name}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover-lift"
              style={{ animation: `fade-up 0.8s var(--ease-luxe) ${i * 120}ms both` }}
            >
              <div className="aspect-[3/4] overflow-hidden hover-zoom-img">
                <img
                  src={c.img}
                  alt={c.name + " collection"}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-8 bg-gradient-to-t from-plum-deep via-plum-deep/70 to-transparent">
                <span className="eyebrow text-gold-soft">{c.tag}</span>
                <h3 className="mt-2 font-display text-3xl md:text-4xl text-champagne font-light">
                  {c.name}
                </h3>
                <p className="mt-3 text-sm text-champagne/80 leading-relaxed max-w-sm">
                  {c.desc}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-block text-[11px] tracking-[0.25em] uppercase text-gold border-b border-gold/50 pb-1 hover:text-champagne hover:border-champagne transition"
                >
                  Discover the Edit
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
