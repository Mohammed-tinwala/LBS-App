import React, { useEffect, useState } from 'react'
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
import AcademicsSection from './sections/AcademicsSection';

import { useAuth } from '../../context/AuthContext'
import { getMedicalData } from '../../api/medicalApi'
import { toast } from 'react-hot-toast'

const Home = () => {

  const [medical, setMedical] = useState(null);
  const [loadingMedical, setLoadingMedical] = useState(true);

  const { student } = useAuth();
  console.log("Student Data in Home:", student.id); // Debugging line

  useEffect(() => {
    const fetchMedical = async () => {
      try {
        setLoadingMedical(true);

        const res = await getMedicalData(student?.id);

        if (res.status) {
          setMedical(res.medical);
        } else {
          toast.error(res.message || "No medical data");
        }

      } catch (err) {
        console.error(err);
        toast.error("Failed to load medical data");
      } finally {
        setLoadingMedical(false);
      }
    };

    if (student?.id) {
      fetchMedical();
    }
  }, [student]);


  return (
    <>
      <div className='flex flex-col gap-6 pt-4 pb-28'>
        <HomeHeader name="Rohan Sharma" />
        <QuickStats />
        <AcademicsSection />
        <HostelMenu />
        <HealthSection
          score={medical?.overall_health_score} // optional for now
          height={medical?.student_height}
          weight={medical?.student_weight}
          blood={medical?.student_bloodgroup}
          diseases={medical?.student_chronic_disease_info}
          medicines={medical?.student_medicine_intake_info}
        />
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
