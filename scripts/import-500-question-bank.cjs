const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const BELT_CONFIGS = [
  {
    order: 1,
    name: 'Belt 1',
    title: 'Yellow Belt',
    description: 'Variables, Operators, and Conditional Logic',
    color: '#EAB308',
  },
  {
    order: 2,
    name: 'Belt 2',
    title: 'Orange Belt',
    description: 'Loop Logic & Introductory Arrays',
    color: '#F97316',
  },
  {
    order: 3,
    name: 'Belt 3',
    title: 'Green Belt',
    description: 'Structured Problem Solving',
    color: '#10B981',
  },
  {
    order: 4,
    name: 'Belt 4',
    title: 'Purple Belt',
    description: 'Structured Problem Solving & Techniques',
    color: '#8B5CF6',
  },
  {
    order: 5,
    name: 'Belt 5',
    title: 'Blue Belt',
    description: 'Structured Problem Solving & Data Structures',
    color: '#3B82F6',
  },
  {
    order: 6,
    name: 'Belt 6',
    title: 'Brown Belt',
    description: 'Recursion and State',
    color: '#92400E',
  },
  {
    order: 7,
    name: 'Belt 7',
    title: 'Sr. Brown Belt',
    description: 'Search, Optimization & Feasibility Models',
    color: '#78350F',
  },
  {
    order: 8,
    name: 'Belt 8',
    title: 'Red Belt',
    description: 'Trees & Hierarchical Structures',
    color: '#EF4444',
  },
  {
    order: 9,
    name: 'Belt 9',
    title: 'Sr. Red Belt',
    description: 'Graph Algorithms & Network Traversal',
    color: '#B91C1C',
  },
  {
    order: 10,
    name: 'Belt 10',
    title: 'Black Belt',
    description: 'Advanced DP, Sequences & Bitwise Reasoning',
    color: '#171717',
  },
];

const STARTER_CODES = {
  python: `# Language: Python 3
import sys

def solve():
    # Read input from standard input
    input_data = sys.stdin.read().strip()
    if not input_data:
        return
    
    # Write your solution here
    pass

if __name__ == '__main__':
    solve()
`,
  javascript: `// Language: JavaScript (Node.js)
const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    
    // Write your solution here
}

solve();
`,
  cpp: `// Language: C++ (g++)
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Write your solution here
    
    return 0;
}
`,
  java: `// Language: Java (OpenJDK)
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Write your solution here
        
        scanner.close();
    }
}
`,
};

