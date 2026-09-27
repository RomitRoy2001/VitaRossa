// src/pages/LandingPage.tsx
import React, { useState, useEffect, useId, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartPulse,
  Heart,
  Activity,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  Users,
  HeartHandshake,
  Building2,
  TentTree,
  UserCheck,
  GitMerge,
  Droplet,
  Stethoscope,
  Droplets,
  Microscope,
  Cpu,
  Package,
  FileCheck2,
  CheckCircle2,

  Calendar,
  MapPin,
  Quote,
  BadgeCheck,
  ArrowUp,
  Mail,
  Award,
  Globe,
} from 'lucide-react';

/* =============================================================================
   1. PROCEDURAL MANDALA SVG COMPONENT
   ============================================================================= */
interface MandalaProps {
  size?: number;
  opacity?: number;
  duration?: number;
  direction?: 'clockwise' | 'counter-clockwise';
  color?: string;
  accentColor?: string;
  breathe?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Mandala: React.FC<MandalaProps> = ({
  size = 600,
  opacity = 0.22,
  duration = 50,
  direction = 'clockwise',
  color = '#ef4444',
  accentColor = '#f87171',
  breathe = true,
  className = '',
  style = {},
}) => {
  const id = useId().replace(/:/g, '');
  const spinClass = direction === 'clockwise' ? 'animate-mandala-cw' : 'animate-mandala-ccw';

  const angles16 = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
  const angles32 = Array.from({ length: 32 }, (_, i) => (i * 360) / 32);
  const angles8 = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <div
        className={`w-full h-full ${breathe ? 'mandala-breathe-layer' : ''}`}
        style={
          {
            '--mandala-base-opacity': opacity,
            opacity,
          } as React.CSSProperties
        }
      >
        <svg
          viewBox="-300 -300 600 600"
          className={`w-full h-full overflow-visible ${spinClass}`}
          style={{ '--spin-duration': `${duration}s` } as React.CSSProperties}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id={`grad-${id}`} cx="0%" cy="0%" r="100%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
              <stop offset="65%" stopColor={color} stopOpacity="0.75" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Outermost Starburst Finials */}
          {angles16.map((deg, idx) => (
            <g key={`out-${idx}`} transform={`rotate(${deg})`}>
              <path
                d="M 0 -295 Q 18 -260 0 -230 Q -18 -260 0 -295 Z"
                stroke={`url(#grad-${id})`}
                strokeWidth="1.2"
              />
              <line x1="0" y1="-290" x2="0" y2="-235" stroke={accentColor} strokeWidth="0.8" opacity="0.8" />
              <circle cx="0" cy="-298" r="2.2" fill={accentColor} />
              <path
                d="M -12 -255 C -25 -270 -35 -260 -28 -245 C -22 -235 -10 -240 0 -235 C 10 -240 22 -235 28 -245 C 35 -260 25 -270 12 -255"
                stroke={color}
                strokeWidth="0.9"
                opacity="0.7"
              />
            </g>
          ))}

          <circle cx="0" cy="0" r="285" stroke={color} strokeWidth="0.6" strokeDasharray="3 7" opacity="0.6" />
          <circle cx="0" cy="0" r="275" stroke={color} strokeWidth="0.9" opacity="0.8" />
          <circle cx="0" cy="0" r="270" stroke={accentColor} strokeWidth="0.5" opacity="0.5" />

          {/* Radiating Scalloped Petal Arches */}
          {angles32.map((deg, idx) => (
            <g key={`ray-${idx}`} transform={`rotate(${deg})`}>
              <line x1="0" y1="-225" x2="0" y2="-268" stroke={color} strokeWidth="0.6" opacity="0.6" />
              <circle cx="0" cy="-268" r="1.2" fill={accentColor} opacity="0.8" />
            </g>
          ))}

          {angles16.map((deg, idx) => (
            <g key={`large-${idx}`} transform={`rotate(${deg + 11.25})`}>
              <path
                d="M 0 -265 C 24 -240 32 -200 0 -175 C -32 -200 -24 -240 0 -265 Z"
                stroke={color}
                strokeWidth="1.2"
              />
              <path
                d="M 0 -252 C 16 -232 20 -205 0 -185 C -20 -205 -16 -232 0 -252 Z"
                stroke={accentColor}
                strokeWidth="0.8"
                opacity="0.75"
              />
              <polygon
                points="0,-235 10,-218 0,-200 -10,-218"
                stroke={color}
                strokeWidth="0.7"
                opacity="0.85"
              />
              <circle cx="0" cy="-218" r="2" fill={accentColor} opacity="0.9" />
            </g>
          ))}

          <circle cx="0" cy="0" r="225" stroke={color} strokeWidth="0.8" opacity="0.7" />
          <circle cx="0" cy="0" r="218" stroke={accentColor} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.8" />
          <circle cx="0" cy="0" r="175" stroke={color} strokeWidth="1" opacity="0.85" />

