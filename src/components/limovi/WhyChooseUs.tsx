import { ShieldCheck, Gem, Truck, RefreshCcw } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  { icon: Gem, title: "Hallmarked Purity", desc: "Every piece BIS-certified for assured 22K & 18K gold." },
  { icon: ShieldCheck, title: "Lifetime Authenticity", desc: "Each diamond IGI/GIA certified with full traceability." },
  { icon: Truck, title: "Insured Worldwide Shipping", desc: "Discreet, signature-required delivery in 48 hours." },
  { icon: RefreshCcw, title: "Lifetime Exchange", desc: "Trade in seamlessly — your jewellery, evolving with you." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="The Dhanalaxmi Jewellers Promise"
          title="Why women choose us"
          subtitle="Four generations of master craftsmanship, distilled into every clasp, every prong, every stone."
        />
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group bg-card rounded-2xl p-7 md:p-8 shadow-card hover-lift text-center md:text-left"
              style={{ animation: `fade-up 0.6s var(--ease-luxe) ${i * 80}ms both` }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-plum-deep group-hover:bg-plum-deep group-hover:text-gold transition-colors duration-500">
                <f.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-xl text-plum-deep font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
