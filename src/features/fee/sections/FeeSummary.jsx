const FeeSummary = () => {
    const total = 45000;
    const paid = 30000;
    const due = total - paid;

    const paidPercent = (paid / total) * 100;
    const duePercent = 100 - paidPercent;

    return (
        <div className="container-padding">

            {/* Top Stats */}
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

            {/* Progress Bar */}
            <div className="mt-4">

                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden flex">

                    <div
                        className="h-full bg-green-500"
                        style={{ width: `${paidPercent}%` }}
                    />

                    <div
                        className="h-full bg-red-500"
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