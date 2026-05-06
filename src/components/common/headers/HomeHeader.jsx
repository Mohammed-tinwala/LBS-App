import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNotification } from "../../../context/NotificationContext";

const HomeHeader = () => {
    const { student } = useAuth();
    const { unreadCount } = useNotification(); // ✅ dynamic count

    const navigate = useNavigate();

    const handleNotificationClick = () => {
        navigate('/notifications');
    };

    const formatName = (name) => {
        if (!name) return "";

        return name
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className="flex-between container-padding">

            {/* 👤 Profile Section */}
            <Link to="/profile" className="flex items-center gap-3">
                <div className="w-13.75 h-13.75 p-2 overflow-hidden rounded-full flex-center 
                                bg-[radial-gradient(circle,#E3D1FB,#9768D9)]">
                    <img src="/images/profile.webp" className="w-13.75 object-cover" alt="profile" />
                </div>

                <div>
                    <p className="text-[12px] text-label">Hello Welcome</p>
                    <h3 className="text-[18px] leading-tight font-semibold">
                        {formatName(student?.name) || "Student"}
                    </h3>
                </div>
            </Link>

            {/* 🔔 Notification Bell */}
            <button
                onClick={handleNotificationClick}
                className="relative w-12 h-12 rounded-full bg-white border border-gray-300 flex-center"
            >
                <Bell size={22} />

                {/* ✅ Dynamic Badge */}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-medium text-white bg-red-500 rounded-full">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

        </div>
    );
};

export default HomeHeader;