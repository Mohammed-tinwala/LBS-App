import { Mail, User } from 'lucide-react'
import React from 'react'

const PersonalInfo = () => {
    return (
        <div className='container-padding'>
            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Personal Info</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            <div className='bg-primary/30 p-4 rounded-2xl'>
                <div className='flex items-center gap-2 mb-3'>
                    <User size={24} className='text-black' />
                    <div className='flex flex-col items-start'>
                        <span className='text-label text-[12px]'>Father's name:</span>
                        <h3 className='text-[14px] font-semibold'>Rajesh Sharma</h3>
                    </div>
                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <User size={24}className='text-black' />
                    <div className='flex flex-col items-start'>
                        <span className='text-label text-[12px]'>Mother's name:</span>
                        <h3 className='text-[14px] font-semibold'>Priya Sharma</h3>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <Mail size={24}className='text-black' />
                    <div className='flex flex-col items-start'>
                        <span className='text-label text-[12px]'>Email:</span>
                        <h3 className='text-[14px] font-semibold'>rajesh.sharma@example.com</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo
