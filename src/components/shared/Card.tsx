// src/components/shared/Card.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glass?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  glass = false,
  hover = false,
  padding = 'md',
  onClick,
  id,
}) => {
  const padMap = {
    none: '',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <motion.div
      id={id}
      onClick={onClick}
      whileHover={hover ? { y: -2, transition: { duration: 0.15 } } : undefined}
      className={[
        glass ? 'bf-glass' : 'bf-card',
        glow ? 'glow-crimson' : '',
        hover ? 'bf-card-interactive cursor-pointer' : '',
        padMap[padding],
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  );
};

export const GlassCard: React.FC<CardProps> = (props) => (
  <Card {...props} glass />
);

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  icon,
  className = '',
}) => (
  <div className={`flex items-center justify-between gap-4 mb-4 ${className}`}>
    <div className="flex items-center gap-3 min-w-0">
      {icon && (
        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-100 tracking-tight truncate">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>}
      </div>
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

// ─── StatCard for Command Center KPIs ────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  subtext?: string;
  urgent?: boolean;
  accentColor?: string;
  onClick?: () => void;
  id?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  subtext,
  urgent = false,
  accentColor = 'text-red-400',
  onClick,
  id,
}) => {
  return (
    <motion.div
      id={id}
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={`relative bg-[#0f172a] border rounded-xl p-5 overflow-hidden transition-all duration-200 group ${
        onClick ? 'cursor-pointer' : ''
      } ${
        urgent
          ? 'border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.18)]'
          : 'border-white/8 hover:border-white/16 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
      }`}
    >
      {urgent && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-scarlet to-red-600" />
      )}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className={`text-3xl font-black tracking-tight tabular-nums ${urgent ? 'text-red-400' : 'text-slate-50'}`}>
              {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
            </span>
          </div>

          {(trend || subtext) && (
            <div className="flex items-center gap-1.5 mt-2.5 text-xs">
              {trend && trendValue && (
                <span
                  className={`inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded ${
                    trend === 'up'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : trend === 'down'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {trend === 'up' && <TrendingUp size={11} />}
                  {trend === 'down' && <TrendingDown size={11} />}
                  {trend === 'neutral' && <Minus size={11} />}
                  {trendValue}
                </span>
              )}
              {subtext && <span className="text-slate-400">{subtext}</span>}
            </div>
          )}
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
            urgent
              ? 'bg-red-500/20 border border-red-500/30 text-red-400'
              : 'bg-white/5 border border-white/8 text-slate-300'
          }`}
        >
          <span className={accentColor}>{icon}</span>
        </div>
      </div>
    </motion.div>
  );
};
