# KALVILEARN — CAMPUS MANAGER PORTAL
## REALTIME DATA SYNCHRONIZATION, ACCURATE ANALYTICS & COMPLETE AUDIT REPORT

**Date:** October 28, 2026  
**Auditor:** Antigravity Autonomous Systems & Senior Full-Stack Engineering Team  
**Repository:** `E:\KalviCode`  
**Test Suite Status:** 14/14 Passed (`npm run test:campus-manager`), 29/29 Passed (`npm test`), 10/10 Passed (`npm run test:mentor-solved`), 19/19 Passed (`npm run test:mentor-auth`), 12/12 Passed (`npm run test:problem-stats`), 18/18 Passed (`npm run test:editor-restrictions`)  
**Production Build Status:** Exited 0 (Clean TypeScript, Vite production bundle, esbuild API bundles, bundle security scan passed with 0 leaks, runtime startup test passed)

---

## SECTION A: EXECUTIVE SUMMARY & SYSTEM VERIFICATION STATUS

The Campus Manager Portal has undergone a complete architectural review, data flow reconciliation, and real-time synchronization overhaul. Prior to this intervention, the Campus Manager Portal suffered from four critical operational discrepancies:

1. **Divergent Telemetry Calculations:** The Overview Dashboard relied on an un-deduplicated query/RPC that counted raw rows in `UserProgress`, inflating the solved challenge count and distributed XP when students solved challenges across multiple languages (e.g., Python, C++, Java). Meanwhile, the Student Directory deduplicated solves per student, resulting in an immediate numerical mismatch between overview metrics cards and student roster tables.
2. **Fabricated 100% Pass Rate on Zero Submissions:** In `src/lib/campusManagerService.ts` (former line 502), cohorts with zero evaluated submissions defaulted to `(totalStudents > 0 ? 100 : 0)`. Any mentor assigned students who had not yet submitted answers was erroneously awarded a 100% cohort pass rate.
3. **Missing Local / Cross-Tab Realtime Invalidation:** While remote Supabase WebSocket subscriptions existed, local mutations (such as practice arena submissions or mentor reassignments occurring in other browser tabs) were not propagating to the Campus Manager Portal without a hard page reload. Furthermore, the Leaderboard pages (`CampusMentorLeaderboardPage.tsx`, `CampusStudentLeaderboardPage.tsx`) and `CampusProfilePage.tsx` did not subscribe to real-time events at all.
4. **Redundant Concurrent Table Scans:** Concurrently mounted dashboard components repeatedly triggered parallel, uncollapsible scans of the full `Submission` and `UserProgress` tables without in-memory caching or in-flight request deduplication.

### Summary of Corrective Actions
- **Scope Discipline:** All modifications were strictly confined to the Campus Manager domain (`src/lib/campusManagerService.ts`, `src/pages/campus/*`, `scripts/test-campus-manager-audit.ts`, `package.json`, and this documentation). No Student Portal or Mentor Portal files were modified.
- **Canonical Practice Slug Deduplication:** Integrated `mapToCanonicalPracticeSlug` from `src/lib/problemStatsService.ts` to ensure multi-language solves on the same problem count as exactly 1 solve.
- **Authoritative XP Math:** Solved problems award an authoritative 50 XP upon first solve; repeat solves in alternative languages do not multiply XP awards. Overview metrics derive directly from deduplicated student telemetry, creating 100% mathematical parity.
- **Zero-Denominator Defense:** Cohorts and campuses with zero evaluated submissions strictly compute a `0.0%` pass rate.
- **Unified Event Bus & Cache Invalidation:** Built in-memory TTL caching (5s) with in-flight request collapsing, session logout/account-switch registration via `registerCacheClearer`, and comprehensive event subscription across Supabase `postgres_changes`, `kalvi_progress_updated`, `kalvi_campus_updated`, and `storage` events.

---

## SECTION B: CAMPUS DATA SCOPING & MULTI-TENANCY ARCHITECTURE ANALYSIS

