import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

export const SummaryCard = ({
  title,
  value,
  icon: Icon,
  description,
}: SummaryCardProps) => {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-border-default
      bg-bg-secondary
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-action-primary/30
      hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]
    "
    >
      {/* Glow */}
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-action-primary/5 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col items-start">
        <div
          className="
          mb-6
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-action-primary/10
          text-action-primary
          transition-colors
          duration-300
          group-hover:bg-action-primary
          group-hover:text-white
        "
        >
          <Icon className="h-7 w-7" />
        </div>

        <p className="text-sm font-medium text-text-secondary">{title}</p>

        <h3 className="mt-2 text-5xl font-bold tracking-tight text-text-primary">
          {value}
        </h3>

        {description && (
          <p className="mt-4 text-sm leading-6 text-text-secondary">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
