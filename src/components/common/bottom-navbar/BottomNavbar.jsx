import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    CreditCard,
    MessageSquareText,
    User
} from "lucide-react";
import "./BottomNav.css";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { icon: Home, path: "/" },
        { icon: CreditCard, path: "/fee-detail" },
        { icon: MessageSquareText, path: "/products" },
        { icon: User, path: "/profile" }
    ];

    const positions = ["18%", "37%", "63%", "82%"];

    // 🔥 Keep active index in sync with URL
    const getActiveFromPath = (path) => {
        const index = items.findIndex((item) => item.path === path);
        return index === -1 ? 0 : index;
    };

    const [active, setActive] = useState(getActiveFromPath(location.pathname));

    // 🔥 Detect location change (Back/Forward/Navigation)
    useEffect(() => {
        setActive(getActiveFromPath(location.pathname));
    }, [location.pathname]);

    return (
        <div className="navigation bg-linear-to-t from-primary to-primary-dark">
            <div className="inner-navigation h-5 min-h-5 overflow-visible">
                <motion.div
                    animate={{ left: positions[active] }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="indicator bg-primary-dark w-16 h-16 flex items-center justify-center -translate-x-1/2 z-10"
                >

                    {(() => {
                        const ActiveIcon = items[active].icon;
                        return <ActiveIcon size={26} className="text-white" />;
                    })()}

                </motion.div>

                <div className="flex justify-between text-white relative z-20 px-7.5 mt-2">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActive(index);
                                navigate(item.path);
                            }}
                            className="w-1/4 flex items-center justify-center"
                        >
                            <motion.span
                                animate={{
                                    opacity: active === index ? 0 : 1,
                                    scale: active === index ? 0.8 : 1
                                }}
                                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                                className="w-6 h-6 flex items-center justify-center"
                            >
                                {(() => {
                                    const Icon = item.icon;
                                    return <Icon size={24} />;
                                })()}
                            </motion.span>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default BottomNav;
