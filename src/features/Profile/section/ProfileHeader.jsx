import { Camera, Pen } from 'lucide-react'
import React from 'react'

const ProfileHeader = ({ about = "visible" }) => {
    return (
        <div className='container-padding'>
            <div className="flex gap-4 items-start justify-between">
                <div className='flex items-center gap-2'>
                    {/* Avatar */}
                    <div className="relative w-26 h-26 sm:w-26 sm:h-26 rounded-3xl overflow-hidden bg-[radial-gradient(circle,#9768D9,#62399C)] shrink-0">
                        <img
                            src="/images/profile.webp"
                            alt="student"
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute w-7.5 h-7.5 bottom-2 right-2 rounded-full bg-[#EE8924] flex items-center justify-center">
                            <Camera size={20} className='text-white' />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex items-center justify-between mb-2 w-full">
                        <div className="flex-start flex-col w-full">
                            <h2 className="text-[20px] font-semibold mb-1">Rohan Sharma</h2>
                            <div className='leading-5'>
                                <p className="text-sm text-label line-clamp-2">Enrollment no: <span className="font-semibold text-black">15654/26</span></p>
                                <p className="text-sm text-label line-clamp-2">Class: <span className="font-semibold text-black">VI-B</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-9 h-9 rounded-full bg-white border border-gray-400 flex-center">
                    <Pen size={18} className='text-black' />
                </div>
            </div>

            {about === "visible" && (
                <div>
                    <h3 className="text-md text-black font-medium mt-4">About:</h3>
                    <p className="text-[12px] text-black mt-1 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptas, eaque. Lorem ipsum dolor sit amet consectetur. Voluptas, eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.</p>
                </div>
            )}
        </div>
    )
}

export default ProfileHeader
