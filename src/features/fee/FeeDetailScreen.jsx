import React from 'react'
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from '../Profile/section/ProfileHeader';
import FeeSummary from './sections/FeeSummary';
import FeeBreakdown from './sections/FeeBreakdown';
import FeeInstallmentsSection from './sections/FeeInstallmentSection';
import PaymentHistory from './sections/PaymentHistory';

const FeeDetailScreen = () => {
    return (
        <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>
            <PageHeader title="Fee Detail Page" color="white" />
            <div className=' relative flex flex-col gap-4 pb-12 bg-white py-4 rounded-t-[50px]'>
                <ProfileHeader about="hidden" />
                <FeeSummary />
                <FeeBreakdown />
                <FeeInstallmentsSection />
                <PaymentHistory />

                <div className='fixed rounded-t-4xl bottom-3 right-0 left-0 z-999 w-full h-24 flex justify-center mt-4 bg-linear-to-t from-primary to-primary-dark px-4 py-6'>
                    <button
                        className='bg-white w-full text-black font-semibold py-2 px-4 rounded-2xl'
                    >
                        Pay ₹ 15000
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeeDetailScreen
