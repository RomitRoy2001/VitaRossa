// src/pages/SettingsPage.tsx
import React, { useState } from 'react';
import {
  Shield, Bell, Save, Sliders,
} from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { useToast } from '../hooks/useToast';

export const SettingsPage: React.FC = () => {
  const toast = useToast();

  // Settings state
  const [criticalThreshold, setCriticalThreshold] = useState('15');
  const [lowThreshold, setLowThreshold] = useState('35');
  const [expiryWarningDays, setExpiryWarningDays] = useState('7');
  const [enableSmsAlerts, setEnableSmsAlerts] = useState(true);
  const [enableEmergencyAutoRoute, setEnableEmergencyAutoRoute] = useState(true);
  const [auditLogRetention, setAuditLogRetention] = useState('365');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configuration Saved', 'System operational thresholds successfully synced across nodes.');
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl">
      <PageHeader
        title="Command Center Parameters & Thresholds"
        subtitle="Global Inventory Reserve Ceilings, Emergency Auto-Routing, and Regulatory Archival Rules"
        breadcrumb={['COMMAND', 'SETTINGS']}
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Inventory Safety Thresholds */}
        <Card padding="none">
          <div className="p-4 border-b border-white/8 bg-[#0b1120]/40">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Sliders size={15} className="text-red-400" />
              Blood Reserve Safety Ceilings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Define minimum unit quantities triggering automated command center alerts</p>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Critical Minimum Alert Level (Units)"
                type="number"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(e.target.value)}
                hint="Triggers RED dashboard alert and mobile push"
              />
              <Input
                label="Low Reserve Warning Level (Units)"
                type="number"
                value={lowThreshold}
                onChange={(e) => setLowThreshold(e.target.value)}
                hint="Triggers AMBER advisory"
              />
              <Input
                label="Expiry Pre-Alert Window (Days)"
                type="number"
                value={expiryWarningDays}
                onChange={(e) => setExpiryWarningDays(e.target.value)}
                hint="Days before shelf expiration"
              />
            </div>
          </div>
        </Card>

        {/* Real-time Telemetry & Dispatch Rules */}
        <Card padding="none">
          <div className="p-4 border-b border-white/8 bg-[#0b1120]/40">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Bell size={15} className="text-red-400" />
              Emergency Dispatch & Auto-Escalation
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated protocols for hospital trauma unit requisitions</p>
          </div>

          <div className="p-5 space-y-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#070b14] border border-white/6 cursor-pointer hover:border-white/12 transition-colors">
              <div>
                <p className="font-semibold text-slate-200">Trauma Corridor Auto-Routing</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Automatically reserve compatible unallocated O- / O+ units upon verification of emergency triage requests
                </p>
              </div>
              <input
                type="checkbox"
                checked={enableEmergencyAutoRoute}
                onChange={(e) => setEnableEmergencyAutoRoute(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-red-600 focus:ring-red-500/20"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#070b14] border border-white/6 cursor-pointer hover:border-white/12 transition-colors">
              <div>
                <p className="font-semibold text-slate-200">SMS / Telemetry Dispatch Notifications</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Send real-time GPS tracking links directly to on-call hospital blood transfusion officers
                </p>
              </div>
              <input
                type="checkbox"
                checked={enableSmsAlerts}
                onChange={(e) => setEnableSmsAlerts(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-red-600 focus:ring-red-500/20"
              />
            </label>
          </div>
        </Card>

        {/* Regulatory Compliance & Audit Retention */}
        <Card padding="none">
          <div className="p-4 border-b border-white/8 bg-[#0b1120]/40">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Shield size={15} className="text-red-400" />
              Statutory Compliance & Archival Policy
            </h3>
          </div>
          <div className="p-5">
            <Input
              label="Audit Trail Cryptographic Retention (Days)"
              type="number"
              value={auditLogRetention}
              onChange={(e) => setAuditLogRetention(e.target.value)}
              hint="Statutory mandate requires minimum 365 days of immutable custody records"
            />
          </div>
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md" leftIcon={<Save size={16} />}>
            Apply & Broadcast Parameters
          </Button>
        </div>
      </form>
    </div>
  );
};
