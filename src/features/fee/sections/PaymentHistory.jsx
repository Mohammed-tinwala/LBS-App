import { Download } from 'lucide-react'
import React from 'react'

const PaymentHistory = () => {
    return (
        <div className="container-padding">
            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Payment History</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            <div>
                <div className='flex items-center justify-between p-2 bg-primary/30 rounded-md mb-2 shadow-sm'>
                    <div className='flex items-center gap-2'>
                    <h3 className='text-md font-medium'>₹ 10,000</h3>
                    <p className='text-[14px] text-label font-normal'>Jan 5, 2025</p>
                    <p className='text-[14px] text-label font-normal'>UPI</p>
                    </div>
                    <Download size={16} />
                </div>
                <div className='flex items-center justify-between p-2 bg-primary/30 rounded-md mb-2 shadow-sm'>
                    <div className='flex items-center gap-2'>
                    <h3 className='text-md font-medium'>₹ 20,000</h3>
                    <p className='text-[14px] text-label font-normal'>Nov 2, 2025</p>
                    <p className='text-[14px] text-label font-normal'>Cash</p>
                    </div>
                    <Download size={16} />
                </div>
                <div className='flex items-center justify-between p-2 bg-primary/30 rounded-md mb-2 shadow-sm'>
                    <div className='flex items-center gap-2'>
                    <h3 className='text-md font-medium'>₹ 10,000</h3>
                    <p className='text-[14px] text-label font-normal'>July 12, 2025</p>
                    <p className='text-[14px] text-label font-normal'>UPI</p>
                    </div>
                    <Download size={16} />
                </div>
                <div className='flex items-center justify-between p-2 bg-primary/30 rounded-md mb-2 shadow-sm'>
                    <div className='flex items-center gap-2'>
                    <h3 className='text-md font-medium'>₹ 30,000</h3>
                    <p className='text-[14px] text-label font-normal'>March 2, 2025</p>
                    <p className='text-[14px] text-label font-normal'>Cash</p>
                    </div>
                    <Download size={16} />
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory
