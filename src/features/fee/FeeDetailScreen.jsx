import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { createPortal } from 'react-dom';

import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from '../Profile/section/ProfileHeader';
import FeeSummary from './sections/FeeSummary';
import FeeBreakdown from './sections/FeeBreakdown';
import FeeInstallmentsSection from './sections/FeeInstallmentSection';
import PaymentHistory from './sections/PaymentHistory';

import { useAuth } from '../../context/AuthContext';
import { fetchFeeDetails } from '../../api/feeDetailApi';

const FeeDetailScreen = () => {

    const { profile, student } = useAuth();

    const [feeDetails, setFeeDetails] = useState(null);
    const [feeLoading, setFeeLoading] = useState(false);
    const [showEmptyState, setShowEmptyState] = useState(false);

    const loadFeeDetails = useCallback(async () => {
        if (!student?.id) return;

        try {
            setFeeLoading(true);

            const res = await fetchFeeDetails({
                student_id: student.id,
                school_id: student.school_id
            });

            if (!res || !res.sessions || res.sessions.length === 0) {
                setFeeDetails(null);
                return;
            }

            const totalAmount = res.sessions.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
            const totalPaid = res.sessions.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
            const totalDue = res.sessions.reduce((sum, s) => sum + (s.dueAmount || 0), 0);

            setFeeDetails({
                school: res.schoolName,
                enrollment: res.enrollment,
                totalAmount,
                totalPaid,
                remainingFee: totalDue,
                sessions: res.sessions
            });

        } catch (err) {
            console.error(err);
            toast.error("Failed to load fee details");
        } finally {
            setFeeLoading(false);
        }
    }, [student?.id, student?.school_id]);

    useEffect(() => {
        loadFeeDetails();
    }, [loadFeeDetails]);

    // 🔥 Delay empty state
    useEffect(() => {
        let timer;

        if (!feeLoading && !feeDetails) {
            timer = setTimeout(() => {
                setShowEmptyState(true);
            }, 1500);
        }

        return () => clearTimeout(timer);
    }, [feeLoading, feeDetails]);

    return (
        <div className='flex flex-col bg-primary pt-4 min-h-screen'>

            <PageHeader title="Fee Detail Page" color="white" />

            {/* ✅ Main Content */}
            <div className='flex flex-col gap-4 pb-40 bg-white py-4 rounded-t-[50px]'>

                <ProfileHeader about="hidden" profile={profile} />

                <FeeSummary
                    feeDetails={feeDetails}
                    loading={feeLoading}
                />

                <FeeBreakdown sessions={feeDetails?.sessions} />

                <FeeInstallmentsSection sessions={feeDetails?.sessions} />

                <PaymentHistory sessions={feeDetails?.sessions} />

                {/* Empty State */}
                {!feeLoading && !feeDetails && showEmptyState && (
                    <div className="text-center text-gray-400 text-sm mt-4">
                        No fee data available
                    </div>
                )}

                {/* Subtle loading */}
                {!feeLoading && !feeDetails && !showEmptyState && (
                    <div className="text-center text-gray-300 text-xs mt-4 animate-pulse">
                        Fetching fee data...
                    </div>
                )}
            </div>

            {feeDetails?.remainingFee > 0 &&
                createPortal(
                    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-[9999] px-4 py-3">
                        <button
                            onClick={() => console.log("Proceed to payment")}
                            className="w-full bg-primary text-white font-semibold py-3 rounded-xl text-lg"
                        >
                            💳 Pay ₹{feeDetails?.remainingFee}
                        </button>
                    </div>,
                    document.body
                )
            }
        </div>
    );
};

export default FeeDetailScreen;