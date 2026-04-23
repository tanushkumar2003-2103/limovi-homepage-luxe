import { Heart } from "lucide-react";

export interface Product {
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  img: string;
}

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  return (
    <a
      href="#"
      className="group block rounded-2xl bg-card overflow-hidden shadow-card hover-lift"
      style={{ animation: `fade-up 0.6s var(--ease-luxe) ${index * 60}ms both` }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary hover-zoom-img">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
        />
        {p.badge && (
          <span className="absolute top-3 left-3 bg-plum-deep text-champagne text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
            {p.badge}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-champagne/90 backdrop-blur grid place-items-center text-plum-deep opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 hover:bg-gold hover:text-plum-deep"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full bg-plum-deep text-champagne text-[11px] tracking-[0.22em] uppercase py-3 hover:bg-gold hover:text-plum-deep transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold">{p.category}</p>
        <h3 className="mt-1.5 font-display text-lg md:text-xl text-plum-deep font-normal leading-snug line-clamp-2">
          {p.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-foreground font-medium">{p.price}</span>
          {p.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
          )}
        </div>
      </div>
    </a>
  );
}
