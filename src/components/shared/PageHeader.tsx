// src/components/shared/PageHeader.tsx
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: string[];
  statusChip?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumb,
  statusChip,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2">
    <div>
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="flex items-center gap-1.5 mb-1.5">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              <span className="text-xs text-slate-500 font-medium">{crumb}</span>
              {i < breadcrumb.length - 1 && (
                <span className="text-xs text-slate-700">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black text-slate-50 tracking-tight">{title}</h1>
        {statusChip}
      </div>
      {subtitle && <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap flex-shrink-0">{actions}</div>}
  </div>
);
