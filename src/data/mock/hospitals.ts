// src/data/mock/hospitals.ts
import type { Hospital } from '../../types';

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-001', name: 'Apollo Hospitals', code: 'APL-BLR',
    address: 'Bannerghatta Road', city: 'Bangalore', state: 'Karnataka',
    phone: '+91 80 2630 4050', email: 'blood@apollohospitals.com',
    contactPerson: 'Dr. Ramesh Nair', isActive: true, createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'hosp-002', name: 'Fortis Hospital', code: 'FRT-HYD',
    address: 'Srinagar Colony', city: 'Hyderabad', state: 'Telangana',
    phone: '+91 40 4567 8901', email: 'bloodbank@fortishospitals.com',
    contactPerson: 'Dr. Priya Reddy', isActive: true, createdAt: '2023-02-01T00:00:00Z',
  },
  {
    id: 'hosp-003', name: 'AIIMS Delhi', code: 'AIIMS-DEL',
    address: 'Ansari Nagar', city: 'New Delhi', state: 'Delhi',
    phone: '+91 11 2658 8500', email: 'bloodbank@aiims.edu',
    contactPerson: 'Dr. Anil Kumar', isActive: true, createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: 'hosp-004', name: 'KEM Hospital', code: 'KEM-MUM',
    address: 'Parel', city: 'Mumbai', state: 'Maharashtra',
    phone: '+91 22 2410 7000', email: 'bb@kemhospital.org',
    contactPerson: 'Dr. Meera Joshi', isActive: true, createdAt: '2023-03-01T00:00:00Z',
  },
];
