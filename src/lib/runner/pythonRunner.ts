/**
 * Robust in-browser Python 3 Execution Engine for competitive programming questions.
 * Handles standard I/O (sys.stdin, input()), arithmetic, conditionals, loops, lists, strings, and prints.
 */

// Global string & array method extensions for Python compatibility
// Global string & array method extensions for Python compatibility
if (typeof String !== 'undefined') {
  const sp = String.prototype as any
  if (!sp.strip) sp.strip = function () { return this.trim() }
  if (!sp.rstrip) sp.rstrip = function () { return this.trimEnd() }
  if (!sp.lstrip) sp.lstrip = function () { return this.trimStart() }
  if (!sp.join) {
    sp.join = function (arr: any) {
      if (!arr) return ''
      const list = Array.isArray(arr) ? arr : Array.from(arr)
      return list.join(this.toString())
    }
  }
  if (!sp.startswith) sp.startswith = function (p: string) { return this.startsWith(p) }
  if (!sp.endswith) sp.endswith = function (s: string) { return this.endsWith(s) }
  if (!sp.isdigit) sp.isdigit = function () { return /^\d+$/.test(this) }
  if (!sp.isalpha) sp.isalpha = function () { return /^[a-zA-Z]+$/.test(this) }
  if (!sp.isalnum) sp.isalnum = function () { return /^[a-zA-Z0-9]+$/.test(this) }
  if (!sp.isupper) sp.isupper = function () { return this === this.toUpperCase() && this !== this.toLowerCase() }
  if (!sp.islower) sp.islower = function () { return this === this.toLowerCase() && this !== this.toUpperCase() }
  if (!sp.count) {
    sp.count = function (sub: string) {
      if (!sub) return 0
      let count = 0
      let pos = 0
      while ((pos = this.indexOf(sub, pos)) !== -1) {
        count++
        pos += sub.length
      }
      return count
    }
  }
  if (!sp.find) sp.find = function (sub: string, start?: number) { return this.indexOf(sub, start) }
  if (!sp.index) {
    sp.index = function (sub: string, start?: number) {
      const idx = this.indexOf(sub, start)
      if (idx === -1) throw new Error(`ValueError: substring not found: ${sub}`)
      return idx
    }
  }
}

if (typeof Array !== 'undefined') {
  const ap = Array.prototype as any
  if (!ap.count) {
    ap.count = function (val: any) {
      let c = 0
      for (let i = 0; i < this.length; i++) {
        if (this[i] === val) c++
      }
      return c
    }
  }
  if (!ap.index) {
    ap.index = function (val: any) {
      const idx = this.indexOf(val)
      if (idx === -1) throw new Error(`ValueError: ${val} is not in list`)
      return idx
    }
  }
  if (!ap.remove) {
    ap.remove = function (val: any) {
      const idx = this.indexOf(val)
      if (idx === -1) throw new Error(`ValueError: list.remove(x): x not in list`)
      this.splice(idx, 1)
    }
  }
  if (!ap.extend) {
    ap.extend = function (iterable: any) {
      if (iterable) {
        for (const item of iterable) {
          this.push(item)
        }
      }
    }
  }
  // Ensure arr.sort() in Python context sorts numbers numerically rather than lexicographically
  const originalSort = Array.prototype.sort
  Array.prototype.sort = function (compareFn?: any) {
    if (typeof compareFn === 'function') {
      return originalSort.call(this, compareFn)
    }
    const allNumeric = this.length > 0 && this.every((x: any) => typeof x === 'number' && !isNaN(x))
    if (allNumeric) {
      return originalSort.call(this, (a: number, b: number) => a - b)
    }
    return originalSort.call(this)
  }
}

