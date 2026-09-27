// src/pages/AnalyticsPage.tsx
import React, { useState } from 'react';
import {
  TrendingUp, Clock, ShieldCheck, Activity, Download,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell,
} from 'recharts';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard, Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { MOCK_DONATION_TRENDS, MOCK_REQUEST_TRENDS } from '../data/mock/dashboard';
import { MOCK_INVENTORY_SUMMARY } from '../data/mock/inventory';

const PIE_COLORS = ['#dc2626', '#f97316', '#3b82f6', '#06b6d4', '#a855f7', '#ec4899', '#10b981', '#f43f5e'];

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'14d' | '30d' | '90d'>('14d');

  const pieData = MOCK_INVENTORY_SUMMARY.map((item) => ({
    name: item.bloodGroup,
    value: item.available,
  }));

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Supply Chain Analytics & Business Intelligence"
        subtitle="Predictive Demand Projections, Biological Wastage Minimization, and Fleet Response Velocity"
        breadcrumb={['COMMAND', 'ANALYTICS']}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#0b1120] p-1 rounded-lg border border-white/8 text-xs font-mono">
              {(['14d', '30d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    timeRange === r
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
            <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>
              Export Raw Data
            </Button>
          </div>
        }
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg Emergency Turnaround"
          value="42 mins"
          icon={<Clock size={20} />}
          trend="down"
          trendValue="-14%"
          subtext="Request to bedside"
          accentColor="text-emerald-400"
        />
        <StatCard
          title="Specimen Discard Rate"
          value="0.4%"
          icon={<ShieldCheck size={20} />}
          trend="down"
          trendValue="-0.2%"
          subtext="Far below 2% ceiling"
          accentColor="text-sky-400"
        />
        <StatCard
          title="Repeat Donor Rate"
          value="68.4%"
          icon={<TrendingUp size={20} />}
          trend="up"
          trendValue="+4.2%"
          subtext="Healthy donor retention"
          accentColor="text-amber-400"
        />
        <StatCard
          title="Collection Fulfillment"
          value="98.2%"
          icon={<Activity size={20} />}
          trend="up"
          trendValue="+1.1%"
          subtext="Hospitals quota satisfied"
          accentColor="text-red-400"
        />
      </div>

      {/* Chart Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 14-Day Trajectory Area Chart */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="p-5 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
              <div>
                <h3 className="text-sm font-semibold text-slate-100 tracking-tight">Collection vs Processing Velocity</h3>
                <p className="text-xs text-slate-400 mt-0.5">Whole blood collected vs units cleared through lab testing</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">Daily volume (units)</span>
            </div>
            <div className="p-5 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DONATION_TRENDS}>
                  <defs>
                    <linearGradient id="anDonationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="anProcGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" tickLine={false} />
                  <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#anDonationGrad)"
                    name="Intake Collected"
                  />
                  <Area
                    type="monotone"
                    dataKey="processed"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#anProcGrad)"
                    name="Lab Processed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Inventory Group Distribution Donut */}
        <div>
          <Card padding="none">
            <div className="p-5 border-b border-white/8 bg-[#0b1120]/40">
              <h3 className="text-sm font-semibold text-slate-100 tracking-tight">Stock Concentration Ratio</h3>
              <p className="text-xs text-slate-400 mt-0.5">Available units across 8 blood groups</p>
            </div>
            <div className="p-5 h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="px-5 pb-5 grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              {pieData.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1 justify-center text-slate-400">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Chart Row 2: Hospital Demand Breakdown */}
      <Card padding="none">
        <div className="p-5 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-tight">Hospital Requisition Volume by Urgency</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daily distribution of emergency trauma vs elective requisitions</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">Units requisitioned</span>
        </div>
        <div className="p-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_REQUEST_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" tickLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)' }} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Bar dataKey="normal" name="Normal (Elective)" fill="#38bdf8" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="urgent" name="Urgent (24h Window)" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="emergency" name="Emergency (Trauma Priority)" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
