// src/components/shared/WorkflowTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Activity, ShieldCheck, Truck, Droplet, PackageCheck } from 'lucide-react';
import type { WorkflowEvent } from '../../types';
import { formatRelativeTime, formatRole, formatDateTime } from '../../utils/formatters';

interface WorkflowTimelineProps {
  events: WorkflowEvent[];
  compact?: boolean;
}

const getActionIcon = (action: string) => {
  switch (action) {
    case 'BLOOD_UNIT_ISSUED':
    case 'REQUEST_DELIVERED':
      return <PackageCheck size={14} className="text-emerald-400" />;
    case 'DONATION_TESTED':
      return <ShieldCheck size={14} className="text-purple-400" />;
    case 'REQUEST_DISPATCHED':
      return <Truck size={14} className="text-blue-400" />;
    case 'DONATION_COLLECTED':
    case 'DONATION_REGISTERED':
      return <Droplet size={14} className="text-red-400" />;
    case 'REQUEST_APPROVED':
      return <Activity size={14} className="text-amber-400" />;
    default:
      return <GitCommit size={14} className="text-slate-400" />;
  }
};

export const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({ events, compact = false }) => {
  if (!events.length) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No workflow events recorded yet.
      </div>
    );
  }

  return (
    <div className="relative pl-1">
      {events.map((event, idx) => {
        const isLast = idx === events.length - 1;

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="flex gap-3 group"
          >
            {/* Timeline Line & Node */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-[#0b1120] border border-white/12 flex items-center justify-center flex-shrink-0 z-10 group-hover:border-red-500/40 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.2)] transition-all">
                {getActionIcon(event.action)}
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-gradient-to-b from-white/10 via-white/5 to-transparent my-1 min-h-[28px]" />
              )}
            </div>

            {/* Event Description */}
            <div className={`pb-4 flex-1 min-w-0 ${isLast ? 'pb-1' : ''}`}>
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <p className={`font-medium text-slate-200 leading-snug ${compact ? 'text-xs' : 'text-sm'}`}>
                  {event.description}
                </p>
                <span
                  title={formatDateTime(event.timestamp)}
                  className="text-[11px] text-slate-500 whitespace-nowrap flex-shrink-0 tabular-nums"
                >
                  {formatRelativeTime(event.timestamp)}
                </span>
              </div>

              {!compact && (
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 flex-wrap">
                  <span className="font-mono text-slate-300 bg-white/4 px-1.5 py-0.5 rounded text-[11px]">
                    {event.entityLabel}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>
                    By <span className="text-slate-300 font-medium">{event.performedBy}</span>
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{formatRole(event.performedByRole)}</span>
                  {event.status && (
                    <>
                      <span className="text-slate-600">·</span>
                      <span className="text-red-400 font-medium uppercase text-[10px] bg-red-500/10 px-1.5 py-0.2 rounded border border-red-500/20">
                        {event.status}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
