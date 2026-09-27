// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Droplets, Package, ClipboardList, AlertTriangle, Clock,
  ArrowRight, PlusCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';
import { Card, StatCard } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { WorkflowTimeline } from '../components/shared/WorkflowTimeline';
import { PageHeader } from '../components/shared/PageHeader';
import { BloodGroupBadge, StatusBadge } from '../components/shared/Badge';
import { useAuth } from '../hooks/useAuth';
import { MOCK_DASHBOARD_SUMMARY, MOCK_DONATION_TRENDS, MOCK_REQUEST_TRENDS } from '../data/mock/dashboard';
import type { InventorySummaryItem } from '../types';

// Blood Group Stock Card with progress bar
const BloodGroupCard: React.FC<{ item: InventorySummaryItem; onClick: () => void }> = ({ item, onClick }) => {
  const pct = Math.min(Math.round((item.available / Math.max(item.targetLevel, 1)) * 100), 100);

  const getGradient = (status: string) => {
    switch (status) {
      case 'CRITICAL':
        return 'from-red-600 to-rose-500';
      case 'LOW':
        return 'from-amber-500 to-yellow-500';
      case 'ADEQUATE':
        return 'from-emerald-500 to-teal-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="bg-[#0b1120] border border-white/8 hover:border-white/16 rounded-xl p-3.5 transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-2.5">
        <BloodGroupBadge group={item.bloodGroup} size="sm" />
        <StatusBadge status={item.status} size="xs" />
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-slate-100 font-mono tabular-nums">
              {item.available}
            </span>
            <span className="text-[11px] text-slate-500">units</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {item.reserved} rsvd
          </span>
        </div>

        {/* Capacity Bar */}
        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full bg-gradient-to-r ${getGradient(item.status)}`}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-500">
          <span>{pct}% of target</span>
          <span>Target: {item.targetLevel}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const data = MOCK_DASHBOARD_SUMMARY;
  const [chartView, setChartView] = useState<'donations' | 'requests'>('donations');

  const unreadAlerts = data.alerts.filter((a) => !a.isRead);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <PageHeader
        title="Operations Command Center"
        subtitle={`Live operational telemetry and supply chain overview • Authenticated as ${user?.firstName} ${user?.lastName}`}
        statusChip={
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
            OPERATIONAL
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<PlusCircle size={14} />}
              onClick={() => navigate('/donors')}
            >
              Add Donor
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<ClipboardList size={14} />}
              onClick={() => navigate('/requests')}
            >
              New Request
            </Button>
          </div>
        }
      />

      {/* Critical Alert Banner */}
      {unreadAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 p-3.5 bg-red-950/30 border border-red-800/40 rounded-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-400 flex-shrink-0 animate-pulse">
              <AlertTriangle size={16} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-400 font-mono tracking-wider uppercase">
                  ACTIVE ATTENTION REQUIRED
                </span>
                <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 text-[10px] font-mono">
                  {unreadAlerts.length} Alerts
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 truncate">
                Critical shortages in <span className="font-semibold text-red-400">AB- (5 units)</span> and{' '}
                <span className="font-semibold text-amber-400">A- (12 units)</span> • 2 emergency hospital requests pending dispatch.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="xs"
            className="flex-shrink-0 hidden md:inline-flex"
            rightIcon={<ArrowRight size={12} />}
            onClick={() => navigate('/requests')}
          >
            Review Urgent Queue
          </Button>
        </motion.div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Total Donors"
          value={data.totalDonors}
          icon={<Users size={18} />}
          trend="up"
          trendValue="+12"
          subtext="this mo"
          accentColor="text-sky-400"
          onClick={() => navigate('/donors')}
        />
        <StatCard
          title="Donations Today"
          value={data.donationsToday}
          icon={<Droplets size={18} />}
          trend="up"
          trendValue="+5"
          subtext="vs yday"
          accentColor="text-red-400"
          onClick={() => navigate('/donations')}
        />
        <StatCard
          title="Available Units"
          value={data.availableUnits}
          icon={<Package size={18} />}
          trend="down"
          trendValue="-8"
          subtext="vs yday"
          accentColor="text-emerald-400"
          onClick={() => navigate('/inventory')}
        />
        <StatCard
          title="Pending Requests"
          value={data.pendingRequests}
          icon={<ClipboardList size={18} />}
          trend="neutral"
          trendValue="+3"
          subtext="queued"
          accentColor="text-amber-400"
          onClick={() => navigate('/requests')}
        />
        <StatCard
          title="Emergency Req"
          value={data.emergencyRequests}
          icon={<AlertTriangle size={18} />}
          urgent
          accentColor="text-red-400"
          onClick={() => navigate('/requests')}
        />
        <StatCard
          title="Expiring ≤ 7d"
          value={data.expiringUnits}
          icon={<Clock size={18} />}
          urgent
          accentColor="text-rose-400"
          onClick={() => navigate('/inventory')}
        />
      </div>

      {/* Main Command Rows */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left 2 Cols: Blood Inventory & Operational Trends */}
        <div className="xl:col-span-2 space-y-6">
          {/* Blood Inventory Matrix */}
          <Card padding="none">
            <div className="p-5 border-b border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1120]/40">
              <div>
                <h3 className="text-sm font-semibold text-slate-100 tracking-tight">Blood Group Supply Matrix</h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time unit levels against emergency reserve minimums</p>
              </div>
              <Button
                variant="ghost"
                size="xs"
                rightIcon={<ArrowRight size={12} />}
                onClick={() => navigate('/inventory')}
              >
                Open Full Inventory
              </Button>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.inventorySummary.map((item) => (
                <BloodGroupCard
                  key={item.bloodGroup}
                  item={item}
                  onClick={() => navigate('/inventory')}
                />
              ))}
            </div>
          </Card>

          {/* Operational Trends Chart */}
          <Card padding="none">
            <div className="p-5 border-b border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1120]/40">
              <div>
                <h3 className="text-sm font-semibold text-slate-100 tracking-tight">14-Day Trajectory Analysis</h3>
                <p className="text-xs text-slate-400 mt-0.5">Donations intake vs hospital request fulfillments</p>
              </div>
              <div className="flex items-center gap-1 bg-[#070b14] p-1 rounded-lg border border-white/8">
                <button
                  onClick={() => setChartView('donations')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    chartView === 'donations'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Donations Flow
                </button>
                <button
                  onClick={() => setChartView('requests')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    chartView === 'requests'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Request Priorities
                </button>
              </div>
            </div>

            <div className="p-5 h-72">
              <ResponsiveContainer width="100%" height="100%">
                {chartView === 'donations' ? (
                  <AreaChart data={MOCK_DONATION_TRENDS}>
                    <defs>
                      <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
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
                      fill="url(#donationGradient)"
                      name="Donations Collected"
                    />
                    <Area
                      type="monotone"
                      dataKey="processed"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#processedGradient)"
                      name="Units Processed"
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={MOCK_REQUEST_TRENDS}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" tickLine={false} />
                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                    <Bar dataKey="normal" name="Normal" fill="#38bdf8" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="urgent" name="Urgent" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="emergency" name="Emergency" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Live Audit Trail & Quick Hub */}
        <div className="space-y-6">
          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => navigate('/camps')}
              className="bg-[#0f172a] border border-white/8 hover:border-red-500/30 p-3.5 rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Active Camps</span>
                <span className="text-xs font-mono text-emerald-400">4 Active</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">200 expected donors</p>
            </div>

            <div
              onClick={() => navigate('/testing')}
              className="bg-[#0f172a] border border-white/8 hover:border-red-500/30 p-3.5 rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Lab Queue</span>
                <span className="text-xs font-mono text-purple-400">12 Pending</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Screening in progress</p>
            </div>
          </div>

          {/* Recent Operational Events */}
          <Card padding="none">
            <div className="p-5 border-b border-white/8 flex items-center justify-between bg-[#0b1120]/40">
              <div>
                <h3 className="text-sm font-semibold text-slate-100 tracking-tight">Live Activity Feed</h3>
                <p className="text-xs text-slate-400 mt-0.5">Stream of verified workflow actions</p>
              </div>
              <Button
                variant="ghost"
                size="xs"
                rightIcon={<ArrowRight size={12} />}
                onClick={() => navigate('/workflow')}
              >
                Full Trail
              </Button>
            </div>
            <div className="p-5">
              <WorkflowTimeline events={data.recentActivity} compact />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
