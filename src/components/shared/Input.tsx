// src/components/shared/Input.tsx
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerClassName = '',
  className = '',
  id,
  ...rest
}, ref) => {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-slate-500 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'bf-input',
            leftIcon ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            error ? 'bf-input-error' : '',
            className,
          ].join(' ')}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute right-3 text-slate-500 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">⚠ {error}</p>}
      {hint && !error && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';

// ─── Select Component ────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label, error, options, placeholder,
  containerClassName = '', className = '', id, ...rest
}, ref) => {
  const selectId = id ?? `select-${Math.random().toString(36).slice(2)}`;
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`bf-input bg-[#0b1120] text-slate-200 cursor-pointer ${error ? 'bf-input-error' : ''} ${className}`}
        {...rest}
      >
        {placeholder && <option value="" className="bg-[#0f172a] text-slate-400">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0f172a] text-slate-200">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">⚠ {error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

// ─── Textarea Component ──────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label, error, hint, containerClassName = '', className = '', id, ...rest
}, ref) => {
  const taId = id ?? `ta-${Math.random().toString(36).slice(2)}`;
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={taId} className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={taId}
        rows={3}
        className={`bf-input resize-none ${error ? 'bf-input-error' : ''} ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">⚠ {error}</p>}
      {hint && !error && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
