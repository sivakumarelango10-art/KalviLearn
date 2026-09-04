import React, { useState, useMemo } from 'react'
import Editor from '@monaco-editor/react'
import {
  Send,
  CheckCircle2,
  XCircle,
  Code2,
  Search,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MentorSubmissionItem {
  id: string
  studentName: string
  studentEmail: string
  problemTitle: string
  problemSlug: string
  beltName: string
  language: 'python' | 'java' | 'nodejs' | 'cpp'
  languageLabel: string
  status: 'PASSED' | 'FAILED' | 'ERROR'
  passedTests: number
  totalTests: number
  executionTimeMs: number
  createdAt: string
  code: string
}

const SAMPLE_SUBMISSIONS: MentorSubmissionItem[] = [
  {
    id: 'sub-1',
    studentName: 'Prajith P S',
    studentEmail: 'prajith.p.s.121@kalvium.community',
    problemTitle: 'Kadane Max Subarray Sum',
    problemSlug: 'belt-3-kadane-max-subarray',
    beltName: 'Belt 3',
    language: 'python',
    languageLabel: 'Python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 42,
    createdAt: '2 mins ago',
    code: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    arr = [int(x) for x in input_data[1:n+1]]
    
    max_so_far = arr[0]
    curr_max = arr[0]
    for x in arr[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    print(max_so_far)

if __name__ == '__main__':
    solve()`,
  },
  {
    id: 'sub-2',
    studentName: 'Kavya Ramesh',
    studentEmail: 'kavya.ramesh.s.121@kalvium.community',
    problemTitle: 'Two Sum Target Index',
    problemSlug: 'belt-2-two-sum',
    beltName: 'Belt 2',
    language: 'python',
    languageLabel: 'Python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 38,
    createdAt: '15 mins ago',
    code: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    target = int(tokens[1])
    arr = [int(x) for x in tokens[2:n+2]]
    
    seen = {}
    for i, num in enumerate(arr):
        comp = target - num
        if comp in seen:
            print(f"{seen[comp]} {i}")
            return
        seen[num] = i

if __name__ == '__main__':
    solve()`,
  },
  {
    id: 'sub-3',
    studentName: 'Prajith P S',
    studentEmail: 'prajith.p.s.121@kalvium.community',
    problemTitle: 'Reverse Words in a String',
    problemSlug: 'belt-2-reverse-words',
    beltName: 'Belt 2',
    language: 'java',
    languageLabel: 'Java',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 118,
    createdAt: '30 mins ago',
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String line = sc.nextLine().trim();
            String[] words = line.split("\\\\s+");
            StringBuilder sb = new StringBuilder();
            for (int i = words.length - 1; i >= 0; i--) {
                sb.append(words[i]).append(i > 0 ? " " : "");
            }
            System.out.println(sb.toString());
        }
    }
}`,
  },
  {
    id: 'sub-4',
    studentName: 'Kavya Ramesh',
    studentEmail: 'kavya.ramesh.s.121@kalvium.community',
    problemTitle: 'Check Even or Odd',
    problemSlug: 'belt-1-even-or-odd',
    beltName: 'Belt 1',
    language: 'cpp',
    languageLabel: 'C++',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 18,
    createdAt: '1 hour ago',
    code: `#include <iostream>
using namespace std;

int main() {
    long long n;
    if (cin >> n) {
        if (n % 2 == 0) {
            cout << "Even" << endl;
        } else {
            cout << "Odd" << endl;
        }
    }
    return 0;
}`,
  },
  {
    id: 'sub-5',
    studentName: 'Prajith P S',
    studentEmail: 'prajith.p.s.121@kalvium.community',
    problemTitle: 'Valid Palindrome String',
    problemSlug: 'belt-2-valid-palindrome',
    beltName: 'Belt 2',
    language: 'python',
    languageLabel: 'Python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 32,
    createdAt: '2 hours ago',
    code: `import sys

def solve():
    s = sys.stdin.read().strip()
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    if cleaned == cleaned[::-1]:
        print("true")
    else:
        print("false")

if __name__ == '__main__':
    solve()`,
  },
  {
    id: 'sub-6',
    studentName: 'Kavya Ramesh',
    studentEmail: 'kavya.ramesh.s.121@kalvium.community',
    problemTitle: 'Sum of Two Numbers',
    problemSlug: 'belt-1-sum-of-two-numbers',
    beltName: 'Belt 1',
    language: 'nodejs',
    languageLabel: 'Node.js',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 45,
    createdAt: '3 hours ago',
    code: `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    const [a, b] = input.split(/\\s+/).map(Number);
    console.log(a + b);
}

