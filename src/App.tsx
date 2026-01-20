import { RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryProvider } from "./app/providers/QueryProvider";
import { router } from "./app/router";
import { ErrorBoundary } from "./shared/ui/ErrorBoundary";
function App() {
  return (
    <>
      <QueryProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryProvider>
    </>
  );
}

export default App;
