type SectionContainerProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabelledby?: string;
};

export function SectionContainer({
  id,
  children,
  className = "",
  ariaLabelledby,
}: SectionContainerProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={className}>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {children}
      </div>
    </section>
  );
}
