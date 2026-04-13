import React from 'react'
import { ChevronLeft, ChevronRight, FileBox, Presentation } from "lucide-react";

const PTMSlotSection = () => {

    const meetingDates = [10, 13, 23, 26]; // 🔴 Absent days

    const days = [
        27, 28, 1, 2, 3, 4,
        5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28,
        29, 30, 31, 1, 2, 3
    ];


    return (
        <div className='container-padding'>

            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">PTM Slot Booking</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Calendar Card */}
            <div className="bg-[#EDEAEA] rounded-[28px] p-5 shadow-sm">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        March <span className="text-2xl font-bold">2026</span>
                    </h2>

                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex-center rounded-full bg-white shadow">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-8 h-8 flex-center rounded-full bg-white shadow">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-7 gap-y-4 text-center">

                    {days.map((day, index) => {
                        const isInactive = index < 2 || index > 32;
                        const isAbsent = meetingDates.includes(day) && !isInactive;

                        return (
                            <div key={index} className="flex justify-center">

                                <div
                                    className={`w-10 h-10 flex items-center justify-center text-sm rounded-full
                    ${isInactive ? "text-gray-400" : "text-black"}
                    ${isAbsent ? "bg-[#8d52fa] text-white font-semibold" : ""}
                  `}
                                >
                                    {day}
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>

            <div className="flex items-center justify-between w-full mb-4 mt-4">
                <h2 className="text-lg font-semibold">Today's Events</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {/* Calling Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">

                {/* Calling card 1 */}
                <div className="rounded-3xl bg-[#CFC3E6] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-2 h-2 rounded-full overflow-hidden bg-[#8d52fa] flex items-center justify-center">
                        </div>

                        <div className='flex flex-col flex-start'>
                            <p className="text-sm font-semibold">Parent's Teacher Meeting</p>
                            <div className='flex items-center text-xs gap-4'>
                                <div className='flex items-center gap-2'>
                                    9:00 AM - 10:30 AM
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                        <Presentation size={18} />
                    </div>
                </div>

                {/* Calling card 2 */}
                <div className="rounded-3xl bg-[#abdfb4] p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">

                        <div className="w-2 h-2 rounded-full overflow-hidden bg-[#4aeb65] flex items-center justify-center">
                        </div>

                        <div className='flex flex-col flex-start'>
                            <p className="text-sm font-semibold">Result Day</p>
                            <div className='flex items-center text-xs gap-4'>
                                <div className='flex items-center gap-2'>
                                    2:00 PM - 3:00 PM
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                        <FileBox size={18} />
                    </div>
                </div>

                
            </div>

        </div>
    )
}

export default PTMSlotSection
