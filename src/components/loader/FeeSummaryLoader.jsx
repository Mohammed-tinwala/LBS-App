import React from "react";

const FeeSummaryLoader = () => {
    return (
        <div className="container-padding animate-pulse">

            {/* Header Skeleton */}
            <div className="mb-4">
                <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
            </div>

            {/* Card Skeleton */}
            <div className="bg-white shadow-sm rounded-2xl p-4 border border-gray-100">

                {/* Top Row */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-5 w-24 bg-gray-300 rounded"></div>
                    </div>

                    <div className="text-right">
                        <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-5 w-20 bg-gray-300 rounded"></div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">

                    <div>
                        <div className="h-3 w-12 bg-gray-200 rounded mx-auto mb-2"></div>
                        <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
                    </div>

                    <div>
                        <div className="h-3 w-12 bg-gray-200 rounded mx-auto mb-2"></div>
                        <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
                    </div>

                    <div>
                        <div className="h-3 w-12 bg-gray-200 rounded mx-auto mb-2"></div>
                        <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
                    </div>

                </div>

                {/* Progress Skeleton */}
                <div className="mt-5">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gray-300 rounded-full"></div>
                    </div>

                    <div className="flex justify-between mt-2">
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default FeeSummaryLoader;