export function executePython(code: string, input: string): { output: string; error?: string } {
  const outputs: string[] = []
  const normalizedInput = input.replace(/\r\n/g, '\n')
  const inputLines = normalizedInput.split('\n')
  let lineIndex = 0
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean)
  let tokenIndex = 0

  // Custom standard environment
  const sys = {
    stdin: {
      read: () => normalizedInput,
      readline: () => {
        if (lineIndex < inputLines.length) {
          return inputLines[lineIndex++]
        }
        return ''
      },
    },
    stdout: {
      write: (val: any) => outputs.push(String(val)),
    },
  }

  const math = {
    sqrt: Math.sqrt,
    floor: Math.floor,
    ceil: Math.ceil,
    pow: Math.pow,
    abs: Math.abs,
    pi: Math.PI,
    e: Math.E,
    inf: Infinity,
    gcd: (a: number, b: number) => {
      let x = Math.abs(Math.round(a))
      let y = Math.abs(Math.round(b))
      while (y) {
        const t = y
        y = x % y
        x = t
      }
      return x
    },
    lcm: (a: number, b: number) => {
      if (a === 0 || b === 0) return 0
      let x = Math.abs(Math.round(a))
      let y = Math.abs(Math.round(b))
      const prod = x * y
      while (y) {
        const t = y
        y = x % y
        x = t
      }
      return Math.round(prod / x)
    },
    factorial: (n: number) => {
      let r = 1
      for (let i = 2; i <= n; i++) r *= i
      return r
    },
    log: Math.log,
    log2: Math.log2,
    log10: Math.log10,
  }

  const env: Record<string, any> = {
    sys,
    math,
    int: (val: any) => {
      if (val === undefined || val === null || val === '') return 0
      const parsed = parseInt(String(val).trim(), 10)
      return isNaN(parsed) ? 0 : parsed
    },
    float: (val: any) => {
      if (val === undefined || val === null || val === '') return 0.0
      const parsed = parseFloat(String(val).trim())
      return isNaN(parsed) ? 0.0 : parsed
    },
    str: (val: any) => String(val),
    len: (val: any) => (val ? (val.length !== undefined ? val.length : Object.keys(val).length) : 0),
    max: (...args: any[]) => {
      const flat = Array.isArray(args[0]) ? args[0] : args
      return Math.max(...flat)
    },
    min: (...args: any[]) => {
      const flat = Array.isArray(args[0]) ? args[0] : args
      return Math.min(...flat)
    },
    sum: (arr: any) => {
      if (!Array.isArray(arr)) return 0
      return arr.reduce((a, b) => a + Number(b), 0)
    },
    abs: (n: number) => Math.abs(n),
    round: (n: number, decimals: number = 0) =>
      decimals === 0 ? Math.round(n) : Number(n.toFixed(decimals)),
    pow: (base: number, exp: number, mod?: number) => {
      if (mod) {
        return Number((BigInt(Math.floor(base)) ** BigInt(Math.floor(exp))) % BigInt(Math.floor(mod)))
      }
      return Math.pow(base, exp)
    },
    sorted: (arr: any) => {
      if (!Array.isArray(arr)) return []
      return [...arr].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
    },
    list: (iterable: any) => {
      if (Array.isArray(iterable)) return [...iterable]
      if (iterable && typeof iterable[Symbol.iterator] === 'function') {
        return Array.from(iterable)
      }
      return []
    },
    dict: () => ({}),
    set: (iterable?: any) => new Set(iterable ? (Array.isArray(iterable) ? iterable : Array.from(iterable)) : []),
    enumerate: (iterable: any, start: number = 0) => {
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable || [])
      return arr.map((item, idx) => [idx + start, item])
    },
    zip: (...iters: any[]) => {
      const arrays = iters.map((it) => (Array.isArray(it) ? it : Array.from(it || [])))
      const minLen = Math.min(...arrays.map((a) => a.length))
      const result = []
      for (let i = 0; i < minLen; i++) {
        result.push(arrays.map((a) => a[i]))
      }
      return result
    },
    reversed: (iterable: any) => {
      const arr = Array.isArray(iterable) ? [...iterable] : Array.from(iterable || [])
      return arr.reverse()
    },
    all: (iterable: any) => {
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable || [])
      return arr.every(Boolean)
    },
    any: (iterable: any) => {
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable || [])
      return arr.some(Boolean)
    },
    chr: (code: number) => String.fromCharCode(code),
    ord: (char: string) => (char ? char.charCodeAt(0) : 0),
    intDiv: (a: number, b: number) => Math.floor(a / b),
    map: (fn: any, iterable: any) => {
      if (!iterable) return []
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable)
      return arr.map(fn)
    },
    range: (start: number, stop?: number, step: number = 1) => {
      if (stop === undefined) {
        stop = start
        start = 0
      }
      const res: number[] = []
      if (step > 0) {
        for (let i = start; i < stop; i += step) res.push(i)
      } else {
        for (let i = start; i > stop; i += step) res.push(i)
      }
      return res
    },
    print: (...args: any[]) => {
      const line = args
        .map((a) => {
          if (a === null) return 'None'
          if (a === true) return 'True'
          if (a === false) return 'False'
          if (typeof a === 'object') return JSON.stringify(a)
          return String(a)
        })
        .join(' ')
      outputs.push(line)
    },
    input: () => {
      if (lineIndex < inputLines.length) {
        return inputLines[lineIndex++]
      }
      if (tokenIndex < inputTokens.length) {
        return inputTokens[tokenIndex++]
      }
      return ''
    },
    True: true,
    False: false,
    None: null,
  }

  try {
    const rawLines = code.split(/\r?\n/)
    const transformedLines: string[] = []
    let hasMainExecution = false

    for (const raw of rawLines) {
      let line = raw.replace(/#.*$/, '')
      const trimmed = line.trim()

      if (!trimmed) continue

      // Filter or comment out import statements
      if (
        trimmed.startsWith('import ') ||
        trimmed.startsWith('from ') ||
        trimmed === 'import'
      ) {
        line = line.replace(/^(.*)(import|from)(.*)$/, '// $1$2$3')
      }

      // Handle pass statement
      if (trimmed === 'pass') {
        line = line.replace(/\bpass\b/, '// pass')
      }

      // Handle if __name__ == '__main__':
      if (
        trimmed.includes("__name__ == '__main__'") ||
        trimmed.includes('__name__ == "__main__"')
      ) {
        hasMainExecution = true
        line = line.replace(/if\s+__name__\s*==\s*['"]__main__['"]\s*:/, 'if (true) {')
      }

      // Check for standalone solve() or main() call
      if (trimmed === 'solve()' || trimmed === 'main()') {
        hasMainExecution = true
      }

      // Replace Python integer division // with Math.floor(...)
      let divPrev: string
      do {
        divPrev = line
        line = line
          .replace(/\(([^()]+)\)\s*\/\/\s*\(([^()]+)\)/g, 'Math.floor(($1) / ($2))')
          .replace(/\(([^()]+)\)\s*\/\/\s*([a-zA-Z0-9_.]+)/g, 'Math.floor(($1) / $2)')
          .replace(/([a-zA-Z0-9_.]+)\s*\/\/\s*\(([^()]+)\)/g, 'Math.floor($1 / ($2))')
          .replace(/([a-zA-Z0-9_.]+)\s*\/\/\s*([a-zA-Z0-9_.]+)/g, 'Math.floor($1 / $2)')
      } while (line !== divPrev)

      // Replace simple list comprehensions: [expr for x in iterable]
      line = line.replace(
        /\[\s*([a-zA-Z0-9_().+*\/ -]+)\s+for\s+([a-zA-Z0-9_]+)\s+in\s+([^\]]+)\]/g,
        '($3).map(($2) => $1)'
      )

      // Replace membership 'in' within if statements
      line = line.replace(
        /if\s+([a-zA-Z0-9_'"\(\)]+)\s+in\s+([a-zA-Z0-9_'"\(\)]+)\s*:/g,
        'if (($2).includes ? ($2).includes($1) : ($1 in $2)) {'
      )
      line = line.replace(
        /if\s+([a-zA-Z0-9_'"\(\)]+)\s+not\s+in\s+([a-zA-Z0-9_'"\(\)]+)\s*:/g,
        'if (!(($2).includes ? ($2).includes($1) : ($1 in $2))) {'
      )

      // Syntax transformations
      line = line
        .replace(/\band\s+/g, '&& ')
        .replace(/\bor\s+/g, '|| ')
        .replace(/\bnot\s+/g, '!')
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
        .replace(/\.strip\(\)/g, '.trim()')
        .replace(/\.rstrip\(\)/g, '.trimEnd()')
        .replace(/\.lstrip\(\)/g, '.trimStart()')
        .replace(/\.split\(\)/g, '.split(/\\s+/).filter(Boolean)')
        .replace(/\.append\((.*?)\)/g, '.push($1)')
        .replace(/\.lower\(\)/g, '.toLowerCase()')
        .replace(/\.upper\(\)/g, '.toUpperCase()')
        .replace(/\belif\s+(.*?):/g, 'else if ($1) {')
        .replace(/\bdef\s+([a-zA-Z0-9_]+)\s*\((.*?)\):/g, 'function $1($2) {')
        .replace(/\bfor\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\):/g, 'for (let $1 of range($2)) {')
        .replace(/\bfor\s+([a-zA-Z0-9_]+)\s+in\s+(.*?):/g, 'for (let $1 of $2) {')
        .replace(/\bwhile\s+(.*?):/g, 'while ($1) {')
        .replace(/\bif\s+(.*?):/g, 'if ($1) {')
        .replace(/\belse\s*:/g, 'else {')

      // Multiple variable assignment: a, b = ...
      if (/^[a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+\s*=/.test(trimmed)) {
        line = line.replace(
          /^(\s*)([a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+)\s*=\s*(.*)$/,
          '$1let [$2] = $4'
        )
      }

      transformedLines.push(line)
    }

    // Indentation to braces
    let formattedJs = ''
    const indentStack: number[] = [0]

    for (let i = 0; i < transformedLines.length; i++) {
      const line = transformedLines[i]
      const trimmed = line.trim()
      const indent = line.search(/\S/)

      while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
        indentStack.pop()
        formattedJs += '}\n'
      }

      formattedJs += trimmed + '\n'

      if (trimmed.endsWith('{')) {
        indentStack.push(indent + 4)
      }
    }

    while (indentStack.length > 1) {
      indentStack.pop()
      formattedJs += '}\n'
    }

    // Only append solve() / main() if not already executed by the script
    if (!hasMainExecution) {
      formattedJs += `
if (typeof solve === 'function') {
  solve();
} else if (typeof main === 'function') {
  main();
}
`
    }

    const keys = Object.keys(env)
    const values = Object.values(env)

    const runner = new Function(...keys, formattedJs)
    runner(...values)

    return { output: outputs.join('\n').trim() }
  } catch (err: any) {
    return {
      output: outputs.join('\n').trim(),
      error: err.message || 'Execution error',
    }
  }
}
