interface SectionHeaderProps {
  step?: number;
  eyebrow: string;
  title: string;
  description: string;
}
export const SectionHeader = ({
  step,
  eyebrow,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div>
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-[0.2em]
          text-action-primary
        "
      >
        {eyebrow}
      </p>

      <div className="mt-2 flex items-center gap-4">
        {step && (
          <div
            className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-action-primary/10
        text-base
        font-bold
        text-action-primary
      "
          >
            {step}
          </div>
        )}

        <h2 className="text-4xl font-bold text-text-primary">{title}</h2>
      </div>

      <p className="mt-2 text-text-secondary">{description}</p>
    </div>
  );
};