          {/* Intermediate Floret & Palmette Layer */}
          {angles16.map((deg, idx) => (
            <g key={`floret-${idx}`} transform={`rotate(${deg})`}>
              <path
                d="M 0 -175 C 20 -155 24 -130 0 -115 C -24 -130 -20 -155 0 -175 Z"
                stroke={color}
                strokeWidth="1.1"
              />
              <path
                d="M 0 -162 C 12 -147 14 -130 0 -120 C -14 -130 -12 -147 0 -162 Z"
                stroke={accentColor}
                strokeWidth="0.8"
                opacity="0.7"
              />
              <line x1="0" y1="-170" x2="0" y2="-125" stroke={color} strokeWidth="0.7" opacity="0.6" />
            </g>
          ))}

          {angles32.map((deg, idx) => (
            <g key={`pearl-${idx}`} transform={`rotate(${deg})`}>
              <circle cx="0" cy="-117" r="1.4" fill={accentColor} opacity="0.75" />
            </g>
          ))}

          <circle cx="0" cy="0" r="115" stroke={color} strokeWidth="1.1" opacity="0.8" />
          <circle cx="0" cy="0" r="110" stroke={accentColor} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="0" cy="0" r="85" stroke={color} strokeWidth="0.8" opacity="0.7" />

          {/* Inner Core Lotus & Sacred Star */}
          {angles8.map((deg, idx) => (
            <g key={`core-${idx}`} transform={`rotate(${deg})`}>
              <path
                d="M 0 -85 C 16 -68 18 -45 0 -35 C -18 -45 -16 -68 0 -85 Z"
                stroke={accentColor}
                strokeWidth="1.3"
              />
              <line x1="0" y1="-82" x2="0" y2="-40" stroke={color} strokeWidth="0.9" opacity="0.9" />
              <polygon points="0,-88 4,-82 0,-76 -4,-82" fill={color} opacity="0.8" />
            </g>
          ))}

          {angles8.map((deg, idx) => (
            <g key={`subcore-${idx}`} transform={`rotate(${deg + 22.5})`}>
              <path
                d="M 0 -70 C 10 -55 12 -42 0 -35 C -12 -42 -10 -55 0 -70 Z"
                stroke={color}
                strokeWidth="0.9"
                opacity="0.65"
              />
            </g>
          ))}

          <circle cx="0" cy="0" r="35" stroke={color} strokeWidth="1.2" opacity="0.9" />
          <circle cx="0" cy="0" r="28" stroke={accentColor} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.7" />
          <circle cx="0" cy="0" r="18" stroke={color} strokeWidth="1" opacity="0.8" />

          <polygon
            points="0,-18 5,-5 18,0 5,5 0,18 -5,5 -18,0 -5,-5"
            stroke={accentColor}
            strokeWidth="0.9"
            fill="rgba(220, 38, 38, 0.15)"
          />
          <circle cx="0" cy="0" r="5" fill={accentColor} opacity="0.9" filter={`url(#glow-${id})`} />
        </svg>
      </div>
    </div>
  );
};

/* =============================================================================
   2. DYNAMIC MANDALA PARALLAX BACKGROUND LAYER (REFINED — 4 mandalas)
   ============================================================================= */