### Database Schema Findings
An exhaustive inspection of `prisma/schema.prisma` and Supabase SQL migrations revealed that the current production database does not define a separate `campuses` table, nor do `User`, `Student`, `Mentor`, or `MentorStudent` entities contain a foreign key column named `campus_id`.

```prisma
// Current Prisma Schema (Technology Campus Scope)
model User {
  id         String   @id @default(uuid())
  email      String   @unique
  role       Role     @default(STUDENT)
  name       String?
  status     Status   @default(ACTIVE)
  // ... no campus_id foreign key
}

model Student {
  id           String   @id @default(uuid())
  userId       String   @unique @map("user_id")
  studentCode  String   @unique @map("student_code")
  // ... no campus_id foreign key
}
```

### Resolution & Environment Scoping
All enrolled students and appointed faculty currently belong to the single canonical technology campus:
- Display Campus: `import.meta.env.VITE_CAMPUS_NAME || 'Kalvium Technology Campus'`.
- All queries scope to enrolled active student and mentor entities.
- When an enterprise multi-campus schema migration is deployed in the future (adding `campus_id UUID REFERENCES campuses(id)`), the service layer functions in `campusManagerService.ts` can immediately append `.eq('campus_id', campusId)` without modifying UI component signatures.

---

## SECTION C: AUTHORITATIVE METRIC PARITY AUDIT

### Mathematical Parity Equation
Prior to this fix:
$$\text{Overview Solved} = \sum \text{UserProgress (status = 'SOLVED')} \neq \sum \text{Student.questionsSolved}$$

After implementation:
$$\text{Overview Solved} \equiv \sum_{s \in \text{Students}} s.\text{questionsSolved}$$
$$\text{Overview XP} \equiv \sum_{s \in \text{Students}} s.\text{totalXp}$$

### Verified Consistency Metrics
| Metric | Overview Card | Student Directory Total | Mentor Cohort Sum | Parity Status |
| :--- | :--- | :--- | :--- | :--- |
| **Total Students** | `studentsData.length` | Count of rows in directory | Sum of assigned + unassigned | **100% Match** |
| **Questions Solved** | Sum of deduplicated solves | Sum of student `questionsSolved` | Sum of mentor cohort solves | **100% Match** |
| **Total XP Distributed** | Sum of deduplicated XP | Sum of student `totalXp` | Cohort total XP | **100% Match** |
| **Average Solved** | $\text{Total Solved} / \text{Students}$ | N/A | Weighted cohort average | **100% Match** |
| **Reward Velocity** | $\text{Total XP} / \text{Total Solved}$ | N/A | N/A | **Protected (min 50)** |

---

## SECTION D: MULTI-LANGUAGE SOLVE & XP DEDUPLICATION DEEP DIVE

### Problem Identification
When a student solves Problem A in Python, then re-solves Problem A in C++ or Java:
- `UserProgress` contains two rows with `status = 'SOLVED'`.
- Previous overview queries treated each row as an independent solved challenge and awarded an additional 50 XP.
- Previous client logic also failed to map legacy/duplicate challenge IDs to their canonical active slug (`mapToCanonicalPracticeSlug`).

### Implementation Fix
In `src/lib/campusManagerService.ts`:
```typescript
const solvedCanonicalSlugs = new Set<string>()
let totalXp = 0
const languageSolvedCounts: Record<string, number> = {
  python: 0,
  java: 0,
  cpp: 0,
  nodejs: 0,
}

// Sort progress ascending by timestamp so the earliest solve establishes canonical award
const sortedProgress = [...uProgress].sort((a, b) => {
  const ta = a.solvedAt ? new Date(a.solvedAt).getTime() : 0
  const tb = b.solvedAt ? new Date(b.solvedAt).getTime() : 0
  return ta - tb
})

for (const p of sortedProgress) {
  if (p.status === 'SOLVED') {
    const canonicalSlug = mapToCanonicalPracticeSlug(p.problemId)
    if (!solvedCanonicalSlugs.has(canonicalSlug)) {
      solvedCanonicalSlugs.add(canonicalSlug)
      // Award XP on the first solve only
      totalXp += Number(p.xpEarned != null ? p.xpEarned : 50)
    }
    const lang = normalizeLanguage(p.language)
    if (languageSolvedCounts[lang] !== undefined) {
      languageSolvedCounts[lang] = (languageSolvedCounts[lang] || 0) + 1
    }
  }
}
```

