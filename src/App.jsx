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

function App() {
  return (
    <BrowserRouter>
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
        
        <Route path="/splash" element={<SplashScreen />} />
        <Route path='/login' element={<Login />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/notifications" element={<NotificationScreen />} />
          <Route path="/fee-detail" element={<FeeDetailScreen />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
