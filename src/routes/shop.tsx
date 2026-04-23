import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AnnouncementBar } from "@/components/limovi/AnnouncementBar";
import { Header } from "@/components/limovi/Header";
import { Footer } from "@/components/limovi/Footer";
import { ShopFilters, type FilterState } from "@/components/limovi/shop/ShopFilters";
import { ShopProductCard } from "@/components/limovi/shop/ShopProductCard";
import { QuickViewModal } from "@/components/limovi/shop/QuickViewModal";
import { PRODUCTS, SHOP_CATEGORIES, type ShopProduct } from "@/lib/shop-data";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRICE_BOUNDS: [number, number] = [
  Math.floor(Math.min(...PRODUCTS.map((p) => p.price)) / 1000) * 1000,
  Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 1000) * 1000,
];

const INITIAL_FILTERS: FilterState = {
  category: "All",
  priceRange: PRICE_BOUNDS,
  occasions: [],
  tones: [],
  inStockOnly: false,
};

type SortKey = "popularity" | "price-asc" | "price-desc" | "newest";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop Fine Jewellery — Limovi" },
      {
        name: "description",
        content:
          "Browse the Limovi collection — necklaces, earrings, rings and bridal sets in 18K & 22K gold, ethically sourced diamonds and antique-finish polki.",
      },
      { property: "og:title", content: "Shop Fine Jewellery — Limovi" },
      {
        property: "og:description",
        content: "Hand-finished jewellery, hallmarked and certified. Filter by category, price, occasion and metal tone.",
      },
    ],
  }),
});

function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popularity");
  const [quickView, setQuickView] = useState<ShopProduct | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      if (filters.occasions.length && !filters.occasions.includes(p.occasion)) return false;
      if (filters.tones.length && !filters.tones.includes(p.tone)) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "newest":
        return [...list].sort((a, b) => a.createdAt - b.createdAt);
      default:
        return [...list].sort((a, b) => b.popularity - a.popularity);
    }
  }, [filters, search, sort]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnnouncementBar />
      <Header />

      {/* Page header */}
      <section className="bg-gradient-to-b from-secondary/50 to-background border-b border-border/60">
        <div className="container-luxe py-10 md:py-14 text-center">
          <span className="eyebrow">The Atelier</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl text-plum-deep font-light">
            Shop Fine Jewellery
          </h1>
          <span className="block divider-gold mx-auto mt-4" />
          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
            Curated heirlooms, hallmarked classics and modern everyday pieces — crafted with quiet luxury.
          </p>
        </div>
      </section>

      <main className="container-luxe py-10 md:py-14 flex-1">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ShopFilters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(INITIAL_FILTERS)}
                priceBounds={PRICE_BOUNDS}
              />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Top controls */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jewellery, occasions, collections…"
                    className="w-full h-12 pl-11 pr-4 rounded-full bg-card border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 text-sm transition"
                  />
                </div>

                <Sheet open={mobileFilters} onOpenChange={setMobileFilters}>
                  <SheetTrigger asChild>
                    <button className="lg:hidden inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-border text-sm text-plum-deep hover:bg-secondary transition">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[88%] sm:max-w-sm bg-background overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="font-display text-2xl text-plum-deep text-left">
                        Refine
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <ShopFilters
                        filters={filters}
                        onChange={setFilters}
                        onReset={() => setFilters(INITIAL_FILTERS)}
                        priceBounds={PRICE_BOUNDS}
                      />
                    </div>
                    <button
                      onClick={() => setMobileFilters(false)}
                      className="mt-8 w-full bg-plum-deep text-champagne text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gold hover:text-plum-deep transition-colors"
                    >
                      View {filtered.length} results
                    </button>
                  </SheetContent>
                </Sheet>

                <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                  <SelectTrigger className="h-12 w-full md:w-[200px] rounded-full border-border bg-card text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                {SHOP_CATEGORIES.map((c) => {
                  const active = filters.category === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setFilters({ ...filters, category: c })}
                      className={`shrink-0 text-[11px] tracking-[0.22em] uppercase px-4 py-2 rounded-full border transition-all ${
                        active
                          ? "bg-plum-deep text-champagne border-plum-deep"
                          : "bg-transparent text-muted-foreground border-border hover:border-gold hover:text-plum-deep"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* Count */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Showing <span className="text-foreground font-medium">{filtered.length}</span> of{" "}
                  {PRODUCTS.length} pieces
                </span>
                {(filters.occasions.length > 0 ||
                  filters.tones.length > 0 ||
                  filters.inStockOnly) && (
                  <button
                    onClick={() => setFilters(INITIAL_FILTERS)}
                    className="inline-flex items-center gap-1 text-gold hover:text-plum-deep transition"
                  >
                    Clear filters <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((p, i) => (
                  <ShopProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    onQuickView={setQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-16 text-center py-16 border border-dashed border-border rounded-2xl">
                <p className="font-display text-2xl text-plum-deep">No pieces found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or search.
                </p>
                <button
                  onClick={() => {
                    setFilters(INITIAL_FILTERS);
                    setSearch("");
                  }}
                  className="mt-6 text-[11px] tracking-[0.25em] uppercase text-plum-deep border-b border-gold pb-1 hover:text-gold transition"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <QuickViewModal
        product={quickView}
        open={!!quickView}
        onOpenChange={(o) => !o && setQuickView(null)}
      />

      <Footer />
    </div>
  );
}
