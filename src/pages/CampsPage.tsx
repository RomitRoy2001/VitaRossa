// src/pages/CampsPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Tent, Calendar, MapPin, Users, Plus, Heart,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { StatusBadge } from '../components/shared/Badge';
import { Modal } from '../components/shared/Modal';
import { Input } from '../components/shared/Input';
import { MOCK_CAMPS } from '../data/mock/camps';
import { formatDate } from '../utils/formatters';
import type { DonationCamp } from '../types';

export const CampsPage: React.FC = () => {
  const [camps, setCamps] = useState<DonationCamp[]>(MOCK_CAMPS);
  const [selectedCamp, setSelectedCamp] = useState<DonationCamp | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // New camp form
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState('2024-10-15');
  const [expected, setExpected] = useState('250');

  const totalExpected = camps.reduce((acc, c) => acc + c.expectedDonors, 0);
  const totalRegistered = camps.reduce((acc, c) => acc + c.registeredDonors, 0);
  const totalCollected = camps.reduce((acc, c) => acc + c.donationsCollected, 0);

  const handleScheduleCamp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;

    const newCamp: DonationCamp = {
      id: `camp-${Date.now()}`,
      campId: `BF-CAMP-2024-${String(camps.length + 1).padStart(3, '0')}`,
      name,
      description: `Corporate & Community donation drive organized with ${organizer}.`,
      location,
      address: location,
      city: 'Bangalore',
      date,
      startTime: '09:00',
      endTime: '17:00',
      organizer: organizer || 'BloodFlow Volunteers',
      coordinatorId: 'usr-006',
      expectedDonors: Number(expected) || 200,
      registeredDonors: 0,
      checkedIn: 0,
      donationsCollected: 0,
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCamps([newCamp, ...camps]);
    setIsScheduleOpen(false);
    setName('');
    setLocation('');
    setOrganizer('');
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Donation Camps & Mobile Outreach"
        subtitle="Corporate Drives, University Campuses, and Community Blood Collection Drives"
        breadcrumb={['COMMAND', 'CAMPS']}
        actions={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => setIsScheduleOpen(true)}
          >
            Schedule New Camp
          </Button>
        }
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Scheduled Drives"
          value={camps.length}
          icon={<Tent size={20} />}
          subtext="Active campaigns"
          accentColor="text-sky-400"
        />
        <StatCard
          title="Pre-Registered Donors"
          value={totalRegistered}
          icon={<Users size={20} />}
          subtext={`Against ${totalExpected} target capacity`}
          accentColor="text-amber-400"
        />
        <StatCard
          title="Units Collected in Camps"
          value={totalCollected}
          icon={<Heart size={20} />}
          subtext="Direct mobile intake"
          accentColor="text-red-400"
        />
      </div>

      {/* Camp Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {camps.map((camp) => {
          const regPct = Math.min(
            Math.round((camp.registeredDonors / Math.max(camp.expectedDonors, 1)) * 100),
            100
          );

          return (
            <motion.div
              key={camp.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedCamp(camp)}
              className="bg-[#0f172a] border border-white/8 hover:border-white/16 rounded-xl p-5 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="font-mono text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded font-semibold">
                      {camp.campId}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mt-1.5 group-hover:text-red-400 transition-colors">
                      {camp.name}
                    </h3>
                  </div>
                  <StatusBadge status={camp.status} size="xs" />
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {camp.description ?? 'Community-oriented voluntary blood donation campaign.'}
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={13} className="text-slate-500" />
                    <span>{formatDate(camp.date)} • {camp.startTime} - {camp.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={13} className="text-slate-500" />
                    <span>{camp.location}, {camp.city}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Section */}
              <div className="mt-5 pt-4 border-t border-white/6 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Registrations</span>
                  <span className="font-mono text-slate-200 font-bold">
                    {camp.registeredDonors} / {camp.expectedDonors} ({regPct}%)
                  </span>
                </div>

                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      camp.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-gradient-to-r from-red-600 to-red-500'
                    }`}
                    style={{ width: `${regPct}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 font-mono">
                  <span>Checked In: {camp.checkedIn}</span>
                  <span className="text-emerald-400 font-semibold">Collected: {camp.donationsCollected} units</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Camp Details Modal */}
      <Modal
        isOpen={Boolean(selectedCamp)}
        onClose={() => setSelectedCamp(null)}
        title={selectedCamp ? selectedCamp.name : ''}
        subtitle={selectedCamp?.location}
        size="md"
      >
        {selectedCamp && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedCamp.status} size="xs" />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Target Donors</p>
                <p className="text-sm font-bold text-slate-200 mt-1 font-mono">{selectedCamp.expectedDonors} goal</p>
              </div>
            </div>

            <div className="p-4 bg-[#070b14] rounded-xl border border-white/6 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Date & Operating Hours:</span>
                <span className="text-slate-200 font-mono">{formatDate(selectedCamp.date)} ({selectedCamp.startTime} - {selectedCamp.endTime})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Host Partner / Organizer:</span>
                <span className="text-slate-200">{selectedCamp.organizer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Pre-Registered Donors:</span>
                <span className="text-slate-200 font-mono font-semibold">{selectedCamp.registeredDonors}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Total Units Collected:</span>
                <span className="text-emerald-400 font-mono font-bold">{selectedCamp.donationsCollected} units</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedCamp(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Schedule New Camp Modal */}
      <Modal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        title="Schedule Blood Donation Camp"
        subtitle="Coordinate mobile collection van and technical staff deployment"
        size="md"
      >
        <form onSubmit={handleScheduleCamp} className="space-y-4">
          <Input
            label="Camp Campaign Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Google Tech Park Mega Drive"
          />

          <Input
            label="Venue Location / Campus"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Manyata Tech Park, Nagavara"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              label="Expected Donors Target"
              type="number"
              required
              value={expected}
              onChange={(e) => setExpected(e.target.value)}
              placeholder="200"
            />
          </div>

          <Input
            label="Organizer / Corporate Partner"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            placeholder="e.g. Rotaract Club Bangalore"
          />

          <div className="flex justify-end gap-2.5 pt-3">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsScheduleOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Schedule Drive
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
