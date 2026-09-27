// src/pages/RequestsPage.tsx
import React, { useState } from 'react';
import {
  ClipboardList, Clock, Building2, CheckCircle2,
  ShieldAlert, Plus,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { BloodGroupBadge, PriorityBadge, StatusBadge } from '../components/shared/Badge';
import { DataTable, type Column } from '../components/shared/DataTable';
import { Modal } from '../components/shared/Modal';
import { Input, Select } from '../components/shared/Input';
import { MOCK_REQUESTS } from '../data/mock/requests';
import { formatDate, formatRelativeTime } from '../utils/formatters';
import type { BloodRequest, RequestPriority, BloodGroup, BloodComponent } from '../types';

export const RequestsPage: React.FC = () => {
  const [requestsList, setRequestsList] = useState<BloodRequest[]>(MOCK_REQUESTS);
  const [selectedReq, setSelectedReq] = useState<BloodRequest | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New request form state
  const [hospitalName, setHospitalName] = useState('Apollo Hospitals');
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [component, setComponent] = useState<BloodComponent>('WHOLE_BLOOD');
  const [quantity, setQuantity] = useState('2');
  const [priority, setPriority] = useState<RequestPriority>('URGENT');

  const emergencyCount = requestsList.filter((r) => r.priority === 'EMERGENCY').length;
  const urgentCount = requestsList.filter((r) => r.priority === 'URGENT').length;
  const pendingApproval = requestsList.filter((r) => r.status === 'NEW' || r.status === 'VERIFICATION').length;

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) return;

    const newReq: BloodRequest = {
      id: `req-${Date.now()}`,
      requestId: `BF-REQ-2024-${String(requestsList.length + 1).padStart(3, '0')}`,
      hospitalId: 'hosp-001',
      hospitalName,
      patientName,
      patientAge: 42,
      patientGender: 'MALE',
      bloodGroup,
      component,
      quantity: Number(quantity) || 1,
      priority,
      status: 'NEW',
      requiredBy: new Date(Date.now() + 3600000 * 4).toISOString(),
      requestedBy: 'Dr. Ramesh Nair',
      notes: 'Emergency clinical requisition submitted via portal.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRequestsList([newReq, ...requestsList]);
    setIsNewModalOpen(false);
    setPatientName('');
  };

  const handleApproveRequest = (id: string) => {
    setRequestsList(
      requestsList.map((r) => (r.id === id ? { ...r, status: 'APPROVED', approvedBy: 'Priya Mehta' } : r))
    );
    if (selectedReq?.id === id) {
      setSelectedReq({ ...selectedReq, status: 'APPROVED', approvedBy: 'Priya Mehta' });
    }
  };

  const columns: Column<BloodRequest>[] = [
    {
      key: 'requestId',
      header: 'REQ ID',
      sortable: true,
      render: (r) => (
        <span className="font-mono text-xs font-semibold text-slate-100 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {r.requestId}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'PRIORITY',
      sortable: true,
      render: (r) => <PriorityBadge priority={r.priority} />,
    },
    {
      key: 'hospitalName',
      header: 'HOSPITAL & PATIENT',
      sortable: true,
      render: (r) => (
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-200">
            <Building2 size={12} className="text-slate-500" />
            <span>{r.hospitalName}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Patient: <span className="text-slate-300">{r.patientName}</span> ({r.patientAge ?? '—'}y, {r.patientGender ?? 'M'})
          </p>
        </div>
      ),
    },
    {
      key: 'bloodGroup',
      header: 'SPECIMEN REQ',
      sortable: true,
      render: (r) => (
        <div className="flex items-center gap-2">
          <BloodGroupBadge group={r.bloodGroup} size="sm" />
          <span className="text-xs text-slate-300 font-mono font-bold">× {r.quantity}</span>
        </div>
      ),
    },
    {
      key: 'component',
      header: 'COMPONENT',
      sortable: true,
      render: (r) => (
        <span className="text-xs text-slate-300 font-medium">
          {r.component.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      key: 'requiredBy',
      header: 'DEADLINE',
      sortable: true,
      render: (r) => (
        <div className="text-xs font-mono">
          <p className="text-slate-300">{formatRelativeTime(r.requiredBy)}</p>
          <p className="text-[10px] text-slate-500">{formatDate(r.requiredBy)}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      sortable: true,
      render: (r) => <StatusBadge status={r.status} size="xs" />,
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Hospital Requisition Command"
        subtitle="Emergency Requisition Allocation, Priority Routing, and Hospital Fulfillment Queue"
        breadcrumb={['COMMAND', 'REQUESTS']}
        actions={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => setIsNewModalOpen(true)}
          >
            Create Hospital Request
          </Button>
        }
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Emergency Priority"
          value={emergencyCount}
          icon={<ShieldAlert size={20} />}
          urgent
          subtext="Immediate dispatch required"
          accentColor="text-rose-400"
        />
        <StatCard
          title="Urgent Priority"
          value={urgentCount}
          icon={<Clock size={20} />}
          subtext="Delivery needed within 24h"
          accentColor="text-amber-400"
        />
        <StatCard
          title="Pending Allocation"
          value={pendingApproval}
          icon={<ClipboardList size={20} />}
          subtext="Awaiting medical officer signoff"
          accentColor="text-sky-400"
        />
      </div>

      {/* Main Request Data Table */}
      <DataTable
        data={requestsList}
        columns={columns}
        keyExtractor={(r) => r.id}
        searchPlaceholder="Search by Request ID, hospital, or patient name…"
        searchFilter={(r, q) =>
          r.requestId.toLowerCase().includes(q) ||
          r.hospitalName.toLowerCase().includes(q) ||
          r.patientName.toLowerCase().includes(q) ||
          r.bloodGroup.toLowerCase().includes(q) ||
          r.priority.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q)
        }
        onRowClick={(r) => setSelectedReq(r)}
      />

      {/* Request Details & Action Modal */}
      <Modal
        isOpen={Boolean(selectedReq)}
        onClose={() => setSelectedReq(null)}
        title={selectedReq ? `Requisition: ${selectedReq.requestId}` : ''}
        subtitle="Clinical Verification, Allocation Status, and Dispatch Actions"
        size="lg"
      >
        {selectedReq && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Priority Level</p>
                <div className="mt-1">
                  <PriorityBadge priority={selectedReq.priority} />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedReq.status} size="xs" />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Blood Required</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <BloodGroupBadge group={selectedReq.bloodGroup} size="sm" />
                  <span className="font-mono text-xs text-slate-200">× {selectedReq.quantity} units</span>
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Required By</p>
                <p className="text-xs font-semibold text-slate-200 mt-1 font-mono">{formatDate(selectedReq.requiredBy)}</p>
              </div>
            </div>

            <div className="p-4 bg-[#070b14] rounded-xl border border-white/6 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Hospital Facility:</span>
                <span className="text-slate-200 font-semibold">{selectedReq.hospitalName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Patient Details:</span>
                <span className="text-slate-200">{selectedReq.patientName} ({selectedReq.patientAge}y, {selectedReq.patientGender})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Component Type:</span>
                <span className="text-slate-200 font-mono">{selectedReq.component}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Ordering Physician:</span>
                <span className="text-slate-200 font-mono">{selectedReq.requestedBy}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Approved By:</span>
                <span className="text-slate-200 font-mono">{selectedReq.approvedBy ?? 'Pending Approval'}</span>
              </div>
            </div>

            {selectedReq.notes && (
              <div className="p-3 bg-red-950/20 border border-red-800/30 rounded-xl text-xs">
                <span className="font-semibold text-red-400">Clinical Indication: </span>
                <span className="text-slate-300">{selectedReq.notes}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedReq(null)}>
                Dismiss
              </Button>

              <div className="flex items-center gap-2">
                {selectedReq.status === 'NEW' && (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<CheckCircle2 size={14} />}
                    onClick={() => handleApproveRequest(selectedReq.id)}
                  >
                    Approve & Allocate Units
                  </Button>
                )}
                {selectedReq.status === 'APPROVED' && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      setRequestsList(
                        requestsList.map((r) =>
                          r.id === selectedReq.id ? { ...r, status: 'DISPATCHED', dispatchedBy: 'Vikram Singh' } : r
                        )
                      );
                      setSelectedReq({ ...selectedReq, status: 'DISPATCHED', dispatchedBy: 'Vikram Singh' });
                    }}
                  >
                    Authorize Dispatch
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* New Request Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Submit Emergency Hospital Requisition"
        subtitle="Direct channel requisition to blood bank operations"
        size="md"
      >
        <form onSubmit={handleCreateRequest} className="space-y-4">
          <Input
            label="Hospital Facility Name"
            required
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Apollo Hospitals"
          />

          <Input
            label="Patient Full Name"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g. Ramesh Chandra"
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Blood Group"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
              ]}
            />
            <Select
              label="Urgency / Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as RequestPriority)}
              options={[
                { value: 'EMERGENCY', label: '🚨 EMERGENCY (Immediate)' },
                { value: 'URGENT', label: '⚠️ URGENT (Within 24h)' },
                { value: 'NORMAL', label: 'ℹ️ NORMAL (Scheduled)' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Blood Component"
              value={component}
              onChange={(e) => setComponent(e.target.value as BloodComponent)}
              options={[
                { value: 'WHOLE_BLOOD', label: 'Whole Blood' },
                { value: 'PACKED_RED_CELLS', label: 'Packed Red Cells' },
                { value: 'PLATELETS', label: 'Platelets' },
                { value: 'FRESH_FROZEN_PLASMA', label: 'Fresh Frozen Plasma' },
              ]}
            />
            <Input
              label="Units Required"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsNewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Submit Requisition
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
