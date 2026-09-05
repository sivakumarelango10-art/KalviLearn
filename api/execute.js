// src/lib/runner/pythonRunner.ts
if (typeof String !== "undefined") {
  const sp = String.prototype;
  if (!sp.strip) sp.strip = function() {
    return this.trim();
  };
  if (!sp.rstrip) sp.rstrip = function() {
    return this.trimEnd();
  };
  if (!sp.lstrip) sp.lstrip = function() {
    return this.trimStart();
  };
  if (!sp.join) {
    sp.join = function(arr) {
      if (!arr) return "";
      const list = Array.isArray(arr) ? arr : Array.from(arr);
      return list.join(this.toString());
    };
  }
  if (!sp.startswith) sp.startswith = function(p) {
    return this.startsWith(p);
  };
  if (!sp.endswith) sp.endswith = function(s) {
    return this.endsWith(s);
  };
  if (!sp.isdigit) sp.isdigit = function() {
    return /^\d+$/.test(this);
  };
  if (!sp.isalpha) sp.isalpha = function() {
    return /^[a-zA-Z]+$/.test(this);
  };
  if (!sp.isalnum) sp.isalnum = function() {
    return /^[a-zA-Z0-9]+$/.test(this);
  };
  if (!sp.isupper) sp.isupper = function() {
    return this === this.toUpperCase() && this !== this.toLowerCase();
  };
  if (!sp.islower) sp.islower = function() {
    return this === this.toLowerCase() && this !== this.toUpperCase();
  };
  if (!sp.count) {
    sp.count = function(sub) {
      if (!sub) return 0;
      let count = 0;
      let pos = 0;
      while ((pos = this.indexOf(sub, pos)) !== -1) {
        count++;
        pos += sub.length;
      }
      return count;
    };
  }
  if (!sp.find) sp.find = function(sub, start) {
    return this.indexOf(sub, start);
  };
  if (!sp.index) {
    sp.index = function(sub, start) {
      const idx = this.indexOf(sub, start);
      if (idx === -1) throw new Error(`ValueError: substring not found: ${sub}`);
      return idx;
    };
  }
}
if (typeof Array !== "undefined") {
  const ap = Array.prototype;
  if (!ap.count) {
    ap.count = function(val) {
      let c = 0;
      for (let i = 0; i < this.length; i++) {
        if (this[i] === val) c++;
      }
      return c;
    };
  }
  if (!ap.index) {
    ap.index = function(val) {
      const idx = this.indexOf(val);
      if (idx === -1) throw new Error(`ValueError: ${val} is not in list`);
      return idx;
    };
  }
  if (!ap.remove) {
    ap.remove = function(val) {
      const idx = this.indexOf(val);
      if (idx === -1) throw new Error(`ValueError: list.remove(x): x not in list`);
      this.splice(idx, 1);
    };
  }
  if (!ap.extend) {
    ap.extend = function(iterable) {
      if (iterable) {
        for (const item of iterable) {
          this.push(item);
        }
      }
    };
  }
  const originalSort = Array.prototype.sort;
  Array.prototype.sort = function(compareFn) {
    if (typeof compareFn === "function") {
      return originalSort.call(this, compareFn);
    }
    const allNumeric = this.length > 0 && this.every((x) => typeof x === "number" && !isNaN(x));
    if (allNumeric) {
      return originalSort.call(this, (a, b) => a - b);
    }
    return originalSort.call(this);
  };
}
function executePython(code, input) {
  const outputs = [];
  const normalizedInput = input.replace(/\r\n/g, "\n");
  const inputLines = normalizedInput.split("\n");
  let lineIndex = 0;
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean);
  let tokenIndex = 0;
  const sys = {
    stdin: {
      read: () => normalizedInput,
      readline: () => {
        if (lineIndex < inputLines.length) {
          return inputLines[lineIndex++];
        }
        return "";
      }
    },
    stdout: {
      write: (val) => outputs.push(String(val))
    }
  };
  const math = {
    sqrt: Math.sqrt,
    floor: Math.floor,
    ceil: Math.ceil,
    pow: Math.pow,
    abs: Math.abs,
    pi: Math.PI,
    e: Math.E,
    inf: Infinity,
    gcd: (a, b) => {
      let x = Math.abs(Math.round(a));
      let y = Math.abs(Math.round(b));
      while (y) {
        const t = y;
        y = x % y;
        x = t;
      }
      return x;
    },
    lcm: (a, b) => {
      if (a === 0 || b === 0) return 0;
      let x = Math.abs(Math.round(a));
      let y = Math.abs(Math.round(b));
      const prod = x * y;
      while (y) {
        const t = y;
        y = x % y;
        x = t;
      }
      return Math.round(prod / x);
    },
    factorial: (n) => {
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return r;
    },
    log: Math.log,
    log2: Math.log2,
    log10: Math.log10
  };
  const env = {
    sys,
    math,
    int: (val) => {
      if (val === void 0 || val === null || val === "") return 0;
      const parsed = parseInt(String(val).trim(), 10);
      return isNaN(parsed) ? 0 : parsed;
    },
    float: (val) => {
      if (val === void 0 || val === null || val === "") return 0;
      const parsed = parseFloat(String(val).trim());
      return isNaN(parsed) ? 0 : parsed;
    },
    str: (val) => String(val),
    len: (val) => val ? val.length !== void 0 ? val.length : Object.keys(val).length : 0,
    max: (...args) => {
      const flat = Array.isArray(args[0]) ? args[0] : args;
      return Math.max(...flat);
    },
    min: (...args) => {
      const flat = Array.isArray(args[0]) ? args[0] : args;
      return Math.min(...flat);
    },
    sum: (arr) => {
      if (!Array.isArray(arr)) return 0;
      return arr.reduce((a, b) => a + Number(b), 0);
    },
    abs: (n) => Math.abs(n),
    round: (n, decimals = 0) => decimals === 0 ? Math.round(n) : Number(n.toFixed(decimals)),
    pow: (base, exp, mod) => {
      if (mod) {
        return Number(BigInt(Math.floor(base)) ** BigInt(Math.floor(exp)) % BigInt(Math.floor(mod)));
      }
      return Math.pow(base, exp);
    },
    sorted: (arr) => {
      if (!Array.isArray(arr)) return [];
      return [...arr].sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
    },
    list: (iterable) => {
      if (Array.isArray(iterable)) return [...iterable];
      if (iterable && typeof iterable[Symbol.iterator] === "function") {
        return Array.from(iterable);
      }
      return [];
    },
    dict: () => ({}),
    set: (iterable) => new Set(iterable ? Array.isArray(iterable) ? iterable : Array.from(iterable) : []),
    enumerate: (iterable, start = 0) => {
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable || []);
      return arr.map((item, idx) => [idx + start, item]);
    },
    zip: (...iters) => {
      const arrays = iters.map((it) => Array.isArray(it) ? it : Array.from(it || []));
      const minLen = Math.min(...arrays.map((a) => a.length));
      const result = [];
      for (let i = 0; i < minLen; i++) {
        result.push(arrays.map((a) => a[i]));
      }
      return result;
    },
    reversed: (iterable) => {
      const arr = Array.isArray(iterable) ? [...iterable] : Array.from(iterable || []);
      return arr.reverse();
    },
    all: (iterable) => {
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable || []);
      return arr.every(Boolean);
    },
    any: (iterable) => {
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable || []);
      return arr.some(Boolean);
    },
    chr: (code2) => String.fromCharCode(code2),
    ord: (char) => char ? char.charCodeAt(0) : 0,
    intDiv: (a, b) => {
      if (b === 0) throw new Error("ZeroDivisionError: integer division or modulo by zero");
      return Math.floor(a / b);
    },
    div: (a, b) => {
      if (b === 0) throw new Error("ZeroDivisionError: division by zero");
      return a / b;
    },
    mod: (a, b) => {
      if (b === 0) throw new Error("ZeroDivisionError: integer division or modulo by zero");
      return (a % b + b) % b;
    },
    map: (fn, iterable) => {
      if (!iterable) return [];
      const arr = Array.isArray(iterable) ? iterable : Array.from(iterable);
      return arr.map(fn);
    },
    range: (start, stop, step = 1) => {
      if (stop === void 0) {
        stop = start;
        start = 0;
      }
      const res = [];
      if (step > 0) {
        for (let i = start; i < stop; i += step) res.push(i);
      } else {
        for (let i = start; i > stop; i += step) res.push(i);
      }
      return res;
    },
    print: (...args) => {
      const line = args.map((a) => {
        if (a === null) return "None";
        if (a === true) return "True";
        if (a === false) return "False";
        if (typeof a === "object") return JSON.stringify(a);
        return String(a);
      }).join(" ");
      outputs.push(line);
    },
    input: () => {
      if (lineIndex < inputLines.length) {
        return inputLines[lineIndex++];
      }
      if (tokenIndex < inputTokens.length) {
        return inputTokens[tokenIndex++];
      }
      return "";
    },
    True: true,
    False: false,
    None: null
  };
  try {
    const rawLines = code.split(/\r?\n/);
    const transformedLines = [];
    let hasMainExecution = false;
    for (const raw of rawLines) {
      let line = raw.replace(/#.*$/, "");
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("import ") || trimmed.startsWith("from ") || trimmed === "import") {
        line = line.replace(/^(.*)(import|from)(.*)$/, "// $1$2$3");
      }
      if (trimmed === "pass") {
        line = line.replace(/\bpass\b/, "// pass");
      }
      if (trimmed.includes("__name__ == '__main__'") || trimmed.includes('__name__ == "__main__"')) {
        hasMainExecution = true;
        line = line.replace(/if\s+__name__\s*==\s*['"]__main__['"]\s*:/, "if (true) {");
      }
      if (trimmed === "solve()" || trimmed === "main()") {
        hasMainExecution = true;
      }
      let divPrev;
      do {
        divPrev = line;
        line = line.replace(/\(([^()]+)\)\s*\/\/\s*\(([^()]+)\)/g, "intDiv(($1), ($2))").replace(/\(([^()]+)\)\s*\/\/\s*([a-zA-Z0-9_.]+)/g, "intDiv(($1), $2)").replace(/([a-zA-Z0-9_.]+)\s*\/\/\s*\(([^()]+)\)/g, "intDiv($1, ($2))").replace(/([a-zA-Z0-9_.]+)\s*\/\/\s*([a-zA-Z0-9_.]+)/g, "intDiv($1, $2)");
      } while (line !== divPrev);
      const ternaryRegex = /((?:'[^']*'|"[^"]*"|[^,\(\)\s]+))\s+if\s+([^:]+?)\s+else\s+((?:'[^']*'|"[^"]*"|[^,\(\)\s]+))/g;
      line = line.replace(ternaryRegex, "($2 ? $1 : $3)");
      line = line.replace(
        /\[\s*([a-zA-Z0-9_().+*\/ -]+)\s+for\s+([a-zA-Z0-9_]+)\s+in\s+([^\]]+)\]/g,
        "($3).map(($2) => $1)"
      );
      line = line.replace(
        /if\s+([a-zA-Z0-9_'"\(\)]+)\s+in\s+([a-zA-Z0-9_'"\(\)]+)\s*:/g,
        "if (($2).includes ? ($2).includes($1) : ($1 in $2)) {"
      );
      line = line.replace(
        /if\s+([a-zA-Z0-9_'"\(\)]+)\s+not\s+in\s+([a-zA-Z0-9_'"\(\)]+)\s*:/g,
        "if (!(($2).includes ? ($2).includes($1) : ($1 in $2))) {"
      );
      line = line.replace(/\band\s+/g, "&& ").replace(/\bor\s+/g, "|| ").replace(/\bnot\s+/g, "!").replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null").replace(/\.strip\(\)/g, ".trim()").replace(/\.rstrip\(\)/g, ".trimEnd()").replace(/\.lstrip\(\)/g, ".trimStart()").replace(/\.split\(\)/g, ".split(/\\s+/).filter(Boolean)").replace(/\.append\((.*?)\)/g, ".push($1)").replace(/\.lower\(\)/g, ".toLowerCase()").replace(/\.upper\(\)/g, ".toUpperCase()").replace(/\belif\s+(.*?):/g, "else if ($1) {").replace(/\bdef\s+([a-zA-Z0-9_]+)\s*\((.*?)\):/g, "function $1($2) {").replace(/\bfor\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\):/g, "for (let $1 of range($2)) {").replace(/\bfor\s+([a-zA-Z0-9_]+)\s+in\s+(.*?):/g, "for (let $1 of $2) {").replace(/\bwhile\s+(.*?):/g, "while ($1) {").replace(/\bif\s+(.*?):/g, "if ($1) {").replace(/\belse\s*:/g, "else {");
      if (/^[a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+\s*=/.test(trimmed)) {
        line = line.replace(
          /^(\s*)([a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+)\s*=\s*(.*)$/,
          "$1let [$2] = $4"
        );
      }
      transformedLines.push(line);
    }
    let formattedJs = "";
    const indentStack = [0];
    for (let i = 0; i < transformedLines.length; i++) {
      const line = transformedLines[i];
      const trimmed = line.trim();
      const indent = line.search(/\S/);
      while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        formattedJs += "}\n";
      }
      formattedJs += trimmed + "\n";
      if (trimmed.endsWith("{")) {
        indentStack.push(indent + 4);
      }
    }
    while (indentStack.length > 1) {
      indentStack.pop();
      formattedJs += "}\n";
    }
    if (!hasMainExecution) {
      formattedJs += `
if (typeof solve === 'function') {
  solve();
} else if (typeof main === 'function') {
  main();
}
`;
    }
    const keys = Object.keys(env);
    const values = Object.values(env);
    const runner = new Function(...keys, formattedJs);
    runner(...values);
    return { output: outputs.join("\n").trim() };
  } catch (err) {
    return {
      output: outputs.join("\n").trim(),
      error: err.message || "Execution error"
    };
  }
}

// src/lib/runner/cppRunner.ts
function executeCpp(code, input) {
  const outputs = [];
  const normalizedInput = input.replace(/\r\n/g, "\n");
  const tokens = normalizedInput.trim().split(/\s+/).filter(Boolean);
  let tokenIdx = 0;
  const inputLines = normalizedInput.split("\n");
  let lineIdx = 0;
  let lastReadOk = true;
  const __cin = {
    next: () => {
      if (tokenIdx < tokens.length) {
        lastReadOk = true;
        const val = tokens[tokenIdx++];
        const num = Number(val);
        return isNaN(num) ? val : num;
      }
      lastReadOk = false;
      return 0;
    },
    nextString: () => {
      if (tokenIdx < tokens.length) {
        lastReadOk = true;
        return tokens[tokenIdx++];
      }
      lastReadOk = false;
      return "";
    },
    nextLine: () => {
      if (lineIdx < inputLines.length) {
        lastReadOk = true;
        return inputLines[lineIdx++];
      }
      lastReadOk = false;
      return "";
    },
    hasNext: () => tokenIdx < tokens.length,
    ok: () => lastReadOk
  };
  let currentLineBuffer = "";
  const __cout = {
    write: (val) => {
      if (val === void 0 || val === null) return;
      const s = String(val);
      if (s.includes("\n")) {
        const parts = s.split("\n");
        currentLineBuffer += parts[0];
        outputs.push(currentLineBuffer);
        for (let i = 1; i < parts.length - 1; i++) {
          outputs.push(parts[i]);
        }
        currentLineBuffer = parts[parts.length - 1];
      } else {
        currentLineBuffer += s;
      }
    },
    endl: () => {
      outputs.push(currentLineBuffer);
      currentLineBuffer = "";
    },
    flush: () => {
      if (currentLineBuffer.length > 0) {
        outputs.push(currentLineBuffer);
        currentLineBuffer = "";
      }
    }
  };
  const env = {
    __cin,
    __cout,
    endl: "\n",
    INT_MAX: 2147483647,
    INT_MIN: -2147483648,
    LLONG_MAX: Number.MAX_SAFE_INTEGER,
    LLONG_MIN: Number.MIN_SAFE_INTEGER,
    min: (...args) => Math.min(...args),
    max: (...args) => Math.max(...args),
    abs: (x) => Math.abs(x),
    sqrt: (x) => Math.sqrt(x),
    pow: (b, e) => Math.pow(b, e),
    __gcd: (a, b) => {
      let x = Math.abs(Math.round(a));
      let y = Math.abs(Math.round(b));
      while (y) {
        const t = y;
        y = x % y;
        x = t;
      }
      return x;
    },
    gcd: (a, b) => {
      let x = Math.abs(Math.round(a));
      let y = Math.abs(Math.round(b));
      while (y) {
        const t = y;
        y = x % y;
        x = t;
      }
      return x;
    },
    to_string: (x) => String(x),
    stoi: (s) => parseInt(String(s), 10) || 0,
    stoll: (s) => parseInt(String(s), 10) || 0,
    stod: (s) => parseFloat(String(s)) || 0,
    printf: (...args) => {
      if (args.length > 0) {
        __cout.write(args.join(" "));
      }
    }
  };
  try {
    let cleanCode = code;
    cleanCode = cleanCode.replace(/\/\*[\s\S]*?\*\//g, "");
    cleanCode = cleanCode.replace(/\/\/.*$/gm, "");
    cleanCode = cleanCode.replace(/^\s*#include\s*<.*?>/gm, "");
    cleanCode = cleanCode.replace(/^\s*#include\s*".*?"/gm, "");
    cleanCode = cleanCode.replace(/^\s*#define\s+.*$/gm, "");
    cleanCode = cleanCode.replace(/^\s*using\s+namespace\s+std\s*;/gm, "");
    cleanCode = cleanCode.replace(/std::/g, "");
    cleanCode = cleanCode.replace(/ios_base::sync_with_stdio\(.*?\);?/g, "");
    cleanCode = cleanCode.replace(/cin\.tie\(.*?\);?/g, "");
    cleanCode = cleanCode.replace(/cout\.tie\(.*?\);?/g, "");
    cleanCode = cleanCode.replace(/cout\s*<<\s*([^\n;]+);/g, (_match, exprList) => {
      const parts = exprList.split("<<").map((p) => p.trim()).filter(Boolean);
      const statements = parts.map((p) => {
        if (p === "endl" || p === "'\\n'" || p === '"\\n"') {
          return "__cout.endl()";
        }
        return `__cout.write(${p})`;
      });
      return "{ " + statements.join("; ") + "; }";
    });
    cleanCode = cleanCode.replace(/\b(if|while)\s*\(\s*cin\s*>>\s*([^\)]+)\)/g, (_match, kw, varList) => {
      const vars = varList.split(">>").map((v) => v.trim()).filter(Boolean);
      const assignments = vars.map((v) => `${v} = __cin.next()`).join(", ");
      return `${kw} ((${assignments}), __cin.ok())`;
    });
    cleanCode = cleanCode.replace(/cin\s*>>\s*([^\n;]+);/g, (_match, varList) => {
      const vars = varList.split(">>").map((v) => v.trim()).filter(Boolean);
      const statements = vars.map((v) => {
        return `${v} = __cin.next()`;
      });
      return "{ " + statements.join("; ") + "; }";
    });
    cleanCode = cleanCode.replace(/getline\s*\(\s*cin\s*,\s*([a-zA-Z0-9_]+)\s*\)/g, "$1 = __cin.nextLine()");
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*;/g, "let $1 = new Array($2).fill($3);");
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*\(\s*([^)]+)\s*\)\s*;/g, "let $1 = new Array($2).fill(0);");
    cleanCode = cleanCode.replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, "let $1 = [];");
    cleanCode = cleanCode.replace(/\b(?:int|long\s+long|double|float|char|bool)\s+([a-zA-Z0-9_]+)\s*\[\s*([^\]]+)\s*\]\s*;/g, "let $1 = new Array($2).fill(0);");
    cleanCode = cleanCode.replace(/sort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*,\s*greater\s*<[^>]+>\s*\(\s*\)\s*\)/g, "$1.sort((a, b) => b - a)");
    cleanCode = cleanCode.replace(/sort\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.sort((a, b) => a - b)");
    cleanCode = cleanCode.replace(/reverse\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*\1\.end\(\)\s*\)/g, "$1.reverse()");
    cleanCode = cleanCode.replace(/\.push_back\s*\(/g, ".push(");
    cleanCode = cleanCode.replace(/\.pop_back\s*\(\s*\)/g, ".pop()");
    cleanCode = cleanCode.replace(/\.size\s*\(\s*\)/g, ".length");
    const typeRegex = /\b(?:int|long\s+long|long|double|float|bool|string|char|auto)\s+([a-zA-Z0-9_,\s=+\-*/%()]+);/g;
    cleanCode = cleanCode.replace(typeRegex, (_match, declBody) => {
      const decls = declBody.split(",").map((d) => {
        const item = d.trim();
        if (item.includes("=")) {
          return item;
        }
        return `${item} = 0`;
      });
      return `let ${decls.join(", ")};`;
    });
    cleanCode = cleanCode.replace(/for\s*\(\s*(?:int|long\s+long|long|size_t|auto)\s+/g, "for (let ");
    cleanCode = cleanCode.replace(/\b(?:int|void|long\s+long|double|string|bool)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g, (_m, fnName, params) => {
      const cleanParams = params.split(",").map((p) => {
        const parts = p.trim().split(/\s+/);
        return parts[parts.length - 1].replace(/[&*]/g, "");
      }).filter(Boolean).join(", ");
      return `function ${fnName}(${cleanParams}) {`;
    });
    cleanCode += `
__cout.flush();
if (typeof main === 'function') {
  main();
} else if (typeof solve === 'function') {
  solve();
}
__cout.flush();
`;
    const keys = Object.keys(env);
    const values = Object.values(env);
    const runner = new Function(...keys, cleanCode);
    runner(...values);
    __cout.flush();
    return { output: outputs.join("\n").trim() };
  } catch (err) {
    return {
      output: outputs.join("\n").trim(),
      error: err.message || "C++ execution error"
    };
  }
}

// src/lib/runner/javaRunner.ts
function executeJava(code, input) {
  const outputs = [];
  const normalizedInput = input.replace(/\r\n/g, "\n");
  const tokens = normalizedInput.trim().split(/\s+/).filter(Boolean);
  const inputLines = normalizedInput.split("\n");
  let currentLineBuffer = "";
  const System = {
    in: {},
    out: {
      println: (...args) => {
        if (args.length === 0) {
          outputs.push(currentLineBuffer);
          currentLineBuffer = "";
          return;
        }
        currentLineBuffer += args.map((a) => String(a)).join(" ");
        outputs.push(currentLineBuffer);
        currentLineBuffer = "";
      },
      print: (...args) => {
        currentLineBuffer += args.map((a) => String(a)).join(" ");
        if (currentLineBuffer.includes("\n")) {
          const parts = currentLineBuffer.split("\n");
          for (let i = 0; i < parts.length - 1; i++) {
            outputs.push(parts[i]);
          }
          currentLineBuffer = parts[parts.length - 1];
        }
      },
      printf: (format, ...args) => {
        let formatted = format;
        for (const arg of args) {
          formatted = formatted.replace(/%[dsf]/, String(arg));
        }
        System.out.print(formatted);
      },
      flush: () => {
        if (currentLineBuffer.length > 0) {
          outputs.push(currentLineBuffer);
          currentLineBuffer = "";
        }
      }
    }
  };
  class Scanner {
    tokenIdx = 0;
    lineIdx = 0;
    constructor(_source) {
      this.tokenIdx = 0;
      this.lineIdx = 0;
    }
    nextInt() {
      if (this.tokenIdx < tokens.length) {
        return parseInt(tokens[this.tokenIdx++], 10) || 0;
      }
      return 0;
    }
    nextLong() {
      if (this.tokenIdx < tokens.length) {
        return parseInt(tokens[this.tokenIdx++], 10) || 0;
      }
      return 0;
    }
    nextDouble() {
      if (this.tokenIdx < tokens.length) {
        return parseFloat(tokens[this.tokenIdx++]) || 0;
      }
      return 0;
    }
    nextFloat() {
      return this.nextDouble();
    }
    next() {
      if (this.tokenIdx < tokens.length) {
        return tokens[this.tokenIdx++];
      }
      return "";
    }
    nextLine() {
      if (this.lineIdx < inputLines.length) {
        return inputLines[this.lineIdx++];
      }
      return "";
    }
    hasNext() {
      return this.tokenIdx < tokens.length;
    }
    hasNextInt() {
      return this.hasNext() && !isNaN(Number(tokens[this.tokenIdx]));
    }
    hasNextLong() {
      return this.hasNext() && !isNaN(Number(tokens[this.tokenIdx]));
    }
    hasNextDouble() {
      return this.hasNext() && !isNaN(Number(tokens[this.tokenIdx]));
    }
    hasNextLine() {
      return this.lineIdx < inputLines.length;
    }
    close() {
    }
  }
  const Arrays = {
    sort: (arr, ...args) => {
      if (Array.isArray(arr)) {
        if (args.length === 0) {
          arr.sort((a, b) => typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b)));
        }
      }
    },
    fill: (arr, val) => {
      if (Array.isArray(arr)) arr.fill(val);
    },
    toString: (arr) => JSON.stringify(arr)
  };
  const Collections = {
    sort: (list) => {
      if (Array.isArray(list)) {
        list.sort((a, b) => a - b);
      }
    },
    reverse: (list) => {
      if (Array.isArray(list)) list.reverse();
    }
  };
  const env = {
    System,
    Scanner,
    Arrays,
    Collections,
    Integer: {
      parseInt: (s) => parseInt(String(s), 10) || 0,
      MAX_VALUE: 2147483647,
      MIN_VALUE: -2147483648
    },
    Long: {
      parseLong: (s) => parseInt(String(s), 10) || 0,
      MAX_VALUE: Number.MAX_SAFE_INTEGER,
      MIN_VALUE: Number.MIN_SAFE_INTEGER
    },
    Double: {
      parseDouble: (s) => parseFloat(String(s)) || 0
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
      PI: Math.PI
    }
  };
  try {
    let cleanCode = code;
    cleanCode = cleanCode.replace(/\/\*[\s\S]*?\*\//g, "");
    cleanCode = cleanCode.replace(/\/\/.*$/gm, "");
    cleanCode = cleanCode.replace(/^\s*package\s+.*?;/gm, "");
    cleanCode = cleanCode.replace(/^\s*import\s+.*?;/gm, "");
    cleanCode = cleanCode.replace(/(?:public\s+)?class\s+([a-zA-Z0-9_]+)\s*\{/, "");
    const lastBrace = cleanCode.lastIndexOf("}");
    if (lastBrace !== -1) {
      cleanCode = cleanCode.substring(0, lastBrace) + cleanCode.substring(lastBrace + 1);
    }
    cleanCode = cleanCode.replace(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*[a-zA-Z0-9_]*\s*\)/g, "function main()");
    cleanCode = cleanCode.replace(/public\s+static\s+(?:void|int|long|double|boolean|String)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g, (_m, fnName, params) => {
      const cleanParams = params.split(",").map((p) => {
        const parts = p.trim().split(/\s+/);
        return parts[parts.length - 1];
      }).filter(Boolean).join(", ");
      return `function ${fnName}(${cleanParams})`;
    });
    cleanCode = cleanCode.replace(/(?:int|long|double|float|boolean|String)\s*\[\s*\]\s*([a-zA-Z0-9_]+)\s*=\s*new\s+(?:int|long|double|float|boolean|String)\s*\[\s*([^\]]+)\s*\]\s*;/g, "let $1 = new Array($2).fill(0);");
    cleanCode = cleanCode.replace(/\b(?:Scanner|BufferedReader|StringTokenizer|StringBuilder|ArrayList|List|Set|Map|HashMap|HashSet)\s+([a-zA-Z0-9_]+)\s*=\s*new\s+/g, "let $1 = new ");
    cleanCode = cleanCode.replace(/(?:ArrayList|List)\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+(?:ArrayList|List)\s*<[^>]*>\s*\(\s*\)\s*;/g, "let $1 = [];");
    const typeRegex = /\b(?:int|long|double|float|boolean|char|String)\s+([a-zA-Z0-9_,\s=+\-*/%().]+);/g;
    cleanCode = cleanCode.replace(typeRegex, (_match, declBody) => {
      const decls = declBody.split(",").map((d) => {
        const item = d.trim();
        if (item.includes("=")) {
          return item;
        }
        return `${item} = 0`;
      });
      return `let ${decls.join(", ")};`;
    });
    cleanCode = cleanCode.replace(/for\s*\(\s*(?:int|long|double)\s+/g, "for (let ");
    cleanCode = cleanCode.replace(/for\s*\(\s*(?:int|long|double|String|char)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_]+)\s*\)/g, "for (let $1 of $2)");
    cleanCode = cleanCode.replace(/\.charAt\s*\(\s*([^)]+)\s*\)/g, "[$1]");
    cleanCode = cleanCode.replace(/\.length\s*\(\s*\)/g, ".length");
    cleanCode += `
if (typeof main === 'function') {
  main();
}
System.out.flush();
`;
    const keys = Object.keys(env);
    const values = Object.values(env);
    const runner = new Function(...keys, cleanCode);
    runner(...values);
    System.out.flush();
    return { output: outputs.join("\n").trim() };
  } catch (err) {
    return {
      output: outputs.join("\n").trim(),
      error: err.message || "Java execution error"
    };
  }
}

// src/server/data/serverTestCases.ts
var serverTestCases = {
  "belt-1-q1-sum-of-two-numbers": {
    "title": "Sum of Two Numbers",
    "slug": "belt-1-q1-sum-of-two-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "15 27",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "100 250",
        "expectedOutput": "350",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8 12",
        "expectedOutput": "20",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "0 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-5 10",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-20 -30",
        "expectedOutput": "-50",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "999 1",
        "expectedOutput": "1000",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "450 550",
        "expectedOutput": "1000",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-100 100",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12345 67890",
        "expectedOutput": "80235",
        "isHidden": true
      }
    ]
  },
  "belt-1-q2-difference-of-two-numbers": {
    "title": "Difference of Two Numbers",
    "slug": "belt-1-q2-difference-of-two-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "50 20",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "25 40",
        "expectedOutput": "-15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "100 100",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "0 15",
        "expectedOutput": "-15",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "15 0",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-10 -20",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "-30 15",
        "expectedOutput": "-45",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "500 250",
        "expectedOutput": "250",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1234 234",
        "expectedOutput": "1000",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "99 -99",
        "expectedOutput": "198",
        "isHidden": true
      }
    ]
  },
  "belt-1-q3-product-of-two-numbers": {
    "title": "Product of Two Numbers",
    "slug": "belt-1-q3-product-of-two-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8 7",
        "expectedOutput": "56",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "12 5",
        "expectedOutput": "60",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "0 100",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9 9",
        "expectedOutput": "81",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-4 5",
        "expectedOutput": "-20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-6 -7",
        "expectedOutput": "42",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "25 4",
        "expectedOutput": "100",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "100 50",
        "expectedOutput": "5000",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "15 15",
        "expectedOutput": "225",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1 9999",
        "expectedOutput": "9999",
        "isHidden": true
      }
    ]
  },
  "belt-1-q4-calculate-rectangle-area": {
    "title": "Calculate Rectangle Area",
    "slug": "belt-1-q4-calculate-rectangle-area",
    "testCases": [
      {
        "testIndex": 1,
        "input": "10 5",
        "expectedOutput": "50",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "12 8",
        "expectedOutput": "96",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1 1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "20 15",
        "expectedOutput": "300",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "100 200",
        "expectedOutput": "20000",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "50 50",
        "expectedOutput": "2500",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7 23",
        "expectedOutput": "161",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "99 10",
        "expectedOutput": "990",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "35 12",
        "expectedOutput": "420",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "40 25",
        "expectedOutput": "1000",
        "isHidden": true
      }
    ]
  },
  "belt-1-q5-calculate-total-marks": {
    "title": "Calculate Total Marks",
    "slug": "belt-1-q5-calculate-total-marks",
    "testCases": [
      {
        "testIndex": 1,
        "input": "78 85 92",
        "expectedOutput": "255",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "65 70 80",
        "expectedOutput": "215",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "100 100 100",
        "expectedOutput": "300",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "0 0 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "50 60 70",
        "expectedOutput": "180",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "90 80 85",
        "expectedOutput": "255",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "40 45 50",
        "expectedOutput": "135",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "95 98 92",
        "expectedOutput": "285",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "33 35 40",
        "expectedOutput": "108",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "88 77 66",
        "expectedOutput": "231",
        "isHidden": true
      }
    ]
  },
  "belt-1-q6-calculate-average": {
    "title": "Calculate Average",
    "slug": "belt-1-q6-calculate-average",
    "testCases": [
      {
        "testIndex": 1,
        "input": "80 90 70",
        "expectedOutput": "80",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "75 85 95",
        "expectedOutput": "85",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "60 60 60",
        "expectedOutput": "60",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "90 90 90",
        "expectedOutput": "90",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "100 100 100",
        "expectedOutput": "100",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "50 60 70",
        "expectedOutput": "60",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "70 80 90",
        "expectedOutput": "80",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "30 40 50",
        "expectedOutput": "40",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "85 85 85",
        "expectedOutput": "85",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "45 55 65",
        "expectedOutput": "55",
        "isHidden": true
      }
    ]
  },
  "belt-1-q7-convert-minutes-to-hours-and-minutes": {
    "title": "Convert Minutes to Hours and Minutes",
    "slug": "belt-1-q7-convert-minutes-to-hours-and-minutes",
    "testCases": [
      {
        "testIndex": 1,
        "input": "135",
        "expectedOutput": "2 15",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "200",
        "expectedOutput": "3 20",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "60",
        "expectedOutput": "1 0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "59",
        "expectedOutput": "0 59",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "120",
        "expectedOutput": "2 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "350",
        "expectedOutput": "5 50",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0",
        "expectedOutput": "0 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "720",
        "expectedOutput": "12 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1445",
        "expectedOutput": "24 5",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "45",
        "expectedOutput": "0 45",
        "isHidden": true
      }
    ]
  },
  "belt-1-q8-check-even-or-odd": {
    "title": "Check Even or Odd",
    "slug": "belt-1-q8-check-even-or-odd",
    "testCases": [
      {
        "testIndex": 1,
        "input": "24",
        "expectedOutput": "Even",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "37",
        "expectedOutput": "Odd",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "0",
        "expectedOutput": "Even",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1",
        "expectedOutput": "Odd",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "100",
        "expectedOutput": "Even",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "999",
        "expectedOutput": "Odd",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2",
        "expectedOutput": "Even",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-4",
        "expectedOutput": "Even",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-7",
        "expectedOutput": "Odd",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "42",
        "expectedOutput": "Even",
        "isHidden": true
      }
    ]
  },
  "belt-1-q9-check-positive-negative-or-zero": {
    "title": "Check Positive, Negative, or Zero",
    "slug": "belt-1-q9-check-positive-negative-or-zero",
    "testCases": [
      {
        "testIndex": 1,
        "input": "25",
        "expectedOutput": "Positive",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-14",
        "expectedOutput": "Negative",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "0",
        "expectedOutput": "Zero",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1",
        "expectedOutput": "Positive",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-1",
        "expectedOutput": "Negative",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1000",
        "expectedOutput": "Positive",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "-500",
        "expectedOutput": "Negative",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "99",
        "expectedOutput": "Positive",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-88",
        "expectedOutput": "Negative",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "42",
        "expectedOutput": "Positive",
        "isHidden": true
      }
    ]
  },
  "belt-1-q10-compare-two-numbers": {
    "title": "Compare Two Numbers",
    "slug": "belt-1-q10-compare-two-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "45 30",
        "expectedOutput": "Greater",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "25 25",
        "expectedOutput": "Equal",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10 50",
        "expectedOutput": "Less",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "0 0",
        "expectedOutput": "Equal",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-5 5",
        "expectedOutput": "Less",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "100 -100",
        "expectedOutput": "Greater",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "-20 -10",
        "expectedOutput": "Less",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-15 -30",
        "expectedOutput": "Greater",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "999 999",
        "expectedOutput": "Equal",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12 13",
        "expectedOutput": "Less",
        "isHidden": true
      }
    ]
  },
  "belt-1-q11-check-voting-eligibility": {
    "title": "Check Voting Eligibility",
    "slug": "belt-1-q11-check-voting-eligibility",
    "testCases": [
      {
        "testIndex": 1,
        "input": "21",
        "expectedOutput": "Eligible",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "16",
        "expectedOutput": "Not Eligible",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "18",
        "expectedOutput": "Eligible",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "17",
        "expectedOutput": "Not Eligible",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "65",
        "expectedOutput": "Eligible",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5",
        "expectedOutput": "Not Eligible",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "100",
        "expectedOutput": "Eligible",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "19",
        "expectedOutput": "Eligible",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "12",
        "expectedOutput": "Not Eligible",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "40",
        "expectedOutput": "Eligible",
        "isHidden": true
      }
    ]
  },
  "belt-1-q12-find-the-larger-number": {
    "title": "Find the Larger Number",
    "slug": "belt-1-q12-find-the-larger-number",
    "testCases": [
      {
        "testIndex": 1,
        "input": "35 72",
        "expectedOutput": "72",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "90 45",
        "expectedOutput": "90",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "50 50",
        "expectedOutput": "50",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-10 -5",
        "expectedOutput": "-5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-20 10",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "0 15",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "999 1000",
        "expectedOutput": "1000",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7 2",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-50 -100",
        "expectedOutput": "-50",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "123 321",
        "expectedOutput": "321",
        "isHidden": true
      }
    ]
  },
  "belt-1-q13-check-divisibility": {
    "title": "Check Divisibility",
    "slug": "belt-1-q13-check-divisibility",
    "testCases": [
      {
        "testIndex": 1,
        "input": "40 8",
        "expectedOutput": "Divisible",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "35 6",
        "expectedOutput": "Not Divisible",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "100 10",
        "expectedOutput": "Divisible",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "25 5",
        "expectedOutput": "Divisible",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "49 7",
        "expectedOutput": "Divisible",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "15 4",
        "expectedOutput": "Not Divisible",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "50 25",
        "expectedOutput": "Divisible",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "13 3",
        "expectedOutput": "Not Divisible",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "81 9",
        "expectedOutput": "Divisible",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "100 3",
        "expectedOutput": "Not Divisible",
        "isHidden": true
      }
    ]
  },
  "belt-1-q14-check-number-range": {
    "title": "Check Number Range",
    "slug": "belt-1-q14-check-number-range",
    "testCases": [
      {
        "testIndex": 1,
        "input": "35",
        "expectedOutput": "In Range",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "65",
        "expectedOutput": "Out of Range",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10",
        "expectedOutput": "In Range",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "50",
        "expectedOutput": "In Range",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9",
        "expectedOutput": "Out of Range",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "51",
        "expectedOutput": "Out of Range",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "25",
        "expectedOutput": "In Range",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "0",
        "expectedOutput": "Out of Range",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-15",
        "expectedOutput": "Out of Range",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "42",
        "expectedOutput": "In Range",
        "isHidden": true
      }
    ]
  },
  "belt-1-q15-pass-or-fail": {
    "title": "Pass or Fail",
    "slug": "belt-1-q15-pass-or-fail",
    "testCases": [
      {
        "testIndex": 1,
        "input": "68",
        "expectedOutput": "Pass",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "35",
        "expectedOutput": "Fail",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "40",
        "expectedOutput": "Pass",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "39",
        "expectedOutput": "Fail",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "100",
        "expectedOutput": "Pass",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "0",
        "expectedOutput": "Fail",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "41",
        "expectedOutput": "Pass",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "85",
        "expectedOutput": "Pass",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "25",
        "expectedOutput": "Fail",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "50",
        "expectedOutput": "Pass",
        "isHidden": true
      }
    ]
  },
  "belt-1-q16-largest-of-three-numbers": {
    "title": "Largest of Three Numbers",
    "slug": "belt-1-q16-largest-of-three-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "15 42 28",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "90 75 88",
        "expectedOutput": "90",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10 20 30",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "30 20 10",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5 5 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-10 -5 -2",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "100 50 200",
        "expectedOutput": "200",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "0 0 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "45 85 65",
        "expectedOutput": "85",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-20 0 20",
        "expectedOutput": "20",
        "isHidden": true
      }
    ]
  },
  "belt-1-q17-grade-calculator": {
    "title": "Grade Calculator",
    "slug": "belt-1-q17-grade-calculator",
    "testCases": [
      {
        "testIndex": 1,
        "input": "92",
        "expectedOutput": "A",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "68",
        "expectedOutput": "C",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "100",
        "expectedOutput": "A",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "90",
        "expectedOutput": "A",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "89",
        "expectedOutput": "B",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "75",
        "expectedOutput": "B",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "74",
        "expectedOutput": "C",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "60",
        "expectedOutput": "C",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "59",
        "expectedOutput": "D",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "35",
        "expectedOutput": "F",
        "isHidden": true
      }
    ]
  },
  "belt-1-q18-simple-calculator": {
    "title": "Simple Calculator",
    "slug": "belt-1-q18-simple-calculator",
    "testCases": [
      {
        "testIndex": 1,
        "input": "20 5 *",
        "expectedOutput": "100",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "50 10 /",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "15 30 +",
        "expectedOutput": "45",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "80 25 -",
        "expectedOutput": "55",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "12 4 *",
        "expectedOutput": "48",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "100 4 /",
        "expectedOutput": "25",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7 8 +",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "45 15 /",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10 10 -",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6 7 *",
        "expectedOutput": "42",
        "isHidden": true
      }
    ]
  },
  "belt-1-q19-determine-triangle-type": {
    "title": "Determine Triangle Type",
    "slug": "belt-1-q19-determine-triangle-type",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6 6 6",
        "expectedOutput": "Equilateral",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5 5 8",
        "expectedOutput": "Isosceles",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3 4 5",
        "expectedOutput": "Scalene",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "10 10 10",
        "expectedOutput": "Equilateral",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7 9 7",
        "expectedOutput": "Isosceles",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8 12 12",
        "expectedOutput": "Isosceles",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6 8 10",
        "expectedOutput": "Scalene",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "15 15 20",
        "expectedOutput": "Isosceles",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5 6 7",
        "expectedOutput": "Scalene",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "9 9 9",
        "expectedOutput": "Equilateral",
        "isHidden": true
      }
    ]
  },
  "belt-1-q20-electricity-bill": {
    "title": "Electricity Bill",
    "slug": "belt-1-q20-electricity-bill",
    "testCases": [
      {
        "testIndex": 1,
        "input": "150",
        "expectedOutput": "350",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "250",
        "expectedOutput": "750",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "50",
        "expectedOutput": "100",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "100",
        "expectedOutput": "200",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "200",
        "expectedOutput": "500",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "300",
        "expectedOutput": "1000",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "120",
        "expectedOutput": "260",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "180",
        "expectedOutput": "440",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "500",
        "expectedOutput": "2000",
        "isHidden": true
      }
    ]
  },
  "belt-2-q1-print-numbers-from-1-to-n": {
    "title": "Print Numbers from 1 to N",
    "slug": "belt-2-q1-print-numbers-from-1-to-n",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1 2 3 4 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "1 2 3 4 5 6 7 8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "15",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6",
        "expectedOutput": "1 2 3 4 5 6",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "12",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10 11 12",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
        "isHidden": true
      }
    ]
  },
  "belt-2-q2-print-numbers-from-n-to-1": {
    "title": "Print Numbers from N to 1",
    "slug": "belt-2-q2-print-numbers-from-n-to-1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5 4 3 2 1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7",
        "expectedOutput": "7 6 5 4 3 2 1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "2 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10",
        "expectedOutput": "10 9 8 7 6 5 4 3 2 1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12",
        "expectedOutput": "12 11 10 9 8 7 6 5 4 3 2 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4",
        "expectedOutput": "4 3 2 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6",
        "expectedOutput": "6 5 4 3 2 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "15",
        "expectedOutput": "15 14 13 12 11 10 9 8 7 6 5 4 3 2 1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20",
        "expectedOutput": "20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q3-sum-of-first-n-natural-numbers": {
    "title": "Sum of First N Natural Numbers",
    "slug": "belt-2-q3-sum-of-first-n-natural-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "15",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "10",
        "expectedOutput": "55",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "20",
        "expectedOutput": "210",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "50",
        "expectedOutput": "1275",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "100",
        "expectedOutput": "5050",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7",
        "expectedOutput": "28",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "15",
        "expectedOutput": "120",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "30",
        "expectedOutput": "465",
        "isHidden": true
      }
    ]
  },
  "belt-2-q4-sum-of-even-numbers": {
    "title": "Sum of Even Numbers",
    "slug": "belt-2-q4-sum-of-even-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "15",
        "expectedOutput": "56",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "20",
        "expectedOutput": "110",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "30",
        "expectedOutput": "240",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "50",
        "expectedOutput": "650",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7",
        "expectedOutput": "12",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12",
        "expectedOutput": "42",
        "isHidden": true
      }
    ]
  },
  "belt-2-q5-sum-of-odd-numbers": {
    "title": "Sum of Odd Numbers",
    "slug": "belt-2-q5-sum-of-odd-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "25",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "15",
        "expectedOutput": "64",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "20",
        "expectedOutput": "100",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "30",
        "expectedOutput": "225",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "50",
        "expectedOutput": "625",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "11",
        "expectedOutput": "36",
        "isHidden": true
      }
    ]
  },
  "belt-2-q6-multiplication-table": {
    "title": "Multiplication Table",
    "slug": "belt-2-q6-multiplication-table",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5 10 15 20 25 30 35 40 45 50",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7",
        "expectedOutput": "7 14 21 28 35 42 49 56 63 70",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "2 4 6 8 10 12 14 16 18 20",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10",
        "expectedOutput": "10 20 30 40 50 60 70 80 90 100",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12",
        "expectedOutput": "12 24 36 48 60 72 84 96 108 120",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9",
        "expectedOutput": "9 18 27 36 45 54 63 72 81 90",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3",
        "expectedOutput": "3 6 9 12 15 18 21 24 27 30",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "15",
        "expectedOutput": "15 30 45 60 75 90 105 120 135 150",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "25",
        "expectedOutput": "25 50 75 100 125 150 175 200 225 250",
        "isHidden": true
      }
    ]
  },
  "belt-2-q7-count-digits": {
    "title": "Count Digits",
    "slug": "belt-2-q7-count-digits",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5832",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "90751",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "10",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "100000",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "999",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "12345678",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "42",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "700",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1000000",
        "expectedOutput": "7",
        "isHidden": true
      }
    ]
  },
  "belt-2-q8-sum-of-digits": {
    "title": "Sum of Digits",
    "slug": "belt-2-q8-sum-of-digits",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5832",
        "expectedOutput": "18",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9075",
        "expectedOutput": "21",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "123",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9999",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "100",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7890",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4444",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10101",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "88",
        "expectedOutput": "16",
        "isHidden": true
      }
    ]
  },
  "belt-2-q9-reverse-a-number": {
    "title": "Reverse a Number",
    "slug": "belt-2-q9-reverse-a-number",
    "testCases": [
      {
        "testIndex": 1,
        "input": "12345",
        "expectedOutput": "54321",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "708",
        "expectedOutput": "807",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "100",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "456",
        "expectedOutput": "654",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "9876",
        "expectedOutput": "6789",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1200",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "555",
        "expectedOutput": "555",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10203",
        "expectedOutput": "30201",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "84",
        "expectedOutput": "48",
        "isHidden": true
      }
    ]
  },
  "belt-2-q10-count-even-digits": {
    "title": "Count Even Digits",
    "slug": "belt-2-q10-count-even-digits",
    "testCases": [
      {
        "testIndex": 1,
        "input": "482731",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "13579",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "24680",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "12345",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "0",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "888",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1024",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9999",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2048",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "77",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-2-q11-count-odd-digits": {
    "title": "Count Odd Digits",
    "slug": "belt-2-q11-count-odd-digits",
    "testCases": [
      {
        "testIndex": 1,
        "input": "482731",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "24680",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "13579",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "12345",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "999",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "888",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "707",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1024",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "55",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-2-q12-find-the-largest-digit": {
    "title": "Find the Largest Digit",
    "slug": "belt-2-q12-find-the-largest-digit",
    "testCases": [
      {
        "testIndex": 1,
        "input": "58321",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "70496",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "111",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "90",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2384",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8899",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1000",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "753",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "642",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-2-q13-find-the-smallest-digit": {
    "title": "Find the Smallest Digit",
    "slug": "belt-2-q13-find-the-smallest-digit",
    "testCases": [
      {
        "testIndex": 1,
        "input": "58321",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "70496",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "999",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "123",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "846",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "375",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "100",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "444",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "82",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-2-q14-check-palindrome-number": {
    "title": "Check Palindrome Number",
    "slug": "belt-2-q14-check-palindrome-number",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1221",
        "expectedOutput": "Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1234",
        "expectedOutput": "Not Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "121",
        "expectedOutput": "Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1001",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10",
        "expectedOutput": "Not Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "99999",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "12321",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4554",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "789",
        "expectedOutput": "Not Palindrome",
        "isHidden": true
      }
    ]
  },
  "belt-2-q15-calculate-factorial": {
    "title": "Calculate Factorial",
    "slug": "belt-2-q15-calculate-factorial",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "120",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4",
        "expectedOutput": "24",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "0",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6",
        "expectedOutput": "720",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7",
        "expectedOutput": "5040",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8",
        "expectedOutput": "40320",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "362880",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10",
        "expectedOutput": "3628800",
        "isHidden": true
      }
    ]
  },
  "belt-2-q16-count-multiples": {
    "title": "Count Multiples",
    "slug": "belt-2-q16-count-multiples",
    "testCases": [
      {
        "testIndex": 1,
        "input": "20 5",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "30 4",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10 2",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "15 3",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7 8",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "50 10",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "100 7",
        "expectedOutput": "14",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "25 6",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "40 9",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-2-q17-print-multiples": {
    "title": "Print Multiples",
    "slug": "belt-2-q17-print-multiples",
    "testCases": [
      {
        "testIndex": 1,
        "input": "20 5",
        "expectedOutput": "5 10 15 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "25 4",
        "expectedOutput": "4 8 12 16 20 24",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10 2",
        "expectedOutput": "2 4 6 8 10",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "15 3",
        "expectedOutput": "3 6 9 12 15",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "30 7",
        "expectedOutput": "7 14 21 28",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12 4",
        "expectedOutput": "4 8 12",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "50 15",
        "expectedOutput": "15 30 45",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8 3",
        "expectedOutput": "3 6",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "100 25",
        "expectedOutput": "25 50 75 100",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "16 5",
        "expectedOutput": "5 10 15",
        "isHidden": true
      }
    ]
  },
  "belt-2-q18-calculate-power": {
    "title": "Calculate Power",
    "slug": "belt-2-q18-calculate-power",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2 5",
        "expectedOutput": "32",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3 4",
        "expectedOutput": "81",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5 0",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "10 3",
        "expectedOutput": "1000",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2 10",
        "expectedOutput": "1024",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4 3",
        "expectedOutput": "64",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7 2",
        "expectedOutput": "49",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1 50",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9 2",
        "expectedOutput": "81",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6 3",
        "expectedOutput": "216",
        "isHidden": true
      }
    ]
  },
  "belt-2-q19-check-prime-number": {
    "title": "Check Prime Number",
    "slug": "belt-2-q19-check-prime-number",
    "testCases": [
      {
        "testIndex": 1,
        "input": "17",
        "expectedOutput": "Prime",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "21",
        "expectedOutput": "Not Prime",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2",
        "expectedOutput": "Prime",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3",
        "expectedOutput": "Prime",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4",
        "expectedOutput": "Not Prime",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "29",
        "expectedOutput": "Prime",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "97",
        "expectedOutput": "Prime",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "100",
        "expectedOutput": "Not Prime",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "49",
        "expectedOutput": "Not Prime",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "31",
        "expectedOutput": "Prime",
        "isHidden": true
      }
    ]
  },
  "belt-2-q20-count-factors": {
    "title": "Count Factors",
    "slug": "belt-2-q20-count-factors",
    "testCases": [
      {
        "testIndex": 1,
        "input": "12",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "16",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "24",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "36",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "100",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "15",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "50",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-2-q21-find-gcd-of-two-numbers": {
    "title": "Find GCD of Two Numbers",
    "slug": "belt-2-q21-find-gcd-of-two-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "24 36",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "18 30",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "12 15",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7 13",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "100 50",
        "expectedOutput": "50",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "45 60",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8 32",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "14 28",
        "expectedOutput": "14",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "21 35",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "9 27",
        "expectedOutput": "9",
        "isHidden": true
      }
    ]
  },
  "belt-2-q22-find-lcm-of-two-numbers": {
    "title": "Find LCM of Two Numbers",
    "slug": "belt-2-q22-find-lcm-of-two-numbers",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4 6",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5 8",
        "expectedOutput": "40",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "12 18",
        "expectedOutput": "36",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7 9",
        "expectedOutput": "63",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10 15",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3 5",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6 8",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "14 21",
        "expectedOutput": "42",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "20 30",
        "expectedOutput": "60",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "25 15",
        "expectedOutput": "75",
        "isHidden": true
      }
    ]
  },
  "belt-2-q23-print-fibonacci-sequence": {
    "title": "Print Fibonacci Sequence",
    "slug": "belt-2-q23-print-fibonacci-sequence",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6",
        "expectedOutput": "0 1 1 2 3 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "0 1 1 2 3 5 8 13",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "0 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3",
        "expectedOutput": "0 1 1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5",
        "expectedOutput": "0 1 1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "10",
        "expectedOutput": "0 1 1 2 3 5 8 13 21 34",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "12",
        "expectedOutput": "0 1 1 2 3 5 8 13 21 34 55 89",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4",
        "expectedOutput": "0 1 1 2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7",
        "expectedOutput": "0 1 1 2 3 5 8",
        "isHidden": true
      }
    ]
  },
  "belt-2-q24-sum-of-fibonacci-terms": {
    "title": "Sum of Fibonacci Terms",
    "slug": "belt-2-q24-sum-of-fibonacci-terms",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "33",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "10",
        "expectedOutput": "88",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "9",
        "expectedOutput": "54",
        "isHidden": true
      }
    ]
  },
  "belt-2-q25-count-occurrences-of-a-digit": {
    "title": "Count Occurrences of a Digit",
    "slug": "belt-2-q25-count-occurrences-of-a-digit",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1223342 2",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "505050 5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "11111 1",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "98765 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "40404 4",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12345 9",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "777 7",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2020 0",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "85858 8",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "100 1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q26-sum-digits-at-even-positions": {
    "title": "Sum Digits at Even Positions",
    "slug": "belt-2-q26-sum-digits-at-even-positions",
    "testCases": [
      {
        "testIndex": 1,
        "input": "123456",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "98765",
        "expectedOutput": "14",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2468",
        "expectedOutput": "12",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "13579",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "482731",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9090",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "111111",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "54321",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-2-q27-number-pattern": {
    "title": "Number Pattern",
    "slug": "belt-2-q27-number-pattern",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4",
        "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3",
        "expectedOutput": "1\n2 2\n3 3 3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "1\n2 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5",
        "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6",
        "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5\n6 6 6 6 6 6",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7",
        "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5\n6 6 6 6 6 6\n7 7 7 7 7 7 7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8",
        "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5\n6 6 6 6 6 6\n7 7 7 7 7 7 7\n8 8 8 8 8 8 8 8",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5\n6 6 6 6 6 6\n7 7 7 7 7 7 7\n8 8 8 8 8 8 8 8\n9 9 9 9 9 9 9 9 9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10",
        "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5\n6 6 6 6 6 6\n7 7 7 7 7 7 7\n8 8 8 8 8 8 8 8\n9 9 9 9 9 9 9 9 9\n10 10 10 10 10 10 10 10 10 10",
        "isHidden": true
      }
    ]
  },
  "belt-2-q28-increasing-star-pattern": {
    "title": "Increasing Star Pattern",
    "slug": "belt-2-q28-increasing-star-pattern",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4",
        "expectedOutput": "*\n**\n***\n****",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "*\n**\n***\n****\n*****",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "*",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "*\n**",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3",
        "expectedOutput": "*\n**\n***",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6",
        "expectedOutput": "*\n**\n***\n****\n*****\n******",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7",
        "expectedOutput": "*\n**\n***\n****\n*****\n******\n*******",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8",
        "expectedOutput": "*\n**\n***\n****\n*****\n******\n*******\n********",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "*\n**\n***\n****\n*****\n******\n*******\n********\n*********",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10",
        "expectedOutput": "*\n**\n***\n****\n*****\n******\n*******\n********\n*********\n**********",
        "isHidden": true
      }
    ]
  },
  "belt-2-q29-decreasing-star-pattern": {
    "title": "Decreasing Star Pattern",
    "slug": "belt-2-q29-decreasing-star-pattern",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4",
        "expectedOutput": "****\n***\n**\n*",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "*****\n****\n***\n**\n*",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1",
        "expectedOutput": "*",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2",
        "expectedOutput": "**\n*",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3",
        "expectedOutput": "***\n**\n*",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6",
        "expectedOutput": "******\n*****\n****\n***\n**\n*",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7",
        "expectedOutput": "*******\n******\n*****\n****\n***\n**\n*",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8",
        "expectedOutput": "********\n*******\n******\n*****\n****\n***\n**\n*",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "*********\n********\n*******\n******\n*****\n****\n***\n**\n*",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10",
        "expectedOutput": "**********\n*********\n********\n*******\n******\n*****\n****\n***\n**\n*",
        "isHidden": true
      }
    ]
  },
  "belt-2-q30-first-number-divisible-by-both": {
    "title": "First Number Divisible by Both",
    "slug": "belt-2-q30-first-number-divisible-by-both",
    "testCases": [
      {
        "testIndex": 1,
        "input": "20 4 6",
        "expectedOutput": "24",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "25 5 8",
        "expectedOutput": "40",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10 2 3",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "30 3 5",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "50 7 2",
        "expectedOutput": "56",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "15 4 5",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1 3 4",
        "expectedOutput": "12",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "100 10 15",
        "expectedOutput": "120",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "45 6 9",
        "expectedOutput": "54",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12 4 6",
        "expectedOutput": "12",
        "isHidden": true
      }
    ]
  },
  "belt-3-q1-print-array-elements": {
    "title": "Print Array Elements",
    "slug": "belt-3-q1-print-array-elements",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n10 20 30 40 50",
        "expectedOutput": "10 20 30 40 50",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n7 3 9 2",
        "expectedOutput": "7 3 9 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n99",
        "expectedOutput": "99",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n-5 0 5",
        "expectedOutput": "-5 0 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 3 4 5 6",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n100 200",
        "expectedOutput": "100 200",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n42 42 42 42 42",
        "expectedOutput": "42 42 42 42 42",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-1 -2 -3 -4",
        "expectedOutput": "-1 -2 -3 -4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n9 8 7 6 5 4 3",
        "expectedOutput": "9 8 7 6 5 4 3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n15 25 35",
        "expectedOutput": "15 25 35",
        "isHidden": true
      }
    ]
  },
  "belt-3-q2-sum-of-array-elements": {
    "title": "Sum of Array Elements",
    "slug": "belt-3-q2-sum-of-array-elements",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n10 20 30 40 50",
        "expectedOutput": "150",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n7 3 9 2",
        "expectedOutput": "21",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n50",
        "expectedOutput": "50",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n-10 20 -30",
        "expectedOutput": "-20",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n0 0 0 0 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n100 200 300 400",
        "expectedOutput": "1000",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n-50 50",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n15 25 35 45 55",
        "expectedOutput": "175",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n9 9 9",
        "expectedOutput": "27",
        "isHidden": true
      }
    ]
  },
  "belt-3-q3-find-the-largest-array-element": {
    "title": "Find the Largest Array Element",
    "slug": "belt-3-q3-find-the-largest-array-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n12 45 7 89 34 67",
        "expectedOutput": "89",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n23 18 42 31 9",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n100",
        "expectedOutput": "100",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n-10 -5 -20 -1",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n5 5 5 5 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0 0 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 9 2 8 3 7 4",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n999 50 100 200",
        "expectedOutput": "999",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-50 -10 -20 -80 -5 -99",
        "expectedOutput": "-5",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n12 21",
        "expectedOutput": "21",
        "isHidden": true
      }
    ]
  },
  "belt-3-q4-find-the-smallest-array-element": {
    "title": "Find the Smallest Array Element",
    "slug": "belt-3-q4-find-the-smallest-array-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n12 45 7 89 34 67",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n23 18 42 31 9",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n42",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n-10 -5 -20 -1",
        "expectedOutput": "-20",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n8 8 8 8 8",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n100 50 200",
        "expectedOutput": "50",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n15 4 8 2 9 1 6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n0 10 20 30",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-1 -2 -3 -4 -5 -6",
        "expectedOutput": "-6",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n5 3",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "belt-3-q5-count-even-elements": {
    "title": "Count Even Elements",
    "slug": "belt-3-q5-count-even-elements",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n12 7 8 15 20 9",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n3 5 7 9 11",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n2 4 6 8 10",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n5",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n0 1 2 3",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n14 21 28 35 42 49 56",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n10 11 12",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-2 -4 -6 1 3 5",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n8 16 32 64",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q6-count-odd-elements": {
    "title": "Count Odd Elements",
    "slug": "belt-3-q6-count-odd-elements",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n12 7 8 15 20 9",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n2 4 6 8 10",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 3 5 7 9",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n7",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n8",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n0 2 4 6",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n11 13 15 17 19 21",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2 3 4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n-1 -3 2 4 6",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n7 9 11 13",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q7-calculate-array-average": {
    "title": "Calculate Array Average",
    "slug": "belt-3-q7-calculate-array-average",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n10 20 30 40 50",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n5 10 15 20",
        "expectedOutput": "12.5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n25",
        "expectedOutput": "25",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n6 6 6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n10 20",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1 2 3 4",
        "expectedOutput": "2.5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n0 0 0 0 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n10 20 30 40 50 60",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n7 8",
        "expectedOutput": "7.5",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n2 4 6 8",
        "expectedOutput": "5",
        "isHidden": true
      }
    ]
  },
  "belt-3-q8-reverse-an-array": {
    "title": "Reverse an Array",
    "slug": "belt-3-q8-reverse-an-array",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n10 20 30 40 50",
        "expectedOutput": "50 40 30 20 10",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n7 3 9 2",
        "expectedOutput": "2 9 3 7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n42",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1 2 3",
        "expectedOutput": "3 2 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n6 5 4 3 2 1",
        "expectedOutput": "1 2 3 4 5 6",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n99 100",
        "expectedOutput": "100 99",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n1 1 2 2 3",
        "expectedOutput": "3 2 2 1 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-1 -2 -3 -4",
        "expectedOutput": "-4 -3 -2 -1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n10 20 10 20 10 20 10",
        "expectedOutput": "10 20 10 20 10 20 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n8 0 8",
        "expectedOutput": "8 0 8",
        "isHidden": true
      }
    ]
  },
  "belt-3-q9-search-for-an-element": {
    "title": "Search for an Element",
    "slug": "belt-3-q9-search-for-an-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n10 25 30 45 50\n30",
        "expectedOutput": "Found",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n10 25 30 45 50\n35",
        "expectedOutput": "Not Found",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n5\n5",
        "expectedOutput": "Found",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n5\n6",
        "expectedOutput": "Not Found",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 2 3 4\n4",
        "expectedOutput": "Found",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1 2 3 4\n1",
        "expectedOutput": "Found",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n-5 0 5 10 15 20\n0",
        "expectedOutput": "Found",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n8 8 8\n8",
        "expectedOutput": "Found",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n100 200 300 400 500\n250",
        "expectedOutput": "Not Found",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n7 14 21 28\n21",
        "expectedOutput": "Found",
        "isHidden": true
      }
    ]
  },
  "belt-3-q10-find-position-of-an-element": {
    "title": "Find Position of an Element",
    "slug": "belt-3-q10-find-position-of-an-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n12 8 25 8 40 50\n8",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n10 20 30 40 50\n35",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n99\n99",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n99\n50",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n5 10 15 20\n5",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n5 10 15 20\n20",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n2 4 6 8 10\n6",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n7 7 7\n7",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n1 3 5 7 9 11\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n30 20 10 20 30\n20",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-3-q11-count-occurrences-of-an-element": {
    "title": "Count Occurrences of an Element",
    "slug": "belt-3-q11-count-occurrences-of-an-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n4 2 4 7 4 9 4\n4",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n5 8 2 9 3 7\n5",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 1 1 1 1\n1",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 2 3 4\n5",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n2 4 2 4 2 4\n2",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n10 20 30\n20",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n8\n8",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n8\n9",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n0 0 1 0 0\n0",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n7 8 9 7 8 9\n9",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-3-q12-replace-an-element": {
    "title": "Replace an Element",
    "slug": "belt-3-q12-replace-an-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n2 5 3 5 7 5\n5 9",
        "expectedOutput": "2 9 3 9 7 9",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n4 8 2 6 10\n8 3",
        "expectedOutput": "4 3 2 6 10",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n1 1 1\n1 0",
        "expectedOutput": "0 0 0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 2 3 4\n5 9",
        "expectedOutput": "1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n10 20 30 20 10\n20 25",
        "expectedOutput": "10 25 30 25 10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n7 8\n7 9",
        "expectedOutput": "9 8",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n42\n42 100",
        "expectedOutput": "100",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n0 1 0 1 0 1\n0 2",
        "expectedOutput": "2 1 2 1 2 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5 6 7 8\n8 88",
        "expectedOutput": "5 6 7 88",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3 3 5 3 3\n3 4",
        "expectedOutput": "4 4 5 4 4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q13-copy-an-array": {
    "title": "Copy an Array",
    "slug": "belt-3-q13-copy-an-array",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n4 8 15 16 23",
        "expectedOutput": "4 8 15 16 23",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n11 22 33 44",
        "expectedOutput": "11 22 33 44",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n100",
        "expectedOutput": "100",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n9 8 7 6 5 4",
        "expectedOutput": "9 8 7 6 5 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n5 10",
        "expectedOutput": "5 10",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n0 0 0 0",
        "expectedOutput": "0 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n-1 -2 -3 -4 -5",
        "expectedOutput": "-1 -2 -3 -4 -5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n2 4 6 8 10 12 14",
        "expectedOutput": "2 4 6 8 10 12 14",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n42 43 44",
        "expectedOutput": "42 43 44",
        "isHidden": true
      }
    ]
  },
  "belt-3-q14-find-the-second-largest-element": {
    "title": "Find the Second Largest Element",
    "slug": "belt-3-q14-find-the-second-largest-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n12 45 7 89 34 67",
        "expectedOutput": "67",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n90 25 90 18 60 75",
        "expectedOutput": "75",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n10 20 30 40",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n5 1 9",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n100 50 100 80 20",
        "expectedOutput": "80",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n-10 -5 -20 -1",
        "expectedOutput": "-5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n7 8 9 10 11",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n15 30 25",
        "expectedOutput": "25",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n4 2 7 9 5 8",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n100 200 300 400",
        "expectedOutput": "300",
        "isHidden": true
      }
    ]
  },
  "belt-3-q15-find-the-second-smallest-element": {
    "title": "Find the Second Smallest Element",
    "slug": "belt-3-q15-find-the-second-smallest-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n12 45 7 89 34 67",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n5 12 5 20 8 15",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n10 20 30 40",
        "expectedOutput": "20",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n9 1 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n100 20 100 40 80",
        "expectedOutput": "40",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n-20 -5 -10 -1",
        "expectedOutput": "-10",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n7 8 9 10 11",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n30 15 25",
        "expectedOutput": "25",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n9 4 7 2 5 8",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n400 300 200 100",
        "expectedOutput": "200",
        "isHidden": true
      }
    ]
  },
  "belt-3-q16-count-positive-and-negative-elements": {
    "title": "Count Positive and Negative Elements",
    "slug": "belt-3-q16-count-positive-and-negative-elements",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n-4 8 0 -2 7 5",
        "expectedOutput": "3 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n-8 -3 0 4 9",
        "expectedOutput": "2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
        "expectedOutput": "4 0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n-1 -2 -3 -4",
        "expectedOutput": "0 4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n0 0 0 0 0",
        "expectedOutput": "0 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n-1 1 -2 2 -3 3",
        "expectedOutput": "3 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-5 0 5",
        "expectedOutput": "1 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n10 -20 30 -40 50 -60 0",
        "expectedOutput": "3 3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n1 -1",
        "expectedOutput": "1 1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n-10 -20 -30 10 20",
        "expectedOutput": "2 3",
        "isHidden": true
      }
    ]
  },
  "belt-3-q17-move-zeros-to-the-end": {
    "title": "Move Zeros to the End",
    "slug": "belt-3-q17-move-zeros-to-the-end",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n0 1 0 3 12 0 5",
        "expectedOutput": "1 3 12 5 0 0 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n4 0 2 0 7 0",
        "expectedOutput": "4 2 7 0 0 0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 3 4 5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n0 0 0 0",
        "expectedOutput": "0 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n0 0 1 2 3",
        "expectedOutput": "1 2 3 0 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n1 0 2 0 3 0",
        "expectedOutput": "1 2 3 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n0 5 0",
        "expectedOutput": "5 0 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n10 20 0 30",
        "expectedOutput": "10 20 30 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n0 7 0 9 0",
        "expectedOutput": "7 9 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n0 0 0 1 0 0 2",
        "expectedOutput": "1 2 0 0 0 0 0",
        "isHidden": true
      }
    ]
  },
  "belt-3-q18-remove-duplicate-elements": {
    "title": "Remove Duplicate Elements",
    "slug": "belt-3-q18-remove-duplicate-elements",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n4 2 4 7 2 9 7 5",
        "expectedOutput": "4 2 7 9 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n3 3 5 5 8 8",
        "expectedOutput": "3 5 8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 3 4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n1 1 1 1 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n10 20 10 20 30 40",
        "expectedOutput": "10 20 30 40",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n7 6 5 7 6 5 4",
        "expectedOutput": "7 6 5 4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n5 5 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n9 8 9 8 7",
        "expectedOutput": "9 8 7",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n1 2 3 1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n0 1 0 1",
        "expectedOutput": "0 1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q19-check-array-palindrome": {
    "title": "Check Array Palindrome",
    "slug": "belt-3-q19-check-array-palindrome",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n1 2 3 2 1",
        "expectedOutput": "Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "Not Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n42",
        "expectedOutput": "Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 2 2 1",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 2 3 1",
        "expectedOutput": "Not Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n1 2 3 3 2 1",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n5 10 5",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n5 10 15",
        "expectedOutput": "Not Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n7 7 7 7 7",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n1 2 3 4 2 1",
        "expectedOutput": "Not Palindrome",
        "isHidden": true
      }
    ]
  },
  "belt-3-q20-find-common-elements": {
    "title": "Find Common Elements",
    "slug": "belt-3-q20-find-common-elements",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5 1 2 3 4 5\n4 3 4 5 6",
        "expectedOutput": "3 4 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4 10 20 30 40\n3 5 20 40",
        "expectedOutput": "20 40",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3 1 2 3\n3 4 5 6",
        "expectedOutput": "",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4 5 5 5 5\n2 5 6",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3 8 9 10\n3 10 9 8",
        "expectedOutput": "8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2 1 2\n2 1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5 10 20 30 40 50\n3 20 40 60",
        "expectedOutput": "20 40",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3 7 8 9\n2 7 9",
        "expectedOutput": "7 9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4 1 3 5 7\n4 2 4 6 8",
        "expectedOutput": "",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3 100 200 300\n2 200 300",
        "expectedOutput": "200 300",
        "isHidden": true
      }
    ]
  },
  "belt-3-q21-add-two-matrices": {
    "title": "Add Two Matrices",
    "slug": "belt-3-q21-add-two-matrices",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4\n5 6\n7 8",
        "expectedOutput": "6 8\n10 12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "2 3\n1 2 3\n4 5 6\n6 5 4\n3 2 1",
        "expectedOutput": "7 7 7\n7 7 7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1 1\n5\n10",
        "expectedOutput": "15",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1 3\n1 2 3\n4 5 6",
        "expectedOutput": "5 7 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3 1\n1\n2\n3\n4\n5\n6",
        "expectedOutput": "5\n7\n9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2 2\n0 0\n0 0\n1 1\n1 1",
        "expectedOutput": "1 1\n1 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2 2\n10 20\n30 40\n5 5\n5 5",
        "expectedOutput": "15 25\n35 45",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3 3\n1 1 1\n2 2 2\n3 3 3\n1 1 1\n1 1 1\n1 1 1",
        "expectedOutput": "2 2 2\n3 3 3\n4 4 4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2 2\n-1 -2\n-3 -4\n1 2\n3 4",
        "expectedOutput": "0 0\n0 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2 2\n5 10\n15 20\n10 5\n20 15",
        "expectedOutput": "15 15\n35 35",
        "isHidden": true
      }
    ]
  },
  "belt-3-q22-sum-of-each-matrix-row": {
    "title": "Sum of Each Matrix Row",
    "slug": "belt-3-q22-sum-of-each-matrix-row",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "6\n15",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3 2\n5 10\n3 7\n8 2",
        "expectedOutput": "15\n10\n10",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1 4\n10 20 30 40",
        "expectedOutput": "100",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3 1\n5\n10\n15",
        "expectedOutput": "5\n10\n15",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2 2\n0 0\n0 0",
        "expectedOutput": "0\n0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3 3\n1 1 1\n2 2 2\n3 3 3",
        "expectedOutput": "3\n6\n9",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2 2\n100 200\n300 400",
        "expectedOutput": "300\n700",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2 3\n-1 -2 -3\n1 2 3",
        "expectedOutput": "-6\n6",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3 2\n1 2\n3 4\n5 6",
        "expectedOutput": "3\n7\n11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2 2\n25 25\n50 50",
        "expectedOutput": "50\n100",
        "isHidden": true
      }
    ]
  },
  "belt-3-q23-sum-of-each-matrix-column": {
    "title": "Sum of Each Matrix Column",
    "slug": "belt-3-q23-sum-of-each-matrix-column",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "5 7 9",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3 2\n5 10\n3 7\n8 2",
        "expectedOutput": "16 19",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1 3\n5 10 15",
        "expectedOutput": "5 10 15",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3 1\n4\n5\n6",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2 2\n1 1\n2 2",
        "expectedOutput": "3 3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3 3\n1 2 3\n4 5 6\n7 8 9",
        "expectedOutput": "12 15 18",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2 2\n10 20\n30 40",
        "expectedOutput": "40 60",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2 3\n-1 0 1\n1 0 -1",
        "expectedOutput": "0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2 2\n50 50\n50 50",
        "expectedOutput": "100 100",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3 2\n1 2\n3 4\n5 6",
        "expectedOutput": "9 12",
        "isHidden": true
      }
    ]
  },
  "belt-3-q24-main-diagonal-sum": {
    "title": "Main Diagonal Sum",
    "slug": "belt-3-q24-main-diagonal-sum",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1 2 3\n4 5 6\n7 8 9",
        "expectedOutput": "15",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n2 1 3 4\n5 6 7 8\n9 1 10 2\n3 4 5 11",
        "expectedOutput": "29",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n42",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1 2\n3 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n5 0 0\n0 5 0\n0 0 5",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n10 20\n30 40",
        "expectedOutput": "50",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-1 2 3\n4 -2 5\n6 7 -3",
        "expectedOutput": "-6",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n0 1\n1 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n2 0 0\n0 3 0\n0 0 4",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 0 0 0\n0 1 0 0\n0 0 1 0\n0 0 0 1",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q25-transpose-a-matrix": {
    "title": "Transpose a Matrix",
    "slug": "belt-3-q25-transpose-a-matrix",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1 4\n2 5\n3 6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3 2\n7 8\n9 10\n11 12",
        "expectedOutput": "7 9 11\n8 10 12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1 3\n10 20 30",
        "expectedOutput": "10\n20\n30",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3 1\n1\n2\n3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "1 3\n2 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3 3\n1 2 3\n4 5 6\n7 8 9",
        "expectedOutput": "1 4 7\n2 5 8\n3 6 9",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2 2\n5 5\n6 6",
        "expectedOutput": "5 6\n5 6",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1 1\n42",
        "expectedOutput": "42",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2 3\n9 8 7\n6 5 4",
        "expectedOutput": "9 6\n8 5\n7 4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2 2\n10 20\n30 40",
        "expectedOutput": "10 30\n20 40",
        "isHidden": true
      }
    ]
  },
  "belt-3-q26-find-string-length": {
    "title": "Find String Length",
    "slug": "belt-3-q26-find-string-length",
    "testCases": [
      {
        "testIndex": 1,
        "input": "hello",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "coding",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "algorithm",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "javascript",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "python",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "fullstack",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "kalvilearn",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "developer",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "practice",
        "expectedOutput": "8",
        "isHidden": true
      }
    ]
  },
  "belt-3-q27-count-vowels-in-a-string": {
    "title": "Count Vowels in a String",
    "slug": "belt-3-q27-count-vowels-in-a-string",
    "testCases": [
      {
        "testIndex": 1,
        "input": "education",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "programming",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "rhythm",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "aeiou",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "HELLO",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "kalvi",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "quick",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "developer",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "xyz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "opportunity",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q28-reverse-a-string": {
    "title": "Reverse a String",
    "slug": "belt-3-q28-reverse-a-string",
    "testCases": [
      {
        "testIndex": 1,
        "input": "hello",
        "expectedOutput": "olleh",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "coding",
        "expectedOutput": "gnidoc",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "world",
        "expectedOutput": "dlrow",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "racecar",
        "expectedOutput": "racecar",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "kalvi",
        "expectedOutput": "ivlak",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "a",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "12345",
        "expectedOutput": "54321",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "developer",
        "expectedOutput": "repoleved",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "algorithm",
        "expectedOutput": "mhtirogla",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "learn",
        "expectedOutput": "nrael",
        "isHidden": true
      }
    ]
  },
  "belt-3-q29-check-string-palindrome": {
    "title": "Check String Palindrome",
    "slug": "belt-3-q29-check-string-palindrome",
    "testCases": [
      {
        "testIndex": 1,
        "input": "level",
        "expectedOutput": "Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "hello",
        "expectedOutput": "Not Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "racecar",
        "expectedOutput": "Palindrome",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "madam",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "coding",
        "expectedOutput": "Not Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "noon",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "radar",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "world",
        "expectedOutput": "Not Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "a",
        "expectedOutput": "Palindrome",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "abba",
        "expectedOutput": "Palindrome",
        "isHidden": true
      }
    ]
  },
  "belt-3-q30-count-character-occurrences": {
    "title": "Count Character Occurrences",
    "slug": "belt-3-q30-count-character-occurrences",
    "testCases": [
      {
        "testIndex": 1,
        "input": "banana\na",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "programming\ng",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "mississippi\ns",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "hello\nl",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "apple\np",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "coding\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "kalvilearn\na",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "javascript\nt",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "developer\ne",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "test\nt",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-3-q31-remove-spaces-from-a-string": {
    "title": "Remove Spaces from a String",
    "slug": "belt-3-q31-remove-spaces-from-a-string",
    "testCases": [
      {
        "testIndex": 1,
        "input": "hello world",
        "expectedOutput": "helloworld",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "coding is fun",
        "expectedOutput": "codingisfun",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "a b c d",
        "expectedOutput": "abcd",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "  kalvi learn  ",
        "expectedOutput": "kalvilearn",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "no_spaces",
        "expectedOutput": "no_spaces",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "java script",
        "expectedOutput": "javascript",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "learn practice code grow",
        "expectedOutput": "learnpracticecodegrow",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": " 1 2 3 ",
        "expectedOutput": "123",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "hello",
        "expectedOutput": "hello",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "   ",
        "expectedOutput": "",
        "isHidden": true
      }
    ]
  },
  "belt-3-q32-compare-two-strings": {
    "title": "Compare Two Strings",
    "slug": "belt-3-q32-compare-two-strings",
    "testCases": [
      {
        "testIndex": 1,
        "input": "hello\nhello",
        "expectedOutput": "Equal",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "hello\nHello",
        "expectedOutput": "Not Equal",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "coding\ncoding",
        "expectedOutput": "Equal",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "kalvi\nkalvium",
        "expectedOutput": "Not Equal",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "abc\nabc",
        "expectedOutput": "Equal",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "test\ntest ",
        "expectedOutput": "Equal",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "123\n123",
        "expectedOutput": "Equal",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "same\nsame",
        "expectedOutput": "Equal",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "different\ndiffer",
        "expectedOutput": "Not Equal",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "case\nCASE",
        "expectedOutput": "Not Equal",
        "isHidden": true
      }
    ]
  },
  "belt-3-q33-most-frequent-element": {
    "title": "Most Frequent Element",
    "slug": "belt-3-q33-most-frequent-element",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n2 4 2 7 4 2 9",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n5 3 5 3 8 8",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n9 9 9 9",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n1 2 2 3 3 4",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n10 20 20",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n7 7 8 8 9",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-1 -1 0 1",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n4 5 6 4 5 4 6",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n100 200 100 200 100",
        "expectedOutput": "100",
        "isHidden": true
      }
    ]
  },
  "belt-3-q34-left-rotate-an-array": {
    "title": "Left Rotate an Array",
    "slug": "belt-3-q34-left-rotate-an-array",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5 2\n1 2 3 4 5",
        "expectedOutput": "3 4 5 1 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6 3\n10 20 30 40 50 60",
        "expectedOutput": "40 50 60 10 20 30",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4 1\n1 2 3 4",
        "expectedOutput": "2 3 4 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5 5\n10 20 30 40 50",
        "expectedOutput": "10 20 30 40 50",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3 0\n7 8 9",
        "expectedOutput": "7 8 9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5 7\n1 2 3 4 5",
        "expectedOutput": "3 4 5 1 2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2 1\n50 100",
        "expectedOutput": "100 50",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4 2\n9 8 7 6",
        "expectedOutput": "7 6 9 8",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6 2\n1 1 2 2 3 3",
        "expectedOutput": "2 2 3 3 1 1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5 3\n10 20 30 40 50",
        "expectedOutput": "40 50 10 20 30",
        "isHidden": true
      }
    ]
  },
  "belt-3-q35-right-rotate-an-array": {
    "title": "Right Rotate an Array",
    "slug": "belt-3-q35-right-rotate-an-array",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5 2\n1 2 3 4 5",
        "expectedOutput": "4 5 1 2 3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6 3\n10 20 30 40 50 60",
        "expectedOutput": "40 50 60 10 20 30",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4 1\n1 2 3 4",
        "expectedOutput": "4 1 2 3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5 5\n10 20 30 40 50",
        "expectedOutput": "10 20 30 40 50",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3 0\n7 8 9",
        "expectedOutput": "7 8 9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5 7\n1 2 3 4 5",
        "expectedOutput": "4 5 1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2 1\n50 100",
        "expectedOutput": "100 50",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4 2\n9 8 7 6",
        "expectedOutput": "7 6 9 8",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6 2\n1 1 2 2 3 3",
        "expectedOutput": "3 3 1 1 2 2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5 3\n10 20 30 40 50",
        "expectedOutput": "30 40 50 10 20",
        "isHidden": true
      }
    ]
  }
};
var serverTestCases_default = serverTestCases;

