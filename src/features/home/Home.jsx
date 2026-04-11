import React from 'react'
import HomeHeader from '../../components/common/headers/HomeHeader';
import QuickStats from './sections/QuickStats';
import HostelMenu from './sections/HostelMenu';
import HealthSection from './sections/HealthSection';
import CallingSection from './sections/CallingSection';
import AttendanceSection from './sections/AttendanceSection';
import GallerySection from './sections/GallerySection';
import PTMSlotSection from './sections/PTMSlotSection';
import EVideosSection from './sections/EVideosSection';
import GatePassSection from './sections/GatePassSection';

const Home = () => {
  return (
    <>
      <div className='flex flex-col gap-6 pb-28'>
        <HomeHeader name="Rohan Sharma" />
        <QuickStats />
        <HostelMenu />
        <HealthSection score={83} height={123} blood="AB+" />
        <EVideosSection />
        <CallingSection />
        <AttendanceSection />
        <GallerySection />
        <PTMSlotSection />
        <GatePassSection />
      </div>
    </>
  )
}

export default Home
