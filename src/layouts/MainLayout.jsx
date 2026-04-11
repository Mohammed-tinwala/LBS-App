import { Outlet } from "react-router-dom";
import BottomNavbar from "../components/common/bottom-navbar/BottomNavbar";


const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Page Content */}
      <div className="flex-1 pb-20 container-padding">
        <Outlet />
      </div>

      <div className="container-padding">
        {/* Bottom Navbar (FIXED) */}
        <BottomNavbar />
      </div>

    </div>
  );
};

export default MainLayout;