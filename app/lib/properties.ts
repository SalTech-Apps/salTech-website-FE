import type { Property } from "@/types/firestore";

/** Parse price string like "₦180,000,000" to number (180000000). Returns 0 if invalid. */
export function parsePriceToNumber(price: string): number {
  if (!price || typeof price !== "string") return 0;
  const digits = price.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

/** Format a price string as Naira (e.g. "₦180,000,000"). */
export function formatPriceNaira(price: string): string {
  const n = parsePriceToNumber(price);
  if (!Number.isFinite(n) || n < 0) return "₦0";
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export interface PropertyFilters {
  location: string;
  status: string;
  minBeds: string;
  minPrice: string;
  maxPrice: string;
}

export const DEFAULT_FILTERS: PropertyFilters = {
  location: "",
  status: "",
  minBeds: "",
  minPrice: "",
  maxPrice: "",
};

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  return properties.filter((p) => {
    if (filters.location && p.location !== filters.location) return false;
    if (filters.status && p.status !== filters.status) return false;
    const minBeds = filters.minBeds ? Number(filters.minBeds) : 0;
    if (minBeds > 0 && (p.beds ?? 0) < minBeds) return false;
    const price = parsePriceToNumber(p.price);
    const minPrice = filters.minPrice ? parsePriceToNumber(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice
      ? parsePriceToNumber(filters.maxPrice)
      : Infinity;
    if (minPrice > 0 && price < minPrice) return false;
    if (maxPrice !== Infinity && price > maxPrice) return false;
    return true;
  });
}

const PAGE_SIZE = 9;

export function paginateProperties(
  properties: Property[],
  page: number
): { items: Property[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(properties.length / PAGE_SIZE));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * PAGE_SIZE;
  const items = properties.slice(start, start + PAGE_SIZE);
  return { items, totalPages };
}

export { PAGE_SIZE };
