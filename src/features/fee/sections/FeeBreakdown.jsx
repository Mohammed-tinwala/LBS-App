import React, { useEffect, useState } from 'react'
import FeeBreakdownLoader from '../../../components/loader/FeeBreakdownLoader'
import { Bus, ChevronRight, CreditCard, FlaskConical, Palette } from 'lucide-react'

const FeeBreakdown = ({ session }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000); // ⏱️ 2 seconds

        return () => clearTimeout(timer); // cleanup
    }, []);

    if (loading) {
        return <FeeBreakdownLoader />;
    }

    return (
        <div className='container-padding'>
            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Fee Breakdown</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            <div className='bg-primary/30 p-4 flex flex-col gap-2 rounded-2xl'>
                <div className='w-full flex items-center justify-between p-2 bg-white rounded-md'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-[#B1FFB1] rounded-md'>
                            <CreditCard size={24} className='text-[#08B949]' />
                        </div>
                        <h3 className='text-[14px] font-medium'>Tuition Fee: ₹ 20,000</h3>
                    </div>
                    <ChevronRight size={24} className='text-black' />
                </div>
                <div className='w-full flex items-center justify-between p-2 bg-white rounded-md'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-[#FFF5A8] rounded-md'>
                            <Bus size={24} className='text-[#EAB308]' />
                        </div>
                        <h3 className='text-[14px] font-medium'>Travelling Fee: ₹ 10,000</h3>
                    </div>
                    <ChevronRight size={24} className='text-black' />
                </div>
                <div className='w-full flex items-center justify-between p-2 bg-white rounded-md'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-[#CCA8FF] rounded-md'>
                            <FlaskConical size={24} className='text-primary-dark' />
                        </div>
                        <h3 className='text-[14px] font-medium'>Lab Fee: ₹ 5,000</h3>
                    </div>
                    <ChevronRight size={24} className='text-black' />
                </div>
                <div className='w-full flex items-center justify-between p-2 bg-white rounded-md'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-[#B3CEFF] rounded-md'>
                            <Palette size={24} className='text-[#065DFF]' />
                        </div>
                        <h3 className='text-[14px] font-medium'>Activity Fee: ₹ 10,000</h3>
                    </div>
                    <ChevronRight size={24} className='text-black' />
                </div>

            </div>
        </div>
    )
}

export default FeeBreakdown
