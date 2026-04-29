import { Activity, Ruler, Droplet, ArrowUpRight, Weight, ActivityIcon } from "lucide-react";

const HealthSection = ({ height, weight, blood, diseases, medicines }) => {

    // 🧮 Calculate BMI
    const bmi = height && weight
        ? (weight / ((height / 100) ** 2)).toFixed(1)
        : null;

    // 🎯 Health Logic
    let score = 0;
    let healthStatus = "No Data";
    let bgGradient = "from-gray-200 to-gray-300"; // default

    if (bmi) {
        if (bmi < 18.5) {
            score = 60;
            healthStatus = "Underweight";
            bgGradient = "from-yellow-200 to-yellow-300";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            score = 85;
            healthStatus = "Good Health";
            bgGradient = "from-green-200 to-green-300";
        } else if (bmi >= 25 && bmi <= 29.9) {
            score = 70;
            healthStatus = "Overweight";
            bgGradient = "from-orange-200 to-orange-300";
        } else {
            score = 50;
            healthStatus = "Obese";
            bgGradient = "from-red-200 to-red-300";
        }
    }

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Medical Data</h2>
                {/* <p className="text-xs font-normal">See more</p> */}
            </div>

            {/* Top Card */}
            <div className={`rounded-[28px] p-4 bg-linear-to-r ${bgGradient} shadow-md flex flex-row gap-2`}>

                {/* Left Content */}
                <div className="flex-1 flex flex-col items-start justify-center">
                    <h2 className="text-xl md:text-4xl font-bold mb-3">
                        {healthStatus}
                    </h2>

                    {/* Diseases */}
                    {diseases && (
                        <p className="text-xs mb-1">
                            ⚠️ Diseases: {diseases}
                        </p>
                    )}

                    {/* Medicines */}
                    {medicines && (
                        <p className="text-xs mb-3">
                            💊 Medicines: {medicines}
                        </p>
                    )}

                    {/* <button className="bg-black text-white px-5 py-2 rounded-full text-xs flex items-center gap-2 w-fit">
                        Learn more <ArrowUpRight size={16} />
                    </button> */}
                </div>

                {/* Right Score */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xs mb-1">Health Score</p>

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
                        *Based on BMI
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
                        <p className="text-sm text-black/70">Height</p>
                    </div>

                    <h2 className="text-3xl font-bold">
                        {height || "--"} <span className="text-lg">CM</span>
                    </h2>
                </div>

                {/* Weight */}
                <div className="rounded-3xl bg-[#F8D5C1] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                            <Weight size={24} />
                        </div>
                        <p className="text-sm text-black/70">Weight</p>
                    </div>

                    <h2 className="text-3xl font-bold">
                        {weight || "--"} <span className="text-lg">KG</span>
                    </h2>
                </div>

                {/* BMI */}
                <div className="rounded-3xl bg-[#F1EB86] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                            <ActivityIcon size={24} />
                        </div>
                        <p className="text-sm text-black/70">BMI</p>
                    </div>

                    <h2 className="text-3xl font-bold">
                        {bmi || "--"}
                    </h2>
                </div>

                {/* Blood */}
                <div className="rounded-3xl bg-[#E6B6C1] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                            <Droplet size={24} />
                        </div>
                        <p className="text-sm text-black/70">Blood Group</p>
                    </div>

                    <h2 className="text-3xl font-bold">
                        {blood || "--"}
                    </h2>
                </div>

            </div>

        </div>
    );
};

export default HealthSection;