import { Bell, ChevronRight, Headphones, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'

const GeneralInfoSection = () => {
    return (
        <div className='container-padding'>
            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">General Info</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            <div className='bg-primary/30 p-4 flex flex-col gap-3 rounded-2xl'>
                <Link to='/notifications' className='w-full flex items-center justify-between'>
                    <div className='flex items-start gap-2'>
                        <Bell size={24} className='text-black' />
                        <h3 className='text-[14px] font-semibold'>Notification</h3>
                    </div>
                    <ChevronRight size={24} className='text-black' />
                </Link>
                <Link to='/security' className='w-full flex items-center justify-between'>
                    <div className='flex items-start gap-2'>
                        <Shield size={24} className='text-black' />
                        <h3 className='text-[14px] font-semibold'>Security</h3>
                    </div>
                    <ChevronRight size={24} className='text-black' />
                </Link>
                <Link to='/help-center' className='w-full flex items-center justify-between'>
                    <div className='flex items-start gap-2'>
                        <Headphones size={24} className='text-black' />
                        <h3 className='text-[14px] font-semibold'>Help Center</h3>
                    </div>
                    <ChevronRight size={24} className='text-black' />
                </Link>
            </div>
        </div>
    )
}

export default GeneralInfoSection
