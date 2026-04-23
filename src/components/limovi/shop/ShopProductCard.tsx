import { useState } from "react";
import { Heart, Star, ShoppingBag, Eye, ChevronDown } from "lucide-react";
import type { ShopProduct } from "@/lib/shop-data";
import { formatINR } from "@/lib/shop-data";

interface Props {
  product: ShopProduct;
  index?: number;
  onQuickView: (p: ShopProduct) => void;
}

const badgeStyles: Record<string, string> = {
  "Best Seller": "bg-plum-deep text-champagne",
  "New": "bg-gold text-plum-deep",
  "Celebration Pick": "bg-champagne text-plum-deep border border-gold/60",
};

export function ShopProductCard({ product, index = 0, onQuickView }: Props) {
  const [wished, setWished] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article
      className="group relative flex flex-col rounded-2xl bg-card overflow-hidden shadow-card hover-lift"
      style={{ animation: `fade-up 0.6s var(--ease-luxe) ${index * 50}ms both` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-0"
        />
        <img
          src={product.images[1]}
          alt={`${product.name} alternate view`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-[1.06]"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full ${badgeStyles[product.badge]}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-background/90 text-plum-deep">
              −{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-foreground/80 text-background">
              Sold out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={() => setWished((w) => !w)}
          className={`absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-champagne/90 backdrop-blur grid place-items-center transition-all duration-300 hover:bg-gold hover:scale-110 ${wished ? "text-rose-600" : "text-plum-deep"}`}
        >
          <Heart className={`h-4 w-4 transition-transform ${wished ? "fill-current scale-110" : ""}`} />
        </button>

        {/* Hover actions */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
          <button
            disabled={!product.inStock}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-plum-deep text-champagne text-[11px] tracking-[0.2em] uppercase py-3 hover:bg-gold hover:text-plum-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
          <button
            onClick={() => onQuickView(product)}
            aria-label="Quick view"
            className="h-auto px-4 inline-flex items-center justify-center bg-champagne text-plum-deep hover:bg-gold transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold">{product.category}</p>
        <h3 className="mt-1.5 font-display text-lg md:text-xl text-plum-deep font-normal leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`}
              />
            ))}
          </span>
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {product.reviewsCount} reviews</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-foreground font-medium">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Product Details — desktop hover, mobile collapsible */}
        <div className="mt-4 pt-4 border-t border-border/60">
          <button
            type="button"
            onClick={() => setOpenDetails((o) => !o)}
            aria-expanded={openDetails}
            className="md:hidden w-full flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-plum-deep"
          >
            <span>Product Details</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${openDetails ? "rotate-180" : ""}`}
            />
          </button>

          <p className="hidden md:block text-[11px] tracking-[0.22em] uppercase text-plum-deep/80 md:opacity-60 md:group-hover:opacity-100 transition-opacity duration-500">
            Product Details
          </p>

          <div
            className={`grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11.5px] text-muted-foreground overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              openDetails ? "max-h-72 mt-3 opacity-100" : "max-h-0 opacity-0 mt-0"
            } md:max-h-none md:opacity-0 md:group-hover:opacity-100 md:mt-3`}
          >
            <DetailRow label="SKU" value={product.sku} />
            <DetailRow label="Length" value={product.length} />
            <DetailRow label="Gross" value={product.grossWeight} />
            <DetailRow label="Width" value={product.width} />
            <DetailRow label="Metal" value={product.metalWeight} />
            <DetailRow label="Purity" value={product.purity} />
            <DetailRow label="Stone" value={product.stoneWeight} />
            <DetailRow label="Gender" value={product.gender} />
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 leading-tight">
      <span className="text-foreground/55">{label}</span>
      <span className="text-foreground/85 font-medium text-right truncate">{value}</span>
    </div>
  );
}