const MandalaBackgroundLayer: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * 6;
      targetY = ny * 6;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;
      setOffset({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.1s linear',
        willChange: 'transform',
      }}
    >
      {/* 1. Top-Right Hero Framing Mandala */}
      <div className="absolute -top-48 -right-48 lg:-top-56 lg:-right-56">
        <Mandala size={780} opacity={0.14} duration={60} direction="clockwise" color="#ef4444" accentColor="#fca5a5" />
      </div>

      {/* 2. Left-Middle Mandala */}
      <div className="absolute top-[35%] -left-56 lg:-left-64">
        <Mandala size={640} opacity={0.10} duration={78} direction="counter-clockwise" color="#dc2626" accentColor="#f87171" />
      </div>

      {/* 3. Behind Testimonial */}
      <div className="absolute top-[72%] left-1/2 -translate-x-1/2">
        <Mandala size={700} opacity={0.14} duration={66} direction="counter-clockwise" color="#ef4444" accentColor="#fca5a5" />
      </div>

      {/* 4. Bottom-Right */}
      <div className="absolute -bottom-48 -right-40">
        <Mandala size={620} opacity={0.12} duration={58} direction="clockwise" color="#dc2626" accentColor="#f87171" />
      </div>

      {/* Ambient Radial Highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(220,38,38,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(220,38,38,0.06),transparent_60%)] pointer-events-none" />
    </div>
  );
};

/* =============================================================================
   3. ECG / HEARTBEAT WAVE COMPONENT
   ============================================================================= */
const HeartbeatLine: React.FC<{ height?: number; className?: string }> = ({ height = 80, className = '' }) => {
  const id = useId().replace(/:/g, '');

  return (
    <div
      aria-hidden="true"
      className={`relative w-full select-none pointer-events-none overflow-hidden ${className}`}
      style={{ height }}
    >
      <svg viewBox="0 0 1600 100" preserveAspectRatio="none" className="w-full h-full" fill="none">
        <defs>
          <filter id={`ecg-glow-${id}`} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`ecg-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.05" />
            <stop offset="15%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f87171" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path
          d={`
            M 0 50 L 120 50 Q 135 50 142 45 Q 150 40 158 50 L 190 50 L 202 56 L 216 12 L 230 78 L 242 50 L 260 50 Q 275 36 295 50 
            L 480 50 Q 495 50 502 45 Q 510 40 518 50 L 550 50 L 562 56 L 576 10 L 590 82 L 602 50 L 620 50 Q 635 34 655 50 
            L 880 50 Q 895 50 902 45 Q 910 40 918 50 L 950 50 L 962 56 L 976 14 L 990 76 L 1002 50 L 1020 50 Q 1035 36 1055 50 
            L 1280 50 Q 1295 50 1302 45 Q 1310 40 1318 50 L 1350 50 L 1362 56 L 1376 12 L 1390 80 L 1402 50 L 1420 50 Q 1435 36 1455 50 L 1600 50
          `}
          stroke={`url(#ecg-grad-${id})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#ecg-glow-${id})`}
          opacity="0.85"
        />
        <path
          d={`
            M 0 50 L 120 50 Q 135 50 142 45 Q 150 40 158 50 L 190 50 L 202 56 L 216 12 L 230 78 L 242 50 L 260 50 Q 275 36 295 50 
            L 480 50 Q 495 50 502 45 Q 510 40 518 50 L 550 50 L 562 56 L 576 10 L 590 82 L 602 50 L 620 50 Q 635 34 655 50 
            L 880 50 Q 895 50 902 45 Q 910 40 918 50 L 950 50 L 962 56 L 976 14 L 990 76 L 1002 50 L 1020 50 Q 1035 36 1055 50 
            L 1280 50 Q 1295 50 1302 45 Q 1310 40 1318 50 L 1350 50 L 1362 56 L 1376 12 L 1390 80 L 1402 50 L 1420 50 Q 1435 36 1455 50 L 1600 50
          `}
          stroke="#ef4444"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

/* =============================================================================
   SECTION DIVIDER COMPONENT
   ============================================================================= */
const SectionDivider: React.FC = () => (
  <div className="w-full flex justify-center py-2" aria-hidden="true">
    <div className="landing-section-divider w-full" />
  </div>
);

/* =============================================================================
   ANIMATED COUNTER HOOK
   ============================================================================= */
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

/* =============================================================================
   4. DATA DEFINITIONS
   ============================================================================= */
const STATS = [
  { icon: <Users size={24} className="text-red-400" />, value: 10, suffix: 'K+', label: 'REGISTERED DONORS', sub: 'Active and verified donors ready for dispatch' },
  { icon: <HeartHandshake size={24} className="text-red-400" />, value: 25, suffix: 'K+', label: 'LIVES SUPPORTED', sub: 'Successful transfusions facilitated across facilities' },
  { icon: <Building2 size={24} className="text-red-400" />, value: 150, suffix: '+', label: 'PARTNER HOSPITALS', sub: 'Connected tier-1 and community medical centers' },
  { icon: <TentTree size={24} className="text-red-400" />, value: 500, suffix: '+', label: 'DONATION CAMPS', sub: 'Mobilized community and corporate blood drives' },
];

const STEPS = [
  { num: '01', title: 'REGISTER', desc: 'Create your donor profile and check eligibility in seconds.', detail: 'Digital medical screening, hemoglobin checks, and rapid verification.', icon: <UserCheck size={22} className="text-red-400" /> },
  { num: '02', title: 'CONNECT', desc: 'Match available blood with verified emergency requirements.', detail: 'Automated cross-matching algorithm finds compatible patient requests.', icon: <GitMerge size={22} className="text-red-400" /> },
  { num: '03', title: 'DONATE', desc: 'Complete the donation process safely at a verified station.', detail: 'Comfortable facilities, sterile protocols, and real-time bag tracking.', icon: <Droplet size={22} className="text-red-400" /> },
  { num: '04', title: 'SAVE', desc: 'Help blood reach someone when it matters most.', detail: 'Traceable dispatch pipeline right to operating theaters and ICU beds.', icon: <HeartPulse size={22} className="text-red-400" /> },
];

const STAGES = [
  { id: 'donor', name: 'DONOR', shortDesc: 'Identity & registration', details: 'Digital health screening, contact verification, consent recording.', icon: <UserCheck size={18} />, protocol: 'BIO-ID-SECURE' },
  { id: 'screening', name: 'SCREENING', shortDesc: 'Vitals & hemoglobin', details: 'Blood pressure, Hb > 12.5 g/dL, pulse, medical history checklist.', icon: <Stethoscope size={18} />, protocol: 'VITALS-CHECK-V2' },
  { id: 'donation', name: 'DONATION', shortDesc: 'Sterile collection', details: 'Whole blood (350ml/450ml) or apheresis into sterile CPDA-1 bags.', icon: <Droplets size={18} />, protocol: 'COLLECT-ST-450' },
  { id: 'testing', name: 'TESTING', shortDesc: 'Viral markers & NAT', details: 'ELISA & Nucleic Acid Testing for HIV, HBV, HCV, Syphilis, Malaria.', icon: <Microscope size={18} />, protocol: 'NAT-PCR-VERIFIED' },
  { id: 'processing', name: 'PROCESSING', shortDesc: 'Centrifugal separation', details: 'Separation into PRBC, Fresh Frozen Plasma, Platelets, Cryo.', icon: <Cpu size={18} />, protocol: 'CENTRI-SEP-4C' },
  { id: 'inventory', name: 'INVENTORY', shortDesc: 'Cold-chain tracking', details: 'RFID-tagged cold units monitored at calibrated 2°C to 6°C.', icon: <Package size={18} />, protocol: 'COLD-CHAIN-MON' },
  { id: 'request', name: 'REQUEST', shortDesc: 'Hospital crossmatch', details: 'Urgent crossmatching algorithm matches blood group and phenotype.', icon: <FileCheck2 size={18} />, protocol: 'CROSSMATCH-SYNC' },
  { id: 'patient', name: 'PATIENT', shortDesc: 'Life saved', details: 'Emergency bedside delivery and verified recipient transfusion.', icon: <HeartHandshake size={18} />, protocol: 'BEDSIDE-TX-OK' },
];

const INVENTORY = [
  { group: 'O+', units: 248, cap: 300, status: 'AVAILABLE', compat: 'O+, A+, B+, AB+' },
  { group: 'O-', units: 42, cap: 150, status: 'CRITICAL', compat: 'Universal Red Cell Donor' },
  { group: 'A+', units: 184, cap: 250, status: 'AVAILABLE', compat: 'A+, AB+' },
  { group: 'A-', units: 36, cap: 120, status: 'LOW', compat: 'A-, A+, AB-, AB+' },
  { group: 'B+', units: 196, cap: 250, status: 'AVAILABLE', compat: 'B+, AB+' },
  { group: 'B-', units: 28, cap: 100, status: 'CRITICAL', compat: 'B-, B+, AB-, AB+' },
  { group: 'AB+', units: 98, cap: 120, status: 'AVAILABLE', compat: 'Universal Recipient' },
  { group: 'AB-', units: 19, cap: 80, status: 'CRITICAL', compat: 'AB-, AB+' },
];

const CAMPS = [
  { id: 'c1', name: 'Metropolitan Community Blood Drive', loc: 'Victoria Central Medical Ground', city: 'Guwahati, Assam', date: '18 September 2026', exp: 150, reg: 128, org: 'Red Cross & VitaRossa Health' },
  { id: 'c2', name: 'Silicon Corridor Tech Drive 2026', loc: 'Infosys Main Convention Hall, Phase 1', city: 'Bangalore, Karnataka', date: '24 September 2026', exp: 250, reg: 194, org: 'Tech CSR Collaborative' },
  { id: 'c3', name: 'National University Youth Lifeline Camp', loc: 'Campus Auditorium, Gate 3', city: 'Delhi NCR', date: '02 October 2026', exp: 180, reg: 112, org: 'University NSS Unit' },
];

const TESTIMONIALS = [
  {
    quote: 'VitaRossa made the donation journey simple, transparent and meaningful. Knowing exactly where my contribution went and how it helped gave me a profound sense of purpose.',
    name: 'Elena R.',
    bloodType: 'O+ Negative',
    initials: 'ER',
    detail: 'Verified Regular Donor · 12 Units Donated',
  },
  {
    quote: 'Within 45 minutes of posting an emergency request, VitaRossa connected us with three verified donors. The real-time tracking gave us confidence during the most critical hours.',
    name: 'Dr. Arjun M.',
    bloodType: 'A+ Positive',
    initials: 'AM',
    detail: 'Emergency Physician · City General Hospital',
  },
  {
    quote: 'As a camp organizer, the platform streamlined our entire workflow — from registration to post-donation follow-up. We processed 40% more donors than our previous manual approach.',
    name: 'Priya S.',
    bloodType: 'B+ Positive',
    initials: 'PS',
    detail: 'NSS Volunteer Lead · 8 Camps Organized',
  },
];

/* =============================================================================
   ANIMATED STAT CARD COMPONENT
   ============================================================================= */
const StatCard: React.FC<{ stat: typeof STATS[0]; idx: number }> = ({ stat, idx }) => {
  const { count, ref } = useCountUp(stat.value, 1800);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: idx * 0.12 }}
      whileHover={{
        y: -8,
        borderColor: 'rgba(239, 68, 68, 0.45)',
        boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(220, 38, 38, 0.2)',
      }}
      className="glass-card-premium relative p-7 sm:p-8 rounded-2xl transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-red-500/50 transition-colors" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:border-red-500/40 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300">
          {stat.icon}
        </div>
        <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight group-hover:text-red-100 transition-colors">
          {count}{stat.suffix}
        </div>
        <div className="mt-2 text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
          {stat.label}
        </div>
        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          {stat.sub}
        </p>
      </div>

      <span className="absolute bottom-5 right-5 text-[10px] font-mono text-slate-600 group-hover:text-red-400/60 transition-colors">
        0{idx + 1}
      </span>
    </motion.div>
  );
};

/* =============================================================================
   5. MASTER SELF-CONTAINED LANDING PAGE COMPONENT
   ============================================================================= */
export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(STAGES[3]); // Default on Testing
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    document.title = 'VitaRossa — Connecting Life in Every Drop';
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Workflow', href: '#journey' },
    { label: 'Blood Inventory', href: '#inventory' },
    { label: 'Donation Camps', href: '#camps' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070b14] text-slate-100 overflow-x-hidden selection:bg-red-600/40 selection:text-white bloodflow-grid">
      {/* Background Mandala & Parallax Engine */}
      <MandalaBackgroundLayer />

      {/* Main Content Tree */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {/* ==============================================================
            STICKY GLASS HEADER
            ============================================================== */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
              ? 'bg-[#070b14]/90 backdrop-blur-2xl border-b border-red-500/10 shadow-[0_4px_40px_rgba(0,0,0,0.8),0_0_60px_rgba(220,38,38,0.08)] py-3'
              : 'bg-[#070b14]/40 backdrop-blur-md border-b border-white/[0.04] py-4'
            }`}
        >
          {/* Futuristic top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo — VitaRossa */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3.5 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 via-rose-600 to-red-800 flex items-center justify-center shadow-[0_0_24px_rgba(220,38,38,0.6)] group-hover:shadow-[0_0_32px_rgba(239,68,68,0.8)] transition-all duration-300 group-hover:scale-105">
                  <HeartPulse size={22} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#070b14] animate-pulse" />
                {/* Scan line effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ height: '50%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-black text-white tracking-tight group-hover:text-red-50 transition-colors">VitaRossa</span>
                  <span className="hidden sm:inline-flex items-center text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/25 shadow-[0_0_8px_rgba(220,38,38,0.15)]">
                    v2.0
                  </span>
                </div>
                <p className="text-[10px] text-slate-400/80 tracking-[0.15em] font-mono uppercase">Connecting Life in Every Drop</p>
              </div>
            </div>

            {/* Desktop Navigation — Futuristic pills */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-1.5 py-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-4 py-2 text-[11px] font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-white/[0.08] transition-all duration-300 group/nav"
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Hover glow underline */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent group-hover/nav:w-3/4 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Header Right CTAs — Animated futuristic buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.button
                type="button"
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer overflow-hidden group/login"
              >
                {/* Sweep effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover/login:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  Login
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-5 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)] flex items-center gap-2 cursor-pointer overflow-hidden group/cta"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  <Heart size={13} className="fill-white" />
                  <span>Become a Donor</span>
                  <ArrowRight size={12} className="group-hover/cta:translate-x-0.5 transition-transform" />
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-white/10 bg-[#070b14]/98 backdrop-blur-2xl px-6 py-6 shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/8"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                      className="w-full py-3 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all"
                    >
                      Login to Portal
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                      className="w-full py-3 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-[0_0_18px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2"
                    >
                      <Heart size={14} className="fill-white" />
                      <span>Become a Donor</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ==============================================================
            MAIN CONTENT SECTIONS
            ============================================================== */}
        <main className="flex-1 w-full flex flex-col items-center">
          {/* ═══════════════════════════════════════════════════════════════
              1. HERO SECTION — Cinematic, Full-Screen
              ═══════════════════════════════════════════════════════════════ */}
          <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden hero-spotlight">
            <div className="w-full max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/25 shadow-[0_0_16px_rgba(220,38,38,0.2)] mb-10"
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

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black tracking-tight text-white leading-[1.05] max-w-4xl"
              >
                Connecting Life
                <br />
                <span className="text-gradient-crimson drop-shadow-[0_0_40px_rgba(220,38,38,0.5)]">
                  in Every Drop.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-8 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl font-normal leading-relaxed text-center"
              >
                VitaRossa is a smarter, faster blood donation ecosystem — connecting verified donors, hospitals, and blood banks to save lives when it matters most.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
              >
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto px-9 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-[0_0_32px_rgba(220,38,38,0.45)] hover:shadow-[0_0_44px_rgba(239,68,68,0.75)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Heart size={17} className="fill-white group-hover:scale-110 transition-transform" />
                  <span>Become a Donor</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto px-9 py-4 text-sm font-semibold text-slate-200 hover:text-white rounded-xl bg-[#0f172a]/70 hover:bg-[#0f172a]/95 border border-white/12 hover:border-red-500/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                  <Activity size={17} className="text-red-400" />
                  <span>Request Blood</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono"
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

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════════════
              2. STATISTICS WITH ECG LINE — Expanded, Animated Counters
              ═══════════════════════════════════════════════════════════════ */}
          <section id="about" className="relative w-full py-28 sm:py-32 px-4 sm:px-6 lg:px-8 landing-section-glow-top flex justify-center">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-0 opacity-70 pointer-events-none">
              <HeartbeatLine height={120} />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-red-400 font-semibold mb-2">
                  PROVEN LIFELINE IMPACT
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 tracking-tight">
                  Empowering Emergency Response at Scale
                </h2>
                <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
                  Our platform connects donors, hospitals, and blood banks in real time — creating a verified supply chain that saves lives every day.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {STATS.map((stat, idx) => (
                  <StatCard key={stat.label} stat={stat} idx={idx} />
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════════════
              3. HOW VITAROSSA WORKS — Enhanced Timeline
              ═══════════════════════════════════════════════════════════════ */}
          <section id="how-it-works" className="relative w-full py-32 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-4">
                  STEP-BY-STEP PROCESS
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  How VitaRossa Works
                </h2>
                <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">
                  From donor to patient, every step is connected, tracked, and verified.
                </p>
              </div>

              <div className="relative w-full">
                {/* Animated connecting line */}
                <div className="hidden lg:block absolute top-[56px] left-[10%] right-[10%] h-[2px] z-0 overflow-hidden rounded-full">
                  <div className="h-full bg-gradient-to-r from-red-500/10 via-red-500/50 to-red-500/10" />
                  <div className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-red-400/80 to-transparent" style={{ width: '30%', animation: 'pulse-travel 4s ease-in-out infinite' }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 w-full">
                  {STEPS.map((step, idx) => (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      whileHover={{ y: -6 }}
                      className="relative flex flex-col items-center text-center p-7 sm:p-8 rounded-2xl glass-card-premium transition-all duration-300 group"
                    >
                      <div className="relative mb-6 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#0f172a] border border-white/12 flex items-center justify-center group-hover:border-red-500/50 group-hover:shadow-[0_0_24px_rgba(220,38,38,0.4)] transition-all duration-300">
                          {step.icon}
                        </div>
                        <span className="absolute -top-2.5 -right-2.5 px-2 py-0.5 rounded-lg bg-red-500/20 border border-red-500/40 text-[11px] font-mono font-bold text-red-300">
                          {step.num}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-wide font-mono mb-3 group-hover:text-red-300 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-300 mb-3 leading-snug">
                        {step.desc}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════════════
              4. CONNECTED CIRCULATORY PIPELINE — Premium Interactive Panel
              ═══════════════════════════════════════════════════════════════ */}
          <section id="journey" className="relative w-full py-32 px-4 sm:px-6 lg:px-8 landing-section-glow-center flex justify-center">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-4">
                  CIRCULATORY PIPELINE
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  The Connected VitaRossa Journey
                </h2>
                <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
                  An end-to-end synchronized lifecycle ensuring every collected unit arrives safely where it counts.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#0c1322]/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden w-full"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

              {/* Stage selector — wrapping flex instead of horizontal scroll */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pb-4 pt-2">
                {STAGES.map((stage) => {
                  const isSelected = activeStage.id === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStage(stage)}
                      className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer ${isSelected
                          ? 'bg-red-600/20 border border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                          : 'bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10'
                        }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${isSelected
                            ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] scale-110'
                            : 'bg-[#0f172a] text-slate-400 border border-white/12 hover:text-white hover:border-red-500/30'
                          }`}
                      >
                        {stage.icon}
                      </div>
                      <span
                        className={`text-[10px] font-mono tracking-wider font-semibold transition-colors ${isSelected ? 'text-red-400 font-bold' : 'text-slate-500'
                          }`}
                      >
                        {stage.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Stage detail panel with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-white/8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                >
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30">
                        STAGE PROTOCOL: {activeStage.protocol}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                        <CheckCircle2 size={13} />
                        <span>Zero-Loss Pipeline</span>
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                      {activeStage.name} — {activeStage.shortDesc}
                    </h3>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                      {activeStage.details}
                    </p>
                  </div>

                  <div className="bg-[#070b14]/60 border border-white/8 rounded-xl p-5 flex flex-col justify-center font-mono text-xs space-y-3">
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
                </motion.div>
              </AnimatePresence>
              </motion.div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════════════
              5. BLOOD INVENTORY AVAILABILITY — Differentiated Cards
              ═══════════════════════════════════════════════════════════════ */}
          <section id="inventory" className="relative w-full py-32 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-4">
                    LIVE RESERVE RADAR
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    Blood Inventory Availability
                  </h2>
                  <p className="mt-3 text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                    Real-time multi-depot stock telemetry updated continuously across connected facilities.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[#0f172a]/80 border border-white/10 px-5 py-3 rounded-xl backdrop-blur-md self-start md:self-auto">
                  <Activity size={16} className="text-red-400 animate-pulse" />
                  <span className="text-xs font-mono text-slate-300">Telemetry Feed: </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">ONLINE & SYNCED</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
                {INVENTORY.map((item, idx) => {
                  const pct = Math.min(100, Math.round((item.units / item.cap) * 100));
                  const borderColor = item.status === 'CRITICAL'
                    ? 'border-l-rose-500/60'
                    : item.status === 'LOW'
                      ? 'border-l-amber-500/60'
                      : 'border-l-emerald-500/40';

                  return (
                    <motion.div
                      key={item.group}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                      whileHover={{ y: -6, borderColor: 'rgba(239, 68, 68, 0.4)' }}
                      className={`glass-card-premium rounded-2xl p-6 transition-all duration-200 relative group overflow-hidden border-l-[3px] ${borderColor}`}
                    >
                      <div className="absolute -right-3 -bottom-3 text-white/[0.03] font-black text-8xl select-none pointer-events-none group-hover:text-red-500/[0.06] transition-colors">
                        {item.group}
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600/30 to-red-900/30 border border-red-500/30 flex items-center justify-center font-mono font-black text-lg text-white">
                              {item.group}
                            </div>
                            <div>
                              <div className="text-xs font-mono text-slate-400">STOCK</div>
                              <div className="text-xl font-bold text-white font-mono leading-none">
                                {item.units} <span className="text-xs text-slate-400 font-normal">Units</span>
                              </div>
                            </div>
                          </div>

                          {item.status === 'AVAILABLE' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">AVAILABLE</span>
                          )}
                          {item.status === 'LOW' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">LOW RESERVE</span>
                          )}
                          {item.status === 'CRITICAL' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">CRITICAL</span>
                          )}
                        </div>

                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-[11px] font-mono text-slate-400">
                            <span>Capacity</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden">
                            <div
                              className={`h-full rounded-full progress-animate ${item.status === 'AVAILABLE'
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                  : item.status === 'LOW'
                                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                                    : 'bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]'
                                }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-[11px] text-slate-400 truncate">
                          <span className="text-slate-500 font-mono">Target: </span>
                          {item.compat}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white bg-[#0f172a]/90 hover:bg-white/10 border border-white/12 hover:border-red-500/40 rounded-xl backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer hover:-translate-y-0.5 duration-200"
                >
                  <Droplet size={14} className="text-red-400" />
                  <span>Explore Blood Availability & Reserve</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════════════
              6. UPCOMING DONATION CAMPS — Refined Cards
              ═══════════════════════════════════════════════════════════════ */}
          <section id="camps" className="relative w-full py-32 px-4 sm:px-6 lg:px-8 landing-section-glow-top flex justify-center">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-4">
                  COMMUNITY DRIVES
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Upcoming Donation Camps
                </h2>
                <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
                  Join authorized blood drives in your area. Certified medical staff, rapid pre-screening, and sterile donation stations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full">
              {CAMPS.map((camp, idx) => {
                const regPct = Math.round((camp.reg / camp.exp) * 100);
                return (
                  <motion.div
                    key={camp.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                    whileHover={{ y: -8 }}
                    className="glass-card-premium p-7 sm:p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent group-hover:via-red-500 transition-colors" />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          REGISTRATION OPEN
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                          <Calendar size={13} className="text-red-400" />
                          {camp.date}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                        {camp.name}
                      </h3>

                      <div className="mt-4 space-y-1 text-xs text-slate-300">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong className="text-white font-medium">{camp.loc}</strong>, {camp.city}
                          </span>
                        </div>
                      </div>

                      {/* Registration progress bar */}
                      <div className="mt-6 p-4 rounded-xl bg-[#070b14]/60 border border-white/6 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Users size={14} className="text-red-400" />
                            Registrations
                          </span>
                          <span className="text-white font-bold">
                            {camp.reg} / {camp.exp}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-500 progress-animate"
                            style={{ width: `${regPct}%` }}
                          />
                        </div>
                      </div>

                      <p className="mt-3 text-[11px] text-slate-500 font-mono">
                        Organizer: {camp.org}
                      </p>
                    </div>

                    <div className="mt-7 pt-5 border-t border-white/8">
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-red-600/90 border border-white/10 hover:border-red-500/50 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                      >
                        <span>Register for Camp</span>
                        <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════════════
              7. TESTIMONIAL CAROUSEL — 3 Rotating Quotes
              ═══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full py-36 px-4 sm:px-6 lg:px-8 overflow-hidden flex justify-center">
            <div className="w-full max-w-5xl mx-auto relative">
              <div className="absolute bottom-8 -left-32 w-1/2 opacity-60 pointer-events-none hidden md:block">
                <HeartbeatLine height={60} />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative p-10 sm:p-14 md:p-16 rounded-3xl bg-[#0f172a]/70 backdrop-blur-2xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center overflow-hidden w-full"
              >
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

                {/* Large decorative quote */}
                <div className="absolute top-8 left-8 text-red-500/[0.06] text-[120px] font-serif leading-none select-none pointer-events-none">
                  &ldquo;
                </div>

                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-8">
                  <Quote size={22} className="rotate-180" />
                </div>

                {/* Rotating testimonials */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                  >
                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed italic max-w-3xl mx-auto tracking-tight">
                      &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                    </blockquote>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 p-[2px] shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                          <div className="w-full h-full rounded-full bg-[#0b1120] flex items-center justify-center text-sm font-bold text-white font-mono">
                            {TESTIMONIALS[activeTestimonial].initials}
                          </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 ring-2 ring-[#0f172a]">
                          <BadgeCheck size={12} className="text-white" />
                        </div>
                      </div>

                      <div className="text-center sm:text-left">
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <span className="text-base font-bold text-white tracking-wide">{TESTIMONIALS[activeTestimonial].name}</span>
                          <span className="text-xs font-mono font-bold text-red-400 bg-red-500/15 px-1.5 py-0.5 rounded border border-red-500/30">
                            {TESTIMONIALS[activeTestimonial].bloodType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-1">
                          {TESTIMONIALS[activeTestimonial].detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel dots */}
                <div className="mt-10 flex items-center justify-center gap-2.5">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`View testimonial ${idx + 1}`}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${idx === activeTestimonial
                          ? 'w-8 h-2.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                          : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-500'
                        }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════════════
              8. FINAL CTA SECTION — Cinematic Finale
              ═══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full py-40 px-4 sm:px-6 lg:px-8 overflow-hidden flex justify-center">
            <div className="w-full max-w-6xl mx-auto relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <Mandala size={650} opacity={0.12} duration={66} direction="clockwise" color="#ef4444" accentColor="#f87171" breathe={true} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 p-12 sm:p-20 rounded-3xl cta-gradient-bg border border-white/12 text-center backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] w-full"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-[11px] font-mono uppercase tracking-[0.2em] text-red-300 mb-8">
                  <Sparkles size={12} className="text-red-400" />
                  <span>BE THE DIFFERENCE TODAY</span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
                  One Donation Can Change Everything.
                </h2>

                <p className="mt-8 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Join a connected community working together to make blood available when it matters most. Every drop counts toward saving a life.
                </p>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>NABH Certified</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                    <Award size={14} className="text-amber-400" />
                    <span>ISO 9001:2015</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                    <Globe size={14} className="text-blue-400" />
                    <span>WHO Aligned</span>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-auto px-10 py-4.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-[0_0_36px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <Heart size={17} className="fill-white group-hover:scale-110 transition-transform" />
                    <span>Become a Donor</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-auto px-10 py-4.5 text-sm font-semibold text-slate-200 hover:text-white rounded-xl bg-[#0f172a] hover:bg-white/10 border border-white/12 hover:border-red-500/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  >
                    <Activity size={17} className="text-red-400" />
                    <span>Request Blood</span>
                  </button>
                </div>

                <p className="mt-10 text-xs text-slate-500 font-mono">
                  Safe · Confidential · Direct Impact Tracking
                </p>
              </motion.div>
            </div>
          </section>
        </main>

        {/* ==============================================================
            LANDING FOOTER — Premium Upgrade
            ============================================================== */}
        <footer id="contact" className="relative w-full border-t border-white/8 bg-[#040710] text-slate-400 text-sm z-10 flex flex-col items-center">
          {/* Newsletter strip */}
          <div className="border-b border-white/6 w-full">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4 text-center md:text-left">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Stay connected with VitaRossa</p>
                    <p className="text-xs text-slate-400 mt-0.5">Get camp notifications, supply alerts, and impact reports.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="flex-1 md:w-80">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-5 py-3.5 text-sm bg-[#0b1120] border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-500/40 focus:ring-2 focus:ring-red-500/10 transition-all"
                    />
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all shadow-[0_0_18px_rgba(220,38,38,0.3)] cursor-pointer flex items-center gap-2 flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Heartbeat separator */}
          <div className="opacity-30 pointer-events-none">
            <HeartbeatLine height={24} />
          </div>

          {/* Footer main content */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/8">
              {/* Brand column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 via-rose-600 to-red-800 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                    <HeartPulse size={22} className="text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white tracking-tight">VitaRossa</span>
                    <p className="text-[10px] text-slate-400/80 tracking-[0.15em] font-mono uppercase">Connecting Life in Every Drop</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  A smarter, faster, and more connected blood donation ecosystem bridging verified donors, certified medical laboratories, and emergency triage facilities nationwide.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/20 text-xs text-emerald-400 font-mono">
                    <ShieldCheck size={13} />
                    <span>WHO Aligned</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/8 border border-red-500/20 text-xs text-red-400 font-mono">
                    <Award size={13} />
                    <span>NABH Certified</span>
                  </div>
                </div>
              </div>

              {/* Platform links */}
              <div className="lg:col-span-2 lg:col-start-7">
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-semibold mb-6">
                  Platform
                </h4>
                <ul className="space-y-3.5 text-sm">
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-slate-400 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group/link"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/link:bg-red-500 transition-colors" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support links */}
              <div className="lg:col-span-2">
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-semibold mb-6">
                  Support & Legal
                </h4>
                <ul className="space-y-3.5 text-sm">
                  <li>
                    <a href="#contact" className="text-slate-400 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group/link">
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/link:bg-red-500 transition-colors" />
                      Emergency Contact
                    </a>
                  </li>
                  <li>
                    <Link to="/login" className="text-slate-400 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group/link">
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/link:bg-red-500 transition-colors" />
                      Donor Portal Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="text-slate-400 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group/link">
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/link:bg-red-500 transition-colors" />
                      Hospital Dispatch
                    </Link>
                  </li>
                  <li>
                    <a href="#about" className="text-slate-400 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group/link">
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/link:bg-red-500 transition-colors" />
                      Privacy & Safety
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact info */}
              <div className="lg:col-span-3">
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-semibold mb-6">
                  Emergency Contact
                </h4>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0b1120]/80 border border-white/6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                        <HeartPulse size={14} className="text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-mono">24/7 HOTLINE</p>
                        <p className="text-sm text-white font-semibold">1800-VITA-ROSSA</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Mail size={14} className="text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-mono">DISPATCH EMAIL</p>
                        <p className="text-sm text-white font-semibold">ops@vitarossa.health</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-mono text-slate-500">
                © 2026 VitaRossa. All rights reserved. Connecting Life in Every Drop.
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white transition-colors cursor-pointer group/top"
              >
                <span>Back to top</span>
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover/top:bg-red-500/20 group-hover/top:border-red-500/30 transition-all">
                  <ArrowUp size={12} />
                </div>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

