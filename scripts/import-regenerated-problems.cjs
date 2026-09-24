const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

async function main() {
  console.log('============================================================');
  console.log('🚀 KALVILEARN PRACTICE CONTENT IMPORT & SYNC PIPELINE');
  console.log('============================================================\n');

  const qbPath = path.resolve('KalviLearn_Question_Bank_Regenerated.md');
  const tcPath = path.resolve('KalviLearn_Test_Cases_Regenerated.md');

  console.log('1. Locating source Markdown files:');
  console.log(`   - Question Bank: ${qbPath} (exists: ${fs.existsSync(qbPath)})`);
  console.log(`   - Test Cases:    ${tcPath} (exists: ${fs.existsSync(tcPath)})\n`);

  if (!fs.existsSync(qbPath) || !fs.existsSync(tcPath)) {
    throw new Error('Source Markdown files not found!');
  }

  const qbContent = fs.readFileSync(qbPath, 'utf8');
  const tcContent = fs.readFileSync(tcPath, 'utf8');
  const curriculum = JSON.parse(fs.readFileSync('src/data/curriculum.json', 'utf8'));
  const currentProblemsJson = JSON.parse(fs.readFileSync('src/data/problems.json', 'utf8'));

  // Flatten existing problems for mapping and legacy preservation
  const existingFlat = [];
  currentProblemsJson.forEach((b) => {
    b.problems.forEach((p) => {
      existingFlat.push({ belt: b.order, ...p });
    });
  });

  // -------------------------------------------------------------
  // Parse Test Cases
  // -------------------------------------------------------------
  console.log('2. Parsing KalviLearn_Test_Cases_Regenerated.md...');
  const tcSections = tcContent.split(/^## (M\d+-LU\d+) — (.*)$/gm);
  const testCasesByQuestion = new Map();

  for (let i = 1; i < tcSections.length; i += 3) {
    const id = tcSections[i];
    const body = tcSections[i + 2];
    const tcBlocks = body.split(/^### Test Case (\d+)/gm);
    const cases = [];

    for (let j = 1; j < tcBlocks.length; j += 2) {
      const caseNum = parseInt(tcBlocks[j], 10);
      const caseBody = tcBlocks[j + 1];

      const inputMatch = caseBody.match(/\*\*Input\*\*\s*```(?:text)?\r?\n([\s\S]*?)```/);
      const outputMatch = caseBody.match(/\*\*Output\*\*\s*```(?:text)?\r?\n([\s\S]*?)```/);

      const rawInput = inputMatch ? inputMatch[1] : '';
      const rawOutput = outputMatch ? outputMatch[1] : '';

      cases.push({
        testIndex: caseNum,
        input: rawInput.replace(/\r\n/g, '\n').replace(/\n$/, ''),
        expectedOutput: rawOutput.replace(/\r\n/g, '\n').replace(/\n$/, ''),
        isHidden: caseNum > 3,
      });
    }

    testCasesByQuestion.set(id, cases);
  }
  console.log(`   Parsed test cases for ${testCasesByQuestion.size} questions.\n`);

  // -------------------------------------------------------------
  // Parse Question Bank
  // -------------------------------------------------------------
  console.log('3. Parsing KalviLearn_Question_Bank_Regenerated.md...');
  const qbSections = qbContent.split(/^### (M(\d+)-LU(\d+)) — (.*)$/gm);
  const parsedQuestions = [];

  for (let i = 1; i < qbSections.length; i += 5) {
    const fullId = qbSections[i];
    const moduleId = parseInt(qbSections[i + 1], 10);
    const unitId = parseInt(qbSections[i + 2], 10);
    const title = qbSections[i + 3].trim();
    const body = qbSections[i + 4];

    const inputFormatIdx = body.indexOf('**Input Format**');
    const outputFormatIdx = body.indexOf('**Output Format**');
    const constraintsIdx = body.indexOf('**Constraints**');
    const example1Idx = body.indexOf('**Worked Example 1**');
    const example2Idx = body.indexOf('**Worked Example 2**');

    const description = (inputFormatIdx !== -1 ? body.substring(0, inputFormatIdx) : body).trim();

    let inputFormat = '';
    if (inputFormatIdx !== -1 && outputFormatIdx !== -1) {
      inputFormat = body.substring(inputFormatIdx + '**Input Format**'.length, outputFormatIdx).trim();
    }

    let outputFormat = '';
    if (outputFormatIdx !== -1 && constraintsIdx !== -1) {
      outputFormat = body.substring(outputFormatIdx + '**Output Format**'.length, constraintsIdx).trim();
    }

    let constraints = '';
    const endConstraintsIdx = example1Idx !== -1 ? example1Idx : body.length;
    if (constraintsIdx !== -1 && endConstraintsIdx !== -1) {
      constraints = body.substring(constraintsIdx + '**Constraints**'.length, endConstraintsIdx).trim();
    }

    const examples = [];
    const parseExampleBlock = (exText) => {
      const inputMatch = exText.match(/\*\*Example Input\*\*\s*```(?:text)?\r?\n([\s\S]*?)```/);
      const outputMatch = exText.match(/\*\*Output\*\*\s*```(?:text)?\r?\n([\s\S]*?)```/);
      const explanationMatch = exText.match(/\*\*Explanation\*\*\s*\r?\n([\s\S]*?)(?=\*\*Worked Example|\s*$)/);

      return {
        input: inputMatch ? inputMatch[1].replace(/\r\n/g, '\n').replace(/\n$/, '').trim() : '',
        output: outputMatch ? outputMatch[1].replace(/\r\n/g, '\n').replace(/\n$/, '').trim() : '',
        explanation: explanationMatch ? explanationMatch[1].trim() : '',
      };
    };

    if (example1Idx !== -1) {
      const ex1End = example2Idx !== -1 ? example2Idx : body.length;
      examples.push(parseExampleBlock(body.substring(example1Idx, ex1End)));
    }
    if (example2Idx !== -1) {
      examples.push(parseExampleBlock(body.substring(example2Idx)));
    }

    // Resolve module and concept from curriculum
    const mod = curriculum[moduleId - 1];
    const unit = mod?.units ? mod.units[unitId - 1] : mod?.learningUnits ? mod.learningUnits[unitId - 1] : null;

    parsedQuestions.push({
      id: fullId,
      moduleId,
      unitId,
      moduleName: mod?.name || mod?.title || `Module ${moduleId}`,
      conceptName: unit?.title || title,
      title,
      description,
      inputFormat,
      outputFormat,
      constraints,
      explanation: examples[0]?.explanation || '',
      examples,
    });
  }
  console.log(`   Parsed ${parsedQuestions.length} questions from Question Bank.\n`);

  if (parsedQuestions.length !== 85) {
    throw new Error(`Expected exactly 85 questions, found ${parsedQuestions.length}`);
  }

  // -------------------------------------------------------------
  // Map to Belts & Assemble Data
  // -------------------------------------------------------------
  console.log('4. Mapping questions to Belt architecture...');
  // Belt 1: indices 0..19 (20 problems)
  // Belt 2: indices 20..49 (30 problems)
  // Belt 3: indices 50..84 (35 problems)

  const updatedBelts = [
    {
      order: 1,
      name: 'Belt 1',
      title: 'Programming Foundations',
      description: 'Master fundamentals, input/output, variables, operators, and control structures.',
      color: '#3B82F6',
      problems: [],
    },
    {
      order: 2,
      name: 'Belt 2',
      title: 'Control Flow & Data Structures',
      description: 'Master arrays, strings, matrix manipulations, hashing, two pointers, and recursion.',
      color: '#10B981',
      problems: [],
    },
    {
      order: 3,
      name: 'Belt 3',
      title: 'Algorithms & Advanced Problem Solving',
      description: 'Master binary search, trees, graphs, dynamic programming, heaps, and advanced recursion.',
      color: '#8B5CF6',
      problems: [],
    },
  ];

  const serverTestCasesObj = {};

  for (let i = 0; i < 85; i++) {
    const q = parsedQuestions[i];
    const curr = existingFlat[i];
    const beltIndex = i < 20 ? 0 : i < 50 ? 1 : 2;
    const beltOrder = beltIndex + 1;
    const problemOrder = beltIndex === 0 ? i + 1 : beltIndex === 1 ? i - 20 + 1 : i - 50 + 1;
    const difficulty = beltIndex === 0 ? 'Easy' : beltIndex === 1 ? 'Medium' : 'Hard';

    const cleanTitleSlug = slugify(q.title);
    const newSlug = `belt-${beltOrder}-q${problemOrder}-${cleanTitleSlug}`;
    const legacySlug = curr.slug;

    const allTestCases = testCasesByQuestion.get(q.id);
    if (!allTestCases || allTestCases.length !== 10) {
      throw new Error(`Question ${q.id} does not have 10 test cases!`);
    }

    // Client test cases: cases 1..3 visible, cases 4..10 hidden without input/output
    const clientTestCases = allTestCases.map((tc) => {
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
      order: problemOrder,
      id: q.id,
      learningUnitId: q.id,
      title: q.title,
      slug: newSlug,
      legacySlug: legacySlug,
      module: q.moduleName,
      concept: q.conceptName,
      difficulty,
      description: q.description,
      inputFormat: q.inputFormat,
      outputFormat: q.outputFormat,
      constraints: q.constraints,
      explanation: q.explanation,
      examples: q.examples,
      starterCodes: STARTER_CODES,
      testCases: clientTestCases,
    };

    updatedBelts[beltIndex].problems.push(clientProblem);

    // Populate serverTestCasesObj under newSlug, and alias under legacySlug & q.id
    const serverProblemItem = {
      title: q.title,
      slug: newSlug,
      id: q.id,
      testCases: allTestCases,
    };

    serverTestCasesObj[newSlug] = serverProblemItem;
    // Provide aliases for robust routing and backward compatibility
    serverTestCasesObj[legacySlug] = serverProblemItem;
    serverTestCasesObj[q.id] = serverProblemItem;
    serverTestCasesObj[q.id.toLowerCase()] = serverProblemItem;
  }

  // Preserve dedicated fixture entry for sum-of-two-numbers if requested by legacy tests
  if (!serverTestCasesObj['sum-of-two-numbers']) {
    serverTestCasesObj['sum-of-two-numbers'] = serverTestCasesObj[existingFlat[0].slug];
  }

  // -------------------------------------------------------------
  // Write Static Canonical Files
  // -------------------------------------------------------------
  console.log('5. Writing src/data/problems.json...');
  fs.writeFileSync('src/data/problems.json', JSON.stringify(updatedBelts, null, 2), 'utf8');

  console.log('6. Writing src/server/data/serverTestCases.json...');
  fs.writeFileSync('src/server/data/serverTestCases.json', JSON.stringify(serverTestCasesObj, null, 2), 'utf8');

  console.log('7. Writing src/server/data/serverTestCases.ts...');
  const tsContent = `// Auto-generated from KalviLearn_Test_Cases_Regenerated.md
// Contains all 10 authoritative evaluation test cases per question.
// Hidden test cases are strictly preserved here and never exposed to the frontend.

export const serverTestCases = ${JSON.stringify(serverTestCasesObj, null, 2)};

export default serverTestCases;
`;
  fs.writeFileSync('src/server/data/serverTestCases.ts', tsContent, 'utf8');

  // -------------------------------------------------------------
  // Update PostgreSQL Database
  // -------------------------------------------------------------
  console.log('\n8. Updating PostgreSQL Database (Problem and TestCase tables)...');
  const prisma = new PrismaClient();

  try {
    const dbBelts = await prisma.belt.findMany({ orderBy: { order: 'asc' } });
    console.log(`   Found ${dbBelts.length} belts in database.`);

    let updatedProblemsCount = 0;
    let updatedTestCasesCount = 0;

    for (const belt of updatedBelts) {
      const dbBelt = dbBelts.find((b) => b.order === belt.order);
      if (!dbBelt) {
        console.warn(`   Warning: Belt ${belt.order} not found in DB!`);
        continue;
      }

      for (const p of belt.problems) {
        // Find existing problem by beltId and order to preserve UUID and foreign keys
        const existingProblem = await prisma.problem.findFirst({
          where: {
            beltId: dbBelt.id,
            order: p.order,
          },
          include: { testCases: true },
        });

        if (existingProblem) {
          // Update Problem details
          await prisma.problem.update({
            where: { id: existingProblem.id },
            data: {
              title: p.title,
              slug: p.slug,
              difficulty: p.difficulty,
              description: p.description,
              inputFormat: p.inputFormat,
              outputFormat: p.outputFormat,
              explanation: p.explanation,
              starterCodes: p.starterCodes,
            },
          });
          updatedProblemsCount++;

          // Full 10 test cases from serverTestCasesObj
          const fullCases = serverTestCasesObj[p.slug].testCases;
          for (const tc of fullCases) {
            const existingTc = existingProblem.testCases.find((t) => t.testIndex === tc.testIndex);
            if (existingTc) {
              await prisma.testCase.update({
                where: { id: existingTc.id },
                data: {
                  input: tc.input,
                  expectedOutput: tc.expectedOutput,
                  isHidden: tc.isHidden,
                  explanation: tc.testIndex <= 2 ? p.explanation : null,
                },
              });
            } else {
              await prisma.testCase.create({
                data: {
                  problemId: existingProblem.id,
                  testIndex: tc.testIndex,
                  input: tc.input,
                  expectedOutput: tc.expectedOutput,
                  isHidden: tc.isHidden,
                  explanation: tc.testIndex <= 2 ? p.explanation : null,
                },
              });
            }
            updatedTestCasesCount++;
          }
        } else {
          console.warn(`   Problem Belt ${belt.order} Q${p.order} not found in DB!`);
        }
      }
    }

    console.log(`   ✅ Successfully updated ${updatedProblemsCount} problems in database.`);
    console.log(`   ✅ Successfully updated ${updatedTestCasesCount} test cases in database.`);
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n============================================================');
  console.log('🎉 PRACTICE CONTENT INTEGRATION COMPLETE');
  console.log('============================================================\n');
}

main().catch((err) => {
  console.error('❌ Import failed:', err);
  process.exit(1);
});
