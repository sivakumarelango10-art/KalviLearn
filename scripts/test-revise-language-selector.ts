/**
 * Focused Regression Test: KalviLearn Revise Language Selector Clean Rendering
 *
 * Verifies:
 * 1. The Revise language selector renders all expected language names (Python, Java, Node.js, C++).
 * 2. Java has no unwanted trailing characters (e.g. 未 or other malformed symbols).
 * 3. Node.js has no unwanted trailing characters.
 * 4. C++ has no unwanted trailing characters.
 * 5. Python (and any solved language) retains its legitimate existing indicator (emerald status dot).
 * 6. All four languages remain selectable (interactive switch handlers wired).
 * 7. No unintended icon, Unicode CJK artifact, or CSS-generated content appears beside the affected names.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

async function runReviseLanguageSelectorSuite() {
  console.log('========================================================================')
  console.log('🔍 REGRESSION TEST: REVISE LANGUAGE SELECTOR CLEAN RENDERING (7 CHECKS)')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function pass(testNum: number, desc: string, details?: string) {
    passed++
    console.log(`  ✅ [TEST ${testNum}] ${desc}`)
    if (details) console.log(`     ↳ ${details}`)
  }

  function fail(testNum: number, desc: string, err: any) {
    failed++
    console.error(`  ❌ [TEST ${testNum}] ${desc}:`, err)
  }

  const revisePagePath = path.resolve('src/pages/RevisePage.tsx')
  const reviseSource = fs.readFileSync(revisePagePath, 'utf-8')

  // TEST 1: The Revise language selector renders all expected language names
  try {
    assert(reviseSource.includes("python: 'Python'"), 'LANGUAGE_LABELS must define Python')
    assert(reviseSource.includes("java: 'Java'"), 'LANGUAGE_LABELS must define Java')
    assert(reviseSource.includes("nodejs: 'Node.js'"), 'LANGUAGE_LABELS must define Node.js')
    assert(reviseSource.includes("cpp: 'C++'"), 'LANGUAGE_LABELS must define C++')

    // Extract ALL_LANGUAGES definition
    const allLangsMatch = reviseSource.match(/ALL_LANGUAGES:\s*LanguageKey\[\]\s*=\s*\[([^\]]+)\]/)
    assert(allLangsMatch, 'ALL_LANGUAGES array must be defined')
    const langKeys = allLangsMatch[1].split(',').map((s) => s.trim().replace(/['"]/g, ''))
    assert.deepStrictEqual(langKeys, ['python', 'java', 'nodejs', 'cpp'], 'Must include all 4 languages')

    pass(1, 'All expected language names defined cleanly', 'Python, Java, Node.js, C++ configured in ALL_LANGUAGES and LANGUAGE_LABELS')
  } catch (err) {
    fail(1, 'Language names definition check failed', err)
  }

  // TEST 2: Java has no unwanted trailing characters (e.g. 未)
  try {
    const javaLabelMatch = reviseSource.match(/java:\s*'([^']+)'/)
    assert(javaLabelMatch, 'Java label must exist')
    assert.strictEqual(javaLabelMatch[1], 'Java', 'Java label must be strictly "Java"')
    assert(!javaLabelMatch[1].includes('未'), 'Java label must not contain 未')
    assert(!/[\u4e00-\u9fa5]/.test(javaLabelMatch[1]), 'Java label must not contain any CJK characters')

    pass(2, 'Java has no unwanted trailing characters', 'Java label is strictly "Java" with 0 trailing symbols')
  } catch (err) {
    fail(2, 'Java label check failed', err)
  }

  // TEST 3: Node.js has no unwanted trailing characters
  try {
    const nodeLabelMatch = reviseSource.match(/nodejs:\s*'([^']+)'/)
    assert(nodeLabelMatch, 'Node.js label must exist')
    assert.strictEqual(nodeLabelMatch[1], 'Node.js', 'Node.js label must be strictly "Node.js"')
    assert(!nodeLabelMatch[1].includes('未'), 'Node.js label must not contain 未')
    assert(!/[\u4e00-\u9fa5]/.test(nodeLabelMatch[1]), 'Node.js label must not contain any CJK characters')

    pass(3, 'Node.js has no unwanted trailing characters', 'Node.js label is strictly "Node.js" with 0 trailing symbols')
  } catch (err) {
    fail(3, 'Node.js label check failed', err)
  }

  // TEST 4: C++ has no unwanted trailing characters
  try {
    const cppLabelMatch = reviseSource.match(/cpp:\s*'([^']+)'/)
    assert(cppLabelMatch, 'C++ label must exist')
    assert.strictEqual(cppLabelMatch[1], 'C++', 'C++ label must be strictly "C++"')
    assert(!cppLabelMatch[1].includes('未'), 'C++ label must not contain 未')
    assert(!/[\u4e00-\u9fa5]/.test(cppLabelMatch[1]), 'C++ label must not contain any CJK characters')

    pass(4, 'C++ has no unwanted trailing characters', 'C++ label is strictly "C++" with 0 trailing symbols')
  } catch (err) {
    fail(4, 'C++ label check failed', err)
  }

  // TEST 5: Python (and solved languages) retains legitimate status indicator
  try {
    // Extract the Interactive Multi-Language Switcher block
    const switcherBlockMatch = reviseSource.match(/{\/\* Interactive Multi-Language Switcher \*\/}[\s\S]*?<\/div>\s*<\/div>\s*{\/\* Action Buttons \*\/}/)
    assert(switcherBlockMatch, 'Interactive Multi-Language Switcher block must exist')
    const switcherBlock = switcherBlockMatch[0]

    // Verify emerald status dot for solved languages is preserved
    assert(switcherBlock.includes('isSolved && ('), 'Must conditionally render status indicator when isSolved is true')
    assert(switcherBlock.includes('w-1.5 h-1.5 rounded-full'), 'Must render small rounded status indicator dot')
    assert(switcherBlock.includes('bg-emerald-400') || switcherBlock.includes('bg-emerald-500'), 'Must render emerald color indicator')

    // Verify that unsolved state renders NO trailing character
    assert(!switcherBlock.includes('未'), 'Switcher block must NOT contain the "未" character')
    assert(!/[\u4e00-\u9fa5]/.test(switcherBlock), 'Switcher block must NOT contain any CJK characters')

    pass(5, 'Legitimate status indicator preserved for solved languages', 'Emerald dot rendered when isSolved; zero trailing characters when not solved')
  } catch (err) {
    fail(5, 'Status indicator check failed', err)
  }

  // TEST 6: All four languages remain selectable
  try {
    const switcherBlockMatch = reviseSource.match(/{\/\* Interactive Multi-Language Switcher \*\/}[\s\S]*?<\/div>\s*<\/div>\s*{\/\* Action Buttons \*\/}/)
    assert(switcherBlockMatch, 'Switcher block must exist')
    const switcherBlock = switcherBlockMatch[0]

    assert(switcherBlock.includes('onClick={() => setActiveLanguage(lang)}'), 'Buttons must update activeLanguage state on click')
    assert(switcherBlock.includes('ALL_LANGUAGES.map('), 'Must map over all 4 configured languages')
    assert(switcherBlock.includes('activeLanguage === lang'), 'Must check activeLanguage equality for selection styling')

    pass(6, 'All four languages remain interactive and selectable', 'onClick updates activeLanguage, styling reflects isSelected')
  } catch (err) {
    fail(6, 'Interactive selection check failed', err)
  }

  // TEST 7: No unintended icon, CJK artifact, or CSS-generated content beside affected names
  try {
    // Check entire RevisePage.tsx for the unwanted character
    assert(!reviseSource.includes('未'), 'RevisePage.tsx must not contain the "未" character anywhere')

    // Verify no CSS pseudo-elements generate unwanted symbols in index.css
    const indexCssPath = path.resolve('src/styles/index.css')
    const indexCss = fs.readFileSync(indexCssPath, 'utf-8')
    assert(!indexCss.includes('未'), 'index.css must not contain the "未" character')
    assert(!/::(before|after)[^{]*{[^}]*content:\s*['"][^\s'"]+['"]/i.test(indexCss), 'No pseudo-elements injecting glyphs')

    pass(7, 'Zero unintended glyphs or CSS pseudo-element injection', 'No "未", no rogue CJK codepoints, no pseudo-content artifacts')
  } catch (err) {
    fail(7, 'Unintended glyphs check failed', err)
  }

  // --- Summary ---
  console.log('\n========================================================================')
  console.log(`🏁 REVISE LANGUAGE SELECTOR TEST SUITE: ${passed}/7 PASSED, ${failed}/7 FAILED`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runReviseLanguageSelectorSuite().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
