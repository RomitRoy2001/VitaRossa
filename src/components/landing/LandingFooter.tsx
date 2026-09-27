// src/components/landing/LandingFooter.tsx
import React from 'react';
import { HeartPulse, ArrowUp, ShieldCheck } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const platformLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Circulatory Workflow', href: '#journey' },
    { label: 'Blood Inventory', href: '#inventory' },
    { label: 'Donation Camps', href: '#camps' },
    { label: 'About BloodFlow', href: '#about' },
  ];

  const supportLinks = [
    { label: 'Emergency Contact', href: '#contact' },
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Compliance & Safety', href: '#safety' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="relative border-t border-white/8 bg-[#050811]/90 backdrop-blur-xl pt-16 pb-12 text-slate-400 text-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/8">
          {/* Left Column: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-[0_0_16px_rgba(220,38,38,0.5)]">
                <HeartPulse size={20} className="text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">BloodFlow</span>
            </div>

            <p className="text-slate-300 font-medium text-base">
              Connecting Life. Saving Lives.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A smarter, faster, and more connected blood donation ecosystem bridging verified donors, certified medical laboratories, and emergency triage facilities nationwide.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck size={14} />
              <span>WHO & National Blood Transfusion Council Aligned</span>
            </div>
          </div>

          {/* Center Column: Platform Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-red-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Support & Legal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-red-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-white/6 text-xs text-slate-400 font-mono space-y-1">
              <p>Hotline: 1800-BLOOD-FLOW</p>
              <p>Dispatch: ops@bloodflow.health</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© 2026 BloodFlow. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
