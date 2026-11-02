# Super Admin Functionality Repair — Audit Inventory

## Scope
This audit is limited to the Super Admin portal and the minimum shared routing/API/service code required. No production data was accessed or changed during this source inspection. No deploy was triggered.

## Confirmed repository surfaces
- Frontend routes: `src/app/routes/index.tsx`
  - `/super-admin/dashboard`
  - `/super-admin/campuses`
  - `/super-admin/managers`
  - `/super-admin/mentors`
  - `/super-admin/students`
  - `/super-admin/roles`
  - `/super-admin/audit`
  - The route group is nested under `SuperAdminProtectedRoute`.
- Dashboard page: `src/pages/super-admin/SuperAdminDashboardPage.tsx`
- Frontend API client: `src/lib/superAdminService.ts`
- Database model: `prisma/schema.prisma`
  - User identity is `User` mapped to `users`.
  - Dedicated `Student`, `Mentor`, `Campus`, and `MentorStudent` models/relationships exist.
- API entry shims: `api/super-admin.js` and `api/_super-admin-entry.mjs` are tiny entry files; their shared implementation must be traced through the referenced worker before editing.

## Confirmed issues / items needing implementation
1. Dashboard “Add campus” currently links to `/super-admin/campuses`; it does not itself open the Add Campus modal/workflow.
2. Dashboard role distribution currently supplies a fallback of `1` for Super Admin when the role-distribution response is missing that value. This can show a fabricated count and should be removed; missing telemetry should be represented as loading/error, not assumed data.
3. Dashboard has metric cards and refresh UI, but the dashboard API implementation and actual database filters still need verification before asserting metric correctness.
4. Service functions exist for campus, manager, mentor, student, role, and audit actions. Their API handlers, auth enforcement, data relationships, permission/RLS behavior, and response contracts still need end-to-end inspection.
5. The reported mentor error `permission denied for table users` is not confirmed fixed. It requires tracing the API's DB access route and its authorization model; RLS must not be disabled or bypassed from client code.

## Implementation and verification status
- Repository source inspection: partial, confirmed from the files listed above.
- Code repairs: not yet implemented in this audit-only commit.
- Build/tests: not run.
- Production data: unchanged.
- Deployment: not triggered.

This document is an audit checkpoint, not a claim that the acceptance criteria have been met. Keep the pull request in draft until implementation and required tests are complete.
