/**
 * Robust in-browser C++ (g++) execution engine for competitive programming problems.
 * Translates and executes standard C++ solutions containing:
 * - standard I/O (cin >>, cout <<, getline, endl, \n)
 * - types (int, long long, double, float, char, string, bool, vector, arrays)
 * - algorithms (sort, reverse, max, min, abs, sqrt, pow, __gcd, swap)
 * - control flow (for, while, if, else, functions)
 */
import { evaluate } from './evaluator'

export function installCppRuntimeExtensions(): void {
  if (typeof Array !== 'undefined') {
    const ap = Array.prototype as any
    if (!ap.empty) ap.empty = function () { return this.length === 0 }
    if (!ap.size) ap.size = function () { return this.length }
    if (!ap.push_back) ap.push_back = function (item: any) { this.push(item) }
    if (!ap.pop_back) ap.pop_back = function () { return this.pop() }
  }
  if (typeof String !== 'undefined') {
    const sp = String.prototype as any
    if (!sp.empty) sp.empty = function () { return this.length === 0 }
    if (!sp.size) sp.size = function () { return this.length }
    if (!sp.find) {
      sp.find = function (pat: any, pos?: number) {
        return this.indexOf(pat, pos)
      }
    }
    if (!sp.substr) {
      sp.substr = function (start: number, len?: number) {
        if (len === undefined) return this.substring(start)
        return this.substring(start, start + Math.max(0, len))
      }
    }
  }
}

