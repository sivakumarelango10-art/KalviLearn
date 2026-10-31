const fs = require('fs');
const path = require('path');

const cases = require('../src/server/data/serverTestCases.json');
const problemsData = require('../src/data/problems.json');

console.log('====================================================');
console.log('🔍 AUDITING ALL 85 PROBLEMS & 850 TEST CASES');
console.log('====================================================\n');

let issuesFound = 0;

// 1. Audit Problem Catalog
const allProblemsInCatalog = [];
for (const belt of problemsData) {
  for (const p of belt.problems) {
    allProblemsInCatalog.push(p);
  }
}

console.log(`Total problems in catalog: ${allProblemsInCatalog.length}`);
if (allProblemsInCatalog.length !== 85) {
  console.error(`❌ Expected 85 problems in catalog, found ${allProblemsInCatalog.length}`);
  issuesFound++;
} else {
  console.log('✅ Exactly 85 problems in problems.json');
}

// 2. Audit Server Test Cases
const serverSlugs = Object.keys(cases);
console.log(`Total problems in serverTestCases.json: ${serverSlugs.length}`);

for (const p of allProblemsInCatalog) {
  const serverProblem = cases[p.slug];
  if (!serverProblem) {
    console.error(`❌ Missing server test cases for slug: "${p.slug}"`);
    issuesFound++;
    continue;
  }

  const tcList = serverProblem.testCases || [];
  if (tcList.length !== 10) {
    console.error(`❌ Problem "${p.slug}" has ${tcList.length} test cases instead of 10!`);
    issuesFound++;
  }

  // Audit each test case
  tcList.forEach((tc, idx) => {
    if (tc.expectedOutput === undefined || tc.expectedOutput === null) {
      console.error(`❌ Problem "${p.slug}" test case #${idx + 1} has undefined expectedOutput!`);
      issuesFound++;
    }
    if (tc.input === undefined || tc.input === null) {
      console.error(`❌ Problem "${p.slug}" test case #${idx + 1} has undefined input!`);
      issuesFound++;
    }
  });
}

console.log('\n====================================================');
if (issuesFound === 0) {
  console.log('🎉 AUDIT COMPLETE: ALL 85 PROBLEMS & 850 TEST CASES ARE 100% VALID!');
} else {
  console.error(`❌ AUDIT FOUND ${issuesFound} ISSUES.`);
  process.exit(1);
}
console.log('====================================================\n');
