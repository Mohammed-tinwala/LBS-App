import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/headers/PageHeader";
import { Search, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";

const ENotesDetailPage = () => {

    const location = useLocation();

    const [allNotes, setAllNotes] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [activeSubject, setActiveSubject] = useState("All");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const BASE_FILE_URL = "https://lbsschool.in/old/lms/studymaterials/";

    // ✅ Load data from navigation
    useEffect(() => {
        if (location.state) {
            setAllNotes(location.state.eNotes || []);

            // Add "All" manually
            const subjectList = ["All", ...(location.state.allSubjects?.map(s => s.name) || [])];
            setSubjects(subjectList);
        }
    }, [location]);

    // 🔍 Filtering
    const filteredNotes = allNotes.filter(note => {
        return (
            (activeSubject === "All" || note.subject === activeSubject) &&
            note.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    // 📄 Pagination
    const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentNotes = filteredNotes.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-col gap-4 bg-primary pt-4 min-h-screen">
            <PageHeader title="E-Notes Details" color="white" />

            <div className="bg-white rounded-t-[40px] container-padding px-4 sm:px-6 py-6 flex flex-col gap-2 min-h-screen">

                {/* 🔍 Search Bar */}
                {/* <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                    <Search className="text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none px-2 text-sm w-full"
                    />
                </div> */}

                {/* 🎯 Subject Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 pt-4">
                    {subjects.map((sub, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveSubject(sub);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition ${activeSubject === sub
                                ? "bg-primary text-white"
                                : "bg-gray-100"
                                }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>

                {/* 📄 Notes List */}
                <div className="flex flex-col gap-3">
                    {currentNotes.length > 0 ? (
                        currentNotes.map((note) => (
                            <div
                                key={note.id}
                                className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-dark text-white p-2 rounded-lg">
                                        <FileText size={18} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">
                                            {note.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {note.subject} • {note.topic}
                                        </p>
                                    </div>
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
                        <p className="text-center text-gray-400 py-6">
                            No notes found
                        </p>
                    )}
                </div>

                {/* 📑 Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 mb-8">

                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm disabled:opacity-40"
                        >
                            Prev
                        </button>

                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm disabled:opacity-40"
                        >
                            Next
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ENotesDetailPage;