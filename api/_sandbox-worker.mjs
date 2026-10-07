// src/server/codeRunnerCore.ts
import * as vm2 from "node:vm";

// src/server/sandbox.ts
import * as vm from "node:vm";
import { types } from "node:util";

// src/lib/runner/evaluator.ts
var defaultEvaluator = (keys, values, body) => {
  const runner = new Function(...keys, body);
  runner(...values);
};
var activeEvaluator = defaultEvaluator;
function setEvaluator(evaluator) {
  activeEvaluator = evaluator || defaultEvaluator;
}
function evaluate(keys, values, body) {
  activeEvaluator(keys, values, body);
}

// src/lib/runner/pythonRunner.ts
function installPythonRuntimeExtensions() {
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
}
installPythonRuntimeExtensions();
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
          (_match, indent, targets, _lastTarget, rawRhs) => {
            let rhs = rawRhs.trim();
            let hasTopComma = false;
            let depth = 0;
            for (let i = 0; i < rhs.length; i++) {
              const ch = rhs[i];
              if (ch === "(" || ch === "[" || ch === "{") depth++;
              else if (ch === ")" || ch === "]" || ch === "}") depth--;
              else if (ch === "," && depth === 0) {
                hasTopComma = true;
                break;
              }
            }
            if (hasTopComma) {
              rhs = `[${rhs}]`;
            } else if (rhs.startsWith("(") && rhs.endsWith(")")) {
              let innerDepth = 0;
              let hasInnerComma = false;
              for (let i = 1; i < rhs.length - 1; i++) {
                const ch = rhs[i];
                if (ch === "(" || ch === "[" || ch === "{") innerDepth++;
                else if (ch === ")" || ch === "]" || ch === "}") innerDepth--;
                else if (ch === "," && innerDepth === 0) {
                  hasInnerComma = true;
                  break;
                }
              }
              if (hasInnerComma) {
                rhs = `[${rhs.slice(1, -1)}]`;
              }
            }
            return `${indent}var [${targets}] = ${rhs}`;
          }
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
    evaluate(keys, values, formattedJs);
    return { output: outputs.join("\n").trim() };
  } catch (err) {
    return {
      output: outputs.join("\n").trim(),
      error: err.message || "Execution error"
    };
  }
}

// src/server/sandbox.ts
var PER_CASE_TIMEOUT_MS = 1e3;
var CONTEXT_INIT = `
var __name = function (f) { return f };
try {
  Object.defineProperty(Error, 'prepareStackTrace', { value: undefined, writable: false, configurable: false });
} catch (_) {}
`;
function blockedConstructor() {
  throw new Error("Security Violation: Dynamic code generation is disabled.");
}
function withHardenedHostIntrinsics(fn) {
  const protos = [
    Function.prototype,
    Object.getPrototypeOf(async function() {
    }),
    Object.getPrototypeOf(function* () {
    }),
    Object.getPrototypeOf(async function* () {
    })
  ];
  const saved = protos.map((p) => Object.getOwnPropertyDescriptor(p, "constructor"));
  for (const p of protos) {
    Object.defineProperty(p, "constructor", { value: blockedConstructor, writable: true, configurable: true });
  }
  try {
    return fn();
  } finally {
    protos.forEach((p, i) => {
      const descriptor = saved[i];
      if (descriptor) Object.defineProperty(p, "constructor", descriptor);
    });
  }
}
var sandboxEvaluator = (keys, values, body) => {
  const sandbox = /* @__PURE__ */ Object.create(null);
  const context = vm.createContext(sandbox, {
    microtaskMode: "afterEvaluate",
    codeGeneration: { strings: false, wasm: false }
  });
  vm.runInContext(CONTEXT_INIT, context, { timeout: PER_CASE_TIMEOUT_MS });
  vm.runInContext(`(${installPythonRuntimeExtensions.toString()})()`, context, { timeout: PER_CASE_TIMEOUT_MS });
  for (let i = 0; i < keys.length; i++) {
    sandbox[keys[i]] = values[i];
  }
  const script = new vm.Script(`(function () {
${body}
}).call(undefined)`, { filename: "submission.js" });
  withHardenedHostIntrinsics(() => {
    try {
      script.runInContext(context, { timeout: PER_CASE_TIMEOUT_MS, breakOnSigint: false });
    } catch (err) {
      const ownValue = (key) => {
        try {
          return err !== null && typeof err === "object" && !types.isProxy(err) ? Object.getOwnPropertyDescriptor(err, key)?.value : void 0;
        } catch {
          return void 0;
        }
      };
      if (ownValue("code") === "ERR_SCRIPT_EXECUTION_TIMEOUT" || /timed out/i.test(String(ownValue("message")))) {
        throw new Error("Time Limit Exceeded");
      }
      const message = ownValue("message");
      const text = typeof message === "string" ? message : "Runtime Error";
      throw new Error(text);
    }
  });
};
var SANDBOX_REJECTION_WINDOW_MS = 5e3;
var lastSandboxRunAt = 0;
var rejectionGuardInstalled = false;
var lastRejectionWarnAt = 0;
function installRejectionGuard() {
  if (rejectionGuardInstalled) return;
  rejectionGuardInstalled = true;
  process.on("unhandledRejection", (reason) => {
    if (Date.now() - lastSandboxRunAt < SANDBOX_REJECTION_WINDOW_MS) {
      if (Date.now() - lastRejectionWarnAt > 5e3) {
        lastRejectionWarnAt = Date.now();
        console.warn("[sandbox] dropped unhandled promise rejection(s) raised by submitted code");
      }
      return;
    }
    throw reason;
  });
}
var installed = false;
function installSandbox() {
  if (installed) return;
  installRejectionGuard();
  setEvaluator((keys, values, body) => {
    lastSandboxRunAt = Date.now();
    try {
      sandboxEvaluator(keys, values, body);
    } finally {
      lastSandboxRunAt = Date.now();
    }
  });
  installed = true;
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
    evaluate(keys, values, cleanCode);
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
    evaluate(keys, values, cleanCode);
    System.out.flush();
    return { output: outputs.join("\n").trim() };
  } catch (err) {
    return {
      output: outputs.join("\n").trim(),
      error: err.message || "Java execution error"
    };
  }
}

