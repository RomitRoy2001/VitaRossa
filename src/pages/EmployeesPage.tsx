// src/pages/EmployeesPage.tsx
import React, { useState } from 'react';
import {
  UserCog, Building2, CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { StatusBadge } from '../components/shared/Badge';
import { DataTable, type Column } from '../components/shared/DataTable';
import { Modal } from '../components/shared/Modal';
import { MOCK_EMPLOYEES } from '../data/mock/employees';
import { formatName, formatRole, formatRelativeTime, formatDate } from '../utils/formatters';
import type { Employee } from '../types';

export const EmployeesPage: React.FC = () => {
  const employees = MOCK_EMPLOYEES;
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');

  const filteredEmployees = departmentFilter === 'ALL'
    ? employees
    : employees.filter((e) => e.department === departmentFilter);

  const departments = Array.from(new Set(employees.map((e) => e.department)));

  const columns: Column<Employee>[] = [
    {
      key: 'employeeId',
      header: 'STAFF ID',
      sortable: true,
      render: (e) => (
        <span className="font-mono text-xs font-semibold text-slate-100 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {e.employeeId}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'OPERATOR NAME',
      sortable: true,
      render: (e) => (
        <div>
          <p className="text-xs font-semibold text-slate-200">{formatName(e.firstName, e.lastName)}</p>
          <p className="text-[11px] text-slate-500 font-mono">{e.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'ACCESS ROLE',
      sortable: true,
      render: (e) => (
        <span className="text-xs font-mono font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
          {formatRole(e.role)}
        </span>
      ),
    },
    {
      key: 'department',
      header: 'DEPARTMENT',
      sortable: true,
      render: (e) => <span className="text-xs text-slate-300">{e.department}</span>,
    },
    {
      key: 'status',
      header: 'STATUS',
      sortable: true,
      render: (e) => <StatusBadge status={e.status} size="xs" />,
    },
    {
      key: 'lastActivity',
      header: 'LAST TELEMETRY',
      sortable: true,
      render: (e) => (
        <span className="text-xs font-mono text-slate-400">
          {formatRelativeTime(e.lastActivity)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Personnel & Role Permissions"
        subtitle="Certified Clinical Phlebotomists, Lab Technicians, Dispatch Drivers, and System Administrators"
        breadcrumb={['COMMAND', 'EMPLOYEES']}
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Certified Personnel"
          value={employees.length}
          icon={<UserCog size={20} />}
          subtext="Active authorization"
          accentColor="text-sky-400"
        />
        <StatCard
          title="Active On Duty"
          value={employees.filter((e) => e.status === 'ACTIVE').length}
          icon={<CheckCircle2 size={20} />}
          subtext="Logged in to workstation"
          accentColor="text-emerald-400"
        />
        <StatCard
          title="Operational Departments"
          value={departments.length}
          icon={<Building2 size={20} />}
          subtext="Specialized units"
          accentColor="text-purple-400"
        />
      </div>

      {/* Department Filter Tabs & Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
            Authorized Personnel Directory
          </h2>
          <div className="flex items-center gap-1.5 bg-[#0b1120] p-1 rounded-lg border border-white/8 text-xs font-mono">
            {['ALL', ...departments].map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  departmentFilter === dept
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          data={filteredEmployees}
          columns={columns}
          keyExtractor={(e) => e.id}
          searchPlaceholder="Search staff by name, role, email, or department…"
          searchFilter={(e, q) =>
            e.firstName.toLowerCase().includes(q) ||
            e.lastName.toLowerCase().includes(q) ||
            e.email.toLowerCase().includes(q) ||
            e.department.toLowerCase().includes(q) ||
            e.role.toLowerCase().includes(q)
          }
          onRowClick={(e) => setSelectedEmp(e)}
        />
      </div>

      {/* Employee Detail Modal */}
      <Modal
        isOpen={Boolean(selectedEmp)}
        onClose={() => setSelectedEmp(null)}
        title={selectedEmp ? `${formatName(selectedEmp.firstName, selectedEmp.lastName)} (${selectedEmp.employeeId})` : ''}
        subtitle={selectedEmp ? `${formatRole(selectedEmp.role)} • ${selectedEmp.department}` : ''}
        size="md"
      >
        {selectedEmp && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#070b14] rounded-xl border border-white/6 space-y-2">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Email Address:</span>
                <span className="text-slate-200 font-mono">{selectedEmp.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Direct Phone:</span>
                <span className="text-slate-200 font-mono">{selectedEmp.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Department Unit:</span>
                <span className="text-slate-200 font-semibold">{selectedEmp.department}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Joined Organization:</span>
                <span className="text-slate-200 font-mono">{formatDate(selectedEmp.joinedAt)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Workstation Status:</span>
                <span className="text-emerald-400 font-mono font-medium">Session Active (Telemetry nominal)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedEmp(null)}>
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
