import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";
import type { ShopProduct } from "@/lib/shop-data";
import { formatINR } from "@/lib/shop-data";
import { useShop } from "@/context/ShopContext";

interface Props {
  product: ShopProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ product, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border">
        {product && (
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square bg-secondary">
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:p-10 flex flex-col">
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold">{product.category}</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-plum-deep font-light">
                {product.name}
              </h2>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`}
                    />
                  ))}
                </span>
                <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
                <span>· {product.reviewsCount} reviews</span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl text-plum-deep">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>

              <span className="block divider-gold my-6" />

              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                <Row label="SKU" value={product.sku} />
                <Row label="Length" value={product.length} />
                <Row label="Gross Weight" value={product.grossWeight} />
                <Row label="Width" value={product.width} />
                <Row label="Metal Weight" value={product.metalWeight} />
                <Row label="Purity" value={product.purity} />
                <Row label="Stone Weight" value={product.stoneWeight} />
                <Row label="Gender" value={product.gender} />
              </div>

              <div className="mt-auto pt-8 flex gap-3">
                <button
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.name} added to bag`);
                    onOpenChange(false);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-plum-deep text-champagne text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gold hover:text-plum-deep transition-colors disabled:opacity-50"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Sold out"}
                </button>
                <button
                  aria-label="Wishlist"
                  onClick={() => {
                    toggleWishlist(product);
                    toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
                  }}
                  className={`h-auto px-5 grid place-items-center transition-colors ${wished ? "bg-gold text-plum-deep" : "bg-champagne text-plum-deep hover:bg-gold"}`}
                >
                  <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 border-b border-border/50 pb-1.5">
      <span className="text-muted-foreground text-xs tracking-wider uppercase">{label}</span>
      <span className="text-foreground font-medium text-right">{value}</span>
    </div>
  );
}
