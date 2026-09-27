// src/config/constants.ts
// App-wide constants — blood groups, roles, status maps, etc.

import type { UserRole } from '../types';

// ─── Blood Groups ────────────────────────────────────────────────────────────
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export type BloodGroup = (typeof BLOOD_GROUPS)[number];

// ─── Roles ────────────────────────────────────────────────────────────────────
export const ROLES: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  LAB_TECHNICIAN: 'Lab Technician',
  BLOOD_BANK_STAFF: 'Blood Bank Staff',
  DISPATCH_STAFF: 'Dispatch Staff',
  CAMP_COORDINATOR: 'Camp Coordinator',
};

// ─── Donation Statuses ───────────────────────────────────────────────────────
export const DONATION_STATUSES = [
  'REGISTERED',
  'SCREENING',
  'APPROVED',
  'COLLECTED',
  'TESTING',
  'PROCESSED',
  'AVAILABLE',
  'DISCARDED',
] as const;
export type DonationStatus = (typeof DONATION_STATUSES)[number];

// ─── Blood Unit Statuses ─────────────────────────────────────────────────────
export const BLOOD_UNIT_STATUSES = [
  'AVAILABLE',
  'RESERVED',
  'ISSUED',
  'DISPATCHED',
  'EXPIRED',
  'DISCARDED',
] as const;
export type BloodUnitStatus = (typeof BLOOD_UNIT_STATUSES)[number];

// ─── Blood Request Statuses ──────────────────────────────────────────────────
export const REQUEST_STATUSES = [
  'NEW',
  'VERIFICATION',
  'APPROVED',
  'RESERVED',
  'ISSUED',
  'DISPATCHED',
  'DELIVERED',
  'CLOSED',
  'REJECTED',
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

// ─── Request Priority ─────────────────────────────────────────────────────────
export const REQUEST_PRIORITIES = ['NORMAL', 'URGENT', 'EMERGENCY'] as const;
export type RequestPriority = (typeof REQUEST_PRIORITIES)[number];

// ─── Camp Statuses ───────────────────────────────────────────────────────────
export const CAMP_STATUSES = [
  'DRAFT',
  'SCHEDULED',
  'REGISTRATION_OPEN',
  'ONGOING',
  'COMPLETED',
  'CANCELLED',
] as const;
export type CampStatus = (typeof CAMP_STATUSES)[number];

// ─── Blood Components ────────────────────────────────────────────────────────
export const BLOOD_COMPONENTS = [
  'WHOLE_BLOOD',
  'PACKED_RED_CELLS',
  'PLATELETS',
  'FRESH_FROZEN_PLASMA',
  'CRYOPRECIPITATE',
] as const;
export type BloodComponent = (typeof BLOOD_COMPONENTS)[number];

export const BLOOD_COMPONENT_LABELS: Record<BloodComponent, string> = {
  WHOLE_BLOOD: 'Whole Blood',
  PACKED_RED_CELLS: 'Packed Red Cells',
  PLATELETS: 'Platelets',
  FRESH_FROZEN_PLASMA: 'Fresh Frozen Plasma',
  CRYOPRECIPITATE: 'Cryoprecipitate',
};

// ─── Status Color Maps ────────────────────────────────────────────────────────
export const DONATION_STATUS_COLORS: Record<DonationStatus, string> = {
  REGISTERED: 'bg-slate-700 text-slate-200',
  SCREENING: 'bg-amber-900/50 text-amber-300',
  APPROVED: 'bg-emerald-900/50 text-emerald-300',
  COLLECTED: 'bg-blue-900/50 text-blue-300',
  TESTING: 'bg-purple-900/50 text-purple-300',
  PROCESSED: 'bg-cyan-900/50 text-cyan-300',
  AVAILABLE: 'bg-green-900/50 text-green-300',
  DISCARDED: 'bg-red-900/50 text-red-400',
};

export const REQUEST_STATUS_COLORS: Record<RequestStatus, string> = {
  NEW: 'bg-slate-700 text-slate-200',
  VERIFICATION: 'bg-amber-900/50 text-amber-300',
  APPROVED: 'bg-emerald-900/50 text-emerald-300',
  RESERVED: 'bg-blue-900/50 text-blue-300',
  ISSUED: 'bg-cyan-900/50 text-cyan-300',
  DISPATCHED: 'bg-purple-900/50 text-purple-300',
  DELIVERED: 'bg-green-900/50 text-green-300',
  CLOSED: 'bg-slate-600 text-slate-400',
  REJECTED: 'bg-red-900/50 text-red-400',
};

export const PRIORITY_COLORS: Record<RequestPriority, string> = {
  NORMAL: 'bg-slate-700 text-slate-300',
  URGENT: 'bg-amber-900/60 text-amber-300',
  EMERGENCY: 'bg-red-900/60 text-red-300',
};

export const BLOOD_UNIT_STATUS_COLORS: Record<BloodUnitStatus, string> = {
  AVAILABLE: 'bg-green-900/50 text-green-300',
  RESERVED: 'bg-blue-900/50 text-blue-300',
  ISSUED: 'bg-cyan-900/50 text-cyan-300',
  DISPATCHED: 'bg-purple-900/50 text-purple-300',
  EXPIRED: 'bg-red-900/50 text-red-400',
  DISCARDED: 'bg-slate-600 text-slate-400',
};

export const CAMP_STATUS_COLORS: Record<CampStatus, string> = {
  DRAFT: 'bg-slate-700 text-slate-300',
  SCHEDULED: 'bg-blue-900/50 text-blue-300',
  REGISTRATION_OPEN: 'bg-emerald-900/50 text-emerald-300',
  ONGOING: 'bg-amber-900/50 text-amber-300',
  COMPLETED: 'bg-green-900/50 text-green-300',
  CANCELLED: 'bg-red-900/50 text-red-400',
};

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// ─── Misc ─────────────────────────────────────────────────────────────────────
export const APP_NAME = 'BloodFlow';
export const APP_TAGLINE = 'Your Blood. Their Life.';
export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_COLLAPSED_WIDTH = 72;
export const TOPBAR_HEIGHT = 64;
