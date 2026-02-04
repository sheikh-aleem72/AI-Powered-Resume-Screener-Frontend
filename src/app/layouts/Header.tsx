import { useNavigate } from "react-router-dom";
import { tokenUtils } from "../../utils/tokenUtils";

export default function Header() {
  const navigate = useNavigate();
  const user = tokenUtils.getUser();

  const handleLogout = () => {
    tokenUtils.clearAuth();
    navigate("/auth/signin", { replace: true });
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-bg-secondary border-b ">
      {/* Left: intentionally empty for now (page context later) */}
      <div />

      {/* Right: user actions */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-text-secondary">{user.email}</span>
        )}
        <button
          onClick={handleLogout}
          className="text-md text-text-muted hover:text-text-primary cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
