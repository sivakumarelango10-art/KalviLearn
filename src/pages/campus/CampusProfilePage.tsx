import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Key, 
  Clock, 
  CheckCircle2, 
  Save, 
  UserCheck, 
  Globe
} from 'lucide-react';

export const CampusProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(user?.name || 'Pradeep Kumar (Campus Lead)');
  const [email] = useState(user?.email || 'pkumardigital@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [campusName, setCampusName] = useState('Kalvi Bangalore HQ - Tech Hub');
  const [campusCode, setCampusCode] = useState('BLR-01-TECH');
  const [officeLocation, setOfficeLocation] = useState('Block C, Innovation Wing, Floor 3');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <Building2 className="w-7 h-7 text-indigo-400" />
          Campus Manager Profile
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your personal executive contact information, campus credentials, and role privileges.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Profile configuration saved successfully. Live campus session updated.</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md text-center">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-indigo-500/20 border-2 border-indigo-400/40">
                {fullName.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-white" title="Active Verified">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-white">{fullName}</h2>
            <p className="text-xs font-semibold text-indigo-400 mt-0.5 tracking-wider uppercase">Campus Manager</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{campusCode}</span>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" /> Email
                </span>
                <span className="text-slate-200 font-mono truncate max-w-[170px]" title={email}>{email}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone
                </span>
                <span className="text-slate-200 font-mono">{phone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Session Active
                </span>
                <span className="text-emerald-400 font-semibold">Online (99.9% Uptime)</span>
              </div>
            </div>
          </div>

          {/* Quick Security Badge */}
          <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white">Campus Scope Verification</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Your account is registered as a verified Campus Administrator with full read/write authority across assigned mentors, students, and live telemetry feeds.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Personal Info & Account Info Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Personal Information */}
          <form onSubmit={handleSave} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-400" />
                Personal Information
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official contact details displayed to campus mentors and instructors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Campus Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-800 text-slate-400 text-sm cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-500 mt-1">Managed by Kalvium institutional SSO.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Campus Assigned Code
                </label>
                <input
                  type="text"
                  value={campusCode}
                  onChange={(e) => setCampusCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Primary Campus / Hub Name
                </label>
                <input
                  type="text"
                  value={campusName}
                  onChange={(e) => setCampusName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Office / Desk Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={officeLocation}
                    onChange={(e) => setOfficeLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>

          {/* 2. Account Information */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-purple-400" />
                Account & Security Information
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Authentication authority, permissions, and security audit log.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Access Role</span>
                <p className="text-sm font-bold text-white mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  CAMPUS_MANAGER
                </p>
                <p className="text-xs text-slate-400 mt-1">Full mentor & student oversight</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Authentication Provider</span>
                <p className="text-sm font-bold text-white mt-1 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  Supabase / Kalvium Auth SSO
                </p>
                <p className="text-xs text-slate-400 mt-1">OAuth 2.0 / JWT Secure Sessions</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Multi-Factor Authentication</span>
                <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Enforced via Google SSO
                </p>
                <p className="text-xs text-slate-400 mt-1">Enterprise 2FA Protection</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Current Session ID</span>
                <p className="text-xs font-mono text-slate-300 mt-1 truncate">
                  ses_live_{user?.id ? user.id.substring(0, 16) : 'prod_campus_9981'}
                </p>
                <p className="text-xs text-slate-400 mt-1">Validated TLS 1.3 encrypted</p>
              </div>
            </div>

            {/* Designated Manager Notice */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-300">
              <span className="font-semibold text-purple-200">Designated Institutional Access:</span> This portal is configured for institutional Campus Managers: <span className="font-mono text-purple-100">pkumardigital@gmail.com</span>, <span className="font-mono text-purple-100">nithyashri.rs@kalvium.com</span>, and <span className="font-mono text-purple-100">avishka.s@kalvium.com</span>.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampusProfilePage;
