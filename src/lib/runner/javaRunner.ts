/**
 * Robust in-browser Java (OpenJDK) execution engine for competitive programming problems.
 * Translates and executes standard Java solutions containing:
 * - standard I/O (Scanner, System.out.println, System.out.print, System.out.printf)
 * - types (int, long, double, float, boolean, char, String, arrays, ArrayList)
 * - utilities (Arrays.sort, Collections.sort, Math methods, Integer.parseInt)
 * - control flow (public static void main, for, while, if, else, methods)
 */
import { evaluate } from './evaluator'

export function installJavaRuntimeExtensions(): void {
  if (typeof Array !== 'undefined') {
    const ap = Array.prototype as any
    if (!ap.add) ap.add = function (item: any) { this.push(item); return true }
    if (!ap.get) ap.get = function (idx: number) { return this[idx] }
    if (!ap.size) ap.size = function () { return this.length }
    if (!ap.isEmpty) ap.isEmpty = function () { return this.length === 0 }
  }
  if (typeof String !== 'undefined') {
    const sp = String.prototype as any
    if (!sp.isEmpty) sp.isEmpty = function () { return this.length === 0 }
    if (!sp.__origSplit) {
      const origSplit = sp.split
      sp.__origSplit = origSplit
      sp.split = function (sep: any, limit?: number) {
        if (typeof sep === 'string' && sep.includes('\\')) {
          try {
            return origSplit.call(this, new RegExp(sep), limit)
          } catch {
            return origSplit.call(this, sep, limit)
          }
        }
        return origSplit.call(this, sep, limit)
      }
    }
  }
}

