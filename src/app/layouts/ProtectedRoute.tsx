import { Navigate, Outlet } from "react-router-dom";
import { tokenUtils } from "../../utils/tokenUtils";

const ProtectedRoute = () => {
  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();

  const isAuthenticated = Boolean(accessToken && refreshToken);

  if (!isAuthenticated) {
    return <Navigate to="/auth/signup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
