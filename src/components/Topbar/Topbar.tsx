// src/components/Topbar/Topbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, ChevronDown, LogOut, Settings, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { toggleSidebar, toggleNotificationPanel } from '../../store/slices/uiSlice';
import { logoutThunk } from '../../store/slices/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROLES } from '../../config/constants';
import { NotificationPanel } from './NotificationPanel';

export const Topbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { user, role, fullName, initials } = useAuth();
  const unreadCount = useAppSelector((s) => s.ui.unreadCount);
  const isNotifOpen = useAppSelector((s) => s.ui.isNotificationPanelOpen);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    toast.success('Logged out', 'See you next time!');
    navigate('/login');
  };

  // Convert current pathname into title
  const currentSection = location.pathname.replace('/', '').toUpperCase() || 'DASHBOARD';

  return (
    <header className="h-16 bg-[#070b14]/80 backdrop-blur-md border-b border-white/8 flex items-center px-5 gap-4 flex-shrink-0 relative z-40">
      {/* Mobile menu toggle */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Breadcrumb Context */}
      <div className="hidden sm:flex items-center gap-2 text-xs">
        <span className="font-mono text-slate-500 uppercase tracking-wider">COMMAND</span>
        <span className="text-slate-600">/</span>
        <span className="font-mono font-semibold text-slate-300 uppercase tracking-wider">
          {currentSection}
        </span>
      </div>

      {/* Global Quick Search */}
      <div className="flex-1 max-w-md mx-auto sm:mx-0 sm:ml-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search donors, requests, blood units…"
            className="w-full h-8 bg-[#0b1120] border border-white/8 rounded-lg pl-8 pr-12 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
          />
          <kbd className="hidden md:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white/4 border border-white/8 rounded">
            /
          </kbd>
        </div>
      </div>

      {/* System Pulse Indicator */}
      <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/20 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
        <span>NODE: LIVE</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">18ms</span>
      </div>

      {/* Right Cluster */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification Bell */}
        <div className="relative">
          <button
            id="notification-bell"
            onClick={() => dispatch(toggleNotificationPanel())}
            className="relative w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 rounded-full text-[10px] text-white font-bold flex items-center justify-center shadow-[0_0_8px_rgba(220,38,38,0.6)] font-mono"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </button>

          {/* Notification Panel Popover */}
          <NotificationPanel isOpen={isNotifOpen} />
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-white/8" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            id="user-profile-btn"
            onClick={() => setIsProfileOpen((p) => !p)}
            className="flex items-center gap-2 h-8 px-2 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xs font-bold font-mono">
              {initials || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-slate-200 leading-none">{user?.firstName}</p>
            </div>
            <ChevronDown
              size={12}
              className={`text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-[#0f172a] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-white/8 bg-[#0b1120]/50">
                  <p className="text-xs font-semibold text-slate-100">{fullName}</p>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{user?.email}</p>
                  {role && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 border border-red-500/25 px-2 py-0.5 rounded-full font-mono font-medium uppercase">
                      <ShieldCheck size={11} />
                      {ROLES[role]}
                    </div>
                  )}
                </div>

                {/* Menu Items */}
                <div className="p-1 text-xs">
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/6 transition-colors"
                  >
                    <Settings size={14} className="text-slate-400" /> System Settings
                  </button>

                  <div className="border-t border-white/6 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/25 transition-colors"
                  >
                    <LogOut size={14} /> Terminate Session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
