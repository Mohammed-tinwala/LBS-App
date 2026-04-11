import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const AttendanceSection = () => {
    const absentDates = [10, 13, 23, 26]; // 🔴 Absent days

    const days = [
        27, 28, 1, 2, 3, 4,
        5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28,
        29, 30, 31, 1, 2, 3
    ];

    return (
        <div>

            {/* Sub heading */}
                <div className="flex items-center justify-between w-full mb-4">
                    <h2 className="text-lg font-semibold">Attendance</h2>
                    <p className="text-xs font-normal">See more</p>
                </div>

            {/* Calendar Card */}
            <div className="bg-[#EDEAEA] rounded-[28px] p-5 shadow-sm">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        March <span className="text-2xl font-bold">2026</span>
                    </h2>

                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex-center rounded-full bg-white shadow">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-8 h-8 flex-center rounded-full bg-white shadow">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-7 gap-y-4 text-center">

                    {days.map((day, index) => {
                        const isInactive = index < 2 || index > 32;
                        const isAbsent = absentDates.includes(day) && !isInactive;

                        return (
                            <div key={index} className="flex justify-center">

                                <div
                                    className={`w-10 h-10 flex items-center justify-center text-sm rounded-full
                    ${isInactive ? "text-gray-400" : "text-black"}
                    ${isAbsent ? "bg-red-400 text-white font-semibold" : ""}
                  `}
                                >
                                    {day}
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Summary Card */}
            <div className="bg-primary text-white rounded-[28px] p-5 mt-4 shadow-sm">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Summary</h3>

                    <p className="text-xs text-[#d3d3d3] flex items-center gap-1">
                        <Clock size={16} />
                        Last 01 Months
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 text-center">

                    <div>
                        <h2 className="text-3xl font-bold">23</h2>
                        <p className="text-sm flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Present
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold">04</h2>
                        <p className="text-sm flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                            Absent
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold">12</h2>
                        <p className="text-sm flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            Late
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default AttendanceSection;