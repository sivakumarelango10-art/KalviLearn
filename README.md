# Kalvi Learn 🔴

> An advanced, gamified competitive programming education platform featuring 85 Belt Mastery Problems, a 10-Module Curriculum, strict Anti-Cheat Monaco Code Editor, and automated test evaluation.

---

## 🚀 Key Features

- **🔴 Brand & Unified Navigation**: Clean, responsive sidebar featuring Brand Logo, Dashboard, Learn, Practice, Revise, and Profile.
- **🥋 85 Belt Mastery Problems**:
  - **Belt 1: Programming Foundations** (20 Problems)
  - **Belt 2: Intermediate Data Structures & Logic** (30 Problems)
  - **Belt 3: Advanced Algorithmic Patterns** (35 Problems)
- **🧪 10 Test Cases per Problem**:
  - 3 visible test cases for quick feedback during "Run".
  - 7 hidden test cases executed upon "Submit" to thoroughly validate edge cases, constraints, and correctness.
- **🛡️ Strict Anti-Cheat Code Arena**:
  - Monaco Editor sandbox with keyboard shortcut interception (`Ctrl+C`, `Ctrl+V`, `Ctrl+X`, `Cmd+C`, `Cmd+V`, `Cmd+X`).
  - Context menu / right-click disabled in the editor to foster authentic, muscle-memory coding habits.
- **⚡ In-Browser Multi-Language Execution**:
  - Fast client-side evaluation engine supporting Python 3 and JavaScript with formatted I/O, whitespace splitting, and runtime measurement.
  - Multi-language starter templates (Python 3, JavaScript, C++, Java).
- **📖 10-Module Curriculum (89 Learning Units)**:
  - Interactive syllabus viewer ingested directly from curriculum specifications.
  - Structured theory, input/output formats, and worked examples with direct practice links.
- **🔄 Revise & Solution Vault**:
  - Catalog of all passed submissions.
  - Read-only code viewer for accepted solutions.
  - Instant "Re-attempt" functionality to test algorithmic speed.
- **🎮 Gamification & Student Dashboard**:
  - Belt progression indicators (Belt 1, Belt 2, Belt 3).
  - +50 XP per solved challenge, learning streak counter, and comprehensive statistics.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, React Router v7, Tailwind CSS, Lucide Icons
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Animations**: Canvas Confetti
- **Database & Backend**: PostgreSQL via Supabase, Prisma ORM
- **Deployment**: Vercel ready (`vercel.json` SPA configuration included)

---

## 🏁 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/sivakumarelango10-art/KalviCode.git
cd KalviCode
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-supabase-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` (or `http://localhost:5174`).

### 5. Build for Production
```bash
npm run build
```

---

## ☁️ Deploying to Vercel

1. Import the repository in [Vercel](https://vercel.com/new).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Add the Environment Variables from `.env.example`.
6. Deploy! The included `vercel.json` automatically handles client-side routing for `/dashboard`, `/practice`, `/revise`, `/learn`, and `/profile`.
