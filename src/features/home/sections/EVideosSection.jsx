import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EVideosSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container-padding">

      {/* Sub heading */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-lg font-semibold">All Videos</h2>
        <Link to='/e-videos' className="text-xs font-normal">See more</Link>
      </div>

      <div
        onClick={() => navigate("/e-videos")}
        className="relative rounded-[28px] p-5 overflow-hidden cursor-pointer
        bg-linear-to-br from-[#6C63FF] via-[#7F7CFF] to-[#5A54E8] text-white shadow-md"
      >

        {/* Glow Effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />

        {/* Top Right Arrow */}
        <Link to='/e-videos' className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <ArrowUpRight size={18} />
        </Link>

        {/* Content */}
        <div className="relative z-10">

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-3">
            <PlayCircle size={28} />
            <h2 className="text-xl font-semibold">
              School Videos
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm text-white/90 mb-4 max-w-[85%]">
            Explore recorded lectures, revision videos, and expert sessions anytime.
          </p>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Continue Learning</span>
              <span>60%</span>
            </div>

            <div className="w-full h-1.5 bg-white/30 rounded-full">
              <div className="w-[60%] h-full bg-white rounded-full" />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent parent click
              navigate("/e-videos");
            }}
            className="mt-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 w-fit"
          >
            <PlayCircle size={16} />
            Continue Watching
          </button>

        </div>

      </div>

    </div>
  );
};

export default EVideosSection;