export interface StatisticItemProps {
  value: string;
  label: string;
  className?: string;
}

export function StatisticItem({ value, label, className = "" }: StatisticItemProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="font-heading text-heading-h2 font-bold text-primary-gold">
        {value}
      </div>
      <div className="mt-2 text-body text-secondary-text-body-paragraphs">
        {label}
      </div>
    </div>
  );
}
