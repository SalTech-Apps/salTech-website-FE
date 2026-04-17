import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { formatPriceNaira } from "@/lib/properties";

export interface RentalCardProps {
  id: string;
  /** URL slug for rental detail (preferred over id for links). */
  slug?: string;
  image: string;
  price: string;
  status: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqm: number;
  features: string[];
  /** WhatsApp link from site config. If not provided, uses default placeholder. */
  whatsappUrl?: string;
}

const DEFAULT_WHATSAPP_URL = "https://wa.me/2340000000000";

export function RentalCard({
  id,
  slug,
  image,
  price,
  status,
  title,
  location,
  beds,
  baths,
  sqm,
  features,
  whatsappUrl = DEFAULT_WHATSAPP_URL,
}: RentalCardProps) {
  const path = slug ?? id;
  const detailUrl = `/rentals/${path}`;

  return (
    <article className="overflow-hidden border border-soft-divider-line bg-secondary-background">
      <Link
        to={detailUrl}
        prefetch="intent"
        className="block relative aspect-4/3 overflow-hidden group"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <span className="text-heading-h3 font-heading text-primary-gold">
            {formatPriceNaira(price)}
          </span>
          <span className="bg-primary-gold px-2 py-1 text-buttons text-main-background">
            {status}
          </span>
        </div>
      </Link>
      <div className="p-4 sm:p-6">
        <Link to={detailUrl} prefetch="intent" className="group/title block">
          <h3 className="font-heading text-heading-h3 text-main-text-headlines group-hover/title:text-primary-gold transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-body text-secondary-text-body-paragraphs">
            {location}
          </p>
        </Link>
        <div className="mt-4 flex items-center gap-4 text-body text-secondary-text-body-paragraphs">
          <span className="flex items-center gap-1.5">
            <FaBed className="h-4 w-4 text-muted-labels" />
            {beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath className="h-4 w-4 text-muted-labels" />
            {baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <FaRulerCombined className="h-4 w-4 text-muted-labels" />
            {sqm}sqm
          </span>
        </div>
        <div className="mt-4">
          <p className="text-buttons text-main-text-headlines">Key Features</p>
          <ul className="mt-2 space-y-1 text-body text-secondary-text-body-paragraphs">
            {features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            radius="none"
            as={Link}
            to={detailUrl}
            prefetch="intent"
            className="w-full bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
          >
            BOOK VIEWING
          </Button>
          <Button
            radius="none"
            as={Link}
            to={`${detailUrl}#enquire`}
            prefetch="intent"
            variant="bordered"
            className="w-full border-primary-gold text-primary-gold bg-transparent font-body font-bold hover:bg-primary-gold/10 uppercase"
          >
            ENQUIRE ABOUT THE PROPERTY
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-body text-muted-labels hover:text-primary-gold transition-colors"
          >
            <IoLogoWhatsapp className="h-5 w-5" />
            WHATSAPP QUICK ENQUIRY
          </a>
        </div>
      </div>
    </article>
  );
}
