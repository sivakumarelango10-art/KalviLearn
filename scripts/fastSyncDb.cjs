const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fastSync() {
  console.log('========================================================================');
  console.log('⚡ FAST DATABASE SYNC ENGINE FOR 500 PROBLEMS & 5,000 TEST CASES');
  console.log('========================================================================\n');

  const clientBelts = JSON.parse(fs.readFileSync('src/data/problems.json', 'utf8'));
  const serverTestCasesObj = JSON.parse(fs.readFileSync('src/server/data/serverTestCases.json', 'utf8'));

  const dbBelts = await prisma.belt.findMany({ orderBy: { order: 'asc' } });
  const dbBeltMap = new Map();
  dbBelts.forEach((b) => dbBeltMap.set(b.order, b.id));

  // 1. Fetch existing problems
  const existingProblems = await prisma.problem.findMany();
  console.log(`Found ${existingProblems.length} existing problems in DB.`);

  const existingByBeltAndOrder = new Map();
  existingProblems.forEach((p) => {
    existingByBeltAndOrder.set(`${p.beltId}_${p.order}`, p);
  });

  const problemsToCreate = [];
  const problemIdMap = new Map(); // slug -> problemId

  // 2. Update existing problems in-place & prepare new ones
  console.log('Updating existing problems and collecting new problems...');
  let updatedCount = 0;

  for (const belt of clientBelts) {
    const beltId = dbBeltMap.get(belt.order);
    if (!beltId) throw new Error(`Belt ${belt.order} not found in DB!`);

    for (const p of belt.problems) {
      const existing = existingByBeltAndOrder.get(`${beltId}_${p.order}`);
      if (existing) {
        // Update in place to preserve submissions and progress
        await prisma.problem.update({
          where: { id: existing.id },
          data: {
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
        problemIdMap.set(p.slug, existing.id);
        updatedCount++;
      } else {
        problemsToCreate.push({
          beltId,
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
        });
      }
    }
  }

  console.log(`Updated ${updatedCount} existing problems in place.`);

  // 3. Batch create remaining problems
  if (problemsToCreate.length > 0) {
    console.log(`Batch creating ${problemsToCreate.length} new problems in chunks of 50...`);
    const chunkSize = 50;
    for (let i = 0; i < problemsToCreate.length; i += chunkSize) {
      const chunk = problemsToCreate.slice(i, i + chunkSize);
      await prisma.problem.createMany({
        data: chunk,
        skipDuplicates: true,
      });
      console.log(`  - Inserted problems ${i + 1} to ${Math.min(i + chunkSize, problemsToCreate.length)}`);
    }
  }

  // Reload all problems to get full problemIdMap
  const allDbProblems = await prisma.problem.findMany({ select: { id: true, slug: true } });
  allDbProblems.forEach((p) => problemIdMap.set(p.slug, p.id));
  console.log(`Total problems in DB now: ${allDbProblems.length}`);

  // 4. Batch delete and insert TestCases
  console.log('Batch syncing 5,000 test cases...');
  const allProblemIds = Array.from(problemIdMap.values());

  // Clean old test cases in chunks of 100 problem IDs
  for (let i = 0; i < allProblemIds.length; i += 100) {
    const pIdChunk = allProblemIds.slice(i, i + 100);
    await prisma.testCase.deleteMany({
      where: { problemId: { in: pIdChunk } },
    });
  }
  console.log('Cleaned old test cases.');

  // Prepare all 5,000 test cases
  const allTestCases = [];
  for (const belt of clientBelts) {
    for (const p of belt.problems) {
      const problemId = problemIdMap.get(p.slug);
      if (!problemId) throw new Error(`Missing problemId for slug: ${p.slug}`);

      const fullCases = serverTestCasesObj[p.slug]?.testCases || [];
      fullCases.forEach((tc) => {
        const tcExplanation =
          tc.testIndex === 1 && p.examples && p.examples[0]
            ? p.examples[0].explanation
            : tc.testIndex === 2 && p.examples && p.examples[1]
            ? p.examples[1].explanation
            : null;

        allTestCases.push({
          problemId,
          testIndex: tc.testIndex,
          input: tc.input || '',
          expectedOutput: tc.expectedOutput || '',
          isHidden: tc.isHidden || tc.testIndex > 3,
          explanation: tcExplanation,
        });
      });
    }
  }

  console.log(`Inserting ${allTestCases.length} test cases in chunks of 500...`);
  const tcChunkSize = 500;
  for (let i = 0; i < allTestCases.length; i += tcChunkSize) {
    const chunk = allTestCases.slice(i, i + tcChunkSize);
    await prisma.testCase.createMany({
      data: chunk,
    });
    console.log(`  - Inserted test cases ${i + 1} to ${Math.min(i + tcChunkSize, allTestCases.length)}`);
  }

  // 5. Final verification
  const finalProblemsCount = await prisma.problem.count();
  const finalTestCasesCount = await prisma.testCase.count();
  const finalBeltsCount = await prisma.belt.count();

  console.log('\n========================================================================');
  console.log('🏁 FAST DATABASE SYNC COMPLETE:');
  console.log(`  - Belts count:      ${finalBeltsCount} (Expected: 10)`);
  console.log(`  - Problems count:   ${finalProblemsCount} (Expected: 500)`);
  console.log(`  - Test cases count: ${finalTestCasesCount} (Expected: 5000)`);
  console.log('========================================================================\n');

  await prisma.$disconnect();
}

fastSync().catch((err) => {
  console.error('❌ Fast sync failed:', err);
  process.exit(1);
});
