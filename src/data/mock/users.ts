// src/data/mock/users.ts
import type { User, UserRole } from '../../types';

export const MOCK_USERS: User[] = [
  {
    id: 'usr-001',
    email: 'superadmin@bloodflow.health',
    firstName: 'Arjun',
    lastName: 'Sharma',
    role: 'SUPER_ADMIN',
    employeeId: 'EMP-001',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'usr-002',
    email: 'admin@bloodflow.health',
    firstName: 'Priya',
    lastName: 'Mehta',
    role: 'ADMIN',
    employeeId: 'EMP-002',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'usr-003',
    email: 'labtech@bloodflow.health',
    firstName: 'Ravi',
    lastName: 'Kumar',
    role: 'LAB_TECHNICIAN',
    employeeId: 'EMP-003',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'usr-004',
    email: 'bbstaff@bloodflow.health',
    firstName: 'Sunita',
    lastName: 'Reddy',
    role: 'BLOOD_BANK_STAFF',
    employeeId: 'EMP-004',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'usr-005',
    email: 'dispatch@bloodflow.health',
    firstName: 'Vikram',
    lastName: 'Singh',
    role: 'DISPATCH_STAFF',
    employeeId: 'EMP-005',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'usr-006',
    email: 'camp@bloodflow.health',
    firstName: 'Ananya',
    lastName: 'Nair',
    role: 'CAMP_COORDINATOR',
    employeeId: 'EMP-006',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    createdAt: '2024-03-15T00:00:00Z',
  },
];

// Map credentials → user for mock auth
export const MOCK_CREDENTIALS: Record<string, { userId: string; password: string }> = {
  'superadmin@bloodflow.health': { userId: 'usr-001', password: 'Admin@123' },
  'admin@bloodflow.health': { userId: 'usr-002', password: 'Admin@123' },
  'labtech@bloodflow.health': { userId: 'usr-003', password: 'Admin@123' },
  'bbstaff@bloodflow.health': { userId: 'usr-004', password: 'Admin@123' },
  'dispatch@bloodflow.health': { userId: 'usr-005', password: 'Admin@123' },
  'camp@bloodflow.health': { userId: 'usr-006', password: 'Admin@123' },
};

export const getRoleCredentials = (): Array<{ role: UserRole; email: string; password: string; name: string }> => [
  { role: 'SUPER_ADMIN', email: 'superadmin@bloodflow.health', password: 'Admin@123', name: 'Arjun Sharma' },
  { role: 'ADMIN', email: 'admin@bloodflow.health', password: 'Admin@123', name: 'Priya Mehta' },
  { role: 'LAB_TECHNICIAN', email: 'labtech@bloodflow.health', password: 'Admin@123', name: 'Ravi Kumar' },
  { role: 'BLOOD_BANK_STAFF', email: 'bbstaff@bloodflow.health', password: 'Admin@123', name: 'Sunita Reddy' },
  { role: 'DISPATCH_STAFF', email: 'dispatch@bloodflow.health', password: 'Admin@123', name: 'Vikram Singh' },
  { role: 'CAMP_COORDINATOR', email: 'camp@bloodflow.health', password: 'Admin@123', name: 'Ananya Nair' },
];
