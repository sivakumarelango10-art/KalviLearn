/**
 * Makes the tree input format of the practice bank explicit (statement fix - the test data is unchanged).
 *
 * Root cause: the 65 binary-tree questions (belt 8) said only "n level-order values; -1 denotes a missing node".
 * The test data uses ARRAY-INDEX level order (children of index i at 2i+1 and 2i+2), but the widely taught compact
 * (LeetCode-style) level order builds a different tree for inputs such as `10 -1 20 -1 -1 15 25`. A correct
 * solution using the compact parser therefore failed exactly the case(s) where the two readings differ - 45 cases,
 * most of them hidden. In the 5 bst-lower-bound questions "-1" is likewise a missing slot, not a value to insert.
 *
 * scripts/practice_oracle.py verifies every stored expected output under the documented format (0 mismatches) and
 * fails if any input remains ambiguous. Idempotent.   node scripts/fix-tree-input-format.cjs
 */
const fs = require('fs')
const path = require('path')

const FILE = path.resolve(__dirname, '..', 'src', 'data', 'problems.json')
const TREE_LAYOUT =
  'The tree is given in array level order: the value at index `i` (0-based) has its left child at index `2i+1` and ' +
  'its right child at index `2i+2`. `-1` marks a missing node; every position below a missing node is also `-1`, ' +
  'and positions at or beyond `n` are missing. Example: `10 -1 20 -1 -1 15 25` is root `10` with right child `20`, ' +
  'whose children are `15` and `25`.'

const family = (slug) => slug.replace(/^belt-\d+-q\d+-/, '').replace(/-v\d+$/, '')

const belts = JSON.parse(fs.readFileSync(FILE, 'utf8'))
let changed = 0
for (const belt of belts) {
  for (const p of belt.problems) {
    const fam = family(p.slug)
    let next = p.inputFormat
    if (fam === 'bst-lower-bound') {
      next =
        'The first line contains `n`. The second line contains `n` integers; insert every value except `-1` (which ' +
        'marks an empty slot, not a value) into a binary search tree, in the given order. The third line contains ' +
        '`q`. The fourth line contains `q` query values.'
      const out =
        'For each query, print on its own line the smallest value stored in the tree that is greater than or equal ' +
        'to the query, or `-1` if no such value exists.'
      if (p.outputFormat !== out) {
        p.outputFormat = out
        changed++
      }
    } else if (/level-order values; `-1` denotes a missing node\.$/.test(p.inputFormat)) {
      next = p.inputFormat.replace(/`n` level-order values; `-1` denotes a missing node\.$/, '`n` level-order values. ') + TREE_LAYOUT
    }
    if (next !== p.inputFormat) {
      p.inputFormat = next
      changed++
    }
  }
}
fs.writeFileSync(FILE, JSON.stringify(belts, null, 2))
console.log(`fix-tree-input-format: ${changed} statement field(s) updated`)
