// src/hooks/useAuth.ts
import { useAppSelector } from './useAppDispatch';
import type { UserRole } from '../types';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector((s) => s.auth);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    role: user?.role ?? null,
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    initials: user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '',
  };
};

export const useRole = () => {
  const { user } = useAppSelector((s) => s.auth);
  const role = user?.role ?? null;

  const hasRole = (...roles: UserRole[]) => role !== null && roles.includes(role);
  const isSuperAdmin = () => role === 'SUPER_ADMIN';
  const isAdmin = () => role === 'ADMIN' || role === 'SUPER_ADMIN';
  const isLabTech = () => role === 'LAB_TECHNICIAN';
  const isBloodBankStaff = () => role === 'BLOOD_BANK_STAFF';
  const isDispatchStaff = () => role === 'DISPATCH_STAFF';
  const isCampCoordinator = () => role === 'CAMP_COORDINATOR';
  const canManageEmployees = () => role === 'SUPER_ADMIN';
  const canViewAnalytics = () => role === 'SUPER_ADMIN' || role === 'ADMIN';
  const canViewReports = () => role === 'SUPER_ADMIN' || role === 'ADMIN';
  const canManageInventory = () => role === 'SUPER_ADMIN' || role === 'BLOOD_BANK_STAFF';
  const canDispatch = () => role === 'SUPER_ADMIN' || role === 'DISPATCH_STAFF';
  const canCoordinateCamps = () => role === 'SUPER_ADMIN' || role === 'CAMP_COORDINATOR';

  return {
    role,
    hasRole,
    isSuperAdmin,
    isAdmin,
    isLabTech,
    isBloodBankStaff,
    isDispatchStaff,
    isCampCoordinator,
    canManageEmployees,
    canViewAnalytics,
    canViewReports,
    canManageInventory,
    canDispatch,
    canCoordinateCamps,
  };
};
