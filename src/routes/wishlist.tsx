import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, X, ArrowRight, Star } from "lucide-react";
import { AnnouncementBar } from "@/components/limovi/AnnouncementBar";
import { Header } from "@/components/limovi/Header";
import { Footer } from "@/components/limovi/Footer";
import { useShop } from "@/context/ShopContext";
import { formatINR } from "@/lib/shop-data";
import { toast } from "sonner";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({
    meta: [
      { title: "Your Wishlist — Limovi" },
      { name: "description", content: "Save and revisit the Limovi pieces you love most." },
    ],
  }),
});

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnnouncementBar />
      <Header />

      <section className="bg-gradient-to-b from-secondary/50 to-background border-b border-border/60">
        <div className="container-luxe py-10 md:py-14 text-center">
          <span className="eyebrow">Saved for You</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-plum-deep font-light">
            Your Wishlist
          </h1>
          <span className="block divider-gold mx-auto mt-4" />
          <p className="mt-4 text-sm text-muted-foreground">
            {wishlist.length > 0
              ? `${wishlist.length} ${wishlist.length === 1 ? "piece" : "pieces"} you adore`
              : "Hearts await — start saving the pieces you love."}
          </p>
        </div>
      </section>

      <main className="container-luxe py-10 md:py-14 flex-1">
        {wishlist.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl">
            <div className="mx-auto h-14 w-14 rounded-full bg-secondary grid place-items-center">
              <Heart className="h-6 w-6 text-plum-deep" />
            </div>
            <p className="mt-6 font-display text-2xl text-plum-deep">
              Your wishlist is empty
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on any piece to save it here for later.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-plum-deep text-champagne text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-gold hover:text-plum-deep transition-colors"
            >
              Browse the Atelier <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col rounded-2xl bg-card overflow-hidden shadow-card hover-lift"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <button
                    aria-label="Remove from wishlist"
                    onClick={() => {
                      toggleWishlist(product);
                      toast.success("Removed from wishlist");
                    }}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-champagne/90 backdrop-blur grid place-items-center text-plum-deep hover:bg-gold transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gold">
                    {product.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg md:text-xl text-plum-deep leading-snug line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`}
                        />
                      ))}
                    </span>
                    <span className="text-foreground font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-foreground font-medium">
                      {formatINR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatINR(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={!product.inStock}
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to bag`);
                    }}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-plum-deep text-champagne text-[11px] tracking-[0.22em] uppercase py-3 hover:bg-gold hover:text-plum-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    {product.inStock ? "Add to Bag" : "Sold out"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
