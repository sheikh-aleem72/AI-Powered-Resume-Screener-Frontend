import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/logo-icon.png";
import { tokenUtils } from "../../utils/tokenUtils";

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

      <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
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
          to="/activity"
          label="Activity"
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
                d="M2 10h3l2-6 4 12 2-6h5"
              />
            </svg>
          }
        />

        {/* Divider before secondary section */}
        <div className="h-px bg-border mx-1 my-2" />

        <p className="px-3 pb-1 text-xs font-medium text-text-primary uppercase tracking-widest">
          Account
        </p>

        <NavItem
          to="/settings"
          label="Settings"
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
                d="M11.983 3.25a2 2 0 00-3.966 0A7.003 7.003 0 004.75 5.268a2 2 0 00-1.983 3.44 7.003 7.003 0 000 2.584 2 2 0 001.983 3.44 7.003 7.003 0 003.267 2.018 2 2 0 003.966 0 7.003 7.003 0 003.267-2.018 2 2 0 001.983-3.44 7.003 7.003 0 000-2.584 2 2 0 00-1.983-3.44A7.003 7.003 0 0011.983 3.25z"
              />
              <circle
                cx="10"
                cy="10"
                r="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
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

          {/* Chevron hint */}
          <svg
            className="w-3.5 h-3.5 text-text-muted group-hover:text-foreground transition-colors shrink-0"
            fill="none"
            viewBox="0 0 16 16"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4l4 4-4 4"
            />
          </svg>
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
