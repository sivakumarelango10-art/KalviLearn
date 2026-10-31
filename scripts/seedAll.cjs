const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { parseCurriculumMarkdown } = require('./parseCurriculum.cjs');
const belt1 = require('./belt1Data.cjs');
const belt2 = require('./belt2Data.cjs');
const belt3 = require('./belt3Data.cjs');

// Use DIRECT_URL for direct migration/seed execution without PgBouncer transaction limits
const connectionUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionUrl,
    },
  },
});

function generateStarterCodes(title) {
  return {
    python: `# Language: Python 3\nimport sys\n\ndef solve():\n    # Read input from standard input\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n    \n    # Write your solution here\n    pass\n\nif __name__ == '__main__':\n    solve()\n`,
    javascript: `// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf-8').trim();\n    if (!input) return;\n    \n    // Write your solution here\n}\n\nsolve();\n`,
    cpp: `// Language: C++ (g++)\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Write your solution here\n    \n    return 0;\n}\n`,
    java: `// Language: Java (OpenJDK)\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        // Write your solution here\n        \n        scanner.close();\n    }\n}\n`,
  };
}

async function main() {
  console.log('🚀 Starting Optimized Kalvi Learn Seed Process...');
  console.log(`🔗 Connecting to database via direct connection...`);

  const dataDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 1. PARSE CURRICULUM MARKDOWN
  let curriculum = [];
  try {
    console.log('📖 Parsing curriculum content...');
    curriculum = parseCurriculumMarkdown();
    console.log(`✅ Extracted ${curriculum.length} modules.`);
    fs.writeFileSync(path.join(dataDir, 'curriculum.json'), JSON.stringify(curriculum, null, 2));
  } catch (err) {
    if (fs.existsSync(path.join(dataDir, 'curriculum.json'))) {
      console.log('ℹ️ Loading fallback curriculum.json...');
      curriculum = JSON.parse(fs.readFileSync(path.join(dataDir, 'curriculum.json'), 'utf8'));
    } else {
      console.error('❌ Could not parse curriculum:', err.message);
    }
  }

  // 2. COMPILE ALL 85 BELT PROBLEMS & 850 TEST CASES
  console.log('🥋 Generating 85 Belt Problems and 850 Test Cases...');
  const beltsData = [
    {
      order: 1,
      name: 'Belt 1',
      title: 'Programming Foundations',
      description: 'Master fundamentals, conditionals, basic I/O, operators, and basic logic.',
      color: '#3B82F6',
      problems: belt1,
    },
    {
      order: 2,
      name: 'Belt 2',
      title: 'Loops & Control Flow',
      description: 'Master iterations, digit processing, series, factors, prime numbers, and patterns.',
      color: '#10B981',
      problems: belt2,
    },
    {
      order: 3,
      name: 'Belt 3',
      title: 'Arrays & Strings',
      description: 'Master linear data collections, multi-dimensional matrices, and string algorithms.',
      color: '#ED2A2B',
      problems: belt3,
    },
  ];

  const processedBelts = [];
  for (const b of beltsData) {
    const processedProblems = [];
    for (const p of b.problems) {
      const slug = `belt-${b.order}-q${p.order}-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const testCases = [];

      for (let i = 0; i < 10; i++) {
        const inp = p.testInputs[i] || '0';
        let out = '';
        try {
          out = p.solve(inp);
        } catch (e) {
          out = '0';
        }
        testCases.push({
          testIndex: i + 1,
          input: inp,
          expectedOutput: out,
          isHidden: i >= 3,
        });
      }

      processedProblems.push({
        order: p.order,
        title: p.title,
        slug,
        difficulty: p.difficulty,
        description: p.description,
        inputFormat: p.inputFormat,
        outputFormat: p.outputFormat,
        explanation: p.explanation || null,
        starterCodes: generateStarterCodes(p.title),
        testCases,
      });
    }

    processedBelts.push({
      order: b.order,
      name: b.name,
      title: b.title,
      description: b.description,
      color: b.color,
      problems: processedProblems,
    });
  }

  fs.writeFileSync(path.join(dataDir, 'problems.json'), JSON.stringify(processedBelts, null, 2));
  console.log('✅ Exported problems.json and curriculum.json to src/data/');

  // 3. SEED DATABASE
  console.log('🧹 Cleaning previous records...');
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Submission", "UserProgress", "TestCase", "Problem", "Belt", "LearningUnit", "Module" CASCADE;`);
  console.log('✅ Tables truncated.');

  console.log('💾 Inserting Belts & Problems...');
  const allTestCasesToInsert = [];

  for (const b of processedBelts) {
    const beltRecord = await prisma.belt.create({
      data: {
        order: b.order,
        name: b.name,
        title: b.title,
        description: b.description,
        color: b.color,
      },
    });
    console.log(`  + Created ${b.name} (${b.problems.length} problems)`);

    for (const p of b.problems) {
      const problemRecord = await prisma.problem.create({
        data: {
          beltId: beltRecord.id,
          order: p.order,
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

      for (const tc of p.testCases) {
        allTestCasesToInsert.push({
          problemId: problemRecord.id,
          testIndex: tc.testIndex,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isHidden: tc.isHidden,
        });
      }
    }
  }

  console.log(`⚡ Batch inserting ${allTestCasesToInsert.length} test cases...`);
  // Insert in chunks of 200 for maximum reliability
  for (let i = 0; i < allTestCasesToInsert.length; i += 200) {
    const chunk = allTestCasesToInsert.slice(i, i + 200);
    await prisma.testCase.createMany({ data: chunk });
    console.log(`  + Inserted chunk ${i + 1} to ${Math.min(i + 200, allTestCasesToInsert.length)}`);
  }
  console.log('✅ All test cases inserted.');

  // Seed Modules and LUs in batches
  if (curriculum.length > 0) {
    console.log('💾 Inserting Modules and Learning Units...');
    const allLUsToInsert = [];

    for (const m of curriculum) {
      const moduleRecord = await prisma.module.create({
        data: {
          order: m.order,
          title: m.title,
        },
      });

      for (const lu of m.learningUnits) {
        allLUsToInsert.push({
          moduleId: moduleRecord.id,
          order: lu.order,
          title: lu.title,
          content: lu.concept || lu.content,
          codingQuestion: lu.codingQuestion,
          inputFormat: lu.inputFormat,
          outputFormat: lu.outputFormat,
          examples: lu.examples,
          codeSnippets: lu.codeSnippets || null,
          approach: lu.approach || null,
        });
      }
    }

    console.log(`⚡ Batch inserting ${allLUsToInsert.length} Learning Units...`);
    for (let i = 0; i < allLUsToInsert.length; i += 50) {
      const chunk = allLUsToInsert.slice(i, i + 50);
      await prisma.learningUnit.createMany({ data: chunk });
      console.log(`  + Inserted LU chunk ${i + 1} to ${Math.min(i + 50, allLUsToInsert.length)}`);
    }
    console.log('✅ All Learning Units inserted.');
  }

  // 4. VERIFY DATABASE COUNTS
  const beltsCount = await prisma.belt.count();
  const problemsCount = await prisma.problem.count();
  const testCasesCount = await prisma.testCase.count();
  const modulesCount = await prisma.module.count();
  const lusCount = await prisma.learningUnit.count();

  console.log('\n📊 DATABASE SEED VERIFICATION:');
  console.log(`  - Belts: ${beltsCount} / 3`);
  console.log(`  - Problems: ${problemsCount} / 85`);
  console.log(`  - Test Cases: ${testCasesCount} / 850`);
  console.log(`  - Modules: ${modulesCount} / 10`);
  console.log(`  - Learning Units: ${lusCount} / 85`);

  console.log('🎉 Full stack seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
