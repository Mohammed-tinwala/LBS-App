import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/headers/PageHeader";
import { Send, Paperclip } from "lucide-react";
import { fetchGrievances, submitGrievance } from "../api/grievanceApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const GrievancePage = () => {

    const { student } = useAuth();

    const [form, setForm] = useState({
        subject: "",
        category: "",
        message: "",
    });

    const [files, setFiles] = useState([]);
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const studentId = student?.id;
    const classId = student?.class_id;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    // ✅ Fetch grievances safely
    const loadGrievances = async () => {
        if (!studentId || !classId) return;

        setPageLoading(true);

        const res = await fetchGrievances({
            student_id: studentId,
            class_id: classId,
        });

        if (res.status) {
            setGrievances(res.grievances);
        } else {
            toast.error(res.message || "Failed to load grievances");
        }

        setPageLoading(false);
    };

    // ✅ Run only when student is ready
    useEffect(() => {
        if (studentId && classId) {
            loadGrievances();
        }
    }, [student]);

    // ✅ Submit grievance
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!studentId || !classId) {
            toast.error("Student data not loaded yet");
            return;
        }

        if (!form.subject || !form.category || !form.message) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);

        const res = await submitGrievance({
            student_id: studentId,
            class_id: classId,
            subject: form.subject,
            category: form.category,
            message: form.message,
            files,
        });

        setLoading(false);

        if (res.status) {
            toast.success(res.message);

            setForm({
                subject: "",
                category: "",
                message: "",
            });
            setFiles([]);

            loadGrievances();
        } else {
            toast.error(res.message || "Submission failed");
        }
    };

    // 🎨 Status UI
    const getStatusStyle = (status) => {
        switch (status) {
            case "resolved":
                return "bg-green-100 text-green-600";
            case "rejected":
                return "bg-red-100 text-red-600";
            default:
                return "bg-yellow-100 text-yellow-600";
        }
    };

    return (
        <div className="flex flex-col gap-4 bg-primary pt-4 min-h-screen">
            <PageHeader title="Raise a Grievance" color="white" />

            <div className="container-padding bg-white rounded-t-[40px] px-5 py-6 flex flex-col gap-6">

                {/* Intro */}
                <div className="pt-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        We’re Here to Help
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        Raise any issue related to academics, transport, fees, or others.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                    >
                        <option value="">Select category</option>
                        <option value="academic">Academic</option>
                        <option value="transport">Transport</option>
                        <option value="fees">Fees</option>
                        <option value="staff">Staff</option>
                        <option value="other">Other</option>
                    </select>

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your issue..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                    />

                    {/* File Upload */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl cursor-pointer">
                            <Paperclip size={16} /> Upload
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <span className="text-xs text-gray-500">
                            {files.length} file(s)
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-2xl"
                    >
                        <Send size={16} />
                        {loading ? "Submitting..." : "Submit Grievance"}
                    </button>
                </form>

                {/* Grievance List */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-md font-semibold text-gray-800">
                        Previous Grievances
                    </h3>

                    {pageLoading ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                    ) : grievances.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No grievances found
                        </p>
                    ) : (
                        grievances.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-2"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {item.subject}
                                    </p>
                                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600">
                                    {item.message}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-100 rounded-2xl p-4 mb-8">
                    <p className="text-xs text-gray-600">
                        Our support team responds within 24-48 hours.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default GrievancePage;