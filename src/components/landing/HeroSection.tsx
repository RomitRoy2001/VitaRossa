// src/components/landing/HeroSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* 1. Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 shadow-[0_0_16px_rgba(220,38,38,0.2)] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase font-semibold text-red-300">
            EVERY DROP MATTERS
          </span>
          <Sparkles size={12} className="text-red-400 opacity-80" />
        </motion.div>

        {/* 2. Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight text-white leading-[1.08] max-w-3xl"
        >
          Connecting Life.
          <br />
          <span className="text-gradient-crimson drop-shadow-[0_0_35px_rgba(220,38,38,0.4)]">
            Saving Lives.
          </span>
        </motion.h1>

        {/* 3. Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-7 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed text-center"
        >
          A smarter, faster and more connected blood donation ecosystem built to help blood reach those who need it most.
        </motion.p>

        {/* 4. CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA - Crimson */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-600 via-scarlet to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-[0_0_28px_rgba(220,38,38,0.45)] hover:shadow-[0_0_38px_rgba(239,68,68,0.7)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Heart size={16} className="fill-white group-hover:scale-110 transition-transform" />
            <span>Become a Donor</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA - Dark / Glass */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-200 hover:text-white rounded-xl bg-[#0f172a]/70 hover:bg-[#0f172a]/95 border border-white/12 hover:border-red-500/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <Activity size={16} className="text-red-400" />
            <span>Request Blood</span>
          </button>
        </motion.div>

        {/* 5. Minimal trust badges below CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>NABH & WHO Aligned Protocols</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Real-time Cold Chain Verified</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-200 font-bold">24/7</span>
            <span>Critical Dispatch Network</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
