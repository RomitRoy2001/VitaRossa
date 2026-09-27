// src/types/index.ts
// All domain types for BloodFlow. No `any`.

// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'LAB_TECHNICIAN'
  | 'BLOOD_BANK_STAFF'
  | 'DISPATCH_STAFF'
  | 'CAMP_COORDINATOR';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  employeeId?: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// ─── Employee ─────────────────────────────────────────────────────────────────

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  lastActivity?: string;
  joinedAt: string;
  avatarUrl?: string;
}

// ─── Donor ───────────────────────────────────────────────────────────────────

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type DonorStatus = 'ELIGIBLE' | 'DEFERRED' | 'INACTIVE' | 'BLACKLISTED';

export interface Donor {
  id: string;
  donorId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup: BloodGroup;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: DonorStatus;
  eligibilityDate?: string;
  lastDonationDate?: string;
  totalDonations: number;
  emergencyContact?: string;
  medicalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Donation ─────────────────────────────────────────────────────────────────

export type DonationStatus =
  | 'REGISTERED'
  | 'SCREENING'
  | 'APPROVED'
  | 'COLLECTED'
  | 'TESTING'
  | 'PROCESSED'
  | 'AVAILABLE'
  | 'DISCARDED';

export interface Donation {
  id: string;
  donationId: string;
  donorId: string;
  donorName: string;
  bloodGroup: BloodGroup;
  status: DonationStatus;
  collectionDate?: string;
  volumeMl?: number;
  hemoglobinLevel?: number;
  bloodPressure?: string;
  pulse?: number;
  temperature?: number;
  screeningNotes?: string;
  testingNotes?: string;
  processedBy?: string;
  campId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Blood Unit ────────────────────────────────────────────────────────────────

export type BloodComponent =
  | 'WHOLE_BLOOD'
  | 'PACKED_RED_CELLS'
  | 'PLATELETS'
  | 'FRESH_FROZEN_PLASMA'
  | 'CRYOPRECIPITATE';

export type BloodUnitStatus =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'ISSUED'
  | 'DISPATCHED'
  | 'EXPIRED'
  | 'DISCARDED';

export type QualityStatus = 'PASS' | 'FAIL' | 'PENDING' | 'QUARANTINE';

export interface StorageLocation {
  id: string;
  name: string;
  section: string;
  row: string;
  position: number;
  temperature: string;
  capacity: number;
  currentOccupancy: number;
}

export interface BloodUnit {
  id: string;
  unitId: string;
  donationId: string;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  volumeMl: number;
  collectionDate: string;
  expiryDate: string;
  status: BloodUnitStatus;
  qualityStatus: QualityStatus;
  storageLocation?: StorageLocation;
  donorId: string;
  donorName: string;
  processedAt?: string;
  processedBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Inventory Movement ───────────────────────────────────────────────────────

export type MovementType = 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT' | 'DISCARD';

export interface InventoryMovement {
  id: string;
  unitId: string;
  movementType: MovementType;
  fromLocation?: string;
  toLocation?: string;
  quantity: number;
  reason: string;
  performedBy: string;
  performedAt: string;
  notes?: string;
}

// ─── Hospital ─────────────────────────────────────────────────────────────────

export interface Hospital {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email?: string;
  contactPerson: string;
  isActive: boolean;
  createdAt: string;
}

// ─── Blood Request ────────────────────────────────────────────────────────────

export type RequestStatus =
  | 'NEW'
  | 'VERIFICATION'
  | 'APPROVED'
  | 'RESERVED'
  | 'ISSUED'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'CLOSED'
  | 'REJECTED';

export type RequestPriority = 'NORMAL' | 'URGENT' | 'EMERGENCY';

export interface BloodRequestUnit {
  id: string;
  requestId: string;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  quantityRequested: number;
  quantityFulfilled: number;
  bloodUnitIds: string[];
}

export interface BloodRequest {
  id: string;
  requestId: string;
  hospitalId: string;
  hospitalName: string;
  patientName: string;
  patientAge?: number;
  patientGender?: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup: BloodGroup;
  component: BloodComponent;
  quantity: number;
  priority: RequestPriority;
  status: RequestStatus;
  requiredBy: string;
  requestedBy: string;
  approvedBy?: string;
  issuedBy?: string;
  dispatchedBy?: string;
  notes?: string;
  units?: BloodRequestUnit[];
  createdAt: string;
  updatedAt: string;
}

// ─── Donation Camp ────────────────────────────────────────────────────────────

export type CampStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'REGISTRATION_OPEN'
  | 'ONGOING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface DonationCamp {
  id: string;
  campId: string;
  name: string;
  description?: string;
  location: string;
  address: string;
  city: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
  coordinatorId: string;
  expectedDonors: number;
  registeredDonors: number;
  checkedIn: number;
  donationsCollected: number;
  status: CampStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampRegistration {
  id: string;
  campId: string;
  donorId: string;
  donorName: string;
  donorBloodGroup: BloodGroup;
  donorPhone: string;
  registeredAt: string;
  checkedInAt?: string;
  donationStatus?: 'PENDING' | 'DONATED' | 'DEFERRED' | 'NO_SHOW';
}

// ─── Workflow ─────────────────────────────────────────────────────────────────

export type WorkflowEntityType =
  | 'DONATION'
  | 'BLOOD_UNIT'
  | 'BLOOD_REQUEST'
  | 'DONATION_CAMP'
  | 'INVENTORY_MOVEMENT'
  | 'EMPLOYEE_ACTIVITY';

export interface WorkflowEvent {
  id: string;
  entityType: WorkflowEntityType;
  entityId: string;
  entityLabel: string;
  action: string;
  description: string;
  performedBy: string;
  performedByRole: UserRole;
  status?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export type NotificationSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
export type NotificationType =
  | 'LOW_STOCK'
  | 'EXPIRING_UNIT'
  | 'EMERGENCY_REQUEST'
  | 'NEW_REQUEST'
  | 'CAMP_REMINDER'
  | 'SYSTEM';

export interface Notification {
  id: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  message: string;
  isRead: boolean;
  entityId?: string;
  entityType?: string;
  createdAt: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface InventorySummaryItem {
  bloodGroup: BloodGroup;
  available: number;
  reserved: number;
  expiringSoon: number;
  total: number;
  targetLevel: number;
  status: 'CRITICAL' | 'LOW' | 'ADEQUATE' | 'SURPLUS';
}

export interface DashboardSummary {
  totalDonors: number;
  donationsToday: number;
  availableUnits: number;
  pendingRequests: number;
  emergencyRequests: number;
  expiringUnits: number;
  inventorySummary: InventorySummaryItem[];
  recentActivity: WorkflowEvent[];
  alerts: Notification[];
}

// ─── Generic ──────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

export interface SelectOption {
  value: string;
  label: string;
}
