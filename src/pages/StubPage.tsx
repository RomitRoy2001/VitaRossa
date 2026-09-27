// src/pages/StubPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md p-8 bg-[#0f172a] border border-white/8 rounded-2xl shadow-2xl"
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-950/20 border border-red-800/30 flex items-center justify-center text-red-400">
          <AlertTriangle size={28} />
        </div>
        <p className="text-7xl font-black text-gradient-crimson font-mono tracking-tighter mb-2">
          404
        </p>
        <h1 className="text-lg font-bold text-slate-100 mb-1 tracking-tight">
          Sector Unreachable
        </h1>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The operational telemetry node or registry record you requested does not exist or has been relocated.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeft size={14} />}
            onClick={() => navigate(-1)}
          >
            Previous Node
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Home size={14} />}
            onClick={() => navigate('/dashboard')}
          >
            Command Center
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
