import React from 'react'
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout';
import SplashScreen from './features/SplashScreen'
import Login from './features/auth/Login'
import Home from './features/home/Home'
import ProfileScreen from './features/Profile/ProfileScreen';
import NotificationScreen from './features/notification/NotificationScreen';
import FeeDetailScreen from './features/fee/FeeDetailScreen';
import EVideos from './features/e-videos/EVideos';
import SelectStudent from './features/auth/SelectStudent';
import SecurityScreen from './features/SecurityScreen';
import HelpCenter from './features/HelpCenter';
import GatePassHistoryDetail from './features/GatePassHistoryDetail';
import ENotesDetailPage from './features/ENotesDetailPage';
import DailyLearningDetail from './features/DailyLearningDetail';

import AuthGuard from './guard/AuthGuard';
import PublicRoute from './guard/PublicRoute';

// ✅ NEW IMPORT
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <BrowserRouter>

      {/* ✅ Scroll resets on every route change */}
      <ScrollToTop />

      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "#9768D9",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ff4d4f",
              color: "#fff",
            },
          },
        }}
      />

      <Routes>

        {/* 🔓 Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="select-student" element={<SelectStudent />} />

        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* 🔐 Protected Routes */}
        <Route
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/notifications" element={<NotificationScreen />} />
          <Route path="/fee-detail" element={<FeeDetailScreen />} />
          <Route path="/e-videos" element={<EVideos />} />
          <Route path="/security" element={<SecurityScreen />} />
          <Route path="/help-center" element={<HelpCenter />} /> {/* ✅ Help Center Route */}
          <Route path="/gate-pass-history" element={<GatePassHistoryDetail />} /> {/* ✅ Gate Pass History Route */}  
          <Route path="/enotes" element={<ENotesDetailPage />} /> {/* ✅ E-Notes Route */}
          <Route path="/daily-learning" element={<DailyLearningDetail />} /> {/* ✅ Daily Learning Route */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;