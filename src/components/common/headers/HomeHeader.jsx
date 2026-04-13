import { nav } from "framer-motion/client";
import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const HomeHeader = ({ name = "Rohan Sharma" }) => {

    const navigate = useNavigate();

    const handleNotificationClick = () => {
        // Handle notification click, e.g., navigate to notifications page
        // Example: navigate('/notifications');
        navigate('/notifications');
    }



    return (
        <div className="flex-between container-padding">

            <Link to="/profile" className="flex items-center gap-3">
                <div className="w-13.75 h-13.75 p-2 overflow-hidden rounded-full flex-center 
                                bg-[radial-gradient(circle,#E3D1FB,#9768D9)]">
                    <img src="/images/profile.webp" className="w-13.75 object-cover" alt="profile" />
                </div>

                <div>
                    <p className="text-[12px] text-label">Hello Welcome,</p>
                    <h3 className="text-[18px] font-semibold">{name}</h3>
                </div>
            </Link>

            <button onClick={handleNotificationClick} className="relative w-12 h-12 rounded-full bg-white border border-gray-400 flex-center">
                <Bell size={24} />
                <span className="absolute -top-1 right-0 w-5 h-5 text-[12px] text-white bg-red-500 rounded-full">2</span>
            </button>

        </div>
    );
};

export default HomeHeader;