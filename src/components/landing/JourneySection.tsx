// src/components/landing/JourneySection.tsx
import React, { useState } from 'react';
import {
  UserCheck,
  Stethoscope,
  Droplets,
  Microscope,
  Cpu,
  Package,
  FileCheck2,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  shortDesc: string;
  details: string;
  icon: React.ReactNode;
  protocol: string;
}

const stages: Stage[] = [
  {
    id: 'donor',
    name: 'DONOR',
    shortDesc: 'Identity & registration',
    details: 'Digital health screening, contact verification, consent recording.',
    icon: <UserCheck size={18} />,
    protocol: 'BIO-ID-SECURE',
  },
  {
    id: 'screening',
    name: 'SCREENING',
    shortDesc: 'Vitals & hemoglobin',
    details: 'Blood pressure, Hb > 12.5 g/dL, pulse, medical history checklist.',
    icon: <Stethoscope size={18} />,
    protocol: 'VITALS-CHECK-V2',
  },
  {
    id: 'donation',
    name: 'DONATION',
    shortDesc: 'Sterile collection',
    details: 'Whole blood (350ml/450ml) or apheresis into sterile CPDA-1 bags.',
    icon: <Droplets size={18} />,
    protocol: 'COLLECT-ST-450',
  },
  {
    id: 'testing',
    name: 'TESTING',
    shortDesc: 'Viral markers & NAT',
    details: 'ELISA & Nucleic Acid Testing for HIV, HBV, HCV, Syphilis, Malaria.',
    icon: <Microscope size={18} />,
    protocol: 'NAT-PCR-VERIFIED',
  },
  {
    id: 'processing',
    name: 'PROCESSING',
    shortDesc: 'Centrifugal separation',
    details: 'Separation into PRBC, Fresh Frozen Plasma, Platelets, Cryo.',
    icon: <Cpu size={18} />,
    protocol: 'CENTRI-SEP-4C',
  },
  {
    id: 'inventory',
    name: 'INVENTORY',
    shortDesc: 'Cold-chain tracking',
    details: 'RFID RFID-tagged cold units monitored at calibrated 2°C to 6°C.',
    icon: <Package size={18} />,
    protocol: 'COLD-CHAIN-MON',
  },
  {
    id: 'request',
    name: 'REQUEST',
    shortDesc: 'Hospital crossmatch',
    details: 'Urgent crossmatching algorithm matches blood group and phenotype.',
    icon: <FileCheck2 size={18} />,
    protocol: 'CROSSMATCH-SYNC',
  },
  {
    id: 'patient',
    name: 'PATIENT',
    shortDesc: 'Life saved',
    details: 'Emergency bedside delivery and verified recipient transfusion.',
    icon: <HeartHandshake size={18} />,
    protocol: 'BEDSIDE-TX-OK',
  },
];

export const JourneySection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<Stage>(stages[3]); // Default on Testing

  return (
    <section id="journey" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-3">
          CIRCULATORY PIPELINE
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          The Connected BloodFlow Journey
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          An end-to-end synchronized lifecycle ensuring every collected unit arrives safely where it counts.
        </p>
      </div>

      {/* Futuristic Journey Track */}
      <div className="bg-[#0c1322]/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

        {/* Horizontal scrollable pipeline nodes */}
        <div className="overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-thin">
          <div className="flex items-center min-w-[780px] justify-between relative">
            {/* Background connecting rail */}
            <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 h-[2px] bg-slate-800 z-0">
              {/* Animated pulse line */}
              <div className="h-full bg-gradient-to-r from-red-600 via-scarlet to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
            </div>

            {stages.map((stage, idx) => {
              const isSelected = activeStage.id === stage.id;
              return (
                <div key={stage.id} className="relative z-10 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setActiveStage(stage)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-[0_0_24px_rgba(220,38,38,0.7)] scale-110 ring-2 ring-red-400'
                        : 'bg-[#0f172a] text-slate-400 hover:text-white border border-white/12 hover:border-red-500/40'
                    }`}
                  >
                    {stage.icon}
                  </button>

                  <span
                    className={`mt-2.5 text-[11px] font-mono tracking-wider font-semibold transition-colors ${
                      isSelected ? 'text-red-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {stage.name}
                  </span>

                  {idx < stages.length - 1 && (
                    <ChevronRight
                      size={14}
                      className="absolute -right-3 top-4 text-slate-600 hidden xl:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <div className="mt-8 pt-6 border-t border-white/8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                STAGE PROTOCOL: {activeStage.protocol}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                <CheckCircle2 size={13} />
                <span>Zero-Loss Pipeline</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
              {activeStage.name} — {activeStage.shortDesc}
            </h3>
            <p className="mt-2 text-slate-300 text-sm leading-relaxed">
              {activeStage.details}
            </p>
          </div>

          <div className="bg-[#070b14]/60 border border-white/8 rounded-xl p-4 flex flex-col justify-center font-mono text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>LATENCY:</span>
              <span className="text-emerald-400">&lt; 45 SECONDS</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>INTEGRITY:</span>
              <span className="text-slate-200">100% AUDITED</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>SECURITY:</span>
              <span className="text-red-400">ENCRYPTED NODE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