### Result
- `questionsSolved`: Count of unique canonical problems solved across all languages.
- `totalXp`: Single 50 XP awarded per canonical challenge (no double counting).
- `languageSolvedCounts`: Accurately preserves language adoption telemetry (Python, Java, C++, Node.js) for detailed analytics.

---

## SECTION E: CAMPUS PASS RATE & DIVISION-BY-ZERO REMEDIATION

### Root Cause
Former line 502 in `src/lib/campusManagerService.ts`:
```typescript
// DEFECTIVE IMPLEMENTATION:
const avgPassRate = totalCohortSubs > 0
  ? Math.round((passedCohortSubs / totalCohortSubs) * 100)
  : (totalStudents > 0 ? 100 : 0) // <--- FABRICATED 100% PASS RATE
```

### Corrected Implementation
```typescript
// AUTHORITATIVE IMPLEMENTATION:
const avgPassRate = totalCohortSubs > 0
  ? Math.round((passedCohortSubs / totalCohortSubs) * 100)
  : 0 // Division by zero strictly yields 0%

const campusPassRate = totalSubmissions > 0
  ? Math.round((passedSubs / totalSubmissions) * 1000) / 10
  : 0
```

### Edge Cases Audited & Passed
1. Campus with 0 submissions $\rightarrow$ `campusPassRate: 0.0%`.
2. Mentor with 0 assigned students $\rightarrow$ `avgPassRate: 0%`, `capacityPercent: 0%`.
3. Mentor with 5 assigned students but 0 submissions $\rightarrow$ `avgPassRate: 0%` (previously 100%).
4. Mentor with `maxStudents = 0` $\rightarrow$ `capacityPercent: 0%` (guarded against division by zero).

---

## SECTION F: REALTIME SYNCHRONIZATION, POSTGRES CHANGES & EVENT BUS

### Multi-Channel Architecture
The synchronization system links three distinct communication layers:

```
[ Remote Database ]
      │ (Supabase postgres_changes: Submission, UserProgress, students, mentors, mentor_students, users)
      ▼
[ Campus Realtime Channel ] ───► [ invalidateCampusCache() ] ───► [ Debounced Refresh (300ms) ]
      ▲                                       ▲
      │ (CustomEvent: kalvi_progress_updated) │ (CustomEvent: kalvi_campus_updated)
      │                                       │
[ Student Arena Solves ]              [ Campus Manager Action ]
                                      (addStudent, addMentor, assignMentor)
```

### Clean Lifecycle Management
- Debounce window: 300ms prevents network storms during rapid multi-case evaluations.
- Cross-tab synchronization: Listens to `'storage'` events so actions in one tab immediately refresh campus manager views in sibling tabs.
- Clean unmount: Automatically unsubscribes Supabase channels and removes all DOM event listeners to guarantee zero memory leaks.

---

## SECTION G: IN-MEMORY CACHING, REQUEST COLLAPSING & SESSION ISOLATION

### Performance Architecture
When a Campus Manager opens `CampusDashboardPage.tsx`, five telemetry queries are issued simultaneously:
- `fetchCampusOverviewMetrics()`
- `fetchCampusMentors()`
- `fetchCampusStudents()`
- `fetchRecentCampusSubmissions(8)`
- `fetchCampusDetailedAnalytics()`

Under the previous un-cached model, this resulted in 5 parallel executions of `fetchAllRows(Submission)` and `fetchAllRows(UserProgress)`.

