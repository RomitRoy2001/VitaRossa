// src/pages/InventoryPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, AlertTriangle, Clock, RefreshCw, Thermometer, Box,
  ArrowDownLeft, ArrowUpRight, ArrowLeftRight,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, StatCard } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { BloodGroupBadge, StatusBadge } from '../components/shared/Badge';
import { DataTable, type Column } from '../components/shared/DataTable';
import { Modal } from '../components/shared/Modal';
import { MOCK_INVENTORY_SUMMARY, MOCK_INVENTORY_MOVEMENTS } from '../data/mock/inventory';
import { MOCK_BLOOD_UNITS } from '../data/mock/bloodUnits';
import { formatDate, formatRelativeTime, formatVolume } from '../utils/formatters';
import type { BloodUnit } from '../types';

export const InventoryPage: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<BloodUnit | null>(null);
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('ALL');

  const totalAvailable = MOCK_INVENTORY_SUMMARY.reduce((acc, curr) => acc + curr.available, 0);
  const totalReserved = MOCK_INVENTORY_SUMMARY.reduce((acc, curr) => acc + curr.reserved, 0);
  const totalExpiring = MOCK_INVENTORY_SUMMARY.reduce((acc, curr) => acc + curr.expiringSoon, 0);

  const filteredUnits = selectedGroupFilter === 'ALL'
    ? MOCK_BLOOD_UNITS
    : MOCK_BLOOD_UNITS.filter((u) => u.bloodGroup === selectedGroupFilter);

  const columns: Column<BloodUnit>[] = [
    {
      key: 'unitId',
      header: 'UNIT ID',
      sortable: true,
      render: (u) => (
        <span className="font-mono text-xs font-semibold text-slate-100 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {u.unitId}
        </span>
      ),
    },
    {
      key: 'bloodGroup',
      header: 'GROUP',
      sortable: true,
      render: (u) => <BloodGroupBadge group={u.bloodGroup} size="sm" />,
    },
    {
      key: 'component',
      header: 'COMPONENT',
      sortable: true,
      render: (u) => (
        <span className="text-xs text-slate-300 font-medium">
          {u.component.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      key: 'volumeMl',
      header: 'VOLUME',
      sortable: true,
      render: (u) => <span className="font-mono text-xs text-slate-300">{formatVolume(u.volumeMl)}</span>,
    },
    {
      key: 'collectionDate',
      header: 'COLLECTED',
      sortable: true,
      render: (u) => <span className="text-xs text-slate-400">{formatDate(u.collectionDate)}</span>,
    },
    {
      key: 'expiryDate',
      header: 'EXPIRY',
      sortable: true,
      render: (u) => {
        const isUrgent = new Date(u.expiryDate).getTime() - Date.now() < 86400000 * 7;
        return (
          <span className={`text-xs font-mono font-medium ${isUrgent ? 'text-rose-400 font-semibold' : 'text-slate-300'}`}>
            {formatDate(u.expiryDate)}
          </span>
        );
      },
    },
    {
      key: 'storageLocation',
      header: 'STORAGE FACILITY',
      render: (u) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <Box size={12} className="text-slate-500" />
          <span>{u.storageLocation?.name ?? 'Main Cold Room'}</span>
          <span className="text-slate-600">[{u.storageLocation?.temperature}]</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      sortable: true,
      render: (u) => <StatusBadge status={u.status} size="xs" />,
    },
  ];

  const storageFacilities = [
    { name: 'Refrigerator A', temp: '2°C to 6°C', capacity: 50, occupied: 32, type: 'Whole Blood & RBC' },
    { name: 'Refrigerator B', temp: '2°C to 6°C', capacity: 50, occupied: 28, type: 'Packed Cells' },
    { name: 'Freezer B', temp: '-18°C or colder', capacity: 30, occupied: 18, type: 'Fresh Frozen Plasma' },
    { name: 'Agitator C', temp: '20°C to 24°C', capacity: 20, occupied: 8, type: 'Platelet Agitator' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Blood Supply & Inventory"
        subtitle="Real-time Cold Chain Monitoring, Expiry Projections, and Storage Distribution"
        breadcrumb={['COMMAND', 'INVENTORY']}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={14} />}>
              Refresh Audit
            </Button>
          </div>
        }
      />

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Available Stock"
          value={totalAvailable}
          icon={<Package size={20} />}
          subtext="Verified for transfusion"
          accentColor="text-emerald-400"
        />
        <StatCard
          title="Reserved Units"
          value={totalReserved}
          icon={<Clock size={20} />}
          subtext="Allocated for approved requests"
          accentColor="text-amber-400"
        />
        <StatCard
          title="Expiring Within 7 Days"
          value={totalExpiring}
          icon={<AlertTriangle size={20} />}
          urgent
          subtext="Requires immediate issue"
          accentColor="text-rose-400"
        />
      </div>

      {/* 8 Blood Group Cards Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
            Supply Breakdown by Blood Group
          </h2>
          <span className="text-xs text-slate-500 font-mono">Target benchmark: 100% adequate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {MOCK_INVENTORY_SUMMARY.map((item) => {
            const pct = Math.min(Math.round((item.available / Math.max(item.targetLevel, 1)) * 100), 100);
            const isSelected = selectedGroupFilter === item.bloodGroup;

            return (
              <motion.div
                key={item.bloodGroup}
                onClick={() => setSelectedGroupFilter(isSelected ? 'ALL' : item.bloodGroup)}
                whileHover={{ y: -2 }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                    : 'bg-[#0f172a] border-white/8 hover:border-white/16'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <BloodGroupBadge group={item.bloodGroup} size="sm" />
                  <StatusBadge status={item.status} size="xs" />
                </div>

                <div className="space-y-1.5 mt-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-100 font-mono">{item.available}</span>
                    <span className="text-[10px] text-slate-500 font-mono">/ {item.targetLevel}</span>
                  </div>

                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.status === 'CRITICAL'
                          ? 'bg-rose-500'
                          : item.status === 'LOW'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                    <span>{item.reserved} rsv</span>
                    {item.expiringSoon > 0 ? (
                      <span className="text-rose-400 font-bold">{item.expiringSoon} exp</span>
                    ) : (
                      <span className="text-slate-600">0 exp</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Storage Facilities Real-time Status */}
      <Card padding="none">
        <div className="p-4 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
          <div className="flex items-center gap-2">
            <Thermometer size={16} className="text-red-400" />
            <h3 className="text-sm font-semibold text-slate-100">Cold Chain Storage Units</h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
            All telemetry nominal
          </span>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {storageFacilities.map((fac) => {
            const occPct = Math.round((fac.occupied / fac.capacity) * 100);
            return (
              <div key={fac.name} className="p-3.5 bg-[#070b14] border border-white/6 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">{fac.name}</span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-800/30 px-1.5 py-0.2 rounded">
                    {fac.temp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{fac.type}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Occupancy</span>
                    <span className="text-slate-200 font-bold">{fac.occupied} / {fac.capacity} ({occPct}%)</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${occPct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Blood Units Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Individual Blood Units Repository
            </h2>
            {selectedGroupFilter !== 'ALL' && (
              <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-mono">
                Filtered: {selectedGroupFilter}
              </span>
            )}
          </div>
          {selectedGroupFilter !== 'ALL' && (
            <button
              onClick={() => setSelectedGroupFilter('ALL')}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <DataTable
          data={filteredUnits}
          columns={columns}
          keyExtractor={(u) => u.id}
          searchPlaceholder="Search by Unit ID, donor, or component…"
          searchFilter={(u, q) =>
            u.unitId.toLowerCase().includes(q) ||
            u.donorName.toLowerCase().includes(q) ||
            u.component.toLowerCase().includes(q) ||
            u.bloodGroup.toLowerCase().includes(q)
          }
          onRowClick={(u) => setSelectedUnit(u)}
        />
      </div>

      {/* Recent Movements Log */}
      <Card padding="none">
        <div className="p-4 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
          <h3 className="text-sm font-semibold text-slate-100">Recent Inventory Transfers & Movement</h3>
          <span className="text-xs text-slate-500 font-mono">Chain of custody audit</span>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_INVENTORY_MOVEMENTS.map((mov) => (
            <div key={mov.id} className="p-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-300 flex-shrink-0">
                  {mov.movementType === 'IN' && <ArrowDownLeft size={14} className="text-emerald-400" />}
                  {mov.movementType === 'OUT' && <ArrowUpRight size={14} className="text-rose-400" />}
                  {mov.movementType === 'TRANSFER' && <ArrowLeftRight size={14} className="text-blue-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-200">{mov.unitId}</span>
                    <span className="text-slate-400 font-medium">({mov.reason})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Logged by {mov.performedBy} • From {mov.fromLocation ?? 'Intake'} to {mov.toLocation ?? 'Dispatched'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap">
                {formatRelativeTime(mov.performedAt)}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Unit Detail Modal */}
      <Modal
        isOpen={Boolean(selectedUnit)}
        onClose={() => setSelectedUnit(null)}
        title={`Blood Unit Specimen: ${selectedUnit?.unitId}`}
        subtitle="Full laboratory and chain-of-custody verification details"
        size="lg"
      >
        {selectedUnit && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Blood Group</p>
                <div className="mt-1">
                  <BloodGroupBadge group={selectedUnit.bloodGroup} size="md" />
                </div>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Component</p>
                <p className="text-xs font-semibold text-slate-200 mt-1">{selectedUnit.component}</p>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Net Volume</p>
                <p className="text-xs font-semibold text-slate-200 mt-1 font-mono">{formatVolume(selectedUnit.volumeMl)}</p>
              </div>
              <div className="p-3 bg-[#070b14] rounded-xl border border-white/6">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Testing Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedUnit.qualityStatus} size="xs" />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#070b14] rounded-xl border border-white/6 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Donor Name:</span>
                <span className="text-slate-200 font-medium">{selectedUnit.donorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Collection Date:</span>
                <span className="text-slate-200 font-mono">{formatDate(selectedUnit.collectionDate)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Expiry Date:</span>
                <span className="text-slate-200 font-mono">{formatDate(selectedUnit.expiryDate)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Storage Unit:</span>
                <span className="text-slate-200 font-mono">
                  {selectedUnit.storageLocation?.name} (Section {selectedUnit.storageLocation?.section})
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Processed By:</span>
                <span className="text-slate-200">{selectedUnit.processedBy ?? 'Central Lab'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedUnit(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
