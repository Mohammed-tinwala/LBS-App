import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate("/login"); // or check auth here
    //     }, 2000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div className="h-screen flex-center flex-col safe-area">

            {/* Logo */}
            <img
                src="/images/logo.png"
                alt="LBS Logo"
                className="w-24 h-24 animate-fadeIn"
            />

            {/* App Name */}
            <h1
                className="mt-4 text-xl font-semibold animate-fadeIn"
                // style={{ animationDelay: "0.2s" }}
            >
                LBS Group
            </h1>

            {/* Tagline */}
            <p className="text-sm text-label mt-1 animate-fadeIn">
                Student & Parent Portal
            </p>

        </div>
    );
}