import React from 'react'
import PageHeader from '../../components/common/headers/PageHeader';
import ProfileHeader from './section/ProfileHeader';
import PersonalInfo from './section/PersonalInfo';
import PaymentInfoSection from './section/PaymentInfoSection';
import GeneralInfoSection from './section/GeneralInfoSection';

const ProfileScreen = () => {
    return (
        
            <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>
                <PageHeader title="Profile Page" color="white" />
                <div className='flex flex-col gap-4 pb-12 bg-white py-4 rounded-t-[50px]'>
                    <ProfileHeader />
                    <PersonalInfo />
                    <PaymentInfoSection />
                    <GeneralInfoSection />
                </div>
            </div>
       
    )
}

export default ProfileScreen
