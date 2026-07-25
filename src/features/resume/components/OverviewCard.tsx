import type { ComponentType, SVGProps } from "react";

interface OverviewCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  value: string;
  subtitle: string;
}

export const OverviewCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
}: OverviewCardProps) => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-6">
      <div className="inline-flex rounded-2xl bg-action-primary/10 p-4">
        <Icon className="h-6 w-6 text-action-primary" />
      </div>

      <p className="mt-6 text-sm font-medium text-text-secondary">{title}</p>

      <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>

      <p className="mt-3 text-sm text-text-secondary">{subtitle}</p>
    </div>
  );
};
