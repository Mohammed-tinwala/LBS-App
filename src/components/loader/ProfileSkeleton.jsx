import React from "react";

const ProfilePageSkeleton = () => {
    return (
        <div className="min-h-screen w-full bg-white animate-pulse">

            {/* Header */}
            <div className="h-16 bg-gray-200 w-full"></div>

            <div className="container-padding py-6 space-y-6">

                {/* Profile Section */}
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-300 rounded-2xl"></div>

                    <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-24 bg-gray-200 rounded-2xl"
                        ></div>
                    ))}
                </div>

                {/* Personal Info Section */}
                <div className="space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-1/4"></div>

                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>

                {/* Payment Info Section */}
                <div className="space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-1/4"></div>

                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-1/4"></div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-20 bg-gray-200 rounded-xl"
                            ></div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePageSkeleton;