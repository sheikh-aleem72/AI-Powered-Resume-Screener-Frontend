import { Link } from "react-router-dom";
import logoIcon from "../../../assets/logo.png";
import { MarketingButton } from "./MarketingButton";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#benefits", label: "Benefits" },
  { href: "#faq", label: "FAQ" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg-primary/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
          aria-label="ClearHire home"
        >
          <img className="h-8 w-8 rounded" src={logoIcon} alt="" />
          <span className="text-base font-semibold text-text-primary">
            ClearHire
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-secondary transition hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth/signin"
            className="hidden text-sm font-medium text-text-secondary transition hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary sm:inline-flex"
          >
            Sign in
          </Link>
          <MarketingButton to="/auth/signup" className="px-4">
            Get started
          </MarketingButton>
        </div>
      </div>
    </header>
  );
}
