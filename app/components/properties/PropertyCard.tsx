import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { MdOutlineSquareFoot } from "react-icons/md";

export interface PropertyCardProps {
  id: string;
  /** URL slug for property detail (preferred over id for links). */
  slug?: string;
  image: string;
  title: string;
  location: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  sqm: number;
}

export function PropertyCard({
  id,
  slug,
  image,
  title,
  location,
  price,
  status,
  beds,
  baths,
  sqm,
}: PropertyCardProps) {
  const path = slug ?? id;
  return (
    <article className="overflow-hidden border border-soft-divider-line bg-secondary-background">
      <Link to={`/properties/${path}`} prefetch="intent" className="block">
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <span className="absolute right-3 top-3 bg-primary-gold px-2 py-1 text-buttons text-main-background">
            {status}
          </span>
        </div>
      </Link>
      <div className="p-4 sm:p-6">
        <Link to={`/properties/${path}`} prefetch="intent">
          <h3 className="font-heading text-heading-h3 text-main-text-headlines">
            {title}
          </h3>
        </Link>
        <p className="mt-1 text-body text-secondary-text-body-paragraphs">
          {location}
        </p>
        <p className="mt-2 font-heading text-heading-h3 text-primary-gold">
          {price}
        </p>
        <div className="mt-4 flex items-center gap-4 text-body text-secondary-text-body-paragraphs">
          <span className="flex items-center gap-1.5">
            <FaBed className="h-4 w-4 text-muted-labels" />
            {beds}
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath className="h-4 w-4 text-muted-labels" />
            {baths}
          </span>
          <span className="flex items-center gap-1.5">
            <MdOutlineSquareFoot className="h-4 w-4 text-muted-labels" />
            {sqm} m²
          </span>
        </div>
      </div>
    </article>
  );
}
