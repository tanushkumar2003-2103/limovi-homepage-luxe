import { Instagram, Facebook, Youtube } from "lucide-react";

const cols = [
  {
    title: "Shop",
    links: ["All Jewellery", "Gold", "Diamond", "Bridal", "Gifting", "New Arrivals"],
  },
  {
    title: "About",
    links: ["Our Heritage", "The Atelier", "Sustainability", "Press", "Careers"],
  },
  {
    title: "Care",
    links: ["Contact Us", "Store Locator", "Shipping", "Returns & Exchange", "Care Guide", "FAQs"],
  },
];

export function Footer() {
  return (
    <footer className="bg-plum-deep text-champagne">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          <div className="col-span-2">
            <div className="font-display text-3xl tracking-[0.25em]">LIMOVI</div>
            <span className="divider-gold mt-4 block" />
            <p className="mt-5 text-sm text-champagne/70 leading-relaxed max-w-sm">
              Heirloom jewellery for the modern woman. Hand-finished in Jaipur,
              treasured worldwide.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-champagne/20 grid place-items-center hover:bg-gold hover:text-plum-deep hover:border-gold transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs tracking-[0.25em] uppercase text-gold-soft">{col.title}</h4>
              <ul className="mt-5 space-y-3 text-sm text-champagne/75">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-gold transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-champagne/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase text-champagne/60">
          <p>© {new Date().getFullYear()} Limovi Maison · All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
