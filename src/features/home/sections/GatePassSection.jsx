import { useState } from "react";
import { ArrowUpRight, Plus, Clock, CheckCircle2 } from "lucide-react";

const GatePassSection = () => {
    const [open, setOpen] = useState(false);

    const requests = [
        { id: 1, reason: "Home Visit", status: "Approved", date: "12 Apr" },
        { id: 2, reason: "Market", status: "Pending", date: "10 Apr" },
    ];

    return (
        <div className="container-padding">

            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Gate Pass Req</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Card */}
            <div className="relative rounded-[28px] p-5 bg-gradient-to-br from-[#0F172A] to-[#020617] text-white">

                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Gate Pass</h2>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowUpRight />

                    </div>
                </div>

                {/* Requests */}
                <div className="space-y-3 mb-4">
                    {requests.map((req) => (
                        <div
                            key={req.id}
                            className="flex justify-between bg-white/10 px-3 py-2 rounded-xl"
                        >
                            <div>
                                <p className="text-sm">{req.reason}</p>
                                <p className="text-xs text-white/60">{req.date}</p>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                {req.status === "Approved" ? (
                                    <CheckCircle2 className="text-green-400" size={14} />
                                ) : (
                                    <Clock className="text-yellow-400" size={14} />
                                )}
                                {req.status}
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
                    Apply New Gate Pass
                </button>

            </div>

            {/* Modal */}
            {open && <GatePassModal onClose={() => setOpen(false)} />}

        </div>
    );
};

export default GatePassSection;





/* ================= MODAL ================= */

const GatePassModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-9990">

            <div className="w-full max-w-md bg-white rounded-t-[28px] p-5">

                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">New Gate Pass</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <form className="space-y-4">

                    <input
                        type="text"
                        placeholder="Reason"
                        className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-2 outline-none focus:ring-2 focus:ring-primary/40'
                    />


                    <input
                        type="date"
                        className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                        placeholder="Select Date"
                    />

                    <input
                        type="time"
                        className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                        placeholder="Select Time"
                    />

                    <button className="w-full mt-3 bg-primary text-white py-3 rounded-full">
                        Submit
                    </button>

                </form>

            </div>

        </div>
    );
};