export function executeCpp(code: string, input: string): { output: string; error?: string } {
  // Security guard against host secret access
  if (
    /process\s*\.\s*env/i.test(code) ||
    /child_process/i.test(code) ||
    /__proto__/i.test(code)
  ) {
    return {
      output: '',
      error: 'Security Violation: Access to system environment and child processes is strictly forbidden.',
    }
  }

  const outputs: string[] = []
  const normalizedInput = input.replace(/\r\n/g, '\n')
  const tokens = normalizedInput.trim().split(/\s+/).filter(Boolean)
  let tokenIdx = 0
  const inputLines = normalizedInput.split('\n')
  let lineIdx = 0

  // Standard C++ input stream simulation
  let lastReadOk = true
  const __cin = {
    next: () => {
      if (tokenIdx < tokens.length) {
        lastReadOk = true
        const val = tokens[tokenIdx++]
        const num = Number(val)
        return isNaN(num) ? val : num
      }
      lastReadOk = false
      return 0
    },
    nextString: () => {
      if (tokenIdx < tokens.length) {
        lastReadOk = true
        return tokens[tokenIdx++]
      }
      lastReadOk = false
      return ''
    },
    nextLine: () => {
      if (lineIdx < inputLines.length) {
        lastReadOk = true
        return inputLines[lineIdx++]
      }
      lastReadOk = false
      return ''
    },
    hasNext: () => tokenIdx < tokens.length,
    ok: () => lastReadOk,
  }

  // Standard C++ output stream simulation
  let currentLineBuffer = ''
  const __cout = {
    write: (val: any) => {
      if (val === undefined || val === null) return
      const strVal = String(val)
      if (strVal.includes('\n')) {
        const parts = strVal.split('\n')
        currentLineBuffer += parts[0]
        outputs.push(currentLineBuffer)
        for (let i = 1; i < parts.length - 1; i++) {
          outputs.push(parts[i])
        }
        currentLineBuffer = parts[parts.length - 1]
      } else {
        currentLineBuffer += strVal
      }
    },
    endl: () => {
      outputs.push(currentLineBuffer)
      currentLineBuffer = ''
    },
    flush: () => {
      if (currentLineBuffer.length > 0) {
        outputs.push(currentLineBuffer)
        currentLineBuffer = ''
      }
    },
  }

  // Standard C++ Math & Algorithm environment
  const env: Record<string, any> = {
    __cin,
    __cout,
    process: undefined,
    require: undefined,
    global: undefined,
    globalThis: undefined,
    endl: '\n',
    INT_MAX: 2147483647,
    INT_MIN: -2147483648,
    LLONG_MAX: Number.MAX_SAFE_INTEGER,
    LLONG_MIN: Number.MIN_SAFE_INTEGER,
    min: (...args: any[]) => Math.min(...args),
    max: (...args: any[]) => Math.max(...args),
    abs: (val: number) => Math.abs(val),
    sqrt: (val: number) => Math.sqrt(val),
    pow: (base: number, exponent: number) => Math.pow(base, exponent),
    __gcd: (a: number, b: number) => {
      let numA = Math.abs(Math.round(a))
      let numB = Math.abs(Math.round(b))
      while (numB) {
        const temp = numB
        numB = numA % numB
        numA = temp
      }
      return numA
    },
    gcd: (a: number, b: number) => {
      let numA = Math.abs(Math.round(a))
      let numB = Math.abs(Math.round(b))
      while (numB) {
        const temp = numB
        numB = numA % numB
        numA = temp
      }
      return numA
    },
    to_string: (val: any) => String(val),
    stoi: (s: any) => parseInt(String(s), 10) || 0,
    stoll: (s: any) => parseInt(String(s), 10) || 0,
    stod: (s: any) => parseFloat(String(s)) || 0.0,
    stof: (s: any) => parseFloat(String(s)) || 0.0,
    isspace: (ch: any) => typeof ch === 'string' && /\s/.test(ch),
    tolower: (ch: any) => typeof ch === 'string' ? ch.toLowerCase() : ch,
    toupper: (ch: any) => typeof ch === 'string' ? ch.toUpperCase() : ch,
    isdigit: (ch: any) => typeof ch === 'string' && /\d/.test(ch),
    isalpha: (ch: any) => typeof ch === 'string' && /[a-zA-Z]/.test(ch),
    isalnum: (ch: any) => typeof ch === 'string' && /[a-zA-Z0-9]/.test(ch),
    printf: (...args: any[]) => {
      if (args.length > 0) {
        __cout.write(args.join(' '))
      }
    },
  }

  installCppRuntimeExtensions()

  try {
    let cleanCode = 'let __loopGuard = 0;\n' + code

    // 1. Remove single-line and multi-line comments
    cleanCode = cleanCode.replace(/\/\*[\s\S]*?\*\//g, '')
    cleanCode = cleanCode.replace(/\/\/.*$/gm, '')

    // 2. Remove preprocessor directives and namespace declarations
    cleanCode = cleanCode.replace(/^\s*#include\s*<.*?>/gm, '')
    cleanCode = cleanCode.replace(/^\s*#include\s*".*?"/gm, '')
    cleanCode = cleanCode.replace(/^\s*#define\s+.*$/gm, '')
    cleanCode = cleanCode.replace(/^\s*using\s+namespace\s+std\s*;/gm, '')
    cleanCode = cleanCode.replace(/std::/g, '')

    // 3. Remove fast I/O boilerplate
    cleanCode = cleanCode.replace(/ios(?:_base)?::sync_with_stdio\(.*?\);?/g, '')
    cleanCode = cleanCode.replace(/cin\.tie\(.*?\);?/g, '')
    cleanCode = cleanCode.replace(/cout\.tie\(.*?\);?/g, '')

    // 4. Transform C++ output: cout << a << b << endl;
    cleanCode = cleanCode.replace(/cout\s*<<\s*([^\n;]+);/g, (_match, exprList) => {
      const parts = exprList.split('<<').map((p: string) => p.trim()).filter(Boolean)
      const statements = parts.map((p: string) => {
        if (p === 'endl' || p === "'\\n'" || p === '"\\n"') {
          return '__cout.endl()'
        }
        return `__cout.write(${p})`
      })
      return '{ ' + statements.join('; ') + '; }'
    })

    // 5. Transform if/while conditions with cin >>: if (cin >> a >> b)
    cleanCode = cleanCode.replace(/\b(if|while)\s*\(\s*cin\s*>>\s*([^\)]+)\)/g, (_match, kw, varList) => {
      const vars = varList.split('>>').map((v: string) => v.trim()).filter(Boolean)
      const assignments = vars.map((v: string) => `${v} = __cin.next()`).join(', ')
      return `${kw} ((${assignments}), __cin.ok())`
    })

    // 6. Transform standalone C++ input: cin >> a >> b;
    cleanCode = cleanCode.replace(/cin\s*>>\s*([^\n;]+);/g, (_match, varList) => {
      const vars = varList.split('>>').map((v: string) => v.trim()).filter(Boolean)
      const statements = vars.map((v: string) => {
        return `${v} = __cin.next()`
      })
      return '{ ' + statements.join('; ') + '; }'
    })

    // 7. Transform getline(cin, str)
    cleanCode = cleanCode.replace(/getline\s*\(\s*cin\s*,\s*([a-zA-Z0-9_]+)\s*\)/g, '$1 = __cin.nextLine()')

    // 7. Transform vector initialization
    // vector<int> v = {1, 2, 3}; -> let v = [1, 2, 3];
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*=\s*\{([^}]+)\}\s*;/g, 'let $1 = [$2];')
    // vector<int> v = ...; -> let v = ...;
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);/g, 'let $1 = $2;')
    // vector<int> v(n, 0); -> let v = new Array(n).fill(0);
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*;/g, 'let $1 = new Array($2).fill($3);')
    // vector<int> v(n); -> let v = new Array(n).fill(0);
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*\(\s*([^)]+)\s*\)\s*;/g, 'let $1 = new Array($2).fill(0);')
    // vector<int> v; -> let v = [];
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = [];')

    // 8. Transform static/dynamic arrays: int arr[n]; -> let arr = new Array(n).fill(0);
    cleanCode = cleanCode.replace(/\b(?:int|long\s+long|double|float|char|bool)\s+([a-zA-Z0-9_]+)\s*\[\s*([^\]]+)\s*\]\s*;/g, 'let $1 = new Array($2).fill(0);')

    // 9. Transform sort & reverse
    // sort(v.begin(), v.end()); -> v.sort((a, b) => a - b);
    cleanCode = cleanCode.replace(/sort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*,\s*greater\s*<[^>]+>\s*\(\s*\)\s*\)/g, '$1.sort((a, b) => b - a)')
    cleanCode = cleanCode.replace(/sort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, '$1.sort((a, b) => a - b)')
    cleanCode = cleanCode.replace(/reverse\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, '$1 = Array.isArray($1) ? ($1.reverse(), $1) : Array.from($1).reverse().join("")')

    // 10. Transform vector push_back, pop_back, size, find
    cleanCode = cleanCode.replace(/\.push_back\s*\(/g, '.push(')
    cleanCode = cleanCode.replace(/\.pop_back\s*\(\s*\)/g, '.pop()')
    cleanCode = cleanCode.replace(/\.size\s*\(\s*\)/g, '.length')
    cleanCode = cleanCode.replace(/string::npos/g, '-1')
    cleanCode = cleanCode.replace(/\((?:int|long\s+long|long|double|float|char|bool|size_t)\)\s*/g, '')

    // 11. Function declarations: int solve(...) -> function solve(...)
    cleanCode = cleanCode.replace(/\b(?:vector\s*<[^>]+>|int|void|long\s+long|long|double|string|bool)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g, (_m, fnName, params) => {
      const cleanParams = params
        .split(',')
        .map((p: string) => {
          const parts = p.trim().split(/\s+/)
          return parts[parts.length - 1].replace(/[&*]/g, '')
        })
        .filter(Boolean)
        .join(', ')
      return `function ${fnName}(${cleanParams}) {`
    })

    // 12. Transform C++ type declarations to 'let'
    const splitTopLevelCommas = (str: string): string[] => {
      const parts: string[] = []
      let depth = 0
      let inQuote = false
      let quoteChar = ''
      let start = 0
      for (let i = 0; i < str.length; i++) {
        const c = str[i]
        if (inQuote) {
          if (c === quoteChar && str[i - 1] !== '\\') inQuote = false
        } else if (c === '"' || c === "'") {
          inQuote = true
          quoteChar = c
        } else if (c === '(' || c === '[' || c === '{') {
          depth++
        } else if (c === ')' || c === ']' || c === '}') {
          depth--
        } else if (c === ',' && depth === 0) {
          parts.push(str.substring(start, i))
          start = i + 1
        }
      }
      parts.push(str.substring(start))
      return parts
    }

    const typeRegex = /\b(?:const\s+)?(?:int|long\s+long|long|double|float|bool|string|char|auto|size_t)\s+([^{};]+);/g
    cleanCode = cleanCode.replace(typeRegex, (_match, declBody) => {
      const decls = splitTopLevelCommas(declBody).map((d: string) => {
        const item = d.trim()
        if (item.includes('=')) {
          return item
        }
        return `${item} = 0`
      })
      return `let ${decls.join(', ')};`
    })

    // In for loops: for (int i = 0; ...) -> for (let i = 0; ...)
    cleanCode = cleanCode.replace(/for\s*\(\s*(?:const\s+)?(?:int|long\s+long|long|size_t|auto)\s+/g, 'for (let ')
    cleanCode = cleanCode.replace(/while\s*\((.*?)\)\s*\{/g, 'while ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");')
    cleanCode = cleanCode.replace(/for\s*\((.*?)\)\s*\{/g, 'for ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");')

    // 13. Ensure main() is invoked
    cleanCode += `
__cout.flush();
if (typeof main === 'function') {
  main();
} else if (typeof solve === 'function') {
  solve();
}
__cout.flush();
`

    const keys = Object.keys(env)
    const values = Object.values(env)

    evaluate(keys, values, cleanCode)

    __cout.flush()

    return { output: outputs.join('\n').trim() }
  } catch (err: any) {
    return {
      output: outputs.join('\n').trim(),
      error: err.message || 'C++ execution error',
    }
  }
}
