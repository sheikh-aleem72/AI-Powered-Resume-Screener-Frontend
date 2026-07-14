import type { ReactNode } from "react";

interface GuideSectionProps {
  id: string;
  step: number;
  title: string;
  description: string;
  children: ReactNode;
}

export const GuideSection = ({
  id,
  step,
  title,
  description,
  children,
}: GuideSectionProps) => {
  return (
    <section className="" id={id}>
      <div className="mx-auto max-w-3xl text-center">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-action-primary/20
            bg-action-primary/10
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-action-primary
          "
        >
          Step {step}
        </span>

        <h2 className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-text-secondary">
          {description}
        </p>
      </div>

      <div className="mx-auto mt-4 max-w-5xl">{children}</div>
    </section>
  );
};
