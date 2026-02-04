import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto bg-bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
