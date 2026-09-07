import { executePython } from './pythonRunner'
import { executeCpp } from './cppRunner'
import { executeJava } from './javaRunner'

export interface WorkerRequest {
  id: string
  code: string
  language: string
  input: string
}

export interface WorkerResponse {
  id: string
  output: string
  error?: string
  executionTimeMs: number
}

function executeJavaScript(code: string, input: string): { output: string; error?: string } {
  const outputs: string[] = []
  const normalizedInput = input.replace(/\r\n/g, '\n')
  const inputLines = normalizedInput.split('\n')
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean)

  const customConsole = {
    log: (...args: any[]) => {
      outputs.push(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' '))
    },
    info: (...args: any[]) => {
      outputs.push(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' '))
    },
    error: (...args: any[]) => {
      outputs.push(args.map(arg => String(arg)).join(' '))
    },
    warn: () => {},
  }

  const mockFs = {
    readFileSync: (_fd: any, _enc?: string) => normalizedInput,
    readSync: () => normalizedInput,
  }

  const mockProcess = {
    stdin: {
      read: () => normalizedInput,
      on: (event: string, cb: any) => {
        if (event === 'data') cb(normalizedInput)
        if (event === 'end') cb()
      },
    },
    stdout: {
      write: (data: any) => outputs.push(String(data)),
    },
    exit: () => {},
  }

  const mockReadline = {
    createInterface: () => {
      return {
        on: (event: string, cb: any) => {
          if (event === 'line') {
            for (const l of inputLines) cb(l)
          }
          if (event === 'close') cb()
        },
        close: () => {},
      }
    },
  }

  const mockRequire = (mod: string) => {
    if (mod === 'fs') return mockFs
    if (mod === 'readline') return mockReadline
    if (mod === 'process') return mockProcess
    return {}
  }

  const prelude = `
    const print = console.log;
    let __lIdx = 0, __tIdx = 0;
    const __lines = ${JSON.stringify(inputLines)};
    const __tokens = ${JSON.stringify(inputTokens)};
    const readline = () => __lIdx < __lines.length ? __lines[__lIdx++] : '';
    const readToken = () => __tIdx < __tokens.length ? __tokens[__tIdx++] : '';
  `

  try {
    const wrapped = new Function(
      'console',
      'require',
      'process',
      `
      ${prelude}
      ${code}
    `
    )
    wrapped(customConsole, mockRequire, mockProcess)
    return { output: outputs.join('\n').trim() }
  } catch (err: any) {
    return { output: outputs.join('\n').trim(), error: err.message || 'JavaScript Runtime Error' }
  }
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const { id, code, language, input } = event.data
  const start = performance.now()
  let result: { output: string; error?: string }

  try {
    const lang = (language || '').toLowerCase()
    if (lang === 'python') {
      result = executePython(code, input)
    } else if (lang === 'cpp' || lang === 'c++') {
      result = executeCpp(code, input)
    } else if (lang === 'java') {
      result = executeJava(code, input)
    } else {
      result = executeJavaScript(code, input)
    }
  } catch (err: any) {
    result = { output: '', error: err.message || 'Execution error' }
  }

  const elapsed = Math.round(performance.now() - start)
  const response: WorkerResponse = {
    id,
    output: result.output,
    error: result.error,
    executionTimeMs: elapsed,
  }

  self.postMessage(response)
}

