import { Link } from "react-router-dom";

type MarketingButtonProps = {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MarketingButton({
  to,
  children,
  variant = "primary",
  className = "",
}: MarketingButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary";

  const variants = {
    primary:
      "bg-action-primary text-white shadow-sm hover:bg-action-primary-hover",
    secondary:
      "border border-border-default bg-bg-secondary/70 text-text-primary hover:border-action-primary hover:text-white",
  };

  return (
    <Link to={to} className={[base, variants[variant], className].join(" ")}>
      {children}
    </Link>
  );
}
