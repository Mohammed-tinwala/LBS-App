import React from 'react'
import { Clock, Timer, TrendingUp, PhoneMissedIcon, PhoneIcon, Video } from 'lucide-react'

const CallingSection = () => {
    return (
        <div className='container-padding'>
            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Calling Request</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Top Calling Card */}
            <div className="rounded-[28px] p-4 bg-linear-to-r from-primary to-primary-dark shadow-md flex flex-row sm:flex-row md:items-center md:justify-between gap-2 text-white">

                {/* Calling card */}
                <div className="flex-1">
                    <div className='flex items-center justify-between w-full mb-2'>
                        <h3 className='text-[14px] font-semibold'>Total Calling Minutes</h3>
                        <span className='text-[10px] text-[#d3d3d3] font-semibold'><Clock className="w-4 h-4 inline mr-1" /> Last 01 months</span>
                    </div>

                    <div className='flex items-center gap-2 leading-tight mb-2'>
                        <div className='flex flex-col'>
                            <h2 className="text-[48px] md:text-4xl font-bold">
                                238:23
                            </h2>
                            <p className='text-[10px] font-semibold text-[#d3d3d3] leading-[-12px]'> <TrendingUp className="w-4 h-4 inline mr-1" /> 15% vs previous month</p>
                        </div>

                        <div className='flex flex-col text-[#d3d3d3] '>
                            <span className='text-[12px] font-semibold'>Min: 00:01 minutes</span>
                            <span className='text-[12px] font-semibold'>Max: 23:06 minutes</span>
                        </div>
                    </div>


                    <h3 className='text-[14px] font-semibold mt-2'>Remainig Calling Minutes</h3>

                    {/* Timeline */}
                    <div className='flex items-center justify-between w-full'>
                        <p className="text-sm font-semibold mb-1 mt-2">50% Completed</p>
                        <span className='text-[10px] text-[#d3d3d3] font-semibold'><Timer className="w-4 h-4 inline mr-1" /> 119:12 mins left</span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-primary-dark rounded-full"
                            style={{ width: "60%" }}
                        />
                    </div>
                </div>


            </div>

            {/* Calling Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">

                {/* Calling card 1 */}
                <div className="rounded-3xl bg-[#CFC3E6] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <img src="/images/daddy.webp" className='object-cover w-full h-full' alt="daddy" />
                        </div>

                        <div className='flex flex-col flex-start'>
                            <p className="text-lg font-semibold">Daddy</p>
                            <div className='flex items-center text-xs gap-4'>
                                <div className='flex items-center gap-2'>

                                    <PhoneMissedIcon size={12} />
                                    Mobile  |  11:87 PM
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <PhoneIcon size={18} />
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <Video size={18} />
                        </div>
                    </div>
                </div>

                {/* Calling card 2 */}
                <div className="rounded-3xl bg-[#E6B6C1] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <img src="/images/mummy.webp" className='object-cover w-full h-full' alt="mummy" />
                        </div>

                        <div className='flex flex-col flex-start'>
                            <p className="text-lg font-semibold">Mummy</p>
                            <div className='flex items-center text-xs gap-4'>
                                <div className='flex items-center gap-2'>

                                    <PhoneMissedIcon size={12} />
                                    Mobile  |  11:87 PM
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <PhoneIcon size={18} />
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <Video size={18} />
                        </div>
                    </div>
                </div>

                {/* Calling card 3 */}
                <div className="rounded-3xl bg-[#abdfb4] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <img src="/images/gaurdian.webp" className='object-cover w-full h-full' alt="guardian" />
                        </div>

                        <div className='flex flex-col flex-start'>
                            <p className="text-lg font-semibold">Guardian</p>
                            <div className='flex items-center text-xs gap-4'>
                                <div className='flex items-center gap-2'>

                                    <PhoneMissedIcon size={12} />
                                    Mobile  |  11:87 PM
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <PhoneIcon size={18} />
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <Video size={18} />
                        </div>
                    </div>
                </div>

                {/* Calling card 4 */}
                <div className="rounded-3xl bg-[#f0c7b1] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <img src="/images/mummy.webp" className='object-cover w-full h-full' alt="mummy" />
                        </div>

                        <div className='flex flex-col flex-start'>
                            <p className="text-lg font-semibold">Mummy</p>
                            <div className='flex items-center text-xs gap-4'>
                                <div className='flex items-center gap-2'>

                                    <PhoneMissedIcon size={12} />
                                    Mobile  |  11:87 PM
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <PhoneIcon size={18} />
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <Video size={18} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CallingSection
