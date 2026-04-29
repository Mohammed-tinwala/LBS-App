import React from "react";
import FeeSummaryLoader from "../../../components/loader/FeeSummaryLoader";

const FeeSummary = ({ feeDetails, loading }) => {

    if (loading) {
        return <FeeSummaryLoader />;
    }

    if (!feeDetails) {
        return (
            <div className="container-padding">
                <p className="text-sm text-gray-400">No fee data available</p>
            </div>
        );
    }

    const total = feeDetails.totalAmount || 0;
    const paid = feeDetails.totalPaid || 0;
    const due = feeDetails.remainingFee || 0;

    const discount = feeDetails.sessions?.reduce(
        (sum, s) => sum + (s.lessAmount || 0),
        0
    ) || 0;

    const finalPayable = total - discount;

    const paidPercent = finalPayable > 0 ? (paid / finalPayable) * 100 : 0;
    const duePercent = 100 - paidPercent;

    return (
        <div className="container-padding">

            {/* 🏫 Header */}
            <div className="mb-4">
                <h2 className="text-base font-semibold text-black">
                    {feeDetails.school}
                </h2>
                <p className="text-xs text-gray-500">
                    Enrollment: {feeDetails.enrollment}
                </p>
            </div>

            {/* 💳 Card */}
            <div className="bg-primary/30 shadow-sm rounded-2xl p-4 border border-gray-100">

                {/* 🔼 Top Row: Total + Discount */}
                <div className="flex justify-between items-center mb-4">

                    <div>
                        <p className="text-xs text-gray-500">Total Fee</p>
                        <h2 className="text-lg font-bold text-black">
                            ₹ {total.toLocaleString()}
                        </h2>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-gray-500">Discount</p>
                        <h2 className="text-lg font-bold text-blue-500">
                            - ₹ {discount.toLocaleString()}
                        </h2>
                    </div>

                </div>

                {/* 🔽 Bottom Row: Final | Paid | Due */}
                <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">

                    <div>
                        <p className="text-xs text-gray-500">Final</p>
                        <h2 className="text-base font-semibold text-green-600">
                            ₹ {finalPayable.toLocaleString()}
                        </h2>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Paid</p>
                        <h2 className="text-base font-semibold text-green-500">
                            ₹ {paid.toLocaleString()}
                        </h2>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Due</p>
                        <h2 className="text-base font-semibold text-red-500">
                            ₹ {due.toLocaleString()}
                        </h2>
                    </div>

                </div>

                {/* 📊 Progress */}
                <div className="mt-5">

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">

                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${paidPercent}%` }}
                        />

                        <div
                            className="h-full bg-red-500 transition-all duration-500"
                            style={{ width: `${duePercent}%` }}
                        />

                    </div>

                    <div className="flex justify-between mt-2 text-xs">
                        <span className="text-green-500 font-medium">
                            {Math.round(paidPercent)}% Paid
                        </span>
                        <span className="text-red-500 font-medium">
                            {Math.round(duePercent)}% Due
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default FeeSummary;