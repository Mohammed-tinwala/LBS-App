import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SplashScreen() {
    const navigate = useNavigate();

    const { student } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (student) {
                navigate("/home"); // or "/"
            } else {
                navigate("/login");
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [student, navigate]);

    return (
        <div className="min-h-screen flex-center flex-col safe-area">

            {/* Logo */}
            <img
                src="/images/logo.webp"
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