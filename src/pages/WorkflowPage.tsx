// src/pages/WorkflowPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch, CheckCircle2, Clock, ShieldCheck,
  Droplet, FlaskConical, Package, Send, Lock, UserCheck,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card } from '../components/shared/Card';
import { DataTable, type Column } from '../components/shared/DataTable';
import { MOCK_WORKFLOW_EVENTS } from '../data/mock/workflow';
import { formatRelativeTime, formatRole, formatDateTime } from '../utils/formatters';
import type { WorkflowEvent } from '../types';

const WORKFLOW_STAGES = [
  { id: '1', title: 'REGISTERED', desc: 'Donor Onboarding & Eligibility', icon: <UserCheck size={16} />, active: false, done: true },
  { id: '2', title: 'SCREENING', desc: 'Clinical Vitals & Hb Test', icon: <Clock size={16} />, active: false, done: true },
  { id: '3', title: 'COLLECTED', desc: 'Phlebotomy 450ml Draw', icon: <Droplet size={16} />, active: false, done: true },
  { id: '4', title: 'TESTING', desc: '5-Parameter TTI & NAT', icon: <FlaskConical size={16} />, active: true, done: false },
  { id: '5', title: 'PROCESSED', desc: 'Component Separation', icon: <ShieldCheck size={16} />, active: false, done: false },
  { id: '6', title: 'AVAILABLE', desc: 'Cold Chain Quarantine Release', icon: <Package size={16} />, active: false, done: false },
  { id: '7', title: 'RESERVED', desc: 'Crossmatch Requisition Match', icon: <Lock size={16} />, active: false, done: false },
  { id: '8', title: 'ISSUED', desc: 'Hospital Transit & Transfusion', icon: <Send size={16} />, active: false, done: false },
];

export const WorkflowPage: React.FC = () => {
  const [entityFilter, setEntityFilter] = useState<string>('ALL');

  const filteredEvents = entityFilter === 'ALL'
    ? MOCK_WORKFLOW_EVENTS
    : MOCK_WORKFLOW_EVENTS.filter((e) => e.entityType === entityFilter);

  const columns: Column<WorkflowEvent>[] = [
    {
      key: 'timestamp',
      header: 'TIMESTAMP',
      sortable: true,
      render: (e) => (
        <div className="font-mono text-xs">
          <p className="text-slate-300">{formatRelativeTime(e.timestamp)}</p>
          <p className="text-[10px] text-slate-500">{formatDateTime(e.timestamp)}</p>
        </div>
      ),
    },
    {
      key: 'entityType',
      header: 'DOMAIN ENTITY',
      sortable: true,
      render: (e) => (
        <span className="font-mono text-[10px] font-semibold uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300">
          {e.entityType.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      key: 'entityLabel',
      header: 'SPECIMEN / RECORD ID',
      render: (e) => (
        <span className="font-mono text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
          {e.entityLabel}
        </span>
      ),
    },
    {
      key: 'description',
      header: 'OPERATION EVENT DESCRIPTION',
      render: (e) => (
        <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-lg">
          {e.description}
        </p>
      ),
    },
    {
      key: 'performedBy',
      header: 'AUTHORIZED OPERATOR',
      render: (e) => (
        <div>
          <p className="text-xs font-semibold text-slate-300">{e.performedBy}</p>
          <p className="text-[10px] text-slate-500">{formatRole(e.performedByRole)}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'RECORD VERDICT',
      render: (e) => (
        <span className="font-mono text-xs font-medium text-emerald-400">
          {e.status ?? 'VERIFIED'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Supply Chain Workflow & Regulatory Audit Trail"
        subtitle="End-to-End Biological Specimen Journey from Donor Arm to Hospital Transfusion Bedside"
        breadcrumb={['COMMAND', 'WORKFLOW']}
      />

      {/* Interactive 8-Stage Pipeline Visualization */}
      <Card padding="none">
        <div className="p-4 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
          <div className="flex items-center gap-2">
            <GitBranch size={16} className="text-red-400" />
            <h3 className="text-sm font-semibold text-slate-100">8-Stage Biological Custody Pipeline</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Stage 4 Active Testing Batch</span>
        </div>

        <div className="p-6 overflow-x-auto custom-scrollbar">
          <div className="flex items-center min-w-[900px] justify-between relative">
            {/* Connecting Track Line */}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-white/10 -z-0" />
            <div className="absolute top-5 left-8 w-[40%] h-0.5 bg-gradient-to-r from-emerald-500 to-red-500 -z-0" />

            {WORKFLOW_STAGES.map((s) => (
              <div key={s.id} className="flex flex-col items-center text-center relative z-10 w-28 group">
                {/* Node circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                    s.done
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : s.active
                      ? 'bg-red-950/80 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] animate-pulse'
                      : 'bg-[#0b1120] border-white/10 text-slate-500'
                  }`}
                >
                  {s.done ? <CheckCircle2 size={18} /> : s.icon}
                </motion.div>

                <p className={`mt-2.5 text-xs font-bold font-mono tracking-tight ${s.active ? 'text-red-400' : s.done ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {s.title}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Filter Tabs & Audit Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
            Immutable Audit Trail Events
          </h2>
          <div className="flex items-center gap-1.5 bg-[#0b1120] p-1 rounded-lg border border-white/8 text-xs font-mono">
            {['ALL', 'DONATION', 'BLOOD_UNIT', 'BLOOD_REQUEST', 'DONATION_CAMP'].map((type) => (
              <button
                key={type}
                onClick={() => setEntityFilter(type)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  entityFilter === type
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          data={filteredEvents}
          columns={columns}
          keyExtractor={(e) => e.id}
          searchPlaceholder="Search audit events by operator, entity ID, action…"
          searchFilter={(e, q) =>
            e.description.toLowerCase().includes(q) ||
            e.entityLabel.toLowerCase().includes(q) ||
            e.performedBy.toLowerCase().includes(q) ||
            e.action.toLowerCase().includes(q)
          }
        />
      </div>
    </div>
  );
};
