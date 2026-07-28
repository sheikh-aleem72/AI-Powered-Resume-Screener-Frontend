import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/logo.png";
import { tokenUtils } from "../../features/auth/utils/tokenUtils";

// ---------------------------------------------------------------------------
// Sidebar
//
// Primary navigation shell for ClearHire.
// Structure:
//   • Logo / brand identity
//   • "New Job" quick-action CTA
//   • Main nav group (Home, Jobs, Activity)
//   • Secondary nav group (Settings)
//   • User profile block pinned to bottom
//
// Only /jobs is a live route — all others are placeholder hrefs.
// ---------------------------------------------------------------------------

export default function Sidebar() {
  const navigate = useNavigate();

  const user = tokenUtils.getUser();
  return (
    <aside className="w-64 shrink-0 bg-bg-primary flex flex-col h-full border-r border-border">
      {/* ------------------------------------------------------------------ */}
      {/* Logo                                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="h-14 flex items-center px-4 border-b border-border shrink-0 cursor-default"
        onClick={() => navigate("/home")}
      >
        <div className="flex items-center gap-2.5">
          <img
            className="h-8 w-8 rounded"
            src={logoIcon}
            alt="ClearHire logo"
          />
          <span className="text-base font-semibold tracking-wide text-text-primary">
            ClearHire
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* New Job CTA                                                         */}
      {/* Primary workflow entry — most users land on this sidebar to start  */}
      {/* a new screening job, so it deserves prominent placement.           */}
      {/* ------------------------------------------------------------------ */}

      <div className="px-3 pt-4 pb-2 shrink-0">
        <button
          onClick={() => navigate("/jobs/new")}
          className="
            w-full flex items-center justify-center gap-2
            px-3 py-2 rounded-lg
            bg-action-primary text-white
            text-sm font-semibold
            ring-1 ring-inset ring-white/10
            hover:bg-action-primary-hover
            transition-colors duration-150
          "
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          New Job
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main navigation                                                     */}
      {/* ------------------------------------------------------------------ */}

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {/* Section label */}
        <p className="px-3 pt-2 pb-1 text-xs font-medium text-text-primary uppercase tracking-widest ">
          Menu
        </p>

        <NavItem
          to="/home"
          label="Home"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 18v-6h4v6"
              />
            </svg>
          }
        />

        <NavItem
          to="/jobs"
          label="Jobs"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 4a2 2 0 012-2h2a2 2 0 012 2v1h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h3V4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h4M8 13h2"
              />
            </svg>
          }
        />

        <NavItem
          to="/guide"
          label="Guide"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4H10v16H4.5A2.5 2.5 0 0 0 2 22z" />
              <path d="M22 6.5A2.5 2.5 0 0 0 19.5 4H14v16h5.5A2.5 2.5 0 0 1 22 22z" />
            </svg>
          }
        />

        <NavItem
          to="/contact"
          label="Contact Us"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
          }
        />
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* User profile footer                                                 */}
      {/* Pinned to bottom — gives users a persistent identity anchor and    */}
      {/* a logical home for logout / account actions.                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="shrink-0 border-t border-border px-3 py-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors group">
          {/* Avatar initials circle */}
          <div className="w-8 h-8 rounded-full bg-action-primary/15 flex items-center justify-center shrink-0">
            <span className="text-xl font-semibold text-action-primary">
              {user?.name[0]?.toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary truncate">
              {user?.name?.toLocaleUpperCase()}
            </p>
            <p className="text-xs text-text-muted truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// NavItem
//
// A single navigation link with icon + label.
// Active state: left accent bar + primary text + subtle background tint.
// Inactive state: muted text, hover lifts to foreground.
// ---------------------------------------------------------------------------

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

function NavItem({ to, label, icon }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
          isActive
            ? "bg-action-primary/10 text-action-primary"
            : "text-text-primary hover:bg-muted/50 hover:text-text-secondary",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {/* Left accent bar for active state */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-action-primary" />
          )}
          <span className="shrink-0">{icon}</span>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}
