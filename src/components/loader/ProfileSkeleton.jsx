import React from "react";

const ProfileSkeleton = () => {
    return (
        <div className="container-padding animate-pulse">

            <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-2xl"></div>

                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;