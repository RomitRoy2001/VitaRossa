// src/components/landing/MandalaBackground.tsx
import React, { useEffect, useState } from 'react';
import { Mandala } from './Mandala';

export const MandalaBackground: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subtle mouse parallax tracking (damped to 8px max offset)
  useEffect(() => {
    if (isReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * 12; // Max 12px shift
      targetY = ny * 12;
    };

    const loop = () => {
      // Smooth linear interpolation (lerp)
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setOffset({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [isReducedMotion]);

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
      {/* 1. TOP-RIGHT HERO MANDALA (Dominant, signature anchor like reference image) */}
      <div className="absolute -top-36 -right-36 lg:-top-48 lg:-right-48 transition-opacity duration-1000">
        <Mandala
          size={780}
          opacity={0.24}
          duration={50}
          direction="clockwise"
          color="#ef4444"
          accentColor="#fca5a5"
        />
      </div>

      {/* 2. LEFT-MIDDLE MANDALA (Balances hero and stats transitions) */}
      <div className="absolute top-[28%] -left-48 lg:-left-56 transition-opacity duration-1000">
        <Mandala
          size={640}
          opacity={0.2}
          duration={65}
          direction="counter-clockwise"
          color="#dc2626"
          accentColor="#f87171"
        />
      </div>

      {/* 3. CENTER-BACKGROUND MANDALA (Deep hero backdrop) */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 hidden md:block">
        <Mandala
          size={820}
          opacity={0.09}
          duration={85}
          direction="clockwise"
          color="#b91c1c"
          accentColor="#ef4444"
          breathe={false}
        />
      </div>

      {/* 4. BEHIND STATISTICS SECTION MANDALA */}
      <div className="absolute top-[48%] left-[15%] hidden lg:block">
        <Mandala
          size={520}
          opacity={0.16}
          duration={42}
          direction="clockwise"
          color="#ef4444"
          accentColor="#f87171"
        />
      </div>

      {/* 5. BEHIND TESTIMONIAL MANDALA (Directly matching the centered mandala behind quote card in reference) */}
      <div className="absolute top-[72%] left-1/2 -translate-x-1/2">
        <Mandala
          size={700}
          opacity={0.22}
          duration={55}
          direction="counter-clockwise"
          color="#ef4444"
          accentColor="#fca5a5"
        />
      </div>

      {/* 6. BOTTOM-LEFT CORNER MANDALA */}
      <div className="absolute -bottom-40 -left-40 hidden sm:block">
        <Mandala
          size={540}
          opacity={0.18}
          duration={70}
          direction="clockwise"
          color="#dc2626"
          accentColor="#f87171"
        />
      </div>

      {/* 7. BOTTOM-RIGHT CORNER MANDALA (Framing final CTA and footer) */}
      <div className="absolute -bottom-48 -right-36">
        <Mandala
          size={680}
          opacity={0.22}
          duration={48}
          direction="counter-clockwise"
          color="#ef4444"
          accentColor="#fca5a5"
        />
      </div>

      {/* Subtle ambient deep vignette and radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(185,28,28,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(220,38,38,0.09),transparent_60%)] pointer-events-none" />
    </div>
  );
};
