import { Camera, Pen } from 'lucide-react'
import React from 'react'
import { useAuth } from '../../../context/AuthContext';

const ProfileHeader = ({ profile, about = "visible" }) => {

    const { student: localStudent } = useAuth();

    const student = profile?.student || localStudent || {};
    const className = profile?.class?.name || localStudent?.class || "N/A";

    const formatName = (name) => {
        if (!name) return "";
        return name
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const avatar =  "/images/profile.webp";

    // ✅ 🔥 CUSTOM SKELETON
    if (!student || Object.keys(student).length === 0) {
        return (
            <div className="container-padding">

                <div className="flex gap-4 items-center animate-pulse">

                    {/* Avatar Skeleton */}
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />

                    {/* Text Skeleton */}
                    <div className="flex flex-col gap-3 w-full">

                        <div className="h-5 w-40 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />

                        <div className="flex flex-col gap-2">
                            <div className="h-3 w-32 rounded bg-gray-200" />
                            <div className="h-3 w-24 rounded bg-gray-200" />
                            <div className="h-3 w-28 rounded bg-gray-200" />
                        </div>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className='container-padding'>
            <div className="flex gap-4 items-start justify-between">

                <div className='flex items-center gap-2'>

                    {/* Avatar */}
                    <div className="relative w-26 h-26 rounded-3xl overflow-hidden 
                                    bg-[radial-gradient(circle,#9768D9,#62399C)] shrink-0">
                        <img
                            src={avatar}
                            alt="student"
                            className="w-full h-full object-contain"
                        />
                        {/* <div className="absolute w-7.5 h-7.5 bottom-2 right-2 rounded-full bg-[#EE8924] flex-center">
                            <Camera size={20} className='text-white' />
                        </div> */}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col w-full">

                        <h2 className="text-[20px] font-semibold mb-1">
                            {formatName(student?.name) || "Guest"}
                        </h2>

                        <div className='leading-5'>
                            <p className="text-sm text-label">
                                Enrollment no:{" "}
                                <span className="font-semibold text-black">
                                    {student?.enrollment || "--"}
                                </span>
                            </p>

                            <p className="text-sm text-label">
                                Roll no:{" "}
                                <span className="font-semibold text-black">
                                    {student?.roll_no || "--"}
                                </span>
                            </p>

                            <p className="text-sm text-label">
                                Class:{" "}
                                <span className="font-semibold text-black">
                                    {className}
                                </span>
                            </p>
                        </div>

                    </div>
                </div>

                {/* Edit Button */}
                {/* <div className="w-9 h-9 rounded-full bg-white border border-gray-400 flex-center">
                    <Pen size={18} className='text-black' />
                </div> */}
            </div>

            {/* About Section */}
            {about === "visible" && (
                <div>
                    <h3 className="text-md text-black font-medium mt-4">About:</h3>
                    <p className="text-[12px] text-black mt-1 line-clamp-3">
                        {student?.about || "No information available."}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProfileHeader;