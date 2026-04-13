import { ChevronLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, color }) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/notifications");
  }

  return (
    <div className="flex items-center justify-between container-padding">
      <div className="flex items-center gap-2">
        <button
          className="relative w-10 h-10 rounded-full bg-white border border-gray-400 flex-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={22} />
        </button>

        <h2 className={`text-md ${color === "white" ? "text-white" : "text-black"}`}>{title}</h2>
      </div>

      <button onClick={handleNotificationClick} className="relative w-12 h-12 rounded-full bg-white border border-gray-400 flex-center">
        <Bell size={24} />
        <span className="absolute -top-1 right-0 w-5 h-5 text-[12px] text-white bg-red-500 rounded-full">2</span>
      </button>

    </div>
  );
};

export default PageHeader;