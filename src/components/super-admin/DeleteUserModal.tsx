import React, { useState, useEffect } from 'react'
import { X, AlertTriangle, Trash2, Building2, Mail, ShieldAlert, Loader2 } from 'lucide-react'
import type { AdminUserRole } from '@/lib/superAdminService'

export interface DeleteUserValidationResult {
  valid: boolean
  error: string | null
}

/**
 * Pure validation helper for the Delete User confirmation modal.
 */
export function validateDeleteUserConfirmation(
  targetEmail: string,
  confirmEmail: string,
  reason: string
): DeleteUserValidationResult {
  const trimmedReason = reason.trim()
  if (trimmedReason.length < 3) {
    return {
      valid: false,
      error: 'Please provide a deletion reason (at least 3 characters).',
    }
  }

  const normalizedTarget = targetEmail.trim().toLowerCase()
  const normalizedConfirm = confirmEmail.trim().toLowerCase()
  if (!normalizedConfirm || normalizedConfirm !== normalizedTarget) {
    return {
      valid: false,
      error: `Please type "${targetEmail}" exactly to confirm deletion.`,
    }
  }

  return { valid: true, error: null }
}

interface DeleteUserModalProps {
  user: AdminUserRole | null
  submitting: boolean
  error: string | null
  onClose: () => void
  onConfirm: (reason: string, confirmEmail: string) => Promise<void> | void
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  submitting,
  error,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    setReason('')
    setConfirmEmail('')
    setLocalError(null)
  }, [user?.id])

  if (!user) return null

  const validation = validateDeleteUserConfirmation(user.email, confirmEmail, reason)
  const displayError = error || localError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validation.valid) {
      setLocalError(validation.error)
      return
    }
    setLocalError(null)
    await onConfirm(reason.trim(), confirmEmail.trim())
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-user-modal-title"
    >
      <div className="max-w-lg w-full bg-[#080808] border border-red-900/60 rounded-2xl p-6 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/70 text-[#FF6266] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="delete-user-modal-title" className="text-lg font-bold text-white">
              Delete User Account
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Safe soft deletion: deactivates login access and revokes active sessions while preserving historical academic and audit records.
            </p>
          </div>
        </div>

        {/* Target User Summary */}
        <div className="bg-black/70 border border-white/10 rounded-xl p-3.5 space-y-2 text-xs mb-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-400">User Name</span>
            <span className="font-semibold text-white">{user.name || 'Unnamed User'}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-400 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Email
            </span>
            <span className="font-mono text-neutral-200">{user.email}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Current Role
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#1F0B0B] text-[#FF6266] border border-[#681717]">
              {user.role}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              Campus
            </span>
            <span className="text-neutral-200">
              {user.campus ? `${user.campus.name} (${user.campus.code})` : 'None assigned'}
            </span>
          </div>
        </div>

        {displayError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200">
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="delete-user-reason"
              className="block text-xs font-medium text-neutral-300 mb-1.5"
            >
              Deletion Reason *
            </label>
            <textarea
              id="delete-user-reason"
              rows={2}
              required
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                if (localError) setLocalError(null)
              }}
              placeholder="e.g. Graduated / duplicate account / requested offboarding"
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-hidden focus:border-[#FF6266]"
            />
          </div>

          <div>
            <label
              htmlFor="delete-user-confirm-email"
              className="block text-xs font-medium text-neutral-300 mb-1.5"
            >
              Type <span className="font-mono text-[#FF6266]">{user.email}</span> to confirm *
            </label>
            <input
              id="delete-user-confirm-email"
              type="email"
              required
              value={confirmEmail}
              onChange={(e) => {
                setConfirmEmail(e.target.value)
                if (localError) setLocalError(null)
              }}
              placeholder={user.email}
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white font-mono placeholder-neutral-600 focus:outline-hidden focus:border-[#FF6266]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !validation.valid}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#ED2A2B] hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Confirm Delete</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

