// src/pages/ReportsPage.tsx
import React, { useState } from 'react';
import {
  Download,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { useToast } from '../hooks/useToast';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: 'INVENTORY' | 'DONORS' | 'CAMPS' | 'COMPLIANCE';
  recordsCount: number;
  lastGenerated: string;
  format: 'CSV' | 'PDF';
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'rep-001',
    title: 'Monthly Inventory & Cold Chain Audit',
    description: 'Comprehensive stock ledger with lot numbers, cold storage telemetry logs, and expiry projections.',
    category: 'INVENTORY',
    recordsCount: 270,
    lastGenerated: 'Today, 06:00 AM',
    format: 'CSV',
  },
  {
    id: 'rep-002',
    title: 'Transfusion-Transmissible Infection (TTI) Clearance Report',
    description: 'Statutory health ministry reporting: 5-parameter infectious screening pass/fail records.',
    category: 'COMPLIANCE',
    recordsCount: 142,
    lastGenerated: 'Yesterday',
    format: 'PDF',
  },
  {
    id: 'rep-003',
    title: 'Voluntary Donor Retention & Deferral Audit',
    description: 'Clinical statistics on donor eligibility rates, repeat donation frequencies, and deferral causes.',
    category: 'DONORS',
    recordsCount: 1284,
    lastGenerated: '3 days ago',
    format: 'CSV',
  },
  {
    id: 'rep-004',
    title: 'Mobile Outreach & Donation Camp Performance',
    description: 'Campaign yield metrics, corporate CSR partnerships, and attendance vs collection efficiency.',
    category: 'CAMPS',
    recordsCount: 12,
    lastGenerated: 'Last week',
    format: 'PDF',
  },
];

export const ReportsPage: React.FC = () => {
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredReports = selectedCategory === 'ALL'
    ? REPORT_TEMPLATES
    : REPORT_TEMPLATES.filter((r) => r.category === selectedCategory);

  const handleExport = (title: string, format: string) => {
    toast.success('Report Export Initiated', `Compiling ${title} in ${format} format…`);
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Regulatory Reports & Archival Exports"
        subtitle="Automated Compliance Ledgers, Supply Chain Audits, and Clinical Summary Generation"
        breadcrumb={['COMMAND', 'REPORTS']}
      />

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-[#0b1120] p-1 rounded-lg border border-white/8 text-xs font-mono w-fit">
        {['ALL', 'INVENTORY', 'DONORS', 'CAMPS', 'COMPLIANCE'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCategory === cat
                ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="flex flex-col justify-between p-5">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-mono text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded font-semibold">
                  {report.category}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Updated: {report.lastGenerated}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100 mb-1.5">
                {report.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {report.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/6 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400">
                <strong className="text-slate-200">{report.recordsCount}</strong> records compiled
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="xs"
                  leftIcon={<Download size={13} />}
                  onClick={() => handleExport(report.title, report.format)}
                >
                  Export {report.format}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
