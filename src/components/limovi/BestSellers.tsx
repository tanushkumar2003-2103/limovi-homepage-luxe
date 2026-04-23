import { SectionHeading } from "./SectionHeading";
import { ProductCard, type Product } from "./ProductCard";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

const items: Product[] = [
  { name: "Aurelia Pear Drop Earring", category: "Diamond · 18K", price: "₹ 48,200", oldPrice: "₹ 56,000", badge: "Bestseller", img: p1 },
  { name: "Lumière Solitaire Pendant", category: "Diamond · 18K", price: "₹ 32,750", img: p2 },
  { name: "Eternité Diamond Band", category: "Bridal · 18K", price: "₹ 84,900", badge: "New", img: p3 },
  { name: "Soleil Tennis Bracelet", category: "Diamond · 18K", price: "₹ 1,24,500", img: p4 },
];

export function BestSellers() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Most Coveted"
            title="Bestsellers"
            subtitle="The pieces our women return to — again and again."
            align="left"
          />
          <a href="#" className="text-[11px] tracking-[0.25em] uppercase text-plum-deep border-b border-gold pb-1 hover:text-gold transition self-start md:self-end">
            View All →
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p, i) => <ProductCard key={p.name} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
