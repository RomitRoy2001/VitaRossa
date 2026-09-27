// src/components/shared/Button.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.35)] hover:shadow-[0_0_24px_rgba(220,38,38,0.55)]',
  secondary:
    'bg-[#111827] hover:bg-[#1f293d] text-slate-200 border border-white/10 hover:border-white/20 hover:text-white',
  danger:
    'bg-rose-600 hover:bg-rose-500 text-white border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
  success:
    'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
  ghost:
    'bg-transparent hover:bg-white/6 text-slate-300 hover:text-white border border-transparent',
  outline:
    'bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-500',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1 rounded-md',
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg font-medium',
  lg: 'h-11 px-6 text-base gap-2.5 rounded-xl font-medium',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { y: -1, transition: { duration: 0.1 } } : undefined}
      whileTap={!isDisabled ? { scale: 0.98, transition: { duration: 0.05 } } : undefined}
      className={[
        'inline-flex items-center justify-center select-none cursor-pointer',
        'transition-colors duration-150',
        'disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      ].join(' ')}
      disabled={isDisabled}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'xs' || size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  );
};
