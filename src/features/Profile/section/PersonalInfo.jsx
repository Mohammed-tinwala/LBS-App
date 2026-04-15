import { Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfo = ({ profile }) => {

    const student = profile?.student;

    // ✅ Format Name Function
    const formatName = (name) => {
        if (!name) return "";
        return name
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className='container-padding'>
            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Personal Info</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            <div className='bg-primary/30 p-4 rounded-2xl'>

                {/* Father */}
                <div className='flex items-center gap-2 mb-3'>
                    <User size={24} />
                    <div>
                        <span className='text-label text-[12px]'>Father's name:</span>
                        <h3 className='text-[14px] font-semibold'>
                            {formatName(student?.father_name) || "--"}
                        </h3>
                    </div>
                </div>

                {/* Mother */}
                <div className='flex items-center gap-2 mb-3'>
                    <User size={24} />
                    <div>
                        <span className='text-label text-[12px]'>Mother's name:</span>
                        <h3 className='text-[14px] font-semibold'>
                            {formatName(student?.mother_name) || "--"}
                        </h3>
                    </div>
                </div>

                {/* Mobile */}
                <div className='flex items-center gap-2'>
                    <Phone size={24} />
                    <div>
                        <span className='text-label text-[12px]'>Mobile:</span>
                        <h3 className='text-[14px] font-semibold'>
                            {student?.mobile || "--"}
                        </h3>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PersonalInfo