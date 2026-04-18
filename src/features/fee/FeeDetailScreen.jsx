import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from '../Profile/section/ProfileHeader';
import FeeSummary from './sections/FeeSummary';
import FeeBreakdown from './sections/FeeBreakdown';
import FeeInstallmentsSection from './sections/FeeInstallmentSection';
import PaymentHistory from './sections/PaymentHistory';

import { useAuth } from '../../context/AuthContext';
import { fetchFeeDetails } from '../../api/feeDetailApi';
import ProfilePageSkeleton from '../../components/loader/ProfileSkeleton';

const FeeDetailScreen = () => {

    const { profile, student } = useAuth(); // ✅ FIX: get profile from context

    const [feeDetails, setFeeDetails] = useState(null);
    const [feeLoading, setFeeLoading] = useState(false);

    // console.log("Profile in FeeDetailScreen:", profile); // ✅ Debug log

    const loadFeeDetails = async () => {
        try {
            setFeeLoading(true);

            const res = await fetchFeeDetails({
                enrollment: student?.enrollment,
                school: student?.school_id
            });

            console.log("Fee API Response:", res);

            if (res.status) {
                const data = res.data;

                // ✅ Normalize values (VERY IMPORTANT)
                setFeeDetails({
                    school: data.school,
                    netPayable: Number(data.net_payable) || 0,
                    totalPaid: Number(data.total_paid) || 0,
                    remainingFee: Number(data.remaining_fee) || 0,
                    merchantKey: data.merchant_key,
                    merchantName: data.merchant_name
                });
            } else {
                toast.error(res.message || "No fee data found");
            }

        } catch (err) {
            console.error(err);
            toast.error("Failed to load fee details");
        } finally {
            setFeeLoading(false);
        }
    };

    useEffect(() => {
        if (student?.enrollment && student?.school_id) {
            loadFeeDetails();
        }
    }, [student]);

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
                <FeeSummary
                    feeDetails={feeDetails}
                    loading={feeLoading}
                />
                <FeeBreakdown />
                <FeeInstallmentsSection />
                <PaymentHistory />

                {/* Fixed Pay Button */}
                {/* <div className='fixed z-9999 rounded-t-4xl bottom-3 right-0 left-0 w-full flex justify-center bg-linear-to-t from-primary to-primary-dark px-4 py-4'>

                    <button className='bg-white w-full text-black font-semibold py-3 px-4 rounded-2xl shadow-md'>
                        Pay ₹ 15000
                    </button>

                </div> */}

            </div>
        </div>
    );
};

export default FeeDetailScreen;