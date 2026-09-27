// src/pages/DispatchPage.tsx
import React, { useState } from 'react';
import {
  Truck, CheckCircle2, AlertTriangle, Building2, MapPin,
  Thermometer, Navigation,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard, Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { StatusBadge, PriorityBadge, BloodGroupBadge } from '../components/shared/Badge';
import { DataTable, type Column } from '../components/shared/DataTable';
import { formatRelativeTime } from '../utils/formatters';

interface DispatchRecord {
  id: string;
  trackingId: string;
  hospitalName: string;
  destination: string;
  bloodGroup: 'O+' | 'O-' | 'A+' | 'B+' | 'AB-';
  unitsCount: number;
  priority: 'EMERGENCY' | 'URGENT' | 'NORMAL';
  carrier: string;
  tempReading: string;
  status: 'IN_TRANSIT' | 'DELIVERED' | 'PREPARING';
  dispatchedAt: string;
  estimatedArrival: string;
}

const INITIAL_DISPATCHES: DispatchRecord[] = [
  {
    id: 'dsp-001',
    trackingId: 'TRK-2024-8841',
    hospitalName: 'Apollo Hospitals',
    destination: 'Bannerghatta Road, Bangalore',
    bloodGroup: 'O+',
    unitsCount: 2,
    priority: 'EMERGENCY',
    carrier: 'ColdTrans Medical Van #04 (Driver: Vikram S.)',
    tempReading: '3.8°C (Nominal)',
    status: 'IN_TRANSIT',
    dispatchedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    estimatedArrival: 'In 15 mins',
  },
  {
    id: 'dsp-002',
    trackingId: 'TRK-2024-8842',
    hospitalName: 'Fortis Hospital',
    destination: 'Cunningham Road, Bangalore',
    bloodGroup: 'A+',
    unitsCount: 3,
    priority: 'URGENT',
    carrier: 'Emergency Rapid Bike #02 (Rider: Suresh K.)',
    tempReading: '4.1°C (Nominal)',
    status: 'IN_TRANSIT',
    dispatchedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    estimatedArrival: 'In 25 mins',
  },
  {
    id: 'dsp-003',
    trackingId: 'TRK-2024-8839',
    hospitalName: 'KEM Hospital',
    destination: 'Parel, Mumbai',
    bloodGroup: 'AB-',
    unitsCount: 4,
    priority: 'EMERGENCY',
    carrier: 'Dedicated Express Carrier #01',
    tempReading: '21.5°C (Platelet Agitator Box)',
    status: 'DELIVERED',
    dispatchedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    estimatedArrival: 'Delivered',
  },
];

export const DispatchPage: React.FC = () => {
  const [dispatches, setDispatches] = useState<DispatchRecord[]>(INITIAL_DISPATCHES);

  const markDelivered = (id: string) => {
    setDispatches(
      dispatches.map((d) => (d.id === id ? { ...d, status: 'DELIVERED', estimatedArrival: 'Delivered' } : d))
    );
  };

  const columns: Column<DispatchRecord>[] = [
    {
      key: 'trackingId',
      header: 'DISPATCH ID',
      sortable: true,
      render: (d) => (
        <span className="font-mono text-xs font-semibold text-slate-100 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {d.trackingId}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'PRIORITY',
      sortable: true,
      render: (d) => <PriorityBadge priority={d.priority} />,
    },
    {
      key: 'hospitalName',
      header: 'RECIPIENT FACILITY',
      sortable: true,
      render: (d) => (
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-200">
            <Building2 size={12} className="text-slate-500" />
            <span>{d.hospitalName}</span>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin size={10} /> {d.destination}
          </p>
        </div>
      ),
    },
    {
      key: 'bloodGroup',
      header: 'PAYLOAD',
      render: (d) => (
        <div className="flex items-center gap-2">
          <BloodGroupBadge group={d.bloodGroup} size="sm" />
          <span className="text-xs text-slate-300 font-mono font-semibold">× {d.unitsCount} units</span>
        </div>
      ),
    },
    {
      key: 'tempReading',
      header: 'COLD CHAIN TELEMETRY',
      render: (d) => (
        <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
          <Thermometer size={12} className="text-cyan-500" />
          <span>{d.tempReading}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      sortable: true,
      render: (d) => <StatusBadge status={d.status} size="xs" />,
    },
    {
      key: 'estimatedArrival',
      header: 'ETA / TIME',
      render: (d) => (
        <div className="text-xs font-mono">
          <p className={d.status === 'IN_TRANSIT' ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
            {d.estimatedArrival}
          </p>
          <p className="text-[10px] text-slate-500">Departed {formatRelativeTime(d.dispatchedAt)}</p>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'ACTION',
      align: 'right',
      render: (d) =>
        d.status === 'IN_TRANSIT' ? (
          <Button
            variant="outline"
            size="xs"
            leftIcon={<CheckCircle2 size={12} />}
            onClick={() => markDelivered(d.id)}
          >
            Confirm Delivery
          </Button>
        ) : (
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 justify-end">
            <CheckCircle2 size={12} /> Received
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Cold Chain Dispatch & Transit Logistics"
        subtitle="Real-time GPS fleet tracking, temperature monitor verification, and hospital delivery confirmations"
        breadcrumb={['COMMAND', 'DISPATCH']}
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Dispatches Active in Transit"
          value={dispatches.filter((d) => d.status === 'IN_TRANSIT').length}
          icon={<Truck size={20} />}
          subtext="Under live telemetric monitoring"
          accentColor="text-sky-400"
        />
        <StatCard
          title="Emergency Dispatches"
          value={dispatches.filter((d) => d.priority === 'EMERGENCY' && d.status === 'IN_TRANSIT').length}
          icon={<AlertTriangle size={20} />}
          urgent
          subtext="Priority green corridor active"
          accentColor="text-red-400"
        />
        <StatCard
          title="Completed Today"
          value={dispatches.filter((d) => d.status === 'DELIVERED').length}
          icon={<CheckCircle2 size={20} />}
          subtext="Confirmed by recipient bank"
          accentColor="text-emerald-400"
        />
      </div>

      {/* Dispatch Fleet Status Bar */}
      <Card padding="none">
        <div className="p-4 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
          <div className="flex items-center gap-2">
            <Navigation size={15} className="text-red-400" />
            <h3 className="text-sm font-semibold text-slate-100">Transport Fleet Telemetry</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
            All transit temperature loggers within 2.0°C - 6.0°C limits
          </span>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-[#070b14] border border-white/6 rounded-xl space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">ColdTrans Van #04</span>
              <span className="text-emerald-400 font-mono">GPS Locked</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Speed: 48 km/h • Internal Temp: 3.8°C</p>
          </div>
          <div className="p-3 bg-[#070b14] border border-white/6 rounded-xl space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">Rapid Bike #02</span>
              <span className="text-emerald-400 font-mono">GPS Locked</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Speed: 54 km/h • Thermal Bag: 4.1°C</p>
          </div>
          <div className="p-3 bg-[#070b14] border border-white/6 rounded-xl space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">Express Carrier #01</span>
              <span className="text-slate-400 font-mono">Depot Docked</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Ready for next assignment</p>
          </div>
        </div>
      </Card>

      {/* Dispatches Table */}
      <DataTable
        data={dispatches}
        columns={columns}
        keyExtractor={(d) => d.id}
        searchPlaceholder="Search by tracking code, hospital, carrier…"
        searchFilter={(d, q) =>
          d.trackingId.toLowerCase().includes(q) ||
          d.hospitalName.toLowerCase().includes(q) ||
          d.carrier.toLowerCase().includes(q)
        }
      />
    </div>
  );
};
