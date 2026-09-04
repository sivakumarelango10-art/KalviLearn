/**
 * Robust in-browser Python 3 Execution Engine for competitive programming questions.
 * Handles standard I/O (sys.stdin, input()), arithmetic, conditionals, loops, lists, strings, and prints.
 */

// Global string & array method extensions for Python compatibility
if (typeof String !== 'undefined') {
  if (!(String.prototype as any).strip) {
    (String.prototype as any).strip = function () {
      return this.trim()
    }
  }
  if (!(String.prototype as any).rstrip) {
    (String.prototype as any).rstrip = function () {
      return this.trimEnd()
    }
  }
  if (!(String.prototype as any).lstrip) {
    (String.prototype as any).lstrip = function () {
      return this.trimStart()
    }
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

  const env: Record<string, any> = {
    sys,
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
