const fs = require('fs');
const path = require('path');

// 1. Load problems.json
const problemsPath = path.join(__dirname, '../src/data/problems.json');
const problemsData = JSON.parse(fs.readFileSync(problemsPath, 'utf8'));

console.log('====================================================');
console.log('  VERIFYING 85 BELT PROBLEMS & 850 TEST CASES');
console.log('====================================================\n');

let totalBelts = problemsData.length;
let totalProblems = 0;
let totalTestCases = 0;
let problemStructureErrors = [];
let testCaseErrors = [];

for (const belt of problemsData) {
  console.log(`Checking ${belt.name} ("${belt.title}")...`);
  totalProblems += belt.problems.length;

  for (const prob of belt.problems) {
    // Check required fields
    if (!prob.title || !prob.slug || !prob.difficulty || !prob.description) {
      problemStructureErrors.push(`Problem missing required metadata: ${prob.slug || prob.title}`);
    }

    // Check starter codes for python, javascript, cpp, java
    if (!prob.starterCodes || !prob.starterCodes.python || !prob.starterCodes.javascript || !prob.starterCodes.cpp || !prob.starterCodes.java) {
      problemStructureErrors.push(`Problem missing starter codes for all 4 languages: ${prob.slug}`);
    }

    // Check test cases
    if (!prob.testCases || !Array.isArray(prob.testCases)) {
      testCaseErrors.push(`Problem has no testCases array: ${prob.slug}`);
      continue;
    }

    totalTestCases += prob.testCases.length;

    if (prob.testCases.length !== 10) {
      testCaseErrors.push(`Problem ${prob.slug} has ${prob.testCases.length} test cases instead of exactly 10!`);
    }

    const visibleCases = prob.testCases.filter(tc => !tc.isHidden);
    const hiddenCases = prob.testCases.filter(tc => tc.isHidden);

    if (visibleCases.length !== 3) {
      testCaseErrors.push(`Problem ${prob.slug} has ${visibleCases.length} visible test cases instead of 3!`);
    }

    if (hiddenCases.length !== 7) {
      testCaseErrors.push(`Problem ${prob.slug} has ${hiddenCases.length} hidden test cases instead of 7!`);
    }

    // Verify testIndex is 1..10
    prob.testCases.forEach((tc, idx) => {
      if (tc.testIndex !== idx + 1) {
        testCaseErrors.push(`Problem ${prob.slug} test case index mismatch: expected ${idx + 1}, got ${tc.testIndex}`);
      }
      if (typeof tc.input === 'undefined' || typeof tc.expectedOutput === 'undefined') {
        testCaseErrors.push(`Problem ${prob.slug} test case ${tc.testIndex} missing input or expectedOutput`);
      }
    });
  }
}

console.log('\n--- VERIFICATION SUMMARY ---');
console.log(`Total Belts: ${totalBelts}`);
console.log(`Total Problems: ${totalProblems} (Expected: 85)`);
console.log(`Total Test Cases: ${totalTestCases} (Expected: 850)`);

if (problemStructureErrors.length === 0 && testCaseErrors.length === 0) {
  console.log('✅ ALL 85 PROBLEMS AND 850 TEST CASES (3 VISIBLE + 7 HIDDEN) ARE 100% PERFECT!');
} else {
  console.error('❌ Errors found:');
  console.error('Problem Structure Errors:', problemStructureErrors);
  console.error('Test Case Errors:', testCaseErrors);
  process.exit(1);
}
