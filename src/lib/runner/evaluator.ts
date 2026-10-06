/**
 * Pluggable evaluator used by the language runners to execute their transpiled JavaScript.
 *
 * - Browser / Web Worker: the default evaluator (`new Function`) is fine because the code runs in the
 *   student's own browser sandbox.
 * - Server: `src/server/sandbox.ts` installs a hardened `node:vm` evaluator (fresh null-prototype context,
 *   no `process`/`require`, no dynamic `import()`, CPU timeout). Student code must never be evaluated in the
 *   server's own realm.
 */
export type Evaluator = (keys: string[], values: unknown[], body: string) => void

const defaultEvaluator: Evaluator = (keys, values, body) => {
  const runner = new Function(...keys, body)
  runner(...values)
}

let activeEvaluator: Evaluator = defaultEvaluator

export function setEvaluator(evaluator: Evaluator | null): void {
  activeEvaluator = evaluator || defaultEvaluator
}

export function evaluate(keys: string[], values: unknown[], body: string): void {
  activeEvaluator(keys, values, body)
}
