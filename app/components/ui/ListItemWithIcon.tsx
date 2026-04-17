import { type IconType } from "react-icons";

export interface ListItemWithIconProps {
  icon: IconType;
  children: React.ReactNode;
  className?: string;
}

export function ListItemWithIcon({
  icon: Icon,
  children,
  className = "",
}: ListItemWithIconProps) {
  return (
    <li className={`flex items-start gap-3 ${className}`}>
      <span className="mt-0.5 shrink-0 text-primary-gold" aria-hidden>
        <Icon className="text-xl" />
      </span>
      <span className="text-body text-main-text-headlines">{children}</span>
    </li>
  );
}