solve();`,
  },
]

export const MentorSubmissionsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'PASSED' | 'FAILED'>('all')
  const [langFilter, setLangFilter] = useState<'all' | 'python' | 'java' | 'nodejs' | 'cpp'>('all')
  const [inspectingSub, setInspectingSub] = useState<MentorSubmissionItem | null>(null)

  const filtered = useMemo(() => {
    return SAMPLE_SUBMISSIONS.filter((sub) => {
      const matchSearch =
        sub.studentName.toLowerCase().includes(search.toLowerCase()) ||
        sub.problemTitle.toLowerCase().includes(search.toLowerCase()) ||
        sub.studentEmail.toLowerCase().includes(search.toLowerCase())

      if (!matchSearch) return false
      if (statusFilter !== 'all' && sub.status !== statusFilter) return false
      if (langFilter !== 'all' && sub.language !== langFilter) return false
      return true
    })
  }, [search, statusFilter, langFilter])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <Send className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Live Submission Stream
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Real-time evaluation logs across all 10 test cases (3 visible + 7 hidden) for Python, Java, Node.js, and C++.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live WebSocket Sync
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by scholar, problem, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Tabs */}
          <div className="flex items-center gap-1">
            {(['all', 'PASSED', 'FAILED'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold transition-all interactive-tab',
                  statusFilter === st
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                )}
              >
                {st === 'all' ? 'All Results' : st === 'PASSED' ? 'Passed (10/10)' : 'Failed'}
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value as any)}
              className="text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="all">All Languages</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="nodejs">Node.js</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50 text-neutral-500 font-bold uppercase text-[10px] tracking-wider border-b border-neutral-200/80">
              <tr>
                <th className="py-3 px-4">Scholar</th>
                <th className="py-3 px-4">Problem</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Result (All 10 Cases)</th>
                <th className="py-3 px-4">Exec Time</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium">
              {filtered.map((sub) => {
                const isAllPassed = sub.passedTests === 10

                return (
                  <tr key={sub.id} className="hover:bg-neutral-50/70 transition-colors">
                    {/* Scholar */}
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-bold text-neutral-900">{sub.studentName}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {sub.studentEmail}
                        </div>
                      </div>
                    </td>

                    {/* Problem */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-neutral-800">{sub.problemTitle}</div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {sub.beltName}
                      </span>
                    </td>

                    {/* Language */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[11px] font-semibold">
                        {sub.languageLabel}
                      </span>
                    </td>

                    {/* Test Result */}
                    <td className="py-3 px-4">
                      {isAllPassed ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>10 / 10 PASS</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                          <span>{sub.passedTests} / 10 FAILED</span>
                        </div>
                      )}
                    </td>

                    {/* Exec Time */}
                    <td className="py-3 px-4 font-mono text-neutral-500">
                      {sub.executionTimeMs}ms
                    </td>

                    {/* Timestamp */}
                    <td className="py-3 px-4 text-neutral-400 text-[11px]">
                      {sub.createdAt}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setInspectingSub(sub)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 font-semibold text-xs transition-colors interactive-btn shadow-2xs"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Inspect Code</span>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Inspector Modal */}
      {inspectingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-neutral-900 text-neutral-100 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col h-[600px] animate-modal-pop">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {inspectingSub.studentName} — {inspectingSub.problemTitle}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 font-mono">
                    {inspectingSub.languageLabel}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Result: {inspectingSub.passedTests}/10 test cases passed • {inspectingSub.executionTimeMs}ms execution time
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInspectingSub(null)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Monaco Read-only Code View */}
            <div className="flex-1 relative">
              <Editor
                height="100%"
                theme="vs-dark"
                language={inspectingSub.language === 'nodejs' ? 'javascript' : inspectingSub.language}
                value={inspectingSub.code}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorSubmissionsPage
