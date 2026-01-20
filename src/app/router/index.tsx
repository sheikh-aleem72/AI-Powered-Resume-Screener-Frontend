import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import NotFoundPage from "../../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [],
  },
  {
    element: <AppLayout />,
    children: [],
  },
  { path: "*", element: <NotFoundPage /> },
]);
