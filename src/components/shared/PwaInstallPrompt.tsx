// src/components/shared/PwaInstallPrompt.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, X, Share, PlusSquare, Check, Sparkles, HeartPulse } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

/**
 * Topbar / Menu standalone button to trigger PWA install
 */
export const PwaInstallButton: React.FC<{
  className?: string;
  variant?: 'header' | 'mobile' | 'hero';
}> = ({ className = '', variant = 'header' }) => {
  const { isInstalled, installApp } = usePWA();
  const [clicked, setClicked] = useState(false);

  // If already installed in standalone mode, show subtle indicator
  if (isInstalled) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono ${className}`}>
        <Check size={13} />
        <span>App Installed</span>
      </div>
    );
  }

  const handleClick = async () => {
    setClicked(true);
    await installApp();
    setTimeout(() => setClicked(false), 2000);
  };

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`w-full py-3 px-4 text-xs font-semibold rounded-xl bg-gradient-to-r from-red-600/20 via-rose-600/20 to-red-700/20 hover:from-red-600/30 hover:to-red-700/30 text-red-300 border border-red-500/30 flex items-center justify-center gap-2.5 transition-all shadow-[0_0_16px_rgba(220,38,38,0.2)] ${className}`}
      >
        <Smartphone size={15} className="text-red-400 animate-pulse" />
        <span>Download Mobile App (PWA)</span>
      </button>
    );
  }

  if (variant === 'hero') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider text-red-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_28px_rgba(239,68,68,0.45)] hover:-translate-y-0.5 cursor-pointer ${className}`}
      >
        <Download size={15} className="text-red-400" />
        <span>Install App</span>
      </button>
    );
  }

  // Header default button
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative group/pwa px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-red-500/15 to-rose-600/15 hover:from-red-500/25 hover:to-rose-600/25 border border-red-500/35 hover:border-red-500/60 text-red-200 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:shadow-[0_0_24px_rgba(220,38,38,0.35)] ${className}`}
      title="Download VitaRossa as an app on your phone or desktop"
    >
      <div className="relative">
        <Download size={14} className="text-red-400 group-hover/pwa:translate-y-0.5 transition-transform" />
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </div>
      <span className="font-mono tracking-wide">{clicked ? 'Opening...' : 'Install App'}</span>
    </motion.button>
  );
};

/**
 * Global Floating Mobile Install Banner & iOS Instructions Modal
 */
export const PwaInstallPrompt: React.FC = () => {
  const { isInstalled, showIOSPrompt, installApp, closeIOSPrompt } = usePWA();
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Remember dismissal for session
    const isDismissed = sessionStorage.getItem('vitarossa_pwa_dismissed') === 'true';
    if (isDismissed) setDismissed(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('vitarossa_pwa_dismissed', 'true');
  };

  if (!mounted || isInstalled) return null;

  return (
    <>
      {/* ─── Floating Install Banner (Mobile & Desktop) ─────────────────────── */}
      <AnimatePresence>
        {!dismissed && (
          <motion.aside
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            aria-label="Install VitaRossa Application"
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-[#0b1120]/95 backdrop-blur-2xl border border-red-500/30 shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(220,38,38,0.25)] text-slate-100"
          >
            {/* Ambient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 via-rose-600 to-red-800 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_rgba(220,38,38,0.6)] mt-0.5">
                  <HeartPulse size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white tracking-tight">Download VitaRossa App</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">PWA</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Install on your mobile device or desktop for offline access, 1-tap dispatch, and real-time emergency alerts.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss installation prompt"
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/8 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3.5 py-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Not Now
              </button>
              <button
                type="button"
                onClick={() => installApp()}
                className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all shadow-[0_0_18px_rgba(220,38,38,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <Download size={13} className="fill-white" />
                <span>Install App</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ─── iOS Safari Add-To-Home-Screen Modal ────────────────────────────── */}
      <AnimatePresence>
        {showIOSPrompt && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md rounded-3xl bg-[#0c1322] border border-red-500/30 p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(220,38,38,0.25)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />

              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-[0_0_16px_rgba(220,38,38,0.5)]">
                    <HeartPulse size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Install on iPhone / iPad</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Safari Quick Install Guide</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeIOSPrompt}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/6">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center flex-shrink-0 text-blue-400 mt-0.5">
                    <Share size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Step 1</span>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Tap the <strong className="text-white">Share</strong> button on Safari's bottom toolbar (or top right on iPad).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/6">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 text-emerald-400 mt-0.5">
                    <PlusSquare size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">Step 2</span>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Scroll down the share sheet and tap <strong className="text-white">&ldquo;Add to Home Screen&rdquo;</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/6">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center flex-shrink-0 text-red-400 mt-0.5">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-red-300 uppercase tracking-wider font-bold">Step 3</span>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Tap <strong className="text-white">&ldquo;Add&rdquo;</strong> in the top right corner. VitaRossa is now ready on your home screen!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/8 flex justify-end">
                <button
                  type="button"
                  onClick={closeIOSPrompt}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold shadow-[0_0_18px_rgba(220,38,38,0.4)] cursor-pointer"
                >
                  Got It, Thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
