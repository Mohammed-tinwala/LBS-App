import React, { useState, useEffect } from "react";
import { Send, Paperclip, MessageCircle } from "lucide-react";
import PageHeader from '../../components/common/headers/PageHeader';
import { fetchAllSubjects } from '../../api/eNotesApi';

import { useAuth } from '../../context/AuthContext';
import { fetchDoubts, submitDoubt } from '../../api/doubtApi';
import { toast } from "react-hot-toast";
import Loader from '../../components/loader/Loader';

const DoubtPage = () => {

    const { student } = useAuth();

    const [form, setForm] = useState({
        subject: "",
        message: "",
        image: null
    });

    const [doubts, setDoubts] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // =========================
    // 📥 FETCH DOUBTS
    // =========================
    const loadDoubts = async () => {
        try {
            setLoading(true);

            const res = await fetchDoubts({
                std_id: student?.id
            });

            if (res.status) {

                const allDoubts = res.all.map(item => ({
                    id: item.id,
                    subject: item.subject,
                    message: item.doubt,
                    status: item.status,

                    // 🖼️ Student Image
                    image: item.image
                        ? `https://lbsschool.in/old/lms/MobileAppBackend/uploads/doubts/${item.image}`
                        : null,

                    // 💬 Replies
                    replies: item.answer !== "NA" ? [{
                        by: item.answered_by,
                        text: item.answer,
                        image: item.ans_image
                            ? `https://lbsschool.in/old/lms/MobileAppBackend/uploads/doubts/${item.ans_image}`
                            : null
                    }] : [],

                    date: item.timestamp
                }));

                setDoubts(allDoubts);

            } else {
                toast.error(res.message || "Failed to load doubts");
            }

        } catch (err) {
            console.error(err);
            toast.error("Error loading doubts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (student?.id) loadDoubts();
    }, [student]);

    // =========================
    // 📩 SUBMIT DOUBT
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.subject || !form.message) {
            return toast.error("Please fill all fields");
        }

        try {
            setSubmitting(true);

            const res = await submitDoubt({
                std_id: student?.id,
                class_id: student?.class_id,
                subject: form.subject,
                doubt: form.message,
                image: form.image
            });

            if (res.status) {
                toast.success("Doubt submitted ✅");

                setForm({
                    subject: "",
                    message: "",
                    image: null
                });

                loadDoubts();

            } else {
                toast.error(res.message || "Submit failed");
            }

        } catch (err) {
            console.error(err);
            toast.error("Submit error");
        } finally {
            setSubmitting(false);
        }
    };

    // =========================
    // 📚 LOAD SUBJECTS
    // =========================
    const loadSubjects = async () => {
        try {
            const res = await fetchAllSubjects();

            if (res.status) {
                setSubjects(res.subjects || []);
            } else {
                toast.error(res.message || "Failed to load subjects");
            }

        } catch (err) {
            console.error(err);
            toast.error("Subjects API failed");
        }
    };

    useEffect(() => {
        if (student?.class_id) loadSubjects();
    }, [student]);

    // =========================
    // 🎨 STATUS STYLE
    // =========================
    const getStatusStyle = (status) => {
        return status === "answered"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600";
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary pt-4">

            <PageHeader title="Ask a Doubt" color="white" />

            <div className="container-padding bg-white rounded-t-[40px] mt-4 px-5 flex flex-col gap-6">

                {/* 📝 FORM */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">

                    <select
                        value={form.subject}
                        onChange={(e) =>
                            setForm({ ...form, subject: e.target.value })
                        }
                        className="border px-4 py-3 rounded-2xl"
                    >
                        <option value="">Select Subject</option>

                        {subjects.map((sub) => (
                            <option key={sub.id} value={sub.name}>
                                {sub.name}
                            </option>
                        ))}
                    </select>

                    <textarea
                        placeholder="Explain your doubt..."
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                        }
                        className="border px-4 py-3 rounded-2xl"
                    />

                    {/* 📎 FILE + BUTTON */}
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer">
                            <Paperclip size={16} />
                            Attach
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    setForm({ ...form, image: e.target.files[0] })
                                }
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={submitting}
                            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-white 
    ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
                        >
                            {submitting ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Send size={16} />
                                    Submit
                                </>
                            )}
                        </button>
                    </div>

                    {/* 📎 FILE NAME */}
                    {form.image && (
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>📎 {form.image.name}</span>
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, image: null })}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    )}

                </form>

                {/* 📚 LIST */}
                <div className="flex flex-col gap-4">

                    <h3 className="text-md font-semibold">Your Doubts</h3>

                    {loading ? (
                        <p className="text-sm text-gray-400">Loading...</p>
                    ) : doubts.length === 0 ? (
                        <p className="text-sm text-gray-400">No doubts yet</p>
                    ) : (
                        doubts.map((doubt) => (
                            <div
                                key={doubt.id}
                                className="border rounded-2xl p-4 flex flex-col gap-3 shadow-sm"
                            >

                                {/* Header */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            {doubt.subject}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {doubt.subject}
                                        </p>
                                    </div>

                                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(doubt.status)}`}>
                                        {doubt.status}
                                    </span>
                                </div>

                                {/* Message */}
                                <p className="text-sm text-gray-600">
                                    {doubt.message}
                                </p>

                                {/* 🖼️ Student Image */}
                                {doubt.image && (
                                    <img
                                        src={doubt.image}
                                        alt="doubt"
                                        className="w-full max-h-52 object-cover rounded-xl border"
                                    />
                                )}

                                {/* 💬 Reply */}
                                {doubt.replies.length > 0 && (
                                    <div className="bg-gray-50 border border-gray-300 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-2">
                                            Teacher Reply:
                                        </p>

                                        {doubt.replies.map((r, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <p className="text-sm text-gray-700">
                                                    {r.text}
                                                </p>

                                                {/* 🖼️ Teacher Image */}
                                                {r.image && (
                                                    <img
                                                        src={r.image}
                                                        alt="answer"
                                                        className="w-full max-h-48 object-cover rounded-lg border"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span>
                                        {new Date(doubt.date).toLocaleDateString()}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={14} />
                                        {doubt.replies.length}
                                    </span>
                                </div>

                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default DoubtPage;