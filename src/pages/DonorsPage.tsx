// src/pages/DonorsPage.tsx
import React, { useState } from 'react';
import {
  Users, UserPlus, Heart, CheckCircle2, AlertCircle, Mail, Phone, MapPin,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { BloodGroupBadge, StatusBadge } from '../components/shared/Badge';
import { DataTable, type Column } from '../components/shared/DataTable';
import { Modal } from '../components/shared/Modal';
import { Input, Select } from '../components/shared/Input';
import { MOCK_DONORS } from '../data/mock/donors';
import { formatDate, formatName } from '../utils/formatters';
import type { Donor, BloodGroup } from '../types';

export const DonorsPage: React.FC = () => {
  const [donorsList, setDonorsList] = useState<Donor[]>(MOCK_DONORS);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // New Donor Form state
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newBloodGroup, setNewBloodGroup] = useState<BloodGroup>('O+');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('Bangalore');

  const eligibleCount = donorsList.filter((d) => d.status === 'ELIGIBLE').length;
  const deferredCount = donorsList.filter((d) => d.status === 'DEFERRED').length;
  const totalLifetime = donorsList.reduce((acc, d) => acc + d.totalDonations, 0);

  const handleRegisterDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName || !newLastName || !newPhone) return;

    const created: Donor = {
      id: `dnr-${Date.now()}`,
      donorId: `BFD-2024-${String(donorsList.length + 1).padStart(3, '0')}`,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail || `${newFirstName.toLowerCase()}@example.com`,
      phone: newPhone,
      dateOfBirth: '1995-01-01',
      gender: 'MALE',
      bloodGroup: newBloodGroup,
      address: '12 Hospital Road',
      city: newCity,
      state: 'Karnataka',
      pincode: '560001',
      status: 'ELIGIBLE',
      totalDonations: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDonorsList([created, ...donorsList]);
    setIsRegisterOpen(false);
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
    setNewPhone('');
  };

  const columns: Column<Donor>[] = [
    {
      key: 'donorId',
      header: 'DONOR ID',
      sortable: true,
      render: (d) => (
        <span className="font-mono text-xs font-semibold text-slate-100 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {d.donorId}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'FULL NAME',
      sortable: true,
      render: (d) => (
        <div>
          <p className="text-xs font-semibold text-slate-100">{formatName(d.firstName, d.lastName)}</p>
          <p className="text-[11px] text-slate-500 font-mono">{d.phone}</p>
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
      header: 'ELIGIBILITY',
      sortable: true,
      render: (d) => <StatusBadge status={d.status} size="xs" />,
    },
    {
      key: 'city',
      header: 'LOCATION',
      sortable: true,
      render: (d) => <span className="text-xs text-slate-300">{d.city}, {d.state}</span>,
    },
    {
      key: 'totalDonations',
      header: 'TOTAL GIVEN',
      sortable: true,
      render: (d) => (
        <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-500/25 px-2 py-0.5 rounded">
          {d.totalDonations} units
        </span>
      ),
    },
    {
      key: 'lastDonationDate',
      header: 'LAST DONATION',
      sortable: true,
      render: (d) => <span className="text-xs text-slate-400 font-mono">{formatDate(d.lastDonationDate)}</span>,
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Donor Directory & Registry"
        subtitle="Universal Donor Roster, Screening Histories, and Eligibility Verification"
        breadcrumb={['COMMAND', 'DONORS']}
        actions={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<UserPlus size={14} />}
            onClick={() => setIsRegisterOpen(true)}
          >
            Register New Donor
          </Button>
        }
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Donors"
          value={donorsList.length}
          icon={<Users size={20} />}
          subtext="Active roster"
          accentColor="text-sky-400"
        />
        <StatCard
          title="Eligible to Donate"
          value={eligibleCount}
          icon={<CheckCircle2 size={20} />}
          subtext="Clear of deferrals"
          accentColor="text-emerald-400"
        />
        <StatCard
          title="Deferred / On Hold"
          value={deferredCount}
          icon={<AlertCircle size={20} />}
          subtext="Medical or wait period"
          accentColor="text-amber-400"
        />
        <StatCard
          title="Lifetime Units Contributed"
          value={totalLifetime}
          icon={<Heart size={20} />}
          subtext="Cumulative donations"
          accentColor="text-red-400"
        />
      </div>

      {/* Main Donor Data Table */}
      <DataTable
        data={donorsList}
        columns={columns}
        keyExtractor={(d) => d.id}
        searchPlaceholder="Search by name, ID, phone number, or city…"
        searchFilter={(d, q) =>
          d.firstName.toLowerCase().includes(q) ||
          d.lastName.toLowerCase().includes(q) ||
          d.donorId.toLowerCase().includes(q) ||
          d.phone.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.bloodGroup.toLowerCase().includes(q)
        }
        onRowClick={(d) => setSelectedDonor(d)}
      />

      {/* Donor Detail Modal */}
      <Modal
        isOpen={Boolean(selectedDonor)}
        onClose={() => setSelectedDonor(null)}
        title={selectedDonor ? `${formatName(selectedDonor.firstName, selectedDonor.lastName)} (${selectedDonor.donorId})` : ''}
        subtitle="Donor Profile & Verified Medical Clearance History"
        size="lg"
      >
        {selectedDonor && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Blood Type</p>
                <div className="mt-1">
                  <BloodGroupBadge group={selectedDonor.bloodGroup} size="md" />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedDonor.status} size="xs" />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Lifetime Given</p>
                <p className="text-sm font-bold text-emerald-400 mt-1 font-mono">{selectedDonor.totalDonations} donations</p>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Eligible Date</p>
                <p className="text-xs font-semibold text-slate-200 mt-1 font-mono">
                  {selectedDonor.eligibilityDate ? formatDate(selectedDonor.eligibilityDate) : 'Immediate'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#070b14] rounded-xl border border-white/6 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={14} className="text-slate-500" />
                <span className="font-mono">{selectedDonor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone size={14} className="text-slate-500" />
                <span className="font-mono">{selectedDonor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={14} className="text-slate-500" />
                <span>{selectedDonor.address}, {selectedDonor.city}, {selectedDonor.state} - {selectedDonor.pincode}</span>
              </div>
              {selectedDonor.medicalNotes && (
                <div className="mt-3 p-2.5 bg-amber-950/20 border border-amber-800/30 rounded-lg text-amber-300">
                  <span className="font-semibold">Clinical Note: </span>
                  {selectedDonor.medicalNotes}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedDonor(null)}>
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Register Donor Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Register New Blood Donor"
        subtitle="Onboard a verified voluntary or replacement donor to the regional repository"
        size="md"
      >
        <form onSubmit={handleRegisterDonor} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              required
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder="e.g. Rahul"
            />
            <Input
              label="Last Name"
              required
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder="e.g. Sharma"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Blood Group"
              value={newBloodGroup}
              onChange={(e) => setNewBloodGroup(e.target.value as BloodGroup)}
              options={[
                { value: 'A+', label: 'A+ (A Positive)' },
                { value: 'A-', label: 'A- (A Negative)' },
                { value: 'B+', label: 'B+ (B Positive)' },
                { value: 'B-', label: 'B- (B Negative)' },
                { value: 'AB+', label: 'AB+ (AB Positive)' },
                { value: 'AB-', label: 'AB- (AB Negative)' },
                { value: 'O+', label: 'O+ (O Positive)' },
                { value: 'O-', label: 'O- (O Negative)' },
              ]}
            />
            <Input
              label="City"
              required
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="e.g. Bangalore"
            />
          </div>

          <Input
            label="Phone Number"
            required
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="+91 98765 43210"
          />

          <Input
            label="Email Address (Optional)"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="donor@example.com"
          />

          <div className="flex justify-end gap-2.5 pt-3">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsRegisterOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm Registration
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
