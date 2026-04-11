import { Activity, Ruler, Droplet, ArrowUpRight } from "lucide-react";

const HealthSection = () => {
    const score = 83;

    return (
        <div>

            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Medical Data</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Top Health Card */}
            <div className="rounded-[28px] p-4 bg-linear-to-r from-green-200 to-green-300 shadow-md flex flex-row sm:flex-row md:items-center md:justify-between gap-2">

                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-xl md:text-4xl font-bold text-green-800 mb-3">
                        Good Health
                    </h2>

                    <ul className="space-y-1 text-xs md:text-base mb-4">
                        <li>• Vitals Stable</li>
                        <li>• No Active Illness</li>
                        <li>• Vaccination Pending</li>
                    </ul>

                    <button className="bg-black text-white px-5 py-2 rounded-full text-xs flex items-center gap-2 w-fit">
                        Learn more <ArrowUpRight size={16} />
                    </button>
                </div>

                {/* Right Circular Score */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xs mb-1">Your Health Score</p>

                    <div className="relative w-28 h-28">

                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="56"
                                cy="56"
                                r="45"
                                stroke="#d1d5db"
                                strokeWidth="8"
                                fill="none"
                            />
                            <circle
                                cx="56"
                                cy="56"
                                r="45"
                                stroke="url(#grad)"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={2 * Math.PI * 45}
                                strokeDashoffset={2 * Math.PI * 45 * (1 - score / 100)}
                                strokeLinecap="round"
                            />

                            <defs>
                                <linearGradient id="grad">
                                    <stop offset="0%" stopColor="#ff4d4f" />
                                    <stop offset="50%" stopColor="#facc15" />
                                    <stop offset="100%" stopColor="#22c55e" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-bold">{score}</h3>
                            <p className="text-[10px] text-gray-600">Out of 100</p>
                        </div>
                    </div>

                    <p className="text-[10px] text-gray-500 mt-1">
                        *Calculated from test report
                    </p>
                </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

                {/* Height */}
                <div className="rounded-3xl bg-[#CFC3E6] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                            <Ruler size={24} />
                        </div>

                        <div>
                            <p className="text-sm text-black/70">Height</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold">
                        123 <span className="text-lg font-medium">cm</span>
                    </h2>
                </div>

                {/* Blood Group */}
                <div className="rounded-3xl bg-[#E6B6C1] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                            <Droplet size={24} />
                        </div>

                        <div>
                            <p className="text-sm text-black/70">Blood Group</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold">AB+</h2>
                </div>

            </div>

        </div>
    );
};

export default HealthSection;