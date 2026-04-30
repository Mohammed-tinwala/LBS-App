import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const AttendanceSection = ({
    data = [],
    summary = {},
    loading = false
}) => {

    const [currentDate, setCurrentDate] = useState(new Date());

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // 📅 Generate calendar
    const calendarDays = useMemo(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        let days = [];

        // Previous month fillers
        for (let i = firstDay; i > 0; i--) {
            days.push({
                day: prevMonthDays - i + 1,
                inactive: true,
            });
        }

        // Current month
        for (let i = 1; i <= totalDays; i++) {
            days.push({
                day: i,
                inactive: false,
            });
        }

        // Next month fillers
        let nextDay = 1;
        while (days.length % 7 !== 0) {
            days.push({
                day: nextDay++,
                inactive: true,
            });
        }

        return days;
    }, [month, year]);

    // 🔥 FILTER DATA BY MONTH
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const d = new Date(item.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });
    }, [data, month, year]);

    // 🔴 Absent
    const absentDates = useMemo(() => {
        return filteredData
            .filter(item => item.status === "absent")
            .map(item => new Date(item.date).getDate());
    }, [filteredData]);

    // 🟢 Present
    const presentDates = useMemo(() => {
        return filteredData
            .filter(item => item.status === "present")
            .map(item => new Date(item.date).getDate());
    }, [filteredData]);

    const monthName = currentDate.toLocaleString("default", {
        month: "long",
    });

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Attendance</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Calendar */}
            <div className="bg-[#EDEAEA] rounded-[28px] p-5 shadow-sm">

                {/* Month Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {monthName} <span className="text-2xl font-bold">{year}</span>
                    </h2>

                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="w-8 h-8 flex-center rounded-full bg-white shadow">
                            <ChevronLeft size={18} />
                        </button>

                        <button onClick={nextMonth} className="w-8 h-8 flex-center rounded-full bg-white shadow">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <p className="text-center text-sm text-gray-500">Loading attendance...</p>
                ) : (

                    <div className="grid grid-cols-7 gap-y-4 text-center">

                        {calendarDays.map((item, index) => {

                            const isAbsent =
                                absentDates.includes(item.day) && !item.inactive;

                            const isPresent =
                                presentDates.includes(item.day) && !item.inactive;

                            return (
                                <div key={index} className="flex justify-center">
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center text-sm rounded-full
                                        ${item.inactive ? "text-gray-400" : "text-black"}
                                        ${isAbsent ? "bg-red-400 text-white font-semibold" : ""}
                                        ${isPresent ? "bg-green-500 text-white font-semibold" : ""}
                                    `}
                                    >
                                        {item.day}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

            {/* Summary */}
            <div className="bg-primary text-white rounded-[28px] p-5 mt-4 shadow-sm">

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Summary</h3>

                    <p className="text-xs text-[#d3d3d3] flex items-center gap-1">
                        <Clock size={16} />
                        Selected Month
                    </p>
                </div>

                <div className="grid grid-cols-3 text-center">

                    <div>
                        <h2 className="text-3xl font-bold">
                            {summary.present || 0}
                        </h2>
                        <p className="text-sm flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Present
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold">
                            {summary.absent || 0}
                        </h2>
                        <p className="text-sm flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                            Absent
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold">
                            {summary.total_days || 0}
                        </h2>
                        <p className="text-sm flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            Total
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default AttendanceSection;