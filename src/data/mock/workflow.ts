// src/data/mock/workflow.ts
import type { WorkflowEvent } from '../../types';

export const MOCK_WORKFLOW_EVENTS: WorkflowEvent[] = [
  {
    id: 'wf-001', entityType: 'BLOOD_UNIT', entityId: 'bu-003',
    entityLabel: 'BU-AB--001', action: 'BLOOD_UNIT_ISSUED',
    description: 'Blood unit BU-AB--001 (AB-) issued to KEM Hospital for patient Anita Roy.',
    performedBy: 'Vikram Singh', performedByRole: 'DISPATCH_STAFF',
    status: 'ISSUED', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'wf-002', entityType: 'DONATION', entityId: 'don-002',
    entityLabel: 'BF-DON-2024-002', action: 'DONATION_TESTED',
    description: 'Donation BF-DON-2024-002 (A+) testing completed. All tests passed.',
    performedBy: 'Ravi Kumar', performedByRole: 'LAB_TECHNICIAN',
    status: 'TESTING', timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 'wf-003', entityType: 'BLOOD_REQUEST', entityId: 'req-001',
    entityLabel: 'BF-REQ-2024-001', action: 'REQUEST_APPROVED',
    description: 'Emergency blood request BF-REQ-2024-001 approved for Apollo Hospitals.',
    performedBy: 'Priya Mehta', performedByRole: 'ADMIN',
    status: 'APPROVED', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'wf-004', entityType: 'DONATION_CAMP', entityId: 'camp-001',
    entityLabel: 'Infosys Blood Drive 2024', action: 'CAMP_CREATED',
    description: 'Donation camp "Infosys Blood Drive 2024" created and registration opened.',
    performedBy: 'Ananya Nair', performedByRole: 'CAMP_COORDINATOR',
    status: 'REGISTRATION_OPEN', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'wf-005', entityType: 'INVENTORY_MOVEMENT', entityId: 'im-003',
    entityLabel: 'BU-O--001', action: 'INVENTORY_TRANSFERRED',
    description: 'Blood unit BU-O--001 transferred from Refrigerator A to Refrigerator B.',
    performedBy: 'Sunita Reddy', performedByRole: 'BLOOD_BANK_STAFF',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: 'wf-006', entityType: 'DONATION', entityId: 'don-003',
    entityLabel: 'BF-DON-2024-003', action: 'DONATION_COLLECTED',
    description: 'Blood collection completed for donor Sneha Iyer. Volume: 480ml.',
    performedBy: 'Sunita Reddy', performedByRole: 'BLOOD_BANK_STAFF',
    status: 'COLLECTED', timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'wf-007', entityType: 'BLOOD_REQUEST', entityId: 'req-005',
    entityLabel: 'BF-REQ-2024-005', action: 'REQUEST_DISPATCHED',
    description: 'Blood units dispatched to Apollo Hospitals for patient Gopal Iyer.',
    performedBy: 'Vikram Singh', performedByRole: 'DISPATCH_STAFF',
    status: 'DISPATCHED', timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
];
