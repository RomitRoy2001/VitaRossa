// src/utils/formatters.ts
import type { BloodGroup, UserRole, RequestPriority } from '../types';

// ─── Date Formatters ──────────────────────────────────────────────────────────

export const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (dateStr: string | undefined): string => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (dateStr: string | undefined): string => {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const diff = new Date(expiryDate).getTime() - Date.now();
  return Math.ceil(diff / 86400000);
};

export const isExpiringSoon = (expiryDate: string, threshold = 7): boolean => {
  return getDaysUntilExpiry(expiryDate) <= threshold && getDaysUntilExpiry(expiryDate) >= 0;
};

export const isExpired = (expiryDate: string): boolean => {
  return new Date(expiryDate) < new Date();
};

// ─── String Formatters ────────────────────────────────────────────────────────

export const formatName = (firstName: string, lastName: string): string =>
  `${firstName} ${lastName}`;

export const getInitials = (firstName: string, lastName: string): string =>
  `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const formatEnum = (value: string): string =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// ─── Blood Group Styling & Helpers ───────────────────────────────────────────

export const getBloodGroupColor = (group: BloodGroup): string => {
  const colors: Record<BloodGroup, string> = {
    'A+': 'text-red-400',
    'A-': 'text-amber-400',
    'B+': 'text-blue-400',
    'B-': 'text-cyan-400',
    'AB+': 'text-purple-400',
    'AB-': 'text-pink-400',
    'O+': 'text-emerald-400',
    'O-': 'text-rose-400',
  };
  return colors[group] ?? 'text-slate-200';
};

export const getBloodGroupBadgeClasses = (group: BloodGroup): string => {
  const map: Record<BloodGroup, string> = {
    'A+': 'bg-red-500/10 text-red-400 border-red-500/25',
    'A-': 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    'B+': 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    'B-': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
    'AB+': 'bg-purple-500/10 text-purple-400 border-purple-500/25',
    'AB-': 'bg-pink-500/10 text-pink-400 border-pink-500/25',
    'O+': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    'O-': 'bg-rose-500/10 text-rose-400 border-rose-500/25',
  };
  return map[group] ?? 'bg-slate-800 text-slate-300 border-white/10';
};

export const getBloodGroupBg = (group: BloodGroup): string => getBloodGroupBadgeClasses(group);

// ─── Priority Badges ─────────────────────────────────────────────────────────

export const getPriorityBadgeClasses = (priority: RequestPriority): string => {
  switch (priority) {
    case 'EMERGENCY':
      return 'bg-red-950/70 text-red-400 border-red-600/50 shadow-[0_0_12px_rgba(220,38,38,0.3)] animate-pulse';
    case 'URGENT':
      return 'bg-amber-950/60 text-amber-400 border-amber-600/40';
    case 'NORMAL':
    default:
      return 'bg-blue-950/50 text-blue-400 border-blue-600/30';
  }
};

// ─── Status Badge Mappings ───────────────────────────────────────────────────

export const getStatusBadgeClasses = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'AVAILABLE':
    case 'ELIGIBLE':
    case 'APPROVED':
    case 'COMPLETED':
    case 'ACTIVE':
    case 'PASS':
    case 'DELIVERED':
      return 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30';

    case 'RESERVED':
    case 'TESTING':
    case 'SCREENING':
    case 'REGISTRATION_OPEN':
    case 'SCHEDULED':
    case 'PENDING':
    case 'LOW':
      return 'bg-amber-950/50 text-amber-400 border-amber-500/30';

    case 'CRITICAL':
    case 'EMERGENCY':
    case 'FAIL':
    case 'DISCARDED':
    case 'EXPIRED':
    case 'BLACKLISTED':
    case 'REJECTED':
      return 'bg-red-950/50 text-red-400 border-red-500/30';

    case 'COLLECTED':
    case 'PROCESSED':
    case 'DISPATCHED':
    case 'ISSUED':
    case 'IN':
    case 'ONGOING':
      return 'bg-blue-950/50 text-blue-400 border-blue-500/30';

    case 'DEFERRED':
    case 'INACTIVE':
    case 'ON_LEAVE':
    case 'DRAFT':
    case 'CANCELLED':
    case 'NEW':
    default:
      return 'bg-slate-800/60 text-slate-400 border-white/10';
  }
};

// ─── Role Formatters ──────────────────────────────────────────────────────────

export const formatRole = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    LAB_TECHNICIAN: 'Lab Technician',
    BLOOD_BANK_STAFF: 'Blood Bank Staff',
    DISPATCH_STAFF: 'Dispatch Staff',
    CAMP_COORDINATOR: 'Camp Coordinator',
  };
  return labels[role] ?? role;
};

// ─── Number Formatters ────────────────────────────────────────────────────────

export const formatNumber = (n: number): string =>
  n.toLocaleString('en-IN');

export const formatPercent = (value: number, total: number): string =>
  total === 0 ? '0%' : `${Math.round((value / total) * 100)}%`;

export const formatVolume = (ml: number | undefined): string =>
  ml ? `${ml} ml` : '—';
