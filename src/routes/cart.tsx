import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/limovi/AnnouncementBar";
import { Header } from "@/components/limovi/Header";
import { Footer } from "@/components/limovi/Footer";
import { useShop } from "@/context/ShopContext";
import { formatINR } from "@/lib/shop-data";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Bag — Dhanalaxmi Jewellers" },
      { name: "description", content: "Review your selected jewellery pieces and proceed to a secure checkout." },
    ],
  }),
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount, clearCart } = useShop();

  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnnouncementBar />
      <Header />

      <section className="bg-gradient-to-b from-secondary/50 to-background border-b border-border/60">
        <div className="container-luxe py-10 md:py-14 text-center">
          <span className="eyebrow">The Atelier</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-plum-deep font-light">
            Your Bag
          </h1>
          <span className="block divider-gold mx-auto mt-4" />
          <p className="mt-4 text-sm text-muted-foreground">
            {cartCount > 0
              ? `${cartCount} ${cartCount === 1 ? "piece" : "pieces"} reserved for you`
              : "Your bag awaits its first heirloom."}
          </p>
        </div>
      </section>

      <main className="container-luxe py-10 md:py-14 flex-1">
        {cart.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
            {/* Items */}
            <div className="space-y-6">
              {cart.map(({ product, qty }) => (
                <article
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-5 p-4 sm:p-5 rounded-2xl bg-card shadow-card"
                >
                  <Link
                    to="/shop"
                    className="block shrink-0 w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden bg-secondary"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover hover:scale-105 transition duration-700"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-gold">
                          {product.category}
                        </p>
                        <h3 className="mt-1 font-display text-lg md:text-xl text-plum-deep truncate">
                          {product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        aria-label="Remove"
                        className="text-muted-foreground hover:text-plum-deep transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11.5px] text-muted-foreground">
                      <Detail label="SKU" value={product.sku} />
                      <Detail label="Purity" value={product.purity} />
                      <Detail label="Gross" value={product.grossWeight} />
                      <Detail label="Length" value={product.length} />
                      <Detail label="Metal" value={product.metalWeight} />
                      <Detail label="Width" value={product.width} />
                      <Detail label="Stone" value={product.stoneWeight} />
                      <Detail label="Gender" value={product.gender} />
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-full">
                        <button
                          aria-label="Decrease"
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="h-9 w-9 grid place-items-center text-plum-deep hover:bg-secondary rounded-l-full transition"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-4 text-sm font-medium tabular-nums">{qty}</span>
                        <button
                          aria-label="Increase"
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="h-9 w-9 grid place-items-center text-plum-deep hover:bg-secondary rounded-r-full transition"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          {formatINR(product.price * qty)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatINR(product.originalPrice * qty)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="flex justify-between text-xs text-muted-foreground pt-2">
                <Link to="/shop" className="hover:text-plum-deep transition">
                  ← Continue shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="hover:text-plum-deep transition"
                >
                  Clear bag
                </button>
              </div>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 h-fit rounded-2xl bg-card shadow-card p-6 md:p-8">
              <h2 className="font-display text-2xl text-plum-deep">Order Summary</h2>
              <span className="block divider-gold mt-3" />

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatINR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-medium text-gold">Complimentary</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Estimated GST</dt>
                  <dd className="text-muted-foreground">Calculated at checkout</dd>
                </div>
              </dl>

              <div className="mt-6 pt-6 border-t border-border/60 flex items-baseline justify-between">
                <span className="font-display text-lg text-plum-deep">Total</span>
                <span className="font-display text-2xl text-plum-deep">
                  {formatINR(total)}
                </span>
              </div>

              <button className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-plum-deep text-champagne text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gold hover:text-plum-deep transition-colors">
                Secure Checkout <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <p className="mt-4 text-[11px] text-muted-foreground text-center">
                Hallmarked · Certified · Lifetime exchange
              </p>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 leading-tight">
      <span className="text-foreground/55">{label}</span>
      <span className="text-foreground/85 font-medium text-right truncate">{value}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 border border-dashed border-border rounded-2xl">
      <div className="mx-auto h-14 w-14 rounded-full bg-secondary grid place-items-center">
        <ShoppingBag className="h-6 w-6 text-plum-deep" />
      </div>
      <p className="mt-6 font-display text-2xl text-plum-deep">Your bag is empty</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Discover heirlooms crafted to be worn for generations.
      </p>
      <Link
        to="/shop"
        className="mt-8 inline-flex items-center gap-2 bg-plum-deep text-champagne text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-gold hover:text-plum-deep transition-colors"
      >
        Explore the Atelier <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
