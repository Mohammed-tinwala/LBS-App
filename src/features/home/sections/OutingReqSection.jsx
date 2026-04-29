import { useState } from "react";
import { ArrowUpRight, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createOutingRequest } from "../../../api/outingReqApi";
import Loader from "../../../components/loader/Loader";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

const OutingReqSection = ({
    pending = [],
    approved = [],
    rejected = [],
    all = [],
    refreshOutingPass
}) => {

    const [open, setOpen] = useState(false);

    // ✅ Merge + latest 3
    const requests = [
        ...pending.map(i => ({ ...i, status: "pending" })),
        ...approved.map(i => ({ ...i, status: "approved" })),
        ...rejected.map(i => ({ ...i, status: "rejected" })),
    ].slice(0, 3);

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Outing Request</h2>
                <p className="text-xs text-label">View all</p>
            </div>

            {/* Card */}
            <div className="relative rounded-[28px] p-5 bg-linear-to-br from-[#0F172A] to-[#020617] text-white">

                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Requests</h2>
                    <Link to="/outing-history" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowUpRight />
                    </Link>
                </div>

                {/* Requests */}
                <div className="space-y-3 mb-4">

                    {requests.length === 0 && (
                        <p className="text-sm text-white/60">No requests yet</p>
                    )}

                    {requests.map((item) => (
                        <div key={item.id} className="flex justify-between bg-white/10 px-3 py-2 rounded-xl">

                            <div>
                                <p className="text-sm">{item.outingplace_name}</p>
                                <p className="text-xs text-white/60">
                                    {item.visiting_date} • {item.visiting_time}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                {item.status === "approved" && (
                                    <CheckCircle2 className="text-green-400" size={16} />
                                )}
                                {item.status === "pending" && (
                                    <Clock className="text-yellow-400" size={16} />
                                )}
                                {item.status === "rejected" && (
                                    <XCircle className="text-red-400" size={16} />
                                )}
                            </div>

                        </div>
                    ))}

                </div>

                {/* CTA */}
                <button
                    onClick={() => setOpen(true)}
                    className="w-full bg-white text-black py-2 rounded-full flex items-center justify-center gap-2"
                >
                    <Plus size={16} />
                    Apply Outing Request
                </button>
            </div>

            {/* Modal */}
            {open && (
                <OutingPassModal
                    onClose={() => setOpen(false)}
                    refreshOutingPass={refreshOutingPass}
                />
            )}
        </div>
    );
};

export default OutingReqSection;



/* ================= MODAL ================= */
const OutingPassModal = ({ onClose, refreshOutingPass }) => {

    const { student } = useAuth();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        outingplace_name: "",
        accomanying_teacher: "",
        reason: "",
        visiting_date: "",
        visiting_time: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await createOutingRequest({
                sid: student?.id,
                db_school: 2,
                ...form
            });

            if (res.status) {
                toast.success(res.message);
                await refreshOutingPass();
                onClose();
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
                    <h2 className="text-lg font-semibold">New Outing Request</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* <input
                        name="outingplace_name"
                        placeholder="Outing Place"
                        onChange={handleChange}
                        className="input"
                    /> */}

                    <div className="relative">
                        <label className="text-sm text-label">Outing Place</label>
                        <input
                            type="text"
                            name="outingplace_name"
                            onChange={handleChange}
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                            placeholder="Enter outing place"
                        />
                    </div>

                    <input
                        name="accomanying_teacher"
                        placeholder="Accompanying Teacher"
                        onChange={handleChange}
                        className="input"
                    />

                    <div className="relative">
                        <label className="text-sm text-label">Accompanying Teacher</label>
                        <input
                            type="text"
                            name="accomanying_teacher"
                            onChange={handleChange}
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                            placeholder="Enter accompanying teacher name"
                        />
                    </div>


                    <input
                        name="reason"
                        placeholder="Reason"
                        onChange={handleChange}
                        className="input"
                    />

                    <div className="relative">
                        <label className="text-sm text-label">Reason</label>
                        <input
                            type="text"
                            name="reason"
                            onChange={handleChange}
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                            placeholder="Enter reason for outing"
                        />
                    </div>

                    {/* <input
                        type="date"
                        name="visiting_date"
                        onChange={handleChange}
                        className="input"
                    /> */}

                    <div className="relative">
                        <label className="text-sm text-label">Visiting Date</label>
                        <input
                            type="date"
                            name="visiting_date"
                            onChange={handleChange}
                            className="w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 outline-none"
                        />
                    </div>

                    {/* <input
                        type="time"
                        name="visiting_time"
                        onChange={handleChange}
                        className="input"
                    /> */}

                    <div className="relative">
                        <label className="text-sm text-label">Visiting Time</label>
                        <input
                            type="time"
                            name="visiting_time"
                            onChange={handleChange}
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                            placeholder="Select Time"
                        />
                    </div>

                    {loading ? <Loader /> : (
                        <button className="w-full bg-primary text-white py-3 rounded-full">
                            Submit
                        </button>
                    )}

                </form>
            </div>
        </div>
    );
};