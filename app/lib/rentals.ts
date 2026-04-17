import type { Property } from "@/types/firestore";
import {
  filterProperties,
  parsePriceToNumber,
  type PropertyFilters,
} from "./properties";

/** Rental-specific filters (extends PropertyFilters with furnishment and type). */
export interface RentalFilters extends PropertyFilters {
  furnishment: string;
  propertyType: string;
}

export const DEFAULT_RENTAL_FILTERS: RentalFilters = {
  location: "",
  status: "",
  minBeds: "",
  minPrice: "",
  maxPrice: "",
  furnishment: "",
  propertyType: "",
};

/** Filter rentals by location, price, beds, status, furnishment, and property type. */
export function filterRentals(
  properties: Property[],
  filters: RentalFilters
): Property[] {
  const baseFiltered = filterProperties(properties, filters);

  return baseFiltered.filter((p) => {
    if (filters.furnishment) {
      const features = (p.features ?? []).map((f) => f.toLowerCase());
      const furnishmentLower = filters.furnishment.toLowerCase();
      const hasMatch = features.some(
        (f) =>
          f.includes("furnished") &&
          (furnishmentLower === "furnished" ? f.includes("un") === false : f.includes("un"))
      );
      if (furnishmentLower === "furnished" && !features.some((f) => f.includes("furnished") && !f.includes("unfurnished"))) return false;
      if (furnishmentLower === "unfurnished" && !features.some((f) => f.includes("unfurnished") || (f.includes("un") && f.includes("furnish")))) return false;
      if (furnishmentLower === "furnished" && !features.some((f) => f === "furnished" || (f.includes("furnish") && !f.startsWith("un")))) return false;
      if (furnishmentLower === "unfurnished" && !features.some((f) => f.includes("unfurnished") || f === "unfurnished")) return false;
    }
    if (filters.propertyType) {
      const search = filters.propertyType.toLowerCase();
      const title = (p.title ?? "").toLowerCase();
      const features = (p.features ?? []).map((f) => f.toLowerCase());
      const location = (p.location ?? "").toLowerCase();
      const hasMatch =
        title.includes(search) ||
        features.some((f) => f.includes(search)) ||
        location.includes(search);
      if (!hasMatch) return false;
    }
    return true;
  });
}
