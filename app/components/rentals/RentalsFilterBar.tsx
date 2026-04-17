import { Button, Select, SelectItem } from "@heroui/react";
import { FaFilter } from "react-icons/fa";
import { DEFAULT_RENTAL_FILTERS, type RentalFilters } from "@/lib/rentals";

const BED_OPTIONS = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

/** Rental price ranges (typically per year in Naira). */
const PRICE_RANGES: {
  value: string;
  label: string;
  min?: string;
  max?: string;
}[] = [
  { value: "", label: "Any price" },
  { value: "under-1", label: "Under ₦1m", max: "1000000" },
  { value: "1-3", label: "₦1m – ₦3m", min: "1000000", max: "3000000" },
  { value: "3-5", label: "₦3m – ₦5m", min: "3000000", max: "5000000" },
  { value: "5-10", label: "₦5m – ₦10m", min: "5000000", max: "10000000" },
  { value: "10-20", label: "₦10m – ₦20m", min: "10000000", max: "20000000" },
  { value: "over-20", label: "Over ₦20m", min: "20000000" },
];

const FURNISHMENT_OPTIONS = [
  { value: "", label: "Any" },
  { value: "furnished", label: "Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "Any type" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "duplex", label: "Duplex" },
  { value: "penthouse", label: "Penthouse" },
];

const selectClassNames = {
  base: "w-44",
  trigger:
    "h-11 bg-secondary-background border border-soft-divider-line shadow-sm data-[hover=true]:border-primary-gold/30 transition-colors min-w-[150px]",
  value: "text-main-text-headlines text-body",
  label: "text-muted-labels text-body",
};

export interface RentalsFilterBarProps {
  filters: RentalFilters;
  onFiltersChange: (filters: RentalFilters) => void;
  locationOptions: string[];
}

export function RentalsFilterBar({
  filters,
  onFiltersChange,
  locationOptions,
}: RentalsFilterBarProps) {
  const priceRange = (() => {
    const r = PRICE_RANGES.find(
      (r) =>
        r.min === (filters.minPrice || undefined) &&
        r.max === (filters.maxPrice || undefined),
    );
    if (r) return r.value;
    if (filters.minPrice || filters.maxPrice) return "custom";
    return "";
  })();

  function update(key: keyof RentalFilters, value: string) {
    onFiltersChange({ ...filters, [key]: value });
  }

  const hasActiveFilters =
    !!filters.location ||
    !!filters.status ||
    !!filters.minBeds ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    !!filters.furnishment ||
    !!filters.propertyType;

  return (
    <div className="border-y border-soft-divider-line bg-main-background py-4">
      <div className="mx-auto flex justify-center max-w-7xl flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Select
          aria-label="Location"
          placeholder="Location"
          labelPlacement="outside"
          selectedKeys={filters.location ? [filters.location] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            update("location", v ?? "");
          }}
          classNames={selectClassNames}
          items={[
            { key: "", label: "Any location" },
            ...locationOptions.map((loc) => ({ key: loc, label: loc })),
          ]}
        >
          {(item) => (
            <SelectItem key={item.key} textValue={item.label}>
              {item.label}
            </SelectItem>
          )}
        </Select>

        <Select
          aria-label="Price range"
          placeholder="Price range"
          labelPlacement="outside"
          selectedKeys={priceRange ? [priceRange] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            const range = PRICE_RANGES.find((r) => r.value === v);
            if (range) {
              onFiltersChange({
                ...filters,
                minPrice: range.min ?? "",
                maxPrice: range.max ?? "",
              });
            }
          }}
          classNames={{
            ...selectClassNames,
            trigger: selectClassNames.trigger + " min-w-[165px]",
          }}
          items={PRICE_RANGES.map((r) => ({ ...r, key: r.value }))}
        >
          {(r) => (
            <SelectItem key={r.key} textValue={r.label}>
              {r.label}
            </SelectItem>
          )}
        </Select>

        <Select
          aria-label="Bedrooms"
          placeholder="Bedrooms"
          labelPlacement="outside"
          selectedKeys={filters.minBeds ? [filters.minBeds] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            update("minBeds", v ?? "");
          }}
          classNames={selectClassNames}
          items={BED_OPTIONS.map((b) => ({ ...b, key: b.value }))}
        >
          {(b) => (
            <SelectItem key={b.key} textValue={b.label}>
              {b.label}
            </SelectItem>
          )}
        </Select>

        <Select
          aria-label="Furnishment"
          placeholder="Furnishment"
          labelPlacement="outside"
          selectedKeys={filters.furnishment ? [filters.furnishment] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            update("furnishment", v ?? "");
          }}
          classNames={selectClassNames}
          items={FURNISHMENT_OPTIONS.map((f) => ({ ...f, key: f.value }))}
        >
          {(f) => (
            <SelectItem key={f.key} textValue={f.label}>
              {f.label}
            </SelectItem>
          )}
        </Select>

        <Select
          aria-label="Property type"
          placeholder="Property type"
          labelPlacement="outside"
          selectedKeys={filters.propertyType ? [filters.propertyType] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            update("propertyType", v ?? "");
          }}
          classNames={selectClassNames}
          items={PROPERTY_TYPE_OPTIONS.map((t) => ({ ...t, key: t.value }))}
        >
          {(t) => (
            <SelectItem key={t.key} textValue={t.label}>
              {t.label}
            </SelectItem>
          )}
        </Select>

        <Button
          radius="none"
          className="h-11 w-full shrink-0 font-medium sm:w-auto sm:ml-2 bg-primary-gold text-main-background hover:bg-soft-gold-hover-state"
          startContent={<FaFilter className="h-3.5 w-3.5" />}
          onPress={() => {
            if (hasActiveFilters) {
              onFiltersChange({ ...DEFAULT_RENTAL_FILTERS });
            }
          }}
        >
          {hasActiveFilters ? "Clear filters" : "Apply filters"}
        </Button>
      </div>
    </div>
  );
}
