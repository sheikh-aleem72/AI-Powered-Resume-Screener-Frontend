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
import { JobsPage } from "../../pages/jobs/JobsPage";
import { JobDetailPage } from "../../pages/jobs/JobDetailPage";
import { ResumeDetailPage } from "../../pages/resume/ResumeDetailPage";

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
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/jobs", element: <JobsPage /> },
          { path: "/jobs/:jobId", element: <JobDetailPage /> },
          {
            path: "/jobs/:jobId/resumes/:resumeId",
            element: <ResumeDetailPage />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
