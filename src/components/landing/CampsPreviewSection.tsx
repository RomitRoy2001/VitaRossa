// src/components/landing/CampsPreviewSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';

interface CampCard {
  id: string;
  name: string;
  location: string;
  city: string;
  date: string;
  time: string;
  expectedDonors: number;
  registeredDonors: number;
  status: string;
  organizer: string;
}

const camps: CampCard[] = [
  {
    id: 'camp-1',
    name: 'Metropolitan Community Blood Drive',
    location: 'Victoria Central Medical Ground',
    city: 'Guwahati, Assam',
    date: '18 September 2026',
    time: '09:00 AM – 05:00 PM',
    expectedDonors: 150,
    registeredDonors: 128,
    status: 'REGISTRATION OPEN',
    organizer: 'Red Cross & BloodFlow Health',
  },
  {
    id: 'camp-2',
    name: 'Silicon Corridor Tech Drive 2026',
    location: 'Infosys Main Convention Hall, Phase 1',
    city: 'Bangalore, Karnataka',
    date: '24 September 2026',
    time: '10:00 AM – 06:00 PM',
    expectedDonors: 250,
    registeredDonors: 194,
    status: 'REGISTRATION OPEN',
    organizer: 'Tech CSR Collaborative',
  },
  {
    id: 'camp-3',
    name: 'National University Youth Lifeline Camp',
    location: 'Campus Auditorium, Gate 3',
    city: 'Delhi NCR',
    date: '02 October 2026',
    time: '08:30 AM – 04:30 PM',
    expectedDonors: 180,
    registeredDonors: 112,
    status: 'REGISTRATION OPEN',
    organizer: 'University NSS Unit',
  },
];

export const CampsPreviewSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="camps" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-3">
          COMMUNITY DRIVES
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Upcoming Donation Camps
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Join authorized blood drives in your area. Certified medical staff, rapid pre-screening, and sterile donation stations.
        </p>
      </div>

      {/* 3 Camp Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {camps.map((camp, idx) => (
          <motion.div
            key={camp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#0f172a]/70 border border-white/10 hover:border-red-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent group-hover:via-red-500 transition-colors" />

            <div>
              {/* Status & Date */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {camp.status}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Calendar size={13} className="text-red-400" />
                  {camp.date}
                </span>
              </div>

              {/* Camp Name */}
              <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                {camp.name}
              </h3>

              {/* Location */}
              <div className="mt-3 space-y-1 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white font-medium">{camp.location}</strong>, {camp.city}
                  </span>
                </div>
              </div>

              {/* Expected Donors Metric */}
              <div className="mt-5 p-3 rounded-xl bg-[#070b14]/60 border border-white/6 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users size={14} className="text-red-400" />
                  Expected Donors
                </span>
                <span className="text-white font-bold">
                  {camp.registeredDonors} / {camp.expectedDonors}
                </span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500 font-mono">
                Organizer: {camp.organizer}
              </p>
            </div>

            {/* Register CTA button */}
            <div className="mt-6 pt-4 border-t border-white/8">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-red-600/90 border border-white/10 hover:border-red-500/50 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Register for Camp</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
