import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SHOP_CATEGORIES, OCCASIONS, TONES, formatINR } from "@/lib/shop-data";

export interface FilterState {
  category: string;
  priceRange: [number, number];
  occasions: string[];
  tones: string[];
  inStockOnly: boolean;
}

interface Props {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  priceBounds: [number, number];
}

export function ShopFilters({ filters, onChange, onReset, priceBounds }: Props) {
  const toggle = (key: "occasions" | "tones", value: string) => {
    const list = filters[key];
    onChange({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-plum-deep">Filters</h3>
        <button
          onClick={onReset}
          className="text-[11px] tracking-[0.22em] uppercase text-gold hover:text-plum-deep transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="flex flex-col gap-2">
          {SHOP_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...filters, category: c })}
              className={`text-left text-sm py-1.5 transition-colors ${
                filters.category === c
                  ? "text-plum-deep font-medium"
                  : "text-muted-foreground hover:text-plum-deep"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`h-px transition-all ${
                    filters.category === c ? "w-6 bg-gold" : "w-0 bg-transparent"
                  }`}
                />
                {c}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price Range">
        <div className="px-1">
          <Slider
            min={priceBounds[0]}
            max={priceBounds[1]}
            step={1000}
            value={filters.priceRange}
            onValueChange={(v) =>
              onChange({ ...filters, priceRange: [v[0], v[1]] as [number, number] })
            }
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>{formatINR(filters.priceRange[0])}</span>
            <span>{formatINR(filters.priceRange[1])}</span>
          </div>
        </div>
      </Section>

      {/* Occasion */}
      <Section title="Occasion">
        <div className="flex flex-col gap-2.5">
          {OCCASIONS.map((o) => (
            <CheckRow
              key={o}
              id={`occ-${o}`}
              label={o}
              checked={filters.occasions.includes(o)}
              onCheckedChange={() => toggle("occasions", o)}
            />
          ))}
        </div>
      </Section>

      {/* Tone */}
      <Section title="Material Tone">
        <div className="flex flex-col gap-2.5">
          {TONES.map((t) => (
            <CheckRow
              key={t}
              id={`tone-${t}`}
              label={t}
              checked={filters.tones.includes(t)}
              onCheckedChange={() => toggle("tones", t)}
            />
          ))}
        </div>
      </Section>

      {/* Stock */}
      <Section title="Availability">
        <CheckRow
          id="in-stock"
          label="In stock only"
          checked={filters.inStockOnly}
          onCheckedChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.25em] uppercase text-plum-deep mb-4">{title}</h4>
      <span className="block divider-gold mb-4" />
      {children}
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-plum-deep transition-colors cursor-pointer">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <span>{label}</span>
    </label>
  );
}
