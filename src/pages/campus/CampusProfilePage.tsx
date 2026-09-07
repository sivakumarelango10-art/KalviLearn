import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Save,
  UserCheck,
} from 'lucide-react'

export const CampusProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Form states
  const [fullName, setFullName] = useState(user?.name || 'Campus Manager')
  const [email] = useState(user?.email || 'manager@kalvium.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [campusName, setCampusName] = useState('Kalvi Bangalore HQ - Tech Hub')
  const [campusCode, setCampusCode] = useState('BLR-01-TECH')
  const [officeLocation, setOfficeLocation] = useState('Block C, Innovation Wing, Floor 3')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const initials = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w: string) => w[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'CM'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ED2A2B]/10 text-[#ED2A2B] uppercase tracking-wider">
              Executive Credentials
            </span>
            <span className="text-xs text-neutral-400 font-medium">• Institutional Scope</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1.5">
            Campus Manager Profile
          </h1>
          <p className="text-sm text-neutral-500 max-w-2xl mt-1">
            Manage your personal executive contact information, campus credentials, and role privileges.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in duration-200 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Profile configuration saved successfully. Live campus session updated.</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs text-center space-y-4">
            <div className="relative mx-auto w-24 h-24 mb-2">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-neutral-900 to-neutral-700 flex items-center justify-center text-white text-3xl font-extrabold shadow-sm">
                {initials}
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white shadow-xs"
                title="Active Verified"
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-neutral-900">{fullName}</h2>
              <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 text-[#ED2A2B] border border-red-200 text-xs font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>Campus Manager</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-mono text-neutral-700">
              <Building2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>{campusCode}</span>
            </div>

            <div className="pt-4 border-t border-neutral-100 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" /> Email
                </span>
                <span className="text-neutral-800 font-mono truncate max-w-[170px]" title={email}>
                  {email}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" /> Phone
                </span>
                <span className="text-neutral-800 font-mono">{phone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" /> Session
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Quick Security Badge */}
          <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#ED2A2B]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Campus Scope Verification</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Your account is registered as a verified Campus Administrator with authoritative oversight across assigned mentors, students, and real-time telemetry feeds.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Personal Info & Account Info Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Personal Information Form */}
          <form
            onSubmit={handleSave}
            className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-neutral-700" />
                Personal Information
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Official contact details displayed to campus mentors and instructors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Campus Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200/80 text-neutral-500 text-xs sm:text-sm cursor-not-allowed font-mono"
                />
                <p className="text-[11px] text-neutral-400 mt-1">Managed by Kalvium institutional SSO.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Campus Assigned Code
                </label>
                <input
                  type="text"
                  value={campusCode}
                  onChange={(e) => setCampusCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Primary Campus / Hub Name
                </label>
                <input
                  type="text"
                  value={campusName}
                  onChange={(e) => setCampusName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Office / Desk Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={officeLocation}
                    onChange={(e) => setOfficeLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CampusProfilePage