function parseQuestionBank(filePath) {
  console.log(`Parsing question bank from: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);

  const belts = [];
  let currentBelt = null;
  let currentSubdiv = null;
  let currentQ = null;
  let currentMode = null;
  let currentTcIndex = 0;
  let inCodeBlock = false;
  let codeBuffer = [];
  let textBuffer = [];

  function cleanTitle(raw) {
    const m = raw.match(/^Question\s+(\d+)\s+—\s+(.*?)\s+—\s+(Variant\s+\d+)$/);
    if (m) {
      return {
        globalNumber: parseInt(m[1], 10),
        concept: m[2].trim(),
        variant: m[3].trim(),
        fullTitle: `${m[2].trim()} (${m[3].trim()})`,
      };
    }
    const m2 = raw.match(/^Question\s+(\d+)\s+—\s+(.*)$/);
    if (m2) {
      return {
        globalNumber: parseInt(m2[1], 10),
        concept: m2[2].trim(),
        variant: 'Variant 1',
        fullTitle: m2[2].trim(),
      };
    }
    return {
      globalNumber: 0,
      concept: raw,
      variant: 'Variant 1',
      fullTitle: raw,
    };
  }

  function finalizeCurrentSection(q, mode, tBuf) {
    if (!mode || !q) return;
    const text = tBuf.join('\n').trim();
    if (mode === 'description') q.description = text;
    else if (mode === 'inputFormat') q.inputFormat = text;
    else if (mode === 'outputFormat') q.outputFormat = text;
    else if (mode === 'constraints') q.constraints = text;
    else if (mode === 'ex1_expl' && q.examples[0]) q.examples[0].explanation = text;
    else if (mode === 'ex2_expl' && q.examples[1]) q.examples[1].explanation = text;
  }

  function applyCodeBlock(q, mode, code, tcIdx) {
    if (!q) return;
    if (mode === 'ex1_in' && q.examples[0]) q.examples[0].input = code;
    else if (mode === 'ex1_out' && q.examples[0]) q.examples[0].output = code;
    else if (mode === 'ex2_in' && q.examples[1]) q.examples[1].input = code;
    else if (mode === 'ex2_out' && q.examples[1]) q.examples[1].output = code;
    else if (mode === 'tc_in') {
      let tc = q.testCases.find((t) => t.testIndex === tcIdx);
      if (!tc) {
        tc = { testIndex: tcIdx, input: '', expectedOutput: '', isHidden: tcIdx > 3 };
        q.testCases.push(tc);
      }
      tc.input = code;
    } else if (mode === 'tc_out') {
      let tc = q.testCases.find((t) => t.testIndex === tcIdx);
      if (!tc) {
        tc = { testIndex: tcIdx, input: '', expectedOutput: '', isHidden: tcIdx > 3 };
        q.testCases.push(tc);
      }
      tc.expectedOutput = code;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# Belt ')) {
      if (currentQ) {
        finalizeCurrentSection(currentQ, currentMode, textBuffer);
        currentQ = null;
      }
      const match = line.match(/^# Belt (\d+)\s+—\s+(.*)$/);
      const beltNum = parseInt(match[1], 10);
      const beltCfg = BELT_CONFIGS.find((b) => b.order === beltNum) || {
        order: beltNum,
        name: `Belt ${beltNum}`,
        title: match[2].trim(),
        description: match[2].trim(),
        color: '#3B82F6',
      };
      currentBelt = {
        order: beltNum,
        name: beltCfg.name,
        title: beltCfg.title,
        description: beltCfg.description,
        color: beltCfg.color,
        questions: [],
      };
      belts.push(currentBelt);
      currentSubdiv = null;
      currentMode = null;
      textBuffer = [];
      codeBuffer = [];
      continue;
    }

    if (line.startsWith('## Subdivision ')) {
      currentSubdiv = line.replace(/^##\s+/, '').trim();
      continue;
    }

    if (line.startsWith('## Question ')) {
      if (currentQ) {
        finalizeCurrentSection(currentQ, currentMode, textBuffer);
      }
      const rawHeader = line.replace(/^##\s+/, '').trim();
      const parsedHeader = cleanTitle(rawHeader);
      const orderInBelt = currentBelt.questions.length + 1;
      const slugBase = parsedHeader.concept.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const varNum = parsedHeader.variant.replace(/[^0-9]/g, '') || '1';
      const slug = `belt-${currentBelt.order}-q${orderInBelt}-${slugBase}-v${varNum}`;

      currentQ = {
        id: slug,
        order: orderInBelt,
        globalNumber: parsedHeader.globalNumber,
        title: parsedHeader.fullTitle,
        concept: parsedHeader.concept,
        variant: parsedHeader.variant,
        slug: slug,
        subdivision: currentSubdiv || `Belt ${currentBelt.order}`,
        difficulty: 'Easy', // default
        description: '',
        inputFormat: '',
        outputFormat: '',
        constraints: '',
        examples: [],
        starterCodes: STARTER_CODES,
        testCases: [],
      };
      currentBelt.questions.push(currentQ);
      currentMode = null;
      textBuffer = [];
      codeBuffer = [];
      continue;
    }

    if (!currentQ) continue;

    if (line.startsWith('**Difficulty:**')) {
      const rawDiff = line.replace('**Difficulty:**', '').trim().toLowerCase();
      if (rawDiff.includes('hard')) currentQ.difficulty = 'Hard';
      else if (rawDiff.includes('medium')) currentQ.difficulty = 'Medium';
      else currentQ.difficulty = 'Easy';
      continue;
    }

    if (line.startsWith('### Problem Statement')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      currentMode = 'description';
      textBuffer = [];
      continue;
    }
    if (line.startsWith('### Input Format')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      currentMode = 'inputFormat';
      textBuffer = [];
      continue;
    }
    if (line.startsWith('### Output Format')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      currentMode = 'outputFormat';
      textBuffer = [];
      continue;
    }
    if (line.startsWith('### Constraints')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      currentMode = 'constraints';
      textBuffer = [];
      continue;
    }
    if (line.startsWith('### Worked Example 1')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      currentMode = 'ex1';
      currentQ.examples.push({ input: '', output: '', explanation: '' });
      continue;
    }
    if (line.startsWith('### Worked Example 2')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      currentMode = 'ex2';
      currentQ.examples.push({ input: '', output: '', explanation: '' });
      continue;
    }
    if (line.startsWith('### Test Cases')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      currentMode = 'testCases';
      continue;
    }
    if (line.startsWith('#### Test Case ')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      const tcMatch = line.match(/#### Test Case (\d+)/);
      currentTcIndex = tcMatch ? parseInt(tcMatch[1], 10) : currentQ.testCases.length + 1;
      currentMode = 'tc_start';
      continue;
    }

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const codeText = codeBuffer.join('\n');
        applyCodeBlock(currentQ, currentMode, codeText, currentTcIndex);
        codeBuffer = [];
      } else {
        inCodeBlock = true;
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (line.startsWith('**Input**')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      if (currentMode === 'ex1' || currentMode === 'ex1_expl' || currentMode === 'ex1_out') currentMode = 'ex1_in';
      else if (currentMode === 'ex2' || currentMode === 'ex2_expl' || currentMode === 'ex2_out') currentMode = 'ex2_in';
      else if (currentMode.startsWith('tc')) currentMode = 'tc_in';
      continue;
    }
    if (line.startsWith('**Output**') || line.startsWith('**Expected Output**')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      if (currentMode === 'ex1_in' || currentMode === 'ex1') currentMode = 'ex1_out';
      else if (currentMode === 'ex2_in' || currentMode === 'ex2') currentMode = 'ex2_out';
      else if (currentMode.startsWith('tc')) currentMode = 'tc_out';
      continue;
    }
    if (line.startsWith('**Explanation**')) {
      finalizeCurrentSection(currentQ, currentMode, textBuffer);
      if (currentMode === 'ex1_out' || currentMode === 'ex1') currentMode = 'ex1_expl';
      else if (currentMode === 'ex2_out' || currentMode === 'ex2') currentMode = 'ex2_expl';
      textBuffer = [];
      continue;
    }

    textBuffer.push(line);
  }

  if (currentQ) {
    finalizeCurrentSection(currentQ, currentMode, textBuffer);
  }

  return belts;
}

async function main() {
  console.log('========================================================================');
  console.log('🥋 KALVILEARN 10-BELT 500-QUESTION BANK IMPORTER & SYNC ENGINE');
  console.log('========================================================================\n');

  const qbPath = path.resolve('KalviLearn_10_Belt_Programming_Question_Bank_500.md');
  if (!fs.existsSync(qbPath)) {
    throw new Error(`File not found: ${qbPath}`);
  }

  const parsedBelts = parseQuestionBank(qbPath);
  console.log(`\nSuccessfully parsed ${parsedBelts.length} belts:`);
  let totalQuestions = 0;
  parsedBelts.forEach((b) => {
    totalQuestions += b.questions.length;
    console.log(`  - Belt ${b.order}: ${b.title} (${b.questions.length} questions)`);
  });
  console.log(`Total questions: ${totalQuestions}`);

  if (totalQuestions !== 500) {
    throw new Error(`Expected exactly 500 questions, got ${totalQuestions}!`);
  }

  // -------------------------------------------------------------------------
  // Construct Client JSON (src/data/problems.json) and Server Test Cases
  // -------------------------------------------------------------------------
  console.log('\n--- 1. Generating Client and Server Data Structures ---');
  const clientBelts = [];
  const serverTestCasesObj = {};

  parsedBelts.forEach((belt) => {
    const clientProblems = [];

    belt.questions.forEach((q) => {
      // Primary explanation from Example 1
      const primaryExplanation = q.examples && q.examples[0] ? q.examples[0].explanation : '';

      // Client test cases: cases 1..3 visible, cases 4..10 hidden (without input/output)
      const clientTestCases = q.testCases.map((tc) => {
        if (tc.testIndex <= 3) {
          return {
            testIndex: tc.testIndex,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: false,
          };
        }
        return {
          testIndex: tc.testIndex,
          isHidden: true,
        };
      });

      const clientProblem = {
        order: q.order,
        id: q.id,
        learningUnitId: q.id,
        globalNumber: q.globalNumber,
        title: q.title,
        concept: q.concept,
        variant: q.variant,
        subdivision: q.subdivision,
        slug: q.slug,
        difficulty: q.difficulty,
        description: q.description,
        inputFormat: q.inputFormat,
        outputFormat: q.outputFormat,
        constraints: q.constraints,
        explanation: primaryExplanation,
        exampleExplanation: primaryExplanation,
        examples: q.examples,
        starterCodes: q.starterCodes,
        testCases: clientTestCases,
      };

      clientProblems.push(clientProblem);

      // Server test cases object contains all 10 authoritative test cases
      serverTestCasesObj[q.slug] = {
        title: q.title,
        slug: q.slug,
        id: q.id,
        testCases: q.testCases.map((tc) => ({
          testIndex: tc.testIndex,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isHidden: tc.testIndex > 3,
        })),
      };
    });

    clientBelts.push({
      order: belt.order,
      name: belt.name,
      title: belt.title,
      description: belt.description,
      color: belt.color,
      problems: clientProblems,
    });
  });

  // Write src/data/problems.json
  console.log('Writing src/data/problems.json...');
  fs.writeFileSync('src/data/problems.json', JSON.stringify(clientBelts, null, 2), 'utf8');

  // Write src/server/data/serverTestCases.json
  console.log('Writing src/server/data/serverTestCases.json...');
  fs.writeFileSync('src/server/data/serverTestCases.json', JSON.stringify(serverTestCasesObj, null, 2), 'utf8');

  // Write src/server/data/serverTestCases.ts
  console.log('Writing src/server/data/serverTestCases.ts...');
  const tsContent = `// Auto-generated from KalviLearn_10_Belt_Programming_Question_Bank_500.md
// Contains all 10 authoritative evaluation test cases per question.
// Hidden test cases are strictly preserved here and never exposed to the frontend.

export const serverTestCases = ${JSON.stringify(serverTestCasesObj, null, 2)};

export default serverTestCases;
`;
  fs.writeFileSync('src/server/data/serverTestCases.ts', tsContent, 'utf8');

  // -------------------------------------------------------------------------
  // PostgreSQL Database Synchronization via Prisma
  // -------------------------------------------------------------------------
  console.log('\n--- 2. Synchronizing PostgreSQL Database ---');
  const prisma = new PrismaClient();

  try {
    // 1. Upsert Belts 1..10
    console.log('Syncing Belts 1..10 in DB...');
    const dbBeltMap = new Map();
    for (const bCfg of BELT_CONFIGS) {
      const beltRecord = await prisma.belt.upsert({
        where: { order: bCfg.order },
        update: {
          name: bCfg.name,
          title: bCfg.title,
          description: bCfg.description,
          color: bCfg.color,
        },
        create: {
          order: bCfg.order,
          name: bCfg.name,
          title: bCfg.title,
          description: bCfg.description,
          color: bCfg.color,
        },
      });
      dbBeltMap.set(bCfg.order, beltRecord.id);
    }
    console.log(`✅ All ${dbBeltMap.size} Belts synced in database.`);

    // 2. Fetch existing problems to preserve IDs and historical submissions
    const existingDbProblems = await prisma.problem.findMany({
      include: { testCases: true },
    });
    console.log(`Found ${existingDbProblems.length} existing problems in database.`);

    // Map existing problems by (beltId, order)
    const existingProblemByBeltAndOrder = new Map();
    const existingProblemBySlug = new Map();
    existingDbProblems.forEach((p) => {
      existingProblemByBeltAndOrder.set(`${p.beltId}_${p.order}`, p);
      existingProblemBySlug.set(p.slug, p);
    });

    let updatedProblems = 0;
    let createdProblems = 0;
    let totalTestCasesUpserted = 0;

    for (const belt of clientBelts) {
      const beltId = dbBeltMap.get(belt.order);
      if (!beltId) throw new Error(`Missing DB Belt for order ${belt.order}`);

      for (const p of belt.problems) {
        const existing =
          existingProblemByBeltAndOrder.get(`${beltId}_${p.order}`) ||
          existingProblemBySlug.get(p.slug);

        let problemRecordId;

        if (existing) {
          // Update in-place to preserve problem ID and submission relationships
          await prisma.problem.update({
            where: { id: existing.id },
            data: {
              beltId: beltId,
              order: p.order,
              title: p.title,
              slug: p.slug,
              difficulty: p.difficulty,
              description: p.description,
              inputFormat: p.inputFormat,
              outputFormat: p.outputFormat,
              explanation: p.explanation,
              exampleExplanation: p.exampleExplanation,
              examples: p.examples,
              subdivision: p.subdivision,
              starterCodes: p.starterCodes,
            },
          });
          problemRecordId = existing.id;
          updatedProblems++;
        } else {
          // Create new problem record
          const created = await prisma.problem.create({
            data: {
              beltId: beltId,
              order: p.order,
              title: p.title,
              slug: p.slug,
              difficulty: p.difficulty,
              description: p.description,
              inputFormat: p.inputFormat,
              outputFormat: p.outputFormat,
              explanation: p.explanation,
              exampleExplanation: p.exampleExplanation,
              examples: p.examples,
              subdivision: p.subdivision,
              starterCodes: p.starterCodes,
            },
          });
          problemRecordId = created.id;
          createdProblems++;
        }

        // Upsert 10 Test Cases
        const fullServerCases = serverTestCasesObj[p.slug].testCases;
        for (const tc of fullServerCases) {
          const tcExplanation =
            tc.testIndex === 1 && p.examples[0]
              ? p.examples[0].explanation
              : tc.testIndex === 2 && p.examples[1]
              ? p.examples[1].explanation
              : null;

          await prisma.testCase.upsert({
            where: {
              problemId_testIndex: {
                problemId: problemRecordId,
                testIndex: tc.testIndex,
              },
            },
            update: {
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              isHidden: tc.isHidden,
              explanation: tcExplanation,
            },
            create: {
              problemId: problemRecordId,
              testIndex: tc.testIndex,
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              isHidden: tc.isHidden,
              explanation: tcExplanation,
            },
          });
          totalTestCasesUpserted++;
        }
      }
    }

    console.log(`\nPostgreSQL Sync Results:`);
    console.log(`  - Updated existing problems: ${updatedProblems}`);
    console.log(`  - Created new problems:      ${createdProblems}`);
    console.log(`  - Total active problems:     ${updatedProblems + createdProblems}`);
    console.log(`  - Total test cases synced:   ${totalTestCasesUpserted}`);

    // Verify no orphaned obsolete problems
    const totalDbProblems = await prisma.problem.count();
    console.log(`  - Verification: Total DB problems count = ${totalDbProblems}`);
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n========================================================================');
  console.log('🎉 QUESTION BANK IMPORT AND DB SYNC COMPLETED SUCCESSFULLY!');
  console.log('========================================================================\n');
}

main().catch((err) => {
  console.error('❌ Import failed:', err);
  process.exit(1);
});
