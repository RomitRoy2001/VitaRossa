// src/components/landing/Mandala.tsx
import React, { useId } from 'react';

export interface MandalaProps {
  /** Size in pixels (width and height) */
  size?: number;
  /** Base opacity of the mandala (0 to 1) */
  opacity?: number;
  /** Duration in seconds for one full 360-degree rotation */
  duration?: number;
  /** Direction of rotation */
  direction?: 'clockwise' | 'counter-clockwise';
  /** Primary stroke color */
  color?: string;
  /** Secondary accent color */
  accentColor?: string;
  /** Whether to add a gentle breathing glow pulse */
  breathe?: boolean;
  /** Optional extra CSS class */
  className?: string;
  /** Inline styles for positioning */
  style?: React.CSSProperties;
}

/**
 * Procedural line-art Mandala SVG with authentic 16-fold radial symmetry,
 * layered lotus petals, starburst crests, and concentric decorative rings.
 * GPU-accelerated continuous rotation with zero layout recalculations.
 */
export const Mandala: React.FC<MandalaProps> = ({
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

  // 16-fold angles for outer petals
  const angles16 = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
  // 32-fold angles for fine accents and rays
  const angles32 = Array.from({ length: 32 }, (_, i) => (i * 360) / 32);
  // 8-fold angles for primary inner lotus
  const angles8 = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      {/* Outer wrapper with gentle breathing opacity */}
      <div
        className={`w-full h-full ${breathe ? 'mandala-breathe-layer' : ''}`}
        style={
          {
            '--mandala-base-opacity': opacity,
            opacity,
          } as React.CSSProperties
        }
      >
        {/* Spinning layer */}
        <svg
          viewBox="-300 -300 600 600"
          className={`w-full h-full overflow-visible ${spinClass}`}
          style={
            {
              '--spin-duration': `${duration}s`,
            } as React.CSSProperties
          }
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            {/* Soft crimson glow filter */}
            <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear gradient for depth */}
            <radialGradient id={`grad-${id}`} cx="0%" cy="0%" r="100%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
              <stop offset="65%" stopColor={color} stopOpacity="0.75" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* ================================================================
              LAYER 1: OUTERMOST ORNAMENTAL STARBURSTS & FINIALS (R: 270 - 295)
              ================================================================ */}
          {angles16.map((deg, idx) => (
            <g key={`outer-finial-${idx}`} transform={`rotate(${deg})`}>
              {/* Outer pointed spearhead petal */}
              <path
                d="M 0 -295 Q 18 -260 0 -230 Q -18 -260 0 -295 Z"
                stroke={`url(#grad-${id})`}
                strokeWidth="1.2"
              />
              {/* Internal central vein line */}
              <line x1="0" y1="-290" x2="0" y2="-235" stroke={accentColor} strokeWidth="0.8" opacity="0.8" />
              {/* Accent teardrop at the tip */}
              <circle cx="0" cy="-298" r="2.2" fill={accentColor} />
              {/* Flanking flourish arcs */}
              <path
                d="M -12 -255 C -25 -270 -35 -260 -28 -245 C -22 -235 -10 -240 0 -235 C 10 -240 22 -235 28 -245 C 35 -260 25 -270 12 -255"
                stroke={color}
                strokeWidth="0.9"
                opacity="0.7"
              />
            </g>
          ))}

          {/* Outermost border concentric rings */}
          <circle cx="0" cy="0" r="285" stroke={color} strokeWidth="0.6" strokeDasharray="3 7" opacity="0.6" />
          <circle cx="0" cy="0" r="275" stroke={color} strokeWidth="0.9" opacity="0.8" />
          <circle cx="0" cy="0" r="270" stroke={accentColor} strokeWidth="0.5" opacity="0.5" />

          {/* ================================================================
              LAYER 2: SECONDARY RADIATING SCALLOPED PETAL ARCHES (R: 200 - 265)
              ================================================================ */}
          {angles32.map((deg, idx) => (
            <g key={`mid-ray-${idx}`} transform={`rotate(${deg})`}>
              {/* Fine radiating ray */}
              <line x1="0" y1="-225" x2="0" y2="-268" stroke={color} strokeWidth="0.6" opacity="0.6" />
              <circle cx="0" cy="-268" r="1.2" fill={accentColor} opacity="0.8" />
            </g>
          ))}

          {angles16.map((deg, idx) => (
            <g key={`large-petal-${idx}`} transform={`rotate(${deg + 11.25})`}>
              {/* Gothic arch / cathedral petal */}
              <path
                d="M 0 -265 C 24 -240 32 -200 0 -175 C -32 -200 -24 -240 0 -265 Z"
                stroke={color}
                strokeWidth="1.2"
              />
              {/* Nested inner gothic arch */}
              <path
                d="M 0 -252 C 16 -232 20 -205 0 -185 C -20 -205 -16 -232 0 -252 Z"
                stroke={accentColor}
                strokeWidth="0.8"
                opacity="0.75"
              />
              {/* Inner geometric diamond lattice */}
              <polygon
                points="0,-235 10,-218 0,-200 -10,-218"
                stroke={color}
                strokeWidth="0.7"
                opacity="0.85"
              />
              <circle cx="0" cy="-218" r="2" fill={accentColor} opacity="0.9" />
            </g>
          ))}

          {/* Concentric boundary rings */}
          <circle cx="0" cy="0" r="225" stroke={color} strokeWidth="0.8" opacity="0.7" />
          <circle cx="0" cy="0" r="218" stroke={accentColor} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.8" />
          <circle cx="0" cy="0" r="175" stroke={color} strokeWidth="1" opacity="0.85" />

          {/* ================================================================
              LAYER 3: INTERMEDIATE FLORET & PALMETTE LAYER (R: 120 - 175)
              ================================================================ */}
          {angles16.map((deg, idx) => (
            <g key={`floret-${idx}`} transform={`rotate(${deg})`}>
              {/* Lotus petal outline */}
              <path
                d="M 0 -175 C 20 -155 24 -130 0 -115 C -24 -130 -20 -155 0 -175 Z"
                stroke={color}
                strokeWidth="1.1"
              />
              {/* Inner concentric scallop */}
              <path
                d="M 0 -162 C 12 -147 14 -130 0 -120 C -14 -130 -12 -147 0 -162 Z"
                stroke={accentColor}
                strokeWidth="0.8"
                opacity="0.7"
              />
              <line x1="0" y1="-170" x2="0" y2="-125" stroke={color} strokeWidth="0.7" opacity="0.6" />
            </g>
          ))}

          {/* Ring of fine pearls/dots */}
          {angles32.map((deg, idx) => (
            <g key={`pearl-${idx}`} transform={`rotate(${deg})`}>
              <circle cx="0" cy="-117" r="1.4" fill={accentColor} opacity="0.75" />
            </g>
          ))}

          <circle cx="0" cy="0" r="115" stroke={color} strokeWidth="1.1" opacity="0.8" />
          <circle cx="0" cy="0" r="110" stroke={accentColor} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="0" cy="0" r="85" stroke={color} strokeWidth="0.8" opacity="0.7" />

          {/* ================================================================
              LAYER 4: INNER CORE LOTUS & SACRED STAR (R: 30 - 85)
              ================================================================ */}
          {angles8.map((deg, idx) => (
            <g key={`inner-core-petal-${idx}`} transform={`rotate(${deg})`}>
              {/* Prominent inner lotus blade */}
              <path
                d="M 0 -85 C 16 -68 18 -45 0 -35 C -18 -45 -16 -68 0 -85 Z"
                stroke={accentColor}
                strokeWidth="1.3"
              />
              {/* Central axis line */}
              <line x1="0" y1="-82" x2="0" y2="-40" stroke={color} strokeWidth="0.9" opacity="0.9" />
              {/* Intermediate diamond tip */}
              <polygon points="0,-88 4,-82 0,-76 -4,-82" fill={color} opacity="0.8" />
            </g>
          ))}

          {angles8.map((deg, idx) => (
            <g key={`inner-core-sub-${idx}`} transform={`rotate(${deg + 22.5})`}>
              <path
                d="M 0 -70 C 10 -55 12 -42 0 -35 C -12 -42 -10 -55 0 -70 Z"
                stroke={color}
                strokeWidth="0.9"
                opacity="0.65"
              />
            </g>
          ))}

          {/* Central sunburst center */}
          <circle cx="0" cy="0" r="35" stroke={color} strokeWidth="1.2" opacity="0.9" />
          <circle cx="0" cy="0" r="28" stroke={accentColor} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.7" />
          <circle cx="0" cy="0" r="18" stroke={color} strokeWidth="1" opacity="0.8" />

          {/* Innermost 8-point geometric star */}
          <polygon
            points="
              0,-18 5,-5 18,0 5,5 
              0,18 -5,5 -18,0 -5,-5
            "
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
