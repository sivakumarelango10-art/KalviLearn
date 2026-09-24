var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server/executeService.ts
import * as vm from "node:vm";

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
      let matchCount = 0;
      for (let i = 0; i < this.length; i++) {
        if (this[i] === val) matchCount++;
      }
      return matchCount;
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
  if (/process\s*\.\s*env/i.test(code) || /child_process/i.test(code) || /__proto__/i.test(code)) {
    return {
      output: "",
      error: "Security Violation: Access to system environment and child processes is strictly forbidden."
    };
  }
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
      let numA = Math.abs(Math.round(a));
      let numB = Math.abs(Math.round(b));
      while (numB) {
        const temp = numB;
        numB = numA % numB;
        numA = temp;
      }
      return numA;
    },
    lcm: (a, b) => {
      if (a === 0 || b === 0) return 0;
      let numA = Math.abs(Math.round(a));
      let numB = Math.abs(Math.round(b));
      const product = numA * numB;
      while (numB) {
        const temp = numB;
        numB = numA % numB;
        numA = temp;
      }
      return Math.round(product / numA);
    },
    factorial: (num) => {
      let result = 1;
      for (let i = 2; i <= num; i++) result *= i;
      return result;
    },
    log: Math.log,
    log2: Math.log2,
    log10: Math.log10
  };
  const env = {
    sys,
    math,
    process: void 0,
    require: void 0,
    global: void 0,
    globalThis: void 0,
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
      line = line.replace(/\band\s+/g, "&& ").replace(/\bor\s+/g, "|| ").replace(/\bnot\s+/g, "!").replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null").replace(/\.strip\(\)/g, ".trim()").replace(/\.rstrip\(\)/g, ".trimEnd()").replace(/\.lstrip\(\)/g, ".trimStart()").replace(/\.split\(\)/g, ".split(/\\s+/).filter(Boolean)").replace(/\.append\((.*?)\)/g, ".push($1)").replace(/\.lower\(\)/g, ".toLowerCase()").replace(/\.upper\(\)/g, ".toUpperCase()").replace(/\belif\s+(.*?):/g, "else if ($1) {").replace(/\bdef\s+([a-zA-Z0-9_]+)\s*\((.*?)\):/g, "function $1($2) {").replace(/\bfor\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\):/g, 'for (let $1 of range($2)) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");').replace(/\bfor\s+([a-zA-Z0-9_]+)\s+in\s+(.*?):/g, 'for (let $1 of $2) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");').replace(/\bwhile\s+(.*?):/g, 'while ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");').replace(/\bif\s+(.*?):/g, "if ($1) {").replace(/\belse\s*:/g, "else {");
      if (/^[a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+\s*=/.test(trimmed)) {
        line = line.replace(
          /^(\s*)([a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+)\s*=\s*(.*)$/,
          "$1let [$2] = $4"
        );
      }
      transformedLines.push(line);
    }
    let formattedJs = "let __loopGuard = 0;\n";
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
      if (trimmed.includes("{") && (trimmed.startsWith("for ") || trimmed.startsWith("while ") || trimmed.startsWith("if ") || trimmed.startsWith("else") || trimmed.startsWith("function "))) {
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
  if (/process\s*\.\s*env/i.test(code) || /child_process/i.test(code) || /__proto__/i.test(code)) {
    return {
      output: "",
      error: "Security Violation: Access to system environment and child processes is strictly forbidden."
    };
  }
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
      const strVal = String(val);
      if (strVal.includes("\n")) {
        const parts = strVal.split("\n");
        currentLineBuffer += parts[0];
        outputs.push(currentLineBuffer);
        for (let i = 1; i < parts.length - 1; i++) {
          outputs.push(parts[i]);
        }
        currentLineBuffer = parts[parts.length - 1];
      } else {
        currentLineBuffer += strVal;
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
    process: void 0,
    require: void 0,
    global: void 0,
    globalThis: void 0,
    endl: "\n",
    INT_MAX: 2147483647,
    INT_MIN: -2147483648,
    LLONG_MAX: Number.MAX_SAFE_INTEGER,
    LLONG_MIN: Number.MIN_SAFE_INTEGER,
    min: (...args) => Math.min(...args),
    max: (...args) => Math.max(...args),
    abs: (val) => Math.abs(val),
    sqrt: (val) => Math.sqrt(val),
    pow: (base, exponent) => Math.pow(base, exponent),
    __gcd: (a, b) => {
      let numA = Math.abs(Math.round(a));
      let numB = Math.abs(Math.round(b));
      while (numB) {
        const temp = numB;
        numB = numA % numB;
        numA = temp;
      }
      return numA;
    },
    gcd: (a, b) => {
      let numA = Math.abs(Math.round(a));
      let numB = Math.abs(Math.round(b));
      while (numB) {
        const temp = numB;
        numB = numA % numB;
        numA = temp;
      }
      return numA;
    },
    to_string: (val) => String(val),
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
    let cleanCode = "let __loopGuard = 0;\n" + code;
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
    cleanCode = cleanCode.replace(/while\s*\((.*?)\)\s*\{/g, 'while ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");');
    cleanCode = cleanCode.replace(/for\s*\((.*?)\)\s*\{/g, 'for ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");');
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
  if (/process\s*\.\s*env/i.test(code) || /child_process/i.test(code) || /__proto__/i.test(code)) {
    return {
      output: "",
      error: "Security Violation: Access to system environment and child processes is strictly forbidden."
    };
  }
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
        currentLineBuffer += args.map((arg) => String(arg)).join(" ");
        outputs.push(currentLineBuffer);
        currentLineBuffer = "";
      },
      print: (...args) => {
        currentLineBuffer += args.map((arg) => String(arg)).join(" ");
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
    process: void 0,
    require: void 0,
    global: void 0,
    globalThis: void 0,
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
    let cleanCode = "let __loopGuard = 0;\n" + code;
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
    cleanCode = cleanCode.replace(/while\s*\((.*?)\)\s*\{/g, 'while ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");');
    cleanCode = cleanCode.replace(/for\s*\((.*?)\)\s*\{/g, 'for ($1) { if (++__loopGuard > 1000000) throw new Error("Time Limit Exceeded");');
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
var serverTestCases_exports = {};
__export(serverTestCases_exports, {
  default: () => serverTestCases_default,
  serverTestCases: () => serverTestCases
});
var serverTestCases = {
  "belt-1-q1-variables-and-assignment": {
    "title": "Variables and assignment",
    "slug": "belt-1-q1-variables-and-assignment",
    "id": "M1-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "15\n138\n79\n123",
        "expectedOutput": "355",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "718\n-126\n86\n91",
        "expectedOutput": "769",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "804\n172\n-171\n18",
        "expectedOutput": "823",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "284\n-12\n190\n133",
        "expectedOutput": "595",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "453\n184\n75\n-30",
        "expectedOutput": "682",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "961\n-24\n26\n76",
        "expectedOutput": "1039",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "250\n168\n-171\n-65",
        "expectedOutput": "182",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "211\n-64\n-182\n-156",
        "expectedOutput": "-191",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "607\n-11\n200\n40",
        "expectedOutput": "836",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "914\n187\n-34\n-162",
        "expectedOutput": "905",
        "isHidden": true
      }
    ]
  },
  "belt-1-q1-sum-of-two-numbers": {
    "title": "Variables and assignment",
    "slug": "belt-1-q1-variables-and-assignment",
    "id": "M1-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "15\n138\n79\n123",
        "expectedOutput": "355",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "718\n-126\n86\n91",
        "expectedOutput": "769",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "804\n172\n-171\n18",
        "expectedOutput": "823",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "284\n-12\n190\n133",
        "expectedOutput": "595",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "453\n184\n75\n-30",
        "expectedOutput": "682",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "961\n-24\n26\n76",
        "expectedOutput": "1039",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "250\n168\n-171\n-65",
        "expectedOutput": "182",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "211\n-64\n-182\n-156",
        "expectedOutput": "-191",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "607\n-11\n200\n40",
        "expectedOutput": "836",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "914\n187\n-34\n-162",
        "expectedOutput": "905",
        "isHidden": true
      }
    ]
  },
  "M1-LU1": {
    "title": "Variables and assignment",
    "slug": "belt-1-q1-variables-and-assignment",
    "id": "M1-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "15\n138\n79\n123",
        "expectedOutput": "355",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "718\n-126\n86\n91",
        "expectedOutput": "769",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "804\n172\n-171\n18",
        "expectedOutput": "823",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "284\n-12\n190\n133",
        "expectedOutput": "595",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "453\n184\n75\n-30",
        "expectedOutput": "682",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "961\n-24\n26\n76",
        "expectedOutput": "1039",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "250\n168\n-171\n-65",
        "expectedOutput": "182",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "211\n-64\n-182\n-156",
        "expectedOutput": "-191",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "607\n-11\n200\n40",
        "expectedOutput": "836",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "914\n187\n-34\n-162",
        "expectedOutput": "905",
        "isHidden": true
      }
    ]
  },
  "m1-lu1": {
    "title": "Variables and assignment",
    "slug": "belt-1-q1-variables-and-assignment",
    "id": "M1-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "15\n138\n79\n123",
        "expectedOutput": "355",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "718\n-126\n86\n91",
        "expectedOutput": "769",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "804\n172\n-171\n18",
        "expectedOutput": "823",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "284\n-12\n190\n133",
        "expectedOutput": "595",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "453\n184\n75\n-30",
        "expectedOutput": "682",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "961\n-24\n26\n76",
        "expectedOutput": "1039",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "250\n168\n-171\n-65",
        "expectedOutput": "182",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "211\n-64\n-182\n-156",
        "expectedOutput": "-191",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "607\n-11\n200\n40",
        "expectedOutput": "836",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "914\n187\n-34\n-162",
        "expectedOutput": "905",
        "isHidden": true
      }
    ]
  },
  "belt-1-q2-input-and-output-handling": {
    "title": "Input and output handling",
    "slug": "belt-1-q2-input-and-output-handling",
    "id": "M1-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n59 28 64 76 63",
        "expectedOutput": "290",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n57 55 57 35 4 71 21 70",
        "expectedOutput": "370",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n83 93 77 52 15 64 35",
        "expectedOutput": "419",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n58 66 73",
        "expectedOutput": "197",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n64 30 15 94 2 62 28",
        "expectedOutput": "295",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n53 13 16 56 17",
        "expectedOutput": "155",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n52 24 48 71 80",
        "expectedOutput": "275",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n73 62 27 62 28 47",
        "expectedOutput": "299",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n82",
        "expectedOutput": "82",
        "isHidden": true
      }
    ]
  },
  "belt-1-q2-difference-of-two-numbers": {
    "title": "Input and output handling",
    "slug": "belt-1-q2-input-and-output-handling",
    "id": "M1-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n59 28 64 76 63",
        "expectedOutput": "290",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n57 55 57 35 4 71 21 70",
        "expectedOutput": "370",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n83 93 77 52 15 64 35",
        "expectedOutput": "419",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n58 66 73",
        "expectedOutput": "197",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n64 30 15 94 2 62 28",
        "expectedOutput": "295",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n53 13 16 56 17",
        "expectedOutput": "155",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n52 24 48 71 80",
        "expectedOutput": "275",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n73 62 27 62 28 47",
        "expectedOutput": "299",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n82",
        "expectedOutput": "82",
        "isHidden": true
      }
    ]
  },
  "M1-LU2": {
    "title": "Input and output handling",
    "slug": "belt-1-q2-input-and-output-handling",
    "id": "M1-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n59 28 64 76 63",
        "expectedOutput": "290",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n57 55 57 35 4 71 21 70",
        "expectedOutput": "370",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n83 93 77 52 15 64 35",
        "expectedOutput": "419",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n58 66 73",
        "expectedOutput": "197",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n64 30 15 94 2 62 28",
        "expectedOutput": "295",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n53 13 16 56 17",
        "expectedOutput": "155",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n52 24 48 71 80",
        "expectedOutput": "275",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n73 62 27 62 28 47",
        "expectedOutput": "299",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n82",
        "expectedOutput": "82",
        "isHidden": true
      }
    ]
  },
  "m1-lu2": {
    "title": "Input and output handling",
    "slug": "belt-1-q2-input-and-output-handling",
    "id": "M1-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n59 28 64 76 63",
        "expectedOutput": "290",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n57 55 57 35 4 71 21 70",
        "expectedOutput": "370",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n83 93 77 52 15 64 35",
        "expectedOutput": "419",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n58 66 73",
        "expectedOutput": "197",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n64 30 15 94 2 62 28",
        "expectedOutput": "295",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n53 13 16 56 17",
        "expectedOutput": "155",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n52 24 48 71 80",
        "expectedOutput": "275",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n73 62 27 62 28 47",
        "expectedOutput": "299",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n82",
        "expectedOutput": "82",
        "isHidden": true
      }
    ]
  },
  "belt-1-q3-data-types": {
    "title": "Data types",
    "slug": "belt-1-q3-data-types",
    "id": "M1-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "767\n1.64\n1",
        "expectedOutput": "1257.88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "385\n1.77\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "816\n1.86\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "499\n1.01\n1",
        "expectedOutput": "503.99",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "380\n1.57\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "303\n0.16\n1",
        "expectedOutput": "48.48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "620\n0.71\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "526\n2.23\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "622\n1.7\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "309\n2.02\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      }
    ]
  },
  "belt-1-q3-product-of-two-numbers": {
    "title": "Data types",
    "slug": "belt-1-q3-data-types",
    "id": "M1-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "767\n1.64\n1",
        "expectedOutput": "1257.88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "385\n1.77\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "816\n1.86\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "499\n1.01\n1",
        "expectedOutput": "503.99",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "380\n1.57\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "303\n0.16\n1",
        "expectedOutput": "48.48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "620\n0.71\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "526\n2.23\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "622\n1.7\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "309\n2.02\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      }
    ]
  },
  "M1-LU3": {
    "title": "Data types",
    "slug": "belt-1-q3-data-types",
    "id": "M1-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "767\n1.64\n1",
        "expectedOutput": "1257.88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "385\n1.77\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "816\n1.86\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "499\n1.01\n1",
        "expectedOutput": "503.99",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "380\n1.57\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "303\n0.16\n1",
        "expectedOutput": "48.48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "620\n0.71\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "526\n2.23\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "622\n1.7\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "309\n2.02\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      }
    ]
  },
  "m1-lu3": {
    "title": "Data types",
    "slug": "belt-1-q3-data-types",
    "id": "M1-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "767\n1.64\n1",
        "expectedOutput": "1257.88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "385\n1.77\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "816\n1.86\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "499\n1.01\n1",
        "expectedOutput": "503.99",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "380\n1.57\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "303\n0.16\n1",
        "expectedOutput": "48.48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "620\n0.71\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "526\n2.23\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "622\n1.7\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "309\n2.02\n0",
        "expectedOutput": "SENSOR_OFF",
        "isHidden": true
      }
    ]
  },
  "belt-1-q4-arithmetic-relational-and-logical-operators": {
    "title": "Arithmetic, relational, and logical operators",
    "slug": "belt-1-q4-arithmetic-relational-and-logical-operators",
    "id": "M1-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n8\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "21\n9\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "21\n1\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "16\n8\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "15\n5\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "27\n1\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "28\n6\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "26\n10\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "20\n7\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "27\n5\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      }
    ]
  },
  "belt-1-q4-calculate-rectangle-area": {
    "title": "Arithmetic, relational, and logical operators",
    "slug": "belt-1-q4-arithmetic-relational-and-logical-operators",
    "id": "M1-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n8\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "21\n9\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "21\n1\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "16\n8\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "15\n5\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "27\n1\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "28\n6\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "26\n10\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "20\n7\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "27\n5\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      }
    ]
  },
  "M1-LU4": {
    "title": "Arithmetic, relational, and logical operators",
    "slug": "belt-1-q4-arithmetic-relational-and-logical-operators",
    "id": "M1-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n8\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "21\n9\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "21\n1\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "16\n8\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "15\n5\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "27\n1\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "28\n6\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "26\n10\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "20\n7\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "27\n5\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      }
    ]
  },
  "m1-lu4": {
    "title": "Arithmetic, relational, and logical operators",
    "slug": "belt-1-q4-arithmetic-relational-and-logical-operators",
    "id": "M1-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n8\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "21\n9\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "21\n1\n0",
        "expectedOutput": "DENIED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "16\n8\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "15\n5\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "27\n1\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "28\n6\n1",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "26\n10\n1",
        "expectedOutput": "ALLOWED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "20\n7\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "27\n5\n0",
        "expectedOutput": "DENIED",
        "isHidden": true
      }
    ]
  },
  "belt-1-q5-type-conversion": {
    "title": "Type conversion",
    "slug": "belt-1-q5-type-conversion",
    "id": "M1-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "908.48\n5.56",
        "expectedOutput": "958.99",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "909.97\n12.92",
        "expectedOutput": "1027.54",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "154.2\n17.56",
        "expectedOutput": "181.28",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "157.83\n14.62",
        "expectedOutput": "180.90",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "571.57\n1.68",
        "expectedOutput": "581.17",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "901.22\n19.76",
        "expectedOutput": "1079.30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "565.92\n6.07",
        "expectedOutput": "600.27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "980.49\n3.37",
        "expectedOutput": "1013.53",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "18.67\n16.88",
        "expectedOutput": "21.82",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "140.17\n18.38",
        "expectedOutput": "165.93",
        "isHidden": true
      }
    ]
  },
  "belt-1-q5-calculate-total-marks": {
    "title": "Type conversion",
    "slug": "belt-1-q5-type-conversion",
    "id": "M1-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "908.48\n5.56",
        "expectedOutput": "958.99",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "909.97\n12.92",
        "expectedOutput": "1027.54",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "154.2\n17.56",
        "expectedOutput": "181.28",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "157.83\n14.62",
        "expectedOutput": "180.90",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "571.57\n1.68",
        "expectedOutput": "581.17",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "901.22\n19.76",
        "expectedOutput": "1079.30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "565.92\n6.07",
        "expectedOutput": "600.27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "980.49\n3.37",
        "expectedOutput": "1013.53",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "18.67\n16.88",
        "expectedOutput": "21.82",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "140.17\n18.38",
        "expectedOutput": "165.93",
        "isHidden": true
      }
    ]
  },
  "M1-LU5": {
    "title": "Type conversion",
    "slug": "belt-1-q5-type-conversion",
    "id": "M1-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "908.48\n5.56",
        "expectedOutput": "958.99",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "909.97\n12.92",
        "expectedOutput": "1027.54",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "154.2\n17.56",
        "expectedOutput": "181.28",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "157.83\n14.62",
        "expectedOutput": "180.90",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "571.57\n1.68",
        "expectedOutput": "581.17",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "901.22\n19.76",
        "expectedOutput": "1079.30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "565.92\n6.07",
        "expectedOutput": "600.27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "980.49\n3.37",
        "expectedOutput": "1013.53",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "18.67\n16.88",
        "expectedOutput": "21.82",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "140.17\n18.38",
        "expectedOutput": "165.93",
        "isHidden": true
      }
    ]
  },
  "m1-lu5": {
    "title": "Type conversion",
    "slug": "belt-1-q5-type-conversion",
    "id": "M1-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "908.48\n5.56",
        "expectedOutput": "958.99",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "909.97\n12.92",
        "expectedOutput": "1027.54",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "154.2\n17.56",
        "expectedOutput": "181.28",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "157.83\n14.62",
        "expectedOutput": "180.90",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "571.57\n1.68",
        "expectedOutput": "581.17",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "901.22\n19.76",
        "expectedOutput": "1079.30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "565.92\n6.07",
        "expectedOutput": "600.27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "980.49\n3.37",
        "expectedOutput": "1013.53",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "18.67\n16.88",
        "expectedOutput": "21.82",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "140.17\n18.38",
        "expectedOutput": "165.93",
        "isHidden": true
      }
    ]
  },
  "belt-1-q6-operator-precedence": {
    "title": "Operator precedence",
    "slug": "belt-1-q6-operator-precedence",
    "id": "M1-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n-8\n-14\n17",
        "expectedOutput": "-129",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n4\n6\n-3",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-17\n-10\n-8",
        "expectedOutput": "108",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-6\n3\n-8\n10",
        "expectedOutput": "14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n14\n16\n-6",
        "expectedOutput": "326",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-16\n7\n-5\n-16",
        "expectedOutput": "61",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0\n1\n-6\n-14",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "17\n11\n3\n6",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n9\n-8\n-7",
        "expectedOutput": "-73",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-5\n14\n-15\n14",
        "expectedOutput": "-149",
        "isHidden": true
      }
    ]
  },
  "belt-1-q6-calculate-average": {
    "title": "Operator precedence",
    "slug": "belt-1-q6-operator-precedence",
    "id": "M1-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n-8\n-14\n17",
        "expectedOutput": "-129",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n4\n6\n-3",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-17\n-10\n-8",
        "expectedOutput": "108",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-6\n3\n-8\n10",
        "expectedOutput": "14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n14\n16\n-6",
        "expectedOutput": "326",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-16\n7\n-5\n-16",
        "expectedOutput": "61",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0\n1\n-6\n-14",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "17\n11\n3\n6",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n9\n-8\n-7",
        "expectedOutput": "-73",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-5\n14\n-15\n14",
        "expectedOutput": "-149",
        "isHidden": true
      }
    ]
  },
  "M1-LU6": {
    "title": "Operator precedence",
    "slug": "belt-1-q6-operator-precedence",
    "id": "M1-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n-8\n-14\n17",
        "expectedOutput": "-129",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n4\n6\n-3",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-17\n-10\n-8",
        "expectedOutput": "108",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-6\n3\n-8\n10",
        "expectedOutput": "14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n14\n16\n-6",
        "expectedOutput": "326",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-16\n7\n-5\n-16",
        "expectedOutput": "61",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0\n1\n-6\n-14",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "17\n11\n3\n6",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n9\n-8\n-7",
        "expectedOutput": "-73",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-5\n14\n-15\n14",
        "expectedOutput": "-149",
        "isHidden": true
      }
    ]
  },
  "m1-lu6": {
    "title": "Operator precedence",
    "slug": "belt-1-q6-operator-precedence",
    "id": "M1-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "16\n-8\n-14\n17",
        "expectedOutput": "-129",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n4\n6\n-3",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-17\n-10\n-8",
        "expectedOutput": "108",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-6\n3\n-8\n10",
        "expectedOutput": "14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n14\n16\n-6",
        "expectedOutput": "326",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-16\n7\n-5\n-16",
        "expectedOutput": "61",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0\n1\n-6\n-14",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "17\n11\n3\n6",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n9\n-8\n-7",
        "expectedOutput": "-73",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-5\n14\n-15\n14",
        "expectedOutput": "-149",
        "isHidden": true
      }
    ]
  },
  "belt-1-q7-variable-scope-awareness": {
    "title": "Variable scope awareness",
    "slug": "belt-1-q7-variable-scope-awareness",
    "id": "M1-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-13\n6\n20",
        "expectedOutput": "-13 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-20\n13\n18",
        "expectedOutput": "-20 18",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-1\n9\n-18",
        "expectedOutput": "-1 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-10\n1\n11",
        "expectedOutput": "-10 11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-19\n0",
        "expectedOutput": "4 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "13\n-10\n20",
        "expectedOutput": "13 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "13\n18\n-16",
        "expectedOutput": "13 -16",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-14\n13\n7",
        "expectedOutput": "-14 7",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-20\n-14\n7",
        "expectedOutput": "-20 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-12\n-10\n11",
        "expectedOutput": "-12 11",
        "isHidden": true
      }
    ]
  },
  "belt-1-q7-convert-minutes-to-hours-and-minutes": {
    "title": "Variable scope awareness",
    "slug": "belt-1-q7-variable-scope-awareness",
    "id": "M1-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-13\n6\n20",
        "expectedOutput": "-13 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-20\n13\n18",
        "expectedOutput": "-20 18",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-1\n9\n-18",
        "expectedOutput": "-1 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-10\n1\n11",
        "expectedOutput": "-10 11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-19\n0",
        "expectedOutput": "4 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "13\n-10\n20",
        "expectedOutput": "13 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "13\n18\n-16",
        "expectedOutput": "13 -16",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-14\n13\n7",
        "expectedOutput": "-14 7",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-20\n-14\n7",
        "expectedOutput": "-20 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-12\n-10\n11",
        "expectedOutput": "-12 11",
        "isHidden": true
      }
    ]
  },
  "M1-LU7": {
    "title": "Variable scope awareness",
    "slug": "belt-1-q7-variable-scope-awareness",
    "id": "M1-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-13\n6\n20",
        "expectedOutput": "-13 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-20\n13\n18",
        "expectedOutput": "-20 18",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-1\n9\n-18",
        "expectedOutput": "-1 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-10\n1\n11",
        "expectedOutput": "-10 11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-19\n0",
        "expectedOutput": "4 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "13\n-10\n20",
        "expectedOutput": "13 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "13\n18\n-16",
        "expectedOutput": "13 -16",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-14\n13\n7",
        "expectedOutput": "-14 7",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-20\n-14\n7",
        "expectedOutput": "-20 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-12\n-10\n11",
        "expectedOutput": "-12 11",
        "isHidden": true
      }
    ]
  },
  "m1-lu7": {
    "title": "Variable scope awareness",
    "slug": "belt-1-q7-variable-scope-awareness",
    "id": "M1-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-13\n6\n20",
        "expectedOutput": "-13 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-20\n13\n18",
        "expectedOutput": "-20 18",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-1\n9\n-18",
        "expectedOutput": "-1 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-10\n1\n11",
        "expectedOutput": "-10 11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-19\n0",
        "expectedOutput": "4 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "13\n-10\n20",
        "expectedOutput": "13 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "13\n18\n-16",
        "expectedOutput": "13 -16",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-14\n13\n7",
        "expectedOutput": "-14 7",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-20\n-14\n7",
        "expectedOutput": "-20 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-12\n-10\n11",
        "expectedOutput": "-12 11",
        "isHidden": true
      }
    ]
  },
  "belt-1-q8-boolean-expressions": {
    "title": "Boolean expressions",
    "slug": "belt-1-q8-boolean-expressions",
    "id": "M1-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "73\n58\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "22\n89\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "64\n85\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "40\n39\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "28\n74\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "51\n46\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n47\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "60\n11\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "36\n14\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "22\n9\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      }
    ]
  },
  "belt-1-q8-check-even-or-odd": {
    "title": "Boolean expressions",
    "slug": "belt-1-q8-boolean-expressions",
    "id": "M1-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "73\n58\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "22\n89\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "64\n85\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "40\n39\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "28\n74\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "51\n46\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n47\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "60\n11\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "36\n14\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "22\n9\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      }
    ]
  },
  "M1-LU8": {
    "title": "Boolean expressions",
    "slug": "belt-1-q8-boolean-expressions",
    "id": "M1-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "73\n58\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "22\n89\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "64\n85\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "40\n39\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "28\n74\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "51\n46\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n47\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "60\n11\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "36\n14\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "22\n9\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      }
    ]
  },
  "m1-lu8": {
    "title": "Boolean expressions",
    "slug": "belt-1-q8-boolean-expressions",
    "id": "M1-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "73\n58\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "22\n89\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "64\n85\n1\n1",
        "expectedOutput": "READY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "40\n39\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "28\n74\n0\n0",
        "expectedOutput": "NOT_READY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "51\n46\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n47\n1\n0",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "60\n11\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "36\n14\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "22\n9\n0\n1",
        "expectedOutput": "READY",
        "isHidden": true
      }
    ]
  },
  "belt-1-q9-conditionals": {
    "title": "Conditionals",
    "slug": "belt-1-q9-conditionals",
    "id": "M1-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "14",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "LIGHT",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "13",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "25.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "13.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "11.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2.5",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "23.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20",
        "expectedOutput": "STANDARD",
        "isHidden": true
      }
    ]
  },
  "belt-1-q9-check-positive-negative-or-zero": {
    "title": "Conditionals",
    "slug": "belt-1-q9-conditionals",
    "id": "M1-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "14",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "LIGHT",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "13",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "25.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "13.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "11.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2.5",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "23.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20",
        "expectedOutput": "STANDARD",
        "isHidden": true
      }
    ]
  },
  "M1-LU9": {
    "title": "Conditionals",
    "slug": "belt-1-q9-conditionals",
    "id": "M1-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "14",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "LIGHT",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "13",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "25.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "13.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "11.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2.5",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "23.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20",
        "expectedOutput": "STANDARD",
        "isHidden": true
      }
    ]
  },
  "m1-lu9": {
    "title": "Conditionals",
    "slug": "belt-1-q9-conditionals",
    "id": "M1-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "14",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "LIGHT",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "13",
        "expectedOutput": "STANDARD",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "25.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "13.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "11.5",
        "expectedOutput": "STANDARD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2.5",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "LIGHT",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "23.5",
        "expectedOutput": "HEAVY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20",
        "expectedOutput": "STANDARD",
        "isHidden": true
      }
    ]
  },
  "belt-1-q10-switch-statement": {
    "title": "Switch statement",
    "slug": "belt-1-q10-switch-statement",
    "id": "M1-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2",
        "expectedOutput": "DOSA",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-3",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-9",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-6",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7",
        "expectedOutput": "INVALID",
        "isHidden": true
      }
    ]
  },
  "belt-1-q10-compare-two-numbers": {
    "title": "Switch statement",
    "slug": "belt-1-q10-switch-statement",
    "id": "M1-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2",
        "expectedOutput": "DOSA",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-3",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-9",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-6",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7",
        "expectedOutput": "INVALID",
        "isHidden": true
      }
    ]
  },
  "M1-LU10": {
    "title": "Switch statement",
    "slug": "belt-1-q10-switch-statement",
    "id": "M1-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2",
        "expectedOutput": "DOSA",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-3",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-9",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-6",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7",
        "expectedOutput": "INVALID",
        "isHidden": true
      }
    ]
  },
  "m1-lu10": {
    "title": "Switch statement",
    "slug": "belt-1-q10-switch-statement",
    "id": "M1-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2",
        "expectedOutput": "DOSA",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-3",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-9",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-6",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7",
        "expectedOutput": "INVALID",
        "isHidden": true
      }
    ]
  },
  "belt-1-q11-basic-debugging": {
    "title": "Basic debugging",
    "slug": "belt-1-q11-basic-debugging",
    "id": "M1-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "34\n-7\n29\n-34",
        "expectedOutput": "22",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "41\n31\n-47\n-31",
        "expectedOutput": "-6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-13\n-10\n-49\n-14",
        "expectedOutput": "-86",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "32\n-29\n-23\n47",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "30\n39\n43\n-29",
        "expectedOutput": "83",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "39\n-13\n27\n12",
        "expectedOutput": "65",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n11\n7",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-9\n-18\n1\n35",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-25\n-29\n-24\n-50",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-50\n-14\n29\n-20",
        "expectedOutput": "-55",
        "isHidden": true
      }
    ]
  },
  "belt-1-q11-check-voting-eligibility": {
    "title": "Basic debugging",
    "slug": "belt-1-q11-basic-debugging",
    "id": "M1-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "34\n-7\n29\n-34",
        "expectedOutput": "22",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "41\n31\n-47\n-31",
        "expectedOutput": "-6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-13\n-10\n-49\n-14",
        "expectedOutput": "-86",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "32\n-29\n-23\n47",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "30\n39\n43\n-29",
        "expectedOutput": "83",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "39\n-13\n27\n12",
        "expectedOutput": "65",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n11\n7",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-9\n-18\n1\n35",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-25\n-29\n-24\n-50",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-50\n-14\n29\n-20",
        "expectedOutput": "-55",
        "isHidden": true
      }
    ]
  },
  "M1-LU11": {
    "title": "Basic debugging",
    "slug": "belt-1-q11-basic-debugging",
    "id": "M1-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "34\n-7\n29\n-34",
        "expectedOutput": "22",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "41\n31\n-47\n-31",
        "expectedOutput": "-6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-13\n-10\n-49\n-14",
        "expectedOutput": "-86",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "32\n-29\n-23\n47",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "30\n39\n43\n-29",
        "expectedOutput": "83",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "39\n-13\n27\n12",
        "expectedOutput": "65",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n11\n7",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-9\n-18\n1\n35",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-25\n-29\n-24\n-50",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-50\n-14\n29\n-20",
        "expectedOutput": "-55",
        "isHidden": true
      }
    ]
  },
  "m1-lu11": {
    "title": "Basic debugging",
    "slug": "belt-1-q11-basic-debugging",
    "id": "M1-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "34\n-7\n29\n-34",
        "expectedOutput": "22",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "41\n31\n-47\n-31",
        "expectedOutput": "-6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-13\n-10\n-49\n-14",
        "expectedOutput": "-86",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "32\n-29\n-23\n47",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "30\n39\n43\n-29",
        "expectedOutput": "83",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "39\n-13\n27\n12",
        "expectedOutput": "65",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n11\n7",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "-9\n-18\n1\n35",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-25\n-29\n-24\n-50",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "-50\n-14\n29\n-20",
        "expectedOutput": "-55",
        "isHidden": true
      }
    ]
  },
  "belt-1-q12-for-while-and-do-while-loops": {
    "title": "For, while, and do-while loops",
    "slug": "belt-1-q12-for-while-and-do-while-loops",
    "id": "M2-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-30 -12 -5 2 24 13 -8 -27",
        "expectedOutput": "-45",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n22 -16 -22 27 19 -7",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n-17 20 28 -12 14 -7 -11 19",
        "expectedOutput": "-12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n-6",
        "expectedOutput": "-6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n-13 -10 -21 26 -23 -30 14 -25 4 8",
        "expectedOutput": "-51",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n12 1 -5 -10 4 24 20",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "10\n23 28 -26 26 11 7 2 -23 12 12",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n-20 -27 14 19 20 -1 -20 -9 -17",
        "expectedOutput": "-36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n11 -6 7 -13 -11 6 -1 -25",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n23",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-1-q12-find-the-larger-number": {
    "title": "For, while, and do-while loops",
    "slug": "belt-1-q12-for-while-and-do-while-loops",
    "id": "M2-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-30 -12 -5 2 24 13 -8 -27",
        "expectedOutput": "-45",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n22 -16 -22 27 19 -7",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n-17 20 28 -12 14 -7 -11 19",
        "expectedOutput": "-12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n-6",
        "expectedOutput": "-6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n-13 -10 -21 26 -23 -30 14 -25 4 8",
        "expectedOutput": "-51",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n12 1 -5 -10 4 24 20",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "10\n23 28 -26 26 11 7 2 -23 12 12",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n-20 -27 14 19 20 -1 -20 -9 -17",
        "expectedOutput": "-36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n11 -6 7 -13 -11 6 -1 -25",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n23",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "M2-LU1": {
    "title": "For, while, and do-while loops",
    "slug": "belt-1-q12-for-while-and-do-while-loops",
    "id": "M2-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-30 -12 -5 2 24 13 -8 -27",
        "expectedOutput": "-45",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n22 -16 -22 27 19 -7",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n-17 20 28 -12 14 -7 -11 19",
        "expectedOutput": "-12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n-6",
        "expectedOutput": "-6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n-13 -10 -21 26 -23 -30 14 -25 4 8",
        "expectedOutput": "-51",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n12 1 -5 -10 4 24 20",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "10\n23 28 -26 26 11 7 2 -23 12 12",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n-20 -27 14 19 20 -1 -20 -9 -17",
        "expectedOutput": "-36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n11 -6 7 -13 -11 6 -1 -25",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n23",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "m2-lu1": {
    "title": "For, while, and do-while loops",
    "slug": "belt-1-q12-for-while-and-do-while-loops",
    "id": "M2-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-30 -12 -5 2 24 13 -8 -27",
        "expectedOutput": "-45",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n22 -16 -22 27 19 -7",
        "expectedOutput": "27",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n-17 20 28 -12 14 -7 -11 19",
        "expectedOutput": "-12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n-6",
        "expectedOutput": "-6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n-13 -10 -21 26 -23 -30 14 -25 4 8",
        "expectedOutput": "-51",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n12 1 -5 -10 4 24 20",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "10\n23 28 -26 26 11 7 2 -23 12 12",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n-20 -27 14 19 20 -1 -20 -9 -17",
        "expectedOutput": "-36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n11 -6 7 -13 -11 6 -1 -25",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n23",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-1-q13-break-and-continue": {
    "title": "Break and continue",
    "slug": "belt-1-q13-break-and-continue",
    "id": "M2-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n16 4 -1 2 14 7",
        "expectedOutput": "20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n5 5 6 15 9 -1",
        "expectedOutput": "40",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n19 -1 0 2",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n13 5 -1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n18 9 9 -1 19",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n13 9 12 11 3 -1 18 18",
        "expectedOutput": "48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 5 5 9 9 0 19 -1",
        "expectedOutput": "49",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n16 -1 10",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n14 20 5 9 19 -1 13 7",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n11 9 18 5 4 16 -1 16",
        "expectedOutput": "63",
        "isHidden": true
      }
    ]
  },
  "belt-1-q13-check-divisibility": {
    "title": "Break and continue",
    "slug": "belt-1-q13-break-and-continue",
    "id": "M2-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n16 4 -1 2 14 7",
        "expectedOutput": "20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n5 5 6 15 9 -1",
        "expectedOutput": "40",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n19 -1 0 2",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n13 5 -1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n18 9 9 -1 19",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n13 9 12 11 3 -1 18 18",
        "expectedOutput": "48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 5 5 9 9 0 19 -1",
        "expectedOutput": "49",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n16 -1 10",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n14 20 5 9 19 -1 13 7",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n11 9 18 5 4 16 -1 16",
        "expectedOutput": "63",
        "isHidden": true
      }
    ]
  },
  "M2-LU2": {
    "title": "Break and continue",
    "slug": "belt-1-q13-break-and-continue",
    "id": "M2-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n16 4 -1 2 14 7",
        "expectedOutput": "20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n5 5 6 15 9 -1",
        "expectedOutput": "40",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n19 -1 0 2",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n13 5 -1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n18 9 9 -1 19",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n13 9 12 11 3 -1 18 18",
        "expectedOutput": "48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 5 5 9 9 0 19 -1",
        "expectedOutput": "49",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n16 -1 10",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n14 20 5 9 19 -1 13 7",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n11 9 18 5 4 16 -1 16",
        "expectedOutput": "63",
        "isHidden": true
      }
    ]
  },
  "m2-lu2": {
    "title": "Break and continue",
    "slug": "belt-1-q13-break-and-continue",
    "id": "M2-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n16 4 -1 2 14 7",
        "expectedOutput": "20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n5 5 6 15 9 -1",
        "expectedOutput": "40",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n19 -1 0 2",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n13 5 -1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n18 9 9 -1 19",
        "expectedOutput": "36",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n13 9 12 11 3 -1 18 18",
        "expectedOutput": "48",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 5 5 9 9 0 19 -1",
        "expectedOutput": "49",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n16 -1 10",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n14 20 5 9 19 -1 13 7",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n11 9 18 5 4 16 -1 16",
        "expectedOutput": "63",
        "isHidden": true
      }
    ]
  },
  "belt-1-q14-nested-loops": {
    "title": "Nested loops",
    "slug": "belt-1-q14-nested-loops",
    "id": "M2-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n7",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n7",
        "expectedOutput": "25",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n1",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "belt-1-q14-check-number-range": {
    "title": "Nested loops",
    "slug": "belt-1-q14-nested-loops",
    "id": "M2-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n7",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n7",
        "expectedOutput": "25",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n1",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "M2-LU3": {
    "title": "Nested loops",
    "slug": "belt-1-q14-nested-loops",
    "id": "M2-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n7",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n7",
        "expectedOutput": "25",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n1",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "m2-lu3": {
    "title": "Nested loops",
    "slug": "belt-1-q14-nested-loops",
    "id": "M2-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n7",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n7",
        "expectedOutput": "25",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n1",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "belt-1-q15-loop-tracing": {
    "title": "Loop tracing",
    "slug": "belt-1-q15-loop-tracing",
    "id": "M2-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n5\n15",
        "expectedOutput": "6 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n5\n25",
        "expectedOutput": "8 13 18 23",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n2\n18",
        "expectedOutput": "5 7 9 11 13 15 17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n1\n22",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n5\n21",
        "expectedOutput": "10 15 20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n16",
        "expectedOutput": "3 6 9 12 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n1\n24",
        "expectedOutput": "9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n4\n21",
        "expectedOutput": "4 8 12 16 20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n3\n14",
        "expectedOutput": "1 4 7 10 13",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\n16",
        "expectedOutput": "5 8 11 14",
        "isHidden": true
      }
    ]
  },
  "belt-1-q15-pass-or-fail": {
    "title": "Loop tracing",
    "slug": "belt-1-q15-loop-tracing",
    "id": "M2-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n5\n15",
        "expectedOutput": "6 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n5\n25",
        "expectedOutput": "8 13 18 23",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n2\n18",
        "expectedOutput": "5 7 9 11 13 15 17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n1\n22",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n5\n21",
        "expectedOutput": "10 15 20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n16",
        "expectedOutput": "3 6 9 12 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n1\n24",
        "expectedOutput": "9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n4\n21",
        "expectedOutput": "4 8 12 16 20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n3\n14",
        "expectedOutput": "1 4 7 10 13",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\n16",
        "expectedOutput": "5 8 11 14",
        "isHidden": true
      }
    ]
  },
  "M2-LU4": {
    "title": "Loop tracing",
    "slug": "belt-1-q15-loop-tracing",
    "id": "M2-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n5\n15",
        "expectedOutput": "6 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n5\n25",
        "expectedOutput": "8 13 18 23",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n2\n18",
        "expectedOutput": "5 7 9 11 13 15 17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n1\n22",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n5\n21",
        "expectedOutput": "10 15 20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n16",
        "expectedOutput": "3 6 9 12 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n1\n24",
        "expectedOutput": "9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n4\n21",
        "expectedOutput": "4 8 12 16 20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n3\n14",
        "expectedOutput": "1 4 7 10 13",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\n16",
        "expectedOutput": "5 8 11 14",
        "isHidden": true
      }
    ]
  },
  "m2-lu4": {
    "title": "Loop tracing",
    "slug": "belt-1-q15-loop-tracing",
    "id": "M2-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n5\n15",
        "expectedOutput": "6 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n5\n25",
        "expectedOutput": "8 13 18 23",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n2\n18",
        "expectedOutput": "5 7 9 11 13 15 17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n1\n22",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n5\n21",
        "expectedOutput": "10 15 20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n16",
        "expectedOutput": "3 6 9 12 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n1\n24",
        "expectedOutput": "9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n4\n21",
        "expectedOutput": "4 8 12 16 20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n3\n14",
        "expectedOutput": "1 4 7 10 13",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\n16",
        "expectedOutput": "5 8 11 14",
        "isHidden": true
      }
    ]
  },
  "belt-1-q16-pattern-problems": {
    "title": "Pattern problems",
    "slug": "belt-1-q16-pattern-problems",
    "id": "M2-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "11",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "18",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2",
        "expectedOutput": "1\n1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "16",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "13",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13",
        "isHidden": true
      }
    ]
  },
  "belt-1-q16-largest-of-three-numbers": {
    "title": "Pattern problems",
    "slug": "belt-1-q16-pattern-problems",
    "id": "M2-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "11",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "18",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2",
        "expectedOutput": "1\n1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "16",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "13",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13",
        "isHidden": true
      }
    ]
  },
  "M2-LU5": {
    "title": "Pattern problems",
    "slug": "belt-1-q16-pattern-problems",
    "id": "M2-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "11",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "18",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2",
        "expectedOutput": "1\n1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "16",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "13",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13",
        "isHidden": true
      }
    ]
  },
  "m2-lu5": {
    "title": "Pattern problems",
    "slug": "belt-1-q16-pattern-problems",
    "id": "M2-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "11",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "18",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2",
        "expectedOutput": "1\n1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "16",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13\n1 2 3 4 5 6 7 8 9 10 11 12 13 14\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "13",
        "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6\n1 2 3 4 5 6 7\n1 2 3 4 5 6 7 8\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11 12\n1 2 3 4 5 6 7 8 9 10 11 12 13",
        "isHidden": true
      }
    ]
  },
  "belt-1-q17-sentinel-controlled-loops": {
    "title": "Sentinel-controlled loops",
    "slug": "belt-1-q17-sentinel-controlled-loops",
    "id": "M2-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-18\n15\n34\n-13\n999",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "35\n-3\n-1\n17\n7\n-6\n999",
        "expectedOutput": "35",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26\n-7\n-17\n2\n11\n999",
        "expectedOutput": "26",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-18\n-16\n-6\n-1\n11\n9\n999",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-5\n14\n23\n17\n43\n47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "17\n46\n999",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "999",
        "expectedOutput": "EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "11\n50\n25\n6\n9\n13\n999",
        "expectedOutput": "50",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20\n7\n25\n27\n999",
        "expectedOutput": "27",
        "isHidden": true
      }
    ]
  },
  "belt-1-q17-grade-calculator": {
    "title": "Sentinel-controlled loops",
    "slug": "belt-1-q17-sentinel-controlled-loops",
    "id": "M2-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-18\n15\n34\n-13\n999",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "35\n-3\n-1\n17\n7\n-6\n999",
        "expectedOutput": "35",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26\n-7\n-17\n2\n11\n999",
        "expectedOutput": "26",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-18\n-16\n-6\n-1\n11\n9\n999",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-5\n14\n23\n17\n43\n47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "17\n46\n999",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "999",
        "expectedOutput": "EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "11\n50\n25\n6\n9\n13\n999",
        "expectedOutput": "50",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20\n7\n25\n27\n999",
        "expectedOutput": "27",
        "isHidden": true
      }
    ]
  },
  "M2-LU6": {
    "title": "Sentinel-controlled loops",
    "slug": "belt-1-q17-sentinel-controlled-loops",
    "id": "M2-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-18\n15\n34\n-13\n999",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "35\n-3\n-1\n17\n7\n-6\n999",
        "expectedOutput": "35",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26\n-7\n-17\n2\n11\n999",
        "expectedOutput": "26",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-18\n-16\n-6\n-1\n11\n9\n999",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-5\n14\n23\n17\n43\n47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "17\n46\n999",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "999",
        "expectedOutput": "EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "11\n50\n25\n6\n9\n13\n999",
        "expectedOutput": "50",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20\n7\n25\n27\n999",
        "expectedOutput": "27",
        "isHidden": true
      }
    ]
  },
  "m2-lu6": {
    "title": "Sentinel-controlled loops",
    "slug": "belt-1-q17-sentinel-controlled-loops",
    "id": "M2-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-18\n15\n34\n-13\n999",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "35\n-3\n-1\n17\n7\n-6\n999",
        "expectedOutput": "35",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26\n-7\n-17\n2\n11\n999",
        "expectedOutput": "26",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "-18\n-16\n-6\n-1\n11\n9\n999",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "-5\n14\n23\n17\n43\n47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "17\n46\n999",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "47\n999",
        "expectedOutput": "47",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "999",
        "expectedOutput": "EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "11\n50\n25\n6\n9\n13\n999",
        "expectedOutput": "50",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "20\n7\n25\n27\n999",
        "expectedOutput": "27",
        "isHidden": true
      }
    ]
  },
  "belt-1-q18-input-driven-loop-termination": {
    "title": "Input-driven loop termination",
    "slug": "belt-1-q18-input-driven-loop-termination",
    "id": "M2-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17\n7 4",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n27\n2 3 4 1",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n35\n5 3 6 9 5",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n16\n4 5 6 9 8 5 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n11\n2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n30\n10 3 6 8 4 10 2 8",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n6 5 5 8 3 2 9",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n17\n2 2 5 6 2 8 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n19\n3 2 10 7 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n29\n6 10 6 8 1",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-1-q18-simple-calculator": {
    "title": "Input-driven loop termination",
    "slug": "belt-1-q18-input-driven-loop-termination",
    "id": "M2-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17\n7 4",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n27\n2 3 4 1",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n35\n5 3 6 9 5",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n16\n4 5 6 9 8 5 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n11\n2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n30\n10 3 6 8 4 10 2 8",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n6 5 5 8 3 2 9",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n17\n2 2 5 6 2 8 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n19\n3 2 10 7 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n29\n6 10 6 8 1",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "M2-LU7": {
    "title": "Input-driven loop termination",
    "slug": "belt-1-q18-input-driven-loop-termination",
    "id": "M2-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17\n7 4",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n27\n2 3 4 1",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n35\n5 3 6 9 5",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n16\n4 5 6 9 8 5 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n11\n2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n30\n10 3 6 8 4 10 2 8",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n6 5 5 8 3 2 9",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n17\n2 2 5 6 2 8 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n19\n3 2 10 7 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n29\n6 10 6 8 1",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "m2-lu7": {
    "title": "Input-driven loop termination",
    "slug": "belt-1-q18-input-driven-loop-termination",
    "id": "M2-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17\n7 4",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n27\n2 3 4 1",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n35\n5 3 6 9 5",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n16\n4 5 6 9 8 5 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n11\n2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n30\n10 3 6 8 4 10 2 8",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n32\n6 5 5 8 3 2 9",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n17\n2 2 5 6 2 8 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n19\n3 2 10 7 3",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n29\n6 10 6 8 1",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-1-q19-count-based-versus-condition-based-loops": {
    "title": "Count-based versus condition-based loops",
    "slug": "belt-1-q19-count-based-versus-condition-based-loops",
    "id": "M2-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n14\n5 3 10 8 12 5 7 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n26\n8 11 9 3 3 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n25\n9 3 3 9",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n37\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n31\n8 1 11 8",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n34\n10 12 1 10 3 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n18\n3 10 1 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n32\n2 4 5 1 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n25\n12 7",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n13\n1 12 7 7 5 3 5 8",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-1-q19-determine-triangle-type": {
    "title": "Count-based versus condition-based loops",
    "slug": "belt-1-q19-count-based-versus-condition-based-loops",
    "id": "M2-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n14\n5 3 10 8 12 5 7 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n26\n8 11 9 3 3 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n25\n9 3 3 9",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n37\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n31\n8 1 11 8",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n34\n10 12 1 10 3 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n18\n3 10 1 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n32\n2 4 5 1 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n25\n12 7",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n13\n1 12 7 7 5 3 5 8",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "M2-LU8": {
    "title": "Count-based versus condition-based loops",
    "slug": "belt-1-q19-count-based-versus-condition-based-loops",
    "id": "M2-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n14\n5 3 10 8 12 5 7 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n26\n8 11 9 3 3 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n25\n9 3 3 9",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n37\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n31\n8 1 11 8",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n34\n10 12 1 10 3 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n18\n3 10 1 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n32\n2 4 5 1 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n25\n12 7",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n13\n1 12 7 7 5 3 5 8",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "m2-lu8": {
    "title": "Count-based versus condition-based loops",
    "slug": "belt-1-q19-count-based-versus-condition-based-loops",
    "id": "M2-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n14\n5 3 10 8 12 5 7 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n26\n8 11 9 3 3 3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n25\n9 3 3 9",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n37\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n31\n8 1 11 8",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n34\n10 12 1 10 3 5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n18\n3 10 1 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n32\n2 4 5 1 7",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n25\n12 7",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n13\n1 12 7 7 5 3 5 8",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-1-q20-complexity-intuition-with-arrays-and-strings": {
    "title": "Complexity intuition with arrays and strings",
    "slug": "belt-1-q20-complexity-intuition-with-arrays-and-strings",
    "id": "M2-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "adec",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ffdcbbfdded",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "ecdfa",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "faae",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "defccbddacfa",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ccadfb",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "edafeebc",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fbdabcbd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "dbabedfefdd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "affddcccbaaa",
        "expectedOutput": "f",
        "isHidden": true
      }
    ]
  },
  "belt-1-q20-electricity-bill": {
    "title": "Complexity intuition with arrays and strings",
    "slug": "belt-1-q20-complexity-intuition-with-arrays-and-strings",
    "id": "M2-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "adec",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ffdcbbfdded",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "ecdfa",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "faae",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "defccbddacfa",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ccadfb",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "edafeebc",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fbdabcbd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "dbabedfefdd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "affddcccbaaa",
        "expectedOutput": "f",
        "isHidden": true
      }
    ]
  },
  "M2-LU9": {
    "title": "Complexity intuition with arrays and strings",
    "slug": "belt-1-q20-complexity-intuition-with-arrays-and-strings",
    "id": "M2-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "adec",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ffdcbbfdded",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "ecdfa",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "faae",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "defccbddacfa",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ccadfb",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "edafeebc",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fbdabcbd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "dbabedfefdd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "affddcccbaaa",
        "expectedOutput": "f",
        "isHidden": true
      }
    ]
  },
  "m2-lu9": {
    "title": "Complexity intuition with arrays and strings",
    "slug": "belt-1-q20-complexity-intuition-with-arrays-and-strings",
    "id": "M2-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "adec",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ffdcbbfdded",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "ecdfa",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "faae",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "defccbddacfa",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ccadfb",
        "expectedOutput": "c",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "edafeebc",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fbdabcbd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "dbabedfefdd",
        "expectedOutput": "b",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "affddcccbaaa",
        "expectedOutput": "f",
        "isHidden": true
      }
    ]
  },
  "belt-2-q1-arrays": {
    "title": "Arrays",
    "slug": "belt-2-q1-arrays",
    "id": "M3-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n17 8 35 -1 -11",
        "expectedOutput": "(35, 2)",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n18 31 -8 -13 13 -13 31 -15",
        "expectedOutput": "(31, 1)",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-18 26",
        "expectedOutput": "(26, 1)",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n7 -12 34 13",
        "expectedOutput": "(34, 2)",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n-19 -3 35 -9 33 23 4 37 -6",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n35 32 11 28 23",
        "expectedOutput": "(35, 0)",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n13 -13 -10 33 9 32 29",
        "expectedOutput": "(33, 3)",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n28 36 25 9",
        "expectedOutput": "(36, 1)",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-5 -16 36 15 1 8 -16 37",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n9 17 39 -18 -9 15",
        "expectedOutput": "(39, 2)",
        "isHidden": true
      }
    ]
  },
  "belt-2-q1-print-numbers-from-1-to-n": {
    "title": "Arrays",
    "slug": "belt-2-q1-arrays",
    "id": "M3-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n17 8 35 -1 -11",
        "expectedOutput": "(35, 2)",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n18 31 -8 -13 13 -13 31 -15",
        "expectedOutput": "(31, 1)",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-18 26",
        "expectedOutput": "(26, 1)",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n7 -12 34 13",
        "expectedOutput": "(34, 2)",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n-19 -3 35 -9 33 23 4 37 -6",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n35 32 11 28 23",
        "expectedOutput": "(35, 0)",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n13 -13 -10 33 9 32 29",
        "expectedOutput": "(33, 3)",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n28 36 25 9",
        "expectedOutput": "(36, 1)",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-5 -16 36 15 1 8 -16 37",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n9 17 39 -18 -9 15",
        "expectedOutput": "(39, 2)",
        "isHidden": true
      }
    ]
  },
  "M3-LU1": {
    "title": "Arrays",
    "slug": "belt-2-q1-arrays",
    "id": "M3-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n17 8 35 -1 -11",
        "expectedOutput": "(35, 2)",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n18 31 -8 -13 13 -13 31 -15",
        "expectedOutput": "(31, 1)",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-18 26",
        "expectedOutput": "(26, 1)",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n7 -12 34 13",
        "expectedOutput": "(34, 2)",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n-19 -3 35 -9 33 23 4 37 -6",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n35 32 11 28 23",
        "expectedOutput": "(35, 0)",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n13 -13 -10 33 9 32 29",
        "expectedOutput": "(33, 3)",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n28 36 25 9",
        "expectedOutput": "(36, 1)",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-5 -16 36 15 1 8 -16 37",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n9 17 39 -18 -9 15",
        "expectedOutput": "(39, 2)",
        "isHidden": true
      }
    ]
  },
  "m3-lu1": {
    "title": "Arrays",
    "slug": "belt-2-q1-arrays",
    "id": "M3-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n17 8 35 -1 -11",
        "expectedOutput": "(35, 2)",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n18 31 -8 -13 13 -13 31 -15",
        "expectedOutput": "(31, 1)",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-18 26",
        "expectedOutput": "(26, 1)",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n7 -12 34 13",
        "expectedOutput": "(34, 2)",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n-19 -3 35 -9 33 23 4 37 -6",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n35 32 11 28 23",
        "expectedOutput": "(35, 0)",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n13 -13 -10 33 9 32 29",
        "expectedOutput": "(33, 3)",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n28 36 25 9",
        "expectedOutput": "(36, 1)",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-5 -16 36 15 1 8 -16 37",
        "expectedOutput": "(37, 7)",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n9 17 39 -18 -9 15",
        "expectedOutput": "(39, 2)",
        "isHidden": true
      }
    ]
  },
  "belt-2-q2-strings": {
    "title": "Strings",
    "slug": "belt-2-q2-strings",
    "id": "M3-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "nkpq",
        "expectedOutput": "nkpq",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "lwdnlmi",
        "expectedOutput": "lwdnlm",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "whhhjpgfwo",
        "expectedOutput": "whhhjpgfw",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bicdqeclexyi",
        "expectedOutput": "bcdqclxy",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "qmexuiebxgve",
        "expectedOutput": "qmxbxgv",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "xscrpz",
        "expectedOutput": "xscrpz",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "fvkn",
        "expectedOutput": "fvkn",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "vdyxeijd",
        "expectedOutput": "vdyxjd",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "mldmwpneqnxd",
        "expectedOutput": "mldmwpnqnxd",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "nffkm",
        "expectedOutput": "nffkm",
        "isHidden": true
      }
    ]
  },
  "belt-2-q2-print-numbers-from-n-to-1": {
    "title": "Strings",
    "slug": "belt-2-q2-strings",
    "id": "M3-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "nkpq",
        "expectedOutput": "nkpq",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "lwdnlmi",
        "expectedOutput": "lwdnlm",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "whhhjpgfwo",
        "expectedOutput": "whhhjpgfw",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bicdqeclexyi",
        "expectedOutput": "bcdqclxy",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "qmexuiebxgve",
        "expectedOutput": "qmxbxgv",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "xscrpz",
        "expectedOutput": "xscrpz",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "fvkn",
        "expectedOutput": "fvkn",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "vdyxeijd",
        "expectedOutput": "vdyxjd",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "mldmwpneqnxd",
        "expectedOutput": "mldmwpnqnxd",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "nffkm",
        "expectedOutput": "nffkm",
        "isHidden": true
      }
    ]
  },
  "M3-LU2": {
    "title": "Strings",
    "slug": "belt-2-q2-strings",
    "id": "M3-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "nkpq",
        "expectedOutput": "nkpq",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "lwdnlmi",
        "expectedOutput": "lwdnlm",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "whhhjpgfwo",
        "expectedOutput": "whhhjpgfw",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bicdqeclexyi",
        "expectedOutput": "bcdqclxy",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "qmexuiebxgve",
        "expectedOutput": "qmxbxgv",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "xscrpz",
        "expectedOutput": "xscrpz",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "fvkn",
        "expectedOutput": "fvkn",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "vdyxeijd",
        "expectedOutput": "vdyxjd",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "mldmwpneqnxd",
        "expectedOutput": "mldmwpnqnxd",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "nffkm",
        "expectedOutput": "nffkm",
        "isHidden": true
      }
    ]
  },
  "m3-lu2": {
    "title": "Strings",
    "slug": "belt-2-q2-strings",
    "id": "M3-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "nkpq",
        "expectedOutput": "nkpq",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "lwdnlmi",
        "expectedOutput": "lwdnlm",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "whhhjpgfwo",
        "expectedOutput": "whhhjpgfw",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bicdqeclexyi",
        "expectedOutput": "bcdqclxy",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "qmexuiebxgve",
        "expectedOutput": "qmxbxgv",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "xscrpz",
        "expectedOutput": "xscrpz",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "fvkn",
        "expectedOutput": "fvkn",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "vdyxeijd",
        "expectedOutput": "vdyxjd",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "mldmwpneqnxd",
        "expectedOutput": "mldmwpnqnxd",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "nffkm",
        "expectedOutput": "nffkm",
        "isHidden": true
      }
    ]
  },
  "belt-2-q3-matrices": {
    "title": "Matrices",
    "slug": "belt-2-q3-matrices",
    "id": "M3-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n4",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 -9 6 -3 4\n1 2 -6 6 -4\n-8 9 6 -4 2\n-1 6 0 0 -4\n4 -3 -9 0 7",
        "expectedOutput": "15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n-5",
        "expectedOutput": "-5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 -1 -5 8\n-9 9 -4 0\n-8 9 0 -9\n2 5 -3 6",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0 -6 -5\n-5 4 7\n-9 2 5",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n3 -3 -4 7 -2\n-7 -3 2 -6 -8\n8 -4 7 -6 9\n4 7 -9 -1 3\n-1 4 -9 -6 -8",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-8 9 5\n4 -6 6\n9 4 -8",
        "expectedOutput": "-22",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n9 7\n-4 -9",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n9 7 1\n-6 -9 -6\n-3 -8 -9",
        "expectedOutput": "-9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-8 -4 -3\n6 8 6\n-2 -1 6",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-2-q3-sum-of-first-n-natural-numbers": {
    "title": "Matrices",
    "slug": "belt-2-q3-matrices",
    "id": "M3-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n4",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 -9 6 -3 4\n1 2 -6 6 -4\n-8 9 6 -4 2\n-1 6 0 0 -4\n4 -3 -9 0 7",
        "expectedOutput": "15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n-5",
        "expectedOutput": "-5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 -1 -5 8\n-9 9 -4 0\n-8 9 0 -9\n2 5 -3 6",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0 -6 -5\n-5 4 7\n-9 2 5",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n3 -3 -4 7 -2\n-7 -3 2 -6 -8\n8 -4 7 -6 9\n4 7 -9 -1 3\n-1 4 -9 -6 -8",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-8 9 5\n4 -6 6\n9 4 -8",
        "expectedOutput": "-22",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n9 7\n-4 -9",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n9 7 1\n-6 -9 -6\n-3 -8 -9",
        "expectedOutput": "-9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-8 -4 -3\n6 8 6\n-2 -1 6",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "M3-LU3": {
    "title": "Matrices",
    "slug": "belt-2-q3-matrices",
    "id": "M3-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n4",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 -9 6 -3 4\n1 2 -6 6 -4\n-8 9 6 -4 2\n-1 6 0 0 -4\n4 -3 -9 0 7",
        "expectedOutput": "15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n-5",
        "expectedOutput": "-5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 -1 -5 8\n-9 9 -4 0\n-8 9 0 -9\n2 5 -3 6",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0 -6 -5\n-5 4 7\n-9 2 5",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n3 -3 -4 7 -2\n-7 -3 2 -6 -8\n8 -4 7 -6 9\n4 7 -9 -1 3\n-1 4 -9 -6 -8",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-8 9 5\n4 -6 6\n9 4 -8",
        "expectedOutput": "-22",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n9 7\n-4 -9",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n9 7 1\n-6 -9 -6\n-3 -8 -9",
        "expectedOutput": "-9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-8 -4 -3\n6 8 6\n-2 -1 6",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "m3-lu3": {
    "title": "Matrices",
    "slug": "belt-2-q3-matrices",
    "id": "M3-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n4",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 -9 6 -3 4\n1 2 -6 6 -4\n-8 9 6 -4 2\n-1 6 0 0 -4\n4 -3 -9 0 7",
        "expectedOutput": "15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n-5",
        "expectedOutput": "-5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 -1 -5 8\n-9 9 -4 0\n-8 9 0 -9\n2 5 -3 6",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0 -6 -5\n-5 4 7\n-9 2 5",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n3 -3 -4 7 -2\n-7 -3 2 -6 -8\n8 -4 7 -6 9\n4 7 -9 -1 3\n-1 4 -9 -6 -8",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-8 9 5\n4 -6 6\n9 4 -8",
        "expectedOutput": "-22",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n9 7\n-4 -9",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n9 7 1\n-6 -9 -6\n-3 -8 -9",
        "expectedOutput": "-9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-8 -4 -3\n6 8 6\n-2 -1 6",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-2-q4-indexing-and-bounds": {
    "title": "Indexing and bounds",
    "slug": "belt-2-q4-indexing-and-bounds",
    "id": "M3-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n5 8 3 1 12\n1\n1",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n16 -10 -6 -9 -14\n3\n0\n5\n0",
        "expectedOutput": "16\n-1\n16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n-1 -19 10 9 9\n3\n-5\n6\n7",
        "expectedOutput": "-1\n-1\n-1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-2 4 20 12 -12 -12\n1\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-12 8 6 -16\n6\n2\n2\n3\n-4\n2\n-2",
        "expectedOutput": "6\n6\n-16\n-1\n6\n-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n-6 14 16\n4\n-3\n-1\n3\n6",
        "expectedOutput": "-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n20\n6\n-1\n2\n-1\n1\n-1\n2",
        "expectedOutput": "-1\n-1\n-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-8 20 15 9 -15 -12\n2\n-1\n10",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n10\n2\n-1\n1",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n-15 17\n7\n2\n3\n0\n-2\n-1\n0\n1",
        "expectedOutput": "-1\n-1\n-15\n-1\n-1\n-15\n17",
        "isHidden": true
      }
    ]
  },
  "belt-2-q4-sum-of-even-numbers": {
    "title": "Indexing and bounds",
    "slug": "belt-2-q4-indexing-and-bounds",
    "id": "M3-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n5 8 3 1 12\n1\n1",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n16 -10 -6 -9 -14\n3\n0\n5\n0",
        "expectedOutput": "16\n-1\n16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n-1 -19 10 9 9\n3\n-5\n6\n7",
        "expectedOutput": "-1\n-1\n-1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-2 4 20 12 -12 -12\n1\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-12 8 6 -16\n6\n2\n2\n3\n-4\n2\n-2",
        "expectedOutput": "6\n6\n-16\n-1\n6\n-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n-6 14 16\n4\n-3\n-1\n3\n6",
        "expectedOutput": "-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n20\n6\n-1\n2\n-1\n1\n-1\n2",
        "expectedOutput": "-1\n-1\n-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-8 20 15 9 -15 -12\n2\n-1\n10",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n10\n2\n-1\n1",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n-15 17\n7\n2\n3\n0\n-2\n-1\n0\n1",
        "expectedOutput": "-1\n-1\n-15\n-1\n-1\n-15\n17",
        "isHidden": true
      }
    ]
  },
  "M3-LU4": {
    "title": "Indexing and bounds",
    "slug": "belt-2-q4-indexing-and-bounds",
    "id": "M3-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n5 8 3 1 12\n1\n1",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n16 -10 -6 -9 -14\n3\n0\n5\n0",
        "expectedOutput": "16\n-1\n16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n-1 -19 10 9 9\n3\n-5\n6\n7",
        "expectedOutput": "-1\n-1\n-1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-2 4 20 12 -12 -12\n1\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-12 8 6 -16\n6\n2\n2\n3\n-4\n2\n-2",
        "expectedOutput": "6\n6\n-16\n-1\n6\n-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n-6 14 16\n4\n-3\n-1\n3\n6",
        "expectedOutput": "-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n20\n6\n-1\n2\n-1\n1\n-1\n2",
        "expectedOutput": "-1\n-1\n-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-8 20 15 9 -15 -12\n2\n-1\n10",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n10\n2\n-1\n1",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n-15 17\n7\n2\n3\n0\n-2\n-1\n0\n1",
        "expectedOutput": "-1\n-1\n-15\n-1\n-1\n-15\n17",
        "isHidden": true
      }
    ]
  },
  "m3-lu4": {
    "title": "Indexing and bounds",
    "slug": "belt-2-q4-indexing-and-bounds",
    "id": "M3-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n5 8 3 1 12\n1\n1",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n16 -10 -6 -9 -14\n3\n0\n5\n0",
        "expectedOutput": "16\n-1\n16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n-1 -19 10 9 9\n3\n-5\n6\n7",
        "expectedOutput": "-1\n-1\n-1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-2 4 20 12 -12 -12\n1\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n-12 8 6 -16\n6\n2\n2\n3\n-4\n2\n-2",
        "expectedOutput": "6\n6\n-16\n-1\n6\n-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n-6 14 16\n4\n-3\n-1\n3\n6",
        "expectedOutput": "-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\n20\n6\n-1\n2\n-1\n1\n-1\n2",
        "expectedOutput": "-1\n-1\n-1\n-1\n-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-8 20 15 9 -15 -12\n2\n-1\n10",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n10\n2\n-1\n1",
        "expectedOutput": "-1\n-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n-15 17\n7\n2\n3\n0\n-2\n-1\n0\n1",
        "expectedOutput": "-1\n-1\n-15\n-1\n-1\n-15\n17",
        "isHidden": true
      }
    ]
  },
  "belt-2-q5-traversal": {
    "title": "Traversal",
    "slug": "belt-2-q5-traversal",
    "id": "M3-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-13 4 -15",
        "expectedOutput": "-15 4 -13",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n20 -20 8 19 8 -13 16",
        "expectedOutput": "16 -13 8 19 8 -20 20",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-18 -18 0 15 0 5 18",
        "expectedOutput": "18 5 0 15 0 -18 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-7 2 -16 -6 -8 3 19 -2",
        "expectedOutput": "-2 19 3 -8 -6 -16 2 -7",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n-13 -12 9 5 0 -4",
        "expectedOutput": "-4 0 5 9 -12 -13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0 8 -13",
        "expectedOutput": "-13 8 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n-11 16 -13 -10",
        "expectedOutput": "-10 -13 16 -11",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n8 6 3 -5 10 7 11",
        "expectedOutput": "11 7 10 -5 3 6 8",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-17 -12 -4 -13 18 5",
        "expectedOutput": "5 18 -13 -4 -12 -17",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n12 5 -20 16 20 17 10 1",
        "expectedOutput": "1 10 17 20 16 -20 5 12",
        "isHidden": true
      }
    ]
  },
  "belt-2-q5-sum-of-odd-numbers": {
    "title": "Traversal",
    "slug": "belt-2-q5-traversal",
    "id": "M3-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-13 4 -15",
        "expectedOutput": "-15 4 -13",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n20 -20 8 19 8 -13 16",
        "expectedOutput": "16 -13 8 19 8 -20 20",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-18 -18 0 15 0 5 18",
        "expectedOutput": "18 5 0 15 0 -18 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-7 2 -16 -6 -8 3 19 -2",
        "expectedOutput": "-2 19 3 -8 -6 -16 2 -7",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n-13 -12 9 5 0 -4",
        "expectedOutput": "-4 0 5 9 -12 -13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0 8 -13",
        "expectedOutput": "-13 8 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n-11 16 -13 -10",
        "expectedOutput": "-10 -13 16 -11",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n8 6 3 -5 10 7 11",
        "expectedOutput": "11 7 10 -5 3 6 8",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-17 -12 -4 -13 18 5",
        "expectedOutput": "5 18 -13 -4 -12 -17",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n12 5 -20 16 20 17 10 1",
        "expectedOutput": "1 10 17 20 16 -20 5 12",
        "isHidden": true
      }
    ]
  },
  "M3-LU5": {
    "title": "Traversal",
    "slug": "belt-2-q5-traversal",
    "id": "M3-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-13 4 -15",
        "expectedOutput": "-15 4 -13",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n20 -20 8 19 8 -13 16",
        "expectedOutput": "16 -13 8 19 8 -20 20",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-18 -18 0 15 0 5 18",
        "expectedOutput": "18 5 0 15 0 -18 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-7 2 -16 -6 -8 3 19 -2",
        "expectedOutput": "-2 19 3 -8 -6 -16 2 -7",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n-13 -12 9 5 0 -4",
        "expectedOutput": "-4 0 5 9 -12 -13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0 8 -13",
        "expectedOutput": "-13 8 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n-11 16 -13 -10",
        "expectedOutput": "-10 -13 16 -11",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n8 6 3 -5 10 7 11",
        "expectedOutput": "11 7 10 -5 3 6 8",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-17 -12 -4 -13 18 5",
        "expectedOutput": "5 18 -13 -4 -12 -17",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n12 5 -20 16 20 17 10 1",
        "expectedOutput": "1 10 17 20 16 -20 5 12",
        "isHidden": true
      }
    ]
  },
  "m3-lu5": {
    "title": "Traversal",
    "slug": "belt-2-q5-traversal",
    "id": "M3-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-13 4 -15",
        "expectedOutput": "-15 4 -13",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n20 -20 8 19 8 -13 16",
        "expectedOutput": "16 -13 8 19 8 -20 20",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n-18 -18 0 15 0 5 18",
        "expectedOutput": "18 5 0 15 0 -18 -18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-7 2 -16 -6 -8 3 19 -2",
        "expectedOutput": "-2 19 3 -8 -6 -16 2 -7",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n-13 -12 9 5 0 -4",
        "expectedOutput": "-4 0 5 9 -12 -13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0 8 -13",
        "expectedOutput": "-13 8 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n-11 16 -13 -10",
        "expectedOutput": "-10 -13 16 -11",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n8 6 3 -5 10 7 11",
        "expectedOutput": "11 7 10 -5 3 6 8",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-17 -12 -4 -13 18 5",
        "expectedOutput": "5 18 -13 -4 -12 -17",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n12 5 -20 16 20 17 10 1",
        "expectedOutput": "1 10 17 20 16 -20 5 12",
        "isHidden": true
      }
    ]
  },
  "belt-2-q6-simple-transformations": {
    "title": "Simple transformations",
    "slug": "belt-2-q6-simple-transformations",
    "id": "M3-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-5 13 -1 18 -11 7 9 -13",
        "expectedOutput": "0 13 0 18 0 7 9 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n10 -2 -18",
        "expectedOutput": "10 0 0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n18 13 8",
        "expectedOutput": "18 13 8",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-10 13",
        "expectedOutput": "0 13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n10 -14 -20 16 -7 10 7 18",
        "expectedOutput": "10 0 0 16 0 10 7 18",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n-12 20 -9 -1 -9 0",
        "expectedOutput": "0 20 0 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-9 -9 -8 13",
        "expectedOutput": "0 0 0 13",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n16 18",
        "expectedOutput": "16 18",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-16 -10 14",
        "expectedOutput": "0 0 14",
        "isHidden": true
      }
    ]
  },
  "belt-2-q6-multiplication-table": {
    "title": "Simple transformations",
    "slug": "belt-2-q6-simple-transformations",
    "id": "M3-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-5 13 -1 18 -11 7 9 -13",
        "expectedOutput": "0 13 0 18 0 7 9 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n10 -2 -18",
        "expectedOutput": "10 0 0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n18 13 8",
        "expectedOutput": "18 13 8",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-10 13",
        "expectedOutput": "0 13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n10 -14 -20 16 -7 10 7 18",
        "expectedOutput": "10 0 0 16 0 10 7 18",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n-12 20 -9 -1 -9 0",
        "expectedOutput": "0 20 0 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-9 -9 -8 13",
        "expectedOutput": "0 0 0 13",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n16 18",
        "expectedOutput": "16 18",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-16 -10 14",
        "expectedOutput": "0 0 14",
        "isHidden": true
      }
    ]
  },
  "M3-LU6": {
    "title": "Simple transformations",
    "slug": "belt-2-q6-simple-transformations",
    "id": "M3-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-5 13 -1 18 -11 7 9 -13",
        "expectedOutput": "0 13 0 18 0 7 9 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n10 -2 -18",
        "expectedOutput": "10 0 0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n18 13 8",
        "expectedOutput": "18 13 8",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-10 13",
        "expectedOutput": "0 13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n10 -14 -20 16 -7 10 7 18",
        "expectedOutput": "10 0 0 16 0 10 7 18",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n-12 20 -9 -1 -9 0",
        "expectedOutput": "0 20 0 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-9 -9 -8 13",
        "expectedOutput": "0 0 0 13",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n16 18",
        "expectedOutput": "16 18",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-16 -10 14",
        "expectedOutput": "0 0 14",
        "isHidden": true
      }
    ]
  },
  "m3-lu6": {
    "title": "Simple transformations",
    "slug": "belt-2-q6-simple-transformations",
    "id": "M3-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n-5 13 -1 18 -11 7 9 -13",
        "expectedOutput": "0 13 0 18 0 7 9 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n10 -2 -18",
        "expectedOutput": "10 0 0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n18 13 8",
        "expectedOutput": "18 13 8",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n6",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-10 13",
        "expectedOutput": "0 13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n10 -14 -20 16 -7 10 7 18",
        "expectedOutput": "10 0 0 16 0 10 7 18",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n-12 20 -9 -1 -9 0",
        "expectedOutput": "0 20 0 0 0 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-9 -9 -8 13",
        "expectedOutput": "0 0 0 13",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n16 18",
        "expectedOutput": "16 18",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n-16 -10 14",
        "expectedOutput": "0 0 14",
        "isHidden": true
      }
    ]
  },
  "belt-2-q7-basic-string-operations": {
    "title": "Basic string operations",
    "slug": "belt-2-q7-basic-string-operations",
    "id": "M3-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "bdbfdac\n29",
        "expectedOutput": "dbfdacb",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "f\n15",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b\n19",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caaaacacdb\n14",
        "expectedOutput": "acacdbcaaa",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "cdc\n4",
        "expectedOutput": "dcc",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "eecefccdfe\n17",
        "expectedOutput": "dfeeecefcc",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "faebaef\n10",
        "expectedOutput": "baeffae",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "ae\n5",
        "expectedOutput": "ea",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "bbbacbadac\n14",
        "expectedOutput": "cbadacbbba",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "ccbcdb\n13",
        "expectedOutput": "cbcdbc",
        "isHidden": true
      }
    ]
  },
  "belt-2-q7-count-digits": {
    "title": "Basic string operations",
    "slug": "belt-2-q7-basic-string-operations",
    "id": "M3-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "bdbfdac\n29",
        "expectedOutput": "dbfdacb",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "f\n15",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b\n19",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caaaacacdb\n14",
        "expectedOutput": "acacdbcaaa",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "cdc\n4",
        "expectedOutput": "dcc",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "eecefccdfe\n17",
        "expectedOutput": "dfeeecefcc",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "faebaef\n10",
        "expectedOutput": "baeffae",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "ae\n5",
        "expectedOutput": "ea",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "bbbacbadac\n14",
        "expectedOutput": "cbadacbbba",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "ccbcdb\n13",
        "expectedOutput": "cbcdbc",
        "isHidden": true
      }
    ]
  },
  "M3-LU7": {
    "title": "Basic string operations",
    "slug": "belt-2-q7-basic-string-operations",
    "id": "M3-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "bdbfdac\n29",
        "expectedOutput": "dbfdacb",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "f\n15",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b\n19",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caaaacacdb\n14",
        "expectedOutput": "acacdbcaaa",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "cdc\n4",
        "expectedOutput": "dcc",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "eecefccdfe\n17",
        "expectedOutput": "dfeeecefcc",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "faebaef\n10",
        "expectedOutput": "baeffae",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "ae\n5",
        "expectedOutput": "ea",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "bbbacbadac\n14",
        "expectedOutput": "cbadacbbba",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "ccbcdb\n13",
        "expectedOutput": "cbcdbc",
        "isHidden": true
      }
    ]
  },
  "m3-lu7": {
    "title": "Basic string operations",
    "slug": "belt-2-q7-basic-string-operations",
    "id": "M3-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "bdbfdac\n29",
        "expectedOutput": "dbfdacb",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "f\n15",
        "expectedOutput": "f",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b\n19",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caaaacacdb\n14",
        "expectedOutput": "acacdbcaaa",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "cdc\n4",
        "expectedOutput": "dcc",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "eecefccdfe\n17",
        "expectedOutput": "dfeeecefcc",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "faebaef\n10",
        "expectedOutput": "baeffae",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "ae\n5",
        "expectedOutput": "ea",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "bbbacbadac\n14",
        "expectedOutput": "cbadacbbba",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "ccbcdb\n13",
        "expectedOutput": "cbcdbc",
        "isHidden": true
      }
    ]
  },
  "belt-2-q8-frequency-counting": {
    "title": "Frequency counting",
    "slug": "belt-2-q8-frequency-counting",
    "id": "M3-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n-2",
        "expectedOutput": "-2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n-3 1 -1 2 3 -3 2 2 -2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 -3",
        "expectedOutput": "-3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2 4 1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-1 4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0 -3 -2 -2 1 0 2 1",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n0 2 5 -3 -2 -2 -2",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n5 1 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q8-sum-of-digits": {
    "title": "Frequency counting",
    "slug": "belt-2-q8-frequency-counting",
    "id": "M3-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n-2",
        "expectedOutput": "-2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n-3 1 -1 2 3 -3 2 2 -2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 -3",
        "expectedOutput": "-3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2 4 1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-1 4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0 -3 -2 -2 1 0 2 1",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n0 2 5 -3 -2 -2 -2",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n5 1 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "M3-LU8": {
    "title": "Frequency counting",
    "slug": "belt-2-q8-frequency-counting",
    "id": "M3-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n-2",
        "expectedOutput": "-2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n-3 1 -1 2 3 -3 2 2 -2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 -3",
        "expectedOutput": "-3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2 4 1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-1 4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0 -3 -2 -2 1 0 2 1",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n0 2 5 -3 -2 -2 -2",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n5 1 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "m3-lu8": {
    "title": "Frequency counting",
    "slug": "belt-2-q8-frequency-counting",
    "id": "M3-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n-2",
        "expectedOutput": "-2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n-3 1 -1 2 3 -3 2 2 -2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 -3",
        "expectedOutput": "-3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2 4 1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n-1 4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0 -3 -2 -2 1 0 2 1",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n0 2 5 -3 -2 -2 -2",
        "expectedOutput": "-2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n5 1 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q9-why-nested-loops-are-slow": {
    "title": "Why nested loops are slow",
    "slug": "belt-2-q9-why-nested-loops-are-slow",
    "id": "M3-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n0 0 0 2 4 3 2",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n3 2 0 1 1 1 2 1 4",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n2 2 3 4 1 4 0",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n0 2 3 3 1 1 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n2",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n2 2 0 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 4 1 0 0 0 1 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n0 0 2 2 0 2 1",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 3 1 4 1 1 1 4 0 2",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 0 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q9-reverse-a-number": {
    "title": "Why nested loops are slow",
    "slug": "belt-2-q9-why-nested-loops-are-slow",
    "id": "M3-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n0 0 0 2 4 3 2",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n3 2 0 1 1 1 2 1 4",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n2 2 3 4 1 4 0",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n0 2 3 3 1 1 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n2",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n2 2 0 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 4 1 0 0 0 1 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n0 0 2 2 0 2 1",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 3 1 4 1 1 1 4 0 2",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 0 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "M3-LU9": {
    "title": "Why nested loops are slow",
    "slug": "belt-2-q9-why-nested-loops-are-slow",
    "id": "M3-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n0 0 0 2 4 3 2",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n3 2 0 1 1 1 2 1 4",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n2 2 3 4 1 4 0",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n0 2 3 3 1 1 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n2",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n2 2 0 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 4 1 0 0 0 1 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n0 0 2 2 0 2 1",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 3 1 4 1 1 1 4 0 2",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 0 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "m3-lu9": {
    "title": "Why nested loops are slow",
    "slug": "belt-2-q9-why-nested-loops-are-slow",
    "id": "M3-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n0 0 0 2 4 3 2",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "9\n3 2 0 1 1 1 2 1 4",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n2 2 3 4 1 4 0",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n0 2 3 3 1 1 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n2",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n2 2 0 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n2 4 1 0 0 0 1 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n0 0 2 2 0 2 1",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 3 1 4 1 1 1 4 0 2",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 0 2",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q10-growth-rates": {
    "title": "Growth rates",
    "slug": "belt-2-q10-growth-rates",
    "id": "M3-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "44",
        "expectedOutput": "44 1936 88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "92",
        "expectedOutput": "92 8464 184",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "81",
        "expectedOutput": "81 6561 162",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "53",
        "expectedOutput": "53 2809 106",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5",
        "expectedOutput": "5 25 10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "58",
        "expectedOutput": "58 3364 116",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "79",
        "expectedOutput": "79 6241 158",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "62",
        "expectedOutput": "62 3844 124",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "99",
        "expectedOutput": "99 9801 198",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "80",
        "expectedOutput": "80 6400 160",
        "isHidden": true
      }
    ]
  },
  "belt-2-q10-count-even-digits": {
    "title": "Growth rates",
    "slug": "belt-2-q10-growth-rates",
    "id": "M3-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "44",
        "expectedOutput": "44 1936 88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "92",
        "expectedOutput": "92 8464 184",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "81",
        "expectedOutput": "81 6561 162",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "53",
        "expectedOutput": "53 2809 106",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5",
        "expectedOutput": "5 25 10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "58",
        "expectedOutput": "58 3364 116",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "79",
        "expectedOutput": "79 6241 158",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "62",
        "expectedOutput": "62 3844 124",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "99",
        "expectedOutput": "99 9801 198",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "80",
        "expectedOutput": "80 6400 160",
        "isHidden": true
      }
    ]
  },
  "M3-LU10": {
    "title": "Growth rates",
    "slug": "belt-2-q10-growth-rates",
    "id": "M3-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "44",
        "expectedOutput": "44 1936 88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "92",
        "expectedOutput": "92 8464 184",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "81",
        "expectedOutput": "81 6561 162",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "53",
        "expectedOutput": "53 2809 106",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5",
        "expectedOutput": "5 25 10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "58",
        "expectedOutput": "58 3364 116",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "79",
        "expectedOutput": "79 6241 158",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "62",
        "expectedOutput": "62 3844 124",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "99",
        "expectedOutput": "99 9801 198",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "80",
        "expectedOutput": "80 6400 160",
        "isHidden": true
      }
    ]
  },
  "m3-lu10": {
    "title": "Growth rates",
    "slug": "belt-2-q10-growth-rates",
    "id": "M3-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "44",
        "expectedOutput": "44 1936 88",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "92",
        "expectedOutput": "92 8464 184",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "81",
        "expectedOutput": "81 6561 162",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "53",
        "expectedOutput": "53 2809 106",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5",
        "expectedOutput": "5 25 10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "58",
        "expectedOutput": "58 3364 116",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "79",
        "expectedOutput": "79 6241 158",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "62",
        "expectedOutput": "62 3844 124",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "99",
        "expectedOutput": "99 9801 198",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "80",
        "expectedOutput": "80 6400 160",
        "isHidden": true
      }
    ]
  },
  "belt-2-q11-subarrays": {
    "title": "Subarrays",
    "slug": "belt-2-q11-subarrays",
    "id": "M4-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n7",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6 -3 9",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n10 0 8 -6 -8 8 -2 7 -9 -10",
        "expectedOutput": "18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "10\n-7 0 0 1 -8 -7 -6 -6 7 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n10 10 5 6",
        "expectedOutput": "31",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n0 0 -2 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n3 2 -5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n-7 -1 -10",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n7 3 -5 5",
        "expectedOutput": "10",
        "isHidden": true
      }
    ]
  },
  "belt-2-q11-count-odd-digits": {
    "title": "Subarrays",
    "slug": "belt-2-q11-subarrays",
    "id": "M4-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n7",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6 -3 9",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n10 0 8 -6 -8 8 -2 7 -9 -10",
        "expectedOutput": "18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "10\n-7 0 0 1 -8 -7 -6 -6 7 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n10 10 5 6",
        "expectedOutput": "31",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n0 0 -2 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n3 2 -5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n-7 -1 -10",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n7 3 -5 5",
        "expectedOutput": "10",
        "isHidden": true
      }
    ]
  },
  "M4-LU1": {
    "title": "Subarrays",
    "slug": "belt-2-q11-subarrays",
    "id": "M4-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n7",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6 -3 9",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n10 0 8 -6 -8 8 -2 7 -9 -10",
        "expectedOutput": "18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "10\n-7 0 0 1 -8 -7 -6 -6 7 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n10 10 5 6",
        "expectedOutput": "31",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n0 0 -2 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n3 2 -5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n-7 -1 -10",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n7 3 -5 5",
        "expectedOutput": "10",
        "isHidden": true
      }
    ]
  },
  "m4-lu1": {
    "title": "Subarrays",
    "slug": "belt-2-q11-subarrays",
    "id": "M4-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n7",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6 -3 9",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n10 0 8 -6 -8 8 -2 7 -9 -10",
        "expectedOutput": "18",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "10\n-7 0 0 1 -8 -7 -6 -6 7 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n10 10 5 6",
        "expectedOutput": "31",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n0 0 -2 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n3 2 -5",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\n-7 -1 -10",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n7 3 -5 5",
        "expectedOutput": "10",
        "isHidden": true
      }
    ]
  },
  "belt-2-q12-prefix-and-suffix-sums": {
    "title": "Prefix and suffix sums",
    "slug": "belt-2-q12-prefix-and-suffix-sums",
    "id": "M4-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n3 4 -8 -8 2",
        "expectedOutput": "-4 -3 -15 -15 -5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-3 8 2 3 -8 5",
        "expectedOutput": "4 15 9 10 -1 12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n1 -9 3 0 9 -5 -8",
        "expectedOutput": "-8 -18 -6 -9 0 -14 -17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-8 3 -1 -5 -6 -6",
        "expectedOutput": "-31 -20 -24 -28 -29 -29",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-3 5 -9 -9 -3 3 8",
        "expectedOutput": "-11 -3 -17 -17 -11 -5 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3 4",
        "expectedOutput": "10 11",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n5 8",
        "expectedOutput": "18 21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n-6 3",
        "expectedOutput": "-9 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n4 -6 3 5",
        "expectedOutput": "10 0 9 11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 -5 5 -7 -4 -2",
        "expectedOutput": "-15 -19 -9 -21 -18 -16",
        "isHidden": true
      }
    ]
  },
  "belt-2-q12-find-the-largest-digit": {
    "title": "Prefix and suffix sums",
    "slug": "belt-2-q12-prefix-and-suffix-sums",
    "id": "M4-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n3 4 -8 -8 2",
        "expectedOutput": "-4 -3 -15 -15 -5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-3 8 2 3 -8 5",
        "expectedOutput": "4 15 9 10 -1 12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n1 -9 3 0 9 -5 -8",
        "expectedOutput": "-8 -18 -6 -9 0 -14 -17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-8 3 -1 -5 -6 -6",
        "expectedOutput": "-31 -20 -24 -28 -29 -29",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-3 5 -9 -9 -3 3 8",
        "expectedOutput": "-11 -3 -17 -17 -11 -5 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3 4",
        "expectedOutput": "10 11",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n5 8",
        "expectedOutput": "18 21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n-6 3",
        "expectedOutput": "-9 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n4 -6 3 5",
        "expectedOutput": "10 0 9 11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 -5 5 -7 -4 -2",
        "expectedOutput": "-15 -19 -9 -21 -18 -16",
        "isHidden": true
      }
    ]
  },
  "M4-LU2": {
    "title": "Prefix and suffix sums",
    "slug": "belt-2-q12-prefix-and-suffix-sums",
    "id": "M4-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n3 4 -8 -8 2",
        "expectedOutput": "-4 -3 -15 -15 -5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-3 8 2 3 -8 5",
        "expectedOutput": "4 15 9 10 -1 12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n1 -9 3 0 9 -5 -8",
        "expectedOutput": "-8 -18 -6 -9 0 -14 -17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-8 3 -1 -5 -6 -6",
        "expectedOutput": "-31 -20 -24 -28 -29 -29",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-3 5 -9 -9 -3 3 8",
        "expectedOutput": "-11 -3 -17 -17 -11 -5 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3 4",
        "expectedOutput": "10 11",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n5 8",
        "expectedOutput": "18 21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n-6 3",
        "expectedOutput": "-9 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n4 -6 3 5",
        "expectedOutput": "10 0 9 11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 -5 5 -7 -4 -2",
        "expectedOutput": "-15 -19 -9 -21 -18 -16",
        "isHidden": true
      }
    ]
  },
  "m4-lu2": {
    "title": "Prefix and suffix sums",
    "slug": "belt-2-q12-prefix-and-suffix-sums",
    "id": "M4-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n3 4 -8 -8 2",
        "expectedOutput": "-4 -3 -15 -15 -5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-3 8 2 3 -8 5",
        "expectedOutput": "4 15 9 10 -1 12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n1 -9 3 0 9 -5 -8",
        "expectedOutput": "-8 -18 -6 -9 0 -14 -17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n-8 3 -1 -5 -6 -6",
        "expectedOutput": "-31 -20 -24 -28 -29 -29",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-3 5 -9 -9 -3 3 8",
        "expectedOutput": "-11 -3 -17 -17 -11 -5 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n3 4",
        "expectedOutput": "10 11",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n5 8",
        "expectedOutput": "18 21",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n-6 3",
        "expectedOutput": "-9 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n4 -6 3 5",
        "expectedOutput": "10 0 9 11",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 -5 5 -7 -4 -2",
        "expectedOutput": "-15 -19 -9 -21 -18 -16",
        "isHidden": true
      }
    ]
  },
  "belt-2-q13-hashing": {
    "title": "Hashing",
    "slug": "belt-2-q13-hashing",
    "id": "M4-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n-10\n5 0 -10 7 -10 -7 -6 4 -3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-4\n-9 -5 5 -9 -5 5 10",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1\n-7 10 4 -10 7",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-10\n-3 10 7 5 -2 6 0 -10",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-7\n-5 -9 -9 7 -8 10 -1",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n-2 3 10 0",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n-3\n-6 0 -8 -10 -1 0 7 6",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n6 7 10 -9",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-8\n-5 -5 -9 -2 -4 -2",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n6\n-2 -6 7 6 9",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "belt-2-q13-find-the-smallest-digit": {
    "title": "Hashing",
    "slug": "belt-2-q13-hashing",
    "id": "M4-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n-10\n5 0 -10 7 -10 -7 -6 4 -3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-4\n-9 -5 5 -9 -5 5 10",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1\n-7 10 4 -10 7",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-10\n-3 10 7 5 -2 6 0 -10",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-7\n-5 -9 -9 7 -8 10 -1",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n-2 3 10 0",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n-3\n-6 0 -8 -10 -1 0 7 6",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n6 7 10 -9",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-8\n-5 -5 -9 -2 -4 -2",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n6\n-2 -6 7 6 9",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "M4-LU3": {
    "title": "Hashing",
    "slug": "belt-2-q13-hashing",
    "id": "M4-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n-10\n5 0 -10 7 -10 -7 -6 4 -3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-4\n-9 -5 5 -9 -5 5 10",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1\n-7 10 4 -10 7",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-10\n-3 10 7 5 -2 6 0 -10",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-7\n-5 -9 -9 7 -8 10 -1",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n-2 3 10 0",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n-3\n-6 0 -8 -10 -1 0 7 6",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n6 7 10 -9",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-8\n-5 -5 -9 -2 -4 -2",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n6\n-2 -6 7 6 9",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "m4-lu3": {
    "title": "Hashing",
    "slug": "belt-2-q13-hashing",
    "id": "M4-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n-10\n5 0 -10 7 -10 -7 -6 4 -3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-4\n-9 -5 5 -9 -5 5 10",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1\n-7 10 4 -10 7",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n-10\n-3 10 7 5 -2 6 0 -10",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n-7\n-5 -9 -9 7 -8 10 -1",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n-2 3 10 0",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n-3\n-6 0 -8 -10 -1 0 7 6",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n6 7 10 -9",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n-8\n-5 -5 -9 -2 -4 -2",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n6\n-2 -6 7 6 9",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "belt-2-q14-kadane-s-algorithm": {
    "title": "Kadane's algorithm",
    "slug": "belt-2-q14-kadane-s-algorithm",
    "id": "M4-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1 0 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-9 -8 5",
        "expectedOutput": "5 2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n-6 9 -10 5",
        "expectedOutput": "9 1 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 -3 8 -2 1 7 6 -5 5",
        "expectedOutput": "20 2 6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n-4 8 1",
        "expectedOutput": "9 1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 3",
        "expectedOutput": "3 0 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-3 7 -9",
        "expectedOutput": "7 1 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n6",
        "expectedOutput": "6 0 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n8 -9 6 3 9 -2 9 -5",
        "expectedOutput": "25 2 6",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "9\n-6 -7 4 7 7 2 1 2 -4",
        "expectedOutput": "23 2 7",
        "isHidden": true
      }
    ]
  },
  "belt-2-q14-check-palindrome-number": {
    "title": "Kadane's algorithm",
    "slug": "belt-2-q14-kadane-s-algorithm",
    "id": "M4-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1 0 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-9 -8 5",
        "expectedOutput": "5 2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n-6 9 -10 5",
        "expectedOutput": "9 1 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 -3 8 -2 1 7 6 -5 5",
        "expectedOutput": "20 2 6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n-4 8 1",
        "expectedOutput": "9 1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 3",
        "expectedOutput": "3 0 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-3 7 -9",
        "expectedOutput": "7 1 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n6",
        "expectedOutput": "6 0 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n8 -9 6 3 9 -2 9 -5",
        "expectedOutput": "25 2 6",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "9\n-6 -7 4 7 7 2 1 2 -4",
        "expectedOutput": "23 2 7",
        "isHidden": true
      }
    ]
  },
  "M4-LU4": {
    "title": "Kadane's algorithm",
    "slug": "belt-2-q14-kadane-s-algorithm",
    "id": "M4-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1 0 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-9 -8 5",
        "expectedOutput": "5 2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n-6 9 -10 5",
        "expectedOutput": "9 1 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 -3 8 -2 1 7 6 -5 5",
        "expectedOutput": "20 2 6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n-4 8 1",
        "expectedOutput": "9 1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 3",
        "expectedOutput": "3 0 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-3 7 -9",
        "expectedOutput": "7 1 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n6",
        "expectedOutput": "6 0 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n8 -9 6 3 9 -2 9 -5",
        "expectedOutput": "25 2 6",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "9\n-6 -7 4 7 7 2 1 2 -4",
        "expectedOutput": "23 2 7",
        "isHidden": true
      }
    ]
  },
  "m4-lu4": {
    "title": "Kadane's algorithm",
    "slug": "belt-2-q14-kadane-s-algorithm",
    "id": "M4-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1 0 0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-9 -8 5",
        "expectedOutput": "5 2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n-6 9 -10 5",
        "expectedOutput": "9 1 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 -3 8 -2 1 7 6 -5 5",
        "expectedOutput": "20 2 6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n-4 8 1",
        "expectedOutput": "9 1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 3",
        "expectedOutput": "3 0 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n-3 7 -9",
        "expectedOutput": "7 1 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "1\n6",
        "expectedOutput": "6 0 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n8 -9 6 3 9 -2 9 -5",
        "expectedOutput": "25 2 6",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "9\n-6 -7 4 7 7 2 1 2 -4",
        "expectedOutput": "23 2 7",
        "isHidden": true
      }
    ]
  },
  "belt-2-q15-dutch-national-flag": {
    "title": "Dutch National Flag",
    "slug": "belt-2-q15-dutch-national-flag",
    "id": "M4-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "12\n2 1 2 0 1 2 1 0 2 2 2 2",
        "expectedOutput": "0 0 1 1 1 2 2 2 2 2 2 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 0 0 0 2",
        "expectedOutput": "0 0 0 0 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 1 2",
        "expectedOutput": "1 1 2 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n0 0 2",
        "expectedOutput": "0 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12\n1 0 1 0 2 1 1 1 1 0 1 0",
        "expectedOutput": "0 0 0 0 1 1 1 1 1 1 1 2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2 2",
        "expectedOutput": "2 2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n0 2 2 0 2 2 2 0 2",
        "expectedOutput": "0 0 0 2 2 2 2 2 2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n2 2 1 0",
        "expectedOutput": "0 1 2 2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12\n1 1 0 2 2 1 2 2 1 1 1 2",
        "expectedOutput": "0 1 1 1 1 1 1 2 2 2 2 2",
        "isHidden": true
      }
    ]
  },
  "belt-2-q15-calculate-factorial": {
    "title": "Dutch National Flag",
    "slug": "belt-2-q15-dutch-national-flag",
    "id": "M4-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "12\n2 1 2 0 1 2 1 0 2 2 2 2",
        "expectedOutput": "0 0 1 1 1 2 2 2 2 2 2 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 0 0 0 2",
        "expectedOutput": "0 0 0 0 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 1 2",
        "expectedOutput": "1 1 2 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n0 0 2",
        "expectedOutput": "0 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12\n1 0 1 0 2 1 1 1 1 0 1 0",
        "expectedOutput": "0 0 0 0 1 1 1 1 1 1 1 2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2 2",
        "expectedOutput": "2 2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n0 2 2 0 2 2 2 0 2",
        "expectedOutput": "0 0 0 2 2 2 2 2 2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n2 2 1 0",
        "expectedOutput": "0 1 2 2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12\n1 1 0 2 2 1 2 2 1 1 1 2",
        "expectedOutput": "0 1 1 1 1 1 1 2 2 2 2 2",
        "isHidden": true
      }
    ]
  },
  "M4-LU5": {
    "title": "Dutch National Flag",
    "slug": "belt-2-q15-dutch-national-flag",
    "id": "M4-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "12\n2 1 2 0 1 2 1 0 2 2 2 2",
        "expectedOutput": "0 0 1 1 1 2 2 2 2 2 2 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 0 0 0 2",
        "expectedOutput": "0 0 0 0 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 1 2",
        "expectedOutput": "1 1 2 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n0 0 2",
        "expectedOutput": "0 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12\n1 0 1 0 2 1 1 1 1 0 1 0",
        "expectedOutput": "0 0 0 0 1 1 1 1 1 1 1 2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2 2",
        "expectedOutput": "2 2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n0 2 2 0 2 2 2 0 2",
        "expectedOutput": "0 0 0 2 2 2 2 2 2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n2 2 1 0",
        "expectedOutput": "0 1 2 2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12\n1 1 0 2 2 1 2 2 1 1 1 2",
        "expectedOutput": "0 1 1 1 1 1 1 2 2 2 2 2",
        "isHidden": true
      }
    ]
  },
  "m4-lu5": {
    "title": "Dutch National Flag",
    "slug": "belt-2-q15-dutch-national-flag",
    "id": "M4-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "12\n2 1 2 0 1 2 1 0 2 2 2 2",
        "expectedOutput": "0 0 1 1 1 2 2 2 2 2 2 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n0 0 0 0 2",
        "expectedOutput": "0 0 0 0 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 1 2",
        "expectedOutput": "1 1 2 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n0 0 2",
        "expectedOutput": "0 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "12\n1 0 1 0 2 1 1 1 1 0 1 0",
        "expectedOutput": "0 0 0 0 1 1 1 1 1 1 1 2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2 2",
        "expectedOutput": "2 2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n0 2 2 0 2 2 2 0 2",
        "expectedOutput": "0 0 0 2 2 2 2 2 2",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n2 2 1 0",
        "expectedOutput": "0 1 2 2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "12\n1 1 0 2 2 1 2 2 1 1 1 2",
        "expectedOutput": "0 1 1 1 1 1 1 2 2 2 2 2",
        "isHidden": true
      }
    ]
  },
  "belt-2-q16-moore-s-voting": {
    "title": "Moore's voting",
    "slug": "belt-2-q16-moore-s-voting",
    "id": "M4-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n2 2 1 2 2 2 2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n2 1 1 2 2 3 3 1",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n2 1 3 3 1 2",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n2 3 2 1 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2 2 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n2 3 3 1 3 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n1 2 3 1 2 1 1 3",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 1 3 1 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n3 2 1 3 2",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 2 2 3 3 3",
        "expectedOutput": "NONE",
        "isHidden": true
      }
    ]
  },
  "belt-2-q16-count-multiples": {
    "title": "Moore's voting",
    "slug": "belt-2-q16-moore-s-voting",
    "id": "M4-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n2 2 1 2 2 2 2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n2 1 1 2 2 3 3 1",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n2 1 3 3 1 2",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n2 3 2 1 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2 2 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n2 3 3 1 3 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n1 2 3 1 2 1 1 3",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 1 3 1 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n3 2 1 3 2",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 2 2 3 3 3",
        "expectedOutput": "NONE",
        "isHidden": true
      }
    ]
  },
  "M4-LU6": {
    "title": "Moore's voting",
    "slug": "belt-2-q16-moore-s-voting",
    "id": "M4-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n2 2 1 2 2 2 2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n2 1 1 2 2 3 3 1",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n2 1 3 3 1 2",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n2 3 2 1 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2 2 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n2 3 3 1 3 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n1 2 3 1 2 1 1 3",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 1 3 1 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n3 2 1 3 2",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 2 2 3 3 3",
        "expectedOutput": "NONE",
        "isHidden": true
      }
    ]
  },
  "m4-lu6": {
    "title": "Moore's voting",
    "slug": "belt-2-q16-moore-s-voting",
    "id": "M4-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\n2 2 1 2 2 2 2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n2 1 1 2 2 3 3 1",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n2 1 3 3 1 2",
        "expectedOutput": "NONE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n2 3 2 1 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2 2 3 1 1",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n2 3 3 1 3 3",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n1 2 3 1 2 1 1 3",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 1 3 1 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n3 2 1 3 2",
        "expectedOutput": "NONE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 2 2 3 3 3",
        "expectedOutput": "NONE",
        "isHidden": true
      }
    ]
  },
  "belt-2-q17-sorting-algorithms": {
    "title": "Sorting algorithms",
    "slug": "belt-2-q17-sorting-algorithms",
    "id": "M4-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\nB0|11\nB1|12\nB2|15\nD3|13\nB4|6\nB5|18\nA6|6",
        "expectedOutput": "B4|6\nA6|6\nB0|11\nB1|12\nD3|13\nB2|15\nB5|18",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\nC0|15",
        "expectedOutput": "C0|15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nA0|10\nC1|11\nD2|4\nD3|7\nB4|9",
        "expectedOutput": "D2|4\nD3|7\nB4|9\nA0|10\nC1|11",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nB0|5",
        "expectedOutput": "B0|5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nD0|4\nC1|14\nA2|9\nC3|20\nC4|17\nA5|18\nB6|8",
        "expectedOutput": "D0|4\nB6|8\nA2|9\nC1|14\nC4|17\nA5|18\nC3|20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\nC0|18\nC1|4\nA2|20",
        "expectedOutput": "C1|4\nC0|18\nA2|20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\nD0|18\nC1|5\nB2|8\nB3|19\nA4|2\nD5|9\nD6|14",
        "expectedOutput": "A4|2\nC1|5\nB2|8\nD5|9\nD6|14\nD0|18\nB3|19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nB0|14\nB1|6\nC2|17\nD3|11",
        "expectedOutput": "B1|6\nD3|11\nB0|14\nC2|17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\nB0|3\nA1|15\nA2|10",
        "expectedOutput": "B0|3\nA2|10\nA1|15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\nB0|2\nA1|18\nA2|11\nB3|20",
        "expectedOutput": "B0|2\nA2|11\nA1|18\nB3|20",
        "isHidden": true
      }
    ]
  },
  "belt-2-q17-print-multiples": {
    "title": "Sorting algorithms",
    "slug": "belt-2-q17-sorting-algorithms",
    "id": "M4-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\nB0|11\nB1|12\nB2|15\nD3|13\nB4|6\nB5|18\nA6|6",
        "expectedOutput": "B4|6\nA6|6\nB0|11\nB1|12\nD3|13\nB2|15\nB5|18",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\nC0|15",
        "expectedOutput": "C0|15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nA0|10\nC1|11\nD2|4\nD3|7\nB4|9",
        "expectedOutput": "D2|4\nD3|7\nB4|9\nA0|10\nC1|11",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nB0|5",
        "expectedOutput": "B0|5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nD0|4\nC1|14\nA2|9\nC3|20\nC4|17\nA5|18\nB6|8",
        "expectedOutput": "D0|4\nB6|8\nA2|9\nC1|14\nC4|17\nA5|18\nC3|20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\nC0|18\nC1|4\nA2|20",
        "expectedOutput": "C1|4\nC0|18\nA2|20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\nD0|18\nC1|5\nB2|8\nB3|19\nA4|2\nD5|9\nD6|14",
        "expectedOutput": "A4|2\nC1|5\nB2|8\nD5|9\nD6|14\nD0|18\nB3|19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nB0|14\nB1|6\nC2|17\nD3|11",
        "expectedOutput": "B1|6\nD3|11\nB0|14\nC2|17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\nB0|3\nA1|15\nA2|10",
        "expectedOutput": "B0|3\nA2|10\nA1|15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\nB0|2\nA1|18\nA2|11\nB3|20",
        "expectedOutput": "B0|2\nA2|11\nA1|18\nB3|20",
        "isHidden": true
      }
    ]
  },
  "M4-LU7": {
    "title": "Sorting algorithms",
    "slug": "belt-2-q17-sorting-algorithms",
    "id": "M4-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\nB0|11\nB1|12\nB2|15\nD3|13\nB4|6\nB5|18\nA6|6",
        "expectedOutput": "B4|6\nA6|6\nB0|11\nB1|12\nD3|13\nB2|15\nB5|18",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\nC0|15",
        "expectedOutput": "C0|15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nA0|10\nC1|11\nD2|4\nD3|7\nB4|9",
        "expectedOutput": "D2|4\nD3|7\nB4|9\nA0|10\nC1|11",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nB0|5",
        "expectedOutput": "B0|5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nD0|4\nC1|14\nA2|9\nC3|20\nC4|17\nA5|18\nB6|8",
        "expectedOutput": "D0|4\nB6|8\nA2|9\nC1|14\nC4|17\nA5|18\nC3|20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\nC0|18\nC1|4\nA2|20",
        "expectedOutput": "C1|4\nC0|18\nA2|20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\nD0|18\nC1|5\nB2|8\nB3|19\nA4|2\nD5|9\nD6|14",
        "expectedOutput": "A4|2\nC1|5\nB2|8\nD5|9\nD6|14\nD0|18\nB3|19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nB0|14\nB1|6\nC2|17\nD3|11",
        "expectedOutput": "B1|6\nD3|11\nB0|14\nC2|17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\nB0|3\nA1|15\nA2|10",
        "expectedOutput": "B0|3\nA2|10\nA1|15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\nB0|2\nA1|18\nA2|11\nB3|20",
        "expectedOutput": "B0|2\nA2|11\nA1|18\nB3|20",
        "isHidden": true
      }
    ]
  },
  "m4-lu7": {
    "title": "Sorting algorithms",
    "slug": "belt-2-q17-sorting-algorithms",
    "id": "M4-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "7\nB0|11\nB1|12\nB2|15\nD3|13\nB4|6\nB5|18\nA6|6",
        "expectedOutput": "B4|6\nA6|6\nB0|11\nB1|12\nD3|13\nB2|15\nB5|18",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\nC0|15",
        "expectedOutput": "C0|15",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nA0|10\nC1|11\nD2|4\nD3|7\nB4|9",
        "expectedOutput": "D2|4\nD3|7\nB4|9\nA0|10\nC1|11",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nB0|5",
        "expectedOutput": "B0|5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nD0|4\nC1|14\nA2|9\nC3|20\nC4|17\nA5|18\nB6|8",
        "expectedOutput": "D0|4\nB6|8\nA2|9\nC1|14\nC4|17\nA5|18\nC3|20",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\nC0|18\nC1|4\nA2|20",
        "expectedOutput": "C1|4\nC0|18\nA2|20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\nD0|18\nC1|5\nB2|8\nB3|19\nA4|2\nD5|9\nD6|14",
        "expectedOutput": "A4|2\nC1|5\nB2|8\nD5|9\nD6|14\nD0|18\nB3|19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nB0|14\nB1|6\nC2|17\nD3|11",
        "expectedOutput": "B1|6\nD3|11\nB0|14\nC2|17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\nB0|3\nA1|15\nA2|10",
        "expectedOutput": "B0|3\nA2|10\nA1|15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\nB0|2\nA1|18\nA2|11\nB3|20",
        "expectedOutput": "B0|2\nA2|11\nA1|18\nB3|20",
        "isHidden": true
      }
    ]
  },
  "belt-2-q18-sliding-window": {
    "title": "Sliding window",
    "slug": "belt-2-q18-sliding-window",
    "id": "M4-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n1\n-4 6 2 -9 -3",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n5\n-5 6 5 -2 -6 5 5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n9\n-9 6 9 5 -2 -7 7 -5 -10 -2",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 1 8 10 -3 1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1\n1 -6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n2\n3 -6 -3",
        "expectedOutput": "-3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2\n4 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10\n8\n6 4 -6 2 -4 2 -4 5 -9 -9",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1\n-1 -3 7 0 9 -10 -6 3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n6 -8 -8 8 10 -5 -5 -1 -7 -9",
        "expectedOutput": "-3",
        "isHidden": true
      }
    ]
  },
  "belt-2-q18-calculate-power": {
    "title": "Sliding window",
    "slug": "belt-2-q18-sliding-window",
    "id": "M4-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n1\n-4 6 2 -9 -3",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n5\n-5 6 5 -2 -6 5 5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n9\n-9 6 9 5 -2 -7 7 -5 -10 -2",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 1 8 10 -3 1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1\n1 -6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n2\n3 -6 -3",
        "expectedOutput": "-3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2\n4 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10\n8\n6 4 -6 2 -4 2 -4 5 -9 -9",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1\n-1 -3 7 0 9 -10 -6 3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n6 -8 -8 8 10 -5 -5 -1 -7 -9",
        "expectedOutput": "-3",
        "isHidden": true
      }
    ]
  },
  "M4-LU8": {
    "title": "Sliding window",
    "slug": "belt-2-q18-sliding-window",
    "id": "M4-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n1\n-4 6 2 -9 -3",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n5\n-5 6 5 -2 -6 5 5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n9\n-9 6 9 5 -2 -7 7 -5 -10 -2",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 1 8 10 -3 1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1\n1 -6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n2\n3 -6 -3",
        "expectedOutput": "-3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2\n4 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10\n8\n6 4 -6 2 -4 2 -4 5 -9 -9",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1\n-1 -3 7 0 9 -10 -6 3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n6 -8 -8 8 10 -5 -5 -1 -7 -9",
        "expectedOutput": "-3",
        "isHidden": true
      }
    ]
  },
  "m4-lu8": {
    "title": "Sliding window",
    "slug": "belt-2-q18-sliding-window",
    "id": "M4-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n1\n-4 6 2 -9 -3",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n5\n-5 6 5 -2 -6 5 5",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n9\n-9 6 9 5 -2 -7 7 -5 -10 -2",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 1 8 10 -3 1",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1\n1 -6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n2\n3 -6 -3",
        "expectedOutput": "-3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n2\n4 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10\n8\n6 4 -6 2 -4 2 -4 5 -9 -9",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1\n-1 -3 7 0 9 -10 -6 3",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n6 -8 -8 8 10 -5 -5 -1 -7 -9",
        "expectedOutput": "-3",
        "isHidden": true
      }
    ]
  },
  "belt-2-q19-linked-lists": {
    "title": "Linked lists",
    "slug": "belt-2-q19-linked-lists",
    "id": "M5-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n9 15\n6\n8 11 11 16 19 19",
        "expectedOutput": "8 9 11 11 15 16 19 19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n\n1\n16",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3 9 12 12 13 13\n1\n15",
        "expectedOutput": "3 9 12 12 13 13 15",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n10\n5\n7 8 8 12 14",
        "expectedOutput": "7 8 8 10 12 14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "0\n\n5\n0 7 8 12 19",
        "expectedOutput": "0 7 8 12 19",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n3\n4\n1 2 5 20",
        "expectedOutput": "1 2 3 5 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3 7 8 12 16\n5\n2 3 8 15 17",
        "expectedOutput": "2 3 3 7 8 8 12 15 16 17",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4 17\n4\n2 12 16 16",
        "expectedOutput": "2 4 12 16 16 17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n0 5 6 8 12 16\n2\n4 7",
        "expectedOutput": "0 4 5 6 7 8 12 16",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n20\n1\n19",
        "expectedOutput": "19 20",
        "isHidden": true
      }
    ]
  },
  "belt-2-q19-check-prime-number": {
    "title": "Linked lists",
    "slug": "belt-2-q19-linked-lists",
    "id": "M5-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n9 15\n6\n8 11 11 16 19 19",
        "expectedOutput": "8 9 11 11 15 16 19 19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n\n1\n16",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3 9 12 12 13 13\n1\n15",
        "expectedOutput": "3 9 12 12 13 13 15",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n10\n5\n7 8 8 12 14",
        "expectedOutput": "7 8 8 10 12 14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "0\n\n5\n0 7 8 12 19",
        "expectedOutput": "0 7 8 12 19",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n3\n4\n1 2 5 20",
        "expectedOutput": "1 2 3 5 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3 7 8 12 16\n5\n2 3 8 15 17",
        "expectedOutput": "2 3 3 7 8 8 12 15 16 17",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4 17\n4\n2 12 16 16",
        "expectedOutput": "2 4 12 16 16 17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n0 5 6 8 12 16\n2\n4 7",
        "expectedOutput": "0 4 5 6 7 8 12 16",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n20\n1\n19",
        "expectedOutput": "19 20",
        "isHidden": true
      }
    ]
  },
  "M5-LU1": {
    "title": "Linked lists",
    "slug": "belt-2-q19-linked-lists",
    "id": "M5-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n9 15\n6\n8 11 11 16 19 19",
        "expectedOutput": "8 9 11 11 15 16 19 19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n\n1\n16",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3 9 12 12 13 13\n1\n15",
        "expectedOutput": "3 9 12 12 13 13 15",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n10\n5\n7 8 8 12 14",
        "expectedOutput": "7 8 8 10 12 14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "0\n\n5\n0 7 8 12 19",
        "expectedOutput": "0 7 8 12 19",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n3\n4\n1 2 5 20",
        "expectedOutput": "1 2 3 5 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3 7 8 12 16\n5\n2 3 8 15 17",
        "expectedOutput": "2 3 3 7 8 8 12 15 16 17",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4 17\n4\n2 12 16 16",
        "expectedOutput": "2 4 12 16 16 17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n0 5 6 8 12 16\n2\n4 7",
        "expectedOutput": "0 4 5 6 7 8 12 16",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n20\n1\n19",
        "expectedOutput": "19 20",
        "isHidden": true
      }
    ]
  },
  "m5-lu1": {
    "title": "Linked lists",
    "slug": "belt-2-q19-linked-lists",
    "id": "M5-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n9 15\n6\n8 11 11 16 19 19",
        "expectedOutput": "8 9 11 11 15 16 19 19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "0\n\n1\n16",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3 9 12 12 13 13\n1\n15",
        "expectedOutput": "3 9 12 12 13 13 15",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\n10\n5\n7 8 8 12 14",
        "expectedOutput": "7 8 8 10 12 14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "0\n\n5\n0 7 8 12 19",
        "expectedOutput": "0 7 8 12 19",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n3\n4\n1 2 5 20",
        "expectedOutput": "1 2 3 5 20",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3 7 8 12 16\n5\n2 3 8 15 17",
        "expectedOutput": "2 3 3 7 8 8 12 15 16 17",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4 17\n4\n2 12 16 16",
        "expectedOutput": "2 4 12 16 16 17",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n0 5 6 8 12 16\n2\n4 7",
        "expectedOutput": "0 4 5 6 7 8 12 16",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1\n20\n1\n19",
        "expectedOutput": "19 20",
        "isHidden": true
      }
    ]
  },
  "belt-2-q20-stacks": {
    "title": "Stacks",
    "slug": "belt-2-q20-stacks",
    "id": "M5-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "}}])(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "}(}[{()[]",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": ")[}]}{(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "]}](}{}[]([(",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "])(}(])]]][}",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "}{){({){[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": ")]{{)[}{)]][",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "[}(}])[{(]{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "(}[{)([[{{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "[}(]{))[]({",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      }
    ]
  },
  "belt-2-q20-count-factors": {
    "title": "Stacks",
    "slug": "belt-2-q20-stacks",
    "id": "M5-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "}}])(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "}(}[{()[]",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": ")[}]}{(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "]}](}{}[]([(",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "])(}(])]]][}",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "}{){({){[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": ")]{{)[}{)]][",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "[}(}])[{(]{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "(}[{)([[{{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "[}(]{))[]({",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      }
    ]
  },
  "M5-LU2": {
    "title": "Stacks",
    "slug": "belt-2-q20-stacks",
    "id": "M5-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "}}])(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "}(}[{()[]",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": ")[}]}{(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "]}](}{}[]([(",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "])(}(])]]][}",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "}{){({){[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": ")]{{)[}{)]][",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "[}(}])[{(]{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "(}[{)([[{{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "[}(]{))[]({",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      }
    ]
  },
  "m5-lu2": {
    "title": "Stacks",
    "slug": "belt-2-q20-stacks",
    "id": "M5-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "}}])(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "}(}[{()[]",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": ")[}]}{(",
        "expectedOutput": "UNBALANCED",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "]}](}{}[]([(",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "])(}(])]]][}",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "}{){({){[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": ")]{{)[}{)]][",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "[}(}])[{(]{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "(}[{)([[{{[",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "[}(]{))[]({",
        "expectedOutput": "UNBALANCED",
        "isHidden": true
      }
    ]
  },
  "belt-2-q21-queues": {
    "title": "Queues",
    "slug": "belt-2-q21-queues",
    "id": "M5-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\nENQUEUE 19\nDEQUEUE\nENQUEUE 12\nDEQUEUE",
        "expectedOutput": "19\n12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\nENQUEUE 12\nENQUEUE 13\nENQUEUE 13\nENQUEUE 8\nDEQUEUE",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\nENQUEUE 6\nENQUEUE 17\nENQUEUE 2\nENQUEUE 14\nENQUEUE 13\nDEQUEUE",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\nENQUEUE 4\nENQUEUE 11\nDEQUEUE\nENQUEUE 14\nDEQUEUE\nENQUEUE 18\nDEQUEUE",
        "expectedOutput": "4\n11\n14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nENQUEUE 1\nENQUEUE 16\nDEQUEUE\nDEQUEUE\nENQUEUE 12\nDEQUEUE\nENQUEUE 10",
        "expectedOutput": "1\n16\n12",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\nENQUEUE 10\nENQUEUE 8\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "10\n8",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\nENQUEUE 1\nENQUEUE 2\nENQUEUE 1\nENQUEUE 11\nENQUEUE 3\nENQUEUE 14\nENQUEUE 15\nENQUEUE 20\nDEQUEUE",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nENQUEUE 16\nENQUEUE 18\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n18",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\nENQUEUE 17\nENQUEUE 1\nDEQUEUE\nENQUEUE 16\nENQUEUE 10\nENQUEUE 15\nDEQUEUE",
        "expectedOutput": "17\n1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\nENQUEUE 16\nENQUEUE 10\nENQUEUE 16\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n10",
        "isHidden": true
      }
    ]
  },
  "belt-2-q21-find-gcd-of-two-numbers": {
    "title": "Queues",
    "slug": "belt-2-q21-queues",
    "id": "M5-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\nENQUEUE 19\nDEQUEUE\nENQUEUE 12\nDEQUEUE",
        "expectedOutput": "19\n12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\nENQUEUE 12\nENQUEUE 13\nENQUEUE 13\nENQUEUE 8\nDEQUEUE",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\nENQUEUE 6\nENQUEUE 17\nENQUEUE 2\nENQUEUE 14\nENQUEUE 13\nDEQUEUE",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\nENQUEUE 4\nENQUEUE 11\nDEQUEUE\nENQUEUE 14\nDEQUEUE\nENQUEUE 18\nDEQUEUE",
        "expectedOutput": "4\n11\n14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nENQUEUE 1\nENQUEUE 16\nDEQUEUE\nDEQUEUE\nENQUEUE 12\nDEQUEUE\nENQUEUE 10",
        "expectedOutput": "1\n16\n12",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\nENQUEUE 10\nENQUEUE 8\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "10\n8",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\nENQUEUE 1\nENQUEUE 2\nENQUEUE 1\nENQUEUE 11\nENQUEUE 3\nENQUEUE 14\nENQUEUE 15\nENQUEUE 20\nDEQUEUE",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nENQUEUE 16\nENQUEUE 18\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n18",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\nENQUEUE 17\nENQUEUE 1\nDEQUEUE\nENQUEUE 16\nENQUEUE 10\nENQUEUE 15\nDEQUEUE",
        "expectedOutput": "17\n1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\nENQUEUE 16\nENQUEUE 10\nENQUEUE 16\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n10",
        "isHidden": true
      }
    ]
  },
  "M5-LU3": {
    "title": "Queues",
    "slug": "belt-2-q21-queues",
    "id": "M5-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\nENQUEUE 19\nDEQUEUE\nENQUEUE 12\nDEQUEUE",
        "expectedOutput": "19\n12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\nENQUEUE 12\nENQUEUE 13\nENQUEUE 13\nENQUEUE 8\nDEQUEUE",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\nENQUEUE 6\nENQUEUE 17\nENQUEUE 2\nENQUEUE 14\nENQUEUE 13\nDEQUEUE",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\nENQUEUE 4\nENQUEUE 11\nDEQUEUE\nENQUEUE 14\nDEQUEUE\nENQUEUE 18\nDEQUEUE",
        "expectedOutput": "4\n11\n14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nENQUEUE 1\nENQUEUE 16\nDEQUEUE\nDEQUEUE\nENQUEUE 12\nDEQUEUE\nENQUEUE 10",
        "expectedOutput": "1\n16\n12",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\nENQUEUE 10\nENQUEUE 8\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "10\n8",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\nENQUEUE 1\nENQUEUE 2\nENQUEUE 1\nENQUEUE 11\nENQUEUE 3\nENQUEUE 14\nENQUEUE 15\nENQUEUE 20\nDEQUEUE",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nENQUEUE 16\nENQUEUE 18\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n18",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\nENQUEUE 17\nENQUEUE 1\nDEQUEUE\nENQUEUE 16\nENQUEUE 10\nENQUEUE 15\nDEQUEUE",
        "expectedOutput": "17\n1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\nENQUEUE 16\nENQUEUE 10\nENQUEUE 16\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n10",
        "isHidden": true
      }
    ]
  },
  "m5-lu3": {
    "title": "Queues",
    "slug": "belt-2-q21-queues",
    "id": "M5-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\nENQUEUE 19\nDEQUEUE\nENQUEUE 12\nDEQUEUE",
        "expectedOutput": "19\n12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\nENQUEUE 12\nENQUEUE 13\nENQUEUE 13\nENQUEUE 8\nDEQUEUE",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\nENQUEUE 6\nENQUEUE 17\nENQUEUE 2\nENQUEUE 14\nENQUEUE 13\nDEQUEUE",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\nENQUEUE 4\nENQUEUE 11\nDEQUEUE\nENQUEUE 14\nDEQUEUE\nENQUEUE 18\nDEQUEUE",
        "expectedOutput": "4\n11\n14",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\nENQUEUE 1\nENQUEUE 16\nDEQUEUE\nDEQUEUE\nENQUEUE 12\nDEQUEUE\nENQUEUE 10",
        "expectedOutput": "1\n16\n12",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\nENQUEUE 10\nENQUEUE 8\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "10\n8",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\nENQUEUE 1\nENQUEUE 2\nENQUEUE 1\nENQUEUE 11\nENQUEUE 3\nENQUEUE 14\nENQUEUE 15\nENQUEUE 20\nDEQUEUE",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\nENQUEUE 16\nENQUEUE 18\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n18",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\nENQUEUE 17\nENQUEUE 1\nDEQUEUE\nENQUEUE 16\nENQUEUE 10\nENQUEUE 15\nDEQUEUE",
        "expectedOutput": "17\n1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\nENQUEUE 16\nENQUEUE 10\nENQUEUE 16\nDEQUEUE\nDEQUEUE",
        "expectedOutput": "16\n10",
        "isHidden": true
      }
    ]
  },
  "belt-2-q22-monotonic-stack": {
    "title": "Monotonic stack",
    "slug": "belt-2-q22-monotonic-stack",
    "id": "M5-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1 13 6",
        "expectedOutput": "13 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n20 10 13",
        "expectedOutput": "-1 13 -1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n20 3 11 6 6 3",
        "expectedOutput": "-1 11 -1 -1 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n14 16 20 14 7 17 9",
        "expectedOutput": "16 20 -1 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n11 9 15 12 17 11 19",
        "expectedOutput": "15 15 17 17 19 19 -1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n19 5 0 2",
        "expectedOutput": "-1 -1 2 -1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n8 10 10 9 8 3 3 13 4",
        "expectedOutput": "10 13 13 13 13 13 13 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n1 16 14 17 14 7 6",
        "expectedOutput": "16 17 17 -1 -1 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n5 15 11 13 13 17 13",
        "expectedOutput": "15 17 13 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n10 16 17 0 20 16",
        "expectedOutput": "16 17 20 20 -1 -1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q22-find-lcm-of-two-numbers": {
    "title": "Monotonic stack",
    "slug": "belt-2-q22-monotonic-stack",
    "id": "M5-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1 13 6",
        "expectedOutput": "13 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n20 10 13",
        "expectedOutput": "-1 13 -1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n20 3 11 6 6 3",
        "expectedOutput": "-1 11 -1 -1 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n14 16 20 14 7 17 9",
        "expectedOutput": "16 20 -1 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n11 9 15 12 17 11 19",
        "expectedOutput": "15 15 17 17 19 19 -1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n19 5 0 2",
        "expectedOutput": "-1 -1 2 -1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n8 10 10 9 8 3 3 13 4",
        "expectedOutput": "10 13 13 13 13 13 13 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n1 16 14 17 14 7 6",
        "expectedOutput": "16 17 17 -1 -1 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n5 15 11 13 13 17 13",
        "expectedOutput": "15 17 13 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n10 16 17 0 20 16",
        "expectedOutput": "16 17 20 20 -1 -1",
        "isHidden": true
      }
    ]
  },
  "M5-LU4": {
    "title": "Monotonic stack",
    "slug": "belt-2-q22-monotonic-stack",
    "id": "M5-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1 13 6",
        "expectedOutput": "13 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n20 10 13",
        "expectedOutput": "-1 13 -1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n20 3 11 6 6 3",
        "expectedOutput": "-1 11 -1 -1 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n14 16 20 14 7 17 9",
        "expectedOutput": "16 20 -1 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n11 9 15 12 17 11 19",
        "expectedOutput": "15 15 17 17 19 19 -1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n19 5 0 2",
        "expectedOutput": "-1 -1 2 -1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n8 10 10 9 8 3 3 13 4",
        "expectedOutput": "10 13 13 13 13 13 13 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n1 16 14 17 14 7 6",
        "expectedOutput": "16 17 17 -1 -1 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n5 15 11 13 13 17 13",
        "expectedOutput": "15 17 13 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n10 16 17 0 20 16",
        "expectedOutput": "16 17 20 20 -1 -1",
        "isHidden": true
      }
    ]
  },
  "m5-lu4": {
    "title": "Monotonic stack",
    "slug": "belt-2-q22-monotonic-stack",
    "id": "M5-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1 13 6",
        "expectedOutput": "13 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n20 10 13",
        "expectedOutput": "-1 13 -1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n20 3 11 6 6 3",
        "expectedOutput": "-1 11 -1 -1 -1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n14 16 20 14 7 17 9",
        "expectedOutput": "16 20 -1 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n11 9 15 12 17 11 19",
        "expectedOutput": "15 15 17 17 19 19 -1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n19 5 0 2",
        "expectedOutput": "-1 -1 2 -1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n8 10 10 9 8 3 3 13 4",
        "expectedOutput": "10 13 13 13 13 13 13 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n1 16 14 17 14 7 6",
        "expectedOutput": "16 17 17 -1 -1 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n5 15 11 13 13 17 13",
        "expectedOutput": "15 17 13 17 17 -1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n10 16 17 0 20 16",
        "expectedOutput": "16 17 20 20 -1 -1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q23-two-pointers": {
    "title": "Two pointers",
    "slug": "belt-2-q23-two-pointers",
    "id": "M5-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n17\n0 0 1 2 5 6 8 9 15",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n2 6 7 7 8 14 14",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n8\n1 8",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n17\n4 5 5 6 9 12",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n14\n0 3 3 4 5 6 6 11 13",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n17\n2 4 5 5 5 8",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n12\n0 0 1 2 5 6 7 10 11",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n7\n7 8 8 9 13 13",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n12\n2 4 5 7 8 11 13 14",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n6\n2 10 10 13",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "belt-2-q23-print-fibonacci-sequence": {
    "title": "Two pointers",
    "slug": "belt-2-q23-two-pointers",
    "id": "M5-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n17\n0 0 1 2 5 6 8 9 15",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n2 6 7 7 8 14 14",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n8\n1 8",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n17\n4 5 5 6 9 12",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n14\n0 3 3 4 5 6 6 11 13",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n17\n2 4 5 5 5 8",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n12\n0 0 1 2 5 6 7 10 11",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n7\n7 8 8 9 13 13",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n12\n2 4 5 7 8 11 13 14",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n6\n2 10 10 13",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "M5-LU5": {
    "title": "Two pointers",
    "slug": "belt-2-q23-two-pointers",
    "id": "M5-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n17\n0 0 1 2 5 6 8 9 15",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n2 6 7 7 8 14 14",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n8\n1 8",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n17\n4 5 5 6 9 12",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n14\n0 3 3 4 5 6 6 11 13",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n17\n2 4 5 5 5 8",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n12\n0 0 1 2 5 6 7 10 11",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n7\n7 8 8 9 13 13",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n12\n2 4 5 7 8 11 13 14",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n6\n2 10 10 13",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "m5-lu5": {
    "title": "Two pointers",
    "slug": "belt-2-q23-two-pointers",
    "id": "M5-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9\n17\n0 0 1 2 5 6 8 9 15",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n2 6 7 7 8 14 14",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n8\n1 8",
        "expectedOutput": "NO",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n17\n4 5 5 6 9 12",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "9\n14\n0 3 3 4 5 6 6 11 13",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n17\n2 4 5 5 5 8",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "9\n12\n0 0 1 2 5 6 7 10 11",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n7\n7 8 8 9 13 13",
        "expectedOutput": "NO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n12\n2 4 5 7 8 11 13 14",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n6\n2 10 10 13",
        "expectedOutput": "NO",
        "isHidden": true
      }
    ]
  },
  "belt-2-q24-hare-tortoise-method": {
    "title": "Hare-tortoise method",
    "slug": "belt-2-q24-hare-tortoise-method",
    "id": "M5-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n-1 -1 2 2",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-1 3 5 2 2 4",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n1 2 3 4 5 0",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n-1 0",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n-1 2 5 3 5 5 3",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n-1 2 1 6 4 6 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-1 0 1 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n-1 0 -1 6 0 3 5",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      }
    ]
  },
  "belt-2-q24-sum-of-fibonacci-terms": {
    "title": "Hare-tortoise method",
    "slug": "belt-2-q24-hare-tortoise-method",
    "id": "M5-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n-1 -1 2 2",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-1 3 5 2 2 4",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n1 2 3 4 5 0",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n-1 0",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n-1 2 5 3 5 5 3",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n-1 2 1 6 4 6 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-1 0 1 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n-1 0 -1 6 0 3 5",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      }
    ]
  },
  "M5-LU6": {
    "title": "Hare-tortoise method",
    "slug": "belt-2-q24-hare-tortoise-method",
    "id": "M5-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n-1 -1 2 2",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-1 3 5 2 2 4",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n1 2 3 4 5 0",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n-1 0",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n-1 2 5 3 5 5 3",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n-1 2 1 6 4 6 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-1 0 1 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n-1 0 -1 6 0 3 5",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      }
    ]
  },
  "m5-lu6": {
    "title": "Hare-tortoise method",
    "slug": "belt-2-q24-hare-tortoise-method",
    "id": "M5-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n-1 -1 2 2",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n-1 3 5 2 2 4",
        "expectedOutput": "NO_CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n1 2 3 4 5 0",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n-1 0",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n1 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n-1 2 5 3 5 5 3",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n-1 2 1 6 4 6 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 0",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-1 0 1 -1",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n-1 0 -1 6 0 3 5",
        "expectedOutput": "NO_CYCLE",
        "isHidden": true
      }
    ]
  },
  "belt-2-q25-recursion-fundamentals": {
    "title": "Recursion fundamentals",
    "slug": "belt-2-q25-recursion-fundamentals",
    "id": "M6-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "28",
        "expectedOutput": "406",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "18",
        "expectedOutput": "171",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26",
        "expectedOutput": "351",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "27",
        "expectedOutput": "378",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "25",
        "expectedOutput": "325",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "120",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "12",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "13",
        "expectedOutput": "91",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "21",
        "isHidden": true
      }
    ]
  },
  "belt-2-q25-count-occurrences-of-a-digit": {
    "title": "Recursion fundamentals",
    "slug": "belt-2-q25-recursion-fundamentals",
    "id": "M6-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "28",
        "expectedOutput": "406",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "18",
        "expectedOutput": "171",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26",
        "expectedOutput": "351",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "27",
        "expectedOutput": "378",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "25",
        "expectedOutput": "325",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "120",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "12",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "13",
        "expectedOutput": "91",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "21",
        "isHidden": true
      }
    ]
  },
  "M6-LU1": {
    "title": "Recursion fundamentals",
    "slug": "belt-2-q25-recursion-fundamentals",
    "id": "M6-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "28",
        "expectedOutput": "406",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "18",
        "expectedOutput": "171",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26",
        "expectedOutput": "351",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "27",
        "expectedOutput": "378",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "25",
        "expectedOutput": "325",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "120",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "12",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "13",
        "expectedOutput": "91",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "21",
        "isHidden": true
      }
    ]
  },
  "m6-lu1": {
    "title": "Recursion fundamentals",
    "slug": "belt-2-q25-recursion-fundamentals",
    "id": "M6-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "28",
        "expectedOutput": "406",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "18",
        "expectedOutput": "171",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "26",
        "expectedOutput": "351",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "27",
        "expectedOutput": "378",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "25",
        "expectedOutput": "325",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "15",
        "expectedOutput": "120",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "12",
        "expectedOutput": "78",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "13",
        "expectedOutput": "91",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "21",
        "isHidden": true
      }
    ]
  },
  "belt-2-q26-base-and-recursive-cases": {
    "title": "Base and recursive cases",
    "slug": "belt-2-q26-base-and-recursive-cases",
    "id": "M6-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "293\n571",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "507\n937",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "478\n208",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "86\n352",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "668\n142",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "64\n449",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "122\n931",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "69\n591",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "998\n512",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "213\n991",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q26-sum-digits-at-even-positions": {
    "title": "Base and recursive cases",
    "slug": "belt-2-q26-base-and-recursive-cases",
    "id": "M6-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "293\n571",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "507\n937",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "478\n208",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "86\n352",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "668\n142",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "64\n449",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "122\n931",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "69\n591",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "998\n512",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "213\n991",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "M6-LU2": {
    "title": "Base and recursive cases",
    "slug": "belt-2-q26-base-and-recursive-cases",
    "id": "M6-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "293\n571",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "507\n937",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "478\n208",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "86\n352",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "668\n142",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "64\n449",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "122\n931",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "69\n591",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "998\n512",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "213\n991",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "m6-lu2": {
    "title": "Base and recursive cases",
    "slug": "belt-2-q26-base-and-recursive-cases",
    "id": "M6-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "293\n571",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "507\n937",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "478\n208",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "86\n352",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "668\n142",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "64\n449",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "122\n931",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "69\n591",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "998\n512",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "213\n991",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q27-recursion-tree-intuition": {
    "title": "Recursion tree intuition",
    "slug": "belt-2-q27-recursion-tree-intuition",
    "id": "M6-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10",
        "expectedOutput": "177",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9",
        "expectedOutput": "109",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "25",
        "isHidden": true
      }
    ]
  },
  "belt-2-q27-number-pattern": {
    "title": "Recursion tree intuition",
    "slug": "belt-2-q27-recursion-tree-intuition",
    "id": "M6-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10",
        "expectedOutput": "177",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9",
        "expectedOutput": "109",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "25",
        "isHidden": true
      }
    ]
  },
  "M6-LU3": {
    "title": "Recursion tree intuition",
    "slug": "belt-2-q27-recursion-tree-intuition",
    "id": "M6-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10",
        "expectedOutput": "177",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9",
        "expectedOutput": "109",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "25",
        "isHidden": true
      }
    ]
  },
  "m6-lu3": {
    "title": "Recursion tree intuition",
    "slug": "belt-2-q27-recursion-tree-intuition",
    "id": "M6-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8",
        "expectedOutput": "67",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10",
        "expectedOutput": "177",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "0",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9",
        "expectedOutput": "109",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6",
        "expectedOutput": "25",
        "isHidden": true
      }
    ]
  },
  "belt-2-q28-backtracking": {
    "title": "Backtracking",
    "slug": "belt-2-q28-backtracking",
    "id": "M6-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9",
        "expectedOutput": "352",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "2",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7",
        "expectedOutput": "40",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8",
        "expectedOutput": "92",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "724",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q28-increasing-star-pattern": {
    "title": "Backtracking",
    "slug": "belt-2-q28-backtracking",
    "id": "M6-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9",
        "expectedOutput": "352",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "2",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7",
        "expectedOutput": "40",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8",
        "expectedOutput": "92",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "724",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "M6-LU4": {
    "title": "Backtracking",
    "slug": "belt-2-q28-backtracking",
    "id": "M6-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9",
        "expectedOutput": "352",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "2",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7",
        "expectedOutput": "40",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8",
        "expectedOutput": "92",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "724",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "m6-lu4": {
    "title": "Backtracking",
    "slug": "belt-2-q28-backtracking",
    "id": "M6-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "9",
        "expectedOutput": "352",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "2",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7",
        "expectedOutput": "40",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8",
        "expectedOutput": "92",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "10",
        "expectedOutput": "724",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-2-q29-subsets": {
    "title": "Subsets",
    "slug": "belt-2-q29-subsets",
    "id": "M6-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n14\n-1 2 5 -1 -4",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "10\n13\n-4 8 5 4 4 6 -4 -4 2 -2",
        "expectedOutput": "52",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n4\n2 5 0 6 1 -1 8 -2",
        "expectedOutput": "10",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-5\n-1 -4 8 1 4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n5\n-2 0 -4 -2 -5 5 -2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n2 6 -4 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-8\n3 7",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n-4\n1 3 2 1 1 -4 6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n-10\n-5 4 5 -5 3 -4 -5 4 -2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n-2\n2 2 -2 6 5 -2 3 -5 -3 1",
        "expectedOutput": "51",
        "isHidden": true
      }
    ]
  },
  "belt-2-q29-decreasing-star-pattern": {
    "title": "Subsets",
    "slug": "belt-2-q29-subsets",
    "id": "M6-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n14\n-1 2 5 -1 -4",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "10\n13\n-4 8 5 4 4 6 -4 -4 2 -2",
        "expectedOutput": "52",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n4\n2 5 0 6 1 -1 8 -2",
        "expectedOutput": "10",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-5\n-1 -4 8 1 4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n5\n-2 0 -4 -2 -5 5 -2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n2 6 -4 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-8\n3 7",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n-4\n1 3 2 1 1 -4 6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n-10\n-5 4 5 -5 3 -4 -5 4 -2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n-2\n2 2 -2 6 5 -2 3 -5 -3 1",
        "expectedOutput": "51",
        "isHidden": true
      }
    ]
  },
  "M6-LU5": {
    "title": "Subsets",
    "slug": "belt-2-q29-subsets",
    "id": "M6-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n14\n-1 2 5 -1 -4",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "10\n13\n-4 8 5 4 4 6 -4 -4 2 -2",
        "expectedOutput": "52",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n4\n2 5 0 6 1 -1 8 -2",
        "expectedOutput": "10",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-5\n-1 -4 8 1 4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n5\n-2 0 -4 -2 -5 5 -2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n2 6 -4 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-8\n3 7",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n-4\n1 3 2 1 1 -4 6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n-10\n-5 4 5 -5 3 -4 -5 4 -2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n-2\n2 2 -2 6 5 -2 3 -5 -3 1",
        "expectedOutput": "51",
        "isHidden": true
      }
    ]
  },
  "m6-lu5": {
    "title": "Subsets",
    "slug": "belt-2-q29-subsets",
    "id": "M6-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n14\n-1 2 5 -1 -4",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "10\n13\n-4 8 5 4 4 6 -4 -4 2 -2",
        "expectedOutput": "52",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "8\n4\n2 5 0 6 1 -1 8 -2",
        "expectedOutput": "10",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-5\n-1 -4 8 1 4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n5\n-2 0 -4 -2 -5 5 -2",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n1\n2 6 -4 3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-8\n3 7",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n-4\n1 3 2 1 1 -4 6",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n-10\n-5 4 5 -5 3 -4 -5 4 -2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n-2\n2 2 -2 6 5 -2 3 -5 -3 1",
        "expectedOutput": "51",
        "isHidden": true
      }
    ]
  },
  "belt-2-q30-subsequences": {
    "title": "Subsequences",
    "slug": "belt-2-q30-subsequences",
    "id": "M6-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "abcb\nacb",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ca\nb",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "bacacbca\na",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "baccbaba\nb",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "bc\ncacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "acababab\nbacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "baccbcbb\nccab",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "bbccbbac\nacac",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "abbabb\nb",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "acabccbb\nbab",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-2-q30-first-number-divisible-by-both": {
    "title": "Subsequences",
    "slug": "belt-2-q30-subsequences",
    "id": "M6-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "abcb\nacb",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ca\nb",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "bacacbca\na",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "baccbaba\nb",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "bc\ncacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "acababab\nbacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "baccbcbb\nccab",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "bbccbbac\nacac",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "abbabb\nb",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "acabccbb\nbab",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "M6-LU6": {
    "title": "Subsequences",
    "slug": "belt-2-q30-subsequences",
    "id": "M6-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "abcb\nacb",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ca\nb",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "bacacbca\na",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "baccbaba\nb",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "bc\ncacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "acababab\nbacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "baccbcbb\nccab",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "bbccbbac\nacac",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "abbabb\nb",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "acabccbb\nbab",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "m6-lu6": {
    "title": "Subsequences",
    "slug": "belt-2-q30-subsequences",
    "id": "M6-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "abcb\nacb",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "ca\nb",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "bacacbca\na",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "baccbaba\nb",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "bc\ncacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "acababab\nbacb",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "baccbcbb\nccab",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "bbccbbac\nacac",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "abbabb\nb",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "acabccbb\nbab",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-3-q1-permutations": {
    "title": "Permutations",
    "slug": "belt-3-q1-permutations",
    "id": "M6-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "cdabgf",
        "expectedOutput": "abcdfg\nabcdgf\nabcfdg\nabcfgd\nabcgdf\nabcgfd\nabdcfg\nabdcgf\nabdfcg\nabdfgc\nabdgcf\nabdgfc\nabfcdg\nabfcgd\nabfdcg\nabfdgc\nabfgcd\nabfgdc\nabgcdf\nabgcfd\nabgdcf\nabgdfc\nabgfcd\nabgfdc\nacbdfg\nacbdgf\nacbfdg\nacbfgd\nacbgdf\nacbgfd\nacdbfg\nacdbgf\nacdfbg\nacdfgb\nacdgbf\nacdgfb\nacfbdg\nacfbgd\nacfdbg\nacfdgb\nacfgbd\nacfgdb\nacgbdf\nacgbfd\nacgdbf\nacgdfb\nacgfbd\nacgfdb\nadbcfg\nadbcgf\nadbfcg\nadbfgc\nadbgcf\nadbgfc\nadcbfg\nadcbgf\nadcfbg\nadcfgb\nadcgbf\nadcgfb\nadfbcg\nadfbgc\nadfcbg\nadfcgb\nadfgbc\nadfgcb\nadgbcf\nadgbfc\nadgcbf\nadgcfb\nadgfbc\nadgfcb\nafbcdg\nafbcgd\nafbdcg\nafbdgc\nafbgcd\nafbgdc\nafcbdg\nafcbgd\nafcdbg\nafcdgb\nafcgbd\nafcgdb\nafdbcg\nafdbgc\nafdcbg\nafdcgb\nafdgbc\nafdgcb\nafgbcd\nafgbdc\nafgcbd\nafgcdb\nafgdbc\nafgdcb\nagbcdf\nagbcfd\nagbdcf\nagbdfc\nagbfcd\nagbfdc\nagcbdf\nagcbfd\nagcdbf\nagcdfb\nagcfbd\nagcfdb\nagdbcf\nagdbfc\nagdcbf\nagdcfb\nagdfbc\nagdfcb\nagfbcd\nagfbdc\nagfcbd\nagfcdb\nagfdbc\nagfdcb\nbacdfg\nbacdgf\nbacfdg\nbacfgd\nbacgdf\nbacgfd\nbadcfg\nbadcgf\nbadfcg\nbadfgc\nbadgcf\nbadgfc\nbafcdg\nbafcgd\nbafdcg\nbafdgc\nbafgcd\nbafgdc\nbagcdf\nbagcfd\nbagdcf\nbagdfc\nbagfcd\nbagfdc\nbcadfg\nbcadgf\nbcafdg\nbcafgd\nbcagdf\nbcagfd\nbcdafg\nbcdagf\nbcdfag\nbcdfga\nbcdgaf\nbcdgfa\nbcfadg\nbcfagd\nbcfdag\nbcfdga\nbcfgad\nbcfgda\nbcgadf\nbcgafd\nbcgdaf\nbcgdfa\nbcgfad\nbcgfda\nbdacfg\nbdacgf\nbdafcg\nbdafgc\nbdagcf\nbdagfc\nbdcafg\nbdcagf\nbdcfag\nbdcfga\nbdcgaf\nbdcgfa\nbdfacg\nbdfagc\nbdfcag\nbdfcga\nbdfgac\nbdfgca\nbdgacf\nbdgafc\nbdgcaf\nbdgcfa\nbdgfac\nbdgfca\nbfacdg\nbfacgd\nbfadcg\nbfadgc\nbfagcd\nbfagdc\nbfcadg\nbfcagd\nbfcdag\nbfcdga\nbfcgad\nbfcgda\nbfdacg\nbfdagc\nbfdcag\nbfdcga\nbfdgac\nbfdgca\nbfgacd\nbfgadc\nbfgcad\nbfgcda\nbfgdac\nbfgdca\nbgacdf\nbgacfd\nbgadcf\nbgadfc\nbgafcd\nbgafdc\nbgcadf\nbgcafd\nbgcdaf\nbgcdfa\nbgcfad\nbgcfda\nbgdacf\nbgdafc\nbgdcaf\nbgdcfa\nbgdfac\nbgdfca\nbgfacd\nbgfadc\nbgfcad\nbgfcda\nbgfdac\nbgfdca\ncabdfg\ncabdgf\ncabfdg\ncabfgd\ncabgdf\ncabgfd\ncadbfg\ncadbgf\ncadfbg\ncadfgb\ncadgbf\ncadgfb\ncafbdg\ncafbgd\ncafdbg\ncafdgb\ncafgbd\ncafgdb\ncagbdf\ncagbfd\ncagdbf\ncagdfb\ncagfbd\ncagfdb\ncbadfg\ncbadgf\ncbafdg\ncbafgd\ncbagdf\ncbagfd\ncbdafg\ncbdagf\ncbdfag\ncbdfga\ncbdgaf\ncbdgfa\ncbfadg\ncbfagd\ncbfdag\ncbfdga\ncbfgad\ncbfgda\ncbgadf\ncbgafd\ncbgdaf\ncbgdfa\ncbgfad\ncbgfda\ncdabfg\ncdabgf\ncdafbg\ncdafgb\ncdagbf\ncdagfb\ncdbafg\ncdbagf\ncdbfag\ncdbfga\ncdbgaf\ncdbgfa\ncdfabg\ncdfagb\ncdfbag\ncdfbga\ncdfgab\ncdfgba\ncdgabf\ncdgafb\ncdgbaf\ncdgbfa\ncdgfab\ncdgfba\ncfabdg\ncfabgd\ncfadbg\ncfadgb\ncfagbd\ncfagdb\ncfbadg\ncfbagd\ncfbdag\ncfbdga\ncfbgad\ncfbgda\ncfdabg\ncfdagb\ncfdbag\ncfdbga\ncfdgab\ncfdgba\ncfgabd\ncfgadb\ncfgbad\ncfgbda\ncfgdab\ncfgdba\ncgabdf\ncgabfd\ncgadbf\ncgadfb\ncgafbd\ncgafdb\ncgbadf\ncgbafd\ncgbdaf\ncgbdfa\ncgbfad\ncgbfda\ncgdabf\ncgdafb\ncgdbaf\ncgdbfa\ncgdfab\ncgdfba\ncgfabd\ncgfadb\ncgfbad\ncgfbda\ncgfdab\ncgfdba\ndabcfg\ndabcgf\ndabfcg\ndabfgc\ndabgcf\ndabgfc\ndacbfg\ndacbgf\ndacfbg\ndacfgb\ndacgbf\ndacgfb\ndafbcg\ndafbgc\ndafcbg\ndafcgb\ndafgbc\ndafgcb\ndagbcf\ndagbfc\ndagcbf\ndagcfb\ndagfbc\ndagfcb\ndbacfg\ndbacgf\ndbafcg\ndbafgc\ndbagcf\ndbagfc\ndbcafg\ndbcagf\ndbcfag\ndbcfga\ndbcgaf\ndbcgfa\ndbfacg\ndbfagc\ndbfcag\ndbfcga\ndbfgac\ndbfgca\ndbgacf\ndbgafc\ndbgcaf\ndbgcfa\ndbgfac\ndbgfca\ndcabfg\ndcabgf\ndcafbg\ndcafgb\ndcagbf\ndcagfb\ndcbafg\ndcbagf\ndcbfag\ndcbfga\ndcbgaf\ndcbgfa\ndcfabg\ndcfagb\ndcfbag\ndcfbga\ndcfgab\ndcfgba\ndcgabf\ndcgafb\ndcgbaf\ndcgbfa\ndcgfab\ndcgfba\ndfabcg\ndfabgc\ndfacbg\ndfacgb\ndfagbc\ndfagcb\ndfbacg\ndfbagc\ndfbcag\ndfbcga\ndfbgac\ndfbgca\ndfcabg\ndfcagb\ndfcbag\ndfcbga\ndfcgab\ndfcgba\ndfgabc\ndfgacb\ndfgbac\ndfgbca\ndfgcab\ndfgcba\ndgabcf\ndgabfc\ndgacbf\ndgacfb\ndgafbc\ndgafcb\ndgbacf\ndgbafc\ndgbcaf\ndgbcfa\ndgbfac\ndgbfca\ndgcabf\ndgcafb\ndgcbaf\ndgcbfa\ndgcfab\ndgcfba\ndgfabc\ndgfacb\ndgfbac\ndgfbca\ndgfcab\ndgfcba\nfabcdg\nfabcgd\nfabdcg\nfabdgc\nfabgcd\nfabgdc\nfacbdg\nfacbgd\nfacdbg\nfacdgb\nfacgbd\nfacgdb\nfadbcg\nfadbgc\nfadcbg\nfadcgb\nfadgbc\nfadgcb\nfagbcd\nfagbdc\nfagcbd\nfagcdb\nfagdbc\nfagdcb\nfbacdg\nfbacgd\nfbadcg\nfbadgc\nfbagcd\nfbagdc\nfbcadg\nfbcagd\nfbcdag\nfbcdga\nfbcgad\nfbcgda\nfbdacg\nfbdagc\nfbdcag\nfbdcga\nfbdgac\nfbdgca\nfbgacd\nfbgadc\nfbgcad\nfbgcda\nfbgdac\nfbgdca\nfcabdg\nfcabgd\nfcadbg\nfcadgb\nfcagbd\nfcagdb\nfcbadg\nfcbagd\nfcbdag\nfcbdga\nfcbgad\nfcbgda\nfcdabg\nfcdagb\nfcdbag\nfcdbga\nfcdgab\nfcdgba\nfcgabd\nfcgadb\nfcgbad\nfcgbda\nfcgdab\nfcgdba\nfdabcg\nfdabgc\nfdacbg\nfdacgb\nfdagbc\nfdagcb\nfdbacg\nfdbagc\nfdbcag\nfdbcga\nfdbgac\nfdbgca\nfdcabg\nfdcagb\nfdcbag\nfdcbga\nfdcgab\nfdcgba\nfdgabc\nfdgacb\nfdgbac\nfdgbca\nfdgcab\nfdgcba\nfgabcd\nfgabdc\nfgacbd\nfgacdb\nfgadbc\nfgadcb\nfgbacd\nfgbadc\nfgbcad\nfgbcda\nfgbdac\nfgbdca\nfgcabd\nfgcadb\nfgcbad\nfgcbda\nfgcdab\nfgcdba\nfgdabc\nfgdacb\nfgdbac\nfgdbca\nfgdcab\nfgdcba\ngabcdf\ngabcfd\ngabdcf\ngabdfc\ngabfcd\ngabfdc\ngacbdf\ngacbfd\ngacdbf\ngacdfb\ngacfbd\ngacfdb\ngadbcf\ngadbfc\ngadcbf\ngadcfb\ngadfbc\ngadfcb\ngafbcd\ngafbdc\ngafcbd\ngafcdb\ngafdbc\ngafdcb\ngbacdf\ngbacfd\ngbadcf\ngbadfc\ngbafcd\ngbafdc\ngbcadf\ngbcafd\ngbcdaf\ngbcdfa\ngbcfad\ngbcfda\ngbdacf\ngbdafc\ngbdcaf\ngbdcfa\ngbdfac\ngbdfca\ngbfacd\ngbfadc\ngbfcad\ngbfcda\ngbfdac\ngbfdca\ngcabdf\ngcabfd\ngcadbf\ngcadfb\ngcafbd\ngcafdb\ngcbadf\ngcbafd\ngcbdaf\ngcbdfa\ngcbfad\ngcbfda\ngcdabf\ngcdafb\ngcdbaf\ngcdbfa\ngcdfab\ngcdfba\ngcfabd\ngcfadb\ngcfbad\ngcfbda\ngcfdab\ngcfdba\ngdabcf\ngdabfc\ngdacbf\ngdacfb\ngdafbc\ngdafcb\ngdbacf\ngdbafc\ngdbcaf\ngdbcfa\ngdbfac\ngdbfca\ngdcabf\ngdcafb\ngdcbaf\ngdcbfa\ngdcfab\ngdcfba\ngdfabc\ngdfacb\ngdfbac\ngdfbca\ngdfcab\ngdfcba\ngfabcd\ngfabdc\ngfacbd\ngfacdb\ngfadbc\ngfadcb\ngfbacd\ngfbadc\ngfbcad\ngfbcda\ngfbdac\ngfbdca\ngfcabd\ngfcadb\ngfcbad\ngfcbda\ngfcdab\ngfcdba\ngfdabc\ngfdacb\ngfdbac\ngfdbca\ngfdcab\ngfdcba",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "bgda",
        "expectedOutput": "abdg\nabgd\nadbg\nadgb\nagbd\nagdb\nbadg\nbagd\nbdag\nbdga\nbgad\nbgda\ndabg\ndagb\ndbag\ndbga\ndgab\ndgba\ngabd\ngadb\ngbad\ngbda\ngdab\ngdba",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caef",
        "expectedOutput": "acef\nacfe\naecf\naefc\nafce\nafec\ncaef\ncafe\nceaf\ncefa\ncfae\ncfea\neacf\neafc\necaf\necfa\nefac\nefca\nface\nfaec\nfcae\nfcea\nfeac\nfeca",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "a",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ecgf",
        "expectedOutput": "cefg\ncegf\ncfeg\ncfge\ncgef\ncgfe\necfg\necgf\nefcg\nefgc\negcf\negfc\nfceg\nfcge\nfecg\nfegc\nfgce\nfgec\ngcef\ngcfe\ngecf\ngefc\ngfce\ngfec",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "bfd",
        "expectedOutput": "bdf\nbfd\ndbf\ndfb\nfbd\nfdb",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fadegb",
        "expectedOutput": "abdefg\nabdegf\nabdfeg\nabdfge\nabdgef\nabdgfe\nabedfg\nabedgf\nabefdg\nabefgd\nabegdf\nabegfd\nabfdeg\nabfdge\nabfedg\nabfegd\nabfgde\nabfged\nabgdef\nabgdfe\nabgedf\nabgefd\nabgfde\nabgfed\nadbefg\nadbegf\nadbfeg\nadbfge\nadbgef\nadbgfe\nadebfg\nadebgf\nadefbg\nadefgb\nadegbf\nadegfb\nadfbeg\nadfbge\nadfebg\nadfegb\nadfgbe\nadfgeb\nadgbef\nadgbfe\nadgebf\nadgefb\nadgfbe\nadgfeb\naebdfg\naebdgf\naebfdg\naebfgd\naebgdf\naebgfd\naedbfg\naedbgf\naedfbg\naedfgb\naedgbf\naedgfb\naefbdg\naefbgd\naefdbg\naefdgb\naefgbd\naefgdb\naegbdf\naegbfd\naegdbf\naegdfb\naegfbd\naegfdb\nafbdeg\nafbdge\nafbedg\nafbegd\nafbgde\nafbged\nafdbeg\nafdbge\nafdebg\nafdegb\nafdgbe\nafdgeb\nafebdg\nafebgd\nafedbg\nafedgb\nafegbd\nafegdb\nafgbde\nafgbed\nafgdbe\nafgdeb\nafgebd\nafgedb\nagbdef\nagbdfe\nagbedf\nagbefd\nagbfde\nagbfed\nagdbef\nagdbfe\nagdebf\nagdefb\nagdfbe\nagdfeb\nagebdf\nagebfd\nagedbf\nagedfb\nagefbd\nagefdb\nagfbde\nagfbed\nagfdbe\nagfdeb\nagfebd\nagfedb\nbadefg\nbadegf\nbadfeg\nbadfge\nbadgef\nbadgfe\nbaedfg\nbaedgf\nbaefdg\nbaefgd\nbaegdf\nbaegfd\nbafdeg\nbafdge\nbafedg\nbafegd\nbafgde\nbafged\nbagdef\nbagdfe\nbagedf\nbagefd\nbagfde\nbagfed\nbdaefg\nbdaegf\nbdafeg\nbdafge\nbdagef\nbdagfe\nbdeafg\nbdeagf\nbdefag\nbdefga\nbdegaf\nbdegfa\nbdfaeg\nbdfage\nbdfeag\nbdfega\nbdfgae\nbdfgea\nbdgaef\nbdgafe\nbdgeaf\nbdgefa\nbdgfae\nbdgfea\nbeadfg\nbeadgf\nbeafdg\nbeafgd\nbeagdf\nbeagfd\nbedafg\nbedagf\nbedfag\nbedfga\nbedgaf\nbedgfa\nbefadg\nbefagd\nbefdag\nbefdga\nbefgad\nbefgda\nbegadf\nbegafd\nbegdaf\nbegdfa\nbegfad\nbegfda\nbfadeg\nbfadge\nbfaedg\nbfaegd\nbfagde\nbfaged\nbfdaeg\nbfdage\nbfdeag\nbfdega\nbfdgae\nbfdgea\nbfeadg\nbfeagd\nbfedag\nbfedga\nbfegad\nbfegda\nbfgade\nbfgaed\nbfgdae\nbfgdea\nbfgead\nbfgeda\nbgadef\nbgadfe\nbgaedf\nbgaefd\nbgafde\nbgafed\nbgdaef\nbgdafe\nbgdeaf\nbgdefa\nbgdfae\nbgdfea\nbgeadf\nbgeafd\nbgedaf\nbgedfa\nbgefad\nbgefda\nbgfade\nbgfaed\nbgfdae\nbgfdea\nbgfead\nbgfeda\ndabefg\ndabegf\ndabfeg\ndabfge\ndabgef\ndabgfe\ndaebfg\ndaebgf\ndaefbg\ndaefgb\ndaegbf\ndaegfb\ndafbeg\ndafbge\ndafebg\ndafegb\ndafgbe\ndafgeb\ndagbef\ndagbfe\ndagebf\ndagefb\ndagfbe\ndagfeb\ndbaefg\ndbaegf\ndbafeg\ndbafge\ndbagef\ndbagfe\ndbeafg\ndbeagf\ndbefag\ndbefga\ndbegaf\ndbegfa\ndbfaeg\ndbfage\ndbfeag\ndbfega\ndbfgae\ndbfgea\ndbgaef\ndbgafe\ndbgeaf\ndbgefa\ndbgfae\ndbgfea\ndeabfg\ndeabgf\ndeafbg\ndeafgb\ndeagbf\ndeagfb\ndebafg\ndebagf\ndebfag\ndebfga\ndebgaf\ndebgfa\ndefabg\ndefagb\ndefbag\ndefbga\ndefgab\ndefgba\ndegabf\ndegafb\ndegbaf\ndegbfa\ndegfab\ndegfba\ndfabeg\ndfabge\ndfaebg\ndfaegb\ndfagbe\ndfageb\ndfbaeg\ndfbage\ndfbeag\ndfbega\ndfbgae\ndfbgea\ndfeabg\ndfeagb\ndfebag\ndfebga\ndfegab\ndfegba\ndfgabe\ndfgaeb\ndfgbae\ndfgbea\ndfgeab\ndfgeba\ndgabef\ndgabfe\ndgaebf\ndgaefb\ndgafbe\ndgafeb\ndgbaef\ndgbafe\ndgbeaf\ndgbefa\ndgbfae\ndgbfea\ndgeabf\ndgeafb\ndgebaf\ndgebfa\ndgefab\ndgefba\ndgfabe\ndgfaeb\ndgfbae\ndgfbea\ndgfeab\ndgfeba\neabdfg\neabdgf\neabfdg\neabfgd\neabgdf\neabgfd\neadbfg\neadbgf\neadfbg\neadfgb\neadgbf\neadgfb\neafbdg\neafbgd\neafdbg\neafdgb\neafgbd\neafgdb\neagbdf\neagbfd\neagdbf\neagdfb\neagfbd\neagfdb\nebadfg\nebadgf\nebafdg\nebafgd\nebagdf\nebagfd\nebdafg\nebdagf\nebdfag\nebdfga\nebdgaf\nebdgfa\nebfadg\nebfagd\nebfdag\nebfdga\nebfgad\nebfgda\nebgadf\nebgafd\nebgdaf\nebgdfa\nebgfad\nebgfda\nedabfg\nedabgf\nedafbg\nedafgb\nedagbf\nedagfb\nedbafg\nedbagf\nedbfag\nedbfga\nedbgaf\nedbgfa\nedfabg\nedfagb\nedfbag\nedfbga\nedfgab\nedfgba\nedgabf\nedgafb\nedgbaf\nedgbfa\nedgfab\nedgfba\nefabdg\nefabgd\nefadbg\nefadgb\nefagbd\nefagdb\nefbadg\nefbagd\nefbdag\nefbdga\nefbgad\nefbgda\nefdabg\nefdagb\nefdbag\nefdbga\nefdgab\nefdgba\nefgabd\nefgadb\nefgbad\nefgbda\nefgdab\nefgdba\negabdf\negabfd\negadbf\negadfb\negafbd\negafdb\negbadf\negbafd\negbdaf\negbdfa\negbfad\negbfda\negdabf\negdafb\negdbaf\negdbfa\negdfab\negdfba\negfabd\negfadb\negfbad\negfbda\negfdab\negfdba\nfabdeg\nfabdge\nfabedg\nfabegd\nfabgde\nfabged\nfadbeg\nfadbge\nfadebg\nfadegb\nfadgbe\nfadgeb\nfaebdg\nfaebgd\nfaedbg\nfaedgb\nfaegbd\nfaegdb\nfagbde\nfagbed\nfagdbe\nfagdeb\nfagebd\nfagedb\nfbadeg\nfbadge\nfbaedg\nfbaegd\nfbagde\nfbaged\nfbdaeg\nfbdage\nfbdeag\nfbdega\nfbdgae\nfbdgea\nfbeadg\nfbeagd\nfbedag\nfbedga\nfbegad\nfbegda\nfbgade\nfbgaed\nfbgdae\nfbgdea\nfbgead\nfbgeda\nfdabeg\nfdabge\nfdaebg\nfdaegb\nfdagbe\nfdageb\nfdbaeg\nfdbage\nfdbeag\nfdbega\nfdbgae\nfdbgea\nfdeabg\nfdeagb\nfdebag\nfdebga\nfdegab\nfdegba\nfdgabe\nfdgaeb\nfdgbae\nfdgbea\nfdgeab\nfdgeba\nfeabdg\nfeabgd\nfeadbg\nfeadgb\nfeagbd\nfeagdb\nfebadg\nfebagd\nfebdag\nfebdga\nfebgad\nfebgda\nfedabg\nfedagb\nfedbag\nfedbga\nfedgab\nfedgba\nfegabd\nfegadb\nfegbad\nfegbda\nfegdab\nfegdba\nfgabde\nfgabed\nfgadbe\nfgadeb\nfgaebd\nfgaedb\nfgbade\nfgbaed\nfgbdae\nfgbdea\nfgbead\nfgbeda\nfgdabe\nfgdaeb\nfgdbae\nfgdbea\nfgdeab\nfgdeba\nfgeabd\nfgeadb\nfgebad\nfgebda\nfgedab\nfgedba\ngabdef\ngabdfe\ngabedf\ngabefd\ngabfde\ngabfed\ngadbef\ngadbfe\ngadebf\ngadefb\ngadfbe\ngadfeb\ngaebdf\ngaebfd\ngaedbf\ngaedfb\ngaefbd\ngaefdb\ngafbde\ngafbed\ngafdbe\ngafdeb\ngafebd\ngafedb\ngbadef\ngbadfe\ngbaedf\ngbaefd\ngbafde\ngbafed\ngbdaef\ngbdafe\ngbdeaf\ngbdefa\ngbdfae\ngbdfea\ngbeadf\ngbeafd\ngbedaf\ngbedfa\ngbefad\ngbefda\ngbfade\ngbfaed\ngbfdae\ngbfdea\ngbfead\ngbfeda\ngdabef\ngdabfe\ngdaebf\ngdaefb\ngdafbe\ngdafeb\ngdbaef\ngdbafe\ngdbeaf\ngdbefa\ngdbfae\ngdbfea\ngdeabf\ngdeafb\ngdebaf\ngdebfa\ngdefab\ngdefba\ngdfabe\ngdfaeb\ngdfbae\ngdfbea\ngdfeab\ngdfeba\ngeabdf\ngeabfd\ngeadbf\ngeadfb\ngeafbd\ngeafdb\ngebadf\ngebafd\ngebdaf\ngebdfa\ngebfad\ngebfda\ngedabf\ngedafb\ngedbaf\ngedbfa\ngedfab\ngedfba\ngefabd\ngefadb\ngefbad\ngefbda\ngefdab\ngefdba\ngfabde\ngfabed\ngfadbe\ngfadeb\ngfaebd\ngfaedb\ngfbade\ngfbaed\ngfbdae\ngfbdea\ngfbead\ngfbeda\ngfdabe\ngfdaeb\ngfdbae\ngfdbea\ngfdeab\ngfdeba\ngfeabd\ngfeadb\ngfebad\ngfebda\ngfedab\ngfedba",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "e",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bg",
        "expectedOutput": "bg\ngb",
        "isHidden": true
      }
    ]
  },
  "belt-3-q1-print-array-elements": {
    "title": "Permutations",
    "slug": "belt-3-q1-permutations",
    "id": "M6-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "cdabgf",
        "expectedOutput": "abcdfg\nabcdgf\nabcfdg\nabcfgd\nabcgdf\nabcgfd\nabdcfg\nabdcgf\nabdfcg\nabdfgc\nabdgcf\nabdgfc\nabfcdg\nabfcgd\nabfdcg\nabfdgc\nabfgcd\nabfgdc\nabgcdf\nabgcfd\nabgdcf\nabgdfc\nabgfcd\nabgfdc\nacbdfg\nacbdgf\nacbfdg\nacbfgd\nacbgdf\nacbgfd\nacdbfg\nacdbgf\nacdfbg\nacdfgb\nacdgbf\nacdgfb\nacfbdg\nacfbgd\nacfdbg\nacfdgb\nacfgbd\nacfgdb\nacgbdf\nacgbfd\nacgdbf\nacgdfb\nacgfbd\nacgfdb\nadbcfg\nadbcgf\nadbfcg\nadbfgc\nadbgcf\nadbgfc\nadcbfg\nadcbgf\nadcfbg\nadcfgb\nadcgbf\nadcgfb\nadfbcg\nadfbgc\nadfcbg\nadfcgb\nadfgbc\nadfgcb\nadgbcf\nadgbfc\nadgcbf\nadgcfb\nadgfbc\nadgfcb\nafbcdg\nafbcgd\nafbdcg\nafbdgc\nafbgcd\nafbgdc\nafcbdg\nafcbgd\nafcdbg\nafcdgb\nafcgbd\nafcgdb\nafdbcg\nafdbgc\nafdcbg\nafdcgb\nafdgbc\nafdgcb\nafgbcd\nafgbdc\nafgcbd\nafgcdb\nafgdbc\nafgdcb\nagbcdf\nagbcfd\nagbdcf\nagbdfc\nagbfcd\nagbfdc\nagcbdf\nagcbfd\nagcdbf\nagcdfb\nagcfbd\nagcfdb\nagdbcf\nagdbfc\nagdcbf\nagdcfb\nagdfbc\nagdfcb\nagfbcd\nagfbdc\nagfcbd\nagfcdb\nagfdbc\nagfdcb\nbacdfg\nbacdgf\nbacfdg\nbacfgd\nbacgdf\nbacgfd\nbadcfg\nbadcgf\nbadfcg\nbadfgc\nbadgcf\nbadgfc\nbafcdg\nbafcgd\nbafdcg\nbafdgc\nbafgcd\nbafgdc\nbagcdf\nbagcfd\nbagdcf\nbagdfc\nbagfcd\nbagfdc\nbcadfg\nbcadgf\nbcafdg\nbcafgd\nbcagdf\nbcagfd\nbcdafg\nbcdagf\nbcdfag\nbcdfga\nbcdgaf\nbcdgfa\nbcfadg\nbcfagd\nbcfdag\nbcfdga\nbcfgad\nbcfgda\nbcgadf\nbcgafd\nbcgdaf\nbcgdfa\nbcgfad\nbcgfda\nbdacfg\nbdacgf\nbdafcg\nbdafgc\nbdagcf\nbdagfc\nbdcafg\nbdcagf\nbdcfag\nbdcfga\nbdcgaf\nbdcgfa\nbdfacg\nbdfagc\nbdfcag\nbdfcga\nbdfgac\nbdfgca\nbdgacf\nbdgafc\nbdgcaf\nbdgcfa\nbdgfac\nbdgfca\nbfacdg\nbfacgd\nbfadcg\nbfadgc\nbfagcd\nbfagdc\nbfcadg\nbfcagd\nbfcdag\nbfcdga\nbfcgad\nbfcgda\nbfdacg\nbfdagc\nbfdcag\nbfdcga\nbfdgac\nbfdgca\nbfgacd\nbfgadc\nbfgcad\nbfgcda\nbfgdac\nbfgdca\nbgacdf\nbgacfd\nbgadcf\nbgadfc\nbgafcd\nbgafdc\nbgcadf\nbgcafd\nbgcdaf\nbgcdfa\nbgcfad\nbgcfda\nbgdacf\nbgdafc\nbgdcaf\nbgdcfa\nbgdfac\nbgdfca\nbgfacd\nbgfadc\nbgfcad\nbgfcda\nbgfdac\nbgfdca\ncabdfg\ncabdgf\ncabfdg\ncabfgd\ncabgdf\ncabgfd\ncadbfg\ncadbgf\ncadfbg\ncadfgb\ncadgbf\ncadgfb\ncafbdg\ncafbgd\ncafdbg\ncafdgb\ncafgbd\ncafgdb\ncagbdf\ncagbfd\ncagdbf\ncagdfb\ncagfbd\ncagfdb\ncbadfg\ncbadgf\ncbafdg\ncbafgd\ncbagdf\ncbagfd\ncbdafg\ncbdagf\ncbdfag\ncbdfga\ncbdgaf\ncbdgfa\ncbfadg\ncbfagd\ncbfdag\ncbfdga\ncbfgad\ncbfgda\ncbgadf\ncbgafd\ncbgdaf\ncbgdfa\ncbgfad\ncbgfda\ncdabfg\ncdabgf\ncdafbg\ncdafgb\ncdagbf\ncdagfb\ncdbafg\ncdbagf\ncdbfag\ncdbfga\ncdbgaf\ncdbgfa\ncdfabg\ncdfagb\ncdfbag\ncdfbga\ncdfgab\ncdfgba\ncdgabf\ncdgafb\ncdgbaf\ncdgbfa\ncdgfab\ncdgfba\ncfabdg\ncfabgd\ncfadbg\ncfadgb\ncfagbd\ncfagdb\ncfbadg\ncfbagd\ncfbdag\ncfbdga\ncfbgad\ncfbgda\ncfdabg\ncfdagb\ncfdbag\ncfdbga\ncfdgab\ncfdgba\ncfgabd\ncfgadb\ncfgbad\ncfgbda\ncfgdab\ncfgdba\ncgabdf\ncgabfd\ncgadbf\ncgadfb\ncgafbd\ncgafdb\ncgbadf\ncgbafd\ncgbdaf\ncgbdfa\ncgbfad\ncgbfda\ncgdabf\ncgdafb\ncgdbaf\ncgdbfa\ncgdfab\ncgdfba\ncgfabd\ncgfadb\ncgfbad\ncgfbda\ncgfdab\ncgfdba\ndabcfg\ndabcgf\ndabfcg\ndabfgc\ndabgcf\ndabgfc\ndacbfg\ndacbgf\ndacfbg\ndacfgb\ndacgbf\ndacgfb\ndafbcg\ndafbgc\ndafcbg\ndafcgb\ndafgbc\ndafgcb\ndagbcf\ndagbfc\ndagcbf\ndagcfb\ndagfbc\ndagfcb\ndbacfg\ndbacgf\ndbafcg\ndbafgc\ndbagcf\ndbagfc\ndbcafg\ndbcagf\ndbcfag\ndbcfga\ndbcgaf\ndbcgfa\ndbfacg\ndbfagc\ndbfcag\ndbfcga\ndbfgac\ndbfgca\ndbgacf\ndbgafc\ndbgcaf\ndbgcfa\ndbgfac\ndbgfca\ndcabfg\ndcabgf\ndcafbg\ndcafgb\ndcagbf\ndcagfb\ndcbafg\ndcbagf\ndcbfag\ndcbfga\ndcbgaf\ndcbgfa\ndcfabg\ndcfagb\ndcfbag\ndcfbga\ndcfgab\ndcfgba\ndcgabf\ndcgafb\ndcgbaf\ndcgbfa\ndcgfab\ndcgfba\ndfabcg\ndfabgc\ndfacbg\ndfacgb\ndfagbc\ndfagcb\ndfbacg\ndfbagc\ndfbcag\ndfbcga\ndfbgac\ndfbgca\ndfcabg\ndfcagb\ndfcbag\ndfcbga\ndfcgab\ndfcgba\ndfgabc\ndfgacb\ndfgbac\ndfgbca\ndfgcab\ndfgcba\ndgabcf\ndgabfc\ndgacbf\ndgacfb\ndgafbc\ndgafcb\ndgbacf\ndgbafc\ndgbcaf\ndgbcfa\ndgbfac\ndgbfca\ndgcabf\ndgcafb\ndgcbaf\ndgcbfa\ndgcfab\ndgcfba\ndgfabc\ndgfacb\ndgfbac\ndgfbca\ndgfcab\ndgfcba\nfabcdg\nfabcgd\nfabdcg\nfabdgc\nfabgcd\nfabgdc\nfacbdg\nfacbgd\nfacdbg\nfacdgb\nfacgbd\nfacgdb\nfadbcg\nfadbgc\nfadcbg\nfadcgb\nfadgbc\nfadgcb\nfagbcd\nfagbdc\nfagcbd\nfagcdb\nfagdbc\nfagdcb\nfbacdg\nfbacgd\nfbadcg\nfbadgc\nfbagcd\nfbagdc\nfbcadg\nfbcagd\nfbcdag\nfbcdga\nfbcgad\nfbcgda\nfbdacg\nfbdagc\nfbdcag\nfbdcga\nfbdgac\nfbdgca\nfbgacd\nfbgadc\nfbgcad\nfbgcda\nfbgdac\nfbgdca\nfcabdg\nfcabgd\nfcadbg\nfcadgb\nfcagbd\nfcagdb\nfcbadg\nfcbagd\nfcbdag\nfcbdga\nfcbgad\nfcbgda\nfcdabg\nfcdagb\nfcdbag\nfcdbga\nfcdgab\nfcdgba\nfcgabd\nfcgadb\nfcgbad\nfcgbda\nfcgdab\nfcgdba\nfdabcg\nfdabgc\nfdacbg\nfdacgb\nfdagbc\nfdagcb\nfdbacg\nfdbagc\nfdbcag\nfdbcga\nfdbgac\nfdbgca\nfdcabg\nfdcagb\nfdcbag\nfdcbga\nfdcgab\nfdcgba\nfdgabc\nfdgacb\nfdgbac\nfdgbca\nfdgcab\nfdgcba\nfgabcd\nfgabdc\nfgacbd\nfgacdb\nfgadbc\nfgadcb\nfgbacd\nfgbadc\nfgbcad\nfgbcda\nfgbdac\nfgbdca\nfgcabd\nfgcadb\nfgcbad\nfgcbda\nfgcdab\nfgcdba\nfgdabc\nfgdacb\nfgdbac\nfgdbca\nfgdcab\nfgdcba\ngabcdf\ngabcfd\ngabdcf\ngabdfc\ngabfcd\ngabfdc\ngacbdf\ngacbfd\ngacdbf\ngacdfb\ngacfbd\ngacfdb\ngadbcf\ngadbfc\ngadcbf\ngadcfb\ngadfbc\ngadfcb\ngafbcd\ngafbdc\ngafcbd\ngafcdb\ngafdbc\ngafdcb\ngbacdf\ngbacfd\ngbadcf\ngbadfc\ngbafcd\ngbafdc\ngbcadf\ngbcafd\ngbcdaf\ngbcdfa\ngbcfad\ngbcfda\ngbdacf\ngbdafc\ngbdcaf\ngbdcfa\ngbdfac\ngbdfca\ngbfacd\ngbfadc\ngbfcad\ngbfcda\ngbfdac\ngbfdca\ngcabdf\ngcabfd\ngcadbf\ngcadfb\ngcafbd\ngcafdb\ngcbadf\ngcbafd\ngcbdaf\ngcbdfa\ngcbfad\ngcbfda\ngcdabf\ngcdafb\ngcdbaf\ngcdbfa\ngcdfab\ngcdfba\ngcfabd\ngcfadb\ngcfbad\ngcfbda\ngcfdab\ngcfdba\ngdabcf\ngdabfc\ngdacbf\ngdacfb\ngdafbc\ngdafcb\ngdbacf\ngdbafc\ngdbcaf\ngdbcfa\ngdbfac\ngdbfca\ngdcabf\ngdcafb\ngdcbaf\ngdcbfa\ngdcfab\ngdcfba\ngdfabc\ngdfacb\ngdfbac\ngdfbca\ngdfcab\ngdfcba\ngfabcd\ngfabdc\ngfacbd\ngfacdb\ngfadbc\ngfadcb\ngfbacd\ngfbadc\ngfbcad\ngfbcda\ngfbdac\ngfbdca\ngfcabd\ngfcadb\ngfcbad\ngfcbda\ngfcdab\ngfcdba\ngfdabc\ngfdacb\ngfdbac\ngfdbca\ngfdcab\ngfdcba",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "bgda",
        "expectedOutput": "abdg\nabgd\nadbg\nadgb\nagbd\nagdb\nbadg\nbagd\nbdag\nbdga\nbgad\nbgda\ndabg\ndagb\ndbag\ndbga\ndgab\ndgba\ngabd\ngadb\ngbad\ngbda\ngdab\ngdba",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caef",
        "expectedOutput": "acef\nacfe\naecf\naefc\nafce\nafec\ncaef\ncafe\nceaf\ncefa\ncfae\ncfea\neacf\neafc\necaf\necfa\nefac\nefca\nface\nfaec\nfcae\nfcea\nfeac\nfeca",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "a",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ecgf",
        "expectedOutput": "cefg\ncegf\ncfeg\ncfge\ncgef\ncgfe\necfg\necgf\nefcg\nefgc\negcf\negfc\nfceg\nfcge\nfecg\nfegc\nfgce\nfgec\ngcef\ngcfe\ngecf\ngefc\ngfce\ngfec",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "bfd",
        "expectedOutput": "bdf\nbfd\ndbf\ndfb\nfbd\nfdb",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fadegb",
        "expectedOutput": "abdefg\nabdegf\nabdfeg\nabdfge\nabdgef\nabdgfe\nabedfg\nabedgf\nabefdg\nabefgd\nabegdf\nabegfd\nabfdeg\nabfdge\nabfedg\nabfegd\nabfgde\nabfged\nabgdef\nabgdfe\nabgedf\nabgefd\nabgfde\nabgfed\nadbefg\nadbegf\nadbfeg\nadbfge\nadbgef\nadbgfe\nadebfg\nadebgf\nadefbg\nadefgb\nadegbf\nadegfb\nadfbeg\nadfbge\nadfebg\nadfegb\nadfgbe\nadfgeb\nadgbef\nadgbfe\nadgebf\nadgefb\nadgfbe\nadgfeb\naebdfg\naebdgf\naebfdg\naebfgd\naebgdf\naebgfd\naedbfg\naedbgf\naedfbg\naedfgb\naedgbf\naedgfb\naefbdg\naefbgd\naefdbg\naefdgb\naefgbd\naefgdb\naegbdf\naegbfd\naegdbf\naegdfb\naegfbd\naegfdb\nafbdeg\nafbdge\nafbedg\nafbegd\nafbgde\nafbged\nafdbeg\nafdbge\nafdebg\nafdegb\nafdgbe\nafdgeb\nafebdg\nafebgd\nafedbg\nafedgb\nafegbd\nafegdb\nafgbde\nafgbed\nafgdbe\nafgdeb\nafgebd\nafgedb\nagbdef\nagbdfe\nagbedf\nagbefd\nagbfde\nagbfed\nagdbef\nagdbfe\nagdebf\nagdefb\nagdfbe\nagdfeb\nagebdf\nagebfd\nagedbf\nagedfb\nagefbd\nagefdb\nagfbde\nagfbed\nagfdbe\nagfdeb\nagfebd\nagfedb\nbadefg\nbadegf\nbadfeg\nbadfge\nbadgef\nbadgfe\nbaedfg\nbaedgf\nbaefdg\nbaefgd\nbaegdf\nbaegfd\nbafdeg\nbafdge\nbafedg\nbafegd\nbafgde\nbafged\nbagdef\nbagdfe\nbagedf\nbagefd\nbagfde\nbagfed\nbdaefg\nbdaegf\nbdafeg\nbdafge\nbdagef\nbdagfe\nbdeafg\nbdeagf\nbdefag\nbdefga\nbdegaf\nbdegfa\nbdfaeg\nbdfage\nbdfeag\nbdfega\nbdfgae\nbdfgea\nbdgaef\nbdgafe\nbdgeaf\nbdgefa\nbdgfae\nbdgfea\nbeadfg\nbeadgf\nbeafdg\nbeafgd\nbeagdf\nbeagfd\nbedafg\nbedagf\nbedfag\nbedfga\nbedgaf\nbedgfa\nbefadg\nbefagd\nbefdag\nbefdga\nbefgad\nbefgda\nbegadf\nbegafd\nbegdaf\nbegdfa\nbegfad\nbegfda\nbfadeg\nbfadge\nbfaedg\nbfaegd\nbfagde\nbfaged\nbfdaeg\nbfdage\nbfdeag\nbfdega\nbfdgae\nbfdgea\nbfeadg\nbfeagd\nbfedag\nbfedga\nbfegad\nbfegda\nbfgade\nbfgaed\nbfgdae\nbfgdea\nbfgead\nbfgeda\nbgadef\nbgadfe\nbgaedf\nbgaefd\nbgafde\nbgafed\nbgdaef\nbgdafe\nbgdeaf\nbgdefa\nbgdfae\nbgdfea\nbgeadf\nbgeafd\nbgedaf\nbgedfa\nbgefad\nbgefda\nbgfade\nbgfaed\nbgfdae\nbgfdea\nbgfead\nbgfeda\ndabefg\ndabegf\ndabfeg\ndabfge\ndabgef\ndabgfe\ndaebfg\ndaebgf\ndaefbg\ndaefgb\ndaegbf\ndaegfb\ndafbeg\ndafbge\ndafebg\ndafegb\ndafgbe\ndafgeb\ndagbef\ndagbfe\ndagebf\ndagefb\ndagfbe\ndagfeb\ndbaefg\ndbaegf\ndbafeg\ndbafge\ndbagef\ndbagfe\ndbeafg\ndbeagf\ndbefag\ndbefga\ndbegaf\ndbegfa\ndbfaeg\ndbfage\ndbfeag\ndbfega\ndbfgae\ndbfgea\ndbgaef\ndbgafe\ndbgeaf\ndbgefa\ndbgfae\ndbgfea\ndeabfg\ndeabgf\ndeafbg\ndeafgb\ndeagbf\ndeagfb\ndebafg\ndebagf\ndebfag\ndebfga\ndebgaf\ndebgfa\ndefabg\ndefagb\ndefbag\ndefbga\ndefgab\ndefgba\ndegabf\ndegafb\ndegbaf\ndegbfa\ndegfab\ndegfba\ndfabeg\ndfabge\ndfaebg\ndfaegb\ndfagbe\ndfageb\ndfbaeg\ndfbage\ndfbeag\ndfbega\ndfbgae\ndfbgea\ndfeabg\ndfeagb\ndfebag\ndfebga\ndfegab\ndfegba\ndfgabe\ndfgaeb\ndfgbae\ndfgbea\ndfgeab\ndfgeba\ndgabef\ndgabfe\ndgaebf\ndgaefb\ndgafbe\ndgafeb\ndgbaef\ndgbafe\ndgbeaf\ndgbefa\ndgbfae\ndgbfea\ndgeabf\ndgeafb\ndgebaf\ndgebfa\ndgefab\ndgefba\ndgfabe\ndgfaeb\ndgfbae\ndgfbea\ndgfeab\ndgfeba\neabdfg\neabdgf\neabfdg\neabfgd\neabgdf\neabgfd\neadbfg\neadbgf\neadfbg\neadfgb\neadgbf\neadgfb\neafbdg\neafbgd\neafdbg\neafdgb\neafgbd\neafgdb\neagbdf\neagbfd\neagdbf\neagdfb\neagfbd\neagfdb\nebadfg\nebadgf\nebafdg\nebafgd\nebagdf\nebagfd\nebdafg\nebdagf\nebdfag\nebdfga\nebdgaf\nebdgfa\nebfadg\nebfagd\nebfdag\nebfdga\nebfgad\nebfgda\nebgadf\nebgafd\nebgdaf\nebgdfa\nebgfad\nebgfda\nedabfg\nedabgf\nedafbg\nedafgb\nedagbf\nedagfb\nedbafg\nedbagf\nedbfag\nedbfga\nedbgaf\nedbgfa\nedfabg\nedfagb\nedfbag\nedfbga\nedfgab\nedfgba\nedgabf\nedgafb\nedgbaf\nedgbfa\nedgfab\nedgfba\nefabdg\nefabgd\nefadbg\nefadgb\nefagbd\nefagdb\nefbadg\nefbagd\nefbdag\nefbdga\nefbgad\nefbgda\nefdabg\nefdagb\nefdbag\nefdbga\nefdgab\nefdgba\nefgabd\nefgadb\nefgbad\nefgbda\nefgdab\nefgdba\negabdf\negabfd\negadbf\negadfb\negafbd\negafdb\negbadf\negbafd\negbdaf\negbdfa\negbfad\negbfda\negdabf\negdafb\negdbaf\negdbfa\negdfab\negdfba\negfabd\negfadb\negfbad\negfbda\negfdab\negfdba\nfabdeg\nfabdge\nfabedg\nfabegd\nfabgde\nfabged\nfadbeg\nfadbge\nfadebg\nfadegb\nfadgbe\nfadgeb\nfaebdg\nfaebgd\nfaedbg\nfaedgb\nfaegbd\nfaegdb\nfagbde\nfagbed\nfagdbe\nfagdeb\nfagebd\nfagedb\nfbadeg\nfbadge\nfbaedg\nfbaegd\nfbagde\nfbaged\nfbdaeg\nfbdage\nfbdeag\nfbdega\nfbdgae\nfbdgea\nfbeadg\nfbeagd\nfbedag\nfbedga\nfbegad\nfbegda\nfbgade\nfbgaed\nfbgdae\nfbgdea\nfbgead\nfbgeda\nfdabeg\nfdabge\nfdaebg\nfdaegb\nfdagbe\nfdageb\nfdbaeg\nfdbage\nfdbeag\nfdbega\nfdbgae\nfdbgea\nfdeabg\nfdeagb\nfdebag\nfdebga\nfdegab\nfdegba\nfdgabe\nfdgaeb\nfdgbae\nfdgbea\nfdgeab\nfdgeba\nfeabdg\nfeabgd\nfeadbg\nfeadgb\nfeagbd\nfeagdb\nfebadg\nfebagd\nfebdag\nfebdga\nfebgad\nfebgda\nfedabg\nfedagb\nfedbag\nfedbga\nfedgab\nfedgba\nfegabd\nfegadb\nfegbad\nfegbda\nfegdab\nfegdba\nfgabde\nfgabed\nfgadbe\nfgadeb\nfgaebd\nfgaedb\nfgbade\nfgbaed\nfgbdae\nfgbdea\nfgbead\nfgbeda\nfgdabe\nfgdaeb\nfgdbae\nfgdbea\nfgdeab\nfgdeba\nfgeabd\nfgeadb\nfgebad\nfgebda\nfgedab\nfgedba\ngabdef\ngabdfe\ngabedf\ngabefd\ngabfde\ngabfed\ngadbef\ngadbfe\ngadebf\ngadefb\ngadfbe\ngadfeb\ngaebdf\ngaebfd\ngaedbf\ngaedfb\ngaefbd\ngaefdb\ngafbde\ngafbed\ngafdbe\ngafdeb\ngafebd\ngafedb\ngbadef\ngbadfe\ngbaedf\ngbaefd\ngbafde\ngbafed\ngbdaef\ngbdafe\ngbdeaf\ngbdefa\ngbdfae\ngbdfea\ngbeadf\ngbeafd\ngbedaf\ngbedfa\ngbefad\ngbefda\ngbfade\ngbfaed\ngbfdae\ngbfdea\ngbfead\ngbfeda\ngdabef\ngdabfe\ngdaebf\ngdaefb\ngdafbe\ngdafeb\ngdbaef\ngdbafe\ngdbeaf\ngdbefa\ngdbfae\ngdbfea\ngdeabf\ngdeafb\ngdebaf\ngdebfa\ngdefab\ngdefba\ngdfabe\ngdfaeb\ngdfbae\ngdfbea\ngdfeab\ngdfeba\ngeabdf\ngeabfd\ngeadbf\ngeadfb\ngeafbd\ngeafdb\ngebadf\ngebafd\ngebdaf\ngebdfa\ngebfad\ngebfda\ngedabf\ngedafb\ngedbaf\ngedbfa\ngedfab\ngedfba\ngefabd\ngefadb\ngefbad\ngefbda\ngefdab\ngefdba\ngfabde\ngfabed\ngfadbe\ngfadeb\ngfaebd\ngfaedb\ngfbade\ngfbaed\ngfbdae\ngfbdea\ngfbead\ngfbeda\ngfdabe\ngfdaeb\ngfdbae\ngfdbea\ngfdeab\ngfdeba\ngfeabd\ngfeadb\ngfebad\ngfebda\ngfedab\ngfedba",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "e",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bg",
        "expectedOutput": "bg\ngb",
        "isHidden": true
      }
    ]
  },
  "M6-LU7": {
    "title": "Permutations",
    "slug": "belt-3-q1-permutations",
    "id": "M6-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "cdabgf",
        "expectedOutput": "abcdfg\nabcdgf\nabcfdg\nabcfgd\nabcgdf\nabcgfd\nabdcfg\nabdcgf\nabdfcg\nabdfgc\nabdgcf\nabdgfc\nabfcdg\nabfcgd\nabfdcg\nabfdgc\nabfgcd\nabfgdc\nabgcdf\nabgcfd\nabgdcf\nabgdfc\nabgfcd\nabgfdc\nacbdfg\nacbdgf\nacbfdg\nacbfgd\nacbgdf\nacbgfd\nacdbfg\nacdbgf\nacdfbg\nacdfgb\nacdgbf\nacdgfb\nacfbdg\nacfbgd\nacfdbg\nacfdgb\nacfgbd\nacfgdb\nacgbdf\nacgbfd\nacgdbf\nacgdfb\nacgfbd\nacgfdb\nadbcfg\nadbcgf\nadbfcg\nadbfgc\nadbgcf\nadbgfc\nadcbfg\nadcbgf\nadcfbg\nadcfgb\nadcgbf\nadcgfb\nadfbcg\nadfbgc\nadfcbg\nadfcgb\nadfgbc\nadfgcb\nadgbcf\nadgbfc\nadgcbf\nadgcfb\nadgfbc\nadgfcb\nafbcdg\nafbcgd\nafbdcg\nafbdgc\nafbgcd\nafbgdc\nafcbdg\nafcbgd\nafcdbg\nafcdgb\nafcgbd\nafcgdb\nafdbcg\nafdbgc\nafdcbg\nafdcgb\nafdgbc\nafdgcb\nafgbcd\nafgbdc\nafgcbd\nafgcdb\nafgdbc\nafgdcb\nagbcdf\nagbcfd\nagbdcf\nagbdfc\nagbfcd\nagbfdc\nagcbdf\nagcbfd\nagcdbf\nagcdfb\nagcfbd\nagcfdb\nagdbcf\nagdbfc\nagdcbf\nagdcfb\nagdfbc\nagdfcb\nagfbcd\nagfbdc\nagfcbd\nagfcdb\nagfdbc\nagfdcb\nbacdfg\nbacdgf\nbacfdg\nbacfgd\nbacgdf\nbacgfd\nbadcfg\nbadcgf\nbadfcg\nbadfgc\nbadgcf\nbadgfc\nbafcdg\nbafcgd\nbafdcg\nbafdgc\nbafgcd\nbafgdc\nbagcdf\nbagcfd\nbagdcf\nbagdfc\nbagfcd\nbagfdc\nbcadfg\nbcadgf\nbcafdg\nbcafgd\nbcagdf\nbcagfd\nbcdafg\nbcdagf\nbcdfag\nbcdfga\nbcdgaf\nbcdgfa\nbcfadg\nbcfagd\nbcfdag\nbcfdga\nbcfgad\nbcfgda\nbcgadf\nbcgafd\nbcgdaf\nbcgdfa\nbcgfad\nbcgfda\nbdacfg\nbdacgf\nbdafcg\nbdafgc\nbdagcf\nbdagfc\nbdcafg\nbdcagf\nbdcfag\nbdcfga\nbdcgaf\nbdcgfa\nbdfacg\nbdfagc\nbdfcag\nbdfcga\nbdfgac\nbdfgca\nbdgacf\nbdgafc\nbdgcaf\nbdgcfa\nbdgfac\nbdgfca\nbfacdg\nbfacgd\nbfadcg\nbfadgc\nbfagcd\nbfagdc\nbfcadg\nbfcagd\nbfcdag\nbfcdga\nbfcgad\nbfcgda\nbfdacg\nbfdagc\nbfdcag\nbfdcga\nbfdgac\nbfdgca\nbfgacd\nbfgadc\nbfgcad\nbfgcda\nbfgdac\nbfgdca\nbgacdf\nbgacfd\nbgadcf\nbgadfc\nbgafcd\nbgafdc\nbgcadf\nbgcafd\nbgcdaf\nbgcdfa\nbgcfad\nbgcfda\nbgdacf\nbgdafc\nbgdcaf\nbgdcfa\nbgdfac\nbgdfca\nbgfacd\nbgfadc\nbgfcad\nbgfcda\nbgfdac\nbgfdca\ncabdfg\ncabdgf\ncabfdg\ncabfgd\ncabgdf\ncabgfd\ncadbfg\ncadbgf\ncadfbg\ncadfgb\ncadgbf\ncadgfb\ncafbdg\ncafbgd\ncafdbg\ncafdgb\ncafgbd\ncafgdb\ncagbdf\ncagbfd\ncagdbf\ncagdfb\ncagfbd\ncagfdb\ncbadfg\ncbadgf\ncbafdg\ncbafgd\ncbagdf\ncbagfd\ncbdafg\ncbdagf\ncbdfag\ncbdfga\ncbdgaf\ncbdgfa\ncbfadg\ncbfagd\ncbfdag\ncbfdga\ncbfgad\ncbfgda\ncbgadf\ncbgafd\ncbgdaf\ncbgdfa\ncbgfad\ncbgfda\ncdabfg\ncdabgf\ncdafbg\ncdafgb\ncdagbf\ncdagfb\ncdbafg\ncdbagf\ncdbfag\ncdbfga\ncdbgaf\ncdbgfa\ncdfabg\ncdfagb\ncdfbag\ncdfbga\ncdfgab\ncdfgba\ncdgabf\ncdgafb\ncdgbaf\ncdgbfa\ncdgfab\ncdgfba\ncfabdg\ncfabgd\ncfadbg\ncfadgb\ncfagbd\ncfagdb\ncfbadg\ncfbagd\ncfbdag\ncfbdga\ncfbgad\ncfbgda\ncfdabg\ncfdagb\ncfdbag\ncfdbga\ncfdgab\ncfdgba\ncfgabd\ncfgadb\ncfgbad\ncfgbda\ncfgdab\ncfgdba\ncgabdf\ncgabfd\ncgadbf\ncgadfb\ncgafbd\ncgafdb\ncgbadf\ncgbafd\ncgbdaf\ncgbdfa\ncgbfad\ncgbfda\ncgdabf\ncgdafb\ncgdbaf\ncgdbfa\ncgdfab\ncgdfba\ncgfabd\ncgfadb\ncgfbad\ncgfbda\ncgfdab\ncgfdba\ndabcfg\ndabcgf\ndabfcg\ndabfgc\ndabgcf\ndabgfc\ndacbfg\ndacbgf\ndacfbg\ndacfgb\ndacgbf\ndacgfb\ndafbcg\ndafbgc\ndafcbg\ndafcgb\ndafgbc\ndafgcb\ndagbcf\ndagbfc\ndagcbf\ndagcfb\ndagfbc\ndagfcb\ndbacfg\ndbacgf\ndbafcg\ndbafgc\ndbagcf\ndbagfc\ndbcafg\ndbcagf\ndbcfag\ndbcfga\ndbcgaf\ndbcgfa\ndbfacg\ndbfagc\ndbfcag\ndbfcga\ndbfgac\ndbfgca\ndbgacf\ndbgafc\ndbgcaf\ndbgcfa\ndbgfac\ndbgfca\ndcabfg\ndcabgf\ndcafbg\ndcafgb\ndcagbf\ndcagfb\ndcbafg\ndcbagf\ndcbfag\ndcbfga\ndcbgaf\ndcbgfa\ndcfabg\ndcfagb\ndcfbag\ndcfbga\ndcfgab\ndcfgba\ndcgabf\ndcgafb\ndcgbaf\ndcgbfa\ndcgfab\ndcgfba\ndfabcg\ndfabgc\ndfacbg\ndfacgb\ndfagbc\ndfagcb\ndfbacg\ndfbagc\ndfbcag\ndfbcga\ndfbgac\ndfbgca\ndfcabg\ndfcagb\ndfcbag\ndfcbga\ndfcgab\ndfcgba\ndfgabc\ndfgacb\ndfgbac\ndfgbca\ndfgcab\ndfgcba\ndgabcf\ndgabfc\ndgacbf\ndgacfb\ndgafbc\ndgafcb\ndgbacf\ndgbafc\ndgbcaf\ndgbcfa\ndgbfac\ndgbfca\ndgcabf\ndgcafb\ndgcbaf\ndgcbfa\ndgcfab\ndgcfba\ndgfabc\ndgfacb\ndgfbac\ndgfbca\ndgfcab\ndgfcba\nfabcdg\nfabcgd\nfabdcg\nfabdgc\nfabgcd\nfabgdc\nfacbdg\nfacbgd\nfacdbg\nfacdgb\nfacgbd\nfacgdb\nfadbcg\nfadbgc\nfadcbg\nfadcgb\nfadgbc\nfadgcb\nfagbcd\nfagbdc\nfagcbd\nfagcdb\nfagdbc\nfagdcb\nfbacdg\nfbacgd\nfbadcg\nfbadgc\nfbagcd\nfbagdc\nfbcadg\nfbcagd\nfbcdag\nfbcdga\nfbcgad\nfbcgda\nfbdacg\nfbdagc\nfbdcag\nfbdcga\nfbdgac\nfbdgca\nfbgacd\nfbgadc\nfbgcad\nfbgcda\nfbgdac\nfbgdca\nfcabdg\nfcabgd\nfcadbg\nfcadgb\nfcagbd\nfcagdb\nfcbadg\nfcbagd\nfcbdag\nfcbdga\nfcbgad\nfcbgda\nfcdabg\nfcdagb\nfcdbag\nfcdbga\nfcdgab\nfcdgba\nfcgabd\nfcgadb\nfcgbad\nfcgbda\nfcgdab\nfcgdba\nfdabcg\nfdabgc\nfdacbg\nfdacgb\nfdagbc\nfdagcb\nfdbacg\nfdbagc\nfdbcag\nfdbcga\nfdbgac\nfdbgca\nfdcabg\nfdcagb\nfdcbag\nfdcbga\nfdcgab\nfdcgba\nfdgabc\nfdgacb\nfdgbac\nfdgbca\nfdgcab\nfdgcba\nfgabcd\nfgabdc\nfgacbd\nfgacdb\nfgadbc\nfgadcb\nfgbacd\nfgbadc\nfgbcad\nfgbcda\nfgbdac\nfgbdca\nfgcabd\nfgcadb\nfgcbad\nfgcbda\nfgcdab\nfgcdba\nfgdabc\nfgdacb\nfgdbac\nfgdbca\nfgdcab\nfgdcba\ngabcdf\ngabcfd\ngabdcf\ngabdfc\ngabfcd\ngabfdc\ngacbdf\ngacbfd\ngacdbf\ngacdfb\ngacfbd\ngacfdb\ngadbcf\ngadbfc\ngadcbf\ngadcfb\ngadfbc\ngadfcb\ngafbcd\ngafbdc\ngafcbd\ngafcdb\ngafdbc\ngafdcb\ngbacdf\ngbacfd\ngbadcf\ngbadfc\ngbafcd\ngbafdc\ngbcadf\ngbcafd\ngbcdaf\ngbcdfa\ngbcfad\ngbcfda\ngbdacf\ngbdafc\ngbdcaf\ngbdcfa\ngbdfac\ngbdfca\ngbfacd\ngbfadc\ngbfcad\ngbfcda\ngbfdac\ngbfdca\ngcabdf\ngcabfd\ngcadbf\ngcadfb\ngcafbd\ngcafdb\ngcbadf\ngcbafd\ngcbdaf\ngcbdfa\ngcbfad\ngcbfda\ngcdabf\ngcdafb\ngcdbaf\ngcdbfa\ngcdfab\ngcdfba\ngcfabd\ngcfadb\ngcfbad\ngcfbda\ngcfdab\ngcfdba\ngdabcf\ngdabfc\ngdacbf\ngdacfb\ngdafbc\ngdafcb\ngdbacf\ngdbafc\ngdbcaf\ngdbcfa\ngdbfac\ngdbfca\ngdcabf\ngdcafb\ngdcbaf\ngdcbfa\ngdcfab\ngdcfba\ngdfabc\ngdfacb\ngdfbac\ngdfbca\ngdfcab\ngdfcba\ngfabcd\ngfabdc\ngfacbd\ngfacdb\ngfadbc\ngfadcb\ngfbacd\ngfbadc\ngfbcad\ngfbcda\ngfbdac\ngfbdca\ngfcabd\ngfcadb\ngfcbad\ngfcbda\ngfcdab\ngfcdba\ngfdabc\ngfdacb\ngfdbac\ngfdbca\ngfdcab\ngfdcba",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "bgda",
        "expectedOutput": "abdg\nabgd\nadbg\nadgb\nagbd\nagdb\nbadg\nbagd\nbdag\nbdga\nbgad\nbgda\ndabg\ndagb\ndbag\ndbga\ndgab\ndgba\ngabd\ngadb\ngbad\ngbda\ngdab\ngdba",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caef",
        "expectedOutput": "acef\nacfe\naecf\naefc\nafce\nafec\ncaef\ncafe\nceaf\ncefa\ncfae\ncfea\neacf\neafc\necaf\necfa\nefac\nefca\nface\nfaec\nfcae\nfcea\nfeac\nfeca",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "a",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ecgf",
        "expectedOutput": "cefg\ncegf\ncfeg\ncfge\ncgef\ncgfe\necfg\necgf\nefcg\nefgc\negcf\negfc\nfceg\nfcge\nfecg\nfegc\nfgce\nfgec\ngcef\ngcfe\ngecf\ngefc\ngfce\ngfec",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "bfd",
        "expectedOutput": "bdf\nbfd\ndbf\ndfb\nfbd\nfdb",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fadegb",
        "expectedOutput": "abdefg\nabdegf\nabdfeg\nabdfge\nabdgef\nabdgfe\nabedfg\nabedgf\nabefdg\nabefgd\nabegdf\nabegfd\nabfdeg\nabfdge\nabfedg\nabfegd\nabfgde\nabfged\nabgdef\nabgdfe\nabgedf\nabgefd\nabgfde\nabgfed\nadbefg\nadbegf\nadbfeg\nadbfge\nadbgef\nadbgfe\nadebfg\nadebgf\nadefbg\nadefgb\nadegbf\nadegfb\nadfbeg\nadfbge\nadfebg\nadfegb\nadfgbe\nadfgeb\nadgbef\nadgbfe\nadgebf\nadgefb\nadgfbe\nadgfeb\naebdfg\naebdgf\naebfdg\naebfgd\naebgdf\naebgfd\naedbfg\naedbgf\naedfbg\naedfgb\naedgbf\naedgfb\naefbdg\naefbgd\naefdbg\naefdgb\naefgbd\naefgdb\naegbdf\naegbfd\naegdbf\naegdfb\naegfbd\naegfdb\nafbdeg\nafbdge\nafbedg\nafbegd\nafbgde\nafbged\nafdbeg\nafdbge\nafdebg\nafdegb\nafdgbe\nafdgeb\nafebdg\nafebgd\nafedbg\nafedgb\nafegbd\nafegdb\nafgbde\nafgbed\nafgdbe\nafgdeb\nafgebd\nafgedb\nagbdef\nagbdfe\nagbedf\nagbefd\nagbfde\nagbfed\nagdbef\nagdbfe\nagdebf\nagdefb\nagdfbe\nagdfeb\nagebdf\nagebfd\nagedbf\nagedfb\nagefbd\nagefdb\nagfbde\nagfbed\nagfdbe\nagfdeb\nagfebd\nagfedb\nbadefg\nbadegf\nbadfeg\nbadfge\nbadgef\nbadgfe\nbaedfg\nbaedgf\nbaefdg\nbaefgd\nbaegdf\nbaegfd\nbafdeg\nbafdge\nbafedg\nbafegd\nbafgde\nbafged\nbagdef\nbagdfe\nbagedf\nbagefd\nbagfde\nbagfed\nbdaefg\nbdaegf\nbdafeg\nbdafge\nbdagef\nbdagfe\nbdeafg\nbdeagf\nbdefag\nbdefga\nbdegaf\nbdegfa\nbdfaeg\nbdfage\nbdfeag\nbdfega\nbdfgae\nbdfgea\nbdgaef\nbdgafe\nbdgeaf\nbdgefa\nbdgfae\nbdgfea\nbeadfg\nbeadgf\nbeafdg\nbeafgd\nbeagdf\nbeagfd\nbedafg\nbedagf\nbedfag\nbedfga\nbedgaf\nbedgfa\nbefadg\nbefagd\nbefdag\nbefdga\nbefgad\nbefgda\nbegadf\nbegafd\nbegdaf\nbegdfa\nbegfad\nbegfda\nbfadeg\nbfadge\nbfaedg\nbfaegd\nbfagde\nbfaged\nbfdaeg\nbfdage\nbfdeag\nbfdega\nbfdgae\nbfdgea\nbfeadg\nbfeagd\nbfedag\nbfedga\nbfegad\nbfegda\nbfgade\nbfgaed\nbfgdae\nbfgdea\nbfgead\nbfgeda\nbgadef\nbgadfe\nbgaedf\nbgaefd\nbgafde\nbgafed\nbgdaef\nbgdafe\nbgdeaf\nbgdefa\nbgdfae\nbgdfea\nbgeadf\nbgeafd\nbgedaf\nbgedfa\nbgefad\nbgefda\nbgfade\nbgfaed\nbgfdae\nbgfdea\nbgfead\nbgfeda\ndabefg\ndabegf\ndabfeg\ndabfge\ndabgef\ndabgfe\ndaebfg\ndaebgf\ndaefbg\ndaefgb\ndaegbf\ndaegfb\ndafbeg\ndafbge\ndafebg\ndafegb\ndafgbe\ndafgeb\ndagbef\ndagbfe\ndagebf\ndagefb\ndagfbe\ndagfeb\ndbaefg\ndbaegf\ndbafeg\ndbafge\ndbagef\ndbagfe\ndbeafg\ndbeagf\ndbefag\ndbefga\ndbegaf\ndbegfa\ndbfaeg\ndbfage\ndbfeag\ndbfega\ndbfgae\ndbfgea\ndbgaef\ndbgafe\ndbgeaf\ndbgefa\ndbgfae\ndbgfea\ndeabfg\ndeabgf\ndeafbg\ndeafgb\ndeagbf\ndeagfb\ndebafg\ndebagf\ndebfag\ndebfga\ndebgaf\ndebgfa\ndefabg\ndefagb\ndefbag\ndefbga\ndefgab\ndefgba\ndegabf\ndegafb\ndegbaf\ndegbfa\ndegfab\ndegfba\ndfabeg\ndfabge\ndfaebg\ndfaegb\ndfagbe\ndfageb\ndfbaeg\ndfbage\ndfbeag\ndfbega\ndfbgae\ndfbgea\ndfeabg\ndfeagb\ndfebag\ndfebga\ndfegab\ndfegba\ndfgabe\ndfgaeb\ndfgbae\ndfgbea\ndfgeab\ndfgeba\ndgabef\ndgabfe\ndgaebf\ndgaefb\ndgafbe\ndgafeb\ndgbaef\ndgbafe\ndgbeaf\ndgbefa\ndgbfae\ndgbfea\ndgeabf\ndgeafb\ndgebaf\ndgebfa\ndgefab\ndgefba\ndgfabe\ndgfaeb\ndgfbae\ndgfbea\ndgfeab\ndgfeba\neabdfg\neabdgf\neabfdg\neabfgd\neabgdf\neabgfd\neadbfg\neadbgf\neadfbg\neadfgb\neadgbf\neadgfb\neafbdg\neafbgd\neafdbg\neafdgb\neafgbd\neafgdb\neagbdf\neagbfd\neagdbf\neagdfb\neagfbd\neagfdb\nebadfg\nebadgf\nebafdg\nebafgd\nebagdf\nebagfd\nebdafg\nebdagf\nebdfag\nebdfga\nebdgaf\nebdgfa\nebfadg\nebfagd\nebfdag\nebfdga\nebfgad\nebfgda\nebgadf\nebgafd\nebgdaf\nebgdfa\nebgfad\nebgfda\nedabfg\nedabgf\nedafbg\nedafgb\nedagbf\nedagfb\nedbafg\nedbagf\nedbfag\nedbfga\nedbgaf\nedbgfa\nedfabg\nedfagb\nedfbag\nedfbga\nedfgab\nedfgba\nedgabf\nedgafb\nedgbaf\nedgbfa\nedgfab\nedgfba\nefabdg\nefabgd\nefadbg\nefadgb\nefagbd\nefagdb\nefbadg\nefbagd\nefbdag\nefbdga\nefbgad\nefbgda\nefdabg\nefdagb\nefdbag\nefdbga\nefdgab\nefdgba\nefgabd\nefgadb\nefgbad\nefgbda\nefgdab\nefgdba\negabdf\negabfd\negadbf\negadfb\negafbd\negafdb\negbadf\negbafd\negbdaf\negbdfa\negbfad\negbfda\negdabf\negdafb\negdbaf\negdbfa\negdfab\negdfba\negfabd\negfadb\negfbad\negfbda\negfdab\negfdba\nfabdeg\nfabdge\nfabedg\nfabegd\nfabgde\nfabged\nfadbeg\nfadbge\nfadebg\nfadegb\nfadgbe\nfadgeb\nfaebdg\nfaebgd\nfaedbg\nfaedgb\nfaegbd\nfaegdb\nfagbde\nfagbed\nfagdbe\nfagdeb\nfagebd\nfagedb\nfbadeg\nfbadge\nfbaedg\nfbaegd\nfbagde\nfbaged\nfbdaeg\nfbdage\nfbdeag\nfbdega\nfbdgae\nfbdgea\nfbeadg\nfbeagd\nfbedag\nfbedga\nfbegad\nfbegda\nfbgade\nfbgaed\nfbgdae\nfbgdea\nfbgead\nfbgeda\nfdabeg\nfdabge\nfdaebg\nfdaegb\nfdagbe\nfdageb\nfdbaeg\nfdbage\nfdbeag\nfdbega\nfdbgae\nfdbgea\nfdeabg\nfdeagb\nfdebag\nfdebga\nfdegab\nfdegba\nfdgabe\nfdgaeb\nfdgbae\nfdgbea\nfdgeab\nfdgeba\nfeabdg\nfeabgd\nfeadbg\nfeadgb\nfeagbd\nfeagdb\nfebadg\nfebagd\nfebdag\nfebdga\nfebgad\nfebgda\nfedabg\nfedagb\nfedbag\nfedbga\nfedgab\nfedgba\nfegabd\nfegadb\nfegbad\nfegbda\nfegdab\nfegdba\nfgabde\nfgabed\nfgadbe\nfgadeb\nfgaebd\nfgaedb\nfgbade\nfgbaed\nfgbdae\nfgbdea\nfgbead\nfgbeda\nfgdabe\nfgdaeb\nfgdbae\nfgdbea\nfgdeab\nfgdeba\nfgeabd\nfgeadb\nfgebad\nfgebda\nfgedab\nfgedba\ngabdef\ngabdfe\ngabedf\ngabefd\ngabfde\ngabfed\ngadbef\ngadbfe\ngadebf\ngadefb\ngadfbe\ngadfeb\ngaebdf\ngaebfd\ngaedbf\ngaedfb\ngaefbd\ngaefdb\ngafbde\ngafbed\ngafdbe\ngafdeb\ngafebd\ngafedb\ngbadef\ngbadfe\ngbaedf\ngbaefd\ngbafde\ngbafed\ngbdaef\ngbdafe\ngbdeaf\ngbdefa\ngbdfae\ngbdfea\ngbeadf\ngbeafd\ngbedaf\ngbedfa\ngbefad\ngbefda\ngbfade\ngbfaed\ngbfdae\ngbfdea\ngbfead\ngbfeda\ngdabef\ngdabfe\ngdaebf\ngdaefb\ngdafbe\ngdafeb\ngdbaef\ngdbafe\ngdbeaf\ngdbefa\ngdbfae\ngdbfea\ngdeabf\ngdeafb\ngdebaf\ngdebfa\ngdefab\ngdefba\ngdfabe\ngdfaeb\ngdfbae\ngdfbea\ngdfeab\ngdfeba\ngeabdf\ngeabfd\ngeadbf\ngeadfb\ngeafbd\ngeafdb\ngebadf\ngebafd\ngebdaf\ngebdfa\ngebfad\ngebfda\ngedabf\ngedafb\ngedbaf\ngedbfa\ngedfab\ngedfba\ngefabd\ngefadb\ngefbad\ngefbda\ngefdab\ngefdba\ngfabde\ngfabed\ngfadbe\ngfadeb\ngfaebd\ngfaedb\ngfbade\ngfbaed\ngfbdae\ngfbdea\ngfbead\ngfbeda\ngfdabe\ngfdaeb\ngfdbae\ngfdbea\ngfdeab\ngfdeba\ngfeabd\ngfeadb\ngfebad\ngfebda\ngfedab\ngfedba",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "e",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bg",
        "expectedOutput": "bg\ngb",
        "isHidden": true
      }
    ]
  },
  "m6-lu7": {
    "title": "Permutations",
    "slug": "belt-3-q1-permutations",
    "id": "M6-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "cdabgf",
        "expectedOutput": "abcdfg\nabcdgf\nabcfdg\nabcfgd\nabcgdf\nabcgfd\nabdcfg\nabdcgf\nabdfcg\nabdfgc\nabdgcf\nabdgfc\nabfcdg\nabfcgd\nabfdcg\nabfdgc\nabfgcd\nabfgdc\nabgcdf\nabgcfd\nabgdcf\nabgdfc\nabgfcd\nabgfdc\nacbdfg\nacbdgf\nacbfdg\nacbfgd\nacbgdf\nacbgfd\nacdbfg\nacdbgf\nacdfbg\nacdfgb\nacdgbf\nacdgfb\nacfbdg\nacfbgd\nacfdbg\nacfdgb\nacfgbd\nacfgdb\nacgbdf\nacgbfd\nacgdbf\nacgdfb\nacgfbd\nacgfdb\nadbcfg\nadbcgf\nadbfcg\nadbfgc\nadbgcf\nadbgfc\nadcbfg\nadcbgf\nadcfbg\nadcfgb\nadcgbf\nadcgfb\nadfbcg\nadfbgc\nadfcbg\nadfcgb\nadfgbc\nadfgcb\nadgbcf\nadgbfc\nadgcbf\nadgcfb\nadgfbc\nadgfcb\nafbcdg\nafbcgd\nafbdcg\nafbdgc\nafbgcd\nafbgdc\nafcbdg\nafcbgd\nafcdbg\nafcdgb\nafcgbd\nafcgdb\nafdbcg\nafdbgc\nafdcbg\nafdcgb\nafdgbc\nafdgcb\nafgbcd\nafgbdc\nafgcbd\nafgcdb\nafgdbc\nafgdcb\nagbcdf\nagbcfd\nagbdcf\nagbdfc\nagbfcd\nagbfdc\nagcbdf\nagcbfd\nagcdbf\nagcdfb\nagcfbd\nagcfdb\nagdbcf\nagdbfc\nagdcbf\nagdcfb\nagdfbc\nagdfcb\nagfbcd\nagfbdc\nagfcbd\nagfcdb\nagfdbc\nagfdcb\nbacdfg\nbacdgf\nbacfdg\nbacfgd\nbacgdf\nbacgfd\nbadcfg\nbadcgf\nbadfcg\nbadfgc\nbadgcf\nbadgfc\nbafcdg\nbafcgd\nbafdcg\nbafdgc\nbafgcd\nbafgdc\nbagcdf\nbagcfd\nbagdcf\nbagdfc\nbagfcd\nbagfdc\nbcadfg\nbcadgf\nbcafdg\nbcafgd\nbcagdf\nbcagfd\nbcdafg\nbcdagf\nbcdfag\nbcdfga\nbcdgaf\nbcdgfa\nbcfadg\nbcfagd\nbcfdag\nbcfdga\nbcfgad\nbcfgda\nbcgadf\nbcgafd\nbcgdaf\nbcgdfa\nbcgfad\nbcgfda\nbdacfg\nbdacgf\nbdafcg\nbdafgc\nbdagcf\nbdagfc\nbdcafg\nbdcagf\nbdcfag\nbdcfga\nbdcgaf\nbdcgfa\nbdfacg\nbdfagc\nbdfcag\nbdfcga\nbdfgac\nbdfgca\nbdgacf\nbdgafc\nbdgcaf\nbdgcfa\nbdgfac\nbdgfca\nbfacdg\nbfacgd\nbfadcg\nbfadgc\nbfagcd\nbfagdc\nbfcadg\nbfcagd\nbfcdag\nbfcdga\nbfcgad\nbfcgda\nbfdacg\nbfdagc\nbfdcag\nbfdcga\nbfdgac\nbfdgca\nbfgacd\nbfgadc\nbfgcad\nbfgcda\nbfgdac\nbfgdca\nbgacdf\nbgacfd\nbgadcf\nbgadfc\nbgafcd\nbgafdc\nbgcadf\nbgcafd\nbgcdaf\nbgcdfa\nbgcfad\nbgcfda\nbgdacf\nbgdafc\nbgdcaf\nbgdcfa\nbgdfac\nbgdfca\nbgfacd\nbgfadc\nbgfcad\nbgfcda\nbgfdac\nbgfdca\ncabdfg\ncabdgf\ncabfdg\ncabfgd\ncabgdf\ncabgfd\ncadbfg\ncadbgf\ncadfbg\ncadfgb\ncadgbf\ncadgfb\ncafbdg\ncafbgd\ncafdbg\ncafdgb\ncafgbd\ncafgdb\ncagbdf\ncagbfd\ncagdbf\ncagdfb\ncagfbd\ncagfdb\ncbadfg\ncbadgf\ncbafdg\ncbafgd\ncbagdf\ncbagfd\ncbdafg\ncbdagf\ncbdfag\ncbdfga\ncbdgaf\ncbdgfa\ncbfadg\ncbfagd\ncbfdag\ncbfdga\ncbfgad\ncbfgda\ncbgadf\ncbgafd\ncbgdaf\ncbgdfa\ncbgfad\ncbgfda\ncdabfg\ncdabgf\ncdafbg\ncdafgb\ncdagbf\ncdagfb\ncdbafg\ncdbagf\ncdbfag\ncdbfga\ncdbgaf\ncdbgfa\ncdfabg\ncdfagb\ncdfbag\ncdfbga\ncdfgab\ncdfgba\ncdgabf\ncdgafb\ncdgbaf\ncdgbfa\ncdgfab\ncdgfba\ncfabdg\ncfabgd\ncfadbg\ncfadgb\ncfagbd\ncfagdb\ncfbadg\ncfbagd\ncfbdag\ncfbdga\ncfbgad\ncfbgda\ncfdabg\ncfdagb\ncfdbag\ncfdbga\ncfdgab\ncfdgba\ncfgabd\ncfgadb\ncfgbad\ncfgbda\ncfgdab\ncfgdba\ncgabdf\ncgabfd\ncgadbf\ncgadfb\ncgafbd\ncgafdb\ncgbadf\ncgbafd\ncgbdaf\ncgbdfa\ncgbfad\ncgbfda\ncgdabf\ncgdafb\ncgdbaf\ncgdbfa\ncgdfab\ncgdfba\ncgfabd\ncgfadb\ncgfbad\ncgfbda\ncgfdab\ncgfdba\ndabcfg\ndabcgf\ndabfcg\ndabfgc\ndabgcf\ndabgfc\ndacbfg\ndacbgf\ndacfbg\ndacfgb\ndacgbf\ndacgfb\ndafbcg\ndafbgc\ndafcbg\ndafcgb\ndafgbc\ndafgcb\ndagbcf\ndagbfc\ndagcbf\ndagcfb\ndagfbc\ndagfcb\ndbacfg\ndbacgf\ndbafcg\ndbafgc\ndbagcf\ndbagfc\ndbcafg\ndbcagf\ndbcfag\ndbcfga\ndbcgaf\ndbcgfa\ndbfacg\ndbfagc\ndbfcag\ndbfcga\ndbfgac\ndbfgca\ndbgacf\ndbgafc\ndbgcaf\ndbgcfa\ndbgfac\ndbgfca\ndcabfg\ndcabgf\ndcafbg\ndcafgb\ndcagbf\ndcagfb\ndcbafg\ndcbagf\ndcbfag\ndcbfga\ndcbgaf\ndcbgfa\ndcfabg\ndcfagb\ndcfbag\ndcfbga\ndcfgab\ndcfgba\ndcgabf\ndcgafb\ndcgbaf\ndcgbfa\ndcgfab\ndcgfba\ndfabcg\ndfabgc\ndfacbg\ndfacgb\ndfagbc\ndfagcb\ndfbacg\ndfbagc\ndfbcag\ndfbcga\ndfbgac\ndfbgca\ndfcabg\ndfcagb\ndfcbag\ndfcbga\ndfcgab\ndfcgba\ndfgabc\ndfgacb\ndfgbac\ndfgbca\ndfgcab\ndfgcba\ndgabcf\ndgabfc\ndgacbf\ndgacfb\ndgafbc\ndgafcb\ndgbacf\ndgbafc\ndgbcaf\ndgbcfa\ndgbfac\ndgbfca\ndgcabf\ndgcafb\ndgcbaf\ndgcbfa\ndgcfab\ndgcfba\ndgfabc\ndgfacb\ndgfbac\ndgfbca\ndgfcab\ndgfcba\nfabcdg\nfabcgd\nfabdcg\nfabdgc\nfabgcd\nfabgdc\nfacbdg\nfacbgd\nfacdbg\nfacdgb\nfacgbd\nfacgdb\nfadbcg\nfadbgc\nfadcbg\nfadcgb\nfadgbc\nfadgcb\nfagbcd\nfagbdc\nfagcbd\nfagcdb\nfagdbc\nfagdcb\nfbacdg\nfbacgd\nfbadcg\nfbadgc\nfbagcd\nfbagdc\nfbcadg\nfbcagd\nfbcdag\nfbcdga\nfbcgad\nfbcgda\nfbdacg\nfbdagc\nfbdcag\nfbdcga\nfbdgac\nfbdgca\nfbgacd\nfbgadc\nfbgcad\nfbgcda\nfbgdac\nfbgdca\nfcabdg\nfcabgd\nfcadbg\nfcadgb\nfcagbd\nfcagdb\nfcbadg\nfcbagd\nfcbdag\nfcbdga\nfcbgad\nfcbgda\nfcdabg\nfcdagb\nfcdbag\nfcdbga\nfcdgab\nfcdgba\nfcgabd\nfcgadb\nfcgbad\nfcgbda\nfcgdab\nfcgdba\nfdabcg\nfdabgc\nfdacbg\nfdacgb\nfdagbc\nfdagcb\nfdbacg\nfdbagc\nfdbcag\nfdbcga\nfdbgac\nfdbgca\nfdcabg\nfdcagb\nfdcbag\nfdcbga\nfdcgab\nfdcgba\nfdgabc\nfdgacb\nfdgbac\nfdgbca\nfdgcab\nfdgcba\nfgabcd\nfgabdc\nfgacbd\nfgacdb\nfgadbc\nfgadcb\nfgbacd\nfgbadc\nfgbcad\nfgbcda\nfgbdac\nfgbdca\nfgcabd\nfgcadb\nfgcbad\nfgcbda\nfgcdab\nfgcdba\nfgdabc\nfgdacb\nfgdbac\nfgdbca\nfgdcab\nfgdcba\ngabcdf\ngabcfd\ngabdcf\ngabdfc\ngabfcd\ngabfdc\ngacbdf\ngacbfd\ngacdbf\ngacdfb\ngacfbd\ngacfdb\ngadbcf\ngadbfc\ngadcbf\ngadcfb\ngadfbc\ngadfcb\ngafbcd\ngafbdc\ngafcbd\ngafcdb\ngafdbc\ngafdcb\ngbacdf\ngbacfd\ngbadcf\ngbadfc\ngbafcd\ngbafdc\ngbcadf\ngbcafd\ngbcdaf\ngbcdfa\ngbcfad\ngbcfda\ngbdacf\ngbdafc\ngbdcaf\ngbdcfa\ngbdfac\ngbdfca\ngbfacd\ngbfadc\ngbfcad\ngbfcda\ngbfdac\ngbfdca\ngcabdf\ngcabfd\ngcadbf\ngcadfb\ngcafbd\ngcafdb\ngcbadf\ngcbafd\ngcbdaf\ngcbdfa\ngcbfad\ngcbfda\ngcdabf\ngcdafb\ngcdbaf\ngcdbfa\ngcdfab\ngcdfba\ngcfabd\ngcfadb\ngcfbad\ngcfbda\ngcfdab\ngcfdba\ngdabcf\ngdabfc\ngdacbf\ngdacfb\ngdafbc\ngdafcb\ngdbacf\ngdbafc\ngdbcaf\ngdbcfa\ngdbfac\ngdbfca\ngdcabf\ngdcafb\ngdcbaf\ngdcbfa\ngdcfab\ngdcfba\ngdfabc\ngdfacb\ngdfbac\ngdfbca\ngdfcab\ngdfcba\ngfabcd\ngfabdc\ngfacbd\ngfacdb\ngfadbc\ngfadcb\ngfbacd\ngfbadc\ngfbcad\ngfbcda\ngfbdac\ngfbdca\ngfcabd\ngfcadb\ngfcbad\ngfcbda\ngfcdab\ngfcdba\ngfdabc\ngfdacb\ngfdbac\ngfdbca\ngfdcab\ngfdcba",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "bgda",
        "expectedOutput": "abdg\nabgd\nadbg\nadgb\nagbd\nagdb\nbadg\nbagd\nbdag\nbdga\nbgad\nbgda\ndabg\ndagb\ndbag\ndbga\ndgab\ndgba\ngabd\ngadb\ngbad\ngbda\ngdab\ngdba",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "b",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "caef",
        "expectedOutput": "acef\nacfe\naecf\naefc\nafce\nafec\ncaef\ncafe\nceaf\ncefa\ncfae\ncfea\neacf\neafc\necaf\necfa\nefac\nefca\nface\nfaec\nfcae\nfcea\nfeac\nfeca",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "a",
        "expectedOutput": "a",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "ecgf",
        "expectedOutput": "cefg\ncegf\ncfeg\ncfge\ncgef\ncgfe\necfg\necgf\nefcg\nefgc\negcf\negfc\nfceg\nfcge\nfecg\nfegc\nfgce\nfgec\ngcef\ngcfe\ngecf\ngefc\ngfce\ngfec",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "bfd",
        "expectedOutput": "bdf\nbfd\ndbf\ndfb\nfbd\nfdb",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "fadegb",
        "expectedOutput": "abdefg\nabdegf\nabdfeg\nabdfge\nabdgef\nabdgfe\nabedfg\nabedgf\nabefdg\nabefgd\nabegdf\nabegfd\nabfdeg\nabfdge\nabfedg\nabfegd\nabfgde\nabfged\nabgdef\nabgdfe\nabgedf\nabgefd\nabgfde\nabgfed\nadbefg\nadbegf\nadbfeg\nadbfge\nadbgef\nadbgfe\nadebfg\nadebgf\nadefbg\nadefgb\nadegbf\nadegfb\nadfbeg\nadfbge\nadfebg\nadfegb\nadfgbe\nadfgeb\nadgbef\nadgbfe\nadgebf\nadgefb\nadgfbe\nadgfeb\naebdfg\naebdgf\naebfdg\naebfgd\naebgdf\naebgfd\naedbfg\naedbgf\naedfbg\naedfgb\naedgbf\naedgfb\naefbdg\naefbgd\naefdbg\naefdgb\naefgbd\naefgdb\naegbdf\naegbfd\naegdbf\naegdfb\naegfbd\naegfdb\nafbdeg\nafbdge\nafbedg\nafbegd\nafbgde\nafbged\nafdbeg\nafdbge\nafdebg\nafdegb\nafdgbe\nafdgeb\nafebdg\nafebgd\nafedbg\nafedgb\nafegbd\nafegdb\nafgbde\nafgbed\nafgdbe\nafgdeb\nafgebd\nafgedb\nagbdef\nagbdfe\nagbedf\nagbefd\nagbfde\nagbfed\nagdbef\nagdbfe\nagdebf\nagdefb\nagdfbe\nagdfeb\nagebdf\nagebfd\nagedbf\nagedfb\nagefbd\nagefdb\nagfbde\nagfbed\nagfdbe\nagfdeb\nagfebd\nagfedb\nbadefg\nbadegf\nbadfeg\nbadfge\nbadgef\nbadgfe\nbaedfg\nbaedgf\nbaefdg\nbaefgd\nbaegdf\nbaegfd\nbafdeg\nbafdge\nbafedg\nbafegd\nbafgde\nbafged\nbagdef\nbagdfe\nbagedf\nbagefd\nbagfde\nbagfed\nbdaefg\nbdaegf\nbdafeg\nbdafge\nbdagef\nbdagfe\nbdeafg\nbdeagf\nbdefag\nbdefga\nbdegaf\nbdegfa\nbdfaeg\nbdfage\nbdfeag\nbdfega\nbdfgae\nbdfgea\nbdgaef\nbdgafe\nbdgeaf\nbdgefa\nbdgfae\nbdgfea\nbeadfg\nbeadgf\nbeafdg\nbeafgd\nbeagdf\nbeagfd\nbedafg\nbedagf\nbedfag\nbedfga\nbedgaf\nbedgfa\nbefadg\nbefagd\nbefdag\nbefdga\nbefgad\nbefgda\nbegadf\nbegafd\nbegdaf\nbegdfa\nbegfad\nbegfda\nbfadeg\nbfadge\nbfaedg\nbfaegd\nbfagde\nbfaged\nbfdaeg\nbfdage\nbfdeag\nbfdega\nbfdgae\nbfdgea\nbfeadg\nbfeagd\nbfedag\nbfedga\nbfegad\nbfegda\nbfgade\nbfgaed\nbfgdae\nbfgdea\nbfgead\nbfgeda\nbgadef\nbgadfe\nbgaedf\nbgaefd\nbgafde\nbgafed\nbgdaef\nbgdafe\nbgdeaf\nbgdefa\nbgdfae\nbgdfea\nbgeadf\nbgeafd\nbgedaf\nbgedfa\nbgefad\nbgefda\nbgfade\nbgfaed\nbgfdae\nbgfdea\nbgfead\nbgfeda\ndabefg\ndabegf\ndabfeg\ndabfge\ndabgef\ndabgfe\ndaebfg\ndaebgf\ndaefbg\ndaefgb\ndaegbf\ndaegfb\ndafbeg\ndafbge\ndafebg\ndafegb\ndafgbe\ndafgeb\ndagbef\ndagbfe\ndagebf\ndagefb\ndagfbe\ndagfeb\ndbaefg\ndbaegf\ndbafeg\ndbafge\ndbagef\ndbagfe\ndbeafg\ndbeagf\ndbefag\ndbefga\ndbegaf\ndbegfa\ndbfaeg\ndbfage\ndbfeag\ndbfega\ndbfgae\ndbfgea\ndbgaef\ndbgafe\ndbgeaf\ndbgefa\ndbgfae\ndbgfea\ndeabfg\ndeabgf\ndeafbg\ndeafgb\ndeagbf\ndeagfb\ndebafg\ndebagf\ndebfag\ndebfga\ndebgaf\ndebgfa\ndefabg\ndefagb\ndefbag\ndefbga\ndefgab\ndefgba\ndegabf\ndegafb\ndegbaf\ndegbfa\ndegfab\ndegfba\ndfabeg\ndfabge\ndfaebg\ndfaegb\ndfagbe\ndfageb\ndfbaeg\ndfbage\ndfbeag\ndfbega\ndfbgae\ndfbgea\ndfeabg\ndfeagb\ndfebag\ndfebga\ndfegab\ndfegba\ndfgabe\ndfgaeb\ndfgbae\ndfgbea\ndfgeab\ndfgeba\ndgabef\ndgabfe\ndgaebf\ndgaefb\ndgafbe\ndgafeb\ndgbaef\ndgbafe\ndgbeaf\ndgbefa\ndgbfae\ndgbfea\ndgeabf\ndgeafb\ndgebaf\ndgebfa\ndgefab\ndgefba\ndgfabe\ndgfaeb\ndgfbae\ndgfbea\ndgfeab\ndgfeba\neabdfg\neabdgf\neabfdg\neabfgd\neabgdf\neabgfd\neadbfg\neadbgf\neadfbg\neadfgb\neadgbf\neadgfb\neafbdg\neafbgd\neafdbg\neafdgb\neafgbd\neafgdb\neagbdf\neagbfd\neagdbf\neagdfb\neagfbd\neagfdb\nebadfg\nebadgf\nebafdg\nebafgd\nebagdf\nebagfd\nebdafg\nebdagf\nebdfag\nebdfga\nebdgaf\nebdgfa\nebfadg\nebfagd\nebfdag\nebfdga\nebfgad\nebfgda\nebgadf\nebgafd\nebgdaf\nebgdfa\nebgfad\nebgfda\nedabfg\nedabgf\nedafbg\nedafgb\nedagbf\nedagfb\nedbafg\nedbagf\nedbfag\nedbfga\nedbgaf\nedbgfa\nedfabg\nedfagb\nedfbag\nedfbga\nedfgab\nedfgba\nedgabf\nedgafb\nedgbaf\nedgbfa\nedgfab\nedgfba\nefabdg\nefabgd\nefadbg\nefadgb\nefagbd\nefagdb\nefbadg\nefbagd\nefbdag\nefbdga\nefbgad\nefbgda\nefdabg\nefdagb\nefdbag\nefdbga\nefdgab\nefdgba\nefgabd\nefgadb\nefgbad\nefgbda\nefgdab\nefgdba\negabdf\negabfd\negadbf\negadfb\negafbd\negafdb\negbadf\negbafd\negbdaf\negbdfa\negbfad\negbfda\negdabf\negdafb\negdbaf\negdbfa\negdfab\negdfba\negfabd\negfadb\negfbad\negfbda\negfdab\negfdba\nfabdeg\nfabdge\nfabedg\nfabegd\nfabgde\nfabged\nfadbeg\nfadbge\nfadebg\nfadegb\nfadgbe\nfadgeb\nfaebdg\nfaebgd\nfaedbg\nfaedgb\nfaegbd\nfaegdb\nfagbde\nfagbed\nfagdbe\nfagdeb\nfagebd\nfagedb\nfbadeg\nfbadge\nfbaedg\nfbaegd\nfbagde\nfbaged\nfbdaeg\nfbdage\nfbdeag\nfbdega\nfbdgae\nfbdgea\nfbeadg\nfbeagd\nfbedag\nfbedga\nfbegad\nfbegda\nfbgade\nfbgaed\nfbgdae\nfbgdea\nfbgead\nfbgeda\nfdabeg\nfdabge\nfdaebg\nfdaegb\nfdagbe\nfdageb\nfdbaeg\nfdbage\nfdbeag\nfdbega\nfdbgae\nfdbgea\nfdeabg\nfdeagb\nfdebag\nfdebga\nfdegab\nfdegba\nfdgabe\nfdgaeb\nfdgbae\nfdgbea\nfdgeab\nfdgeba\nfeabdg\nfeabgd\nfeadbg\nfeadgb\nfeagbd\nfeagdb\nfebadg\nfebagd\nfebdag\nfebdga\nfebgad\nfebgda\nfedabg\nfedagb\nfedbag\nfedbga\nfedgab\nfedgba\nfegabd\nfegadb\nfegbad\nfegbda\nfegdab\nfegdba\nfgabde\nfgabed\nfgadbe\nfgadeb\nfgaebd\nfgaedb\nfgbade\nfgbaed\nfgbdae\nfgbdea\nfgbead\nfgbeda\nfgdabe\nfgdaeb\nfgdbae\nfgdbea\nfgdeab\nfgdeba\nfgeabd\nfgeadb\nfgebad\nfgebda\nfgedab\nfgedba\ngabdef\ngabdfe\ngabedf\ngabefd\ngabfde\ngabfed\ngadbef\ngadbfe\ngadebf\ngadefb\ngadfbe\ngadfeb\ngaebdf\ngaebfd\ngaedbf\ngaedfb\ngaefbd\ngaefdb\ngafbde\ngafbed\ngafdbe\ngafdeb\ngafebd\ngafedb\ngbadef\ngbadfe\ngbaedf\ngbaefd\ngbafde\ngbafed\ngbdaef\ngbdafe\ngbdeaf\ngbdefa\ngbdfae\ngbdfea\ngbeadf\ngbeafd\ngbedaf\ngbedfa\ngbefad\ngbefda\ngbfade\ngbfaed\ngbfdae\ngbfdea\ngbfead\ngbfeda\ngdabef\ngdabfe\ngdaebf\ngdaefb\ngdafbe\ngdafeb\ngdbaef\ngdbafe\ngdbeaf\ngdbefa\ngdbfae\ngdbfea\ngdeabf\ngdeafb\ngdebaf\ngdebfa\ngdefab\ngdefba\ngdfabe\ngdfaeb\ngdfbae\ngdfbea\ngdfeab\ngdfeba\ngeabdf\ngeabfd\ngeadbf\ngeadfb\ngeafbd\ngeafdb\ngebadf\ngebafd\ngebdaf\ngebdfa\ngebfad\ngebfda\ngedabf\ngedafb\ngedbaf\ngedbfa\ngedfab\ngedfba\ngefabd\ngefadb\ngefbad\ngefbda\ngefdab\ngefdba\ngfabde\ngfabed\ngfadbe\ngfadeb\ngfaebd\ngfaedb\ngfbade\ngfbaed\ngfbdae\ngfbdea\ngfbead\ngfbeda\ngfdabe\ngfdaeb\ngfdbae\ngfdbea\ngfdeab\ngfdeba\ngfeabd\ngfeadb\ngfebad\ngfebda\ngfedab\ngfedba",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "e",
        "expectedOutput": "e",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bg",
        "expectedOutput": "bg\ngb",
        "isHidden": true
      }
    ]
  },
  "belt-3-q2-power-set": {
    "title": "Power set",
    "slug": "belt-3-q2-power-set",
    "id": "M6-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-10 -7 20",
        "expectedOutput": "EMPTY\n-10\n-7\n-10 -7\n20\n-10 20\n-7 20\n-10 -7 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-8 13 14",
        "expectedOutput": "EMPTY\n-8\n13\n-8 13\n14\n-8 14\n13 14\n-8 13 14",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n20",
        "expectedOutput": "EMPTY\n20",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n-2 11 20",
        "expectedOutput": "EMPTY\n-2\n11\n-2 11\n20\n-2 20\n11 20\n-2 11 20",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n7",
        "expectedOutput": "EMPTY\n7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n4 6 15",
        "expectedOutput": "EMPTY\n4\n6\n4 6\n15\n4 15\n6 15\n4 6 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n13 15 18 19",
        "expectedOutput": "EMPTY\n13\n15\n13 15\n18\n13 18\n15 18\n13 15 18\n19\n13 19\n15 19\n13 15 19\n18 19\n13 18 19\n15 18 19\n13 15 18 19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-4 5 13 14",
        "expectedOutput": "EMPTY\n-4\n5\n-4 5\n13\n-4 13\n5 13\n-4 5 13\n14\n-4 14\n5 14\n-4 5 14\n13 14\n-4 13 14\n5 13 14\n-4 5 13 14",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-7 7 16 19",
        "expectedOutput": "EMPTY\n-7\n7\n-7 7\n16\n-7 16\n7 16\n-7 7 16\n19\n-7 19\n7 19\n-7 7 19\n16 19\n-7 16 19\n7 16 19\n-7 7 16 19",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n-9 -1 8 13 15",
        "expectedOutput": "EMPTY\n-9\n-1\n-9 -1\n8\n-9 8\n-1 8\n-9 -1 8\n13\n-9 13\n-1 13\n-9 -1 13\n8 13\n-9 8 13\n-1 8 13\n-9 -1 8 13\n15\n-9 15\n-1 15\n-9 -1 15\n8 15\n-9 8 15\n-1 8 15\n-9 -1 8 15\n13 15\n-9 13 15\n-1 13 15\n-9 -1 13 15\n8 13 15\n-9 8 13 15\n-1 8 13 15\n-9 -1 8 13 15",
        "isHidden": true
      }
    ]
  },
  "belt-3-q2-sum-of-array-elements": {
    "title": "Power set",
    "slug": "belt-3-q2-power-set",
    "id": "M6-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-10 -7 20",
        "expectedOutput": "EMPTY\n-10\n-7\n-10 -7\n20\n-10 20\n-7 20\n-10 -7 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-8 13 14",
        "expectedOutput": "EMPTY\n-8\n13\n-8 13\n14\n-8 14\n13 14\n-8 13 14",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n20",
        "expectedOutput": "EMPTY\n20",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n-2 11 20",
        "expectedOutput": "EMPTY\n-2\n11\n-2 11\n20\n-2 20\n11 20\n-2 11 20",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n7",
        "expectedOutput": "EMPTY\n7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n4 6 15",
        "expectedOutput": "EMPTY\n4\n6\n4 6\n15\n4 15\n6 15\n4 6 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n13 15 18 19",
        "expectedOutput": "EMPTY\n13\n15\n13 15\n18\n13 18\n15 18\n13 15 18\n19\n13 19\n15 19\n13 15 19\n18 19\n13 18 19\n15 18 19\n13 15 18 19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-4 5 13 14",
        "expectedOutput": "EMPTY\n-4\n5\n-4 5\n13\n-4 13\n5 13\n-4 5 13\n14\n-4 14\n5 14\n-4 5 14\n13 14\n-4 13 14\n5 13 14\n-4 5 13 14",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-7 7 16 19",
        "expectedOutput": "EMPTY\n-7\n7\n-7 7\n16\n-7 16\n7 16\n-7 7 16\n19\n-7 19\n7 19\n-7 7 19\n16 19\n-7 16 19\n7 16 19\n-7 7 16 19",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n-9 -1 8 13 15",
        "expectedOutput": "EMPTY\n-9\n-1\n-9 -1\n8\n-9 8\n-1 8\n-9 -1 8\n13\n-9 13\n-1 13\n-9 -1 13\n8 13\n-9 8 13\n-1 8 13\n-9 -1 8 13\n15\n-9 15\n-1 15\n-9 -1 15\n8 15\n-9 8 15\n-1 8 15\n-9 -1 8 15\n13 15\n-9 13 15\n-1 13 15\n-9 -1 13 15\n8 13 15\n-9 8 13 15\n-1 8 13 15\n-9 -1 8 13 15",
        "isHidden": true
      }
    ]
  },
  "M6-LU8": {
    "title": "Power set",
    "slug": "belt-3-q2-power-set",
    "id": "M6-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-10 -7 20",
        "expectedOutput": "EMPTY\n-10\n-7\n-10 -7\n20\n-10 20\n-7 20\n-10 -7 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-8 13 14",
        "expectedOutput": "EMPTY\n-8\n13\n-8 13\n14\n-8 14\n13 14\n-8 13 14",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n20",
        "expectedOutput": "EMPTY\n20",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n-2 11 20",
        "expectedOutput": "EMPTY\n-2\n11\n-2 11\n20\n-2 20\n11 20\n-2 11 20",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n7",
        "expectedOutput": "EMPTY\n7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n4 6 15",
        "expectedOutput": "EMPTY\n4\n6\n4 6\n15\n4 15\n6 15\n4 6 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n13 15 18 19",
        "expectedOutput": "EMPTY\n13\n15\n13 15\n18\n13 18\n15 18\n13 15 18\n19\n13 19\n15 19\n13 15 19\n18 19\n13 18 19\n15 18 19\n13 15 18 19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-4 5 13 14",
        "expectedOutput": "EMPTY\n-4\n5\n-4 5\n13\n-4 13\n5 13\n-4 5 13\n14\n-4 14\n5 14\n-4 5 14\n13 14\n-4 13 14\n5 13 14\n-4 5 13 14",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-7 7 16 19",
        "expectedOutput": "EMPTY\n-7\n7\n-7 7\n16\n-7 16\n7 16\n-7 7 16\n19\n-7 19\n7 19\n-7 7 19\n16 19\n-7 16 19\n7 16 19\n-7 7 16 19",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n-9 -1 8 13 15",
        "expectedOutput": "EMPTY\n-9\n-1\n-9 -1\n8\n-9 8\n-1 8\n-9 -1 8\n13\n-9 13\n-1 13\n-9 -1 13\n8 13\n-9 8 13\n-1 8 13\n-9 -1 8 13\n15\n-9 15\n-1 15\n-9 -1 15\n8 15\n-9 8 15\n-1 8 15\n-9 -1 8 15\n13 15\n-9 13 15\n-1 13 15\n-9 -1 13 15\n8 13 15\n-9 8 13 15\n-1 8 13 15\n-9 -1 8 13 15",
        "isHidden": true
      }
    ]
  },
  "m6-lu8": {
    "title": "Power set",
    "slug": "belt-3-q2-power-set",
    "id": "M6-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-10 -7 20",
        "expectedOutput": "EMPTY\n-10\n-7\n-10 -7\n20\n-10 20\n-7 20\n-10 -7 20",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n-8 13 14",
        "expectedOutput": "EMPTY\n-8\n13\n-8 13\n14\n-8 14\n13 14\n-8 13 14",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n20",
        "expectedOutput": "EMPTY\n20",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n-2 11 20",
        "expectedOutput": "EMPTY\n-2\n11\n-2 11\n20\n-2 20\n11 20\n-2 11 20",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\n7",
        "expectedOutput": "EMPTY\n7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n4 6 15",
        "expectedOutput": "EMPTY\n4\n6\n4 6\n15\n4 15\n6 15\n4 6 15",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n13 15 18 19",
        "expectedOutput": "EMPTY\n13\n15\n13 15\n18\n13 18\n15 18\n13 15 18\n19\n13 19\n15 19\n13 15 19\n18 19\n13 18 19\n15 18 19\n13 15 18 19",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n-4 5 13 14",
        "expectedOutput": "EMPTY\n-4\n5\n-4 5\n13\n-4 13\n5 13\n-4 5 13\n14\n-4 14\n5 14\n-4 5 14\n13 14\n-4 13 14\n5 13 14\n-4 5 13 14",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n-7 7 16 19",
        "expectedOutput": "EMPTY\n-7\n7\n-7 7\n16\n-7 16\n7 16\n-7 7 16\n19\n-7 19\n7 19\n-7 7 19\n16 19\n-7 16 19\n7 16 19\n-7 7 16 19",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n-9 -1 8 13 15",
        "expectedOutput": "EMPTY\n-9\n-1\n-9 -1\n8\n-9 8\n-1 8\n-9 -1 8\n13\n-9 13\n-1 13\n-9 -1 13\n8 13\n-9 8 13\n-1 8 13\n-9 -1 8 13\n15\n-9 15\n-1 15\n-9 -1 15\n8 15\n-9 8 15\n-1 8 15\n-9 -1 8 15\n13 15\n-9 13 15\n-1 13 15\n-9 -1 13 15\n8 13 15\n-9 8 13 15\n-1 8 13 15\n-9 -1 8 13 15",
        "isHidden": true
      }
    ]
  },
  "belt-3-q3-recursion-depth-and-stack-limits": {
    "title": "Recursion depth and stack limits",
    "slug": "belt-3-q3-recursion-depth-and-stack-limits",
    "id": "M6-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-3",
        "expectedOutput": "-19683",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-5",
        "expectedOutput": "625",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4",
        "expectedOutput": "1048576",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-2",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "64",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "-16384",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5",
        "expectedOutput": "625",
        "isHidden": true
      }
    ]
  },
  "belt-3-q3-find-the-largest-array-element": {
    "title": "Recursion depth and stack limits",
    "slug": "belt-3-q3-recursion-depth-and-stack-limits",
    "id": "M6-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-3",
        "expectedOutput": "-19683",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-5",
        "expectedOutput": "625",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4",
        "expectedOutput": "1048576",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-2",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "64",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "-16384",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5",
        "expectedOutput": "625",
        "isHidden": true
      }
    ]
  },
  "M6-LU9": {
    "title": "Recursion depth and stack limits",
    "slug": "belt-3-q3-recursion-depth-and-stack-limits",
    "id": "M6-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-3",
        "expectedOutput": "-19683",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-5",
        "expectedOutput": "625",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4",
        "expectedOutput": "1048576",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-2",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "64",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "-16384",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5",
        "expectedOutput": "625",
        "isHidden": true
      }
    ]
  },
  "m6-lu9": {
    "title": "Recursion depth and stack limits",
    "slug": "belt-3-q3-recursion-depth-and-stack-limits",
    "id": "M6-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "-3",
        "expectedOutput": "-19683",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "-1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "-5",
        "expectedOutput": "625",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4",
        "expectedOutput": "1048576",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "-2",
        "expectedOutput": "-128",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3",
        "expectedOutput": "27",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2",
        "expectedOutput": "64",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "-4",
        "expectedOutput": "-16384",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5",
        "expectedOutput": "625",
        "isHidden": true
      }
    ]
  },
  "belt-3-q4-duplicate-handling": {
    "title": "Duplicate handling",
    "slug": "belt-3-q4-duplicate-handling",
    "id": "M6-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0 3",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n0 1 2 3",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 2 2 3",
        "expectedOutput": "12",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 1 2 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 1",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n0 0 0 0 2 2 3",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n0 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "0\n",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n0 0 3",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-3-q4-find-the-smallest-array-element": {
    "title": "Duplicate handling",
    "slug": "belt-3-q4-duplicate-handling",
    "id": "M6-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0 3",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n0 1 2 3",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 2 2 3",
        "expectedOutput": "12",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 1 2 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 1",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n0 0 0 0 2 2 3",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n0 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "0\n",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n0 0 3",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "M6-LU10": {
    "title": "Duplicate handling",
    "slug": "belt-3-q4-duplicate-handling",
    "id": "M6-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0 3",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n0 1 2 3",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 2 2 3",
        "expectedOutput": "12",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 1 2 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 1",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n0 0 0 0 2 2 3",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n0 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "0\n",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n0 0 3",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "m6-lu10": {
    "title": "Duplicate handling",
    "slug": "belt-3-q4-duplicate-handling",
    "id": "M6-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0 3",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n0 1 2 3",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n1 2 2 3",
        "expectedOutput": "12",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 1 2 2",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n0 1",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n0 0 0 0 2 2 3",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n0 0",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "0\n",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n0 0 3",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-3-q5-binary-search": {
    "title": "Binary search",
    "slug": "belt-3-q5-binary-search",
    "id": "M7-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n7\n5 15",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n16\n0 8 11 12 13 22",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n20\n0 3 5 8 10 20 21 25 28 30",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n14\n6 8 20",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n14\n10 14 25 28",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n12\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n10\n6 13 16 18 28 29",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n9\n10 16 22 26 28 28",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n12\n1 15",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n17\n4 5 5 9 18 22",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q5-count-even-elements": {
    "title": "Binary search",
    "slug": "belt-3-q5-binary-search",
    "id": "M7-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n7\n5 15",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n16\n0 8 11 12 13 22",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n20\n0 3 5 8 10 20 21 25 28 30",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n14\n6 8 20",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n14\n10 14 25 28",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n12\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n10\n6 13 16 18 28 29",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n9\n10 16 22 26 28 28",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n12\n1 15",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n17\n4 5 5 9 18 22",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ]
  },
  "M7-LU1": {
    "title": "Binary search",
    "slug": "belt-3-q5-binary-search",
    "id": "M7-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n7\n5 15",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n16\n0 8 11 12 13 22",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n20\n0 3 5 8 10 20 21 25 28 30",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n14\n6 8 20",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n14\n10 14 25 28",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n12\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n10\n6 13 16 18 28 29",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n9\n10 16 22 26 28 28",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n12\n1 15",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n17\n4 5 5 9 18 22",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ]
  },
  "m7-lu1": {
    "title": "Binary search",
    "slug": "belt-3-q5-binary-search",
    "id": "M7-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n7\n5 15",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n16\n0 8 11 12 13 22",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "10\n20\n0 3 5 8 10 20 21 25 28 30",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n14\n6 8 20",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n14\n10 14 25 28",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n12\n11",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n10\n6 13 16 18 28 29",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n9\n10 16 22 26 28 28",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n12\n1 15",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n17\n4 5 5 9 18 22",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q6-bounds": {
    "title": "Bounds",
    "slug": "belt-3-q6-bounds",
    "id": "M7-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n5\n2 8",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n3\n0 2 3 5 6 6 7 8",
        "expectedOutput": "2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n2 7",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n2\n0 0 1 1 2 2 5 7 8",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n6\n0 0 2 3 3 5 5 6 6 7",
        "expectedOutput": "7 8",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n4\n0 0 0 1 2 3 4 5",
        "expectedOutput": "6 6",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n5\n0 2 2 3 5 5 6",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0\n0 0 5 6 6 6 7 8",
        "expectedOutput": "0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n2\n0 1 3 3 5 8 8",
        "expectedOutput": "-1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n0 0 0 2 3 4 4 5 5 7",
        "expectedOutput": "-1 -1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q6-count-odd-elements": {
    "title": "Bounds",
    "slug": "belt-3-q6-bounds",
    "id": "M7-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n5\n2 8",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n3\n0 2 3 5 6 6 7 8",
        "expectedOutput": "2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n2 7",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n2\n0 0 1 1 2 2 5 7 8",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n6\n0 0 2 3 3 5 5 6 6 7",
        "expectedOutput": "7 8",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n4\n0 0 0 1 2 3 4 5",
        "expectedOutput": "6 6",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n5\n0 2 2 3 5 5 6",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0\n0 0 5 6 6 6 7 8",
        "expectedOutput": "0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n2\n0 1 3 3 5 8 8",
        "expectedOutput": "-1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n0 0 0 2 3 4 4 5 5 7",
        "expectedOutput": "-1 -1",
        "isHidden": true
      }
    ]
  },
  "M7-LU2": {
    "title": "Bounds",
    "slug": "belt-3-q6-bounds",
    "id": "M7-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n5\n2 8",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n3\n0 2 3 5 6 6 7 8",
        "expectedOutput": "2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n2 7",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n2\n0 0 1 1 2 2 5 7 8",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n6\n0 0 2 3 3 5 5 6 6 7",
        "expectedOutput": "7 8",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n4\n0 0 0 1 2 3 4 5",
        "expectedOutput": "6 6",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n5\n0 2 2 3 5 5 6",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0\n0 0 5 6 6 6 7 8",
        "expectedOutput": "0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n2\n0 1 3 3 5 8 8",
        "expectedOutput": "-1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n0 0 0 2 3 4 4 5 5 7",
        "expectedOutput": "-1 -1",
        "isHidden": true
      }
    ]
  },
  "m7-lu2": {
    "title": "Bounds",
    "slug": "belt-3-q6-bounds",
    "id": "M7-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n5\n2 8",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n3\n0 2 3 5 6 6 7 8",
        "expectedOutput": "2 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n2 7",
        "expectedOutput": "-1 -1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n2\n0 0 1 1 2 2 5 7 8",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n6\n0 0 2 3 3 5 5 6 6 7",
        "expectedOutput": "7 8",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n4\n0 0 0 1 2 3 4 5",
        "expectedOutput": "6 6",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n5\n0 2 2 3 5 5 6",
        "expectedOutput": "4 5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n0\n0 0 5 6 6 6 7 8",
        "expectedOutput": "0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n2\n0 1 3 3 5 8 8",
        "expectedOutput": "-1 -1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "10\n8\n0 0 0 2 3 4 4 5 5 7",
        "expectedOutput": "-1 -1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q7-binary-search-on-answer-space": {
    "title": "Binary search on answer space",
    "slug": "belt-3-q7-binary-search-on-answer-space",
    "id": "M7-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n15 16 11",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2\n16 3 4 11 18 3 7",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n3 5 11 12",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n1\n11 1 3 17 7 18",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n4\n12 18",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n1\n18 5 19 16 8",
        "expectedOutput": "66",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n4\n5 8 16 17 10 3 4 7",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4\n1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n2 20 16 8 1 20 10",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1\n9 17 7 13",
        "expectedOutput": "46",
        "isHidden": true
      }
    ]
  },
  "belt-3-q7-calculate-array-average": {
    "title": "Binary search on answer space",
    "slug": "belt-3-q7-binary-search-on-answer-space",
    "id": "M7-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n15 16 11",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2\n16 3 4 11 18 3 7",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n3 5 11 12",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n1\n11 1 3 17 7 18",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n4\n12 18",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n1\n18 5 19 16 8",
        "expectedOutput": "66",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n4\n5 8 16 17 10 3 4 7",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4\n1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n2 20 16 8 1 20 10",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1\n9 17 7 13",
        "expectedOutput": "46",
        "isHidden": true
      }
    ]
  },
  "M7-LU3": {
    "title": "Binary search on answer space",
    "slug": "belt-3-q7-binary-search-on-answer-space",
    "id": "M7-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n15 16 11",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2\n16 3 4 11 18 3 7",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n3 5 11 12",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n1\n11 1 3 17 7 18",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n4\n12 18",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n1\n18 5 19 16 8",
        "expectedOutput": "66",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n4\n5 8 16 17 10 3 4 7",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4\n1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n2 20 16 8 1 20 10",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1\n9 17 7 13",
        "expectedOutput": "46",
        "isHidden": true
      }
    ]
  },
  "m7-lu3": {
    "title": "Binary search on answer space",
    "slug": "belt-3-q7-binary-search-on-answer-space",
    "id": "M7-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n15 16 11",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n2\n16 3 4 11 18 3 7",
        "expectedOutput": "34",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n3 5 11 12",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n1\n11 1 3 17 7 18",
        "expectedOutput": "57",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n4\n12 18",
        "expectedOutput": "18",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n1\n18 5 19 16 8",
        "expectedOutput": "66",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "8\n4\n5 8 16 17 10 3 4 7",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n4\n1 4",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n2 20 16 8 1 20 10",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1\n9 17 7 13",
        "expectedOutput": "46",
        "isHidden": true
      }
    ]
  },
  "belt-3-q8-greedy-algorithms": {
    "title": "Greedy algorithms",
    "slug": "belt-3-q8-greedy-algorithms",
    "id": "M7-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17 19\n20 24",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n3 8\n9 10\n15 16\n19 26\n21 23",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n5 7\n19 26",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2 5\n3 8\n4 12\n11 19\n17 18\n23 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n3 7\n9 16\n17 25\n19 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n6 7\n14 15\n23 29",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n10 13\n16 22",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n1 8\n7 11\n9 15\n10 17\n12 15\n15 16\n19 20\n21 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1 9\n3 9\n5 8\n9 10\n10 14\n11 13\n15 19\n24 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n10 16\n17 22\n19 25\n24 27",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "belt-3-q8-reverse-an-array": {
    "title": "Greedy algorithms",
    "slug": "belt-3-q8-greedy-algorithms",
    "id": "M7-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17 19\n20 24",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n3 8\n9 10\n15 16\n19 26\n21 23",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n5 7\n19 26",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2 5\n3 8\n4 12\n11 19\n17 18\n23 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n3 7\n9 16\n17 25\n19 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n6 7\n14 15\n23 29",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n10 13\n16 22",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n1 8\n7 11\n9 15\n10 17\n12 15\n15 16\n19 20\n21 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1 9\n3 9\n5 8\n9 10\n10 14\n11 13\n15 19\n24 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n10 16\n17 22\n19 25\n24 27",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "M7-LU4": {
    "title": "Greedy algorithms",
    "slug": "belt-3-q8-greedy-algorithms",
    "id": "M7-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17 19\n20 24",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n3 8\n9 10\n15 16\n19 26\n21 23",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n5 7\n19 26",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2 5\n3 8\n4 12\n11 19\n17 18\n23 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n3 7\n9 16\n17 25\n19 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n6 7\n14 15\n23 29",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n10 13\n16 22",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n1 8\n7 11\n9 15\n10 17\n12 15\n15 16\n19 20\n21 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1 9\n3 9\n5 8\n9 10\n10 14\n11 13\n15 19\n24 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n10 16\n17 22\n19 25\n24 27",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "m7-lu4": {
    "title": "Greedy algorithms",
    "slug": "belt-3-q8-greedy-algorithms",
    "id": "M7-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n17 19\n20 24",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n3 8\n9 10\n15 16\n19 26\n21 23",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n5 7\n19 26",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2 5\n3 8\n4 12\n11 19\n17 18\n23 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n3 7\n9 16\n17 25\n19 27",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n6 7\n14 15\n23 29",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n10 13\n16 22",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "8\n1 8\n7 11\n9 15\n10 17\n12 15\n15 16\n19 20\n21 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n1 9\n3 9\n5 8\n9 10\n10 14\n11 13\n15 19\n24 27",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n10 16\n17 22\n19 25\n24 27",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  "belt-3-q9-feasibility-and-optimization-checks": {
    "title": "Feasibility and optimization checks",
    "slug": "belt-3-q9-feasibility-and-optimization-checks",
    "id": "M7-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n2\n2 14",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n10 12 14 19 24 30 33",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 11 21 33",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n2\n5 15",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n2\n11 24",
        "expectedOutput": "13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 24 27 35",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n2\n2 3 13 18 19 31 37",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n16 27 37",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n10 11 12 15 18 19 32",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n6\n0 4 8 15 16 25 34 36",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q9-search-for-an-element": {
    "title": "Feasibility and optimization checks",
    "slug": "belt-3-q9-feasibility-and-optimization-checks",
    "id": "M7-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n2\n2 14",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n10 12 14 19 24 30 33",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 11 21 33",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n2\n5 15",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n2\n11 24",
        "expectedOutput": "13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 24 27 35",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n2\n2 3 13 18 19 31 37",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n16 27 37",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n10 11 12 15 18 19 32",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n6\n0 4 8 15 16 25 34 36",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "M7-LU5": {
    "title": "Feasibility and optimization checks",
    "slug": "belt-3-q9-feasibility-and-optimization-checks",
    "id": "M7-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n2\n2 14",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n10 12 14 19 24 30 33",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 11 21 33",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n2\n5 15",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n2\n11 24",
        "expectedOutput": "13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 24 27 35",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n2\n2 3 13 18 19 31 37",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n16 27 37",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n10 11 12 15 18 19 32",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n6\n0 4 8 15 16 25 34 36",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "m7-lu5": {
    "title": "Feasibility and optimization checks",
    "slug": "belt-3-q9-feasibility-and-optimization-checks",
    "id": "M7-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n2\n2 14",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n6\n10 12 14 19 24 30 33",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 11 21 33",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n2\n5 15",
        "expectedOutput": "10",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n2\n11 24",
        "expectedOutput": "13",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 24 27 35",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n2\n2 3 13 18 19 31 37",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n16 27 37",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n3\n10 11 12 15 18 19 32",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n6\n0 4 8 15 16 25 34 36",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q10-tree-representations": {
    "title": "Tree representations",
    "slug": "belt-3-q10-tree-representations",
    "id": "M8-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-1 0 1",
        "expectedOutput": "0: 1\n1: 2\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-1 0 0 0 2 0 3",
        "expectedOutput": "0: 1 2 3 5\n1: EMPTY\n2: 4\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 0",
        "expectedOutput": "0: 1\n1: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n-1 0 1 2 1 2 3",
        "expectedOutput": "0: 1\n1: 2 4\n2: 3 5\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n-1 0 1 0 1 4 3 1",
        "expectedOutput": "0: 1 3\n1: 2 4 7\n2: EMPTY\n3: 6\n4: 5\n5: EMPTY\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n-1 0 1 1 1 0 3 5",
        "expectedOutput": "0: 1 5\n1: 2 3 4\n2: EMPTY\n3: 6\n4: EMPTY\n5: 7\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n-1 0 1 1 3",
        "expectedOutput": "0: 1\n1: 2 3\n2: EMPTY\n3: 4\n4: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-1 0 0 2 0 4",
        "expectedOutput": "0: 1 2 4\n1: EMPTY\n2: 3\n3: EMPTY\n4: 5\n5: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n-1 0 0 1 1 4 4",
        "expectedOutput": "0: 1 2\n1: 3 4\n2: EMPTY\n3: EMPTY\n4: 5 6\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 0 1 0 3 3",
        "expectedOutput": "0: 1 3\n1: 2\n2: EMPTY\n3: 4 5\n4: EMPTY\n5: EMPTY",
        "isHidden": true
      }
    ]
  },
  "belt-3-q10-find-position-of-an-element": {
    "title": "Tree representations",
    "slug": "belt-3-q10-tree-representations",
    "id": "M8-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-1 0 1",
        "expectedOutput": "0: 1\n1: 2\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-1 0 0 0 2 0 3",
        "expectedOutput": "0: 1 2 3 5\n1: EMPTY\n2: 4\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 0",
        "expectedOutput": "0: 1\n1: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n-1 0 1 2 1 2 3",
        "expectedOutput": "0: 1\n1: 2 4\n2: 3 5\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n-1 0 1 0 1 4 3 1",
        "expectedOutput": "0: 1 3\n1: 2 4 7\n2: EMPTY\n3: 6\n4: 5\n5: EMPTY\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n-1 0 1 1 1 0 3 5",
        "expectedOutput": "0: 1 5\n1: 2 3 4\n2: EMPTY\n3: 6\n4: EMPTY\n5: 7\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n-1 0 1 1 3",
        "expectedOutput": "0: 1\n1: 2 3\n2: EMPTY\n3: 4\n4: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-1 0 0 2 0 4",
        "expectedOutput": "0: 1 2 4\n1: EMPTY\n2: 3\n3: EMPTY\n4: 5\n5: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n-1 0 0 1 1 4 4",
        "expectedOutput": "0: 1 2\n1: 3 4\n2: EMPTY\n3: EMPTY\n4: 5 6\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 0 1 0 3 3",
        "expectedOutput": "0: 1 3\n1: 2\n2: EMPTY\n3: 4 5\n4: EMPTY\n5: EMPTY",
        "isHidden": true
      }
    ]
  },
  "M8-LU1": {
    "title": "Tree representations",
    "slug": "belt-3-q10-tree-representations",
    "id": "M8-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-1 0 1",
        "expectedOutput": "0: 1\n1: 2\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-1 0 0 0 2 0 3",
        "expectedOutput": "0: 1 2 3 5\n1: EMPTY\n2: 4\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 0",
        "expectedOutput": "0: 1\n1: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n-1 0 1 2 1 2 3",
        "expectedOutput": "0: 1\n1: 2 4\n2: 3 5\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n-1 0 1 0 1 4 3 1",
        "expectedOutput": "0: 1 3\n1: 2 4 7\n2: EMPTY\n3: 6\n4: 5\n5: EMPTY\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n-1 0 1 1 1 0 3 5",
        "expectedOutput": "0: 1 5\n1: 2 3 4\n2: EMPTY\n3: 6\n4: EMPTY\n5: 7\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n-1 0 1 1 3",
        "expectedOutput": "0: 1\n1: 2 3\n2: EMPTY\n3: 4\n4: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-1 0 0 2 0 4",
        "expectedOutput": "0: 1 2 4\n1: EMPTY\n2: 3\n3: EMPTY\n4: 5\n5: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n-1 0 0 1 1 4 4",
        "expectedOutput": "0: 1 2\n1: 3 4\n2: EMPTY\n3: EMPTY\n4: 5 6\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 0 1 0 3 3",
        "expectedOutput": "0: 1 3\n1: 2\n2: EMPTY\n3: 4 5\n4: EMPTY\n5: EMPTY",
        "isHidden": true
      }
    ]
  },
  "m8-lu1": {
    "title": "Tree representations",
    "slug": "belt-3-q10-tree-representations",
    "id": "M8-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n-1 0 1",
        "expectedOutput": "0: 1\n1: 2\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n-1 0 0 0 2 0 3",
        "expectedOutput": "0: 1 2 3 5\n1: EMPTY\n2: 4\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n-1 0",
        "expectedOutput": "0: 1\n1: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n-1 0 1 2 1 2 3",
        "expectedOutput": "0: 1\n1: 2 4\n2: 3 5\n3: 6\n4: EMPTY\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n-1 0 1 0 1 4 3 1",
        "expectedOutput": "0: 1 3\n1: 2 4 7\n2: EMPTY\n3: 6\n4: 5\n5: EMPTY\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "8\n-1 0 1 1 1 0 3 5",
        "expectedOutput": "0: 1 5\n1: 2 3 4\n2: EMPTY\n3: 6\n4: EMPTY\n5: 7\n6: EMPTY\n7: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n-1 0 1 1 3",
        "expectedOutput": "0: 1\n1: 2 3\n2: EMPTY\n3: 4\n4: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n-1 0 0 2 0 4",
        "expectedOutput": "0: 1 2 4\n1: EMPTY\n2: 3\n3: EMPTY\n4: 5\n5: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n-1 0 0 1 1 4 4",
        "expectedOutput": "0: 1 2\n1: 3 4\n2: EMPTY\n3: EMPTY\n4: 5 6\n5: EMPTY\n6: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n-1 0 1 0 3 3",
        "expectedOutput": "0: 1 3\n1: 2\n2: EMPTY\n3: 4 5\n4: EMPTY\n5: EMPTY",
        "isHidden": true
      }
    ]
  },
  "belt-3-q11-tree-properties": {
    "title": "Tree properties",
    "slug": "belt-3-q11-tree-properties",
    "id": "M8-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1 2 3",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 3 4",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-3-q11-count-occurrences-of-an-element": {
    "title": "Tree properties",
    "slug": "belt-3-q11-tree-properties",
    "id": "M8-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1 2 3",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 3 4",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "M8-LU2": {
    "title": "Tree properties",
    "slug": "belt-3-q11-tree-properties",
    "id": "M8-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1 2 3",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 3 4",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "m8-lu2": {
    "title": "Tree properties",
    "slug": "belt-3-q11-tree-properties",
    "id": "M8-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1 2 3",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1 2",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n1 2 3 4",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  "belt-3-q12-bfs": {
    "title": "BFS",
    "slug": "belt-3-q12-bfs",
    "id": "M8-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 3 4 5 6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 3 4 5 6 7 8 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 3 4 5 6 7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 3 4 5 6 7 8",
        "isHidden": true
      }
    ]
  },
  "belt-3-q12-replace-an-element": {
    "title": "BFS",
    "slug": "belt-3-q12-bfs",
    "id": "M8-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 3 4 5 6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 3 4 5 6 7 8 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 3 4 5 6 7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 3 4 5 6 7 8",
        "isHidden": true
      }
    ]
  },
  "M8-LU3": {
    "title": "BFS",
    "slug": "belt-3-q12-bfs",
    "id": "M8-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 3 4 5 6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 3 4 5 6 7 8 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 3 4 5 6 7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 3 4 5 6 7 8",
        "isHidden": true
      }
    ]
  },
  "m8-lu3": {
    "title": "BFS",
    "slug": "belt-3-q12-bfs",
    "id": "M8-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 3 4 5 6",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 3 4 5 6 7 8 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 3 4 5 6 7",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 3 4 5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 3 4 5 6 7 8",
        "isHidden": true
      }
    ]
  },
  "belt-3-q13-dfs": {
    "title": "DFS",
    "slug": "belt-3-q13-dfs",
    "id": "M8-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 4 8 5 3 6 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 4 3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 4 5 3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 4 8 9 5 10 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 4 5 3 6",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 4 8 9 5 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 4 5 3 6 7",
        "isHidden": true
      }
    ]
  },
  "belt-3-q13-copy-an-array": {
    "title": "DFS",
    "slug": "belt-3-q13-dfs",
    "id": "M8-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 4 8 5 3 6 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 4 3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 4 5 3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 4 8 9 5 10 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 4 5 3 6",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 4 8 9 5 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 4 5 3 6 7",
        "isHidden": true
      }
    ]
  },
  "M8-LU4": {
    "title": "DFS",
    "slug": "belt-3-q13-dfs",
    "id": "M8-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 4 8 5 3 6 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 4 3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 4 5 3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 4 8 9 5 10 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 4 5 3 6",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 4 8 9 5 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 4 5 3 6 7",
        "isHidden": true
      }
    ]
  },
  "m8-lu4": {
    "title": "DFS",
    "slug": "belt-3-q13-dfs",
    "id": "M8-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "1 2 4 8 5 3 6 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n1 2 3 4",
        "expectedOutput": "1 2 4 3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "1 2 4 5 3",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1 2",
        "expectedOutput": "1 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "1 2 4 8 9 5 10 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "1 2 4 5 3 6",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n1 2 3",
        "expectedOutput": "1 2 3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "1 2 4 8 9 5 3 6 7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "1 2 4 5 3 6 7",
        "isHidden": true
      }
    ]
  },
  "belt-3-q14-bst-operations": {
    "title": "BST operations",
    "slug": "belt-3-q14-bst-operations",
    "id": "M8-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n9 19 31 -10 -8 -9",
        "expectedOutput": "-10 -9 -8 9 19 31",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n-3 -6 22 3 14",
        "expectedOutput": "-6 -3 3 14 22",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n17",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0 13 -7 4 3",
        "expectedOutput": "-7 0 3 4 13",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n21 -15",
        "expectedOutput": "-15 21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n13 37 -25 7 -27 39",
        "expectedOutput": "-27 -25 7 13 37 39",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-27 -18",
        "expectedOutput": "-27 -18",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n35 20 11 -29 29 12",
        "expectedOutput": "-29 11 12 20 29 35",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-17 -8 5 29 -20 -5 27 -29",
        "expectedOutput": "-29 -20 -17 -8 -5 5 27 29",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n27 20 2",
        "expectedOutput": "2 20 27",
        "isHidden": true
      }
    ]
  },
  "belt-3-q14-find-the-second-largest-element": {
    "title": "BST operations",
    "slug": "belt-3-q14-bst-operations",
    "id": "M8-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n9 19 31 -10 -8 -9",
        "expectedOutput": "-10 -9 -8 9 19 31",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n-3 -6 22 3 14",
        "expectedOutput": "-6 -3 3 14 22",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n17",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0 13 -7 4 3",
        "expectedOutput": "-7 0 3 4 13",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n21 -15",
        "expectedOutput": "-15 21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n13 37 -25 7 -27 39",
        "expectedOutput": "-27 -25 7 13 37 39",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-27 -18",
        "expectedOutput": "-27 -18",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n35 20 11 -29 29 12",
        "expectedOutput": "-29 11 12 20 29 35",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-17 -8 5 29 -20 -5 27 -29",
        "expectedOutput": "-29 -20 -17 -8 -5 5 27 29",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n27 20 2",
        "expectedOutput": "2 20 27",
        "isHidden": true
      }
    ]
  },
  "M8-LU5": {
    "title": "BST operations",
    "slug": "belt-3-q14-bst-operations",
    "id": "M8-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n9 19 31 -10 -8 -9",
        "expectedOutput": "-10 -9 -8 9 19 31",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n-3 -6 22 3 14",
        "expectedOutput": "-6 -3 3 14 22",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n17",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0 13 -7 4 3",
        "expectedOutput": "-7 0 3 4 13",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n21 -15",
        "expectedOutput": "-15 21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n13 37 -25 7 -27 39",
        "expectedOutput": "-27 -25 7 13 37 39",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-27 -18",
        "expectedOutput": "-27 -18",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n35 20 11 -29 29 12",
        "expectedOutput": "-29 11 12 20 29 35",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-17 -8 5 29 -20 -5 27 -29",
        "expectedOutput": "-29 -20 -17 -8 -5 5 27 29",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n27 20 2",
        "expectedOutput": "2 20 27",
        "isHidden": true
      }
    ]
  },
  "m8-lu5": {
    "title": "BST operations",
    "slug": "belt-3-q14-bst-operations",
    "id": "M8-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n9 19 31 -10 -8 -9",
        "expectedOutput": "-10 -9 -8 9 19 31",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n-3 -6 22 3 14",
        "expectedOutput": "-6 -3 3 14 22",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n17",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0 13 -7 4 3",
        "expectedOutput": "-7 0 3 4 13",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n21 -15",
        "expectedOutput": "-15 21",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n13 37 -25 7 -27 39",
        "expectedOutput": "-27 -25 7 13 37 39",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n-27 -18",
        "expectedOutput": "-27 -18",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n35 20 11 -29 29 12",
        "expectedOutput": "-29 11 12 20 29 35",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-17 -8 5 29 -20 -5 27 -29",
        "expectedOutput": "-29 -20 -17 -8 -5 5 27 29",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n27 20 2",
        "expectedOutput": "2 20 27",
        "isHidden": true
      }
    ]
  },
  "belt-3-q15-recursive-versus-iterative-traversals": {
    "title": "Recursive versus iterative traversals",
    "slug": "belt-3-q15-recursive-versus-iterative-traversals",
    "id": "M8-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "INORDER: 8 4 9 2 10 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 10 3 6 7\nPOSTORDER: 8 9 4 10 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "INORDER: 4 2 5 1 3\nPREORDER: 1 2 4 5 3\nPOSTORDER: 4 5 2 3 1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "INORDER: 8 4 9 2 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 3 6 7\nPOSTORDER: 8 9 4 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "INORDER: 8 4 2 5 1 6 3 7\nPREORDER: 1 2 4 8 5 3 6 7\nPOSTORDER: 8 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "INORDER: 4 2 5 1 6 3\nPREORDER: 1 2 4 5 3 6\nPOSTORDER: 4 5 2 6 3 1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "INORDER: 2 1 3\nPREORDER: 1 2 3\nPOSTORDER: 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "INORDER: 4 2 5 1 6 3 7\nPREORDER: 1 2 4 5 3 6 7\nPOSTORDER: 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n1 2 3 4",
        "expectedOutput": "INORDER: 4 2 1 3\nPREORDER: 1 2 4 3\nPOSTORDER: 4 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "INORDER: 1\nPREORDER: 1\nPOSTORDER: 1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1 2",
        "expectedOutput": "INORDER: 2 1\nPREORDER: 1 2\nPOSTORDER: 2 1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q15-find-the-second-smallest-element": {
    "title": "Recursive versus iterative traversals",
    "slug": "belt-3-q15-recursive-versus-iterative-traversals",
    "id": "M8-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "INORDER: 8 4 9 2 10 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 10 3 6 7\nPOSTORDER: 8 9 4 10 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "INORDER: 4 2 5 1 3\nPREORDER: 1 2 4 5 3\nPOSTORDER: 4 5 2 3 1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "INORDER: 8 4 9 2 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 3 6 7\nPOSTORDER: 8 9 4 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "INORDER: 8 4 2 5 1 6 3 7\nPREORDER: 1 2 4 8 5 3 6 7\nPOSTORDER: 8 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "INORDER: 4 2 5 1 6 3\nPREORDER: 1 2 4 5 3 6\nPOSTORDER: 4 5 2 6 3 1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "INORDER: 2 1 3\nPREORDER: 1 2 3\nPOSTORDER: 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "INORDER: 4 2 5 1 6 3 7\nPREORDER: 1 2 4 5 3 6 7\nPOSTORDER: 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n1 2 3 4",
        "expectedOutput": "INORDER: 4 2 1 3\nPREORDER: 1 2 4 3\nPOSTORDER: 4 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "INORDER: 1\nPREORDER: 1\nPOSTORDER: 1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1 2",
        "expectedOutput": "INORDER: 2 1\nPREORDER: 1 2\nPOSTORDER: 2 1",
        "isHidden": true
      }
    ]
  },
  "M8-LU6": {
    "title": "Recursive versus iterative traversals",
    "slug": "belt-3-q15-recursive-versus-iterative-traversals",
    "id": "M8-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "INORDER: 8 4 9 2 10 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 10 3 6 7\nPOSTORDER: 8 9 4 10 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "INORDER: 4 2 5 1 3\nPREORDER: 1 2 4 5 3\nPOSTORDER: 4 5 2 3 1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "INORDER: 8 4 9 2 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 3 6 7\nPOSTORDER: 8 9 4 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "INORDER: 8 4 2 5 1 6 3 7\nPREORDER: 1 2 4 8 5 3 6 7\nPOSTORDER: 8 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "INORDER: 4 2 5 1 6 3\nPREORDER: 1 2 4 5 3 6\nPOSTORDER: 4 5 2 6 3 1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "INORDER: 2 1 3\nPREORDER: 1 2 3\nPOSTORDER: 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "INORDER: 4 2 5 1 6 3 7\nPREORDER: 1 2 4 5 3 6 7\nPOSTORDER: 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n1 2 3 4",
        "expectedOutput": "INORDER: 4 2 1 3\nPREORDER: 1 2 4 3\nPOSTORDER: 4 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "INORDER: 1\nPREORDER: 1\nPOSTORDER: 1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1 2",
        "expectedOutput": "INORDER: 2 1\nPREORDER: 1 2\nPOSTORDER: 2 1",
        "isHidden": true
      }
    ]
  },
  "m8-lu6": {
    "title": "Recursive versus iterative traversals",
    "slug": "belt-3-q15-recursive-versus-iterative-traversals",
    "id": "M8-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "expectedOutput": "INORDER: 8 4 9 2 10 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 10 3 6 7\nPOSTORDER: 8 9 4 10 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "INORDER: 4 2 5 1 3\nPREORDER: 1 2 4 5 3\nPOSTORDER: 4 5 2 3 1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "9\n1 2 3 4 5 6 7 8 9",
        "expectedOutput": "INORDER: 8 4 9 2 5 1 6 3 7\nPREORDER: 1 2 4 8 9 5 3 6 7\nPOSTORDER: 8 9 4 5 2 6 7 3 1",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "8\n1 2 3 4 5 6 7 8",
        "expectedOutput": "INORDER: 8 4 2 5 1 6 3 7\nPREORDER: 1 2 4 8 5 3 6 7\nPOSTORDER: 8 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "INORDER: 4 2 5 1 6 3\nPREORDER: 1 2 4 5 3 6\nPOSTORDER: 4 5 2 6 3 1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n1 2 3",
        "expectedOutput": "INORDER: 2 1 3\nPREORDER: 1 2 3\nPOSTORDER: 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n1 2 3 4 5 6 7",
        "expectedOutput": "INORDER: 4 2 5 1 6 3 7\nPREORDER: 1 2 4 5 3 6 7\nPOSTORDER: 4 5 2 6 7 3 1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n1 2 3 4",
        "expectedOutput": "INORDER: 4 2 1 3\nPREORDER: 1 2 4 3\nPOSTORDER: 4 2 3 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\n1",
        "expectedOutput": "INORDER: 1\nPREORDER: 1\nPOSTORDER: 1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1 2",
        "expectedOutput": "INORDER: 2 1\nPREORDER: 1 2\nPOSTORDER: 2 1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q16-morris-traversal": {
    "title": "Morris traversal",
    "slug": "belt-3-q16-morris-traversal",
    "id": "M8-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n27 -23 8",
        "expectedOutput": "-23 8 27",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n10 5 8 -28",
        "expectedOutput": "-28 5 8 10",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n34 29 -25 10 -2 27 25",
        "expectedOutput": "-25 -2 10 25 27 29 34",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-23 9 -16 -27 4",
        "expectedOutput": "-27 -23 -16 4 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n37 14 -28 -13",
        "expectedOutput": "-28 -13 14 37",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n-4 32 1 14 -13 17",
        "expectedOutput": "-13 -4 1 14 17 32",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n9 -17 7",
        "expectedOutput": "-17 7 9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n28 -11 21 34 36 22 29",
        "expectedOutput": "-11 21 22 28 29 34 36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-11 -18 38 -15 -30 -22 34 -27",
        "expectedOutput": "-30 -27 -22 -18 -15 -11 34 38",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n8 -24 -12 -25",
        "expectedOutput": "-25 -24 -12 8",
        "isHidden": true
      }
    ]
  },
  "belt-3-q16-count-positive-and-negative-elements": {
    "title": "Morris traversal",
    "slug": "belt-3-q16-morris-traversal",
    "id": "M8-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n27 -23 8",
        "expectedOutput": "-23 8 27",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n10 5 8 -28",
        "expectedOutput": "-28 5 8 10",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n34 29 -25 10 -2 27 25",
        "expectedOutput": "-25 -2 10 25 27 29 34",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-23 9 -16 -27 4",
        "expectedOutput": "-27 -23 -16 4 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n37 14 -28 -13",
        "expectedOutput": "-28 -13 14 37",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n-4 32 1 14 -13 17",
        "expectedOutput": "-13 -4 1 14 17 32",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n9 -17 7",
        "expectedOutput": "-17 7 9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n28 -11 21 34 36 22 29",
        "expectedOutput": "-11 21 22 28 29 34 36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-11 -18 38 -15 -30 -22 34 -27",
        "expectedOutput": "-30 -27 -22 -18 -15 -11 34 38",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n8 -24 -12 -25",
        "expectedOutput": "-25 -24 -12 8",
        "isHidden": true
      }
    ]
  },
  "M8-LU7": {
    "title": "Morris traversal",
    "slug": "belt-3-q16-morris-traversal",
    "id": "M8-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n27 -23 8",
        "expectedOutput": "-23 8 27",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n10 5 8 -28",
        "expectedOutput": "-28 5 8 10",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n34 29 -25 10 -2 27 25",
        "expectedOutput": "-25 -2 10 25 27 29 34",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-23 9 -16 -27 4",
        "expectedOutput": "-27 -23 -16 4 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n37 14 -28 -13",
        "expectedOutput": "-28 -13 14 37",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n-4 32 1 14 -13 17",
        "expectedOutput": "-13 -4 1 14 17 32",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n9 -17 7",
        "expectedOutput": "-17 7 9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n28 -11 21 34 36 22 29",
        "expectedOutput": "-11 21 22 28 29 34 36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-11 -18 38 -15 -30 -22 34 -27",
        "expectedOutput": "-30 -27 -22 -18 -15 -11 34 38",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n8 -24 -12 -25",
        "expectedOutput": "-25 -24 -12 8",
        "isHidden": true
      }
    ]
  },
  "m8-lu7": {
    "title": "Morris traversal",
    "slug": "belt-3-q16-morris-traversal",
    "id": "M8-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n27 -23 8",
        "expectedOutput": "-23 8 27",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n10 5 8 -28",
        "expectedOutput": "-28 5 8 10",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n34 29 -25 10 -2 27 25",
        "expectedOutput": "-25 -2 10 25 27 29 34",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n-23 9 -16 -27 4",
        "expectedOutput": "-27 -23 -16 4 9",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n37 14 -28 -13",
        "expectedOutput": "-28 -13 14 37",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n-4 32 1 14 -13 17",
        "expectedOutput": "-13 -4 1 14 17 32",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n9 -17 7",
        "expectedOutput": "-17 7 9",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\n28 -11 21 34 36 22 29",
        "expectedOutput": "-11 21 22 28 29 34 36",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n-11 -18 38 -15 -30 -22 34 -27",
        "expectedOutput": "-30 -27 -22 -18 -15 -11 34 38",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n8 -24 -12 -25",
        "expectedOutput": "-25 -24 -12 8",
        "isHidden": true
      }
    ]
  },
  "belt-3-q17-graph-representations": {
    "title": "Graph representations",
    "slug": "belt-3-q17-graph-representations",
    "id": "M9-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n5\n0 1\n1 2\n1 3\n2 3\n0 3",
        "expectedOutput": "0: 1 3\n1: 0 2 3\n2: 1 3\n3: 0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY\n3: EMPTY\n4: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2\n2 3\n0 2",
        "expectedOutput": "0: 2\n1: EMPTY\n2: 0 3\n3: 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n5\n0 1\n3 4\n1 3\n1 4\n2 3",
        "expectedOutput": "0: 1\n1: 0 3 4\n2: 3\n3: 1 2 4\n4: 1 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n4\n2 3\n1 2\n4 5\n3 5",
        "expectedOutput": "0: EMPTY\n1: 2\n2: 1 3\n3: 2 5\n4: 5\n5: 3 4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n3\n1 2\n0 3\n0 1",
        "expectedOutput": "0: 1 3\n1: 0 2\n2: 1\n3: 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1\n1 2\n0 2",
        "expectedOutput": "0: 1 2\n1: 0 2\n2: 0 1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q17-move-zeros-to-the-end": {
    "title": "Graph representations",
    "slug": "belt-3-q17-graph-representations",
    "id": "M9-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n5\n0 1\n1 2\n1 3\n2 3\n0 3",
        "expectedOutput": "0: 1 3\n1: 0 2 3\n2: 1 3\n3: 0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY\n3: EMPTY\n4: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2\n2 3\n0 2",
        "expectedOutput": "0: 2\n1: EMPTY\n2: 0 3\n3: 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n5\n0 1\n3 4\n1 3\n1 4\n2 3",
        "expectedOutput": "0: 1\n1: 0 3 4\n2: 3\n3: 1 2 4\n4: 1 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n4\n2 3\n1 2\n4 5\n3 5",
        "expectedOutput": "0: EMPTY\n1: 2\n2: 1 3\n3: 2 5\n4: 5\n5: 3 4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n3\n1 2\n0 3\n0 1",
        "expectedOutput": "0: 1 3\n1: 0 2\n2: 1\n3: 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1\n1 2\n0 2",
        "expectedOutput": "0: 1 2\n1: 0 2\n2: 0 1",
        "isHidden": true
      }
    ]
  },
  "M9-LU1": {
    "title": "Graph representations",
    "slug": "belt-3-q17-graph-representations",
    "id": "M9-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n5\n0 1\n1 2\n1 3\n2 3\n0 3",
        "expectedOutput": "0: 1 3\n1: 0 2 3\n2: 1 3\n3: 0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY\n3: EMPTY\n4: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2\n2 3\n0 2",
        "expectedOutput": "0: 2\n1: EMPTY\n2: 0 3\n3: 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n5\n0 1\n3 4\n1 3\n1 4\n2 3",
        "expectedOutput": "0: 1\n1: 0 3 4\n2: 3\n3: 1 2 4\n4: 1 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n4\n2 3\n1 2\n4 5\n3 5",
        "expectedOutput": "0: EMPTY\n1: 2\n2: 1 3\n3: 2 5\n4: 5\n5: 3 4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n3\n1 2\n0 3\n0 1",
        "expectedOutput": "0: 1 3\n1: 0 2\n2: 1\n3: 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1\n1 2\n0 2",
        "expectedOutput": "0: 1 2\n1: 0 2\n2: 0 1",
        "isHidden": true
      }
    ]
  },
  "m9-lu1": {
    "title": "Graph representations",
    "slug": "belt-3-q17-graph-representations",
    "id": "M9-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0\n2: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n5\n0 1\n1 2\n1 3\n2 3\n0 3",
        "expectedOutput": "0: 1 3\n1: 0 2 3\n2: 1 3\n3: 0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY\n3: EMPTY\n4: EMPTY",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n2\n2 3\n0 2",
        "expectedOutput": "0: 2\n1: EMPTY\n2: 0 3\n3: 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n0",
        "expectedOutput": "0: EMPTY\n1: EMPTY\n2: EMPTY",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n5\n0 1\n3 4\n1 3\n1 4\n2 3",
        "expectedOutput": "0: 1\n1: 0 3 4\n2: 3\n3: 1 2 4\n4: 1 3",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n4\n2 3\n1 2\n4 5\n3 5",
        "expectedOutput": "0: EMPTY\n1: 2\n2: 1 3\n3: 2 5\n4: 5\n5: 3 4",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n3\n1 2\n0 3\n0 1",
        "expectedOutput": "0: 1 3\n1: 0 2\n2: 1\n3: 0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n1\n0 1",
        "expectedOutput": "0: 1\n1: 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1\n1 2\n0 2",
        "expectedOutput": "0: 1 2\n1: 0 2\n2: 0 1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q18-graph-bfs-and-dfs": {
    "title": "Graph BFS and DFS",
    "slug": "belt-3-q18-graph-bfs-and-dfs",
    "id": "M9-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n3\n1 3\n0 4\n1 5\n3",
        "expectedOutput": "3 1 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n2\n4 5\n2 5\n4",
        "expectedOutput": "4 5 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n5\n4 5\n2 5\n0 5\n1 3\n0 2\n4",
        "expectedOutput": "4 5 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n7\n2 4\n0 2\n2 3\n1 4\n0 1\n1 3\n3 4\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1\n0 1\n1",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n0 2\n0 3\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n6\n0 1\n0 4\n2 4\n0 3\n1 4\n0 2\n1",
        "expectedOutput": "1 0 4 2 3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n2\n2 3\n0 1\n3",
        "expectedOutput": "3 2",
        "isHidden": true
      }
    ]
  },
  "belt-3-q18-remove-duplicate-elements": {
    "title": "Graph BFS and DFS",
    "slug": "belt-3-q18-graph-bfs-and-dfs",
    "id": "M9-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n3\n1 3\n0 4\n1 5\n3",
        "expectedOutput": "3 1 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n2\n4 5\n2 5\n4",
        "expectedOutput": "4 5 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n5\n4 5\n2 5\n0 5\n1 3\n0 2\n4",
        "expectedOutput": "4 5 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n7\n2 4\n0 2\n2 3\n1 4\n0 1\n1 3\n3 4\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1\n0 1\n1",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n0 2\n0 3\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n6\n0 1\n0 4\n2 4\n0 3\n1 4\n0 2\n1",
        "expectedOutput": "1 0 4 2 3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n2\n2 3\n0 1\n3",
        "expectedOutput": "3 2",
        "isHidden": true
      }
    ]
  },
  "M9-LU2": {
    "title": "Graph BFS and DFS",
    "slug": "belt-3-q18-graph-bfs-and-dfs",
    "id": "M9-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n3\n1 3\n0 4\n1 5\n3",
        "expectedOutput": "3 1 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n2\n4 5\n2 5\n4",
        "expectedOutput": "4 5 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n5\n4 5\n2 5\n0 5\n1 3\n0 2\n4",
        "expectedOutput": "4 5 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n7\n2 4\n0 2\n2 3\n1 4\n0 1\n1 3\n3 4\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1\n0 1\n1",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n0 2\n0 3\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n6\n0 1\n0 4\n2 4\n0 3\n1 4\n0 2\n1",
        "expectedOutput": "1 0 4 2 3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n2\n2 3\n0 1\n3",
        "expectedOutput": "3 2",
        "isHidden": true
      }
    ]
  },
  "m9-lu2": {
    "title": "Graph BFS and DFS",
    "slug": "belt-3-q18-graph-bfs-and-dfs",
    "id": "M9-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "6\n3\n1 3\n0 4\n1 5\n3",
        "expectedOutput": "3 1 5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n2\n4 5\n2 5\n4",
        "expectedOutput": "4 5 2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n5\n4 5\n2 5\n0 5\n1 3\n0 2\n4",
        "expectedOutput": "4 5 0 2",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n7\n2 4\n0 2\n2 3\n1 4\n0 1\n1 3\n3 4\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n1\n0 1\n1",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n2\n0 2\n0 3\n1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n6\n0 1\n0 4\n2 4\n0 3\n1 4\n0 2\n1",
        "expectedOutput": "1 0 4 2 3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n2\n2 3\n0 1\n3",
        "expectedOutput": "3 2",
        "isHidden": true
      }
    ]
  },
  "belt-3-q19-cycle-detection": {
    "title": "Cycle detection",
    "slug": "belt-3-q19-cycle-detection",
    "id": "M9-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1\n0 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n6\n2 3\n1 3\n0 3\n0 2\n0 1\n1 2",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6\n1 5\n1 3\n2 5\n5 6\n0 5\n3 4",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n2\n0 2\n1 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n0",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n1 2\n0 2\n0 1",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n4\n5 6\n0 2\n1 2\n2 6",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n7\n3 4\n0 3\n1 4\n0 2\n0 1\n0 4\n2 3",
        "expectedOutput": "CYCLE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q19-check-array-palindrome": {
    "title": "Cycle detection",
    "slug": "belt-3-q19-cycle-detection",
    "id": "M9-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1\n0 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n6\n2 3\n1 3\n0 3\n0 2\n0 1\n1 2",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6\n1 5\n1 3\n2 5\n5 6\n0 5\n3 4",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n2\n0 2\n1 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n0",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n1 2\n0 2\n0 1",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n4\n5 6\n0 2\n1 2\n2 6",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n7\n3 4\n0 3\n1 4\n0 2\n0 1\n0 4\n2 3",
        "expectedOutput": "CYCLE",
        "isHidden": true
      }
    ]
  },
  "M9-LU3": {
    "title": "Cycle detection",
    "slug": "belt-3-q19-cycle-detection",
    "id": "M9-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1\n0 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n6\n2 3\n1 3\n0 3\n0 2\n0 1\n1 2",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6\n1 5\n1 3\n2 5\n5 6\n0 5\n3 4",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n2\n0 2\n1 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n0",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n1 2\n0 2\n0 1",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n4\n5 6\n0 2\n1 2\n2 6",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n7\n3 4\n0 3\n1 4\n0 2\n0 1\n0 4\n2 3",
        "expectedOutput": "CYCLE",
        "isHidden": true
      }
    ]
  },
  "m9-lu3": {
    "title": "Cycle detection",
    "slug": "belt-3-q19-cycle-detection",
    "id": "M9-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n1\n0 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n6\n2 3\n1 3\n0 3\n0 2\n0 1\n1 2",
        "expectedOutput": "CYCLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n1\n0 1",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "7\n6\n1 5\n1 3\n2 5\n5 6\n0 5\n3 4",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n2\n0 2\n1 3",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "2\n0",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n1 2\n0 2\n0 1",
        "expectedOutput": "CYCLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "7\n4\n5 6\n0 2\n1 2\n2 6",
        "expectedOutput": "ACYCLIC",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n7\n3 4\n0 3\n1 4\n0 2\n0 1\n0 4\n2 3",
        "expectedOutput": "CYCLE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q20-bipartite-check": {
    "title": "Bipartite check",
    "slug": "belt-3-q20-bipartite-check",
    "id": "M9-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n1\n0 3",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\n1 3\n0 3\n2 3\n0 2\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n0 1",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n0 2\n1 3\n0 1\n1 2\n2 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n5\n1 2\n0 1\n0 2\n0 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 2\n0 1\n1 3\n0 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n4\n0 2\n0 3\n1 3\n1 2",
        "expectedOutput": "BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n6\n2 3\n0 3\n1 3\n0 1\n1 2\n0 2",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n0 2\n0 1\n1 2\n1 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n8\n1 3\n0 2\n1 2\n3 5\n0 3\n1 5\n2 3\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q20-find-common-elements": {
    "title": "Bipartite check",
    "slug": "belt-3-q20-bipartite-check",
    "id": "M9-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n1\n0 3",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\n1 3\n0 3\n2 3\n0 2\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n0 1",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n0 2\n1 3\n0 1\n1 2\n2 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n5\n1 2\n0 1\n0 2\n0 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 2\n0 1\n1 3\n0 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n4\n0 2\n0 3\n1 3\n1 2",
        "expectedOutput": "BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n6\n2 3\n0 3\n1 3\n0 1\n1 2\n0 2",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n0 2\n0 1\n1 2\n1 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n8\n1 3\n0 2\n1 2\n3 5\n0 3\n1 5\n2 3\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      }
    ]
  },
  "M9-LU4": {
    "title": "Bipartite check",
    "slug": "belt-3-q20-bipartite-check",
    "id": "M9-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n1\n0 3",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\n1 3\n0 3\n2 3\n0 2\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n0 1",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n0 2\n1 3\n0 1\n1 2\n2 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n5\n1 2\n0 1\n0 2\n0 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 2\n0 1\n1 3\n0 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n4\n0 2\n0 3\n1 3\n1 2",
        "expectedOutput": "BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n6\n2 3\n0 3\n1 3\n0 1\n1 2\n0 2",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n0 2\n0 1\n1 2\n1 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n8\n1 3\n0 2\n1 2\n3 5\n0 3\n1 5\n2 3\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      }
    ]
  },
  "m9-lu4": {
    "title": "Bipartite check",
    "slug": "belt-3-q20-bipartite-check",
    "id": "M9-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n1\n0 3",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\n1 3\n0 3\n2 3\n0 2\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "2\n1\n0 1",
        "expectedOutput": "BIPARTITE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n0 2\n1 3\n0 1\n1 2\n2 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n5\n1 2\n0 1\n0 2\n0 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n1 2\n0 1\n1 3\n0 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n4\n0 2\n0 3\n1 3\n1 2",
        "expectedOutput": "BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "4\n6\n2 3\n0 3\n1 3\n0 1\n1 2\n0 2",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n0 2\n0 1\n1 2\n1 3\n2 3",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n8\n1 3\n0 2\n1 2\n3 5\n0 3\n1 5\n2 3\n3 4",
        "expectedOutput": "NOT_BIPARTITE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q21-topological-sort": {
    "title": "Topological sort",
    "slug": "belt-3-q21-topological-sort",
    "id": "M9-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n3\n1 2\n0 1\n0 2",
        "expectedOutput": "0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n3\n0 1\n1 0\n2 0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n3\n2 1\n0 1\n2 0",
        "expectedOutput": "2 0 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n3\n2 1\n2 0\n1 0",
        "expectedOutput": "2 1 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n1 0",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n6\n0 1\n1 0\n4 2\n5 4\n2 1\n3 1",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n4 1\n4 0",
        "expectedOutput": "2 3 4 0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n3 1\n1 0\n1 2\n2 0\n3 0",
        "expectedOutput": "3 1 2 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n4\n2 1\n0 3\n1 3\n2 3",
        "expectedOutput": "0 2 1 3",
        "isHidden": true
      }
    ]
  },
  "belt-3-q21-add-two-matrices": {
    "title": "Topological sort",
    "slug": "belt-3-q21-topological-sort",
    "id": "M9-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n3\n1 2\n0 1\n0 2",
        "expectedOutput": "0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n3\n0 1\n1 0\n2 0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n3\n2 1\n0 1\n2 0",
        "expectedOutput": "2 0 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n3\n2 1\n2 0\n1 0",
        "expectedOutput": "2 1 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n1 0",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n6\n0 1\n1 0\n4 2\n5 4\n2 1\n3 1",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n4 1\n4 0",
        "expectedOutput": "2 3 4 0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n3 1\n1 0\n1 2\n2 0\n3 0",
        "expectedOutput": "3 1 2 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n4\n2 1\n0 3\n1 3\n2 3",
        "expectedOutput": "0 2 1 3",
        "isHidden": true
      }
    ]
  },
  "M9-LU5": {
    "title": "Topological sort",
    "slug": "belt-3-q21-topological-sort",
    "id": "M9-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n3\n1 2\n0 1\n0 2",
        "expectedOutput": "0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n3\n0 1\n1 0\n2 0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n3\n2 1\n0 1\n2 0",
        "expectedOutput": "2 0 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n3\n2 1\n2 0\n1 0",
        "expectedOutput": "2 1 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n1 0",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n6\n0 1\n1 0\n4 2\n5 4\n2 1\n3 1",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n4 1\n4 0",
        "expectedOutput": "2 3 4 0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n3 1\n1 0\n1 2\n2 0\n3 0",
        "expectedOutput": "3 1 2 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n4\n2 1\n0 3\n1 3\n2 3",
        "expectedOutput": "0 2 1 3",
        "isHidden": true
      }
    ]
  },
  "m9-lu5": {
    "title": "Topological sort",
    "slug": "belt-3-q21-topological-sort",
    "id": "M9-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\n3\n1 2\n0 1\n0 2",
        "expectedOutput": "0 1 2",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n3\n0 1\n1 0\n2 0",
        "expectedOutput": "INVALID",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n0",
        "expectedOutput": "0 1 2 3 4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n3\n2 1\n0 1\n2 0",
        "expectedOutput": "2 0 1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "3\n3\n2 1\n2 0\n1 0",
        "expectedOutput": "2 1 0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n1 0",
        "expectedOutput": "1 0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n6\n0 1\n1 0\n4 2\n5 4\n2 1\n3 1",
        "expectedOutput": "INVALID",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n4 1\n4 0",
        "expectedOutput": "2 3 4 0 1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n5\n3 1\n1 0\n1 2\n2 0\n3 0",
        "expectedOutput": "3 1 2 0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n4\n2 1\n0 3\n1 3\n2 3",
        "expectedOutput": "0 2 1 3",
        "isHidden": true
      }
    ]
  },
  "belt-3-q22-directed-versus-undirected-graphs": {
    "title": "Directed versus undirected graphs",
    "slug": "belt-3-q22-directed-versus-undirected-graphs",
    "id": "M9-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n6\n2 0\n4 1\n3 2\n3 1\n1 2\n4 0\n4\n4",
        "expectedOutput": "REACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n5\n6 0\n0 2\n1 4\n5 1\n3 2\n3\n5",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n9\n1 0\n0 6\n0 5\n1 2\n5 2\n2 6\n4 3\n4 2\n0 2\n2\n2",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n2\n2 5\n4 0\n1\n2",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n3 0\n2 0\n0 1\n3 1\n1\n3",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n2\n2 1\n2 0\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n1\n0 1\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n7\n4 3\n2 3\n4 2\n1 3\n4 1\n0 3\n1 2\n2\n4",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n9\n3 1\n2 1\n3 0\n2 0\n1 5\n4 5\n4 3\n0 1\n4 6\n2\n0",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q22-sum-of-each-matrix-row": {
    "title": "Directed versus undirected graphs",
    "slug": "belt-3-q22-directed-versus-undirected-graphs",
    "id": "M9-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n6\n2 0\n4 1\n3 2\n3 1\n1 2\n4 0\n4\n4",
        "expectedOutput": "REACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n5\n6 0\n0 2\n1 4\n5 1\n3 2\n3\n5",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n9\n1 0\n0 6\n0 5\n1 2\n5 2\n2 6\n4 3\n4 2\n0 2\n2\n2",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n2\n2 5\n4 0\n1\n2",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n3 0\n2 0\n0 1\n3 1\n1\n3",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n2\n2 1\n2 0\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n1\n0 1\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n7\n4 3\n2 3\n4 2\n1 3\n4 1\n0 3\n1 2\n2\n4",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n9\n3 1\n2 1\n3 0\n2 0\n1 5\n4 5\n4 3\n0 1\n4 6\n2\n0",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      }
    ]
  },
  "M9-LU6": {
    "title": "Directed versus undirected graphs",
    "slug": "belt-3-q22-directed-versus-undirected-graphs",
    "id": "M9-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n6\n2 0\n4 1\n3 2\n3 1\n1 2\n4 0\n4\n4",
        "expectedOutput": "REACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n5\n6 0\n0 2\n1 4\n5 1\n3 2\n3\n5",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n9\n1 0\n0 6\n0 5\n1 2\n5 2\n2 6\n4 3\n4 2\n0 2\n2\n2",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n2\n2 5\n4 0\n1\n2",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n3 0\n2 0\n0 1\n3 1\n1\n3",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n2\n2 1\n2 0\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n1\n0 1\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n7\n4 3\n2 3\n4 2\n1 3\n4 1\n0 3\n1 2\n2\n4",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n9\n3 1\n2 1\n3 0\n2 0\n1 5\n4 5\n4 3\n0 1\n4 6\n2\n0",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      }
    ]
  },
  "m9-lu6": {
    "title": "Directed versus undirected graphs",
    "slug": "belt-3-q22-directed-versus-undirected-graphs",
    "id": "M9-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n6\n2 0\n4 1\n3 2\n3 1\n1 2\n4 0\n4\n4",
        "expectedOutput": "REACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "7\n5\n6 0\n0 2\n1 4\n5 1\n3 2\n3\n5",
        "expectedOutput": "UNREACHABLE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "7\n9\n1 0\n0 6\n0 5\n1 2\n5 2\n2 6\n4 3\n4 2\n0 2\n2\n2",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n2\n2 5\n4 0\n1\n2",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n4\n3 0\n2 0\n0 1\n3 1\n1\n3",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "3\n2\n2 1\n2 0\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "2\n1\n0 1\n1\n1",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n7\n4 3\n2 3\n4 2\n1 3\n4 1\n0 3\n1 2\n2\n4",
        "expectedOutput": "UNREACHABLE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "7\n9\n3 1\n2 1\n3 0\n2 0\n1 5\n4 5\n4 3\n0 1\n4 6\n2\n0",
        "expectedOutput": "REACHABLE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q23-weighted-versus-unweighted-graphs": {
    "title": "Weighted versus unweighted graphs",
    "slug": "belt-3-q23-weighted-versus-unweighted-graphs",
    "id": "M9-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n3\n4 5\n5 6\n3 5\n0\n6",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n2\n1 2\n0 1\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n0 1\n0 3\n1 3\n1 2\n0 2\n2 3\n0\n3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n6\n3 4\n1 4\n0 2\n0 4\n2 3\n0 1\n0\n4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n0 1\n0 3\n2 3\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n2 4\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n4\n4 5\n2 5\n1 4\n1 5\n0\n5",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q23-sum-of-each-matrix-column": {
    "title": "Weighted versus unweighted graphs",
    "slug": "belt-3-q23-weighted-versus-unweighted-graphs",
    "id": "M9-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n3\n4 5\n5 6\n3 5\n0\n6",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n2\n1 2\n0 1\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n0 1\n0 3\n1 3\n1 2\n0 2\n2 3\n0\n3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n6\n3 4\n1 4\n0 2\n0 4\n2 3\n0 1\n0\n4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n0 1\n0 3\n2 3\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n2 4\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n4\n4 5\n2 5\n1 4\n1 5\n0\n5",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "M9-LU7": {
    "title": "Weighted versus unweighted graphs",
    "slug": "belt-3-q23-weighted-versus-unweighted-graphs",
    "id": "M9-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n3\n4 5\n5 6\n3 5\n0\n6",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n2\n1 2\n0 1\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n0 1\n0 3\n1 3\n1 2\n0 2\n2 3\n0\n3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n6\n3 4\n1 4\n0 2\n0 4\n2 3\n0 1\n0\n4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n0 1\n0 3\n2 3\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n2 4\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n4\n4 5\n2 5\n1 4\n1 5\n0\n5",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "m9-lu7": {
    "title": "Weighted versus unweighted graphs",
    "slug": "belt-3-q23-weighted-versus-unweighted-graphs",
    "id": "M9-LU7",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n0\n0\n1",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "7\n3\n4 5\n5 6\n3 5\n0\n6",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n2\n1 2\n0 1\n0\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n0\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n0 1\n0 3\n1 3\n1 2\n0 2\n2 3\n0\n3",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "5\n6\n3 4\n1 4\n0 2\n0 4\n2 3\n0 1\n0\n4",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n0 1\n0 3\n2 3\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n2 4\n0\n4",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n4\n4 5\n2 5\n1 4\n1 5\n0\n5",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1\n0\n1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q24-sparse-versus-dense-graphs": {
    "title": "Sparse versus dense graphs",
    "slug": "belt-3-q24-sparse-versus-dense-graphs",
    "id": "M9-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n2",
        "expectedOutput": "SPARSE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n12",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n31",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "13\n28",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n6",
        "expectedOutput": "SPARSE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "16\n40",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n20",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n37",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n38",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "19\n25",
        "expectedOutput": "DENSE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q24-main-diagonal-sum": {
    "title": "Sparse versus dense graphs",
    "slug": "belt-3-q24-sparse-versus-dense-graphs",
    "id": "M9-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n2",
        "expectedOutput": "SPARSE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n12",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n31",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "13\n28",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n6",
        "expectedOutput": "SPARSE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "16\n40",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n20",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n37",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n38",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "19\n25",
        "expectedOutput": "DENSE",
        "isHidden": true
      }
    ]
  },
  "M9-LU8": {
    "title": "Sparse versus dense graphs",
    "slug": "belt-3-q24-sparse-versus-dense-graphs",
    "id": "M9-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n2",
        "expectedOutput": "SPARSE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n12",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n31",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "13\n28",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n6",
        "expectedOutput": "SPARSE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "16\n40",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n20",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n37",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n38",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "19\n25",
        "expectedOutput": "DENSE",
        "isHidden": true
      }
    ]
  },
  "m9-lu8": {
    "title": "Sparse versus dense graphs",
    "slug": "belt-3-q24-sparse-versus-dense-graphs",
    "id": "M9-LU8",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n2",
        "expectedOutput": "SPARSE",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8\n12",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n31",
        "expectedOutput": "DENSE",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "13\n28",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "8\n6",
        "expectedOutput": "SPARSE",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "16\n40",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n20",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n37",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n38",
        "expectedOutput": "DENSE",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "19\n25",
        "expectedOutput": "DENSE",
        "isHidden": true
      }
    ]
  },
  "belt-3-q25-shortest-paths": {
    "title": "Shortest paths",
    "slug": "belt-3-q25-shortest-paths",
    "id": "M9-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n4\n2 1 7\n3 2 3\n1 0 3\n0 3 7",
        "expectedOutput": "0 17 10 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6\n2 1 7\n0 1 2\n2 0 6\n1 0 7\n0 2 6\n1 2 3",
        "expectedOutput": "0 2 5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n4\n1 0 1\n3 2 5\n1 4 2\n0 1 7",
        "expectedOutput": "0 7 INF INF 9",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n3\n0 3 7\n1 4 7\n0 4 4",
        "expectedOutput": "0 INF INF 7 4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n0",
        "expectedOutput": "0 INF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n7\n2 1 8\n0 4 0\n0 1 3\n0 2 7\n4 3 1\n4 2 6\n1 4 3",
        "expectedOutput": "0 3 6 1 0 INF",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1\n2 0 9",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n2 1 9\n2 3 4",
        "expectedOutput": "0 INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n2\n1 2 8\n3 2 8",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n4\n1 4 6\n5 4 0\n5 3 5\n1 3 5",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      }
    ]
  },
  "belt-3-q25-transpose-a-matrix": {
    "title": "Shortest paths",
    "slug": "belt-3-q25-shortest-paths",
    "id": "M9-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n4\n2 1 7\n3 2 3\n1 0 3\n0 3 7",
        "expectedOutput": "0 17 10 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6\n2 1 7\n0 1 2\n2 0 6\n1 0 7\n0 2 6\n1 2 3",
        "expectedOutput": "0 2 5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n4\n1 0 1\n3 2 5\n1 4 2\n0 1 7",
        "expectedOutput": "0 7 INF INF 9",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n3\n0 3 7\n1 4 7\n0 4 4",
        "expectedOutput": "0 INF INF 7 4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n0",
        "expectedOutput": "0 INF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n7\n2 1 8\n0 4 0\n0 1 3\n0 2 7\n4 3 1\n4 2 6\n1 4 3",
        "expectedOutput": "0 3 6 1 0 INF",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1\n2 0 9",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n2 1 9\n2 3 4",
        "expectedOutput": "0 INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n2\n1 2 8\n3 2 8",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n4\n1 4 6\n5 4 0\n5 3 5\n1 3 5",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      }
    ]
  },
  "M9-LU9": {
    "title": "Shortest paths",
    "slug": "belt-3-q25-shortest-paths",
    "id": "M9-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n4\n2 1 7\n3 2 3\n1 0 3\n0 3 7",
        "expectedOutput": "0 17 10 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6\n2 1 7\n0 1 2\n2 0 6\n1 0 7\n0 2 6\n1 2 3",
        "expectedOutput": "0 2 5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n4\n1 0 1\n3 2 5\n1 4 2\n0 1 7",
        "expectedOutput": "0 7 INF INF 9",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n3\n0 3 7\n1 4 7\n0 4 4",
        "expectedOutput": "0 INF INF 7 4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n0",
        "expectedOutput": "0 INF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n7\n2 1 8\n0 4 0\n0 1 3\n0 2 7\n4 3 1\n4 2 6\n1 4 3",
        "expectedOutput": "0 3 6 1 0 INF",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1\n2 0 9",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n2 1 9\n2 3 4",
        "expectedOutput": "0 INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n2\n1 2 8\n3 2 8",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n4\n1 4 6\n5 4 0\n5 3 5\n1 3 5",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      }
    ]
  },
  "m9-lu9": {
    "title": "Shortest paths",
    "slug": "belt-3-q25-shortest-paths",
    "id": "M9-LU9",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n4\n2 1 7\n3 2 3\n1 0 3\n0 3 7",
        "expectedOutput": "0 17 10 7",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\n6\n2 1 7\n0 1 2\n2 0 6\n1 0 7\n0 2 6\n1 2 3",
        "expectedOutput": "0 2 5",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n4\n1 0 1\n3 2 5\n1 4 2\n0 1 7",
        "expectedOutput": "0 7 INF INF 9",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n3\n0 3 7\n1 4 7\n0 4 4",
        "expectedOutput": "0 INF INF 7 4",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n0",
        "expectedOutput": "0 INF",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\n7\n2 1 8\n0 4 0\n0 1 3\n0 2 7\n4 3 1\n4 2 6\n1 4 3",
        "expectedOutput": "0 3 6 1 0 INF",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n1\n2 0 9",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n2\n2 1 9\n2 3 4",
        "expectedOutput": "0 INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n2\n1 2 8\n3 2 8",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n4\n1 4 6\n5 4 0\n5 3 5\n1 3 5",
        "expectedOutput": "0 INF INF INF INF INF",
        "isHidden": true
      }
    ]
  },
  "belt-3-q26-minimum-spanning-tree-with-prim-s-algorithm": {
    "title": "Minimum spanning tree with Prim's algorithm",
    "slug": "belt-3-q26-minimum-spanning-tree-with-prim-s-algorithm",
    "id": "M9-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n0 1 3\n1 2 7\n2 3 2\n0 3 5\n0 2 6\n1 3 4",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n7\n0 1 1\n1 2 5\n2 3 7\n3 4 8\n0 2 7\n0 3 7\n2 4 4",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1\n0 1 8",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n8\n0 1 5\n1 2 6\n2 3 1\n3 4 9\n4 5 4\n0 5 1\n2 4 5\n1 4 9",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n0 1 4\n1 2 8\n0 2 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n8\n0 1 6\n1 2 4\n2 3 1\n3 4 6\n4 5 5\n1 5 8\n1 4 3\n0 3 2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n0 1 4\n1 2 5\n0 2 6",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n6\n0 1 5\n1 2 8\n2 3 3\n0 2 2\n0 3 4\n1 3 2",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1 1\n1 2 6\n0 2 8",
        "expectedOutput": "7",
        "isHidden": true
      }
    ]
  },
  "belt-3-q26-find-string-length": {
    "title": "Minimum spanning tree with Prim's algorithm",
    "slug": "belt-3-q26-minimum-spanning-tree-with-prim-s-algorithm",
    "id": "M9-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n0 1 3\n1 2 7\n2 3 2\n0 3 5\n0 2 6\n1 3 4",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n7\n0 1 1\n1 2 5\n2 3 7\n3 4 8\n0 2 7\n0 3 7\n2 4 4",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1\n0 1 8",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n8\n0 1 5\n1 2 6\n2 3 1\n3 4 9\n4 5 4\n0 5 1\n2 4 5\n1 4 9",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n0 1 4\n1 2 8\n0 2 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n8\n0 1 6\n1 2 4\n2 3 1\n3 4 6\n4 5 5\n1 5 8\n1 4 3\n0 3 2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n0 1 4\n1 2 5\n0 2 6",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n6\n0 1 5\n1 2 8\n2 3 3\n0 2 2\n0 3 4\n1 3 2",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1 1\n1 2 6\n0 2 8",
        "expectedOutput": "7",
        "isHidden": true
      }
    ]
  },
  "M9-LU10": {
    "title": "Minimum spanning tree with Prim's algorithm",
    "slug": "belt-3-q26-minimum-spanning-tree-with-prim-s-algorithm",
    "id": "M9-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n0 1 3\n1 2 7\n2 3 2\n0 3 5\n0 2 6\n1 3 4",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n7\n0 1 1\n1 2 5\n2 3 7\n3 4 8\n0 2 7\n0 3 7\n2 4 4",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1\n0 1 8",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n8\n0 1 5\n1 2 6\n2 3 1\n3 4 9\n4 5 4\n0 5 1\n2 4 5\n1 4 9",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n0 1 4\n1 2 8\n0 2 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n8\n0 1 6\n1 2 4\n2 3 1\n3 4 6\n4 5 5\n1 5 8\n1 4 3\n0 3 2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n0 1 4\n1 2 5\n0 2 6",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n6\n0 1 5\n1 2 8\n2 3 3\n0 2 2\n0 3 4\n1 3 2",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1 1\n1 2 6\n0 2 8",
        "expectedOutput": "7",
        "isHidden": true
      }
    ]
  },
  "m9-lu10": {
    "title": "Minimum spanning tree with Prim's algorithm",
    "slug": "belt-3-q26-minimum-spanning-tree-with-prim-s-algorithm",
    "id": "M9-LU10",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n0 1 3\n1 2 7\n2 3 2\n0 3 5\n0 2 6\n1 3 4",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\n7\n0 1 1\n1 2 5\n2 3 7\n3 4 8\n0 2 7\n0 3 7\n2 4 4",
        "expectedOutput": "17",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\n1\n0 1 8",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "6\n8\n0 1 5\n1 2 6\n2 3 1\n3 4 9\n4 5 4\n0 5 1\n2 4 5\n1 4 9",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "3\n3\n0 1 4\n1 2 8\n0 2 3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\n8\n0 1 6\n1 2 4\n2 3 1\n3 4 6\n4 5 5\n1 5 8\n1 4 3\n0 3 2",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n3\n0 1 4\n1 2 5\n0 2 6",
        "expectedOutput": "9",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "4\n6\n0 1 5\n1 2 8\n2 3 3\n0 2 2\n0 3 4\n1 3 2",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\n3\n0 1 1\n1 2 6\n0 2 8",
        "expectedOutput": "7",
        "isHidden": true
      }
    ]
  },
  "belt-3-q27-disjoint-sets": {
    "title": "Disjoint sets",
    "slug": "belt-3-q27-disjoint-sets",
    "id": "M9-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n4\nQUERY 0 0\nUNION 3 4\nQUERY 2 3\nUNION 3 4",
        "expectedOutput": "YES\nNO",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\nQUERY 0 0\nQUERY 1 1\nUNION 4 3\nQUERY 4 1\nQUERY 2 0",
        "expectedOutput": "YES\nYES\nNO\nNO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3\nQUERY 0 0\nUNION 5 2\nUNION 3 3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n6\nQUERY 0 0\nUNION 0 0\nQUERY 3 3\nUNION 0 0\nUNION 2 0\nUNION 1 2",
        "expectedOutput": "YES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n7\nQUERY 0 0\nUNION 0 1\nQUERY 3 2\nQUERY 0 1\nUNION 2 1\nUNION 3 2\nUNION 2 0",
        "expectedOutput": "YES\nNO\nYES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n8\nQUERY 0 0\nQUERY 2 1\nUNION 2 1\nQUERY 3 1\nUNION 1 1\nUNION 2 2\nUNION 0 0\nUNION 0 1",
        "expectedOutput": "YES\nNO\nNO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n6\nQUERY 0 0\nUNION 2 2\nUNION 4 3\nUNION 3 4\nUNION 0 1\nUNION 3 1",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n6\nQUERY 0 0\nUNION 1 2\nUNION 4 0\nUNION 2 1\nQUERY 0 1\nUNION 3 1",
        "expectedOutput": "YES\nNO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n8\nQUERY 0 0\nQUERY 4 2\nUNION 5 2\nQUERY 0 2\nQUERY 0 0\nUNION 0 2\nUNION 2 1\nQUERY 2 0",
        "expectedOutput": "YES\nNO\nNO\nYES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\nQUERY 0 0\nUNION 4 3\nUNION 1 2",
        "expectedOutput": "YES",
        "isHidden": true
      }
    ]
  },
  "belt-3-q27-count-vowels-in-a-string": {
    "title": "Disjoint sets",
    "slug": "belt-3-q27-disjoint-sets",
    "id": "M9-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n4\nQUERY 0 0\nUNION 3 4\nQUERY 2 3\nUNION 3 4",
        "expectedOutput": "YES\nNO",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\nQUERY 0 0\nQUERY 1 1\nUNION 4 3\nQUERY 4 1\nQUERY 2 0",
        "expectedOutput": "YES\nYES\nNO\nNO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3\nQUERY 0 0\nUNION 5 2\nUNION 3 3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n6\nQUERY 0 0\nUNION 0 0\nQUERY 3 3\nUNION 0 0\nUNION 2 0\nUNION 1 2",
        "expectedOutput": "YES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n7\nQUERY 0 0\nUNION 0 1\nQUERY 3 2\nQUERY 0 1\nUNION 2 1\nUNION 3 2\nUNION 2 0",
        "expectedOutput": "YES\nNO\nYES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n8\nQUERY 0 0\nQUERY 2 1\nUNION 2 1\nQUERY 3 1\nUNION 1 1\nUNION 2 2\nUNION 0 0\nUNION 0 1",
        "expectedOutput": "YES\nNO\nNO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n6\nQUERY 0 0\nUNION 2 2\nUNION 4 3\nUNION 3 4\nUNION 0 1\nUNION 3 1",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n6\nQUERY 0 0\nUNION 1 2\nUNION 4 0\nUNION 2 1\nQUERY 0 1\nUNION 3 1",
        "expectedOutput": "YES\nNO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n8\nQUERY 0 0\nQUERY 4 2\nUNION 5 2\nQUERY 0 2\nQUERY 0 0\nUNION 0 2\nUNION 2 1\nQUERY 2 0",
        "expectedOutput": "YES\nNO\nNO\nYES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\nQUERY 0 0\nUNION 4 3\nUNION 1 2",
        "expectedOutput": "YES",
        "isHidden": true
      }
    ]
  },
  "M9-LU11": {
    "title": "Disjoint sets",
    "slug": "belt-3-q27-disjoint-sets",
    "id": "M9-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n4\nQUERY 0 0\nUNION 3 4\nQUERY 2 3\nUNION 3 4",
        "expectedOutput": "YES\nNO",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\nQUERY 0 0\nQUERY 1 1\nUNION 4 3\nQUERY 4 1\nQUERY 2 0",
        "expectedOutput": "YES\nYES\nNO\nNO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3\nQUERY 0 0\nUNION 5 2\nUNION 3 3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n6\nQUERY 0 0\nUNION 0 0\nQUERY 3 3\nUNION 0 0\nUNION 2 0\nUNION 1 2",
        "expectedOutput": "YES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n7\nQUERY 0 0\nUNION 0 1\nQUERY 3 2\nQUERY 0 1\nUNION 2 1\nUNION 3 2\nUNION 2 0",
        "expectedOutput": "YES\nNO\nYES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n8\nQUERY 0 0\nQUERY 2 1\nUNION 2 1\nQUERY 3 1\nUNION 1 1\nUNION 2 2\nUNION 0 0\nUNION 0 1",
        "expectedOutput": "YES\nNO\nNO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n6\nQUERY 0 0\nUNION 2 2\nUNION 4 3\nUNION 3 4\nUNION 0 1\nUNION 3 1",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n6\nQUERY 0 0\nUNION 1 2\nUNION 4 0\nUNION 2 1\nQUERY 0 1\nUNION 3 1",
        "expectedOutput": "YES\nNO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n8\nQUERY 0 0\nQUERY 4 2\nUNION 5 2\nQUERY 0 2\nQUERY 0 0\nUNION 0 2\nUNION 2 1\nQUERY 2 0",
        "expectedOutput": "YES\nNO\nNO\nYES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\nQUERY 0 0\nUNION 4 3\nUNION 1 2",
        "expectedOutput": "YES",
        "isHidden": true
      }
    ]
  },
  "m9-lu11": {
    "title": "Disjoint sets",
    "slug": "belt-3-q27-disjoint-sets",
    "id": "M9-LU11",
    "testCases": [
      {
        "testIndex": 1,
        "input": "8\n4\nQUERY 0 0\nUNION 3 4\nQUERY 2 3\nUNION 3 4",
        "expectedOutput": "YES\nNO",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "5\n5\nQUERY 0 0\nQUERY 1 1\nUNION 4 3\nQUERY 4 1\nQUERY 2 0",
        "expectedOutput": "YES\nYES\nNO\nNO",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "6\n3\nQUERY 0 0\nUNION 5 2\nUNION 3 3",
        "expectedOutput": "YES",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "4\n6\nQUERY 0 0\nUNION 0 0\nQUERY 3 3\nUNION 0 0\nUNION 2 0\nUNION 1 2",
        "expectedOutput": "YES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n7\nQUERY 0 0\nUNION 0 1\nQUERY 3 2\nQUERY 0 1\nUNION 2 1\nUNION 3 2\nUNION 2 0",
        "expectedOutput": "YES\nNO\nYES",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "4\n8\nQUERY 0 0\nQUERY 2 1\nUNION 2 1\nQUERY 3 1\nUNION 1 1\nUNION 2 2\nUNION 0 0\nUNION 0 1",
        "expectedOutput": "YES\nNO\nNO",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n6\nQUERY 0 0\nUNION 2 2\nUNION 4 3\nUNION 3 4\nUNION 0 1\nUNION 3 1",
        "expectedOutput": "YES",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n6\nQUERY 0 0\nUNION 1 2\nUNION 4 0\nUNION 2 1\nQUERY 0 1\nUNION 3 1",
        "expectedOutput": "YES\nNO",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "6\n8\nQUERY 0 0\nQUERY 4 2\nUNION 5 2\nQUERY 0 2\nQUERY 0 0\nUNION 0 2\nUNION 2 1\nQUERY 2 0",
        "expectedOutput": "YES\nNO\nNO\nYES\nYES",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\n3\nQUERY 0 0\nUNION 4 3\nUNION 1 2",
        "expectedOutput": "YES",
        "isHidden": true
      }
    ]
  },
  "belt-3-q28-kosaraju-s-algorithm": {
    "title": "Kosaraju's algorithm",
    "slug": "belt-3-q28-kosaraju-s-algorithm",
    "id": "M9-LU12",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n4\n4 3\n2 1\n2 4\n0 3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n3 1\n2 1\n0 2\n1 0\n3 0\n2 3",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 1\n1 3\n2 0",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 2\n0 4",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2\n1 2\n3 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n0 1",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n2 1\n1 4\n2 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n1 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n0",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n0",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-3-q28-reverse-a-string": {
    "title": "Kosaraju's algorithm",
    "slug": "belt-3-q28-kosaraju-s-algorithm",
    "id": "M9-LU12",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n4\n4 3\n2 1\n2 4\n0 3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n3 1\n2 1\n0 2\n1 0\n3 0\n2 3",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 1\n1 3\n2 0",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 2\n0 4",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2\n1 2\n3 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n0 1",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n2 1\n1 4\n2 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n1 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n0",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n0",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "M9-LU12": {
    "title": "Kosaraju's algorithm",
    "slug": "belt-3-q28-kosaraju-s-algorithm",
    "id": "M9-LU12",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n4\n4 3\n2 1\n2 4\n0 3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n3 1\n2 1\n0 2\n1 0\n3 0\n2 3",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 1\n1 3\n2 0",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 2\n0 4",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2\n1 2\n3 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n0 1",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n2 1\n1 4\n2 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n1 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n0",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n0",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "m9-lu12": {
    "title": "Kosaraju's algorithm",
    "slug": "belt-3-q28-kosaraju-s-algorithm",
    "id": "M9-LU12",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n4\n4 3\n2 1\n2 4\n0 3",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n6\n3 1\n2 1\n0 2\n1 0\n3 0\n2 3",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n0 1\n1 3\n2 0",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "6\n2\n5 2\n0 4",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n2\n1 2\n3 2",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n1\n0 1",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n2 1\n1 4\n2 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\n1\n1 4",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n0",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "6\n0",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  "belt-3-q29-choosing-shortest-path-algorithms": {
    "title": "Choosing shortest-path algorithms",
    "slug": "belt-3-q29-choosing-shortest-path-algorithms",
    "id": "M9-LU13",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n6\n4 2 6\n4 1 8\n2 4 6\n0 2 1\n2 0 -1\n4 2 5",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n2\n3 2 -1\n0 0 2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n1\n0 2 7",
        "expectedOutput": "DIJKSTRA",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n8\n2 1 -2\n2 1 1\n0 0 5\n1 2 5\n2 2 6\n1 0 5\n1 2 3\n2 2 7",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n2 0 0\n0 1 -2\n2 2 7\n0 0 -2\n2 3 6\n1 1 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n4\n1 1 -3\n1 1 -1\n1 1 6\n0 0 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n1\n2 1 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n8\n5 5 2\n4 0 7\n5 4 -3\n2 5 5\n4 1 8\n5 4 7\n1 0 8\n3 0 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n5\n4 0 1\n0 1 -2\n2 3 0\n1 1 0\n3 3 3",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "DIJKSTRA",
        "isHidden": true
      }
    ]
  },
  "belt-3-q29-check-string-palindrome": {
    "title": "Choosing shortest-path algorithms",
    "slug": "belt-3-q29-choosing-shortest-path-algorithms",
    "id": "M9-LU13",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n6\n4 2 6\n4 1 8\n2 4 6\n0 2 1\n2 0 -1\n4 2 5",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n2\n3 2 -1\n0 0 2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n1\n0 2 7",
        "expectedOutput": "DIJKSTRA",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n8\n2 1 -2\n2 1 1\n0 0 5\n1 2 5\n2 2 6\n1 0 5\n1 2 3\n2 2 7",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n2 0 0\n0 1 -2\n2 2 7\n0 0 -2\n2 3 6\n1 1 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n4\n1 1 -3\n1 1 -1\n1 1 6\n0 0 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n1\n2 1 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n8\n5 5 2\n4 0 7\n5 4 -3\n2 5 5\n4 1 8\n5 4 7\n1 0 8\n3 0 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n5\n4 0 1\n0 1 -2\n2 3 0\n1 1 0\n3 3 3",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "DIJKSTRA",
        "isHidden": true
      }
    ]
  },
  "M9-LU13": {
    "title": "Choosing shortest-path algorithms",
    "slug": "belt-3-q29-choosing-shortest-path-algorithms",
    "id": "M9-LU13",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n6\n4 2 6\n4 1 8\n2 4 6\n0 2 1\n2 0 -1\n4 2 5",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n2\n3 2 -1\n0 0 2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n1\n0 2 7",
        "expectedOutput": "DIJKSTRA",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n8\n2 1 -2\n2 1 1\n0 0 5\n1 2 5\n2 2 6\n1 0 5\n1 2 3\n2 2 7",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n2 0 0\n0 1 -2\n2 2 7\n0 0 -2\n2 3 6\n1 1 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n4\n1 1 -3\n1 1 -1\n1 1 6\n0 0 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n1\n2 1 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n8\n5 5 2\n4 0 7\n5 4 -3\n2 5 5\n4 1 8\n5 4 7\n1 0 8\n3 0 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n5\n4 0 1\n0 1 -2\n2 3 0\n1 1 0\n3 3 3",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "DIJKSTRA",
        "isHidden": true
      }
    ]
  },
  "m9-lu13": {
    "title": "Choosing shortest-path algorithms",
    "slug": "belt-3-q29-choosing-shortest-path-algorithms",
    "id": "M9-LU13",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n6\n4 2 6\n4 1 8\n2 4 6\n0 2 1\n2 0 -1\n4 2 5",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\n2\n3 2 -1\n0 0 2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "3\n1\n0 2 7",
        "expectedOutput": "DIJKSTRA",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "3\n8\n2 1 -2\n2 1 1\n0 0 5\n1 2 5\n2 2 6\n1 0 5\n1 2 3\n2 2 7",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\n6\n2 0 0\n0 1 -2\n2 2 7\n0 0 -2\n2 3 6\n1 1 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\n4\n1 1 -3\n1 1 -1\n1 1 6\n0 0 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "4\n1\n2 1 -2",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n8\n5 5 2\n4 0 7\n5 4 -3\n2 5 5\n4 1 8\n5 4 7\n1 0 8\n3 0 6",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "5\n5\n4 0 1\n0 1 -2\n2 3 0\n1 1 0\n3 3 3",
        "expectedOutput": "BELLMAN_FORD",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "2\n1\n0 1 6",
        "expectedOutput": "DIJKSTRA",
        "isHidden": true
      }
    ]
  },
  "belt-3-q30-dynamic-programming": {
    "title": "Dynamic programming",
    "slug": "belt-3-q30-dynamic-programming",
    "id": "M10-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n3\n2 7 7\n5 5 -4\n-3 8 9\n-3 1 -3",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\n3\n4 4 -5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n1 2 5\n0 9 6\n8 8 1\n-2 0 0",
        "expectedOutput": "21",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n7 -4 3 8 4\n5 9 -5 7 0\n8 5 0 4 -3\n2 9 1 1 -5\n3 7 3 0 1",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n5\n1 1 -1 7 -3\n-2 8 9 -4 -1\n-5 -5 -1 0 8\n-2 4 4 6 6\n5 -5 -2 -4 -4",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n5\n-4 -3 -2 0 -1",
        "expectedOutput": "-10",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n9 7 8\n1 -1 6\n3 0 1\n-2 3 5\n-3 3 5",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n-1 3\n5 9\n0 7",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n5\n2 4 -2 0 9\n-3 7 -5 6 1",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n3\n5 5 -3\n7 6 -1\n4 7 1\n9 1 2",
        "expectedOutput": "28",
        "isHidden": true
      }
    ]
  },
  "belt-3-q30-count-character-occurrences": {
    "title": "Dynamic programming",
    "slug": "belt-3-q30-dynamic-programming",
    "id": "M10-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n3\n2 7 7\n5 5 -4\n-3 8 9\n-3 1 -3",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\n3\n4 4 -5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n1 2 5\n0 9 6\n8 8 1\n-2 0 0",
        "expectedOutput": "21",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n7 -4 3 8 4\n5 9 -5 7 0\n8 5 0 4 -3\n2 9 1 1 -5\n3 7 3 0 1",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n5\n1 1 -1 7 -3\n-2 8 9 -4 -1\n-5 -5 -1 0 8\n-2 4 4 6 6\n5 -5 -2 -4 -4",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n5\n-4 -3 -2 0 -1",
        "expectedOutput": "-10",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n9 7 8\n1 -1 6\n3 0 1\n-2 3 5\n-3 3 5",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n-1 3\n5 9\n0 7",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n5\n2 4 -2 0 9\n-3 7 -5 6 1",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n3\n5 5 -3\n7 6 -1\n4 7 1\n9 1 2",
        "expectedOutput": "28",
        "isHidden": true
      }
    ]
  },
  "M10-LU1": {
    "title": "Dynamic programming",
    "slug": "belt-3-q30-dynamic-programming",
    "id": "M10-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n3\n2 7 7\n5 5 -4\n-3 8 9\n-3 1 -3",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\n3\n4 4 -5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n1 2 5\n0 9 6\n8 8 1\n-2 0 0",
        "expectedOutput": "21",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n7 -4 3 8 4\n5 9 -5 7 0\n8 5 0 4 -3\n2 9 1 1 -5\n3 7 3 0 1",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n5\n1 1 -1 7 -3\n-2 8 9 -4 -1\n-5 -5 -1 0 8\n-2 4 4 6 6\n5 -5 -2 -4 -4",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n5\n-4 -3 -2 0 -1",
        "expectedOutput": "-10",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n9 7 8\n1 -1 6\n3 0 1\n-2 3 5\n-3 3 5",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n-1 3\n5 9\n0 7",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n5\n2 4 -2 0 9\n-3 7 -5 6 1",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n3\n5 5 -3\n7 6 -1\n4 7 1\n9 1 2",
        "expectedOutput": "28",
        "isHidden": true
      }
    ]
  },
  "m10-lu1": {
    "title": "Dynamic programming",
    "slug": "belt-3-q30-dynamic-programming",
    "id": "M10-LU1",
    "testCases": [
      {
        "testIndex": 1,
        "input": "4\n3\n2 7 7\n5 5 -4\n-3 8 9\n-3 1 -3",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "1\n3\n4 4 -5",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4\n3\n1 2 5\n0 9 6\n8 8 1\n-2 0 0",
        "expectedOutput": "21",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n5\n7 -4 3 8 4\n5 9 -5 7 0\n8 5 0 4 -3\n2 9 1 1 -5\n3 7 3 0 1",
        "expectedOutput": "46",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "5\n5\n1 1 -1 7 -3\n-2 8 9 -4 -1\n-5 -5 -1 0 8\n-2 4 4 6 6\n5 -5 -2 -4 -4",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "1\n5\n-4 -3 -2 0 -1",
        "expectedOutput": "-10",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "5\n3\n9 7 8\n1 -1 6\n3 0 1\n-2 3 5\n-3 3 5",
        "expectedOutput": "41",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "3\n2\n-1 3\n5 9\n0 7",
        "expectedOutput": "20",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "2\n5\n2 4 -2 0 9\n-3 7 -5 6 1",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "4\n3\n5 5 -3\n7 6 -1\n4 7 1\n9 1 2",
        "expectedOutput": "28",
        "isHidden": true
      }
    ]
  },
  "belt-3-q31-tries": {
    "title": "Tries",
    "slug": "belt-3-q31-tries",
    "id": "M10-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\napple\napp\napply\nba",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\napple\napp\napply\napp",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\napple\napp\napply\nbat\nbanana\nba",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\napple\napp\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\napple\napp\napply\nbat\nba",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\napple\napp\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\napple\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\napple\napp\napply\nbat\nbanana\napp",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\napple\napp\napply\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\napple\napp\napply\nbat\nbanana\nz",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-3-q31-remove-spaces-from-a-string": {
    "title": "Tries",
    "slug": "belt-3-q31-tries",
    "id": "M10-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\napple\napp\napply\nba",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\napple\napp\napply\napp",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\napple\napp\napply\nbat\nbanana\nba",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\napple\napp\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\napple\napp\napply\nbat\nba",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\napple\napp\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\napple\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\napple\napp\napply\nbat\nbanana\napp",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\napple\napp\napply\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\napple\napp\napply\nbat\nbanana\nz",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "M10-LU2": {
    "title": "Tries",
    "slug": "belt-3-q31-tries",
    "id": "M10-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\napple\napp\napply\nba",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\napple\napp\napply\napp",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\napple\napp\napply\nbat\nbanana\nba",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\napple\napp\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\napple\napp\napply\nbat\nba",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\napple\napp\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\napple\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\napple\napp\napply\nbat\nbanana\napp",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\napple\napp\napply\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\napple\napp\napply\nbat\nbanana\nz",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "m10-lu2": {
    "title": "Tries",
    "slug": "belt-3-q31-tries",
    "id": "M10-LU2",
    "testCases": [
      {
        "testIndex": 1,
        "input": "3\napple\napp\napply\nba",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "3\napple\napp\napply\napp",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\napple\napp\napply\nbat\nbanana\nba",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "2\napple\napp\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "4\napple\napp\napply\nbat\nba",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "2\napple\napp\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "1\napple\nba",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "5\napple\napp\napply\nbat\nbanana\napp",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "3\napple\napp\napply\nz",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "5\napple\napp\napply\nbat\nbanana\nz",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  "belt-3-q32-heaps-and-priority-queues": {
    "title": "Heaps and priority queues",
    "slug": "belt-3-q32-heaps-and-priority-queues",
    "id": "M10-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\nJ0|4\nJ1|1",
        "expectedOutput": "J1\nJ0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\nJ0|3\nJ1|2\nJ2|5\nJ3|3",
        "expectedOutput": "J1\nJ0\nJ3\nJ2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nJ0|5\nJ1|5\nJ2|3\nJ3|3\nJ4|5",
        "expectedOutput": "J2\nJ3\nJ0\nJ1\nJ4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nJ0|4",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\nJ0|3",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\nJ0|1\nJ1|5\nJ2|3\nJ3|4\nJ4|3\nJ5|3",
        "expectedOutput": "J0\nJ2\nJ4\nJ5\nJ3\nJ1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\nJ0|4\nJ1|2\nJ2|4\nJ3|5\nJ4|1\nJ5|2",
        "expectedOutput": "J4\nJ1\nJ5\nJ0\nJ2\nJ3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\nJ0|4\nJ1|1\nJ2|4\nJ3|3\nJ4|1\nJ5|4\nJ6|2",
        "expectedOutput": "J1\nJ4\nJ6\nJ3\nJ0\nJ2\nJ5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\nJ0|1",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\nJ0|1\nJ1|5\nJ2|1",
        "expectedOutput": "J0\nJ2\nJ1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q32-compare-two-strings": {
    "title": "Heaps and priority queues",
    "slug": "belt-3-q32-heaps-and-priority-queues",
    "id": "M10-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\nJ0|4\nJ1|1",
        "expectedOutput": "J1\nJ0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\nJ0|3\nJ1|2\nJ2|5\nJ3|3",
        "expectedOutput": "J1\nJ0\nJ3\nJ2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nJ0|5\nJ1|5\nJ2|3\nJ3|3\nJ4|5",
        "expectedOutput": "J2\nJ3\nJ0\nJ1\nJ4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nJ0|4",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\nJ0|3",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\nJ0|1\nJ1|5\nJ2|3\nJ3|4\nJ4|3\nJ5|3",
        "expectedOutput": "J0\nJ2\nJ4\nJ5\nJ3\nJ1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\nJ0|4\nJ1|2\nJ2|4\nJ3|5\nJ4|1\nJ5|2",
        "expectedOutput": "J4\nJ1\nJ5\nJ0\nJ2\nJ3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\nJ0|4\nJ1|1\nJ2|4\nJ3|3\nJ4|1\nJ5|4\nJ6|2",
        "expectedOutput": "J1\nJ4\nJ6\nJ3\nJ0\nJ2\nJ5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\nJ0|1",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\nJ0|1\nJ1|5\nJ2|1",
        "expectedOutput": "J0\nJ2\nJ1",
        "isHidden": true
      }
    ]
  },
  "M10-LU3": {
    "title": "Heaps and priority queues",
    "slug": "belt-3-q32-heaps-and-priority-queues",
    "id": "M10-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\nJ0|4\nJ1|1",
        "expectedOutput": "J1\nJ0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\nJ0|3\nJ1|2\nJ2|5\nJ3|3",
        "expectedOutput": "J1\nJ0\nJ3\nJ2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nJ0|5\nJ1|5\nJ2|3\nJ3|3\nJ4|5",
        "expectedOutput": "J2\nJ3\nJ0\nJ1\nJ4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nJ0|4",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\nJ0|3",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\nJ0|1\nJ1|5\nJ2|3\nJ3|4\nJ4|3\nJ5|3",
        "expectedOutput": "J0\nJ2\nJ4\nJ5\nJ3\nJ1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\nJ0|4\nJ1|2\nJ2|4\nJ3|5\nJ4|1\nJ5|2",
        "expectedOutput": "J4\nJ1\nJ5\nJ0\nJ2\nJ3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\nJ0|4\nJ1|1\nJ2|4\nJ3|3\nJ4|1\nJ5|4\nJ6|2",
        "expectedOutput": "J1\nJ4\nJ6\nJ3\nJ0\nJ2\nJ5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\nJ0|1",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\nJ0|1\nJ1|5\nJ2|1",
        "expectedOutput": "J0\nJ2\nJ1",
        "isHidden": true
      }
    ]
  },
  "m10-lu3": {
    "title": "Heaps and priority queues",
    "slug": "belt-3-q32-heaps-and-priority-queues",
    "id": "M10-LU3",
    "testCases": [
      {
        "testIndex": 1,
        "input": "2\nJ0|4\nJ1|1",
        "expectedOutput": "J1\nJ0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "4\nJ0|3\nJ1|2\nJ2|5\nJ3|3",
        "expectedOutput": "J1\nJ0\nJ3\nJ2",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "5\nJ0|5\nJ1|5\nJ2|3\nJ3|3\nJ4|5",
        "expectedOutput": "J2\nJ3\nJ0\nJ1\nJ4",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "1\nJ0|4",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "1\nJ0|3",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "6\nJ0|1\nJ1|5\nJ2|3\nJ3|4\nJ4|3\nJ5|3",
        "expectedOutput": "J0\nJ2\nJ4\nJ5\nJ3\nJ1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "6\nJ0|4\nJ1|2\nJ2|4\nJ3|5\nJ4|1\nJ5|2",
        "expectedOutput": "J4\nJ1\nJ5\nJ0\nJ2\nJ3",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "7\nJ0|4\nJ1|1\nJ2|4\nJ3|3\nJ4|1\nJ5|4\nJ6|2",
        "expectedOutput": "J1\nJ4\nJ6\nJ3\nJ0\nJ2\nJ5",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "1\nJ0|1",
        "expectedOutput": "J0",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "3\nJ0|1\nJ1|5\nJ2|1",
        "expectedOutput": "J0\nJ2\nJ1",
        "isHidden": true
      }
    ]
  },
  "belt-3-q33-bit-manipulation": {
    "title": "Bit manipulation",
    "slug": "belt-3-q33-bit-manipulation",
    "id": "M10-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n134 106 106 170 201",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n214 157 109 219 63 193",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n55",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n197 143 43 9 139",
        "expectedOutput": "19",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n47 231",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n253 172 85 105 144 167 178",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n156 20 191 85 227 128 237",
        "expectedOutput": "29",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n212 72 253 156 202 203",
        "expectedOutput": "26",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n255 82 197 98 121 26 124 135",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n96 58 15 21 93 236 85 52",
        "expectedOutput": "30",
        "isHidden": true
      }
    ]
  },
  "belt-3-q33-most-frequent-element": {
    "title": "Bit manipulation",
    "slug": "belt-3-q33-bit-manipulation",
    "id": "M10-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n134 106 106 170 201",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n214 157 109 219 63 193",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n55",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n197 143 43 9 139",
        "expectedOutput": "19",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n47 231",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n253 172 85 105 144 167 178",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n156 20 191 85 227 128 237",
        "expectedOutput": "29",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n212 72 253 156 202 203",
        "expectedOutput": "26",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n255 82 197 98 121 26 124 135",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n96 58 15 21 93 236 85 52",
        "expectedOutput": "30",
        "isHidden": true
      }
    ]
  },
  "M10-LU4": {
    "title": "Bit manipulation",
    "slug": "belt-3-q33-bit-manipulation",
    "id": "M10-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n134 106 106 170 201",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n214 157 109 219 63 193",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n55",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n197 143 43 9 139",
        "expectedOutput": "19",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n47 231",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n253 172 85 105 144 167 178",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n156 20 191 85 227 128 237",
        "expectedOutput": "29",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n212 72 253 156 202 203",
        "expectedOutput": "26",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n255 82 197 98 121 26 124 135",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n96 58 15 21 93 236 85 52",
        "expectedOutput": "30",
        "isHidden": true
      }
    ]
  },
  "m10-lu4": {
    "title": "Bit manipulation",
    "slug": "belt-3-q33-bit-manipulation",
    "id": "M10-LU4",
    "testCases": [
      {
        "testIndex": 1,
        "input": "5\n134 106 106 170 201",
        "expectedOutput": "19",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "6\n214 157 109 219 63 193",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "1\n55",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "5\n197 143 43 9 139",
        "expectedOutput": "19",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "2\n47 231",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "7\n253 172 85 105 144 167 178",
        "expectedOutput": "30",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "7\n156 20 191 85 227 128 237",
        "expectedOutput": "29",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6\n212 72 253 156 202 203",
        "expectedOutput": "26",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "8\n255 82 197 98 121 26 124 135",
        "expectedOutput": "35",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "8\n96 58 15 21 93 236 85 52",
        "expectedOutput": "30",
        "isHidden": true
      }
    ]
  },
  "belt-3-q34-string-algorithms": {
    "title": "String algorithms",
    "slug": "belt-3-q34-string-algorithms",
    "id": "M10-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "babacaba\na",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "abaabcacabb\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "accacbaa\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bbcaccb\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "accacbac\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "caccbcabbbb\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "caacaca\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "accbaaacbbb\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "ccbacbbbaa\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bccbaacbcab\na",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q34-left-rotate-an-array": {
    "title": "String algorithms",
    "slug": "belt-3-q34-string-algorithms",
    "id": "M10-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "babacaba\na",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "abaabcacabb\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "accacbaa\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bbcaccb\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "accacbac\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "caccbcabbbb\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "caacaca\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "accbaaacbbb\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "ccbacbbbaa\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bccbaacbcab\na",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "M10-LU5": {
    "title": "String algorithms",
    "slug": "belt-3-q34-string-algorithms",
    "id": "M10-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "babacaba\na",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "abaabcacabb\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "accacbaa\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bbcaccb\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "accacbac\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "caccbcabbbb\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "caacaca\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "accbaaacbbb\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "ccbacbbbaa\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bccbaacbcab\na",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "m10-lu5": {
    "title": "String algorithms",
    "slug": "belt-3-q34-string-algorithms",
    "id": "M10-LU5",
    "testCases": [
      {
        "testIndex": 1,
        "input": "babacaba\na",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "abaabcacabb\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "accacbaa\na",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 4,
        "input": "bbcaccb\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 5,
        "input": "accacbac\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "caccbcabbbb\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "caacaca\na",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "accbaaacbbb\na",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "ccbacbbbaa\na",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "bccbaacbcab\na",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  "belt-3-q35-advanced-recursion": {
    "title": "Advanced recursion",
    "slug": "belt-3-q35-advanced-recursion",
    "id": "M10-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "255",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4",
        "expectedOutput": "15",
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
        "input": "3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10",
        "expectedOutput": "1023",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "12",
        "expectedOutput": "4095",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6",
        "expectedOutput": "63",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "511",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "11",
        "expectedOutput": "2047",
        "isHidden": true
      }
    ]
  },
  "belt-3-q35-right-rotate-an-array": {
    "title": "Advanced recursion",
    "slug": "belt-3-q35-advanced-recursion",
    "id": "M10-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "255",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4",
        "expectedOutput": "15",
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
        "input": "3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10",
        "expectedOutput": "1023",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "12",
        "expectedOutput": "4095",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6",
        "expectedOutput": "63",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "511",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "11",
        "expectedOutput": "2047",
        "isHidden": true
      }
    ]
  },
  "M10-LU6": {
    "title": "Advanced recursion",
    "slug": "belt-3-q35-advanced-recursion",
    "id": "M10-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "255",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4",
        "expectedOutput": "15",
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
        "input": "3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10",
        "expectedOutput": "1023",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "12",
        "expectedOutput": "4095",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6",
        "expectedOutput": "63",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "511",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "11",
        "expectedOutput": "2047",
        "isHidden": true
      }
    ]
  },
  "m10-lu6": {
    "title": "Advanced recursion",
    "slug": "belt-3-q35-advanced-recursion",
    "id": "M10-LU6",
    "testCases": [
      {
        "testIndex": 1,
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "255",
        "isHidden": false
      },
      {
        "testIndex": 3,
        "input": "4",
        "expectedOutput": "15",
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
        "input": "3",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "testIndex": 6,
        "input": "10",
        "expectedOutput": "1023",
        "isHidden": true
      },
      {
        "testIndex": 7,
        "input": "12",
        "expectedOutput": "4095",
        "isHidden": true
      },
      {
        "testIndex": 8,
        "input": "6",
        "expectedOutput": "63",
        "isHidden": true
      },
      {
        "testIndex": 9,
        "input": "9",
        "expectedOutput": "511",
        "isHidden": true
      },
      {
        "testIndex": 10,
        "input": "11",
        "expectedOutput": "2047",
        "isHidden": true
      }
    ]
  },
  "sum-of-two-numbers": {
    "title": "Sum of Two Numbers",
    "slug": "sum-of-two-numbers",
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
  if (/process\s*\.\s*env/i.test(code) || /child_process/i.test(code) || /__proto__/i.test(code) || /binding\s*\(\s*['"]process/i.test(code)) {
    return {
      output: "",
      error: "Security Violation: Access to system environment, process, and native bindings is strictly forbidden."
    };
  }
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
    "use strict";
    try {
      Object.defineProperty(Function.prototype, 'constructor', {
        value: function() { throw new Error('Security Violation: Dynamic Function compilation is disabled.'); },
        configurable: false,
        writable: false,
      });
    } catch (_) {}
    const print = console.log;
    let __lIdx = 0, __tIdx = 0;
    const __lines = ${JSON.stringify(inputLines)};
    const __tokens = ${JSON.stringify(inputTokens)};
    const readline = () => __lIdx < __lines.length ? __lines[__lIdx++] : '';
    const readToken = () => __tIdx < __tokens.length ? __tokens[__tIdx++] : '';
  `;
  try {
    const sandbox = {
      console: customConsole,
      require: mockRequire,
      process: mockProcess,
      setTimeout: void 0,
      setInterval: void 0,
      setImmediate: void 0,
      global: void 0,
      globalThis: void 0
    };
    const script = new vm.Script(`${prelude}
${code}`);
    const context = vm.createContext(sandbox);
    script.runInContext(context, { timeout: 2e3 });
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
  if (/process\s*\.\s*env/i.test(code) || /child_process/i.test(code) || /__proto__/i.test(code) || /binding\s*\(\s*['"]process/i.test(code)) {
    return { ok: false, error: "SecurityError: Access to process/environment bindings is prohibited." };
  }
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
  const { questionSlug, language, code, isSubmit: _isSubmit = true } = req;
  const problemMap = serverTestCases || serverTestCases_default || serverTestCases_exports;
  let problem = problemMap[questionSlug];
  if (!problem) {
    const foundKey = Object.keys(problemMap).find(
      (k) => k === questionSlug || k.endsWith(questionSlug) || questionSlug.endsWith(k)
    );
    if (foundKey) {
      problem = problemMap[foundKey];
    }
  }
  const authoritativeTotal = problem?.testCases?.length || 10;
  if (!code || !code.trim()) {
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: "COMPILATION_ERROR",
      error: "Compilation Error",
      message: "Source code cannot be empty.",
      testCases: []
    };
  }
  if (code.length > 65536) {
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: "COMPILATION_ERROR",
      error: "Payload Too Large",
      message: "Submitted code exceeds the maximum allowed limit of 64KB.",
      testCases: []
    };
  }
  const compCheck = checkCompilation(code, language);
  if (!compCheck.ok) {
    const isSecErr = compCheck.error?.includes("SecurityError");
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: isSecErr ? "RUNTIME_ERROR" : "COMPILATION_ERROR",
      error: isSecErr ? compCheck.error : "Compilation Error",
      message: compCheck.error || "Syntax / Compilation error detected in your code.",
      testCases: []
    };
  }
  if (!problem) {
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
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
      total: testCases?.length || 10,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: "SYSTEM_ERROR",
      error: "Invalid Question Configuration",
      message: `Question must have exactly 10 test cases (found ${testCases?.length || 0}).`,
      testCases: []
    };
  }
  const casesToExecute = testCases;
  const totalCount = testCases.length;
  const visibleCount = 3;
  const hiddenCount = 7;
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
        executed: i,
        visibleCount,
        hiddenCount,
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
    executed: casesToExecute.length,
    visibleCount,
    hiddenCount,
    overallTimeMs,
    status: executionStatus,
    message: isAccepted ? "All test cases passed successfully." : `${passedCount} of ${totalCount} test cases passed.`,
    testCases: sanitizedResults
  };
}

// src/server/apiHandler.ts
var rateLimitMap = /* @__PURE__ */ new Map();
function pruneRateLimitMap() {
  if (rateLimitMap.size > 2e3) {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) rateLimitMap.delete(key);
    }
  }
}
function checkRateLimit(ip, maxLimit = 60, windowMs = 6e4) {
  pruneRateLimitMap();
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  if (record.count >= maxLimit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1e3);
    return { allowed: false, retryAfter };
  }
  record.count++;
  return { allowed: true };
}
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
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "127.0.0.1";
  const rate = checkRateLimit(ip, 60, 6e4);
  if (!rate.allowed) {
    res.setHeader("Retry-After", String(rate.retryAfter || 60));
    return sendJson(429, {
      success: false,
      error: "Too Many Requests",
      message: `Execution rate limit exceeded. Please wait ${rate.retryAfter} seconds before trying again.`
    });
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
      total: 10,
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
      total: 10,
      passed: 0,
      testCases: []
    });
  }
}
export {
  handler as default
};
