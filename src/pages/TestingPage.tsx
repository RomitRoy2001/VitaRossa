// src/pages/TestingPage.tsx
import React, { useState } from 'react';
import {
  ShieldCheck, AlertCircle, CheckCircle2, Microscope,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard, Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { StatusBadge, BloodGroupBadge } from '../components/shared/Badge';
import { DataTable, type Column } from '../components/shared/DataTable';

interface LabTestRecord {
  id: string;
  sampleId: string;
  donationId: string;
  donorName: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  hiv: 'NEGATIVE' | 'POSITIVE' | 'PENDING';
  hbv: 'NEGATIVE' | 'POSITIVE' | 'PENDING';
  hcv: 'NEGATIVE' | 'POSITIVE' | 'PENDING';
  syphilis: 'NON_REACTIVE' | 'REACTIVE' | 'PENDING';
  malaria: 'NEGATIVE' | 'POSITIVE' | 'PENDING';
  overallStatus: 'PASS' | 'FAIL' | 'QUARANTINE';
  technician: string;
  testedAt: string;
}

const INITIAL_TESTS: LabTestRecord[] = [
  {
    id: 't-001',
    sampleId: 'SMP-2024-001',
    donationId: 'BF-DON-2024-001',
    donorName: 'Kiran Patel',
    bloodGroup: 'O+',
    hiv: 'NEGATIVE',
    hbv: 'NEGATIVE',
    hcv: 'NEGATIVE',
    syphilis: 'NON_REACTIVE',
    malaria: 'NEGATIVE',
    overallStatus: 'PASS',
    technician: 'Ravi Kumar (Lab Tech)',
    testedAt: '2024-03-02T10:30:00Z',
  },
  {
    id: 't-002',
    sampleId: 'SMP-2024-002',
    donationId: 'BF-DON-2024-002',
    donorName: 'Deepa Krishnan',
    bloodGroup: 'A+',
    hiv: 'NEGATIVE',
    hbv: 'NEGATIVE',
    hcv: 'NEGATIVE',
    syphilis: 'NON_REACTIVE',
    malaria: 'NEGATIVE',
    overallStatus: 'PASS',
    technician: 'Ravi Kumar (Lab Tech)',
    testedAt: '2024-09-04T12:00:00Z',
  },
  {
    id: 't-003',
    sampleId: 'SMP-2024-005',
    donationId: 'BF-DON-2024-005',
    donorName: 'Meena Gupta',
    bloodGroup: 'A-',
    hiv: 'PENDING',
    hbv: 'PENDING',
    hcv: 'PENDING',
    syphilis: 'PENDING',
    malaria: 'PENDING',
    overallStatus: 'QUARANTINE',
    technician: 'Ravi Kumar (Lab Tech)',
    testedAt: '2024-09-04T15:30:00Z',
  },
];

export const TestingPage: React.FC = () => {
  const [tests, setTests] = useState<LabTestRecord[]>(INITIAL_TESTS);

  const handleApproveBatch = (id: string) => {
    setTests(
      tests.map((t) =>
        t.id === id
          ? {
              ...t,
              hiv: 'NEGATIVE',
              hbv: 'NEGATIVE',
              hcv: 'NEGATIVE',
              syphilis: 'NON_REACTIVE',
              malaria: 'NEGATIVE',
              overallStatus: 'PASS',
            }
          : t
      )
    );
  };

  const columns: Column<LabTestRecord>[] = [
    {
      key: 'sampleId',
      header: 'SAMPLE ID',
      sortable: true,
      render: (t) => (
        <span className="font-mono text-xs font-semibold text-slate-100 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {t.sampleId}
        </span>
      ),
    },
    {
      key: 'donorName',
      header: 'DONOR SPECIMEN',
      render: (t) => (
        <div>
          <p className="text-xs font-semibold text-slate-200">{t.donorName}</p>
          <p className="text-[11px] text-slate-500 font-mono">{t.donationId}</p>
        </div>
      ),
    },
    {
      key: 'bloodGroup',
      header: 'GROUP',
      render: (t) => <BloodGroupBadge group={t.bloodGroup} size="sm" />,
    },
    {
      key: 'hiv',
      header: 'HIV 1/2',
      render: (t) => (
        <span
          className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
            t.hiv === 'NEGATIVE'
              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
              : t.hiv === 'PENDING'
              ? 'bg-amber-950/40 text-amber-400'
              : 'bg-rose-950/50 text-rose-400'
          }`}
        >
          {t.hiv}
        </span>
      ),
    },
    {
      key: 'hbv',
      header: 'HBsAg (HBV)',
      render: (t) => (
        <span
          className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
            t.hbv === 'NEGATIVE'
              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
              : t.hbv === 'PENDING'
              ? 'bg-amber-950/40 text-amber-400'
              : 'bg-rose-950/50 text-rose-400'
          }`}
        >
          {t.hbv}
        </span>
      ),
    },
    {
      key: 'hcv',
      header: 'HCV',
      render: (t) => (
        <span
          className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
            t.hcv === 'NEGATIVE'
              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
              : t.hcv === 'PENDING'
              ? 'bg-amber-950/40 text-amber-400'
              : 'bg-rose-950/50 text-rose-400'
          }`}
        >
          {t.hcv}
        </span>
      ),
    },
    {
      key: 'overallStatus',
      header: 'VERDICT',
      render: (t) => <StatusBadge status={t.overallStatus} size="xs" />,
    },
    {
      key: 'actions',
      header: 'ACTION',
      align: 'right',
      render: (t) =>
        t.overallStatus === 'QUARANTINE' ? (
          <Button
            variant="primary"
            size="xs"
            leftIcon={<CheckCircle2 size={12} />}
            onClick={() => handleApproveBatch(t.id)}
          >
            Sign-off Pass
          </Button>
        ) : (
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 justify-end">
            <CheckCircle2 size={12} /> Certified
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Laboratory Testing & Quality Assurance"
        subtitle="Mandatory 5-Parameter Transfusion-Transmissible Infection (TTI) Screening & Biological Verification"
        breadcrumb={['COMMAND', 'TESTING']}
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Certified Passed Batches"
          value={tests.filter((t) => t.overallStatus === 'PASS').length}
          icon={<CheckCircle2 size={20} />}
          subtext="Ready for inventory release"
          accentColor="text-emerald-400"
        />
        <StatCard
          title="Active Quarantine Queue"
          value={tests.filter((t) => t.overallStatus === 'QUARANTINE').length}
          icon={<AlertCircle size={20} />}
          subtext="ELISA & Nucleic Acid Testing"
          accentColor="text-amber-400"
        />
        <StatCard
          title="Zero Biological Failures"
          value="100%"
          icon={<ShieldCheck size={20} />}
          subtext="Quality standard adherence"
          accentColor="text-sky-400"
        />
      </div>

      {/* Lab Safety Protocol Card */}
      <Card padding="none">
        <div className="p-4 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
          <div className="flex items-center gap-2">
            <Microscope size={16} className="text-purple-400" />
            <h3 className="text-sm font-semibold text-slate-100">Testing Standards (WHO & NACO Guidelines)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">100% Voluntary Unit Screening Protocol</span>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-2.5 bg-[#070b14] border border-white/6 rounded-lg text-center">
            <p className="font-bold text-slate-200">HIV 1 & 2</p>
            <p className="text-[10px] text-slate-500 mt-0.5">4th Gen Ag/Ab</p>
          </div>
          <div className="p-2.5 bg-[#070b14] border border-white/6 rounded-lg text-center">
            <p className="font-bold text-slate-200">HBsAg</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Hepatitis B Surface</p>
          </div>
          <div className="p-2.5 bg-[#070b14] border border-white/6 rounded-lg text-center">
            <p className="font-bold text-slate-200">Anti-HCV</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Hepatitis C Antibody</p>
          </div>
          <div className="p-2.5 bg-[#070b14] border border-white/6 rounded-lg text-center">
            <p className="font-bold text-slate-200">Syphilis</p>
            <p className="text-[10px] text-slate-500 mt-0.5">RPR / TPHA Test</p>
          </div>
          <div className="p-2.5 bg-[#070b14] border border-white/6 rounded-lg text-center">
            <p className="font-bold text-slate-200">Malaria</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Rapid Antigen Smear</p>
          </div>
        </div>
      </Card>

      {/* Tests Table */}
      <DataTable
        data={tests}
        columns={columns}
        keyExtractor={(t) => t.id}
        searchPlaceholder="Search by sample ID, donor name, or donation ID…"
        searchFilter={(t, q) =>
          t.sampleId.toLowerCase().includes(q) ||
          t.donorName.toLowerCase().includes(q) ||
          t.donationId.toLowerCase().includes(q)
        }
      />
    </div>
  );
};
