import React from "react";

const AppLoader = ({ text = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">

            {/* Logo / App Identity */}
            <div className="flex flex-col items-center gap-4">

                {/* Animated Circle */}
                <div className="relative w-16 h-16">

                    <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>

                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>

                </div>

                {/* App Name / Text */}
                <h2 className="text-lg font-semibold text-gray-800">
                    LBS School
                </h2>

                {/* Loading Text */}
                <p className="text-sm text-gray-400 animate-pulse">
                    {text}
                </p>

            </div>

        </div>
    );
};

export default AppLoader;