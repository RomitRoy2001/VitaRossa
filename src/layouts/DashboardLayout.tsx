// src/layouts/DashboardLayout.tsx
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Topbar } from '../components/Topbar/Topbar';
import { ToastContainer } from '../components/shared/Toast';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setNotifications } from '../store/slices/uiSlice';
import { MOCK_DASHBOARD_SUMMARY } from '../data/mock/dashboard';

export const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Load mock notifications on mount
  useEffect(() => {
    dispatch(setNotifications(MOCK_DASHBOARD_SUMMARY.alerts));
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-[#070b14] overflow-hidden text-slate-100">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Command Center Shell */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Topbar */}
        <Topbar />

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="max-w-[1600px] mx-auto min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
};
