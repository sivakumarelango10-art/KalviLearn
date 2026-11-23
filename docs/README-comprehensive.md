# KalviLearn — Platform Documentation

> A role-based learning and coding platform for students, mentors, campus teams, content managers, and platform administrators.

**Production application:** https://kalvilearn.vercel.app  
**Source repository:** https://github.com/sivakumarelango10-art/KalviLearn  
**Default branch:** `main`

---

## Contents

- [Platform overview](#platform-overview)
- [Core capabilities](#core-capabilities)
- [User roles and portals](#user-roles-and-portals)
- [Application routes](#application-routes)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Repository layout](#repository-layout)
- [Requirements](#requirements)
- [Local setup](#local-setup)
- [Environment variables](#environment-variables)
- [Database and Prisma](#database-and-prisma)
- [Development commands](#development-commands)
- [Testing and quality checks](#testing-and-quality-checks)
- [Production build](#production-build)
- [Vercel deployment](#vercel-deployment)
- [Security and operational notes](#security-and-operational-notes)
- [Troubleshooting](#troubleshooting)
- [Contribution workflow](#contribution-workflow)

---

## Platform overview

KalviLearn is a web application that combines structured learning, coding practice, progress tracking, and role-specific academic administration. Its codebase contains a React single-page application, server-side API handlers, Supabase-backed services, a PostgreSQL data model managed through Prisma, and a coding evaluation/sandbox workflow.

The application is divided into role-specific portals. Access to protected areas is handled by route guards and the corresponding server-side authorization logic. The exact records and permissions available to a user depend on their account role and assigned campus or content scope.

## Core capabilities

### Student learning

- A learning entry point with separate **Courses** and **Coding** experiences.
- Course curriculum organized into modules and learning units.
- Coding topics, question detail pages, and a dedicated solve workspace.
- Practice routes for language-based problem discovery and individual problem workspaces.
- Revision and profile areas.
- Student progress and submission records.

### Coding workspace and evaluation

- Monaco-based code editor integration.
- Language-specific starter code.
- Code execution and submission API handlers.
- Test-case evaluation and submission result records.
- A sandbox worker build step used by the execution system.
- Separate execution and submission endpoints, with server-side handlers.

Supported language availability is determined by the current question bank, starter-code configuration, sandbox implementation, and deployment configuration. Check the relevant code and tests before assuming that every language is enabled for every question.

### Mentor portal

Mentor-facing pages include a dashboard, student list, submissions, curriculum view, and profile. The portal supports mentor workflows around assigned learners and learning activity.

### Campus manager portal

Campus management pages include a dashboard, mentors, students, analytics, mentor leaderboard, student leaderboard, and profile. Data visibility and actions depend on campus assignment and server-side permissions.

### Content management

The content manager portal includes a dashboard, curriculum management, practice-question management, Learn Coding question management, combined question views, revisions, and profile. The application models content status, approval status, review information, and revision history.

### Super-admin portal

The super-admin route group includes platform dashboard, campus and manager administration, mentor and student administration, roles, content entry points, content-manager administration, and audit views. These pages are protected; access must be granted through the project's authorization configuration and should never be inferred from hiding a navigation item alone.

### Feedback and TeamSync integration

The repository includes feedback-related handlers and data models, as well as TeamSync integration and webhook handlers. Integration endpoints require the relevant server-side configuration and secrets.

---

## User roles and portals

The Prisma user model documents these role values:

| Role | Portal / responsibility |
| --- | --- |
| `STUDENT` | Learning, coding, practice, revision, profile, and progress |
| `MENTOR` | Mentor dashboard, assigned students, submissions, curriculum, profile |
| `CAMPUS_MANAGER` | Campus dashboard, mentors, students, analytics, leaderboards |
| `CONTENT_MANAGER` | Curriculum and question content workflows, revisions, profile |
| `ADMIN` | Administrative role value represented in the user model; available screens and permissions depend on application authorization |
| `SUPERADMIN` | Platform-level management and audit workflows |

The model also includes dedicated profile records for students, mentors, campus managers, and content managers. A user's role, profile record, campus association, and assigned scopes are related but distinct pieces of data.

---

## Application routes

The following route paths are defined in the application router. Parameterized routes are shown with their parameter names.

### Public and shared routes

| Route | Purpose |
| --- | --- |
| `/login` | Login |
| `/auth/callback` | Authentication callback |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms and conditions |

### Student application

| Route | Purpose |
| --- | --- |
| `/dashboard` | Student dashboard |
| `/learn` | Choose a learning mode |
| `/learn/courses` | Courses |
| `/learn/coding` | Coding topics |
| `/learn/coding/:topicId` | Questions for a coding topic |
| `/learn/coding/:topicId/:slug` | Coding question detail |
| `/learn/coding/:topicId/:slug/solve` | Learning coding workspace |
| `/practice` | Practice landing page |
| `/practice/:lang` | Language practice |
| `/practice/:lang/:slug` | Problem workspace |
| `/practice/:slug` | Problem workspace |
| `/revise` | Revision / saved solutions area |
| `/profile` | Student profile |

### Mentor portal

| Route | Purpose |
| --- | --- |
| `/mentor/dashboard` | Mentor dashboard (also the portal index) |
| `/mentor/students` | Students |
| `/mentor/submissions` | Submissions |
| `/mentor/curriculum` | Curriculum |
| `/mentor/profile` | Mentor profile |

### Campus manager portal

| Route | Purpose |
| --- | --- |
| `/campus/dashboard` | Campus dashboard (also the portal index) |
| `/campus/mentors` | Campus mentors |
| `/campus/students` | Campus students |
| `/campus/analytics` | Campus analytics |
| `/campus/mentor-leaderboard` | Mentor leaderboard |
| `/campus/student-leaderboard` | Student leaderboard |
| `/campus/profile` | Campus manager profile |

### Super-admin portal

| Route | Purpose |
| --- | --- |
| `/super-admin/dashboard` | Platform dashboard |
| `/super-admin/campuses` | Campus management |
| `/super-admin/managers` | Manager management |
| `/super-admin/mentors` | Mentor management |
| `/super-admin/students` | Student management |
| `/super-admin/roles` | Role management |
| `/super-admin/content` | Content landing page |
| `/super-admin/content/courses` | Course content |
| `/super-admin/content/learn-coding` | Learn Coding content |
| `/super-admin/content/practice-coding` | Practice Coding content |
| `/super-admin/content-managers` | Content-manager management |
| `/super-admin/audit` | Audit |

### Content-manager portal

| Route | Purpose |
| --- | --- |
| `/content-manager` | Dashboard / portal index |
| `/content-manager/dashboard` | Dashboard |
| `/content-manager/curriculum` | Curriculum management |
| `/content-manager/learning-units` | Redirects to curriculum |
| `/content-manager/practice-questions` | Practice question management |
| `/content-manager/learn-coding-questions` | Learn Coding question management |
| `/content-manager/questions` | Combined question view |
| `/content-manager/revisions` | Revisions |
| `/content-manager/profile` | Profile |

Unknown paths are handled by the route-level fallback configured for each portal.

---

## Technology stack

The following packages and infrastructure are visible in the repository configuration:

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router DOM 7 |
| Styling / utilities | Tailwind CSS, clsx, tailwind-merge |
| Icons | Lucide React |
| Code editor | `@monaco-editor/react` |
| Database | PostgreSQL |
| Backend services | Supabase |
| ORM | Prisma 6 |
| Bundling | Vite and esbuild |
| Python runtime package | Pyodide |
| Hosting configuration | Vercel |

---

## Architecture

At a high level, the repository is structured into:

1. **Browser application** — React pages, components, layouts, route definitions, and client-side services.
2. **API handlers** — server-side request handlers under `src/server`, exposed through Vercel API entry points under `api`.
3. **Persistence and identity** — Supabase services and PostgreSQL models managed with Prisma.
4. **Coding execution** — server-side execution and submission handlers, plus a separately bundled sandbox worker.
5. **Operational integrations** — campus, super-admin, content-manager, feedback, and TeamSync handler groups.

During local development, the Vite configuration installs middleware that dispatches API paths to the corresponding server handler. It also builds and watches the sandbox worker. This is intended to keep API behavior in development closer to the deployed handlers.

The Vercel configuration maps nested API paths to their corresponding entry points and rewrites application routes to the SPA entry point.

---

## Repository layout

The following is a functional guide to important directories and files; individual files may change as the project evolves.

| Path | Responsibility |
| --- | --- |
| `src/app/routes/` | Application route definitions |
| `src/pages/` | Student-facing pages |
| `src/pages/mentor/` | Mentor portal pages |
| `src/pages/campus/` | Campus manager pages |
| `src/pages/super-admin/` | Super-admin pages |
| `src/pages/content-manager/` | Content-manager pages |
| `src/server/` | Server-side API handlers and execution services |
| `src/components/` | Reusable UI components |
| `src/lib/` | Client and shared service utilities |
| `src/data/` | Curriculum and problem-bank data |
| `api/` | Vercel API entry points / generated server bundles |
| `prisma/schema.prisma` | PostgreSQL data model |
| `prisma/migrations/` | Database migration history, where present |
| `scripts/` | Build, verification, audit, and test scripts |
| `public/` | Static public assets |
| `vercel.json` | Vercel build, rewrite, function, and header configuration |
| `vite.config.ts` | Vite configuration and local API middleware |
| `package.json` | Dependencies and npm scripts |
| `.env.example` | Environment variable names and placeholders |

---

## Requirements

Before starting locally, install:

- Node.js compatible with the repository's Vite, TypeScript, Prisma, and esbuild dependencies.
- npm.
- Access to a configured Supabase project.
- PostgreSQL connection URLs for Prisma.
- Python only for the optional Python-based oracle scripts listed in the test commands.

Use a supported, consistent Node.js version across local development and CI. The Vercel build configuration runs the repository's npm build command.

---

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/sivakumarelango10-art/KalviLearn.git
cd KalviLearn
```

### 2. Install dependencies

```bash
npm install
```

For reproducible installation in CI or when a lockfile is present and up to date, use:

```bash
npm ci
```

### 3. Configure environment variables

Copy the example file:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux**
```bash
cp .env.example .env
```

Fill in the values for the Supabase project, server-side credentials, database URLs, and any integrations you use. See [Environment variables](#environment-variables).

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### 5. Run checks and build

```bash
npm run lint
npm test
npm run build
```

The lint script runs the TypeScript project build (`tsc -b`). The production build runs the frontend build and the configured worker/API bundle and verification steps.

---

## Environment variables

The checked-in `.env.example` documents the following variable names. Values below are descriptions, not live credentials.

| Variable | Use |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase URL available to the browser client |
| `VITE_SUPABASE_ANON_KEY` | Browser anon key, where used by the client configuration |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser publishable key |
| `VITE_APP_URL` | Application URL |
| `SUPABASE_URL` | Server-side Supabase URL |
| `SUPABASE_SECRET_KEY` | Preferred server-side Supabase secret key |
| `SUPABASE_SERVICE_ROLE_KEY` | Backward-compatible server-side service-role key |
| `ALLOWED_ORIGINS` | Comma-separated API CORS allow-list |
| `NEXT_PUBLIC_SUPABASE_URL` | Compatibility variable present in the example configuration |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Compatibility publishable key variable |
| `DATABASE_URL` | Prisma database connection URL |
| `DIRECT_URL` | Prisma direct database connection URL |
| `TEAMSYNC_API_URL` | TeamSync API base URL |
| `TEAMSYNC_API_KEY` | Server-side TeamSync API key |
| `TEAMSYNC_WEBHOOK_SECRET` | Secret used to validate TeamSync webhooks |
| `KALVILEARN_WEBHOOK_URL` | KalviLearn webhook receiver URL |
| `KALVILEARN_WEBHOOK_SECRET` | Server-side webhook secret |

### Important configuration guidance

- Never commit a populated `.env` file or real API/database credentials.
- Variables prefixed with `VITE_` are exposed to browser-side application code. Only put values there that are explicitly intended to be public.
- Keep Supabase secret/service-role keys, database credentials, and webhook secrets server-side.
- The example configuration explicitly warns that API handlers require server-side Supabase configuration in production and should not silently fall back to a public anon key.
- Set `ALLOWED_ORIGINS` to the exact trusted origins that should call the API. Do not use a wildcard.
- Configure only the integrations your deployment actually uses.

---

## Database and Prisma

The Prisma datasource uses PostgreSQL and reads:

- `DATABASE_URL` — application connection URL.
- `DIRECT_URL` — direct database connection URL.

The schema contains learning and coding entities such as `Belt`, `Problem`, `ProblemExample`, `ProblemTestCase`, `ProblemStarterCode`, `ProblemRevision`, `Module`, `LearningUnit`, `UserProgress`, and `Submission`.

Identity and administration entities include `User`, `Student`, `Mentor`, `CampusManager`, `ContentManager`, `Campus`, `MentorStudent`, content-manager assignments, permissions and scopes, and audit-related records. Feedback and TeamSync delivery/event models are also present.

Before applying schema changes:

1. Read the migration SQL and understand its impact.
2. Confirm the target Supabase project and environment.
3. Back up important production data using the project's approved process.
4. Apply migrations through the team's established deployment workflow.
5. Verify the resulting schema and application behavior.

Do not run ad-hoc destructive SQL against production. Do not assume that a Prisma schema change has already been applied to the live database.

---

## Development commands

The following commands are defined in `package.json`.

### Common workflow

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run preview` | Preview the production frontend build |
| `npm run lint` | Run TypeScript project checks (`tsc -b`) |
| `npm run build` | Run the complete configured production build |
| `npm test` | Run the evaluation-pipeline test script |

### Build helpers

| Command | Description |
| --- | --- |
| `npm run build:sandbox-worker` | Bundle the sandbox worker |
| `npm run build:api` | Bundle the execution API handler |
| `npm run build:submit` | Bundle the submission API handler |
| `npm run build:feedback` | Bundle the feedback handler |
| `npm run build:teamsync` | Bundle the TeamSync ticket handler |
| `npm run build:teamsync-webhook` | Bundle the TeamSync webhook handler |
| `npm run build:campus` | Build campus API entry point |
| `npm run build:super-admin` | Build super-admin API entry point |
| `npm run build:content-manager` | Build content-manager API entry point |
| `npm run check:bundle` | Check the bundle for hidden-test leakage |
| `npm run check:api-startup` | Check API startup |

### Test and verification scripts

The repository defines many focused test scripts. Common examples include:

| Command | Area |
| --- | --- |
| `npm run test:auth` | Authentication flow |
| `npm run test:security` | Security hardening |
| `npm run test:perf` | Performance audit |
| `npm run test:streak` | Streak behavior |
| `npm run test:feedback` | Frontend feedback UI |
| `npm run test:backend-feedback` | Backend feedback |
| `npm run test:teamsync` | TeamSync integration |
| `npm run test:teamsync-webhook` | TeamSync webhook |
| `npm run test:teamsync-sender` | Webhook sender |
| `npm run test:campus-manager` | Campus manager audit |
| `npm run test:campus-users` | Campus user management |
| `npm run test:super-admin` | Super-admin behavior |
| `npm run test:super-admin-questions` | Super-admin question workflows |
| `npm run test:content-manager` | Content-manager RBAC |
| `npm run test:question-lifecycle` | Question lifecycle |
| `npm run test:question-sorting-and-drafts` | Question sorting and drafts |
| `npm run test:curriculum` | Curriculum management |
| `npm run test:qa-fixes` | QA-fix verification |
| `npm run test:judge` | Judge pipeline |
| `npm run test:judge-audit` | Judge-bank audit |
| `npm run test:judge-all` | All judge questions |
| `npm run test:learn-separation` | Learn/practice separation |
| `npm run test:audited` | Audited question banks |
| `npm run test:language-availability` | Learn language availability |
| `npm run test:practice-e2e` | Practice execution end-to-end |
| `npm run test:multilang` | Multi-language revision |
| `npm run test:audit` | Master audit checks |

The `test:all` script chains a broad suite of tests, including judge, practice, auth, feedback, TeamSync, security, and audit checks. Some scripts require Python or additional environment configuration.

Run a focused test first when working in one area, then run the broader checks required by the project before opening a pull request. A script's presence in `package.json` does not mean it has been run or currently passes.

---

## Production build

The root build command is configured to:

1. Run TypeScript project checks.
2. Build the Vite frontend.
3. Bundle the sandbox worker.
4. Bundle execution and submission APIs.
5. Bundle feedback and TeamSync APIs.
6. Build campus, super-admin, and content-manager API entry points.
7. Run bundle and API-startup checks.

Run:

```bash
npm run build
```

Resolve build errors before deploying. Generated API bundles may be build outputs; follow the repository's conventions for whether generated files are committed.

---

## Vercel deployment

The repository includes a `vercel.json` configured for the Vite application.

Important configuration values include:

- Framework: `vite`
- Build command: `npm run build` (invoked through the configured shell command)
- Output directory: `dist`
- API rewrites for campus, super-admin, and content-manager endpoints
- SPA rewrite for client-side application routes
- Function file inclusion for the sandbox worker and Pyodide runtime

### Deployment checklist

1. Import the repository into the intended Vercel project.
2. Confirm the production branch (normally `main`) and build settings.
3. Add required environment variables in the correct Vercel environments.
4. Confirm server-only secrets are not exposed as browser variables.
5. Confirm the Supabase project and PostgreSQL URLs point to the intended environment.
6. Deploy and inspect the build logs.
7. Smoke-test login, role-based portals, API endpoints, coding execution/submission, and any enabled integrations.
8. Check that expected database migrations have been applied before enabling features that depend on them.

Production URL: https://kalvilearn.vercel.app

---

## Security and operational notes

- Enforce authorization in server-side handlers; client-side route guards are not a substitute for API authorization.
- Treat role changes, campus assignments, mentor/student relationships, and content publication as privileged operations.
- Keep service-role/secret keys, database credentials, API keys, and webhook secrets out of source control and browser bundles.
- Restrict CORS with an explicit allow-list.
- Review webhook authentication and replay/idempotency behavior when changing integration handlers.
- Preserve hidden evaluation data on the server side; do not expose private test cases in client bundles.
- Review resource limits and sandbox boundaries whenever changing code execution.
- Review database migrations for backward compatibility and data loss risk.
- The Vercel configuration includes security headers such as `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Strict-Transport-Security`, plus no-store behavior for API routes.

This section is operational guidance, not a claim that every endpoint or deployment has been independently security-audited by this document.

---

## Troubleshooting

### The development server starts, but an API request fails

- Check the terminal output for the `[dev-api]` handler failure message.
- Confirm the relevant environment variables are present.
- Confirm that the API route maps to the expected handler in `vite.config.ts`.
- Check the server handler's response and authorization requirements.

### Supabase authentication or data access fails

- Verify the Supabase URL and the appropriate browser key.
- Verify server-side credentials separately from browser credentials.
- Confirm the Vercel environment has the required values, not just the local `.env`.
- Check Supabase policies and the server handler's authorization behavior.

### Prisma cannot connect to PostgreSQL

- Verify `DATABASE_URL` and `DIRECT_URL`.
- Confirm network access and database credentials.
- Use the correct pooler/direct connection settings for the deployed environment.
- Verify schema migrations have been applied to the database you are connecting to.

### Coding execution or submission fails

- Inspect the execution/submission handler logs.
- Confirm the sandbox worker and Pyodide files are included in the deployment as configured.
- Check supported language configuration, resource limits, and question starter code.
- Run the relevant judge or practice tests locally.

### A protected portal redirects or shows access denied

- Confirm the signed-in user has the intended role and active status.
- Confirm required profile, campus association, assignment, and scope records exist.
- Check both the route guard and server-side authorization response.
- Do not bypass authorization as a troubleshooting shortcut.

---

## Contribution workflow

1. Update your local `main` branch before creating a feature branch.
2. Create a focused branch for one change.
3. Keep unrelated generated artifacts and local reports out of the commit.
4. Run the focused tests and required broader checks.
5. Run `npm run build` for changes that can affect the production build.
6. Review `git diff` and `git diff --check`.
7. Commit with a descriptive message.
8. Push the branch and open a pull request against `main`.
9. Include a summary, test evidence, screenshots for UI changes, and migration notes when relevant.

Example:

```bash
git switch main
git pull origin main
git switch -c feat/your-change
# Make and test your changes
git status
git diff --check
git add <intended-files>
git commit -m "feat: describe the change"
git push -u origin feat/your-change
```

---

## Documentation maintenance

This guide is an expanded companion to the root `README.md`. Keep both documents aligned when routes, environment variables, scripts, role permissions, or deployment configuration change. Treat source files (`package.json`, `src/app/routes/index.tsx`, `prisma/schema.prisma`, `.env.example`, `vite.config.ts`, and `vercel.json`) as the authoritative implementation references.

## License

No license terms are asserted here. Check the repository's license file or repository owner for the applicable usage and contribution terms.
