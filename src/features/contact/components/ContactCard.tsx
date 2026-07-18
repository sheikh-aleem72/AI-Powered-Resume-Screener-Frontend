import { ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface ContactCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  value: string;
  href: string;
  action: string;
  featured?: boolean;
}

export const ContactCard = ({
  icon: Icon,
  title,
  description,
  value,
  href,
  action,
  featured = false,
}: ContactCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
            group
            flex
            h-full
            flex-col
            rounded-3xl
            border
            p-7
            transition-all
            duration-300
            hover:-translate-y-1

            ${
              featured
                ? "border-action-primary/40 bg-bg-secondary shadow-lg shadow-action-primary/10"
                : "border-border-default bg-bg-secondary hover:border-action-primary/30"
            }
            `}
    >
      {/* Icon */}

      <div
        className={`
          inline-flex
          w-fit
          rounded-2xl
          transition-colors

          ${featured ? "bg-action-primary/15 p-5" : "bg-action-primary/10 p-4"}
        `}
      >
        <Icon className="h-6 w-6 text-action-primary" />
      </div>

      {/* Content */}

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>

        <p className="mt-2 leading-7 text-text-secondary">{description}</p>

        <p className="mt-5 break-all font-medium text-action-primary transition-colors group-hover:text-action-primary-hover">
          {value}
        </p>
      </div>

      {/* CTA */}

      <div
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          font-semibold
          text-text-primary
          transition-colors
          duration-200
          group-hover:text-action-primary
        "
      >
        {action}

        <ArrowUpRight
          className="
            h-4
            w-4
            transition-transform
            duration-200
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />
      </div>
    </a>
  );
};
