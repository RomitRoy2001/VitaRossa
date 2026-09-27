// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DonorsPage } from './pages/DonorsPage';
import { DonationsPage } from './pages/DonationsPage';
import { InventoryPage } from './pages/InventoryPage';
import { RequestsPage } from './pages/RequestsPage';
import { DispatchPage } from './pages/DispatchPage';
import { TestingPage } from './pages/TestingPage';
import { CampsPage } from './pages/CampsPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/StubPage';
import { Loader2 } from 'lucide-react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#070b14]">
    <Loader2 size={24} className="text-red-500 animate-spin" />
  </div>
);

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public */}
    <Route path="/landing" element={<LandingPage />} />
    <Route path="/home" element={<Navigate to="/landing" replace />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Navigate to="/landing" replace />} />

    {/* Protected — inside command center shell */}
    <Route
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/donors" element={<DonorsPage />} />
      <Route path="/donors/:id" element={<DonorsPage />} />
      <Route path="/donations" element={<DonationsPage />} />
      <Route path="/donations/:id" element={<DonationsPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/:id" element={<InventoryPage />} />
      <Route path="/requests" element={<RequestsPage />} />
      <Route path="/requests/:id" element={<RequestsPage />} />
      <Route path="/dispatch" element={<DispatchPage />} />
      <Route path="/testing" element={<TestingPage />} />
      <Route path="/camps" element={<CampsPage />} />
      <Route path="/camps/:id" element={<CampsPage />} />
      <Route path="/workflow" element={<WorkflowPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/employees/:id" element={<EmployeesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  </Provider>
);

export default App;
