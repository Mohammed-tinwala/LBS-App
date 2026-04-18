import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/headers/PageHeader";
import { CalendarDays, MoreHorizontal, User } from "lucide-react";
import { fetchDailyLearning } from "../api/dailyLearningApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const DailyLearningDetail = () => {
    const { student } = useAuth();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🎨 Theme generator
    const getTheme = (text) => {
        const t = text.toLowerCase();
        if (t.includes("schedule")) return "bg-[#CFC3E6] border-[#CFC3E6]";
        if (t.includes("math")) return "bg-[#E6B6C1] border-[#E6B6C1]";
        if (t.includes("science")) return "bg-[#abdfb4] border-[#abdfb4]";
        return "bg-primary/30 border-primary";
    };

    // 📦 Group by date
    const groupByDate = (data) => {
        return data.reduce((acc, item) => {
            if (!acc[item.date]) acc[item.date] = [];
            acc[item.date].push(item);
            return acc;
        }, {});
    };

    // 🚀 API CALL
    const loadDailyLearning = async () => {
        try {
            setLoading(true);

            const res = await fetchDailyLearning(
                student?.school_id,
                student?.class_id
            );

            if (res.status) {
                setData(res.data || []);
            } else {
                toast.error(res.message || "No data found");
            }

        } catch (err) {
            console.error(err);
            toast.error("Failed to load daily learning");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (student?.class_id) {
            loadDailyLearning();
        }
    }, [student]);

    // 🎯 Filter ONLY current year
    const currentYear = new Date().getFullYear();

    const filteredData = data.filter(item =>
        new Date(item.date).getFullYear() === currentYear
    );

    // 🧠 Group + sort
    const groupedData = groupByDate(filteredData);

    const dates = Object.keys(groupedData).sort(
        (a, b) => new Date(b) - new Date(a)
    );

    return (
        <div className="flex flex-col gap-4 bg-primary pt-4 min-h-screen">
            <PageHeader title="Daily Learning" color="white" />

            <div className="bg-white rounded-t-[40px] min-h-screen px-5 py-6 flex flex-col gap-6">

                {/* 🔄 Loading */}
                {loading && (
                    <p className="text-center text-sm text-gray-500">
                        Loading daily learning...
                    </p>
                )}

                {/* ❌ Empty State (based on filtered data) */}
                {!loading && filteredData.length === 0 && (
                    <p className="text-center text-sm text-gray-500">
                        No daily learning available for this year
                    </p>
                )}

                {/* ✅ Timeline */}
                {!loading && dates.map((date, index) => (
                    <div key={index} className="flex flex-col gap-4">

                        {/* 📅 Date Header */}
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarDays size={18} className="text-primary-dark" />
                            <h2 className="text-sm font-semibold text-label">
                                {new Date(date).toDateString()}
                            </h2>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-7 border-l border-primary-dark flex flex-col gap-6">
                            {groupedData[date].map((item) => (
                                <div
                                    key={item.id}
                                    className={`relative p-5 rounded-[30px] border shadow-sm transition hover:shadow-md ${getTheme(item.text)}`}
                                >
                                    {/* 📍 Timeline Dot */}
                                    <span className="absolute -left-12 top-6 w-10 h-10 rounded-full border-4 border-white shadow-md bg-white flex flex-col items-center justify-center leading-none z-10">
                                        <span className="text-[8px] font-bold uppercase text-primary-dark">
                                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                        <span className="text-[11px] font-extrabold text-primary-dark">
                                            {new Date(item.date).toLocaleDateString('en-US', { day: '2-digit' })}
                                        </span>
                                    </span>

                                    {/* 🧾 Header */}
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-bold tracking-tight">
                                                {item.text}
                                            </h3>
                                            <span className="text-xs opacity-60 font-medium">
                                                {item.time || "No time set"}
                                            </span>
                                        </div>

                                        <button className="p-1 hover:bg-black/5 rounded-full">
                                            <MoreHorizontal size={20} className="opacity-40" />
                                        </button>
                                    </div>

                                    {/* 👤 Footer */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100">
                                                <User size={16} className="text-gray-400" />
                                            </div>
                                            <span className="text-xs font-bold opacity-80">
                                                {item.teacher || "Teacher"}
                                            </span>
                                        </div>

                                        {item.attachment && (
                                            <a
                                                href={`https://lbsschool.in/old/lms/dailyupdates/${item.attachment}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white/50 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-white transition shadow-sm"
                                            >
                                                View File
                                            </a>
                                        )}
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

export default DailyLearningDetail;