const messages = [
  "Complimentary shipping on orders above ₹5,000",
  "Lifetime exchange · Certified BIS Hallmark",
  "Book a virtual try-on with our jewellery experts",
];

export function AnnouncementBar() {
  return (
    <div className="bg-plum-deep text-champagne text-xs tracking-[0.18em] uppercase">
      <div className="container-luxe flex items-center justify-center gap-8 py-2.5 overflow-hidden">
        <div className="flex items-center gap-12 animate-[shimmer_30s_linear_infinite] whitespace-nowrap">
          {[...messages, ...messages].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="text-[10px] md:text-xs">{m}</span>
              <span className="h-1 w-1 rounded-full bg-gold/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
