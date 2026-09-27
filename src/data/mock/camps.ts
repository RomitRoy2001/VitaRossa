// src/data/mock/camps.ts
import type { DonationCamp, CampRegistration } from '../../types';

export const MOCK_CAMPS: DonationCamp[] = [
  {
    id: 'camp-001', campId: 'BF-CAMP-2024-001',
    name: 'Infosys Blood Drive 2024',
    description: 'Annual blood donation drive organized with Infosys CSR team.',
    location: 'Infosys Campus, Electronic City',
    address: 'Electronic City Phase 1', city: 'Bangalore', date: '2024-09-10',
    startTime: '09:00', endTime: '17:00',
    organizer: 'Infosys CSR Team', coordinatorId: 'usr-006',
    expectedDonors: 200, registeredDonors: 147, checkedIn: 0, donationsCollected: 0,
    status: 'REGISTRATION_OPEN',
    createdAt: '2024-08-01T10:00:00Z', updatedAt: '2024-09-03T14:00:00Z',
  },
  {
    id: 'camp-002', campId: 'BF-CAMP-2024-002',
    name: 'City College Donation Camp',
    description: 'Student-organized blood donation camp.',
    location: 'Christ University Campus',
    address: 'Hosur Road', city: 'Bangalore', date: '2024-09-15',
    startTime: '10:00', endTime: '16:00',
    organizer: 'Christ University NSS', coordinatorId: 'usr-006',
    expectedDonors: 100, registeredDonors: 62, checkedIn: 0, donationsCollected: 0,
    status: 'SCHEDULED',
    createdAt: '2024-08-15T09:00:00Z', updatedAt: '2024-09-01T10:00:00Z',
  },
  {
    id: 'camp-003', campId: 'BF-CAMP-2024-003',
    name: 'Government Hospital Community Drive',
    description: 'Community blood drive at Victoria Hospital.',
    location: 'Victoria Hospital', address: 'Fort Road', city: 'Bangalore',
    date: '2024-08-20', startTime: '08:00', endTime: '14:00',
    organizer: 'BloodFlow Team', coordinatorId: 'usr-006',
    expectedDonors: 150, registeredDonors: 143, checkedIn: 139, donationsCollected: 131,
    status: 'COMPLETED',
    createdAt: '2024-07-20T10:00:00Z', updatedAt: '2024-08-20T15:00:00Z',
  },
  {
    id: 'camp-004', campId: 'BF-CAMP-2024-004',
    name: 'Tech Park Mega Drive',
    location: 'Bagmane Tech Park', address: 'CV Raman Nagar', city: 'Bangalore',
    date: '2024-10-05', startTime: '09:00', endTime: '18:00',
    organizer: 'Bagmane Developers', coordinatorId: 'usr-006',
    expectedDonors: 300, registeredDonors: 0, checkedIn: 0, donationsCollected: 0,
    status: 'DRAFT',
    createdAt: '2024-09-01T10:00:00Z', updatedAt: '2024-09-01T10:00:00Z',
  },
];

export const MOCK_CAMP_REGISTRATIONS: CampRegistration[] = [
  {
    id: 'cr-001', campId: 'camp-001', donorId: 'dnr-001',
    donorName: 'Kiran Patel', donorBloodGroup: 'O+', donorPhone: '+91 98765 43210',
    registeredAt: '2024-08-15T10:00:00Z', donationStatus: 'PENDING',
  },
  {
    id: 'cr-002', campId: 'camp-001', donorId: 'dnr-002',
    donorName: 'Deepa Krishnan', donorBloodGroup: 'A+', donorPhone: '+91 87654 32109',
    registeredAt: '2024-08-16T11:00:00Z', donationStatus: 'PENDING',
  },
];
