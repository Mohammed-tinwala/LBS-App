import React from "react";
import { BookOpen, CalendarDays, FileText, ArrowUpRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const DailyLearningSummaryCard = ({ data = [] }) => {

    // Helper to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    // Card styles based on text
    const getCardStyles = (text) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes("schedule")) {
            return "bg-gradient-to-br from-indigo-600 to-blue-700";
        }
        if (lowerText.includes("homework")) {
            return "bg-gradient-to-br from-pink-400 to-pink-500";
        }
        return "bg-gradient-to-br from-yellow-400 to-amber-500";
    };

    // Icon logic
    const getIcon = (text) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes("schedule")) {
            return <CalendarDays size={20} className="text-white" />;
        }
        if (lowerText.includes("homework")) {
            return <BookOpen size={20} className="text-white" />;
        }
        return <FileText size={20} className="text-white" />;
    };

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Daily Learning</h2>

                <Link to="/daily-learning" className="text-xs font-normal text-gray-500 hover:text-gray-800 cursor-pointer transition">
                    See more
                </Link>
            </div>

            {/* Cards */}
            <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden">

                {data.length > 0 ? (
                    data.map((item) => (
                        <div
                            key={item.id}
                            className={`relative min-w-40 w-40 h-52.5 sm:min-w-45 sm:w-45 sm:h-57.5 rounded-4xl p-5 flex flex-col justify-between shrink-0 snap-center shadow-lg transition-transform hover:scale-[1.03] cursor-pointer bg-linear-to-br from-primary to-primary-dark `}
                        >

                            {/* Top */}
                            <div className="flex justify-between items-start">

                                <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm shadow-inner">
                                    {getIcon(item.text)}
                                </div>

                                {/* <div className="bg-p text-white text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                    <Zap size={12} fill="currentColor" strokeWidth={0} />
                                    {item.class_id}
                                </div> */}

                            </div>

                            {/* Bottom */}
                            <div className="relative mt-auto flex flex-col gap-1.5">

                                <span className="w-fit bg-white/20 text-white/90 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-sm border border-white/10">
                                    {formatDate(item.date)}
                                </span>

                                <h3 className="text-white font-semibold text-sm leading-snug pr-6">
                                    {item.text}
                                </h3>

                                {/* Attachment */}
                                {item.attachment && (
                                    <a
                                        href={`https://lbsschool.in/old/lms/dailyupdates/${item.attachment}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="absolute -right-1 -bottom-1 bg-white/20 hover:bg-white/40 backdrop-blur-md p-1.5 rounded-full text-white transition-all shadow-sm flex items-center justify-center border border-white/10"
                                        title={`Open ${item.attachment}`}
                                    >
                                        <ArrowUpRight size={18} strokeWidth={2.5} />
                                    </a>
                                )}

                            </div>

                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No daily learning available</p>
                )}

            </div>
        </div>
    );
};

export default DailyLearningSummaryCard;