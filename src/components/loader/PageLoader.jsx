import React from "react";

const PageLoader = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white">

            {/* Logo Glow */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/30 animate-ping absolute"></div>

                <div className="w-20 h-20 rounded-full bg-[radial-gradient(circle,#E3D1FB,#9768D9)] flex items-center justify-center">
                    <img src="/images/logo.webp" alt="logo" className="w-12 h-12" />
                </div>
            </div>

            {/* Text */}
            <p className="mt-6 text-sm text-label animate-pulse">
                Loading, please wait...
            </p>
        </div>
    );
};

export default PageLoader;