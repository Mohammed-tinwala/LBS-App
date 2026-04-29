import { GraduationCap, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";

const QuickStats = () => {
    return (
        <div className="container-padding">

            {/* Top Section */}
            <div className="mb-6">

                {/* Sub heading */}
                <div className="flex items-center justify-between w-full mb-4">
                    <h2 className="text-lg font-semibold">Daily Learning</h2>
                    <Link
                        to="/daily-learning"
                        className="text-xs text-gray-500 hover:text-gray-800"
                    >
                        See more
                    </Link>
                </div>

                <div className="flex gap-4 items-start">

                    {/* Avatar */}
                    <div className="w-30 h-30 sm:w-30 sm:h-30 rounded-3xl overflow-hidden bg-[radial-gradient(circle,#9768D9,#62399C)] shrink-0">
                        <img
                            src="/images/profile.webp"
                            alt="student"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1">

                        <div className="flex items-center justify-between mb-2">
                            <div className="flex-start flex-col w-3/4">
                                <p className="text-md font-medium mb-1">Map of the Path</p>
                                {/* <p className="text-sm text-label mb-1 line-clamp-2">Map of the Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure ratione aperiam quasi.</p> */}
                            </div>

                            {/* Action Icon */}
                            <div className="w-12 h-12 rounded-xl bg-primary/80 flex items-center justify-center">
                                <BookOpen className="text-white" size={20} />
                            </div>
                        </div>

                        {/* Timeline */}
                        <p className="text-sm text-label mb-1">Progress:</p>

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: "60%" }}
                            />
                        </div>

                        {/* Explanation */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-label">Performance:</p>

                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <span
                                        key={i}
                                        className={`text-lg ${i <= 3 ? "text-primary" : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>



                </div>

            </div>

            {/* Bottom Card */}
            <div className="w-full rounded-[28px] bg-[#E8DCF9] px-4 py-4 flex items-center justify-between shadow-sm">

                {/* Left */}
                <div className="flex items-center gap-4">

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-lime-300 flex items-center justify-center">
                        <GraduationCap size={24} className="text-black" />
                    </div>

                    {/* Text */}
                    <div>
                        <h3 className="text-lg font-semibold">Progress</h3>

                        <div className="flex items-center mt-1 gap-2 text-xs text-black/80">
                            <BookOpen size={16} />
                            <span>Learning Activity</span>
                        </div>
                    </div>

                </div>

                {/* Right */}
                <div className="text-right">
                    <h2 className="text-[24px] font-bold">67%</h2>
                    <p className="text-xs text-black/60">4 Subjects</p>
                </div>

            </div>

        </div>
    );
};

export default QuickStats;