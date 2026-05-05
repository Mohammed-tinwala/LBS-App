import React, { useState } from "react";
import { ArrowUpRight, Bus } from "lucide-react";
import { updateOutingStatus } from "../../../api/outingReqApi";
import { toast } from "react-hot-toast";

const OutingReqSection = ({
    pending = [],
    approved = [],
    rejected = [],
    all = [],
    refreshOuting
}) => {

    const [loadingId, setLoadingId] = useState(null);

    const handleAction = async (id, status) => {
        try {
            setLoadingId(id);

            const res = await updateOutingStatus({
                id,
                status,
                db_school: 2
            });

            if (res.success) {
                toast.success(res.message);
                refreshOuting();
            } else {
                toast.error(res.message);
            }

        } catch (err) {
            toast.error("Action failed");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Outing Requests</h2>
                <span className="text-xs text-gray-500">
                    {pending.length} pending
                </span>
            </div>

            {/* 🎨 Gradient Card (Main Highlight) */}
            <div className="relative rounded-[28px] p-5 overflow-hidden mb-4
        bg-gradient-to-br from-[#FF8A65] via-[#FF7043] to-[#F4511E] text-white shadow-md"
            >

                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />

                {/* Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <ArrowUpRight size={18} />
                </div>

                <div className="relative z-10">

                    {/* Title */}
                    <div className="flex items-center gap-3 mb-3">
                        <Bus size={28} />
                        <h2 className="text-xl font-semibold">
                            Student Outings
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/90 mb-4 max-w-[85%]">
                        Manage and respond to outing requests sent by school administration.
                    </p>

                    {/* Stats */}
                    <div className="flex gap-6 text-sm">
                        <div>
                            <p className="font-semibold">{pending.length}</p>
                            <p className="text-white/80 text-xs">Pending</p>
                        </div>
                        <div>
                            <p className="font-semibold">{approved.length}</p>
                            <p className="text-white/80 text-xs">Approved</p>
                        </div>
                        <div>
                            <p className="font-semibold">{rejected.length}</p>
                            <p className="text-white/80 text-xs">Rejected</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* 📦 Pending Requests List */}
            <div className="flex flex-col gap-3 ">

                {pending.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">
                        No pending requests
                    </p>
                ) : (
                    pending.map((item) => (
                        <div
                            key={item.id}
                            className="bg-primary/30 border rounded-3xl p-4 shadow-sm"
                        >

                            {/* Top */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold text-gray-800">
                                    {item.outingplace_name}
                                </p>

                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                    Pending
                                </span>
                            </div>

                            {/* Info */}
                            <div className="text-sm text-gray-600 space-y-1 mb-3">
                                <p>📅 {item.visiting_date} • ⏰ {item.visiting_time}</p>
                                <p>👨‍🏫 {item.accomanying_teacher || "N/A"}</p>
                                <p>📝 {item.reason || "No reason provided"}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    disabled={loadingId === item.id}
                                    onClick={() => handleAction(item.id, "approved")}
                                    className="flex-1 bg-green-500 text-white text-sm py-2 rounded-xl"
                                >
                                    {loadingId === item.id ? "..." : "Approve"}
                                </button>

                                <button
                                    disabled={loadingId === item.id}
                                    onClick={() => handleAction(item.id, "rejected")}
                                    className="flex-1 bg-red-500 text-white text-sm py-2 rounded-xl"
                                >
                                    {loadingId === item.id ? "..." : "Reject"}
                                </button>
                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default OutingReqSection;