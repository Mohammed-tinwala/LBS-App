import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from './section/ProfileHeader';
import PersonalInfo from './section/PersonalInfo';
import PaymentInfoSection from './section/PaymentInfoSection';
import GeneralInfoSection from './section/GeneralInfoSection';
import StudentDocumentsSection from './section/StudentDocumentsSection';
import { useAuth } from '../../context/AuthContext';
import { getStudentProfile } from '../../api/studentApi';
import ProfileSkeleton from '../../components/loader/ProfileSkeleton';
import { toast } from 'react-hot-toast';
import LogoutSection from './section/LogoutSection';

const ProfileScreen = () => {

    const { student, profile, setProfile } = useAuth(); // ✅ use global profile

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);

                const res = await getStudentProfile(
                    student?.id,
                    student?.school_id
                );

                if (res.status) {
                    setProfile(res.data); // ✅ store globally
                } else {
                    toast.error("Failed to load profile");
                }

            } catch (err) {
                console.error(err);
                toast.error("Server error");
            } finally {
                setLoading(false);
            }
        };

        if (student?.id) {
            fetchProfile();
        }
    }, [student, setProfile]);

    // ✅ Loading UI
    if (loading) {
        return <ProfileSkeleton />;
    }

    // ✅ Safety fallback
    if (!profile) {
        return (
            <div className="flex-center h-screen">
                <p>No profile data found</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>

            <PageHeader title="Profile Page" color="white" />

            <div className='flex flex-col gap-4 pb-12 bg-white py-4 rounded-t-[50px]'>

                <ProfileHeader profile={profile} />
                <PersonalInfo profile={profile} />
                <PaymentInfoSection profile={profile} />
                <StudentDocumentsSection profile={profile} />
                <GeneralInfoSection profile={profile} />
                <LogoutSection />

            </div>

        </div>
    );
};

export default ProfileScreen;