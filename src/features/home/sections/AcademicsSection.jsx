import { CalendarDays, FileText, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AcademicsSection = () => {
    const navigate = useNavigate();

    const nextExam = {
        subject: "Mathematics",
        date: "12 April",
        time: "10:00 AM",
    };

    const admitCardAvailable = true;

    return (
        <div className="container-padding">

            {/* Main Card */}
            <div
                onClick={() => navigate("/academics")}
                className="bg-primary/30 border rounded-3xl p-4 shadow-sm cursor-pointer"
            >

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

                    <div className="w-9 h-9 bg-primary-dark/80 rounded-full flex items-center justify-center">
                        <ArrowUpRight size={18} className="text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-2 gap-3">

                    {/* Timetable */}
                    <div className="bg-primary/5 border rounded-2xl p-3">

                        <div className="flex items-center gap-2 mb-2">
                            <CalendarDays size={16} className="text-label" />
                            <p className="text-[13px] font-medium text-label">
                                Next Exam
                            </p>
                        </div>

                        <h3 className="text-[15px] font-semibold text-black">
                            {nextExam.subject}
                        </h3>

                        <p className="text-[12px] text-label mt-1">
                            {nextExam.date} • {nextExam.time}
                        </p>

                    </div>

                    {/* Admit Card */}
                    <div className="bg-primary/5 border rounded-2xl p-3">

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
                            {admitCardAvailable ? "Available" : "Not Available"}
                        </h3>

                        <p className="text-[12px] text-label mt-1">
                            {admitCardAvailable
                                ? "Download before exam"
                                : "Will be released soon"}
                        </p>

                    </div>

                </div>

                {/* CTA */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate("/academics");
                    }}
                    className="w-full mt-4 h-11 bg-primary text-white rounded-2xl text-sm font-medium"
                >
                    View Details
                </button>

            </div>

        </div>
    );
};

export default AcademicsSection;