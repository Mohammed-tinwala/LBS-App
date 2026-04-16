import React from 'react';
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from '../Profile/section/ProfileHeader';
import FeeSummary from './sections/FeeSummary';
import FeeBreakdown from './sections/FeeBreakdown';
import FeeInstallmentsSection from './sections/FeeInstallmentSection';
import PaymentHistory from './sections/PaymentHistory';

import { useAuth } from '../../context/AuthContext';
import ProfilePageSkeleton from '../../components/loader/ProfileSkeleton';

const FeeDetailScreen = () => {

    const { profile } = useAuth(); // ✅ FIX: get profile from context

    // console.log("Profile in FeeDetailScreen:", profile); // ✅ Debug log

    if (!profile) {
        return (
            <ProfilePageSkeleton />
        );
    }

    return (
        <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>

            <PageHeader title="Fee Detail Page" color="white" />

            <div className='relative flex flex-col gap-4 pb-32 bg-white py-4 rounded-t-[50px]'>

                {/* Profile Header */}
                <ProfileHeader about="hidden" profile={profile} />

                {/* Fee Sections */}
                <FeeSummary />
                <FeeBreakdown />
                <FeeInstallmentsSection />
                <PaymentHistory />

                {/* Fixed Pay Button */}
                <div className='fixed rounded-t-4xl bottom-3 right-0 left-0 z-50 w-full flex justify-center bg-linear-to-t from-primary to-primary-dark px-4 py-4'>

                    <button className='bg-white w-full text-black font-semibold py-3 px-4 rounded-2xl shadow-md'>
                        Pay ₹ 15000
                    </button>

                </div>

            </div>
        </div>
    );
};

export default FeeDetailScreen;