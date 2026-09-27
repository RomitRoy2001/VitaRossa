// src/components/shared/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAuth } from '../../hooks/useAuth';
import { restoreSessionThunk } from '../../store/slices/authSlice';
import { tokenStorage } from '../../api/api';
import type { UserRole } from '../../types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, isLoading, role } = useAuth();
  const hasToken = Boolean(tokenStorage.getToken());

  // Attempt session restore if we have a token but no user
  useEffect(() => {
    if (hasToken && !isAuthenticated && !isLoading) {
      dispatch(restoreSessionThunk());
    }
  }, [hasToken, isAuthenticated, isLoading, dispatch]);

  // Show loading while restoring session
  if (isLoading || (hasToken && !isAuthenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050a13]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-crimson/20 border border-crimson/30 flex items-center justify-center">
            <Loader2 size={20} className="text-crimson animate-spin" />
          </div>
          <p className="text-sm text-slate-500">Loading BloodFlow…</p>
        </div>
      </div>
    );
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role guard — redirect to dashboard if unauthorized
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Standalone role guard (for rendering conditional UI blocks)
export const RoleGuard: React.FC<{
  children: React.ReactNode;
  roles: UserRole[];
  fallback?: React.ReactNode;
}> = ({ children, roles, fallback = null }) => {
  const { role } = useAuth();
  if (!role || !roles.includes(role)) return <>{fallback}</>;
  return <>{children}</>;
};
