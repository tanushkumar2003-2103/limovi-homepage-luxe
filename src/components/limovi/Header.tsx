import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";

const navItems: { label: string; to: string }[] = [
  { label: "All Jewellery", to: "/shop" },
  { label: "Gold", to: "/shop" },
  { label: "Diamond", to: "/shop" },
  { label: "Bridal", to: "/shop" },
  { label: "Earrings", to: "/shop" },
  { label: "Necklaces", to: "/shop" },
  { label: "Rings", to: "/shop" },
  { label: "Collections", to: "/shop" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useShop();

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="container-luxe">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 md:flex-none flex-1 justify-center md:justify-start">
            <span className="font-display text-2xl md:text-3xl font-medium tracking-[0.25em] text-plum-deep">
              LIMOVI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-foreground/80">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="relative hover:text-plum-deep transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5 text-foreground">
            <button aria-label="Search" className="hidden md:block hover:text-plum transition">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button aria-label="Account" className="hidden md:block hover:text-plum transition">
              <User className="h-[18px] w-[18px]" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-plum transition">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gold text-plum-deep text-[9px] font-medium h-4 w-4 rounded-full grid place-items-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative hover:text-plum transition">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-plum-deep text-champagne text-[9px] font-medium h-4 w-4 rounded-full grid place-items-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-plum-deep/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[82%] max-w-sm bg-champagne shadow-luxe transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-display text-2xl tracking-[0.25em] text-plum-deep">LIMOVI</span>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-plum-deep py-3 border-b border-border/40 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3"><ShoppingBag className="h-4 w-4" /> Bag ({cartCount})</Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-3"><Heart className="h-4 w-4" /> Wishlist ({wishlist.length})</Link>
              <a href="#" className="flex items-center gap-3"><User className="h-4 w-4" /> My Account</a>
              <a href="#" className="flex items-center gap-3"><Search className="h-4 w-4" /> Search</a>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
