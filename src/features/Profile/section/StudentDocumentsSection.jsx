import { useState } from "react";
import { Upload, CheckCircle2, AlertCircle, FileText } from "lucide-react";

const StudentDocumentsSection = () => {
    const [documents, setDocuments] = useState([
        { id: 1, name: "Aadhaar Card", uploaded: false },
        { id: 2, name: "Transfer Certificate", uploaded: true },
        { id: 3, name: "Passport Size Photo", uploaded: false },
    ]);

    const handleUpload = (id, file) => {
        if (!file) return;

        setDocuments((prev) =>
            prev.map((doc) =>
                doc.id === id ? { ...doc, uploaded: true } : doc
            )
        );
    };

    const missingDocs = documents.filter((doc) => !doc.uploaded);

    return (
        <div className="container-padding">

            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Student Documents</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Document Cards */}
            <div className="space-y-3">

                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-primary/30"
                    >

                        {/* Left */}
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10">
                                <FileText size={18} className="text-primary" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">{doc.name}</p>

                                <div className="flex items-center gap-1 text-xs mt-1">
                                    {doc.uploaded ? (
                                        <>
                                            <CheckCircle2 className="text-green-500" size={14} />
                                            <span className="text-green-500">Uploaded</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="text-red-500" size={14} />
                                            <span className="text-red-500">Missing</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Upload Button */}
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    handleUpload(doc.id, e.target.files[0])
                                }
                            />
                            <div className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-full text-sm">
                                <Upload size={14} />
                                {doc.uploaded ? "Replace" : "Upload"}
                            </div>
                        </label>

                    </div>
                ))}
            </div>

            {/* Warning Box */}
            {missingDocs.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 mt-2">

                    <AlertCircle className="text-red-500 mt-1" />

                    <div>
                        <p className="text-sm font-medium text-red-600">
                            Documents Missing
                        </p>
                        <p className="text-xs text-red-500 mt-1">
                            Please upload:{" "}
                            {missingDocs.map((d) => d.name).join(", ")}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StudentDocumentsSection;