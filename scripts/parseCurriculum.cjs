const fs = require('fs');
const path = require('path');

/**
 * Robust, AST-grade curriculum parser for KalviLearn Markdown.
 * Supports both learning.md and KalviLearn_Modules_1_to_10_FINAL_PERFECT_Content.md.
 */
function resolveCurriculumFilePath(explicitPath) {
  if (explicitPath && fs.existsSync(explicitPath)) {
    return explicitPath;
  }
  const rootDir = path.join(__dirname, '..');
  const candidate1 = path.join(rootDir, 'KalviLearn_Modules_1_to_10_FINAL_PERFECT_Content.md');
  const candidate2 = path.join(rootDir, 'learning.md');

  if (fs.existsSync(candidate1)) return candidate1;
  if (fs.existsSync(candidate2)) return candidate2;
  throw new Error(`Curriculum content file not found. Looked for:\n - ${candidate1}\n - ${candidate2}`);
}

const MODULE_TITLES = {
  1: 'Programming Foundations',
  2: 'Loops & Control Flow',
  3: 'Arrays & Strings',
  4: 'Array Problem-Solving Techniques',
  5: 'Linear Data Structures',
  6: 'Recursion & Backtracking',
  7: 'Binary Search & Greedy',
  8: 'Trees',
  9: 'Graphs',
  10: 'Advanced Problem Solving'
};

const MODULE_DESCRIPTIONS = {
  1: 'Master programming foundations, variables, operators, conditionals, and core I/O mechanics across Python, C++, Java, and JavaScript.',
  2: 'Master loop constructs, nested iterations, number manipulation, series calculation, and prime factorization.',
  3: 'Master array storage, multi-dimensional traversal, pointer manipulation, and string processing techniques.',
  4: 'Master subarray analysis, prefix sums, two-pointer techniques, sliding windows, and hashing patterns.',
  5: 'Master foundational linear data structures: linked lists, stacks, queues, deques, heaps, and cache design.',
  6: 'Master recursive decomposition, call-stack mechanics, backtracking, and combinatorial search spaces.',
  7: 'Master logarithmic searching, boundary predicates, monotonic functions, and greedy optimization choices.',
  8: 'Master hierarchical data structures, binary trees, BST invariant operations, and depth/breadth traversals.',
  9: 'Master graph representations, BFS/DFS traversal, cycle detection, topological sorting, and shortest path algorithms.',
  10: 'Master dynamic programming states and transitions, memoization, tabulation, and bitwise manipulation.'
};

function parseSingleExample(text) {
  const inputIdx = text.search(/^Example Input\s*$/m);
  const visualIdx = text.search(/^Visual representation\s*$/m);
  const outputIdx = text.search(/^Output\s*$/m);
  const explanationIdx = text.search(/^Explanation\s*$/m);

  let input = '';
  let visual = '';
  let output = '';
  let explanation = '';

  if (inputIdx !== -1) {
    const end = (visualIdx !== -1) ? visualIdx : ((outputIdx !== -1) ? outputIdx : text.length);
    input = text.substring(inputIdx + 'Example Input'.length, end).trim();
  }

  if (visualIdx !== -1) {
    const end = (outputIdx !== -1) ? outputIdx : text.length;
    visual = text.substring(visualIdx + 'Visual representation'.length, end).trim();
  }

  if (outputIdx !== -1) {
    const end = (explanationIdx !== -1) ? explanationIdx : text.length;
    output = text.substring(outputIdx + 'Output'.length, end).trim();
  }

  if (explanationIdx !== -1) {
    explanation = text.substring(explanationIdx + 'Explanation'.length).trim();
  }

  const example = {
    input,
    output,
    explanation
  };
  if (visual) {
    example.visual = visual;
  }
  return example;
}