export function executeJava(code: string, input: string): { output: string; error?: string } {
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
  const inputLines = normalizedInput.split('\n')

  let currentLineBuffer = ''

  // System simulation
  const System = {
    in: {},
    out: {
      println: (...args: any[]) => {
        if (args.length === 0) {
          outputs.push(currentLineBuffer)
          currentLineBuffer = ''
          return
        }
        currentLineBuffer += args.map(arg => String(arg)).join(' ')
        outputs.push(currentLineBuffer)
        currentLineBuffer = ''
      },
      print: (...args: any[]) => {
        currentLineBuffer += args.map(arg => String(arg)).join(' ')
        if (currentLineBuffer.includes('\n')) {
          const parts = currentLineBuffer.split('\n')
          for (let i = 0; i < parts.length - 1; i++) {
            outputs.push(parts[i])
          }
          currentLineBuffer = parts[parts.length - 1]
        }
      },
      printf: (format: string, ...args: any[]) => {
        let formatted = format
        for (const arg of args) {
          formatted = formatted.replace(/%[dsf]/, String(arg))
        }
        System.out.print(formatted)
      },
      flush: () => {
        if (currentLineBuffer.length > 0) {
          outputs.push(currentLineBuffer)
          currentLineBuffer = ''
        }
      },
    },
  }

  // Scanner class definition
  class Scanner {
    private tokenIdx = 0
    private lineIdx = 0

    constructor(_source?: any) {
      this.tokenIdx = 0
      this.lineIdx = 0
    }

    nextInt(): number {
      if (this.tokenIdx < tokens.length) {
        return parseInt(tokens[this.tokenIdx++], 10) || 0
      }
      return 0
    }

    nextLong(): number {
      if (this.tokenIdx < tokens.length) {
        return parseInt(tokens[this.tokenIdx++], 10) || 0
      }
      return 0
    }

    nextDouble(): number {
      if (this.tokenIdx < tokens.length) {
        return parseFloat(tokens[this.tokenIdx++]) || 0.0
      }
      return 0.0
    }

    nextFloat(): number {
      return this.nextDouble()
    }

    next(): string {
      if (this.tokenIdx < tokens.length) {
        return tokens[this.tokenIdx++]
      }
      return ''
    }

    nextLine(): string {
      if (this.lineIdx < inputLines.length) {
        return inputLines[this.lineIdx++]
      }
      return ''
    }

    hasNext(): boolean {
      return this.tokenIdx < tokens.length
    }

    hasNextInt(): boolean {
      return this.hasNext() && !isNaN(Number(tokens[this.tokenIdx]))
    }

    hasNextLong(): boolean {
      return this.hasNext() && !isNaN(Number(tokens[this.tokenIdx]))
    }

    hasNextDouble(): boolean {
      return this.hasNext() && !isNaN(Number(tokens[this.tokenIdx]))
    }

    hasNextLine(): boolean {
      return this.lineIdx < inputLines.length
    }

    close() {}
  }

  class BufferedReader {
    private lineIdx = 0
    constructor(_reader?: any) {
      this.lineIdx = 0
    }
    readLine(): string | null {
      if (this.lineIdx < inputLines.length) {
        return inputLines[this.lineIdx++]
      }
      return null
    }
    close() {}
  }

  class InputStreamReader {
    constructor(_stream?: any) {}
  }

  class StringBuilder {
    private str = ''
    constructor(init = '') {
      this.str = String(init)
    }
    append(val: any) {
      this.str += String(val)
      return this
    }
    toString() {
      return this.str
    }
  }

  class StreamTokenizer {
    public nval = 0
    public sval = ''
    private tokIdx = 0
    constructor(_reader?: any) {
      this.tokIdx = 0
    }
    nextToken(): number {
      if (this.tokIdx < tokens.length) {
        const t = tokens[this.tokIdx++]
        const num = Number(t)
        if (!isNaN(num)) {
          this.nval = num
          this.sval = ''
        } else {
          this.nval = 0
          this.sval = t
        }
        return 1
      }
      return -1
    }
  }

  // Arrays and Collections helper
  const Arrays = {
    sort: (arr: any[], ...args: any[]) => {
      if (Array.isArray(arr)) {
        if (args.length === 0) {
          arr.sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))))
        }
      }
    },
    fill: (arr: any[], val: any) => {
      if (Array.isArray(arr)) arr.fill(val)
    },
    toString: (arr: any[]) => JSON.stringify(arr),
  }

  const Collections = {
    sort: (list: any[]) => {
      if (Array.isArray(list)) {
        list.sort((a, b) => a - b)
      }
    },
    reverse: (list: any[]) => {
      if (Array.isArray(list)) list.reverse()
    },
  }

  const env: Record<string, any> = {
    System,
    Scanner,
    BufferedReader,
    InputStreamReader,
    StringBuilder,
    StreamTokenizer,
    Arrays,
    Collections,
    process: undefined,
    require: undefined,
    global: undefined,
    globalThis: undefined,
    Character: {
      isWhitespace: (c: string) => /\s/.test(String(c)),
      isDigit: (c: string) => /\d/.test(String(c)),
      isLetter: (c: string) => /[a-zA-Z]/.test(String(c)),
    },
    Integer: {
      parseInt: (s: string) => parseInt(String(s), 10) || 0,
      toBinaryString: (n: number) => (Number(n) >>> 0).toString(2),
      toHexString: (n: number) => (Number(n) >>> 0).toString(16),
      MAX_VALUE: 2147483647,
      MIN_VALUE: -2147483648,
    },
    Long: {
      parseLong: (s: string) => parseInt(String(s), 10) || 0,
      MAX_VALUE: Number.MAX_SAFE_INTEGER,
      MIN_VALUE: Number.MIN_SAFE_INTEGER,
    },
    Double: {
      parseDouble: (s: string) => parseFloat(String(s)) || 0.0,
    },
    Math: {
      max: Math.max,
      min: Math.min,
      abs: Math.abs,
      sqrt: Math.sqrt,
      pow: Math.pow,
      floor: Math.floor,
      ceil: Math.ceil,
      round: Math.round,
      PI: Math.PI,
    },
  }

  installJavaRuntimeExtensions()

  try {
    let cleanCode = 'let __loopGuard = 0;\n' + code

    // 1. Remove comments
    cleanCode = cleanCode.replace(/\/\*[\s\S]*?\*\//g, '')
    cleanCode = cleanCode.replace(/\/\/.*$/gm, '')

    // 2. Remove package and import lines
    cleanCode = cleanCode.replace(/^\s*package\s+.*?;/gm, '')
    cleanCode = cleanCode.replace(/^\s*import\s+.*?;/gm, '')

    // 3. Remove class definition wrapper: public class Main { ... }
    cleanCode = cleanCode.replace(/(?:public\s+)?class\s+([a-zA-Z0-9_]+)\s*\{/, '')
    const lastBrace = cleanCode.lastIndexOf('}')
    if (lastBrace !== -1) {
      cleanCode = cleanCode.substring(0, lastBrace) + cleanCode.substring(lastBrace + 1)
    }

    // 4. Transform main method: public static void main(String[] args) -> function main()
    cleanCode = cleanCode.replace(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*[a-zA-Z0-9_]*\s*\)(?:\s+throws\s+[^{]+)?/g, 'function main()')

    // 5. Transform other static methods: public static int solve(...) -> function solve(...)
    cleanCode = cleanCode.replace(/(?:public\s+|private\s+|protected\s+)?static\s+(?:void|int|long|double|boolean|String|Object|List<[^>]+>|Map<[^>]+>|[a-zA-Z0-9_]+(?:<[^>]+>)?)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)(?:\s+throws\s+[^{]+)?/g, (_m, fnName, params) => {
      const cleanParams = params
        .split(',')
        .map((p: string) => {
          const parts = p.trim().split(/\s+/)
          return parts[parts.length - 1]
        })
        .filter(Boolean)
        .join(', ')
      return `function ${fnName}(${cleanParams})`
    })

    // 6. Transform Array instantiation: int[] arr = new int[n]; -> let arr = new Array(n).fill(0);
    cleanCode = cleanCode.replace(/(?:int|long|double|float|boolean|String)\s*\[\s*\]\s*([a-zA-Z0-9_]+)\s*=\s*\{([^}]+)\}\s*;/g, 'let $1 = [$2];')
    cleanCode = cleanCode.replace(/(?:int|long|double|float|boolean|String)\s*\[\s*\]\s*([a-zA-Z0-9_]+)\s*=\s*new\s+(?:int|long|double|float|boolean|String)\s*\[\s*([^\]]+)\s*\]\s*;/g, 'let $1 = new Array($2).fill(0);')

    // 7. Transform Object / Scanner / ArrayList instantiation:
    cleanCode = cleanCode.replace(/\b(?:Scanner|BufferedReader|InputStreamReader|StringTokenizer|StreamTokenizer|StringBuilder|ArrayList|List|Set|Map|HashMap|HashSet)\s+([a-zA-Z0-9_]+)\s*=\s*new\s+/g, 'let $1 = new ')
    cleanCode = cleanCode.replace(/(?:ArrayList|List)\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+(?:ArrayList|List)\s*<[^>]*>\s*\(\s*\)\s*;/g, 'let $1 = [];')

    // 8. Transform Variable declarations:
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

    const typeRegex = /\b(?:int|long|double|float|boolean|char|String|Object|List<[^>]+>)(?:\[\s*\])?\s+([^;]+);/g
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
    cleanCode = cleanCode.replace(/for\s*\(\s*(?:int|long|double)\s+/g, 'for (let ')
    // Enhanced for loop: for (int x : arr) -> for (let x of arr)
    cleanCode = cleanCode.replace(/for\s*\(\s*(?:int|long|double|String|char)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_]+)\s*\)/g, 'for (let $1 of $2)')
    cleanCode = cleanCode.replace(/while\s*\((.*?)\)\s*\{/g, 'while ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");')
    cleanCode = cleanCode.replace(/for\s*\((.*?)\)\s*\{/g, 'for ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");')

    // 9. Transform String length() to .length, charAt(i) to [i]
    cleanCode = cleanCode.replace(/\.charAt\s*\(\s*([^)]+)\s*\)/g, '[$1]')
    cleanCode = cleanCode.replace(/\.length\s*\(\s*\)/g, '.length')

    // 10. Execute main()
    cleanCode += `
if (typeof main === 'function') {
  main();
}
System.out.flush();
`

    const keys = Object.keys(env)
    const values = Object.values(env)

    evaluate(keys, values, cleanCode)

    System.out.flush()

    return { output: outputs.join('\n').trim() }
  } catch (err: any) {
    return {
      output: outputs.join('\n').trim(),
      error: err.message || 'Java execution error',
    }
  }
}
