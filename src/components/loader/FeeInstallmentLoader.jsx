import React from "react";

const FeeInstallmentLoader = () => {
    return (
        <div className="container-padding animate-pulse">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-48 bg-gray-300 rounded"></div>
            </div>

            {/* Installment List Skeleton */}
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">

                    {/* Left Circle */}
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>

                    {/* Card */}
                    <div className="flex-1 flex items-center justify-between px-4 py-4 rounded-2xl bg-gray-100">

                        {/* Left Content */}
                        <div className="flex flex-col gap-2">
                            <div className="h-3 w-28 bg-gray-300 rounded"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded"></div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                        </div>

                        {/* Badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-300">
                            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                            <div className="h-3 w-12 bg-gray-200 rounded"></div>
                        </div>

                    </div>
                </div>
            ))}

            {/* Bottom Alert Skeleton */}
            <div className="flex items-center gap-3 bg-gray-200 rounded-2xl px-4 py-4 mt-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
            </div>

        </div>
    );
};

export default FeeInstallmentLoader;