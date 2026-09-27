// src/components/shared/Toast.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { useToast } from '../../hooks/useToast';

const ICONS = {
  success: <CheckCircle size={16} className="text-green-400" />,
  error:   <XCircle size={16} className="text-red-400" />,
  warning: <AlertTriangle size={16} className="text-amber-400" />,
  info:    <Info size={16} className="text-blue-400" />,
};

const BG = {
  success: 'border-green-800/50 bg-green-900/20',
  error:   'border-red-800/50 bg-red-900/20',
  warning: 'border-amber-800/50 bg-amber-900/20',
  info:    'border-blue-800/50 bg-blue-900/20',
};

interface ToastItemProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

const ToastItem: React.FC<ToastItemProps> = ({ id, type, title, message, duration = 4000 }) => {
  const { dismiss } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => dismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, dismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      className={`flex items-start gap-3 p-3.5 pr-10 rounded-xl border backdrop-blur-md bg-[#111827] ${BG[type]} relative min-w-[280px] max-w-sm shadow-xl`}
    >
      <div className="mt-0.5">{ICONS[type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        {message && <p className="text-xs text-slate-400 mt-0.5">{message}</p>}
      </div>
      <button
        onClick={() => dismiss(id)}
        className="absolute top-2.5 right-2.5 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useAppSelector((s) => s.ui.toasts);

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} type={t.type as ToastItemProps['type']} />
        ))}
      </AnimatePresence>
    </div>
  );
};
