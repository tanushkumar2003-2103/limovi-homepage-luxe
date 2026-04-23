import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ShopProduct } from "@/lib/shop-data";

interface CartItem {
  product: ShopProduct;
  qty: number;
}

interface ShopContextValue {
  cart: CartItem[];
  wishlist: ShopProduct[];
  addToCart: (p: ShopProduct, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (p: ShopProduct) => void;
  isWished: (id: string) => boolean;
  cartCount: number;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "limovi:cart";
const WISH_KEY = "limovi:wishlist";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<ShopProduct[]>([]);

  // Hydrate from storage
  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {/* ignore */}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {/* ignore */}
  }, [wishlist]);

  const value = useMemo<ShopContextValue>(() => {
    const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);
    const cartTotal = cart.reduce((acc, i) => acc + i.qty * i.product.price, 0);

    return {
      cart,
      wishlist,
      cartCount,
      cartTotal,
      addToCart: (p, qty = 1) =>
        setCart((prev) => {
          const found = prev.find((i) => i.product.id === p.id);
          if (found) {
            return prev.map((i) =>
              i.product.id === p.id ? { ...i, qty: i.qty + qty } : i,
            );
          }
          return [...prev, { product: p, qty }];
        }),
      removeFromCart: (id) =>
        setCart((prev) => prev.filter((i) => i.product.id !== id)),
      updateQty: (id, qty) =>
        setCart((prev) =>
          prev
            .map((i) => (i.product.id === id ? { ...i, qty: Math.max(0, qty) } : i))
            .filter((i) => i.qty > 0),
        ),
      clearCart: () => setCart([]),
      toggleWishlist: (p) =>
        setWishlist((prev) =>
          prev.some((i) => i.id === p.id)
            ? prev.filter((i) => i.id !== p.id)
            : [...prev, p],
        ),
      isWished: (id) => wishlist.some((i) => i.id === id),
    };
  }, [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
