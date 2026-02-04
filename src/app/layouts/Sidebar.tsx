import { NavLink } from "react-router-dom";
import logoIcon from "../../assets/logo-icon.png";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0  bg-bg-primary">
      <div className="flex h-full flex-col">
        {/* Logo / Product Identity */}
        <div className="h-14 flex items-center justify-start px-4 border-b border-border">
          <div className="flex items-center gap-2">
            {/* Logo placeholder */}

            <img
              className="rounded h-10 bg-primary/20 flex items-center justify-center text-primary font-bold"
              src={logoIcon}
            />

            <span className="text-xl font-semibold tracking-wide text-text-primary">
              ClearHire
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 text-text-primary">
          <NavItem to="/home" label="Jobs" />
        </nav>

        {/* Bottom spacer (intentional empty area) */}
        <div className="h-4" />
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  label: string;
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center rounded-md px-3 py-2 text-md font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted hover:bg-muted/50 hover:text-foreground",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}
