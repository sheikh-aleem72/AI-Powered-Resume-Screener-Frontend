import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import NotFoundPage from "../../pages/NotFoundPage";
import AppLayout from "../layouts/AppLayout";
import { SignupPage } from "../../pages/auth/SignUpPage";
import { VerifyOtpPage } from "../../pages/auth/VerifyOtpPage";
import HomePage from "../../pages/Home/HomePage";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { SignInPage } from "../../pages/auth/SignInPage";
import { ForgetPasswordPage } from "../../pages/auth/ForgetPasswordPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/auth/signup", element: <SignupPage /> },
      { path: "/auth/verify", element: <VerifyOtpPage /> },
      { path: "/auth/signin", element: <SignInPage /> },
      { path: "/auth/forgot-password", element: <ForgetPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [{ path: "/home", element: <HomePage /> }],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
