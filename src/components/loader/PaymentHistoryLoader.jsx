import React from "react";

const PaymentHistoryLoader = () => {
    return (
        <div className="container-padding animate-pulse">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-40 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Payment List Skeleton */}
            {[1, 2, 3, 4].map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded-xl mb-2"
                >

                    {/* Left Content */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-20 bg-gray-300 rounded"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                        <div className="h-3 w-28 bg-gray-200 rounded"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded"></div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col items-end gap-2">
                        <div className="h-3 w-10 bg-gray-300 rounded"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    </div>

                </div>
            ))}

        </div>
    );
};

export default PaymentHistoryLoader;