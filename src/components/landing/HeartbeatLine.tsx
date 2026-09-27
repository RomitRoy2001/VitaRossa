// src/components/landing/HeartbeatLine.tsx
import React, { useId } from 'react';

interface HeartbeatLineProps {
  className?: string;
  height?: number;
}

/**
 * High-precision medical ECG / Rhythm wave line with continuous animated pulse travel.
 * Renders horizontally across sections with authentic P-Q-R-S-T ventricular waveforms.
 */
export const HeartbeatLine: React.FC<HeartbeatLineProps> = ({
  className = '',
  height = 80,
}) => {
  const id = useId().replace(/:/g, '');

  return (
    <div
      aria-hidden="true"
      className={`relative w-full select-none pointer-events-none overflow-hidden ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
      >
        <defs>
          <filter id={`ecg-glow-${id}`} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Horizontal fade at edges */}
          <linearGradient id={`ecg-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.05" />
            <stop offset="15%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f87171" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
          </linearGradient>

          {/* Luminous beacon traveling along line */}
          <radialGradient id={`beacon-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#f87171" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base thin ECG line with repeated heartbeat complexes */}
        <path
          d="
            M 0 50 
            L 120 50 
            Q 135 50 142 45 Q 150 40 158 50
            L 190 50 
            L 202 56 
            L 216 12 
            L 230 78 
            L 242 50 
            L 260 50 
            Q 275 36 295 50 
            L 480 50
            Q 495 50 502 45 Q 510 40 518 50
            L 550 50 
            L 562 56 
            L 576 10 
            L 590 82 
            L 602 50 
            L 620 50 
            Q 635 34 655 50 
            L 880 50
            Q 895 50 902 45 Q 910 40 918 50
            L 950 50 
            L 962 56 
            L 976 14 
            L 990 76 
            L 1002 50 
            L 1020 50 
            Q 1035 36 1055 50 
            L 1280 50
            Q 1295 50 1302 45 Q 1310 40 1318 50
            L 1350 50 
            L 1362 56 
            L 1376 12 
            L 1390 80 
            L 1402 50 
            L 1420 50 
            Q 1435 36 1455 50 
            L 1600 50
          "
          stroke={`url(#ecg-grad-${id})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#ecg-glow-${id})`}
          opacity="0.85"
        />

        {/* Secondary softer line behind it */}
        <path
          d="
            M 0 50 
            L 120 50 
            Q 135 50 142 45 Q 150 40 158 50
            L 190 50 
            L 202 56 
            L 216 12 
            L 230 78 
            L 242 50 
            L 260 50 
            Q 275 36 295 50 
            L 480 50
            Q 495 50 502 45 Q 510 40 518 50
            L 550 50 
            L 562 56 
            L 576 10 
            L 590 82 
            L 602 50 
            L 620 50 
            Q 635 34 655 50 
            L 880 50
            Q 895 50 902 45 Q 910 40 918 50
            L 950 50 
            L 962 56 
            L 976 14 
            L 990 76 
            L 1002 50 
            L 1020 50 
            Q 1035 36 1055 50 
            L 1280 50
            Q 1295 50 1302 45 Q 1310 40 1318 50
            L 1350 50 
            L 1362 56 
            L 1376 12 
            L 1390 80 
            L 1402 50 
            L 1420 50 
            Q 1435 36 1455 50 
            L 1600 50
          "
          stroke="#ef4444"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};
