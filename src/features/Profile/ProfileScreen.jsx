import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from './section/ProfileHeader';
import PersonalInfo from './section/PersonalInfo';
import PaymentInfoSection from './section/PaymentInfoSection';
import GeneralInfoSection from './section/GeneralInfoSection';
import StudentDocumentsSection from './section/StudentDocumentsSection';
import { useAuth } from '../../context/AuthContext';
// import ProfileSkeleton from '../../components/loader/ProfileSkeleton';
import AppLoader from '../../components/loader/AppLoader';
import LogoutSection from './section/LogoutSection';
import HostelRoomSection from '../home/sections/HostelRoomSection';

const ProfileScreen = () => {

    const { profile, loading } = useAuth();

    const [showEmptyState, setShowEmptyState] = useState(false);

    // ✅ Delay showing "No data"
    useEffect(() => {
        let timer;

        if (!loading && !profile) {
            timer = setTimeout(() => {
                setShowEmptyState(true);
            }, 1500); // ⏱️ 1.5 sec delay
        }

        return () => clearTimeout(timer);
    }, [loading, profile]);

    // ✅ Still loading → show skeleton
    if (loading) {
        return <AppLoader />;
    }

    // ✅ After delay → show empty state
    if (!profile && showEmptyState) {
        return (
            <div className="flex-center h-screen">
                <p>No profile data found</p>
            </div>
        );
    }

    // ✅ While waiting for delay → show skeleton
    if (!profile) {
        return <AppLoader />;
    }

    return (
        <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>

            <PageHeader title="Profile Page" color="white" />

            <div className='flex flex-col gap-4 pb-12 bg-white py-4 rounded-t-[50px]'>

                <ProfileHeader profile={profile} />
                <PersonalInfo profile={profile} />
                <PaymentInfoSection profile={profile} />
                <StudentDocumentsSection profile={profile} />
                <HostelRoomSection />
                <GeneralInfoSection profile={profile} />
                <LogoutSection />

            </div>

        </div>
    );
};

export default ProfileScreen;