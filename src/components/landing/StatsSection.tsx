// src/components/landing/StatsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, Building2, TentTree } from 'lucide-react';
import { HeartbeatLine } from './HeartbeatLine';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  sublabel: string;
  delay: number;
}

const stats: StatCardProps[] = [
  {
    icon: <Users size={22} className="text-red-400" />,
    value: '10K+',
    label: 'REGISTERED DONORS',
    sublabel: 'Active and verified donors ready for dispatch',
    delay: 0.1,
  },
  {
    icon: <HeartHandshake size={22} className="text-red-400" />,
    value: '25K+',
    label: 'LIVES SUPPORTED',
    sublabel: 'Successful transfusions facilitated across facilities',
    delay: 0.2,
  },
  {
    icon: <Building2 size={22} className="text-red-400" />,
    value: '150+',
    label: 'PARTNER HOSPITALS',
    sublabel: 'Connected tier-1 and community medical centers',
    delay: 0.3,
  },
  {
    icon: <TentTree size={22} className="text-red-400" />,
    value: '500+',
    label: 'DONATION CAMPS',
    sublabel: 'Mobilized community and corporate blood drives',
    delay: 0.4,
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ECG Heartbeat Line weaving behind the statistics cards */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-0 opacity-80 pointer-events-none">
        <HeartbeatLine height={110} />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-red-400 font-semibold">
            PROVEN LIFELINE IMPACT
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Empowering Emergency Response at Scale
          </h2>
        </div>

        {/* 4 Floating Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: stat.delay, ease: 'easeOut' }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(239, 68, 68, 0.45)',
                boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(220, 38, 38, 0.25)',
              }}
              className="relative p-6 sm:p-7 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-300 group overflow-hidden"
            >
              {/* Card top subtle highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-red-500/50 transition-colors" />

              {/* Icon badge */}
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 group-hover:bg-red-500/20 group-hover:border-red-500/40 transition-colors">
                {stat.icon}
              </div>

              {/* Large Metric Number */}
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight group-hover:text-red-100 transition-colors">
                {stat.value}
              </div>

              {/* Metric Label */}
              <div className="mt-1 text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
                {stat.label}
              </div>

              {/* Small description */}
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {stat.sublabel}
              </p>

              {/* Subtle corner index */}
              <span className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-600 group-hover:text-red-400/60 transition-colors">
                0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
