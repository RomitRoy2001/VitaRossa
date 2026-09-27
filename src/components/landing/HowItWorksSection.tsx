// src/components/landing/HowItWorksSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, GitMerge, Droplet, HeartPulse } from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
}

const steps: StepItem[] = [
  {
    number: '01',
    title: 'REGISTER',
    description: 'Create your donor profile and check eligibility in seconds.',
    detail: 'Digital medical screening, hemoglobin checks, and rapid verification.',
    icon: <UserCheck size={20} className="text-red-400" />,
  },
  {
    number: '02',
    title: 'CONNECT',
    description: 'Match available blood with verified emergency requirements.',
    detail: 'Automated cross-matching algorithm finds compatible patient requests.',
    icon: <GitMerge size={20} className="text-red-400" />,
  },
  {
    number: '03',
    title: 'DONATE',
    description: 'Complete the donation process safely at a verified station.',
    detail: 'Comfortable facilities, sterile protocols, and real-time bag tracking.',
    icon: <Droplet size={20} className="text-red-400" />,
  },
  {
    number: '04',
    title: 'SAVE',
    description: 'Help blood reach someone when it matters most.',
    detail: 'Traceable dispatch pipeline right to operating theaters and ICU beds.',
    icon: <HeartPulse size={20} className="text-red-400" />,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-3"
        >
          STEP-BY-STEP PROCESS
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight"
        >
          How BloodFlow Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400"
        >
          From donor to patient, every step is connected.
        </motion.p>
      </div>

      {/* Horizontal Timeline on Desktop / Vertical on Mobile */}
      <div className="relative">
        {/* Desktop timeline horizontal connecting bar */}
        <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-red-500/10 via-red-500/40 to-red-500/10 z-0">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-75" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="relative flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-[#0b1120]/70 border border-white/8 hover:border-red-500/30 backdrop-blur-md transition-all duration-300 group"
            >
              {/* Step indicator node */}
              <div className="relative mb-5 flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[#0f172a] border border-white/12 flex items-center justify-center group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md bg-red-500/20 border border-red-500/40 text-[10px] font-mono font-bold text-red-300">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white tracking-wide font-mono mb-2 group-hover:text-red-300 transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm font-medium text-slate-300 mb-3 leading-snug">
                {step.description}
              </p>

              {/* Detail */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
