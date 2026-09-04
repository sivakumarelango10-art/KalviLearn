const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 1. PARSE LEARN.MD
function parseLearnMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const modules = [];

  // Split by top-level # Module
  const moduleBlocks = content.split(/\n(?=# Module \d+ --- )/);

  for (const block of moduleBlocks) {
    const moduleMatch = block.match(/^# Module (\d+) --- ([^\n]+)/);
    if (!moduleMatch) continue;

    const moduleNum = parseInt(moduleMatch[1], 10);
    const moduleTitle = moduleMatch[2].trim();

    const luBlocks = block.split(/\n(?=## LU \d+ --- )/);
    const learningUnits = [];

    for (let i = 1; i < luBlocks.length; i++) {
      const luBlock = luBlocks[i];
      const luMatch = luBlock.match(/^## LU (\d+) --- ([^\n]+)/);
      if (!luMatch) continue;

      const luNum = parseInt(luMatch[1], 10);
      const luTitle = luMatch[2].trim();

      // Extract sections
      const extractSection = (secName, nextSecPattern) => {
        const regex = new RegExp(`### \\d+\\. ${secName}\\s*\\n([\\s\\S]*?)(?=${nextSecPattern}|$)`, 'i');
        const m = luBlock.match(regex);
        return m ? m[1].trim() : '';
      };

      const contentToLearn = extractSection('Content to Learn', '### \\d+\\. Coding Question');
      const codingQuestion = extractSection('Coding Question', '### \\d+\\. Input Format');
      const inputFormat = extractSection('Input Format', '### \\d+\\. Output Format');
      const outputFormat = extractSection('Output Format', '### \\d+\\. Example');

      // Extract examples
      const examples = [];
      const exampleMatches = luBlock.matchAll(/### \d+\. Example \d+\s*\n([\s\S]*?)(?=### \d+\. Example|\n## |$)/gi);

      for (const exMatch of exampleMatches) {
        const exText = exMatch[1];
        const inMatch = exText.match(/\*\*Example Input\*\*\s*```[a-z]*\s*\n([\s\S]*?)```/i);
        const outMatch = exText.match(/\*\*Example Output\*\*\s*```[a-z]*\s*\n([\s\S]*?)```/i);
        const expMatch = exText.match(/\*\*Example Explanation\*\*\s*\n([\s\S]*?)(?=###|$)/i);

        examples.push({
          input: inMatch ? inMatch[1].trim() : '',
          output: outMatch ? outMatch[1].trim() : '',
          explanation: expMatch ? expMatch[1].trim() : '',
        });
      }

      learningUnits.push({
        order: luNum,
        title: luTitle,
        content: contentToLearn,
        codingQuestion,
        inputFormat,
        outputFormat,
        examples,
      });
    }

    modules.push({
      order: moduleNum,
      title: moduleTitle,
      learningUnits,
    });
  }

  return modules;
}

module.exports = { parseLearnMarkdown };
