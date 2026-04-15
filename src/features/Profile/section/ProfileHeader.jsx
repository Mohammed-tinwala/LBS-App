import { Camera, Pen } from 'lucide-react'
import React from 'react'

const ProfileHeader = ({ profile, about = "visible" }) => {

    const student = profile?.student;

    // ✅ Format Name
    const formatName = (name) => {
        if (!name) return "";
        return name
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // ✅ Avatar fallback
    const avatar = student?.image_url
        ? student.image_url
        : "/images/profile.webp";

    return (
        <div className='container-padding'>
            <div className="flex gap-4 items-start justify-between">

                <div className='flex items-center gap-2'>

                    {/* Avatar */}
                    <div className="relative w-26 h-26 rounded-3xl overflow-hidden 
                                    bg-[radial-gradient(circle,#9768D9,#62399C)] shrink-0">
                        <img
                            src="/images/profile.webp"
                            alt="student"
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute w-7.5 h-7.5 bottom-2 right-2 rounded-full bg-[#EE8924] flex-center">
                            <Camera size={20} className='text-white' />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col w-full">

                        {/* ✅ Name from API */}
                        <h2 className="text-[20px] font-semibold mb-1">
                            {formatName(student?.name) || "Guest"}
                        </h2>

                        <div className='leading-5'>
                            {/* ✅ Enrollment */}
                            <p className="text-sm text-label">
                                Enrollment no:{" "}
                                <span className="font-semibold text-black">
                                    {student?.enrollment || "--"}
                                </span>
                            </p>

                            {/* ✅ Roll no */}
                            <p className="text-sm text-label">
                                Roll no:{" "}
                                <span className="font-semibold text-black">
                                    {student?.roll_no || "--"}
                                </span>
                            </p>

                            {/* ✅ Correct Class */}
                            <p className="text-sm text-label">
                                Class:{" "}
                                <span className="font-semibold text-black">
                                    {profile?.class?.name || "N/A"}
                                </span>
                            </p>
                        </div>

                    </div>
                </div>

                {/* Edit Button */}
                <div className="w-9 h-9 rounded-full bg-white border border-gray-400 flex-center">
                    <Pen size={18} className='text-black' />
                </div>
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

export default ProfileHeader