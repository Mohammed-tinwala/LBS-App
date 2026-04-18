import React from "react";

const FeeSummary = ({ feeDetails, loading }) => {
    console.log("Rendering FeeSummary with details:", feeDetails, "Loading:", loading);
    // ⏳ Loading State
    if (loading) {
        return (
            <div className="container-padding">
                <p className="text-sm text-gray-400">Loading fee details...</p>
            </div>
        );
    }

    // ⚠️ No Data State
    if (!feeDetails) {
        return (
            <div className="container-padding">
                <p className="text-sm text-gray-400">No fee data available</p>
            </div>
        );
    }

    // ✅ Extract Data
    const total = feeDetails.netPayable || 0;
    const paid = feeDetails.totalPaid || 0;
    const due = feeDetails.remainingFee || 0;

    // ✅ Safe Percent Calculation
    const paidPercent = total > 0 ? (paid / total) * 100 : 0;
    const duePercent = 100 - paidPercent;

    return (
        <div className="container-padding">

            {/* 🏫 School Name */}
            <div className="mb-4">
                <h2 className="text-base font-semibold text-black">
                    {feeDetails.school}
                </h2>
                <p className="text-xs text-gray-500">
                    {feeDetails.merchantName ? `${feeDetails.merchantName}` : "No payment gateway info"}
                </p>
            </div>

            {/* 💰 Top Stats */}
            <div className="grid grid-cols-3 gap-4 text-center sm:text-left">

                <div className="flex flex-col items-start">
                    <p className="text-label text-[12px]">Total Fees:</p>
                    <h2 className="text-lg font-bold text-green-500 mt-1">
                        ₹ {total.toLocaleString()}
                    </h2>
                </div>

                <div className="flex flex-col items-start">
                    <p className="text-label text-[12px]">Paid:</p>
                    <h2 className="text-lg font-bold text-green-500 mt-1">
                        ₹ {paid.toLocaleString()}
                    </h2>
                </div>

                <div className="flex flex-col items-start">
                    <p className="text-label text-[12px]">Due:</p>
                    <h2 className="text-lg font-bold text-red-500 mt-1">
                        ₹ {due.toLocaleString()}
                    </h2>
                </div>

            </div>

            {/* 📊 Progress Bar */}
            <div className="mt-4">

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">

                    {/* Paid */}
                    <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ width: `${paidPercent}%` }}
                    />

                    {/* Due */}
                    <div
                        className="h-full bg-red-500 transition-all duration-500"
                        style={{ width: `${duePercent}%` }}
                    />

                </div>

                <div className="flex justify-between mt-2 text-[12px]">
                    <span className="text-green-500 font-medium">
                        {Math.round(paidPercent)}% Paid
                    </span>
                    <span className="text-red-500 font-medium">
                        {Math.round(duePercent)}% Due
                    </span>
                </div>

            </div>

        </div>
    );
};

export default FeeSummary;