// src/server/executeService.ts
function normalizeOutput(str) {
  if (!str) return "";
  return str.replace(/\r\n/g, "\n").split("\n").map((line) => line.trimEnd()).join("\n").trim();
}
function compareOutput(actual, expected) {
  const normActual = normalizeOutput(actual);
  const normExpected = normalizeOutput(expected);
  if (normActual === normExpected) return true;
  const numActual = Number(normActual);
  const numExpected = Number(normExpected);
  if (!isNaN(numActual) && !isNaN(numExpected) && normActual !== "" && normExpected !== "") {
    return Math.abs(numActual - numExpected) < 1e-5;
  }
  return false;
}
function executeJavaScript(code, input) {
  const outputs = [];
  const normalizedInput = input.replace(/\r\n/g, "\n");
  const inputLines = normalizedInput.split("\n");
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean);
  const customConsole = {
    log: (...args) => outputs.push(args.map((a) => typeof a === "object" && a !== null ? JSON.stringify(a) : String(a)).join(" ")),
    info: (...args) => outputs.push(args.map((a) => typeof a === "object" && a !== null ? JSON.stringify(a) : String(a)).join(" ")),
    error: (...args) => outputs.push(args.map((a) => String(a)).join(" ")),
    warn: () => {
    }
  };
  const mockFs = {
    readFileSync: (_fd, _enc) => normalizedInput,
    readSync: () => normalizedInput
  };
  const mockProcess = {
    stdin: {
      read: () => normalizedInput,
      on: (event, cb) => {
        if (event === "data") cb(normalizedInput);
        if (event === "end") cb();
      }
    },
    stdout: { write: (data) => outputs.push(String(data)) },
    exit: () => {
    }
  };
  const mockReadline = {
    createInterface: () => ({
      on: (event, cb) => {
        if (event === "line") {
          for (const l of inputLines) cb(l);
        }
        if (event === "close") cb();
      },
      close: () => {
      }
    })
  };
  const mockRequire = (mod) => {
    if (mod === "fs") return mockFs;
    if (mod === "readline") return mockReadline;
    if (mod === "process") return mockProcess;
    return {};
  };
  const prelude = `
    const print = console.log;
    let __lIdx = 0, __tIdx = 0;
    const __lines = ${JSON.stringify(inputLines)};
    const __tokens = ${JSON.stringify(inputTokens)};
    const readline = () => __lIdx < __lines.length ? __lines[__lIdx++] : '';
    const readToken = () => __tIdx < __tokens.length ? __tokens[__tIdx++] : '';
  `;
  try {
    const wrapped = new Function("console", "require", "process", `
      ${prelude}
      ${code}
    `);
    wrapped(customConsole, mockRequire, mockProcess);
    return { output: outputs.join("\n").trim() };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "JavaScript Runtime Error";
    return { output: outputs.join("\n").trim(), error: errMsg };
  }
}
function runSingleTestCase(code, language, input) {
  const lang = (language || "").toLowerCase();
  if (lang === "python") {
    return executePython(code, input);
  } else if (lang === "cpp" || lang === "c++") {
    return executeCpp(code, input);
  } else if (lang === "java") {
    return executeJava(code, input);
  }
  return executeJavaScript(code, input);
}
function checkCompilation(code, language) {
  const lang = (language || "").toLowerCase();
  if (lang === "python") {
    const dryRun = executePython(code, "");
    if (dryRun.error && (dryRun.error.includes("SyntaxError") || dryRun.error.includes("Unexpected") || dryRun.error.toLowerCase().includes("syntax error"))) {
      return { ok: false, error: dryRun.error };
    }
  } else if (lang === "javascript" || lang === "js") {
    try {
      new Function("console", "require", "process", code);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      return { ok: false, error: `SyntaxError: ${errMsg}` };
    }
  } else if (lang === "cpp" || lang === "c++") {
    const dryRun = executeCpp(code, "");
    if (dryRun.error && (dryRun.error.toLowerCase().includes("compil") || dryRun.error.toLowerCase().includes("syntax"))) {
      return { ok: false, error: dryRun.error };
    }
  } else if (lang === "java") {
    const dryRun = executeJava(code, "");
    if (dryRun.error && (dryRun.error.toLowerCase().includes("compil") || dryRun.error.toLowerCase().includes("syntax"))) {
      return { ok: false, error: dryRun.error };
    }
  }
  return { ok: true };
}
async function executeQuestion(req) {
  const { questionSlug, language, code, isSubmit = true } = req;
  if (!code || !code.trim()) {
    return {
      success: false,
      total: isSubmit ? 10 : 3,
      passed: 0,
      overallTimeMs: 0,
      status: "COMPILATION_ERROR",
      error: "Compilation Error",
      message: "Source code cannot be empty.",
      testCases: []
    };
  }
  const compCheck = checkCompilation(code, language);
  if (!compCheck.ok) {
    return {
      success: false,
      total: isSubmit ? 10 : 3,
      passed: 0,
      overallTimeMs: 0,
      status: "COMPILATION_ERROR",
      error: "Compilation Error",
      message: compCheck.error || "Syntax / Compilation error detected in your code.",
      testCases: []
    };
  }
  const problemMap = serverTestCases_default;
  let problem = problemMap[questionSlug];
  if (!problem) {
    const foundKey = Object.keys(problemMap).find(
      (k) => k === questionSlug || k.endsWith(questionSlug) || questionSlug.endsWith(k)
    );
    if (foundKey) {
      problem = problemMap[foundKey];
    }
  }
  if (!problem) {
    return {
      success: false,
      total: isSubmit ? 10 : 3,
      passed: 0,
      overallTimeMs: 0,
      status: "SYSTEM_ERROR",
      error: "Question Not Found",
      message: `Question with slug "${questionSlug}" was not found in the test repository.`,
      testCases: []
    };
  }
  const testCases = problem.testCases;
  if (!testCases || testCases.length !== 10) {
    return {
      success: false,
      total: isSubmit ? 10 : 3,
      passed: 0,
      overallTimeMs: 0,
      status: "SYSTEM_ERROR",
      error: "Invalid Question Configuration",
      message: `Question must have exactly 10 test cases (found ${testCases?.length || 0}).`,
      testCases: []
    };
  }
  const casesToExecute = isSubmit ? testCases : testCases.slice(0, 3);
  const totalCount = isSubmit ? 10 : 3;
  const startTime = performance.now();
  const sanitizedResults = [];
  let passedCount = 0;
  for (let i = 0; i < casesToExecute.length; i++) {
    const tc = casesToExecute[i];
    const tcStart = performance.now();
    const exec = runSingleTestCase(code, language, tc.input);
    const tcTime = Math.round(performance.now() - tcStart);
    if (exec.error && (exec.error.includes("SyntaxError") || exec.error.toLowerCase().includes("syntax error") || exec.error.toLowerCase().includes("compilation error"))) {
      return {
        success: false,
        total: totalCount,
        passed: 0,
        overallTimeMs: tcTime,
        status: "COMPILATION_ERROR",
        error: "Compilation Error",
        message: exec.error,
        testCases: []
      };
    }
    const passed = !exec.error && compareOutput(exec.output, tc.expectedOutput);
    if (passed) passedCount++;
    const isVisible = i < 3;
    let status = passed ? "passed" : "failed";
    if (exec.error) {
      if (exec.error.includes("Time Limit Exceeded") || tcTime >= 3e3) {
        status = "time_limit_exceeded";
      } else {
        status = "runtime_error";
      }
    }
    if (isVisible) {
      sanitizedResults.push({
        testIndex: tc.testIndex || i + 1,
        status,
        visible: true,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: exec.output || (exec.error ? `Error: ${exec.error}` : "(no output)"),
        error: exec.error,
        executionTimeMs: tcTime
      });
    } else {
      sanitizedResults.push({
        testIndex: tc.testIndex || i + 1,
        status,
        visible: false,
        executionTimeMs: tcTime
      });
    }
  }
  const overallTimeMs = Math.round(performance.now() - startTime);
  const isAccepted = passedCount === totalCount;
  let executionStatus = "ACCEPTED";
  if (!isAccepted) {
    const hasTle = sanitizedResults.some((t) => t.status === "time_limit_exceeded");
    const hasRuntime = sanitizedResults.some((t) => t.status === "runtime_error");
    if (hasTle) {
      executionStatus = "TIME_LIMIT_EXCEEDED";
    } else if (hasRuntime) {
      executionStatus = "RUNTIME_ERROR";
    } else {
      executionStatus = "WRONG_ANSWER";
    }
  }
  return {
    success: isAccepted,
    total: totalCount,
    passed: passedCount,
    overallTimeMs,
    status: executionStatus,
    message: isAccepted ? "All test cases passed successfully." : `${passedCount} of ${totalCount} test cases passed.`,
    testCases: sanitizedResults
  };
}

