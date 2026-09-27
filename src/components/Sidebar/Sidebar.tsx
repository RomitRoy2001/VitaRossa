// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Droplets, Package, ClipboardList,
  Tent, GitBranch, UserCog, BarChart3, FileText,
  Settings, ChevronLeft, ChevronRight, LogOut, Truck, FlaskConical,
  Shield, HeartPulse,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logoutThunk } from '../../store/slices/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROLES } from '../../config/constants';
import type { UserRole } from '../../types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
  badge?: string;
  section: 'OPERATIONS' | 'LOGISTICS & LAB' | 'SYSTEM & INTELLIGENCE';
}

const NAV_ITEMS: NavItem[] = [
  // Operations
  { section: 'OPERATIONS', label: 'Dashboard',      path: '/dashboard', icon: <LayoutDashboard size={17} />, roles: ['SUPER_ADMIN','ADMIN','LAB_TECHNICIAN','BLOOD_BANK_STAFF','DISPATCH_STAFF','CAMP_COORDINATOR'] },
  { section: 'OPERATIONS', label: 'Donors',         path: '/donors',    icon: <Users size={17} />,           roles: ['SUPER_ADMIN','ADMIN','BLOOD_BANK_STAFF'] },
  { section: 'OPERATIONS', label: 'Donations',      path: '/donations', icon: <Droplets size={17} />,        roles: ['SUPER_ADMIN','ADMIN','LAB_TECHNICIAN','BLOOD_BANK_STAFF'] },
  { section: 'OPERATIONS', label: 'Inventory',      path: '/inventory', icon: <Package size={17} />,         roles: ['SUPER_ADMIN','ADMIN','BLOOD_BANK_STAFF'] },
  { section: 'OPERATIONS', label: 'Blood Requests', path: '/requests',  icon: <ClipboardList size={17} />,   roles: ['SUPER_ADMIN','ADMIN','BLOOD_BANK_STAFF','DISPATCH_STAFF'] },

  // Logistics & Lab
  { section: 'LOGISTICS & LAB', label: 'Dispatch',       path: '/dispatch', icon: <Truck size={17} />,        roles: ['SUPER_ADMIN','DISPATCH_STAFF'] },
  { section: 'LOGISTICS & LAB', label: 'Lab Testing',    path: '/testing',  icon: <FlaskConical size={17} />, roles: ['SUPER_ADMIN','LAB_TECHNICIAN'] },
  { section: 'LOGISTICS & LAB', label: 'Donation Camps', path: '/camps',    icon: <Tent size={17} />,         roles: ['SUPER_ADMIN','ADMIN','CAMP_COORDINATOR'] },
  { section: 'LOGISTICS & LAB', label: 'Workflow Trail', path: '/workflow', icon: <GitBranch size={17} />,    roles: ['SUPER_ADMIN','ADMIN','LAB_TECHNICIAN','BLOOD_BANK_STAFF','DISPATCH_STAFF','CAMP_COORDINATOR'] },

  // System & Intelligence
  { section: 'SYSTEM & INTELLIGENCE', label: 'Employees', path: '/employees', icon: <UserCog size={17} />,   roles: ['SUPER_ADMIN','ADMIN'] },
  { section: 'SYSTEM & INTELLIGENCE', label: 'Analytics', path: '/analytics', icon: <BarChart3 size={17} />, roles: ['SUPER_ADMIN','ADMIN'] },
  { section: 'SYSTEM & INTELLIGENCE', label: 'Reports',   path: '/reports',   icon: <FileText size={17} />,  roles: ['SUPER_ADMIN','ADMIN'] },
  { section: 'SYSTEM & INTELLIGENCE', label: 'Settings',  path: '/settings',  icon: <Settings size={17} />,  roles: ['SUPER_ADMIN'] },
];

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const { user, role, fullName, initials } = useAuth();

  const visibleItems = NAV_ITEMS.filter(
    (item) => role && item.roles.includes(role),
  );

  const sections = Array.from(new Set(visibleItems.map((i) => i.section)));

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    toast.success('Logged out', 'You have been signed out securely.');
    navigate('/login');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-[#070b14] border-r border-white/8 overflow-hidden flex-shrink-0 z-30"
    >
      {/* ── Brand Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/8 bg-[#0b1120]/60">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <HeartPulse size={20} className="text-white animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#070b14]" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-slate-100 tracking-tight">BloodFlow</span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    OPS
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Command Center</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Role Status Indicator ────────────────────────────── */}
      <AnimatePresence>
        {!collapsed && role && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 pt-3 pb-1"
          >
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-red-950/25 border border-red-800/30">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-red-400" />
                <span className="text-[10px] font-semibold text-red-300 uppercase tracking-wider font-mono">
                  {ROLES[role]}
                </span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation Items ─────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 custom-scrollbar">
        {sections.map((section) => (
          <div key={section} className="space-y-0.5">
            {!collapsed && (
              <p className="px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase font-mono">
                {section}
              </p>
            )}
            {visibleItems
              .filter((item) => item.section === section)
              .map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150 group relative',
                      isActive
                        ? 'bg-red-500/12 text-white border border-red-500/25 shadow-[0_0_15px_rgba(220,38,38,0.18)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/4',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active glow left accent indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-red-500 rounded-r shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                        />
                      )}

                      <span
                        className={`flex-shrink-0 transition-colors ${
                          isActive ? 'text-red-400' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {item.icon}
                      </span>

                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="truncate"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Tooltip on collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#0f172a] text-slate-200 text-xs rounded-md border border-white/12 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          {item.label}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
          </div>
        ))}
      </nav>

      {/* ── User Profile & Sign Out ──────────────────────────── */}
      <div className="border-t border-white/8 p-3 bg-[#0b1120]/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 text-xs font-bold font-mono flex-shrink-0">
            {initials || 'BF'}
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-xs font-semibold text-slate-200 truncate">{fullName}</p>
                <p className="text-[10px] text-slate-500 truncate font-mono">{user?.email}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors flex-shrink-0"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* ── Collapse Toggle Tab ──────────────────────────────── */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0f172a] border border-white/15 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(220,38,38,0.3)] transition-all z-40 shadow-lg"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
};
