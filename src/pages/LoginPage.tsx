// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, AlertCircle, ChevronDown, HeartPulse, Activity, ArrowLeft } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { loginThunk, clearError } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import { getRoleCredentials } from '../data/mock/users';
import { env } from '../config/environment';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});
type LoginForm = z.infer<typeof loginSchema>;

// Quick demo role selector
const DemoCredentials: React.FC<{ onSelect: (email: string, password: string) => void }> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const credentials = getRoleCredentials();

  return (
    <div className="mt-6 border border-white/8 rounded-xl overflow-hidden bg-[#0b1120]/60">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
      >
        <span className="font-mono flex items-center gap-1.5 text-slate-300">
          <Activity size={12} className="text-red-400" /> Demo Credentials (Quick Role Switcher)
        </span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/8"
          >
            <div className="p-2 space-y-1 bg-[#070b14]/50">
              {credentials.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => {
                    onSelect(cred.email, cred.password);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs hover:bg-white/5 transition-colors group text-left"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-slate-200 font-medium truncate">{cred.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{cred.email}</p>
                  </div>
                  <span className="text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/25 px-2 py-0.5 rounded-full flex-shrink-0">
                    {cred.role.replace(/_/g, ' ')}
                  </span>
                </button>
              ))}
              <div className="pt-2 border-t border-white/5 text-center">
                <p className="text-[10px] text-slate-500 font-mono">
                  All accounts password: <span className="text-slate-300">Admin@123</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: LoginForm) => {
    await dispatch(loginThunk(data));
  };

  const handleDemoSelect = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex overflow-hidden relative bloodflow-grid">
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-red-600/4 rounded-full blur-[180px] pointer-events-none" />

      {/* Left panel — Hero & Operational Stats */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-16 relative z-10"
      >
        {/* Logo Branding */}
        <Link
          to="/landing"
          className="flex items-center gap-3 cursor-pointer group w-fit no-underline"
          title="Return to Landing Page"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-105 transition-transform">
            <HeartPulse size={22} className="text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-white tracking-tight group-hover:text-red-400 transition-colors">BloodFlow</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                OPS
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono tracking-wider">COMMAND CENTER</p>
          </div>
        </Link>

        {/* Hero Title & Description */}
        <div className="space-y-6 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl xl:text-5xl font-black text-slate-100 leading-tight tracking-tight">
              Rapid Precision.
              <br />
              <span className="text-gradient-crimson">Lifesaving Logistics.</span>
            </h1>
            <p className="text-slate-400 text-base mt-4 leading-relaxed">
              Enterprise blood bank operations management system connecting donors, testing laboratories, storage facilities, and hospitals in real-time.
            </p>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {[
              'Real-Time Inventory',
              'Emergency Dispatch',
              'Blood Camps Pipeline',
              'Quality Testing Lab',
            ].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1 bg-[#0f172a] border border-white/10 rounded-full text-xs text-slate-300 font-medium flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {pill}
              </span>
            ))}
          </motion.div>

          {/* Real-time KPI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-3 gap-3 pt-2"
          >
            {[
              { value: '1,284', label: 'Active Donors' },
              { value: '270', label: 'Available Units' },
              { value: '100%', label: 'Tested & Verified' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0f172a]/70 border border-white/8 rounded-xl p-3.5">
                <p className="text-xl font-black text-slate-100 font-mono tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-500 font-mono">
          BloodFlow Operations v1.0.0 · Hospital Network Protocol
        </p>
      </motion.div>

      {/* Right panel — Form Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10"
      >
        <div className="w-full max-w-md">
          {/* Back to landing page button */}
          <Link
            to="/landing"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer group no-underline"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform text-red-400" />
            <span>← Back to Public Website</span>
          </Link>

          {/* Mobile Header Logo */}
          <Link
            to="/landing"
            className="flex items-center gap-3 mb-6 lg:hidden cursor-pointer no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <HeartPulse size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">BloodFlow</p>
              <p className="text-xs text-slate-500 font-mono">COMMAND CENTER</p>
            </div>
          </Link>

          {/* Form Card */}
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/12 rounded-2xl p-7 sm:p-8 shadow-2xl shadow-black/80 relative overflow-hidden">
            {/* Top red laser line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-scarlet to-red-600" />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Access Terminal</h2>
              <p className="text-xs text-slate-400 mt-1">Authenticate with your BloodFlow credential</p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 flex items-center gap-2.5 px-3.5 py-2.5 bg-rose-950/30 border border-rose-800/40 rounded-xl text-xs text-rose-300"
                >
                  <AlertCircle size={15} className="flex-shrink-0 text-rose-400" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Operator Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="login-email"
                  autoComplete="email"
                  placeholder="superadmin@bloodflow.health"
                  className={`bf-input ${errors.email ? 'bf-input-error' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-0.5">⚠ {errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    className={`bf-input pr-10 ${errors.password ? 'bf-input-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-400 mt-0.5">⚠ {errors.password.message}</p>
                )}
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  id="login-remember"
                  className="w-4 h-4 rounded border-white/20 bg-[#070b14] text-red-600 focus:ring-red-500/20"
                />
                <span className="text-xs text-slate-400 hover:text-slate-300 transition-colors">
                  Keep terminal session authorized
                </span>
              </label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { y: -1 } : undefined}
                whileTap={!isLoading ? { scale: 0.99 } : undefined}
                id="login-submit"
                className="w-full h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all duration-150 shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:shadow-[0_0_28px_rgba(220,38,38,0.55)] flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Authenticating Node…
                  </>
                ) : (
                  'Authorize Terminal Session'
                )}
              </motion.button>
            </form>

            {/* Quick Demo Credentials Panel */}
            {env.enableDebug && (
              <DemoCredentials onSelect={handleDemoSelect} />
            )}
          </div>

          <p className="text-center text-[11px] text-slate-600 mt-5 font-mono">
            Environment: {env.appEnv} · Build: {env.appVersion}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