// src/server/apiHandler.ts
async function handler(req, res) {
  const sendJson = (statusCode, data) => {
    if (typeof res.status === "function" && typeof res.json === "function") {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== "POST") {
    return sendJson(405, { error: "Method Not Allowed. Use POST." });
  }
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  } else if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    if (typeof req.on === "function") {
      body = await new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          try {
            resolve(JSON.parse(data || "{}"));
          } catch {
            resolve({});
          }
        });
        req.on("error", () => resolve({}));
        setTimeout(() => resolve(body || {}), 200);
      });
    }
  }
  const parsedBody = body || {};
  const { questionSlug, language, code, isSubmit = true } = parsedBody;
  if (!questionSlug || !language || !code) {
    return sendJson(400, {
      success: false,
      error: "Missing Parameters",
      message: "questionSlug, language, and code are required.",
      total: isSubmit ? 10 : 3,
      passed: 0,
      testCases: []
    });
  }
  try {
    const result = await executeQuestion({ questionSlug, language, code, isSubmit });
    if (result.error === "Question Not Found") {
      return sendJson(404, result);
    }
    if (result.error === "Compilation Error") {
      return sendJson(422, result);
    }
    if (!result.success && result.error) {
      return sendJson(500, result);
    }
    return sendJson(200, result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return sendJson(500, {
      success: false,
      error: "Execution Error",
      message: msg,
      total: isSubmit ? 10 : 3,
      passed: 0,
      testCases: []
    });
  }
}
export {
  handler as default
};
