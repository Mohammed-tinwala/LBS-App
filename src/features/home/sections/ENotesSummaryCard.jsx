import React from "react";
import { BookOpen, FileText, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ENotesSummaryCard = ({ totalNotes = 0, subjects = 0, recentNotes = [], eNotes = [], allSubjects = [] }) => {
    const navigate = useNavigate();

    const handleViewAllNotes = () => {
        navigate("/enotes", {
            state: {
                eNotes,
                allSubjects
            }
        });
    };

    const BASE_FILE_URL = "https://lbsschool.in/old/lms/studymaterials/";

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-black">
                        E-Notes
                    </h2>
                    <p className="text-xs text-gray-500">
                        Learning made simple
                    </p>
                </div>
                <div className="bg-gradient-to-tr from-primary to-primary-dark text-white p-3 rounded-2xl shadow-md">
                    <BookOpen size={20} />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-5">

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="bg-purple-500 text-white p-2 rounded-lg">
                        <FileText size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Total Notes</p>
                        <h3 className="text-lg font-bold text-gray-800">
                            {totalNotes || 0}
                        </h3>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="bg-green-500 text-white p-2 rounded-lg">
                        <Layers size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Subjects</p>
                        <h3 className="text-lg font-bold text-gray-800">
                            {subjects || 0}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Recent Notes */}
            <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                    Recent Notes
                </h3>

                <div className="flex flex-col gap-2 max-h-44 overflow-y-auto pr-1">

                    {recentNotes.length > 0 ? (
                        recentNotes.map((note, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-800 truncate max-w-[180px] sm:max-w-[250px]">
                                        {note.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {note.subject}
                                    </span>
                                </div>

                                <button
                                    onClick={() => {
                                        const fileUrl = BASE_FILE_URL + decodeURIComponent(note.file);
                                        window.open(fileUrl, "_blank");
                                    }}
                                    className="text-primary-dark text-sm font-medium hover:underline"
                                >
                                    View
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-400 text-sm">
                            No recent notes available
                        </div>
                    )}

                </div>
            </div>

            {/* Footer Button */}
            <div className="mt-5">
                <button
                    onClick={handleViewAllNotes}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-sm font-medium transition"
                >
                    View All Notes
                </button>
            </div>

        </div>
    );
};

export default ENotesSummaryCard;