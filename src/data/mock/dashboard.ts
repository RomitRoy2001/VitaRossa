// src/data/mock/dashboard.ts
import type { DashboardSummary } from '../../types';
import { MOCK_INVENTORY_SUMMARY } from './inventory';
import { MOCK_WORKFLOW_EVENTS } from './workflow';

export const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  totalDonors: 1284,
  donationsToday: 23,
  availableUnits: 270,
  pendingRequests: 8,
  emergencyRequests: 2,
  expiringUnits: 22,
  inventorySummary: MOCK_INVENTORY_SUMMARY,
  recentActivity: MOCK_WORKFLOW_EVENTS.slice(0, 5),
  alerts: [
    {
      id: 'alert-001',
      type: 'LOW_STOCK',
      severity: 'WARNING',
      title: 'Low Stock: A-',
      message: 'A- blood type is critically low (12 units). Minimum threshold: 30.',
      isRead: false,
      entityId: 'A-',
      entityType: 'INVENTORY',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: 'alert-002',
      type: 'LOW_STOCK',
      severity: 'ERROR',
      title: 'Critical: AB- Near Zero',
      message: 'AB- blood type is at critical level (5 units). Immediate action required.',
      isRead: false,
      entityId: 'AB-',
      entityType: 'INVENTORY',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    },
    {
      id: 'alert-003',
      type: 'EMERGENCY_REQUEST',
      severity: 'ERROR',
      title: 'Emergency Request: O+',
      message: 'Emergency blood request from Apollo Hospitals requires 2 units of O+ immediately.',
      isRead: false,
      entityId: 'req-001',
      entityType: 'BLOOD_REQUEST',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 'alert-004',
      type: 'EXPIRING_UNIT',
      severity: 'WARNING',
      title: 'Expiring Soon: 22 Units',
      message: '22 blood units will expire within 7 days. Review and utilize or discard.',
      isRead: false,
      entityType: 'INVENTORY',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    },
  ],
};

// Donation trends for the last 14 days
export const MOCK_DONATION_TRENDS = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  return {
    date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    donations: Math.floor(Math.random() * 30) + 10,
    processed: Math.floor(Math.random() * 25) + 8,
  };
});

// Request trends for the last 14 days
export const MOCK_REQUEST_TRENDS = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  return {
    date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    normal: Math.floor(Math.random() * 10) + 2,
    urgent: Math.floor(Math.random() * 6) + 1,
    emergency: Math.floor(Math.random() * 3),
  };
});
