/**
 * String Edit Distance (practice bank, 9 questions): make the empty-string input unambiguous and stop the starter code
 * from destroying it.
 *
 * Root cause: hidden cases 5 and 6 contain an empty string ("\nabc": a is empty; "abc\n": b is empty), which the
 * statement allows ("Either string may be empty"). The generic starter code read the input with
 * `sys.stdin.read().strip()` / `.trim()` - removing exactly that empty line - and the Java starter's
 * Scanner.nextLine() throws when the last line is empty. A correct algorithm built on the provided starter therefore
 * passed cases 1-3 and failed hidden cases 5-6. Test data is unchanged (verified by scripts/practice_oracle.py).
 *
 * Idempotent.   node scripts/fix-edit-distance-io.cjs
 */
const fs = require('fs')
const path = require('path')

const FILE = path.resolve(__dirname, '..', 'src', 'data', 'problems.json')

const INPUT_FORMAT =
  'The first line contains string `a`. The second line contains string `b`. Either string may be empty: an empty ' +
  'string is an empty line, so the input may start with a blank line, and the second line may be empty or absent. ' +
  'Read the two lines exactly; do not strip the whole input.'

const STARTERS = {
  python:
    '# Language: Python 3\nimport sys\n\ndef solve():\n    # Read the two lines exactly: an empty string is an empty line, so do not strip the whole input.\n' +
    "    lines = sys.stdin.read().split('\\n')\n    a = lines[0].rstrip('\\r') if len(lines) > 0 else ''\n" +
    "    b = lines[1].rstrip('\\r') if len(lines) > 1 else ''\n\n    # Write your solution here\n    pass\n\n" +
    "if __name__ == '__main__':\n    solve()\n",
  javascript:
    "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction solve() {\n" +
    '    // Read the two lines exactly: an empty string is an empty line, so do not trim the whole input.\n' +
    "    const lines = fs.readFileSync(0, 'utf-8').split('\\n');\n    const a = (lines[0] || '').replace(/\\r$/, '');\n" +
    "    const b = (lines[1] || '').replace(/\\r$/, '');\n\n    // Write your solution here\n}\n\nsolve();\n",
  cpp:
    '// Language: C++ (g++)\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n' +
    'int main() {\n    string a, b;\n    // An empty string is an empty line: getline leaves the string empty.\n    getline(cin, a);\n    getline(cin, b);\n' +
    "    if (!a.empty() && a.back() == '\\r') a.pop_back();\n    if (!b.empty() && b.back() == '\\r') b.pop_back();\n\n" +
    '    // Write your solution here\n\n    return 0;\n}\n',
  java:
    '// Language: Java (OpenJDK)\nimport java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.InputStreamReader;\n\n' +
    'public class Main {\n    public static void main(String[] args) throws IOException {\n' +
    '        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));\n' +
    '        // An empty string is an empty (or absent final) line.\n        String a = reader.readLine();\n        String b = reader.readLine();\n' +
    '        if (a == null) a = "";\n        if (b == null) b = "";\n\n        // Write your solution here\n    }\n}\n',
}

const belts = JSON.parse(fs.readFileSync(FILE, 'utf8'))
let changed = 0
for (const belt of belts) {
  for (const p of belt.problems) {
    if (!/-string-edit-distance-v\d+$/.test(p.slug)) continue
    if (p.inputFormat !== INPUT_FORMAT) {
      p.inputFormat = INPUT_FORMAT
      changed++
    }
    for (const [lang, code] of Object.entries(STARTERS)) {
      if (p.starterCodes && p.starterCodes[lang] !== code) {
        p.starterCodes[lang] = code
        changed++
      }
    }
  }
}
fs.writeFileSync(FILE, JSON.stringify(belts, null, 2))
console.log(`fix-edit-distance-io: ${changed} field(s) updated`)
