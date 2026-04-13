import React from 'react'
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from '../Profile/section/ProfileHeader';
import FeeSummary from './sections/FeeSummary';
import FeeBreakdown from './sections/FeeBreakdown';
import FeeInstallmentsSection from './sections/FeeInstallmentSection';

const FeeDetailScreen = () => {
    return (
        <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>
            <PageHeader title="Fee Detail Page" color="white" />
            <div className='flex flex-col gap-4 pb-12 bg-white py-4 rounded-t-[50px]'>
                <ProfileHeader about="hidden" />
                <FeeSummary />
                <FeeBreakdown />
                <FeeInstallmentsSection />
            </div>
        </div>
    )
}

export default FeeDetailScreen
