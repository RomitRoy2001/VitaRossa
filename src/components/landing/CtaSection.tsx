// src/components/landing/CtaSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, ArrowRight, Sparkles } from 'lucide-react';
import { Mandala } from './Mandala';

export const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Decorative center mandala behind the CTA block */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60">
        <Mandala
          size={650}
          opacity={0.16}
          duration={55}
          direction="clockwise"
          color="#ef4444"
          accentColor="#f87171"
          breathe={true}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#0f172a]/90 to-[#070b14]/95 border border-white/12 text-center backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
      >
        {/* Top ambient crimson flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[11px] font-mono uppercase tracking-[0.2em] text-red-300 mb-6">
          <Sparkles size={12} className="text-red-400" />
          <span>BE THE DIFFERENCE TODAY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
          One Donation Can Change Everything.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join a connected community working together to make blood available when it matters most. Every drop counts toward saving a life.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-600 via-scarlet to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-[0_0_32px_rgba(220,38,38,0.5)] hover:shadow-[0_0_45px_rgba(239,68,68,0.75)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Heart size={16} className="fill-white group-hover:scale-110 transition-transform" />
            <span>Become a Donor</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-slate-200 hover:text-white rounded-xl bg-[#0f172a] hover:bg-white/10 border border-white/12 hover:border-red-500/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <Activity size={16} className="text-red-400" />
            <span>Request Blood</span>
          </button>
        </div>

        <p className="mt-8 text-xs text-slate-500 font-mono">
          Safe · Confidential · Direct Impact Tracking
        </p>
      </motion.div>
    </section>
  );
};
