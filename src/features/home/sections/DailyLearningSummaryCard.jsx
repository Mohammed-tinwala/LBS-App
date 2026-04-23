import React from "react";
import { CalendarDays, ArrowUpRight, User } from "lucide-react";
import { Link } from "react-router-dom";

const DailyLearningSummaryCard = ({ data = [] }) => {

    // 🧠 Get latest 6 items
    const latestData = [...data]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    // 🎨 Theme (same as detail page)
    const getTheme = (text = "") => {
        const t = text.toLowerCase();
        if (t.includes("schedule")) return "bg-[#CFC3E6]";
        if (t.includes("math")) return "bg-[#E6B6C1]";
        if (t.includes("science")) return "bg-[#abdfb4]";
        return "bg-primary/20";
    };

    return (
        <div className="container-padding">

            {/* Header */}
            {/* <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Daily Learning</h2>

                <Link
                    to="/daily-learning"
                    className="text-xs text-gray-500 hover:text-gray-800"
                >
                    See more
                </Link>
            </div> */}

            {/* Timeline */}
            {latestData.length === 0 ? (
                <p className="text-sm text-gray-400">
                    No daily learning available
                </p>
            ) : (
                <div className="relative pl-6 border-l border-primary/40 flex flex-col gap-4">

                    {latestData.map((item) => {
                        const d = new Date(item.date);

                        return (
                            <div
                                key={item.id}
                                className={`relative p-4 rounded-2xl shadow-sm flex flex-col gap-2 ${getTheme(item.text)}`}
                            >

                                {/* 🔵 Timeline Dot */}
                                <span className="absolute -left-[18px] top-5 w-4 h-4 rounded-full bg-primary border-2 border-white shadow"></span>

                                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                                    {/* 🧾 Title */}
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        {item.text}
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays size={14} />
                                        {d.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>

                                </div>

                                {/* 📅 Meta */}
                                <div className="flex flex-col items-start text-xs text-gray-500">

                                    <div className="flex items-center gap-1">
                                        <User size={14} />
                                        {item.teacher || "Teacher"}
                                    </div>

                                </div>

                                {/* 📎 Attachment */}
                                {item.attachment && (
                                    <a
                                        href={`https://lbsschool.in/old/lms/dailyupdates/${item.attachment}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="absolute right-3 bottom-3 bg-white/60 hover:bg-white p-1.5 rounded-full text-gray-700 shadow-sm transition"
                                    >
                                        <ArrowUpRight size={16} />
                                    </a>
                                )}

                            </div>
                        );
                    })}

                </div>
            )}
        </div>
    );
};

export default DailyLearningSummaryCard;