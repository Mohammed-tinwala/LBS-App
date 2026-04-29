import React from "react";
import { CalendarDays, User2, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const MentorMentee = ({ data = [], loading }) => {

    // 🟢 Status UI
    const getStatus = (status) => {
        return status === 1
            ? {
                text: "Completed",
                style: "bg-green-500/10 text-green-600",
                icon: <CheckCircle2 size={14} />,
            }
            : {
                text: "Pending",
                style: "bg-yellow-500/10 text-yellow-600",
                icon: <Clock size={14} />,
            };
    };

    // 🔄 Loading State
    if (loading) {
        return (
            <div className="container-padding">
                <p className="text-sm text-gray-500">Loading mentor insights...</p>
            </div>
        );
    }

    // ❌ Empty State
    if (!data.length) {
        return (
            <div className="container-padding">
                <p className="text-sm text-gray-400">No mentor meetings found</p>
            </div>
        );
    }

    // ⭐ Latest Meeting
    const latest = data[0];

    return (
        <div className="container-padding">

            {/* 🔷 HEADER */}
            <div className="w-full flex justify-between items-center mb-6">
                <div className="w-3/4 flex flex-col">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="text-primary-dark" size={20} />
                        Mentor Insights
                    </h2>
                    <p className="text-[12px] text-label">
                        Your latest mentor-mentee interactions
                    </p>
                </div>

                <Link
                    to="/mentor-meetings"
                    className="text-xs text-label"
                >
                    See more
                </Link>
            </div>

            {/* 🔷 FEATURED CARD */}
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-primary text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>

                <p className="text-xs uppercase opacity-80 mb-1">Latest Meeting</p>

                <h3 className="text-lg font-semibold">
                    {latest.student_name || "Student"} with {latest.teacher_name || "Teacher"}
                </h3>

                <p className="text-sm mt-2 opacity-90 line-clamp-2">
                    {latest.meeting_discussion_point}
                </p>

                <div className="mt-3 text-xs opacity-80 flex items-center gap-2">
                    <CalendarDays size={14} /> {latest.meeting_date}
                </div>
            </div>

            {/* 🔷 GRID */}
            <div className="grid grid-cols-1 gap-5">

                {data.map((item) => {
                    const status = getStatus(item.status);

                    return (
                        <div
                            key={item.id}
                            className="group relative bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
                        >
                            {/* Avatar */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                    {(item.student_name || "S").charAt(0)}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {item.student_name || "Unknown Student"}
                                    </p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <User2 size={12} /> {item.teacher_name || "Unknown Teacher"}
                                    </p>
                                </div>
                            </div>

                            {/* Discussion */}
                            <div className="mb-2 space-y-1">
                                {item.meeting_discussion_point
                                    ?.split(/\r?\n/)
                                    .filter(line => line.trim() !== "")
                                    .map((line, index) => (
                                        <p key={index} className="text-sm text-gray-600">
                                            {line}
                                        </p>
                                    ))}
                            </div>

                            {/* Outcome */}
                            <div className="mb-3 space-y-1">
                                {item.meeting_outcome
                                    ?.split(/\r?\n/)
                                    .filter(line => line.trim() !== "")
                                    .map((line, index) => (
                                        <p key={index} className="text-xs text-gray-500">
                                            {line}
                                        </p>
                                    ))}
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center text-xs">
                                <span className="flex items-center gap-1 text-gray-400">
                                    <CalendarDays size={12} /> {item.meeting_date}
                                </span>

                                <span
                                    className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.style}`}
                                >
                                    {status.icon}
                                    {status.text}
                                </span>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transition"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MentorMentee;