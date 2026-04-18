import { useEffect, useState } from "react";
import { ArrowUpRight, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createGatePass, fetchGatePass } from "../../../api/gatePassApi";
import Loader from "../../../components/loader/Loader";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

const GatePassSection = ({ pending = [], approved = [], rejected = [], all = [], refreshGatePass }) => {
    const [open, setOpen] = useState(false);
    const { student } = useAuth();

    // =========================
    // Merge requests for UI
    // =========================
    const requests = [
        ...pending.map(i => ({ ...i, status: "Pending" })),
        ...approved.map(i => ({ ...i, status: "Approved" })),
        ...rejected.map(i => ({ ...i, status: "Rejected" })),
    ].slice(0, 3); // show latest 3

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Gate Pass</h2>
                <p className="text-xs text-label">View all</p>
            </div>

            {/* Card */}
            <div className="relative rounded-[28px] p-5 bg-gradient-to-br from-[#0F172A] to-[#020617] text-white">

                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Requests</h2>
                    <Link to="/gate-pass-history" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowUpRight />
                    </Link>
                </div>

                {/* Requests */}
                <div className="space-y-3 mb-4">
                    {requests.length === 0 ? (
                        <p className="text-sm text-white/60">No requests yet</p>
                    ) : (
                        requests.map((req) => (
                            <div
                                key={req.id}
                                className="flex justify-between bg-white/10 px-3 py-2 rounded-xl"
                            >
                                <div>
                                    <p className="text-sm">{req.reason}</p>
                                    <p className="text-xs text-white/60">
                                        {req.out_date || req.date}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-xs">
                                    {req.status === "Approved" && (
                                        <CheckCircle2 className="text-green-400" size={14} />
                                    )}
                                    {req.status === "Pending" && (
                                        <Clock className="text-yellow-400" size={14} />
                                    )}
                                    {req.status === "Rejected" && (
                                        <XCircle className="text-red-400" size={14} />
                                    )}

                                    {req.status}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* CTA */}
                <button
                    onClick={() => setOpen(true)}
                    className="w-full bg-white text-black py-2 rounded-full flex items-center justify-center gap-2"
                >
                    <Plus size={16} />
                    Apply New Gate Pass
                </button>
            </div>

            {/* Modal */}
            {open && (
                <GatePassModal
                    student={student}
                    onClose={() => setOpen(false)}
                    refreshGatePass={refreshGatePass}
                />
            )}
        </div>
    );
};

export default GatePassSection;





/* ================= MODAL ================= */

const GatePassModal = ({ onClose, student, refreshGatePass }) => {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        reason: "",
        out_date: "",
        out_time: "",
        return_date: "",
        return_time: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await createGatePass({
                sid: student?.id,
                db_school: 2,
                ...form
            });

            if (res.status) {
                toast.success(res.message);

                await refreshGatePass();

                onClose();

                // optional: refresh page or trigger parent refresh later
            } else {
                toast.error(res.message);
            }

        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-9990">

            <div className="w-full max-w-md bg-white rounded-t-[28px] p-5">

                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">New Gate Pass</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <label className="text-sm text-label">Reason</label>
                        <input
                            type="text"
                            name="reason"
                            onChange={handleChange}
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                            placeholder="Reason for gate pass"
                        />
                    </div>


                    <div className="relative">
                        <label className="text-sm text-label">Out Date</label>
                        <input
                            type="date"
                            name="out_date"
                            onChange={handleChange}
                            className="w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 outline-none"
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm text-label">Out Time</label>
                        <input
                            type="time"
                            name="out_time"
                            onChange={handleChange}
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                            placeholder="Select Time"
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm text-label">Return Date</label>
                        <input
                            type="date"
                            name="return_date"
                            onChange={handleChange}
                            className="w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 outline-none"
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm text-label">Return Time</label>
                        <input
                            type="time"
                            name="return_time"
                            onChange={handleChange}
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                            placeholder="Select Time"
                        />
                    </div>

                    {/* Loader OR Button */}
                    {loading ? (
                        <Loader />
                    ) : (
                        <button className="w-full bg-primary text-white py-3 rounded-full">
                            Submit
                        </button>
                    )}

                </form>

            </div>

        </div>
    );
};