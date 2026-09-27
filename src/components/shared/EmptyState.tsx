// src/components/shared/EmptyState.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Database, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  message = 'There are no active records matching this view.',
  icon,
  action,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-12 px-6 text-center"
  >
    <div className="w-14 h-14 rounded-2xl bg-[#0b1120] border border-white/8 flex items-center justify-center text-slate-500 mb-3 shadow-inner">
      {icon ?? <Database size={24} />}
    </div>
    <h3 className="text-sm font-semibold text-slate-200 mb-1">{title}</h3>
    <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">{message}</p>
    {action && (
      <Button variant="primary" size="sm" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </motion.div>
);

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to Load Operational Data',
  message = 'An error occurred while connecting to the BloodFlow service node.',
  onRetry,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-12 px-6 text-center"
  >
    <div className="w-14 h-14 rounded-2xl bg-rose-950/20 border border-rose-800/30 flex items-center justify-center text-rose-400 mb-3">
      <AlertTriangle size={24} />
    </div>
    <h3 className="text-sm font-semibold text-slate-200 mb-1">{title}</h3>
    <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">{message}</p>
    {onRetry && (
      <Button variant="outline" size="sm" leftIcon={<RefreshCw size={13} />} onClick={onRetry}>
        Retry Connection
      </Button>
    )}
  </motion.div>
);
