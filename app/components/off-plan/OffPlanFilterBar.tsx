import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { FaFilter } from "react-icons/fa";
import {
  DEFAULT_OFF_PLAN_FILTERS,
  OFF_PLAN_PRICE_RANGES,
  type OffPlanFilters,
  offPlanHasActiveFilters,
  offPlanPriceRangeKey,
} from "@/lib/off-plan";

const BED_OPTIONS = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "beds-desc", label: "Most bedrooms" },
];

const selectClassNamesDesktop = {
  trigger:
    "h-11 w-full min-w-0 bg-secondary-background border border-soft-divider-line shadow-sm data-[hover=true]:border-primary-gold/30 transition-colors sm:min-w-[140px]",
  value: "text-main-text-headlines text-body",
  label: "text-muted-labels text-body",
};

const selectClassNamesSheet = {
  trigger:
    "h-11 w-full min-w-0 bg-main-background border border-soft-divider-line shadow-sm data-[hover=true]:border-primary-gold/30 transition-colors",
  value: "text-main-text-headlines text-body",
  label: "text-muted-labels text-body",
};

const inputClassNames = {
  input: "text-main-text-headlines text-body",
  inputWrapper:
    "h-11 bg-secondary-background border border-soft-divider-line shadow-sm data-[hover=true]:border-primary-gold/30",
};

const inputClassNamesSheet = {
  input: "text-main-text-headlines text-body",
  inputWrapper:
    "h-11 bg-main-background border border-soft-divider-line shadow-sm data-[hover=true]:border-primary-gold/30",
};

function OffPlanFilterFields({
  filters,
  onFiltersChange,
  locationOptions,
  apartmentTypeOptions,
  statusOptions,
  variant,
  stack,
}: {
  filters: OffPlanFilters;
  onFiltersChange: (f: OffPlanFilters) => void;
  locationOptions: string[];
  apartmentTypeOptions: string[];
  statusOptions: string[];
  variant: "desktop" | "sheet";
  stack: boolean;
}) {
  const priceRange = offPlanPriceRangeKey(filters);
  const base =
    variant === "sheet" ? selectClassNamesSheet : selectClassNamesDesktop;
  const inputClasses =
    variant === "sheet" ? inputClassNamesSheet : inputClassNames;

  function patch(partial: Partial<OffPlanFilters>) {
    onFiltersChange({ ...filters, ...partial });
  }

  const priceSelectClassNames =
    variant === "sheet"
      ? base
      : {
          ...base,
          trigger: `${base.trigger} sm:min-w-[160px]`,
        };

  const inner = (
    <>
      <Input
        aria-label="Search off-plan deals"
        placeholder="Search title, area, developer…"
        value={filters.q}
        onValueChange={(q) => patch({ q })}
        classNames={inputClasses}
        className={stack ? "w-full" : "min-w-[200px] flex-[1_1_260px]"}
      />

      <Select
        aria-label="Location"
        placeholder="Location"
        labelPlacement="outside"
        selectedKeys={filters.location ? [filters.location] : []}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          patch({ location: v ?? "" });
        }}
        classNames={base}
        className={stack ? "w-full" : "min-w-[130px] flex-[1_1_150px]"}
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

      {apartmentTypeOptions.length > 0 && (
        <Select
          aria-label="Apartment type"
          placeholder="Apartment type"
          labelPlacement="outside"
          selectedKeys={filters.apartmentType ? [filters.apartmentType] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            patch({ apartmentType: v ?? "" });
          }}
          classNames={base}
          className={stack ? "w-full" : "min-w-[130px] flex-[1_1_160px]"}
          items={[
            { key: "", label: "Any type" },
            ...apartmentTypeOptions.map((t) => ({ key: t, label: t })),
          ]}
        >
          {(item) => (
            <SelectItem key={item.key} textValue={item.label}>
              {item.label}
            </SelectItem>
          )}
        </Select>
      )}

      {/* <Select
        aria-label="Bedrooms"
        placeholder="Bedrooms"
        labelPlacement="outside"
        selectedKeys={filters.minBeds ? [filters.minBeds] : []}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          patch({ minBeds: v ?? "" });
        }}
        classNames={base}
        className={stack ? "w-full" : "min-w-[120px] flex-[0_1_120px]"}
        items={BED_OPTIONS.map((b) => ({ ...b, key: b.value }))}
      >
        {(b) => (
          <SelectItem key={b.key} textValue={b.label}>
            {b.label}
          </SelectItem>
        )}
      </Select> */}

      <Select
        aria-label="Status"
        placeholder="Status"
        labelPlacement="outside"
        selectedKeys={filters.status ? [filters.status] : []}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          patch({ status: v ?? "" });
        }}
        classNames={base}
        className={stack ? "w-full" : "min-w-[130px] flex-[1_1_140px]"}
        items={[
          { key: "", label: "Any status" },
          ...statusOptions.map((s) => ({ key: s, label: s })),
        ]}
      >
        {(item) => (
          <SelectItem key={item.key} textValue={item.label}>
            {item.label}
          </SelectItem>
        )}
      </Select>

      {/* <Select
        aria-label="Price range"
        placeholder="Price range"
        labelPlacement="outside"
        selectedKeys={priceRange ? [priceRange] : []}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          const range = OFF_PLAN_PRICE_RANGES.find((r) => r.value === v);
          if (range) {
            onFiltersChange({
              ...filters,
              minPrice: range.min ?? "",
              maxPrice: range.max ?? "",
            });
          }
        }}
        classNames={priceSelectClassNames}
        className={stack ? "w-full" : "min-w-[140px] flex-[1_1_165px]"}
        items={OFF_PLAN_PRICE_RANGES.map((r) => ({ ...r, key: r.value }))}
      >
        {(r) => (
          <SelectItem key={r.key} textValue={r.label}>
            {r.label}
          </SelectItem>
        )}
      </Select> */}

      <Select
        aria-label="Sort by"
        placeholder="Sort by"
        labelPlacement="outside"
        selectedKeys={[filters.sort || "featured"]}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          patch({ sort: v ?? "featured" });
        }}
        classNames={base}
        className={stack ? "w-full" : "min-w-[150px] flex-[1_1_170px]"}
        items={SORT_OPTIONS.map((s) => ({ ...s, key: s.value }))}
      >
        {(s) => (
          <SelectItem key={s.key} textValue={s.label}>
            {s.label}
          </SelectItem>
        )}
      </Select>
    </>
  );

  if (stack) {
    return <div className="flex flex-col gap-4">{inner}</div>;
  }
  return inner;
}