function parseLUBlock(moduleId, order, title, block) {
  const conceptIdx = block.search(/^Concept\s*$/m);
  const approachIdx = block.search(/^How to approach this LU\s*$/m);
  const codeSyntaxIdx = block.search(/^Code syntax\s*\/\s*core snippet\s*$/m);
  const ioFormatIdx = block.search(/^Input and Output Format\s*$/m);
  const workedExamplesIdx = block.search(/^Worked examples\s*$/m);

  // 1. Concept
  let conceptText = '';
  if (conceptIdx !== -1) {
    const end = (approachIdx !== -1) ? approachIdx : (codeSyntaxIdx !== -1 ? codeSyntaxIdx : block.length);
    conceptText = block.substring(conceptIdx + 'Concept'.length, end).trim();
  }

  // 2. Approach
  let approachText = '';
  if (approachIdx !== -1) {
    const end = (codeSyntaxIdx !== -1) ? codeSyntaxIdx : (ioFormatIdx !== -1 ? ioFormatIdx : block.length);
    approachText = block.substring(approachIdx + 'How to approach this LU'.length, end).trim();
  }

  // 3. Code Snippets in all 4 languages
  const codeSnippets = {
    python: '',
    cpp: '',
    java: '',
    javascript: ''
  };

  if (codeSyntaxIdx !== -1) {
    const end = (ioFormatIdx !== -1) ? ioFormatIdx : (workedExamplesIdx !== -1 ? workedExamplesIdx : block.length);
    const codeBlock = block.substring(codeSyntaxIdx + 'Code syntax / core snippet'.length, end);

    const pyIdx = codeBlock.search(/^Python\s*$/m);
    const cppIdx = codeBlock.search(/^C\+\+\s*$/m);
    const javaIdx = codeBlock.search(/^Java\s*$/m);
    const jsIdx = codeBlock.search(/^JavaScript\s*$/m);

    if (pyIdx !== -1 && cppIdx !== -1) {
      codeSnippets.python = codeBlock.substring(pyIdx + 'Python'.length, cppIdx).trim();
    }
    if (cppIdx !== -1 && javaIdx !== -1) {
      codeSnippets.cpp = codeBlock.substring(cppIdx + 'C++'.length, javaIdx).trim();
    }
    if (javaIdx !== -1 && jsIdx !== -1) {
      codeSnippets.java = codeBlock.substring(javaIdx + 'Java'.length, jsIdx).trim();
    }
    if (jsIdx !== -1) {
      codeSnippets.javascript = codeBlock.substring(jsIdx + 'JavaScript'.length).trim();
    }
  }

  // 4. Input and Output Format
  let inputFormat = '';
  let outputFormat = '';
  if (ioFormatIdx !== -1) {
    const end = (workedExamplesIdx !== -1) ? workedExamplesIdx : block.length;
    const ioBlock = block.substring(ioFormatIdx + 'Input and Output Format'.length, end).trim();

    const inputMatch = ioBlock.match(/Input:\s*([\s\S]*?)(?=Output:|$)/i);
    const outputMatch = ioBlock.match(/Output:\s*([\s\S]*)$/i);

    if (inputMatch) {
      inputFormat = inputMatch[1].trim();
    }
    if (outputMatch) {
      outputFormat = outputMatch[1].trim();
    }
  }

  // 5. Worked Examples
  const examples = [];
  if (workedExamplesIdx !== -1) {
    const examplesBlock = block.substring(workedExamplesIdx + 'Worked examples'.length).trim();
    
    const exRegex = /^Example\s+(\d+)\s*$/gm;
    const exMatches = [];
    let exM;
    while ((exM = exRegex.exec(examplesBlock)) !== null) {
      exMatches.push({
        num: parseInt(exM[1], 10),
        startIndex: exM.index,
        headerLength: exM[0].length
      });
    }

    for (let j = 0; j < exMatches.length; j++) {
      const curEx = exMatches[j];
      const start = curEx.startIndex + curEx.headerLength;
      const end = (j < exMatches.length - 1) ? exMatches[j + 1].startIndex : examplesBlock.length;
      const singleExText = examplesBlock.substring(start, end).trim();

      const exampleObj = parseSingleExample(singleExText);
      examples.push(exampleObj);
    }
  }

  const codingQuestion = outputFormat ? `**${title}**\n\n${outputFormat}` : `**${title}**`;

  return {
    order,
    title,
    concept: conceptText,
    content: conceptText, // Backward compatibility
    approach: approachText,
    codeSnippets,
    codingQuestion,
    inputFormat: inputFormat ? `Input: ${inputFormat}` : '',
    outputFormat: outputFormat ? `Output: ${outputFormat}` : '',
    examples,
    readingTimeMinutes: Math.max(2, Math.ceil((conceptText.split(/\s+/).length + approachText.split(/\s+/).length) / 80))
  };
}

function parseCurriculumMarkdown(filePath) {
  const resolvedPath = resolveCurriculumFilePath(filePath);
  const content = fs.readFileSync(resolvedPath, 'utf8');

  const luRegex = /^M(\d+)-LU(\d+)\s+[—-]\s+(.+)$/gm;
  const luMatches = [];
  let m;
  while ((m = luRegex.exec(content)) !== null) {
    luMatches.push({
      fullHeader: m[0].trim(),
      moduleId: parseInt(m[1], 10),
      order: parseInt(m[2], 10),
      title: m[3].trim(),
      startIndex: m.index
    });
  }

  const modulesMap = new Map();
  for (let modNum = 1; modNum <= 10; modNum++) {
    modulesMap.set(modNum, {
      order: modNum,
      title: MODULE_TITLES[modNum] || `Module ${modNum}`,
      description: MODULE_DESCRIPTIONS[modNum] || '',
      learningUnits: []
    });
  }

  for (let i = 0; i < luMatches.length; i++) {
    const currentLU = luMatches[i];
    const textStart = currentLU.startIndex + currentLU.fullHeader.length;
    const textEnd = (i < luMatches.length - 1) ? luMatches[i + 1].startIndex : content.length;
    
    let rawBlock = content.substring(textStart, textEnd).trim();
    rawBlock = rawBlock.replace(/\n*Belt\s+\d+\s+[—-]\s+Module\s+\d+[\s\S]*$/, '').trim();

    const parsedLU = parseLUBlock(currentLU.moduleId, currentLU.order, currentLU.title, rawBlock);
    
    if (modulesMap.has(currentLU.moduleId)) {
      modulesMap.get(currentLU.moduleId).learningUnits.push(parsedLU);
    }
  }

  return Array.from(modulesMap.values());
}

module.exports = {
  parseCurriculumMarkdown,
  resolveCurriculumFilePath,
  MODULE_TITLES,
  MODULE_DESCRIPTIONS
};
