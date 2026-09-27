// src/data/mock/inventory.ts
import type { InventorySummaryItem } from '../../types';

export const MOCK_INVENTORY_SUMMARY: InventorySummaryItem[] = [
  { bloodGroup: 'A+',  available: 48, reserved: 12, expiringSoon: 3,  total: 60,  targetLevel: 80, status: 'LOW'      },
  { bloodGroup: 'A-',  available: 12, reserved: 4,  expiringSoon: 1,  total: 16,  targetLevel: 30, status: 'CRITICAL' },
  { bloodGroup: 'B+',  available: 65, reserved: 18, expiringSoon: 5,  total: 83,  targetLevel: 70, status: 'ADEQUATE' },
  { bloodGroup: 'B-',  available: 8,  reserved: 2,  expiringSoon: 2,  total: 10,  targetLevel: 25, status: 'CRITICAL' },
  { bloodGroup: 'AB+', available: 22, reserved: 6,  expiringSoon: 0,  total: 28,  targetLevel: 35, status: 'LOW'      },
  { bloodGroup: 'AB-', available: 5,  reserved: 1,  expiringSoon: 0,  total: 6,   targetLevel: 20, status: 'CRITICAL' },
  { bloodGroup: 'O+',  available: 92, reserved: 28, expiringSoon: 8,  total: 120, targetLevel: 100, status: 'ADEQUATE'},
  { bloodGroup: 'O-',  available: 18, reserved: 7,  expiringSoon: 3,  total: 25,  targetLevel: 40, status: 'LOW'      },
];

export const MOCK_INVENTORY_MOVEMENTS = [
  { id: 'im-001', unitId: 'BU-O+-001', movementType: 'IN' as const, toLocation: 'Refrigerator A', quantity: 1, reason: 'New unit processed', performedBy: 'Sunita Reddy', performedAt: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: 'im-002', unitId: 'BU-AB--001', movementType: 'OUT' as const, fromLocation: 'Refrigerator B', quantity: 1, reason: 'Issued to hospital', performedBy: 'Vikram Singh', performedAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 'im-003', unitId: 'BU-O--001', movementType: 'TRANSFER' as const, fromLocation: 'Refrigerator A', toLocation: 'Refrigerator B', quantity: 1, reason: 'Storage reorganization', performedBy: 'Sunita Reddy', performedAt: new Date(Date.now() - 3600000 * 5).toISOString() },
];
