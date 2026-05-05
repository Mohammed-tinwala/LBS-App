import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from './section/ProfileHeader';
import PersonalInfo from './section/PersonalInfo';
import PaymentInfoSection from './section/PaymentInfoSection';
import GeneralInfoSection from './section/GeneralInfoSection';
import StudentDocumentsSection from './section/StudentDocumentsSection';
import { useAuth } from '../../context/AuthContext';
import AppLoader from '../../components/loader/AppLoader';
import LogoutSection from './section/LogoutSection';
import HostelRoomSection from '../home/sections/HostelRoomSection';
import { fetchStudentDocuments } from '../../api/studentDocument';

const ProfileScreen = () => {

    const { student, profile, loading } = useAuth();

    const [showEmptyState, setShowEmptyState] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [docLoading, setDocLoading] = useState(false);

    // =========================
    // ⏳ Delay Empty State
    // =========================
    useEffect(() => {
        let timer;

        if (!loading && !profile) {
            timer = setTimeout(() => {
                setShowEmptyState(true);
            }, 1500);
        }

        return () => clearTimeout(timer);
    }, [loading, profile]);

    console.log("Fetching documents for student_id:", student.id);
    console.log("Fetching documents for class_id:", student.class_id);
    // =========================
    // 📄 Load Documents
    // =========================
    const loadDocuments = async () => {
        try {
            setDocLoading(true);

            const res = await fetchStudentDocuments({
                student_id: student?.id,
                class_id: student?.class_id
            });

            if (res.status) {
                setDocuments(res.data || []);
            } else {
                setDocuments([]);
            }

        } catch (err) {
            console.error("Documents error:", err);
            setDocuments([]);
        } finally {
            setDocLoading(false);
        }
    };

    useEffect(() => {
        if (profile?.id) {
            loadDocuments();
        }
    }, [profile]);

    // =========================
    // 🎯 CONDITIONAL RENDERING (AFTER HOOKS)
    // =========================

    if (loading) {
        return <AppLoader />;
    }

    if (!profile && showEmptyState) {
        return (
            <div className="flex-center min-h-screen">
                <p>No profile data found</p>
            </div>
        );
    }

    if (!profile) {
        return <AppLoader />;
    }

    // =========================
    // ✅ MAIN UI
    // =========================
    return (
        <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>

            <PageHeader title="Profile Page" color="white" />

            <div className='flex flex-col gap-4 pb-12 bg-white py-4 rounded-t-[50px]'>

                <ProfileHeader profile={profile} />
                <PersonalInfo profile={profile} />
                <PaymentInfoSection profile={profile} />

                <StudentDocumentsSection
                    profile={profile}
                    documents={documents}
                    loading={docLoading}
                    refreshDocuments={loadDocuments}
                />

                <HostelRoomSection />
                <GeneralInfoSection profile={profile} />
                <LogoutSection />

            </div>

        </div>
    );
};

export default ProfileScreen;