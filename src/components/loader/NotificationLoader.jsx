import React from "react";

const NotificationLoader = () => {
    return (
        <div className="flex flex-col gap-4 pb-12 pt-4 bg-white animate-pulse">

            {/* Header Skeleton */}
            <div className="px-4">
                <div className="h-5 w-40 bg-gray-300 rounded"></div>
            </div>

            <div className="mt-2 space-y-6 container-padding">

                {/* Repeat Sections */}
                {[1, 2].map((_, sectionIndex) => (
                    <div key={sectionIndex}>

                        {/* Section Title */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-4 w-20 bg-gray-300 rounded"></div>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Items */}
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 items-start">

                                    {/* Icon Skeleton */}
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

                                    {/* Content */}
                                    <div className="flex-1">

                                        <div className="flex justify-between items-start">
                                            <div className="h-4 w-40 bg-gray-300 rounded"></div>
                                            <div className="h-3 w-12 bg-gray-200 rounded"></div>
                                        </div>

                                        <div className="h-3 w-60 bg-gray-200 rounded mt-2"></div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default NotificationLoader;