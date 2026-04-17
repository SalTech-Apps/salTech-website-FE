import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaBed, FaBath, FaCar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export interface OffPlanCardProps {
  id: string;
  slug?: string;
  image: string;
  price: string;
  status: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  garages: number;
  completionDate?: string;
  onAddToWishlist?: () => void;
}

export function OffPlanCard({
  id,
  slug,
  image,
  price,
  status,
  title,
  location,
  beds,
  baths,
  garages,
  completionDate,
  onAddToWishlist,
}: OffPlanCardProps) {
  const detailPath = slug ? `/off-plan/${slug}` : `/off-plan/${id}`;
  return (
    <article className="overflow-hidden border border-soft-divider-line bg-secondary-background">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={detailPath} prefetch="intent">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Link>
        <div className="absolute left-3 top-3 font-heading text-heading-h3 text-main-text-headlines">
          {price}
        </div>
        <span className="absolute right-3 top-3 bg-primary-gold px-2 py-1 text-buttons text-main-background">
          {status}
        </span>
      </div>
      <div className="p-4 sm:p-6">
        <Link to={detailPath} prefetch="intent">
          <h3 className="font-heading text-heading-h3 text-main-text-headlines">
            {title}
          </h3>
        </Link>
        <p className="mt-1 text-body text-secondary-text-body-paragraphs">
          {location}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-body text-secondary-text-body-paragraphs">
          <span className="flex items-center gap-1.5">
            <FaBed className="h-4 w-4 text-muted-labels" />
            {beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath className="h-4 w-4 text-muted-labels" />
            {baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <FaCar className="h-4 w-4 text-muted-labels" />
            {garages} Garages
          </span>
          {completionDate && <span>Completion Date: {completionDate}</span>}
        </div>
        <Button
          radius="none"
          as={Link}
          to={detailPath}
          prefetch="intent"
          className="mt-6 w-full bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
        >
          VIEW PROPERTY
        </Button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onAddToWishlist?.();
          }}
          className="mt-3 flex w-full items-center justify-center gap-2 text-body text-muted-labels hover:text-primary-gold transition-colors"
        >
          <FaHeart className="h-4 w-4" />
          Add to Wishlist
        </button>
      </div>
    </article>
  );
}
