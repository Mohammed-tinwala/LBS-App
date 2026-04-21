import { useState } from "react";
import { CalendarDays, FileText, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AcademicsSection = ({ admitCard, loading }) => {
    const navigate = useNavigate();
    const [showFeePopup, setShowFeePopup] = useState(false);

    const nextExam = {
        subject: "Mathematics",
        date: "12 April",
        time: "10:00 AM",
    };
    
    const admitCardAvailable =
        admitCard && admitCard.fee_required <= 0;

    const handleAcademicsNavigation = (e) => {
        e.stopPropagation();

        if (!admitCard) {
            navigate("/academics");
            return;
        }

        if (admitCardAvailable) {
            navigate("/academics");
        } else {
            setShowFeePopup(true);
        }
    };

    return (
        <div className="container-padding">

            {/* Main Card */}
            <div className="bg-primary/30 border rounded-3xl p-4 shadow-sm cursor-pointer">

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-[18px] font-semibold text-black">
                            Academics
                        </h2>
                        <p className="text-sm text-label">
                            Exams & Admit Card
                        </p>
                    </div>

                    <div
                        onClick={handleAcademicsNavigation}
                        className="w-9 h-9 bg-primary-dark/80 rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <ArrowUpRight size={18} className="text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-2 gap-3">

                    {/* Next Exam */}
                    <div className="bg-primary/5 border rounded-2xl p-3">

                        <div className="flex items-center gap-2 mb-2">
                            <CalendarDays size={16} className="text-label" />
                            <p className="text-[13px] font-medium text-label">
                                Next Exam
                            </p>
                        </div>

                        <h3 className="text-[15px] font-semibold text-black">
                            {admitCard?.exam_name || nextExam.subject}
                        </h3>

                        <p className="text-[12px] text-label mt-1">
                            {nextExam.date} • {nextExam.time}
                        </p>

                    </div>

                    {/* Admit Card */}
                    <div
                        className="bg-primary/5 border rounded-2xl p-3 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();

                            if (!admitCard) return;

                            if (admitCardAvailable) {
                                navigate("/admit-card");
                            } else {
                                setShowFeePopup(true);
                            }
                        }}
                    >

                        <div className="flex items-center gap-2 mb-2">
                            <FileText size={16} className="text-label" />
                            <p className="text-[13px] font-medium text-label">
                                Admit Card
                            </p>
                        </div>

                        <h3
                            className={`text-[15px] font-semibold ${admitCardAvailable
                                ? "text-black"
                                : "text-red-500"
                                }`}
                        >
                            {loading
                                ? "Checking..."
                                : admitCardAvailable
                                    ? "Available"
                                    : admitCard
                                        ? "Locked"
                                        : "Not Available"}
                        </h3>

                        <p className="text-[12px] text-label mt-1">
                            {loading
                                ? "Please wait..."
                                : admitCard
                                    ? admitCardAvailable
                                        ? "Download before exam"
                                        : "Clear fees to unlock"
                                    : "Will be released soon"}
                        </p>

                        {/* Optional Fee Progress */}
                        {admitCard && !admitCardAvailable && (
                            <p className="text-[11px] text-red-500 mt-1">
                                Mandatory fee: {admitCard.fee_required}%
                            </p>
                        )}

                    </div>

                </div>

                {/* CTA */}
                <button
                    onClick={handleAcademicsNavigation}
                    className="w-full mt-4 h-11 bg-primary text-white rounded-2xl text-sm font-medium"
                >
                    View Details
                </button>

            </div>

            {/* 🔥 Fee Popup */}
            {showFeePopup && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-5 w-[90%] max-w-sm shadow-lg">

                        <h2 className="text-[16px] font-semibold text-black mb-2">
                            Fee Pending
                        </h2>

                        <p className="text-[13px] text-label mb-4">
                            Please pay your fees first to download the admit card.
                        </p>

                        <div className="flex gap-2">

                            {/* Cancel */}
                            <button
                                onClick={() => setShowFeePopup(false)}
                                className="flex-1 h-10 border rounded-xl text-sm"
                            >
                                Cancel
                            </button>

                            {/* Pay */}
                            <button
                                onClick={() => {
                                    setShowFeePopup(false);
                                    navigate("/fee-detail");
                                }}
                                className="flex-1 h-10 bg-primary text-white rounded-xl text-sm"
                            >
                                Pay Now
                            </button>

                        </div>
                    </div>

                </div>
            )}

        </div>
    );
};

export default AcademicsSection;