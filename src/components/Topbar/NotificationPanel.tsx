// src/components/Topbar/NotificationPanel.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  closeNotificationPanel,
  markNotificationRead,
  markAllNotificationsRead,
} from '../../store/slices/uiSlice';
import { formatRelativeTime } from '../../utils/formatters';
import type { NotificationSeverity } from '../../types';

const SEVERITY_ICONS: Record<NotificationSeverity, React.ReactNode> = {
  INFO:    <Info size={14} className="text-sky-400" />,
  WARNING: <AlertTriangle size={14} className="text-amber-400" />,
  ERROR:   <XCircle size={14} className="text-rose-400" />,
  SUCCESS: <CheckCircle size={14} className="text-emerald-400" />,
};

const SEVERITY_ACCENT: Record<NotificationSeverity, string> = {
  INFO:    'border-l-sky-500 bg-sky-500/5',
  WARNING: 'border-l-amber-500 bg-amber-500/5',
  ERROR:   'border-l-rose-500 bg-rose-500/5',
  SUCCESS: 'border-l-emerald-500 bg-emerald-500/5',
};

interface NotificationPanelProps {
  isOpen: boolean;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((s) => s.ui.notifications);
  const unreadCount = useAppSelector((s) => s.ui.unreadCount);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for click outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => dispatch(closeNotificationPanel())}
          />

          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-84 sm:w-96 bg-[#0f172a] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0b1120]/60">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-red-400" />
                <span className="text-xs font-semibold text-slate-100 uppercase font-mono tracking-wider">
                  Operational Alerts
                </span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-red-600/30 border border-red-600/40 text-red-400 text-[10px] rounded-full font-bold font-mono">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={() => dispatch(markAllNotificationsRead())}
                    className="text-[11px] text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Dismiss all
                  </button>
                )}
                <button
                  onClick={() => dispatch(closeNotificationPanel())}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div className="max-h-80 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center px-4">
                  <Bell size={20} className="text-slate-600 mb-2 opacity-50" />
                  <p className="text-xs text-slate-400 font-medium">All clear — no pending alerts</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Operational parameters normal</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => dispatch(markNotificationRead(notif.id))}
                    className={[
                      'px-4 py-3 border-l-2 cursor-pointer transition-colors',
                      SEVERITY_ACCENT[notif.severity],
                      notif.isRead ? 'opacity-50 hover:opacity-75' : 'hover:bg-white/4',
                    ].join(' ')}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0">{SEVERITY_ICONS[notif.severity]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold text-slate-200 truncate">{notif.title}</p>
                          {!notif.isRead && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{notif.message}</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">
                          {formatRelativeTime(notif.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
