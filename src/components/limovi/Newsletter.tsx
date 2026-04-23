import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="py-24 md:py-28 bg-champagne-deep/60">
      <div className="container-luxe">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The Atelier Letter</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-plum-deep font-light">
            Be the first to discover
          </h2>
          <span className="divider-gold mt-4 mx-auto block" />
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Private previews of new collections, intimate atelier events, and a
            welcome gift on your first order.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border border-border rounded-full px-6 py-4 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold transition"
            />
            <button
              type="submit"
              className="bg-plum-deep text-champagne px-8 py-4 rounded-full text-xs tracking-[0.22em] uppercase font-medium hover:bg-gold hover:text-plum-deep transition-colors duration-500"
            >
              {sent ? "Welcome ✦" : "Subscribe"}
            </button>
          </form>
          <p className="mt-4 text-[11px] tracking-wider text-muted-foreground">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
