import { useState } from "react";
import {
    Upload,
    CheckCircle2,
    AlertCircle,
    FileText,
    XCircle
} from "lucide-react";
import { uploadStudentDocument } from "../../../api/studentDocument";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const StudentDocumentsSection = ({
    profile,
    documents = [],
    loading = false,
    refreshDocuments
}) => {

    const { student } = useAuth();

    const [uploadingId, setUploadingId] = useState(null);

    // 📌 Required documents list
    const requiredDocs = [
        { key: "aadhaar", label: "Aadhaar Card" },
        { key: "tc", label: "Transfer Certificate" },
        { key: "photo", label: "Passport Size Photo" },
    ];

    // 🔍 Map API docs
    const mappedDocs = requiredDocs.map((doc) => {
        const found = documents.find(
            (d) => d.document_type === doc.key
        );

        return {
            ...doc,
            file: found?.file_path || null,
            status: found?.status ?? null, // 0,1,2
        };
    });

    // 📤 Upload handler

    const handleUpload = async (doc, file) => {
        if (!file) return;

        try {
            const res = await uploadStudentDocument({
                student_id: student?.id,   // 🔥 REQUIRED
                document_type: doc.name,   // 🔥 REQUIRED
                file: file                 // 🔥 REQUIRED
            });

            if (res.status) {
                alert("Uploaded successfully ✅");
                refreshDocuments(); // reload from API
            } else {
                alert(res.message);
            }

        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    // 🎨 Status UI
    const renderStatus = (status) => {
        if (status === 1) {
            return (
                <>
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span className="text-green-500">Approved</span>
                </>
            );
        }

        if (status === 2) {
            return (
                <>
                    <XCircle size={14} className="text-red-500" />
                    <span className="text-red-500">Rejected</span>
                </>
            );
        }

        if (status === 0) {
            return (
                <>
                    <AlertCircle size={14} className="text-yellow-500" />
                    <span className="text-yellow-500">Pending</span>
                </>
            );
        }

        return (
            <>
                <AlertCircle size={14} className="text-red-500" />
                <span className="text-red-500">Missing</span>
            </>
        );
    };

    // ❗ Missing docs
    const missingDocs = mappedDocs.filter((d) => !d.file);

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Student Documents</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Loader */}
            {loading ? (
                <p className="text-sm text-gray-400">Loading...</p>
            ) : (
                <div className="space-y-3">

                    {mappedDocs.map((doc) => (
                        <div
                            key={doc.key}
                            className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-primary/30"
                        >

                            {/* Left */}
                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10">
                                    <FileText size={18} className="text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium">
                                        {doc.label}
                                    </p>

                                    <div className="flex items-center gap-1 text-xs mt-1">
                                        {renderStatus(doc.status)}
                                    </div>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-2">

                                {/* 👁 View */}
                                {doc.file && (
                                    <a
                                        href={`https://lbsschool.in/old/lms/MobileAppBackend/${doc.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-500 underline"
                                    >
                                        View
                                    </a>
                                )}

                                {/* 📤 Upload */}
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) =>
                                            handleUpload(doc.key, e.target.files[0])
                                        }
                                    />

                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm text-white 
                                        ${uploadingId === doc.key ? "bg-gray-400" : "bg-primary"}
                                    `}>
                                        <Upload size={14} />
                                        {uploadingId === doc.key
                                            ? "Uploading..."
                                            : doc.file
                                                ? "Replace"
                                                : "Upload"}
                                    </div>
                                </label>

                            </div>

                        </div>
                    ))}
                </div>
            )}

            {/* ⚠ Missing Warning */}
            {missingDocs.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 mt-4">

                    <AlertCircle className="text-red-500 mt-1" />

                    <div>
                        <p className="text-sm font-medium text-red-600">
                            Documents Missing
                        </p>
                        <p className="text-xs text-red-500 mt-1">
                            Please upload:{" "}
                            {missingDocs.map((d) => d.label).join(", ")}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StudentDocumentsSection;