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
import ENotesSummaryCard from './sections/ENotesSummaryCard';
import DailyLearningSummaryCard from './sections/DailyLearningSummaryCard';

import { useAuth } from '../../context/AuthContext'
import { getMedicalData } from '../../api/medicalApi'
import { fetchAdmitCard } from '../../api/admitCardApi';
import { fetchGatePass } from '../../api/gatePassApi';   // ✅ NEW IMPORT
import { fetchAllSubjects, fetchENotes } from '../../api/eNotesApi';
import { fetchDailyLearning } from '../../api/dailyLearningApi';
import { toast } from 'react-hot-toast'
import { all } from 'axios';

const Home = () => {

  const [medical, setMedical] = useState(null);
  const [admitCard, setAdmitCard] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]); // ✅ Store all subjects for E-Notes filtering
  const [eNotes, setENotes] = useState([]);
  const [dailyLearning, setDailyLearning] = useState([]);

  // ✅ Gate Pass states
  const [gatePasses, setGatePasses] = useState({
    pending: [],
    approved: [],
    rejected: [],
    all: []
  });

  const [loading, setLoading] = useState(true);

  const { student } = useAuth();

  // =========================
  // Medical API
  // =========================
  useEffect(() => {
    const fetchMedical = async () => {
      try {
        const res = await getMedicalData(student?.id);

        if (res.status) {
          setMedical(res.medical);
        } else {
          toast.error(res.message || "No medical data");
        }

      } catch (err) {
        // console.error(err);
        toast.error("Failed to load medical data");
      }
    };

    if (student?.id) fetchMedical();
  }, [student]);

  // =========================
  // Admit Card API
  // =========================
  useEffect(() => {
    const getAdmitCard = async () => {
      try {
        setLoading(true);
        const res = await fetchAdmitCard(student.id);

        if (res.status && res.admitcards.length > 0) {
          setAdmitCard(res.admitcards[0]);
        } else {
          setAdmitCard(null);
        }

      } catch (err) {
        console.error(err);
        setAdmitCard(null);
      } finally {
        setLoading(false);
      }
    };

    if (student?.id) getAdmitCard();
  }, [student]);

  // =========================
  // 🚀 Gate Pass API (NEW)
  // =========================
  const loadGatePass = async () => {
    try {
      const res = await fetchGatePass(student.id, 2);

      if (res.status) {
        setGatePasses({
          pending: res.pending || [],
          approved: res.approved || [],
          rejected: res.rejected || [],
          all: res.all || []
        });
      }
    } catch (err) {
      toast.error("Failed to load gate pass data");
    }
  };

  useEffect(() => {
    if (student?.id) loadGatePass();
  }, [student]);

  // =========================
  // 🚀 All Subjects Api (NEW)
  // =========================
  const loadAllSubjects = async () => {
    try {
      setLoading(true);
      const res = await fetchAllSubjects();
      // console.log("All Subjects Response:", res);

      if (res.status) {
        setAllSubjects(res.subjects || []);
      }
    } catch (err) {
      toast.error("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // 🚀 ENotes Api (NEW)
  // =========================
  const loadENotes = async () => {
    try {
      setLoading(true);
      const res = await fetchENotes({
        class_id: student.class_id,
        subject_id: null
      });

      // console.log("E-Notes Response:", res);

      if (res.status) {
        setENotes(res.enotes || []);
      }
    } catch (err) {
      toast.error("Failed to load E-Notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (student?.class_id) {
      loadAllSubjects();
      loadENotes();
    }
  }, [student]);

  // 📊 Summary Data
  const totalNotes = eNotes.length;
  const totalSubjects = allSubjects.length;

  // 🕒 Get latest 5 notes
  const recentNotes = eNotes.slice(0, 5);


  // =========================
  // 🚀 Daily learning Api (NEW)
  // =========================

  const loadDailyLearning = async () => {
    try {
      const res = await fetchDailyLearning(
        student.school_id,
        student.class_id
      );

      if (res.status) {
        const data = res.data || [];
        console.log(data)

        // 🔥 sort by latest date + limit 6
        const latestSix = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);

        setDailyLearning(latestSix);
      }
    } catch (err) {
      // console.log("Daily Learning Error:", err);
      toast.error("Failed to load daily learning");
    }
  };

  useEffect(() => {
    if (student?.class_id && student?.school_id) {
      loadAllSubjects();
      loadENotes();
      loadDailyLearning(); // ✅ ADD THIS
    }
  }, [student]);

  return (
    <>
      <div className='flex flex-col gap-6 pt-4 pb-28'>

        <HomeHeader name="Rohan Sharma" />
        <QuickStats />

        <AcademicsSection
          admitCard={admitCard}
          loading={loading}
        />

        <HostelMenu />

        <HealthSection
          score={medical?.overall_health_score}
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

        {/* ✅ PASS GATE PASS DATA */}
        <GatePassSection
          pending={gatePasses.pending}
          approved={gatePasses.approved}
          rejected={gatePasses.rejected}
          all={gatePasses.all}
          refreshGatePass={loadGatePass}
        />

        <ENotesSummaryCard
          totalNotes={totalNotes}
          subjects={totalSubjects}
          recentNotes={recentNotes}
          eNotes={eNotes}
          allSubjects={allSubjects}
        />

        <DailyLearningSummaryCard
          data={dailyLearning}
        />

      </div>
    </>
  )
}

export default Home