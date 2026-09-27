// src/components/shared/Skeleton.tsx
import React from 'react';

interface SkeletonProps {
  className?: string;
  rows?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', rows = 1 }) => {
  if (rows > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`skeleton-shimmer rounded-lg bg-white/4 ${i === rows - 1 ? 'w-3/4' : 'w-full'} h-4 ${className}`}
          />
        ))}
      </div>
    );
  }
  return <div className={`skeleton-shimmer rounded-lg bg-white/4 ${className}`} />;
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-[#0f172a] border border-white/8 rounded-xl p-5 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="w-10 h-10 rounded-xl" />
    </div>
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-3 w-2/3" />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 5,
  cols = 5,
}) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="grid gap-3 py-2 border-b border-white/8" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 rounded" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, r) => (
      <div
        key={r}
        className="grid gap-3 py-3 border-b border-white/5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: cols }).map((_, c) => (
          <Skeleton key={c} className="h-4 rounded" />
        ))}
      </div>
    ))}
  </div>
);
