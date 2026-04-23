import { SectionHeading } from "./SectionHeading";
import { ProductCard, type Product } from "./ProductCard";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import p7 from "@/assets/product-7.jpg";
import p8 from "@/assets/product-8.jpg";

const items: Product[] = [
  { name: "Maharani Polki Choker", category: "Bridal · Polki", price: "₹ 2,18,000", badge: "New", img: p5 },
  { name: "Naïra Temple Jhumka", category: "Antique · 22K", price: "₹ 76,400", badge: "New", img: p6 },
  { name: "Trio Stack Diamond Rings", category: "Everyday · 18K", price: "₹ 39,900", badge: "New", img: p7 },
  { name: "Saanvi Mangalsutra", category: "Diamond · 18K", price: "₹ 54,300", badge: "New", img: p8 },
];

export function NewArrivals() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Just Landed"
          title="New Arrivals"
          subtitle="Fresh from the atelier — limited pieces, infinitely cherished."
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p, i) => <ProductCard key={p.name} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
