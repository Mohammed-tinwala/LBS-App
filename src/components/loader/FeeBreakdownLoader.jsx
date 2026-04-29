import React from "react";

const FeeBreakdownLoader = () => {
    return (
        <div className="container-padding animate-pulse">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-40 bg-gray-300 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>

            {/* Card */}
            <div className="bg-gray-100 p-4 flex flex-col gap-2 rounded-2xl">

                {[1, 2, 3, 4].map((_, index) => (
                    <div
                        key={index}
                        className="w-full flex items-center justify-between p-2 bg-white rounded-md"
                    >

                        {/* Left */}
                        <div className="flex items-center gap-2">

                            {/* Icon Skeleton */}
                            <div className="p-2 bg-gray-200 rounded-md">
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                            </div>

                            {/* Text Skeleton */}
                            <div className="h-4 w-40 bg-gray-300 rounded"></div>
                        </div>

                        {/* Right Arrow */}
                        <div className="w-5 h-5 bg-gray-300 rounded"></div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default FeeBreakdownLoader;