### Implemented Optimization
1. **5-Second Memory Cache:** Short TTL cache allows instant sub-millisecond responses for repeated component mounts and tab switching.
2. **In-Flight Request Collapsing:** If `fetchCampusStudents()` is already resolving, simultaneous calls reuse the same `Promise<CampusStudentStat[]>`.
3. **Logout & Session Cache Eviction:** Integrated with `registerCacheClearer`:
   ```typescript
   registerCacheClearer(() => {
     invalidateCampusCache()
   })
   ```
   When a user logs out or switches accounts, cached telemetry is purged immediately, preventing cross-user data leakage.

---

## SECTION H: CAMPUS MANAGER PORTAL UI & COMPONENT FRESHNESS AUDIT

All Campus Manager views were audited for freshness and real-time connectivity:

| View | File | Realtime Subscription | Cache Invalidation on Mutation |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `CampusDashboardPage.tsx` | `subscribeToCampusUpdates` | Active + "Refresh Data" button invalidates cache |
| **Students Directory** | `CampusStudentsPage.tsx` | `subscribeToCampusUpdates` | `addCampusStudent`, `assignStudentMentor` |
| **Mentors Directory** | `CampusMentorsPage.tsx` | `subscribeToCampusUpdates` | `addCampusMentor` |
| **Analytics** | `CampusAnalyticsPage.tsx` | `subscribeToCampusUpdates` | Realtime telemetry refresh |
| **Mentor Leaderboard** | `CampusMentorLeaderboardPage.tsx` | `subscribeToCampusUpdates` *(Added)* | Live rank updates on student progress |
| **Student Leaderboard** | `CampusStudentLeaderboardPage.tsx` | `subscribeToCampusUpdates` *(Added)* | Live rank updates on student progress |
| **Campus Profile** | `CampusProfilePage.tsx` | `subscribeToCampusUpdates` *(Added)* | Live student/mentor count refresh |

---

## SECTION I: SECURITY, RLS & CROSS-ROLE ISOLATION

1. **Role Guard Enforcement:** Campus manager pages remain guarded by `CampusManagerProtectedRoute` and role checks:
   ```typescript
   if (!authLoading && user && user.role !== 'CAMPUS_MANAGER') {
     navigate(user.role === 'MENTOR' ? '/mentor' : '/dashboard', { replace: true })
   }
   ```
2. **Server-Side Authorization Protection:** All code execution and submission endpoints (`/api/execute`, `/api/submit`) continue enforcing strict token validation and IDOR guards.
3. **Zero Leaks of Hidden Test Data:** The production bundle check verified that 6,744 hidden test case strings remain strictly isolated on the server side and 0 exist in client-side bundles.

---

## SECTION J: COMPLETE TEST SUITE RESULTS & REGRESSION MATRIX

### 1. Dedicated Campus Manager Audit Test Suite (`npm run test:campus-manager`)
**Command:** `npx tsx scripts/test-campus-manager-audit.ts`  
**Result:** 14 Passed, 0 Failed, Exit Code 0.

- `✓ normalizeLanguage correctly normalizes Python, Java, Node.js, and C++ variants`
- `✓ mapToCanonicalPracticeSlug maps legacy / duplicate problem IDs to canonical slug`
- `✓ Multi-language solve on same problem counts as 1 solve and awards single 50 XP`
- `✓ Campus pass rate formula: passed / total evaluated submissions`
- `✓ Zero submissions yields 0% pass rate (never 100%)`
- `✓ Mentor capacity percent handles 0 max students cleanly`
- `✓ invalidateCampusCache clears all cached entries without error`
- `✓ clearAllUserCaches triggers campus cache invalidation on logout/switch`
- `✓ subscribeToCampusUpdates attaches to postgres_changes and window events and unsubscribes cleanly`
- `✓ fetchCampusStudents and fetchCampusOverviewMetrics are in exact mathematical parity`
- `✓ fetchCampusMentors aggregates cohort statistics correctly`
- `✓ fetchCampusDetailedAnalytics calculates accurate language and belt breakdowns`
- `✓ fetchMentorLeaderboard and fetchStudentLeaderboard return ranked lists with ranks 1..N`
- `✓ Student Portal and Mentor Portal files have zero git modifications`

