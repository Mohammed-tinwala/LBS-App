import { Outlet } from "react-router-dom";
import BottomNavbar from "../components/common/bottom-navbar/BottomNavbar";

const MainLayout = () => {
  return (
    <div className="h-full flex flex-col">

      {/* Content should NOT control scroll */}
      <div className="flex-1 overflow-visible pb-24">
        <Outlet />
      </div>

      {/* ✅ Fixed Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-[9999]">
        <BottomNavbar />
      </div>

    </div>
  );
};

export default MainLayout;