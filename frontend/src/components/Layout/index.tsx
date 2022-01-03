import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="px-10 pt-10 pb-5 ml-64 flex flex-col w-full">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
