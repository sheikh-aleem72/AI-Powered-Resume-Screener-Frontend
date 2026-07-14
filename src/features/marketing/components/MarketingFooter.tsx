import { Link } from "react-router-dom";
import logoIcon from "../../../assets/logo.png";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#benefits", label: "Benefits" },
  { href: "#faq", label: "FAQ" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
            aria-label="ClearHire home"
          >
            <img className="h-8 w-8 rounded" src={logoIcon} alt="" />
            <span className="text-base font-semibold text-text-primary">
              ClearHire
            </span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-text-muted">
            AI-powered resume screening for recruiters who need faster, clearer,
            and more consistent shortlists.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Footer">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-4">
            <Link
              to="/auth/signin"
              className="text-sm text-text-secondary transition hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              Sign in
            </Link>
            <Link
              to="/auth/signup"
              className="text-sm font-medium text-action-primary transition hover:text-action-primary-hover focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