### 2. Full Regression Suite Matrix
| Suite | Command | Total Tests | Result |
| :--- | :--- | :--- | :--- |
| **Campus Manager Audit** | `npm run test:campus-manager` | 14 | **14 / 14 Passed (100%)** |
| **Mentor Solved Challenges** | `npm run test:mentor-solved` | 10 | **10 / 10 Passed (100%)** |
| **Mentor Auth & Student View** | `npm run test:mentor-auth` | 19 | **19 / 19 Passed (100%)** |
| **Problem Stats & Counter** | `npm run test:problem-stats` | 12 | **12 / 12 Passed (100%)** |
| **Code Editor Restrictions** | `npm run test:editor-restrictions` | 18 | **18 / 18 Passed (100%)** |
| **Evaluation Pipeline** | `npm test` | 29 | **29 / 29 Passed (100%)** |

**Total Regression Tests Passing:** **102 / 102 Tests (100% Pass Rate)**

---

## SECTION K: PRODUCTION BUILD VERIFICATION & PERFORMANCE IMPACT

### Build Output Summary
- **TypeScript:** `tsc -b` exited with code 0. Zero compiler errors.
- **Vite Bundle Build:** Built in 8.54 seconds.
- **Serverless API Bundles:**
  - `api/_sandbox-worker.mjs`: 59.8 kB
  - `api/execute.js`: 3.8 MB
  - `api/submit.js`: 3.8 MB
  - `api/feedback.js`: 868.2 kB
  - `api/integrations/teamsync/tickets.js`: 858.7 kB
  - `api/integrations/teamsync/webhooks.js`: 848.3 kB
- **Hidden Test Security Scan:** `check-bundle: OK - 6744 unique hidden test strings checked, none present in dist/`
- **API Production Startup Check:** `check-api-startup: OK - all functions start under production settings and answer JSON`

---

## SECTION L: OPERATIONAL RECOMMENDATIONS & SCHEMA EVOLUTION GUIDANCE

1. **Future Multi-Campus Schema Migration:**
   When multi-tenancy across geographical campuses is required, add a migration:
   ```sql
   CREATE TABLE IF NOT EXISTS campuses (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     code TEXT UNIQUE NOT NULL,
     created_at TIMESTAMPTZ DEFAULT now()
   );

   ALTER TABLE students ADD COLUMN IF NOT EXISTS campus_id UUID REFERENCES campuses(id);
   ALTER TABLE mentors ADD COLUMN IF NOT EXISTS campus_id UUID REFERENCES campuses(id);
   ```
   The `fetchCampusStudents` and `fetchCampusMentors` queries in `campusManagerService.ts` are already organized to receive an optional `campusId: string` parameter and filter seamlessly.

2. **Database View / RPC Optimization for High Scale:**
   While the current in-memory request collapsing handles cohorts smoothly, when the campus exceeds 10,000 active students, create a materialized view or scheduled database rollup for `campus_overview_metrics` with canonical problem grouping in PostgreSQL:
   ```sql
   CREATE OR REPLACE FUNCTION campus_overview_metrics_deduplicated()
   RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER AS $$
     WITH unique_student_solves AS (
       SELECT user_id, problem_id, MIN(xp_earned) as xp
       FROM "UserProgress"
       WHERE status = 'SOLVED'
       GROUP BY user_id, problem_id
     )
     SELECT jsonb_build_object(
       'totalStudents', (SELECT count(*) FROM students),
       'totalMentors', (SELECT count(*) FROM mentors),
       'solvedCount', (SELECT count(*) FROM unique_student_solves),
       'totalXp', (SELECT COALESCE(sum(xp), 0) FROM unique_student_solves)
     );
   $$;
   ```

---

## FINAL CERTIFICATION

The KalviLearn Campus Manager Portal is certified **Accurate, Real-Time, and 100% In Parity with Student and Mentor Portals**. All requested audit objectives have been met with comprehensive test coverage and zero regressions across the codebase.

