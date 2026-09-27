// src/data/mock/employees.ts
import type { Employee } from '../../types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp-001', employeeId: 'EMP-001',
    firstName: 'Arjun', lastName: 'Sharma',
    email: 'superadmin@bloodflow.health', phone: '+91 99001 12345',
    role: 'SUPER_ADMIN', department: 'Administration',
    status: 'ACTIVE', joinedAt: '2024-01-01T00:00:00Z',
    lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'emp-002', employeeId: 'EMP-002',
    firstName: 'Priya', lastName: 'Mehta',
    email: 'admin@bloodflow.health', phone: '+91 99002 23456',
    role: 'ADMIN', department: 'Operations',
    status: 'ACTIVE', joinedAt: '2024-01-15T00:00:00Z',
    lastActivity: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'emp-003', employeeId: 'EMP-003',
    firstName: 'Ravi', lastName: 'Kumar',
    email: 'labtech@bloodflow.health', phone: '+91 99003 34567',
    role: 'LAB_TECHNICIAN', department: 'Laboratory',
    status: 'ACTIVE', joinedAt: '2024-02-01T00:00:00Z',
    lastActivity: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'emp-004', employeeId: 'EMP-004',
    firstName: 'Sunita', lastName: 'Reddy',
    email: 'bbstaff@bloodflow.health', phone: '+91 99004 45678',
    role: 'BLOOD_BANK_STAFF', department: 'Blood Bank',
    status: 'ACTIVE', joinedAt: '2024-02-15T00:00:00Z',
    lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'emp-005', employeeId: 'EMP-005',
    firstName: 'Vikram', lastName: 'Singh',
    email: 'dispatch@bloodflow.health', phone: '+91 99005 56789',
    role: 'DISPATCH_STAFF', department: 'Dispatch',
    status: 'ACTIVE', joinedAt: '2024-03-01T00:00:00Z',
    lastActivity: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'emp-006', employeeId: 'EMP-006',
    firstName: 'Ananya', lastName: 'Nair',
    email: 'camp@bloodflow.health', phone: '+91 99006 67890',
    role: 'CAMP_COORDINATOR', department: 'Camp Operations',
    status: 'ACTIVE', joinedAt: '2024-03-15T00:00:00Z',
    lastActivity: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
];
