import React from 'react'
import { ShieldAlert, ArrowLeft, UserX, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { BrandLogo } from '@/components/common/BrandLogo'
import { Button } from '@/components/ui/Button'

interface AccessDeniedCardProps {
  deniedEmail?: string | null
  reason?: 'ACCOUNT_NOT_REGISTERED' | 'ACCOUNT_INACTIVE' | 'ERROR' | null
  onTryAgain: () => void
}

export const AccessDeniedCard: React.FC<AccessDeniedCardProps> = ({
  deniedEmail,
  reason,
  onTryAgain,
}) => {
  const isInactive = reason === 'ACCOUNT_INACTIVE'

  return (
    <Card className="w-full max-w-[440px] mx-auto p-8 sm:p-10 bg-white border border-red-200 shadow-card flex flex-col items-center space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
      {/* Brand Header */}
      <BrandLogo size="md" orientation="vertical" />

      {/* Access Denied Badge & Icon */}
      <div className="space-y-3 pt-2">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#ED2A2B] border border-red-200 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{isInactive ? 'Block Access' : 'Access Denied'}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
          {isInactive ? 'Account Inactive' : 'Account Not Registered'}
        </h2>
      </div>

      {/* Explanation Box */}
      <div className="w-full bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-left space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
          <UserX className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="truncate">
            {deniedEmail || (isInactive ? 'Suspended account' : 'Unregistered account')}
          </span>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">
          {isInactive
            ? 'This account was found in the Kalvi database, but its operational status is currently marked as INACTIVE. Access to the dashboard is blocked.'
            : 'This Google account is authenticated, but it was not found in the official Kalvi Learn mentor or scholar database.'}
        </p>
      </div>

      <div className="text-[11px] text-neutral-500 leading-relaxed">
        {isInactive ? (
          <span>Please contact your Campus Administrator or Academic Director to reactivate this account.</span>
        ) : (
          <span>
            Only authorized mentors and registered scholars with active enrollment (e.g.{' '}
            <span className="font-mono text-neutral-700 font-semibold">@kalvium.community</span>) are permitted to access the platform.
          </span>
        )}
      </div>

      {/* Action Button */}
      <div className="w-full pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center bg-neutral-900 hover:bg-neutral-800 text-white"
          onClick={onTryAgain}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Sign In With Different Account</span>
        </Button>
      </div>
    </Card>
  )
}
