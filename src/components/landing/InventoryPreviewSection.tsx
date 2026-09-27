// src/components/landing/InventoryPreviewSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Droplet } from 'lucide-react';

interface BloodStock {
  group: string;
  units: number;
  capacity: number;
  status: 'AVAILABLE' | 'LOW' | 'CRITICAL';
  compatibility: string;
}

const inventoryData: BloodStock[] = [
  { group: 'O+', units: 248, capacity: 300, status: 'AVAILABLE', compatibility: 'O+, A+, B+, AB+' },
  { group: 'O-', units: 42, capacity: 150, status: 'CRITICAL', compatibility: 'Universal Red Cell Donor' },
  { group: 'A+', units: 184, capacity: 250, status: 'AVAILABLE', compatibility: 'A+, AB+' },
  { group: 'A-', units: 36, capacity: 120, status: 'LOW', compatibility: 'A-, A+, AB-, AB+' },
  { group: 'B+', units: 196, capacity: 250, status: 'AVAILABLE', compatibility: 'B+, AB+' },
  { group: 'B-', units: 28, capacity: 100, status: 'CRITICAL', compatibility: 'B-, B+, AB-, AB+' },
  { group: 'AB+', units: 98, capacity: 120, status: 'AVAILABLE', compatibility: 'Universal Recipient' },
  { group: 'AB-', units: 19, capacity: 80, status: 'CRITICAL', compatibility: 'AB-, AB+' },
];

export const InventoryPreviewSection: React.FC = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: BloodStock['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            AVAILABLE
          </span>
        );
      case 'LOW':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            LOW RESERVE
          </span>
        );
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
            CRITICAL
          </span>
        );
    }
  };

  const getBarColor = (status: BloodStock['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return 'from-emerald-500 to-teal-400';
      case 'LOW':
        return 'from-amber-500 to-yellow-400';
      case 'CRITICAL':
        return 'from-red-600 to-rose-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]';
    }
  };

  return (
    <section id="inventory" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-3">
            LIVE RESERVE RADAR
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Blood Inventory Availability
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            Real-time multi-depot stock telemetry updated continuously across connected facilities.
          </p>
        </div>

        {/* Live ticker status indicator */}
        <div className="flex items-center gap-3 bg-[#0f172a]/80 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md self-start md:self-auto">
          <Activity size={16} className="text-red-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300">Telemetry Feed: </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">ONLINE & SYNCED</span>
        </div>
      </div>

      {/* Grid of 8 Blood Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {inventoryData.map((item, idx) => {
          const pct = Math.min(100, Math.round((item.units / item.capacity) * 100));
          return (
            <motion.div
              key={item.group}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4, borderColor: 'rgba(239, 68, 68, 0.4)' }}
              className="bg-[#0b1120]/75 border border-white/8 hover:border-red-500/30 rounded-2xl p-5 backdrop-blur-md transition-all duration-200 relative group overflow-hidden"
            >
              {/* Background blood drop glyph watermark */}
              <div className="absolute -right-2 -bottom-2 text-white/3 font-black text-7xl select-none pointer-events-none group-hover:text-red-500/5 transition-colors">
                {item.group}
              </div>

              {/* Group header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/30 to-red-900/30 border border-red-500/30 flex items-center justify-center font-mono font-black text-lg text-white">
                    {item.group}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">STOCK</div>
                    <div className="text-lg font-bold text-white font-mono leading-none">
                      {item.units} <span className="text-xs text-slate-400 font-normal">Units</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Capacity</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getBarColor(item.status)} transition-all duration-1000`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Compatibility line */}
              <p className="mt-3 text-[11px] text-slate-400 truncate">
                <span className="text-slate-500 font-mono">Target: </span>
                {item.compatibility}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Explore Inventory CTA */}
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white bg-[#0f172a]/90 hover:bg-white/10 border border-white/12 hover:border-red-500/40 rounded-xl backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
        >
          <Droplet size={14} className="text-red-400" />
          <span>Explore Blood Availability & Reserve</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </section>
  );
};
