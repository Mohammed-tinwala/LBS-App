import React, { useState } from "react";
import { Send, Paperclip, MessageCircle, Clock } from "lucide-react";
import PageHeader from '../../components/common/headers/PageHeader'

const dummyDoubts = [
    {
        id: 1,
        subject: "Math",
        title: "Doubt in Quadratic Equation",
        message: "I didn’t understand factorization method",
        status: "pending",
        replies: [],
        date: "2026-04-20",
    },
    {
        id: 2,
        subject: "Science",
        title: "What is Photosynthesis?",
        message: "Explain in simple terms",
        status: "answered",
        replies: [
            {
                by: "Teacher",
                text: "It is the process by which plants make food using sunlight.",
            },
        ],
        date: "2026-04-19",
    },
];

const DoubtPage = () => {
    const [form, setForm] = useState({
        subject: "",
        title: "",
        message: "",
    });

    const [doubts, setDoubts] = useState(dummyDoubts);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDoubt = {
            id: Date.now(),
            subject: form.subject,
            title: form.title,
            message: form.message,
            status: "pending",
            replies: [],
            date: new Date().toISOString(),
        };

        setDoubts([newDoubt, ...doubts]);

        setForm({ subject: "", title: "", message: "" });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "answered":
                return "bg-green-100 text-green-600";
            case "closed":
                return "bg-gray-200 text-gray-600";
            default:
                return "bg-yellow-100 text-yellow-600";
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary pt-4">

            {/* Header */}
            {/* <div className="px-5 text-white">
                <h2 className="text-lg font-semibold">Ask a Doubt</h2>
                <p className="text-xs opacity-80">
                    Get your doubts solved by teachers quickly
                </p>
            </div> */}

            <PageHeader title="Ask a Doubt" color="white" />

            {/* Main */}
            <div className="bg-white rounded-t-[40px] mt-4 px-5 py-6 flex flex-col gap-6">

                {/* 📝 Ask Doubt Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <select
                        value={form.subject}
                        onChange={(e) =>
                            setForm({ ...form, subject: e.target.value })
                        }
                        className="border px-4 py-3 rounded-2xl"
                    >
                        <option value="">Select Subject</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Doubt title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        className="border px-4 py-3 rounded-2xl"
                    />

                    <textarea
                        placeholder="Explain your doubt..."
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                        }
                        className="border px-4 py-3 rounded-2xl"
                    />

                    {/* File Upload */}
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer">
                            <Paperclip size={16} />
                            Attach
                            <input type="file" className="hidden" />
                        </label>

                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl"
                        >
                            <Send size={16} />
                            Submit
                        </button>
                    </div>
                </form>

                {/* 📚 Doubt List */}
                <div className="flex flex-col gap-4">

                    <h3 className="text-md font-semibold">Your Doubts</h3>

                    {doubts.length === 0 ? (
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
                                            {doubt.title}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {doubt.subject}
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(
                                            doubt.status
                                        )}`}
                                    >
                                        {doubt.status}
                                    </span>
                                </div>

                                {/* Message */}
                                <p className="text-sm text-gray-600">
                                    {doubt.message}
                                </p>

                                {/* Replies */}
                                {doubt.replies.length > 0 && (
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Teacher Reply:
                                        </p>
                                        {doubt.replies.map((r, i) => (
                                            <p key={i} className="text-sm text-gray-700">
                                                {r.text}
                                            </p>
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