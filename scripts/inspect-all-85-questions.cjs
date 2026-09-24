const fs = require('fs');

const qbContent = fs.readFileSync('KalviLearn_Question_Bank_Regenerated.md', 'utf8');
const tcContent = fs.readFileSync('KalviLearn_Test_Cases_Regenerated.md', 'utf8');

// Parse QB
const qbSections = qbContent.split(/^### (M\d+-LU\d+) — (.*)$/gm);
const questions = [];

for (let i = 1; i < qbSections.length; i += 3) {
  const id = qbSections[i];
  const title = qbSections[i + 1].trim();
  const body = qbSections[i + 2];

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
      input: inputMatch ? inputMatch[1].trim() : '',
      output: outputMatch ? outputMatch[1].trim() : '',
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

  questions.push({
    id,
    title,
    description,
    inputFormat,
    outputFormat,
    constraints,
    examples,
  });
}

// Parse TC
const tcSections = tcContent.split(/^## (M\d+-LU\d+) — (.*)$/gm);
const testCasesByQuestion = new Map();

for (let i = 1; i < tcSections.length; i += 3) {
  const id = tcSections[i];
  const title = tcSections[i + 1].trim();
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

    // Standardize newline formatting: trim trailing newlines but preserve internal content
    cases.push({
      testIndex: caseNum,
      input: rawInput.replace(/\r\n/g, '\n').replace(/\n$/, ''),
      expectedOutput: rawOutput.replace(/\r\n/g, '\n').replace(/\n$/, ''),
      isHidden: caseNum > 3,
    });
  }

  testCasesByQuestion.set(id, cases);
}

console.log('=== PARSING SUMMARY ===');
console.log('Total Questions in QB:', questions.length);
console.log('Total Questions in TC:', testCasesByQuestion.size);

let orphanQuestions = [];
let orphanTestCases = [];
let mismatchedCaseCounts = [];

questions.forEach((q) => {
  const tcs = testCasesByQuestion.get(q.id);
  if (!tcs) {
    orphanQuestions.push(q.id);
  } else if (tcs.length !== 10) {
    mismatchedCaseCounts.push({ id: q.id, count: tcs.length });
  }
});

for (const id of testCasesByQuestion.keys()) {
  if (!questions.find((q) => q.id === id)) {
    orphanTestCases.push(id);
  }
}

console.log('Orphan Questions (no TC):', orphanQuestions.length);
console.log('Orphan Test Cases (no Q):', orphanTestCases.length);
console.log('Questions with case count != 10:', mismatchedCaseCounts.length);

// Verify Worked Examples vs Test Cases 1 and 2
let exampleMismatches = 0;
questions.forEach((q) => {
  const tcs = testCasesByQuestion.get(q.id);
  if (tcs && q.examples.length > 0) {
    // Check Example 1 vs Test Case 1
    const ex1 = q.examples[0];
    const tc1 = tcs[0];
    if (ex1.input !== tc1.input || ex1.output !== tc1.expectedOutput) {
      exampleMismatches++;
      console.log(`Example 1 mismatch for ${q.id}:`);
      console.log('  Ex1 Input:', JSON.stringify(ex1.input), 'TC1 Input:', JSON.stringify(tc1.input));
      console.log('  Ex1 Output:', JSON.stringify(ex1.output), 'TC1 Output:', JSON.stringify(tc1.expectedOutput));
    }
  }
});

console.log('Example 1 vs TC 1 mismatches:', exampleMismatches);
