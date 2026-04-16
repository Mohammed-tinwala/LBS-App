import { ArrowUpRight, CreditCard, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const PaymentInfoSection = () => {
    const navigate = useNavigate();


    const handleFeeClick = () => {
        navigate('/fee-detail');
    }



    return (
        <div className='container-padding'>
            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Payment Info</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-2 justify-between'>
                <div className='bg-[#FFCECE] rounded-2xl p-4 '>
                    <div className='w-full flex items-center justify-between'>
                        <div className='flex flex-col items-start'>
                            <span className='text-[12px] text-label font-medium'>Your</span>
                            <h3 className='text-[18px] font-semibold text-black'>Fee Detail</h3>
                        </div>
                        <div className='w-12 h-12 bg-[#EF4444] rounded-full flex items-center justify-center'>
                            <CreditCard size={24} className='text-black' />
                        </div>
                    </div>

                    <p className='text-black w-3/4 text-[12px] line-clamp-2 font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nulla praesentium nesciunt!</p>
                    <button onClick={handleFeeClick} className='text-[12px] flex items-center gap-1 text-black font-medium mt-4'>
                        See More
                        <ArrowUpRight size={18} />
                    </button>
                </div>
                <div className='bg-[#B7FFD1] rounded-2xl p-4 '>
                    <div className='w-full flex items-center justify-between'>
                        <div className='flex flex-col items-start'>
                            <span className='text-[12px] text-label font-medium'>Your</span>
                            <h3 className='text-[18px] font-semibold text-black'>Contact Detail</h3>
                        </div>
                        <div className='w-12 h-12 bg-[#77FF77] rounded-full flex items-center justify-center'>
                            <Phone size={24} className='text-black' />
                        </div>
                    </div>

                    <p className='text-black w-3/4 text-[12px] line-clamp-2 font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nulla praesentium nesciunt!</p>
                    <button className='text-[12px] flex items-center gap-1 text-black font-medium mt-4'>
                        See More
                        <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfoSection
