import fs from 'node:fs'
import path from 'node:path'
import { CODING_TOPICS, normalizeTopicTitle } from '../src/coding/topics'

export function inspectQuestionBank(filePath: string) {
  const fullPath = path.resolve(filePath)
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`)
    return null
  }

  const stat = fs.statSync(fullPath)
  const content = fs.readFileSync(fullPath, 'utf-8')

  // Top-level sections (# Topic)
  const rawSections = content.split(/\n# (?=[A-Z0-9])/g)
  let topicCount = 0
  for (const s of rawSections) {
    const firstLine = s.split('\n')[0].trim()
    if (
      firstLine.includes('Topic-Wise Programming Question Bank') ||
      firstLine.includes('Validation Summary') ||
      firstLine.includes('Topic Distribution')
    ) {
      continue
    }
    if (normalizeTopicTitle(firstLine)) {
      topicCount++
    }
  }

  const questionMatches = content.match(/\n## Question \d+\s*[-—–]/g) || []
  const questionCount = questionMatches.length

  const ex1Matches = content.match(/### Worked Example 1/g) || []
  const ex2Matches = content.match(/### Worked Example 2/g) || []
  const ex3Matches = content.match(/### Worked Example 3/g) || []
  const totalWorkedExamples = ex1Matches.length + ex2Matches.length + ex3Matches.length

  // Test Case counts (1-10)
  // Accommodate ###, ####, ##### and with/without Visible/Hidden label
  const countTestCase = (num: number, labelPattern?: RegExp) => {
    const regex = new RegExp(`#{3,5}\\s*Test Case\\s+${num}\\b(?:\\s*[-—–]\\s*([^\\n]*))?`, 'gi')
    let count = 0
    let m: RegExpExecArray | null
    while ((m = regex.exec(content)) !== null) {
      const label = m[1] || ''
      if (!labelPattern || labelPattern.test(label)) {
        count++
      }
    }
    return count
  }

  const tc1 = countTestCase(1)
  const tc2 = countTestCase(2)
  const tc3 = countTestCase(3)
  const totalVisibleTests = tc1 + tc2 + tc3

  const tc4 = countTestCase(4)
  const tc5 = countTestCase(5)
  const tc6 = countTestCase(6)
  const tc7 = countTestCase(7)
  const tc8 = countTestCase(8)
  const tc9 = countTestCase(9)
  const tc10 = countTestCase(10)
  const totalHiddenTests = tc4 + tc5 + tc6 + tc7 + tc8 + tc9 + tc10

  const totalJudgeTests = totalVisibleTests + totalHiddenTests

  const report = {
    source: {
      filename: path.basename(fullPath),
      fullPath,
      sizeBytes: stat.size,
      mtime: stat.mtime.toISOString(),
    },
    content: {
      topicCount,
      questionCount,
      ex1Count: ex1Matches.length,
      ex2Count: ex2Matches.length,
      ex3Count: ex3Matches.length,
      totalWorkedExamples,
    },
    testCases: {
      tc1,
      tc2,
      tc3,
      totalVisibleTests,
      tc4,
      tc5,
      tc6,
      tc7,
      tc8,
      tc9,
      tc10,
      totalHiddenTests,
      totalJudgeTests,
    },
  }

  console.log('====================================================')
  console.log('📊 SOURCE BANK INSPECTION REPORT')
  console.log('====================================================')
  console.log(`SOURCE:`)
  console.log(`  Filename: ${report.source.filename}`)
  console.log(`  File size: ${report.source.sizeBytes} bytes`)
  console.log(`  Modification date: ${report.source.mtime}`)
  console.log(`\nCONTENT:`)
  console.log(`  Topic count: ${report.content.topicCount}`)
  console.log(`  Question count: ${report.content.questionCount}`)
  console.log(`  Worked Example 1 count: ${report.content.ex1Count}`)
  console.log(`  Worked Example 2 count: ${report.content.ex2Count}`)
  console.log(`  Worked Example 3 count: ${report.content.ex3Count}`)
  console.log(`  Total Worked Examples: ${report.content.totalWorkedExamples}`)
  console.log(`\nTEST CASES:`)
  console.log(`  Test Case 1 Visible: ${report.testCases.tc1}`)
  console.log(`  Test Case 2 Visible: ${report.testCases.tc2}`)
  console.log(`  Test Case 3 Visible: ${report.testCases.tc3}`)
  console.log(`  Total Visible Tests: ${report.testCases.totalVisibleTests}`)
  console.log(`  Test Case 4 Hidden: ${report.testCases.tc4}`)
  console.log(`  Test Case 5 Hidden: ${report.testCases.tc5}`)
  console.log(`  Test Case 6 Hidden: ${report.testCases.tc6}`)
  console.log(`  Test Case 7 Hidden: ${report.testCases.tc7}`)
  console.log(`  Test Case 8 Hidden: ${report.testCases.tc8}`)
  console.log(`  Test Case 9 Hidden: ${report.testCases.tc9}`)
  console.log(`  Test Case 10 Hidden: ${report.testCases.tc10}`)
  console.log(`  Total Hidden Tests: ${report.testCases.totalHiddenTests}`)
  console.log(`  Total Judge Tests: ${report.testCases.totalJudgeTests}`)
  console.log('====================================================')

  return report
}

const target = process.argv[2] || 'Topic_Wise_740_Unique_Programming_Questions.md'
inspectQuestionBank(target)
