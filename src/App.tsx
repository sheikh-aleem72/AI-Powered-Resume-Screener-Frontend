import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "./app/providers/QueryProvider";
import { router } from "./app/router";
import { ErrorBoundary } from "./shared/ui/ErrorBoundary";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <QueryProvider>
        <ErrorBoundary>
          <Toaster position="top-right" richColors theme="dark" closeButton />;
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryProvider>
    </>
  );
}

export default App;
