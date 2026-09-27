// src/data/mock/bloodUnits.ts
import type { BloodUnit } from '../../types';

const today = new Date();
const addDays = (d: Date, n: number) =>
  new Date(d.getTime() + n * 86400000).toISOString().split('T')[0];
const subDays = (d: Date, n: number) => addDays(d, -n);

export const MOCK_BLOOD_UNITS: BloodUnit[] = [
  {
    id: 'bu-001', unitId: 'BU-O+-001',
    donationId: 'don-001', donorId: 'dnr-001', donorName: 'Kiran Patel',
    bloodGroup: 'O+', component: 'WHOLE_BLOOD', volumeMl: 450,
    collectionDate: subDays(today, 30), expiryDate: addDays(today, 7),
    status: 'AVAILABLE', qualityStatus: 'PASS',
    storageLocation: { id: 'sl-1', name: 'Refrigerator A', section: 'A', row: '1', position: 1, temperature: '2-6°C', capacity: 50, currentOccupancy: 32 },
    processedAt: subDays(today, 28), processedBy: 'Ravi Kumar',
    createdAt: subDays(today, 30) + 'T09:00:00Z', updatedAt: subDays(today, 28) + 'T14:00:00Z',
  },
  {
    id: 'bu-002', unitId: 'BU-A+-001',
    donationId: 'don-002', donorId: 'dnr-002', donorName: 'Deepa Krishnan',
    bloodGroup: 'A+', component: 'PACKED_RED_CELLS', volumeMl: 280,
    collectionDate: subDays(today, 5), expiryDate: addDays(today, 37),
    status: 'AVAILABLE', qualityStatus: 'PASS',
    storageLocation: { id: 'sl-2', name: 'Refrigerator A', section: 'A', row: '2', position: 3, temperature: '2-6°C', capacity: 50, currentOccupancy: 32 },
    processedAt: subDays(today, 3), processedBy: 'Ravi Kumar',
    createdAt: subDays(today, 5) + 'T10:00:00Z', updatedAt: subDays(today, 3) + 'T15:00:00Z',
  },
  {
    id: 'bu-003', unitId: 'BU-AB+-001',
    donationId: 'don-006', donorId: 'dnr-008', donorName: 'Preethi Rajan',
    bloodGroup: 'AB-', component: 'FRESH_FROZEN_PLASMA', volumeMl: 200,
    collectionDate: subDays(today, 60), expiryDate: addDays(today, 300),
    status: 'RESERVED', qualityStatus: 'PASS',
    storageLocation: { id: 'sl-3', name: 'Freezer B', section: 'B', row: '1', position: 2, temperature: '-18°C', capacity: 30, currentOccupancy: 18 },
    processedAt: subDays(today, 58), processedBy: 'Ravi Kumar',
    createdAt: subDays(today, 60) + 'T10:00:00Z', updatedAt: subDays(today, 2) + 'T09:00:00Z',
  },
  {
    id: 'bu-004', unitId: 'BU-O--001',
    donationId: 'don-004', donorId: 'dnr-005', donorName: 'Amit Shah',
    bloodGroup: 'O-', component: 'WHOLE_BLOOD', volumeMl: 450,
    collectionDate: subDays(today, 35), expiryDate: addDays(today, 7),
    status: 'AVAILABLE', qualityStatus: 'PASS',
    storageLocation: { id: 'sl-4', name: 'Refrigerator A', section: 'A', row: '1', position: 5, temperature: '2-6°C', capacity: 50, currentOccupancy: 32 },
    processedAt: subDays(today, 33), processedBy: 'Ravi Kumar',
    createdAt: subDays(today, 35) + 'T09:00:00Z', updatedAt: subDays(today, 33) + 'T10:00:00Z',
  },
  {
    id: 'bu-005', unitId: 'BU-B+-001',
    donationId: 'don-003', donorId: 'dnr-004', donorName: 'Sneha Iyer',
    bloodGroup: 'B+', component: 'PLATELETS', volumeMl: 60,
    collectionDate: subDays(today, 3), expiryDate: addDays(today, 2),
    status: 'AVAILABLE', qualityStatus: 'PASS',
    storageLocation: { id: 'sl-5', name: 'Agitator C', section: 'C', row: '1', position: 1, temperature: '20-24°C', capacity: 20, currentOccupancy: 8 },
    processedAt: subDays(today, 2), processedBy: 'Ravi Kumar',
    createdAt: subDays(today, 3) + 'T11:00:00Z', updatedAt: subDays(today, 2) + 'T09:00:00Z',
  },
];
