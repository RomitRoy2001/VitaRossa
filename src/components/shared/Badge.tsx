// src/components/shared/Badge.tsx
import React from 'react';
import { formatEnum, getStatusBadgeClasses, getPriorityBadgeClasses, getBloodGroupBadgeClasses } from '../../utils/formatters';
import type { BloodGroup, RequestPriority } from '../../types';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'crimson';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
  size?: 'xs' | 'sm' | 'md';
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default:  'bg-slate-800/80 text-slate-300 border-slate-700/60',
  success:  'bg-emerald-950/60 text-emerald-400 border-emerald-800/40',
  warning:  'bg-amber-950/60 text-amber-400 border-amber-800/40',
  danger:   'bg-rose-950/60 text-rose-400 border-rose-800/40',
  info:     'bg-sky-950/60 text-sky-400 border-sky-800/40',
  purple:   'bg-purple-950/60 text-purple-400 border-purple-800/40',
  crimson:  'bg-red-950/70 text-red-400 border-red-800/50 shadow-[0_0_10px_rgba(220,38,38,0.2)]',
};

const DOT_CLASSES: Record<BadgeVariant, string> = {
  default:  'bg-slate-400',
  success:  'bg-emerald-400',
  warning:  'bg-amber-400',
  danger:   'bg-rose-400',
  info:     'bg-sky-400',
  purple:   'bg-purple-400',
  crimson:  'bg-red-500 animate-pulse',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  className = '',
  dot = false,
  size = 'sm',
}) => {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide select-none',
        sizeClasses[size],
        VARIANT_CLASSES[variant],
        className,
      ].join(' ')}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DOT_CLASSES[variant]}`} />
      )}
      {formatEnum(label)}
    </span>
  );
};

// ─── StatusBadge (Auto-classifies any domain status) ─────────────────────────
export const StatusBadge: React.FC<{ status: string; className?: string; size?: 'xs' | 'sm' | 'md' }> = ({
  status,
  className = '',
  size = 'sm',
}) => {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium tracking-wide uppercase select-none ${sizeClasses[size]} ${getStatusBadgeClasses(status)} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      {formatEnum(status)}
    </span>
  );
};

// ─── PriorityBadge (NORMAL, URGENT, EMERGENCY) ──────────────────────────────
export const PriorityBadge: React.FC<{ priority: RequestPriority; className?: string }> = ({
  priority,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border select-none ${getPriorityBadgeClasses(priority)} ${className}`}
    >
      {priority === 'EMERGENCY' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
      {priority}
    </span>
  );
};

// ─── BloodGroupBadge ─────────────────────────────────────────────────────────
export const BloodGroupBadge: React.FC<{ group: BloodGroup; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  group,
  size = 'sm',
  className = '',
}) => {
  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs font-bold',
    md: 'px-3 py-1 text-sm font-bold',
    lg: 'px-4 py-1.5 text-base font-black',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg border font-mono tracking-tight select-none ${sizeMap[size]} ${getBloodGroupBadgeClasses(group)} ${className}`}
    >
      {group}
    </span>
  );
};
