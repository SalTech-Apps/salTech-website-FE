import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { FaFilter } from "react-icons/fa";
import { DEFAULT_FILTERS, type PropertyFilters } from "@/lib/properties";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "UNDER OFFER", label: "Under offer" },
  { value: "SOLD OUT", label: "Sold out" },
];
const BED_OPTIONS = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const PRICE_RANGES: {
  value: string;
  label: string;
  min?: string;
  max?: string;
}[] = [
  { value: "", label: "Any price" },
  { value: "under-50", label: "Under ₦50m", max: "50000000" },
  { value: "50-100", label: "₦50m – ₦100m", min: "50000000", max: "100000000" },
  {
    value: "100-200",
    label: "₦100m – ₦200m",
    min: "100000000",
    max: "200000000",
  },
  {
    value: "200-500",
    label: "₦200m – ₦500m",
    min: "200000000",
    max: "500000000",
  },
  { value: "over-500", label: "Over ₦500m", min: "500000000" },
];

const selectClassNamesDesktop = {
  trigger:
    "h-11 w-full min-w-0 bg-secondary-background border border-soft-divider-line shadow-sm data-[hover=true]:border-primary-gold/30 transition-colors sm:min-w-[150px]",
  value: "text-main-text-headlines text-body",
  label: "text-muted-labels text-body",
};

const selectClassNamesSheet = {
  trigger:
    "h-11 w-full min-w-0 bg-main-background border border-soft-divider-line shadow-sm data-[hover=true]:border-primary-gold/30 transition-colors",
  value: "text-main-text-headlines text-body",
  label: "text-muted-labels text-body",
};

function priceRangeKey(filters: PropertyFilters): string {
  const r = PRICE_RANGES.find(
    (row) =>
      row.min === (filters.minPrice || undefined) &&
      row.max === (filters.maxPrice || undefined),
  );
  if (r) return r.value;
  if (filters.minPrice || filters.maxPrice) return "custom";
  return "";
}

function PropertyFilterSelects({
  filters,
  onFiltersChange,
  locationOptions,
  variant,
  wrapperClassName,
}: {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  locationOptions: string[];
  variant: "desktop" | "sheet";
  wrapperClassName: string;
}) {
  const priceRange = priceRangeKey(filters);
  const base = variant === "sheet" ? selectClassNamesSheet : selectClassNamesDesktop;

  function update(key: keyof PropertyFilters, value: string) {
    onFiltersChange({ ...filters, [key]: value });
  }

  const priceClassNames =
    variant === "sheet"
      ? base
      : {
          ...base,
          trigger: `${base.trigger} sm:min-w-[165px]`,
        };

  return (
    <div className={wrapperClassName}>
      <Select
        aria-label="Location"
        placeholder="Location"
        labelPlacement="outside"
        selectedKeys={filters.location ? [filters.location] : []}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          update("location", v ?? "");
        }}
        classNames={base}
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
        classNames={priceClassNames}
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
        classNames={base}
        items={BED_OPTIONS.map((b) => ({ ...b, key: b.value }))}
      >
        {(b) => (
          <SelectItem key={b.key} textValue={b.label}>
            {b.label}
          </SelectItem>
        )}
      </Select>

      <Select
        aria-label="Status"
        placeholder="Status"
        labelPlacement="outside"
        selectedKeys={filters.status ? [filters.status] : []}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          update("status", v ?? "");
        }}
        classNames={base}
        items={[
          { key: "", label: "Any status" },
          ...STATUS_OPTIONS.map((s) => ({ key: s.value, label: s.label })),
        ]}
      >
        {(s) => (
          <SelectItem key={s.key} textValue={s.label}>
            {s.label}
          </SelectItem>
        )}
      </Select>
    </div>
  );
}

export interface PropertiesFilterBarProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  locationOptions: string[];
}

export function PropertiesFilterBar({
  filters,
  onFiltersChange,
  locationOptions,
}: PropertiesFilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const hasActiveFilters =
    !!filters.location ||
    !!filters.status ||
    !!filters.minBeds ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  return (
    <div className="border-b border-soft-divider-line bg-secondary-background/40">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <Button
            radius="none"
            className="h-11 flex-1 font-medium bg-secondary-background text-main-text-headlines border border-soft-divider-line hover:border-primary-gold/40"
            startContent={<FaFilter className="h-3.5 w-3.5" />}
            onPress={() => setSheetOpen(true)}
          >
            {hasActiveFilters ? "Filters · Active" : "Filters"}
          </Button>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end lg:gap-4">
          <PropertyFilterSelects
            filters={filters}
            onFiltersChange={onFiltersChange}
            locationOptions={locationOptions}
            variant="desktop"
            wrapperClassName="contents"
          />
          <Button
            radius="none"
            className="h-11 w-full shrink-0 font-medium lg:w-auto bg-primary-gold text-main-background hover:bg-soft-gold-hover-state"
            startContent={<FaFilter className="h-3.5 w-3.5" />}
            onPress={() => {
              if (hasActiveFilters) {
                onFiltersChange({ ...DEFAULT_FILTERS });
              }
            }}
          >
            {hasActiveFilters ? "Clear filters" : "Apply filters"}
          </Button>
        </div>
      </div>

      <Drawer
        isOpen={sheetOpen}
        onOpenChange={setSheetOpen}
        placement="bottom"
        scrollBehavior="inside"
        size="5xl"
        classNames={{
          base: "rounded-t-xl border-t border-soft-divider-line bg-secondary-background sm:rounded-t-2xl",
        }}
      >
        <DrawerContent className="max-h-[min(90dvh,640px)] bg-secondary-background">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-0.5 border-b border-soft-divider-line pb-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-labels">
                  Refine results
                </span>
                <span className="text-lg font-medium text-main-text-headlines">
                  Filter properties
                </span>
              </DrawerHeader>
              <DrawerBody className="gap-4 py-4">
                <PropertyFilterSelects
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  locationOptions={locationOptions}
                  variant="sheet"
                  wrapperClassName="flex flex-col gap-4"
                />
                <Button
                  radius="none"
                  variant="bordered"
                  className="h-11 w-full border-soft-divider-line text-main-text-headlines"
                  isDisabled={!hasActiveFilters}
                  onPress={() => onFiltersChange({ ...DEFAULT_FILTERS })}
                >
                  Clear all filters
                </Button>
              </DrawerBody>
              <DrawerFooter className="border-t border-soft-divider-line pt-2">
                <Button
                  radius="none"
                  className="h-11 w-full bg-primary-gold font-medium text-main-background hover:bg-soft-gold-hover-state"
                  onPress={onClose}
                >
                  Show results
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
