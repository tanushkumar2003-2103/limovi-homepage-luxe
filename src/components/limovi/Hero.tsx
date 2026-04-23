import heroImg from "@/assets/hero-model.jpg";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-plum-deep">
      <div className="relative h-[78vh] min-h-[560px] md:h-[88vh] md:min-h-[680px]">
        <img
          src={heroImg}
          alt="Limovi bridal heritage collection model wearing gold and diamond jewellery"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center"
        />
        {/* Layered overlays for editorial depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-plum-deep/85 via-plum-deep/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/60 via-transparent to-transparent" />

        <div className="container-luxe relative h-full flex items-center">
          <div className="max-w-xl text-champagne animate-[fade-up_1s_var(--ease-luxe)_both]">
            <span className="eyebrow text-gold-soft">The Heritage Edit · 2025</span>
            <span className="divider-gold mt-4 mb-6 ml-1" />
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] font-light">
              Crafted for the <em className="text-gold not-italic font-normal">extraordinary</em> woman
            </h1>
            <p className="mt-6 text-base md:text-lg text-champagne/80 max-w-md leading-relaxed">
              Hand-finished gold and ethically sourced diamonds, set by master artisans
              into heirlooms meant to be passed down through generations.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#collections"
                className="group inline-flex items-center gap-3 bg-champagne text-plum-deep px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium hover:bg-gold hover:text-plum-deep transition-colors duration-500"
              >
                Explore Collection
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#bridal"
                className="inline-flex items-center gap-3 text-xs tracking-[0.22em] uppercase font-medium text-champagne/90 border-b border-gold/60 pb-1 hover:text-gold transition"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom marquee badges */}
        <div className="absolute bottom-0 left-0 right-0 hidden md:flex justify-end">
          <div className="bg-champagne/95 backdrop-blur px-8 py-5 flex items-center gap-10 text-[11px] tracking-[0.22em] uppercase text-plum-deep">
            <span>22K Hallmarked</span>
            <span className="h-3 w-px bg-gold/40" />
            <span>Lifetime Exchange</span>
            <span className="h-3 w-px bg-gold/40" />
            <span>Free Insured Shipping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
