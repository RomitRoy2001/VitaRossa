// src/pages/DonationsPage.tsx
import React, { useState } from 'react';
import {
  Droplets, Plus, Activity, CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard, Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { BloodGroupBadge, StatusBadge } from '../components/shared/Badge';
import { DataTable, type Column } from '../components/shared/DataTable';
import { Modal } from '../components/shared/Modal';
import { Input, Select } from '../components/shared/Input';
import { MOCK_DONATIONS } from '../data/mock/donations';
import { formatDate, formatVolume } from '../utils/formatters';
import type { Donation, BloodGroup } from '../types';

export const DonationsPage: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // New donation form
  const [donorName, setDonorName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [volumeMl, setVolumeMl] = useState('450');
  const [hb, setHb] = useState('14.2');
  const [bp, setBp] = useState('120/80');

  const todayCount = donations.length;
  const inTestingCount = donations.filter((d) => d.status === 'TESTING').length;
  const processedCount = donations.filter((d) => d.status === 'PROCESSED' || d.status === 'AVAILABLE').length;

  const handleRecordDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName) return;

    const newDonation: Donation = {
      id: `don-${Date.now()}`,
      donationId: `BF-DON-2024-${String(donations.length + 1).padStart(3, '0')}`,
      donorId: 'dnr-custom',
      donorName,
      bloodGroup,
      status: 'COLLECTED',
      collectionDate: new Date().toISOString().split('T')[0],
      volumeMl: Number(volumeMl) || 450,
      hemoglobinLevel: Number(hb) || 14.0,
      bloodPressure: bp || '120/80',
      pulse: 72,
      temperature: 36.6,
      screeningNotes: 'Vitals validated. Approved for phlebotomy.',
      processedBy: 'EMP-003',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDonations([newDonation, ...donations]);
    setIsRecordModalOpen(false);
    setDonorName('');
  };

  const columns: Column<Donation>[] = [
    {
      key: 'donationId',
      header: 'DONATION ID',
      sortable: true,
      render: (d) => (
        <span className="font-mono text-xs font-semibold text-slate-100 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {d.donationId}
        </span>
      ),
    },
    {
      key: 'donorName',
      header: 'DONOR',
      sortable: true,
      render: (d) => (
        <div>
          <p className="text-xs font-semibold text-slate-200">{d.donorName}</p>
          <span className="text-[10px] text-slate-500 font-mono">ID: {d.donorId}</span>
        </div>
      ),
    },
    {
      key: 'bloodGroup',
      header: 'GROUP',
      sortable: true,
      render: (d) => <BloodGroupBadge group={d.bloodGroup} size="sm" />,
    },
    {
      key: 'status',
      header: 'PIPELINE STAGE',
      sortable: true,
      render: (d) => <StatusBadge status={d.status} size="xs" />,
    },
    {
      key: 'volumeMl',
      header: 'VOLUME',
      sortable: true,
      render: (d) => <span className="font-mono text-xs text-slate-300">{formatVolume(d.volumeMl)}</span>,
    },
    {
      key: 'vitals',
      header: 'SCREENING VITALS',
      render: (d) => (
        <div className="flex items-center gap-2 text-[11px] font-mono">
          {d.hemoglobinLevel && (
            <span className="bg-red-950/30 text-red-300 px-1.5 py-0.2 rounded border border-red-800/30">
              Hb: {d.hemoglobinLevel}
            </span>
          )}
          {d.bloodPressure && (
            <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
              BP: {d.bloodPressure}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'collectionDate',
      header: 'DATE',
      sortable: true,
      render: (d) => <span className="text-xs text-slate-400 font-mono">{formatDate(d.collectionDate)}</span>,
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Donation Intake & Phlebotomy"
        subtitle="Clinical Screening, Whole Blood & Apheresis Intake, and Laboratory Release Pipeline"
        breadcrumb={['COMMAND', 'DONATIONS']}
        actions={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => setIsRecordModalOpen(true)}
          >
            Record New Donation
          </Button>
        }
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Donations in Session"
          value={todayCount}
          icon={<Droplets size={20} />}
          subtext="Active entries today"
          accentColor="text-red-400"
        />
        <StatCard
          title="In Testing Laboratory"
          value={inTestingCount}
          icon={<Activity size={20} />}
          subtext="Infectious disease screening"
          accentColor="text-purple-400"
        />
        <StatCard
          title="Processed & Ready"
          value={processedCount}
          icon={<CheckCircle2 size={20} />}
          subtext="Cleared for inventory allocation"
          accentColor="text-emerald-400"
        />
      </div>

      {/* Donation Pipeline Stepper Bar */}
      <Card padding="none">
        <div className="p-4 border-b border-white/8 bg-[#0b1120]/40">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Phlebotomy Lifecycle Stages
          </h3>
        </div>
        <div className="p-4 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
          {[
            { stage: '1. REGISTERED', count: 1, color: 'text-slate-400' },
            { stage: '2. SCREENING', count: 1, color: 'text-amber-400' },
            { stage: '3. COLLECTED', count: 1, color: 'text-blue-400' },
            { stage: '4. TESTING', count: 1, color: 'text-purple-400' },
            { stage: '5. PROCESSED', count: 1, color: 'text-cyan-400' },
            { stage: '6. AVAILABLE', count: 2, color: 'text-emerald-400' },
          ].map((s) => (
            <div key={s.stage} className="p-2 bg-[#070b14] border border-white/6 rounded-lg">
              <p className={`font-bold font-mono ${s.color}`}>{s.stage}</p>
              <p className="text-[11px] text-slate-500 mt-1">{s.count} in queue</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Table */}
      <DataTable
        data={donations}
        columns={columns}
        keyExtractor={(d) => d.id}
        searchPlaceholder="Search by donation ID, donor name, or blood group…"
        searchFilter={(d, q) =>
          d.donationId.toLowerCase().includes(q) ||
          d.donorName.toLowerCase().includes(q) ||
          d.bloodGroup.toLowerCase().includes(q) ||
          d.status.toLowerCase().includes(q)
        }
        onRowClick={(d) => setSelectedDonation(d)}
      />

      {/* Donation Details Modal */}
      <Modal
        isOpen={Boolean(selectedDonation)}
        onClose={() => setSelectedDonation(null)}
        title={selectedDonation ? `Donation Intake: ${selectedDonation.donationId}` : ''}
        subtitle="Comprehensive Vitals, Pre-screening Records, and Laboratory Notes"
        size="lg"
      >
        {selectedDonation && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Blood Group</p>
                <div className="mt-1">
                  <BloodGroupBadge group={selectedDonation.bloodGroup} size="md" />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedDonation.status} size="xs" />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Volume Drawn</p>
                <p className="text-sm font-bold text-slate-200 mt-1 font-mono">{formatVolume(selectedDonation.volumeMl)}</p>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Collection Date</p>
                <p className="text-xs font-semibold text-slate-200 mt-1 font-mono">{formatDate(selectedDonation.collectionDate)}</p>
              </div>
            </div>

            <div className="p-4 bg-[#070b14] rounded-xl border border-white/6 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Donor Name:</span>
                <span className="text-slate-200 font-semibold">{selectedDonation.donorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Hemoglobin (Hb):</span>
                <span className="text-slate-200 font-mono">{selectedDonation.hemoglobinLevel ? `${selectedDonation.hemoglobinLevel} g/dL` : 'Pending'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Blood Pressure:</span>
                <span className="text-slate-200 font-mono">{selectedDonation.bloodPressure ?? 'Pending'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Pulse / Body Temp:</span>
                <span className="text-slate-200 font-mono">
                  {selectedDonation.pulse ? `${selectedDonation.pulse} bpm • ${selectedDonation.temperature}°C` : 'Normal'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Attending Technician:</span>
                <span className="text-slate-200 font-mono">{selectedDonation.processedBy ?? 'Dr. Sharma'}</span>
              </div>
            </div>

            {selectedDonation.screeningNotes && (
              <div className="p-3 bg-white/4 border border-white/8 rounded-xl text-xs">
                <span className="font-semibold text-slate-300">Screening Log: </span>
                <span className="text-slate-400">{selectedDonation.screeningNotes}</span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedDonation(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Record Donation Modal */}
      <Modal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        title="Record New Phlebotomy Intake"
        subtitle="Log a completed whole blood collection with vital signs"
        size="md"
      >
        <form onSubmit={handleRecordDonation} className="space-y-4">
          <Input
            label="Donor Full Name"
            required
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="e.g. Vikramaditya Rao"
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
            <Input
              label="Volume Collected (ml)"
              type="number"
              value={volumeMl}
              onChange={(e) => setVolumeMl(e.target.value)}
              placeholder="450"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Hemoglobin (g/dL)"
              value={hb}
              onChange={(e) => setHb(e.target.value)}
              placeholder="14.2"
            />
            <Input
              label="Blood Pressure (BP)"
              value={bp}
              onChange={(e) => setBp(e.target.value)}
              placeholder="120/80"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsRecordModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Log Collection & Send to Lab
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
