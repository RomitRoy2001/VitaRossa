// src/components/landing/TestimonialSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, BadgeCheck } from 'lucide-react';
import { HeartbeatLine } from './HeartbeatLine';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Decorative ECG line grazing the bottom left */}
      <div className="absolute bottom-6 -left-32 w-1/2 opacity-70 pointer-events-none hidden md:block">
        <HeartbeatLine height={60} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative p-8 sm:p-12 md:p-14 rounded-3xl bg-[#0f172a]/70 backdrop-blur-2xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center overflow-hidden"
      >
        {/* Top subtle red gradient accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

        {/* Ambient subtle glow inside the card */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Quote Glyph */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
          <Quote size={20} className="rotate-180" />
        </div>

        {/* Testimonial Quote */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed italic max-w-3xl mx-auto tracking-tight">
          &ldquo;BloodFlow made the donation journey simple, transparent and meaningful.
          Knowing exactly where my contribution went and how it helped gave me a profound sense of purpose.&rdquo;
        </blockquote>

        {/* Donor identity */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Avatar circle */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 p-[2px] shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <div className="w-full h-full rounded-full bg-[#0b1120] flex items-center justify-center text-sm font-bold text-white font-mono">
                ER
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 ring-2 ring-[#0f172a]">
              <BadgeCheck size={12} className="text-white" />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-base font-bold text-white tracking-wide">Elena R.</span>
              <span className="text-xs font-mono font-bold text-red-400 bg-red-500/15 px-1.5 py-0.2 rounded border border-red-500/30">
                O+ Negative
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Verified Regular Donor · 12 Units Donated
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