// src/server/codeRunnerCore.ts
installSandbox();
var MAX_OUTPUT_CHARS = 1e6;
var TOTAL_EXECUTION_BUDGET_MS = 7e3;
function executeJavaScript(code, input) {
  if (/process\s*\.\s*env/i.test(code) || /child_process/i.test(code) || /__proto__/i.test(code) || /binding\s*\(\s*['"]process/i.test(code)) {
    return {
      output: "",
      error: "Security Violation: Access to system environment, process, and native bindings is strictly forbidden."
    };
  }
  const outputs = [];
  let outputChars = 0;
  const emit = (text) => {
    outputChars += text.length + 1;
    if (outputChars > MAX_OUTPUT_CHARS) throw new Error("Output Limit Exceeded");
    outputs.push(text);
  };
  const normalizedInput = input.replace(/\r\n/g, "\n");
  const inputLines = normalizedInput.split("\n");
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean);
  const formatArg = (a) => typeof a === "object" && a !== null ? JSON.stringify(a) : String(a);
  const customConsole = {
    log: (...args) => emit(args.map(formatArg).join(" ")),
    info: (...args) => emit(args.map(formatArg).join(" ")),
    error: (...args) => emit(args.map((a) => String(a)).join(" ")),
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
    stdout: { write: (data) => emit(String(data)) },
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
    const print = console.log;
    let __lIdx = 0, __tIdx = 0;
    const __lines = ${JSON.stringify(inputLines)};
    const __tokens = ${JSON.stringify(inputTokens)};
    const readline = () => __lIdx < __lines.length ? __lines[__lIdx++] : '';
    const readToken = () => __tIdx < __tokens.length ? __tokens[__tIdx++] : '';
  `;
  try {
    const bindings = {
      console: customConsole,
      require: mockRequire,
      process: mockProcess,
      setTimeout: void 0,
      setInterval: void 0,
      setImmediate: void 0,
      global: void 0,
      globalThis: void 0
    };
    evaluate(Object.keys(bindings), Object.values(bindings), `${prelude}
${code}`);
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
  } else if (lang === "javascript" || lang === "js" || lang === "nodejs" || lang === "node") {
    try {
      new vm2.Script(`(function (console, require, process) {
${code}
})`, { filename: "submission.js" });
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
function runSubmissionJob(job, onCase) {
  const compCheck = checkCompilation(job.code, job.language);
  if (!compCheck.ok) return { kind: "precheck_failed", error: compCheck.error || "Compilation error" };
  const started = performance.now();
  const cases = [];
  for (const input of job.inputs) {
    const t0 = performance.now();
    const exhausted = t0 - started > TOTAL_EXECUTION_BUDGET_MS;
    const exec = exhausted ? { output: "", error: "Time Limit Exceeded" } : runSingleTestCase(job.code, job.language, input);
    const caseResult = { output: exec.output, error: exec.error, ms: Math.round(performance.now() - t0) };
    cases.push(caseResult);
    onCase?.(cases.length - 1, caseResult);
  }
  return { kind: "ran", cases };
}

// src/server/sandboxWorker.ts
if (typeof process.send !== "function") {
  throw new Error("sandboxWorker must be started with an IPC channel");
}
process.once("message", (job) => {
  const result = runSubmissionJob(job, (index, caseResult) => {
    process.send({ type: "case", index, result: caseResult });
  });
  process.send({ type: "done", result }, void 0, void 0, () => process.exit(0));
});