export interface OffPlanFilterBarProps {
  filters: OffPlanFilters;
  onFiltersChange: (f: OffPlanFilters) => void;
  locationOptions: string[];
  apartmentTypeOptions: string[];
  statusOptions: string[];
}

export function OffPlanFilterBar({
  filters,
  onFiltersChange,
  locationOptions,
  apartmentTypeOptions,
  statusOptions,
}: OffPlanFilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const active = offPlanHasActiveFilters(filters);

  return (
    <div className="border-y border-soft-divider-line bg-main-background py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <Button
            radius="none"
            className="h-11 w-full font-medium border border-soft-divider-line bg-secondary-background text-main-text-headlines hover:border-primary-gold/40"
            startContent={<FaFilter className="h-3.5 w-3.5" />}
            onPress={() => setSheetOpen(true)}
          >
            {active ? "Filters · Active" : "Filters"}
          </Button>
        </div>

        <div className="hidden lg:flex lg:flex-wrap lg:items-end lg:gap-3">
          <OffPlanFilterFields
            filters={filters}
            onFiltersChange={onFiltersChange}
            locationOptions={locationOptions}
            apartmentTypeOptions={apartmentTypeOptions}
            statusOptions={statusOptions}
            variant="desktop"
            stack={false}
          />
          <Button
            radius="none"
            className="h-11 shrink-0 font-medium bg-primary-gold px-6 text-main-background hover:bg-soft-gold-hover-state"
            startContent={<FaFilter className="h-3.5 w-3.5" />}
            onPress={() => {
              if (active) onFiltersChange({ ...DEFAULT_OFF_PLAN_FILTERS });
            }}
          >
            {active ? "Clear filters" : "Apply filters"}
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
          base: "rounded-t-xl border-t border-soft-divider-line bg-main-background sm:rounded-t-2xl",
        }}
      >
        <DrawerContent className="max-h-[min(92dvh,720px)] bg-main-background">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-0.5 border-b border-soft-divider-line pb-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-labels">
                  Refine deals
                </span>
                <span className="text-lg font-medium text-main-text-headlines">
                  Filter off-plan listings
                </span>
              </DrawerHeader>
              <DrawerBody className="gap-0 py-4">
                <OffPlanFilterFields
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  locationOptions={locationOptions}
                  apartmentTypeOptions={apartmentTypeOptions}
                  statusOptions={statusOptions}
                  variant="sheet"
                  stack
                />
                <Button
                  radius="none"
                  variant="bordered"
                  className="mt-4 h-11 w-full border-soft-divider-line text-main-text-headlines"
                  isDisabled={!active}
                  onPress={() =>
                    onFiltersChange({ ...DEFAULT_OFF_PLAN_FILTERS })
                  }
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
