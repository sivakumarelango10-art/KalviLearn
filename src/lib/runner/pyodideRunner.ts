import { executePython } from './pythonRunner'

/**
 * Pyodide execution runner for KalviLearn.
 *
 * Runs full standard CPython on WebAssembly within the sandbox child process.
 * All user code executes under strict security boundaries:
 *  - System and native escape modules (os, sys-escapes, subprocess, socket, urllib, requests, pathlib, shutil, ctypes, importlib) are blocked.
 *  - JavaScript bridge modules (js, pyodide, pyodide_js, _pyodide, _pyodide_core) are strictly blocked.
 *  - sys.modules, builtins, and globals are snapshot and restored between runs to guarantee run-to-run isolation.
 *  - If Pyodide fails to load, a loud critical log is emitted and pythonRunner is used as a fallback.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodideInstance: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initPromise: Promise<any> | null = null
let pyodideFailed = false

const PYTHON_SECURITY_BOOTSTRAP = `
import sys
import builtins
import io
import json

BLOCKED_MODULES = {
    'js', 'pyodide', 'pyodide_js', '_pyodide', '_pyodide_core',
    'os', 'subprocess', '_posixsubprocess', 'socket', 'urllib', 'http', 'requests',
    'pathlib', 'shutil', 'ctypes', 'importlib', 'fcntl', 'pwd', 'grp', 'pty', 'termios', 'resource'
}

# 1. Neuter any dangerous functions that may already exist in os/runtime modules
if 'os' in sys.modules:
    _os_mod = sys.modules['os']
    def _blocked_os_call(*args, **kwargs):
        raise PermissionError("Security Violation: OS access is strictly forbidden.")
    for _attr in [
        'system', 'popen', 'execv', 'execve', 'execl', 'execle', 'execlp', 'execlpe',
        'execvp', 'execvpe', '_execvpe', 'spawnl', 'spawnle', 'spawnlp', 'spawnlpe',
        'spawnv', 'spawnve', 'spawnvp', 'spawnvpe', 'fork', 'forkpty', 'kill', 'killpg',
        'remove', 'unlink', 'rmdir', 'mkdir', 'makedirs', 'rename', 'replace', 'chmod', 'chown'
    ]:
        if hasattr(_os_mod, _attr):
            try:
                setattr(_os_mod, _attr, _blocked_os_call)
            except Exception:
                pass

# Also neuter _wrap_close globals if present in subclasses
for _cls in ().__class__.__base__.__subclasses__():
    if _cls.__name__ == '_wrap_close':
        _g = getattr(_cls.__init__, '__globals__', {})
        for _attr in ['system', 'popen', 'execv', 'execve', 'execl', 'execle', 'execlp', 'execlpe', 'execvp', 'execvpe']:
            if _attr in _g:
                _g[_attr] = _blocked_os_call

# 2. Intercept builtins.__import__
_real_import = builtins.__import__

def _sandboxed_import(name, globals=None, locals=None, fromlist=(), level=0):
    root = name.split('.')[0]
    if root in BLOCKED_MODULES or name in BLOCKED_MODULES:
        raise ImportError(f"Security Violation: Import of '{name}' is strictly forbidden.")
    if fromlist:
        for item in fromlist:
            if item in BLOCKED_MODULES:
                raise ImportError(f"Security Violation: Import of '{item}' is strictly forbidden.")
    return _real_import(name, globals, locals, fromlist, level)

builtins.__import__ = _sandboxed_import

# 3. Intercept sys.meta_path
class _SandboxedMetaPathFinder:
    def find_spec(self, fullname, path=None, target=None):
        root = fullname.split('.')[0]
        if root in BLOCKED_MODULES or fullname in BLOCKED_MODULES:
            raise ImportError(f"Security Violation: Import of '{fullname}' is strictly forbidden.")
        return None

sys.meta_path.insert(0, _SandboxedMetaPathFinder())

# 4. Intercept sys.modules to prevent accessing loaded forbidden modules
class _GuardedModulesDict(dict):
    def __getitem__(self, key):
        root = str(key).split('.')[0]
        if root in BLOCKED_MODULES or key in BLOCKED_MODULES:
            raise KeyError(f"Security Violation: Access to module '{key}' is strictly forbidden.")
        return super().__getitem__(key)
    def get(self, key, default=None):
        root = str(key).split('.')[0]
        if root in BLOCKED_MODULES or key in BLOCKED_MODULES:
            return default
        return super().get(key, default)

_orig_modules = dict(sys.modules)
sys.modules = _GuardedModulesDict(_orig_modules)

# 5. Snapshot pristine builtins and modules for run-to-run isolation
_pristine_builtins = dict(builtins.__dict__)
_pristine_modules = set(_orig_modules.keys())

def _reset_sandbox_state():
    # Remove any modified or added builtins
    for k in list(builtins.__dict__.keys()):
        if k not in _pristine_builtins:
            try:
                delattr(builtins, k)
            except Exception:
                pass
    for k, v in _pristine_builtins.items():
        try:
            setattr(builtins, k, v)
        except Exception:
            pass
    # Remove any modules added during student execution
    for m in list(sys.modules.keys()):
        if m not in _pristine_modules:
            try:
                del sys.modules[m]
            except Exception:
                pass

def _check_syntax(code):
    try:
        compile(code, '<submission>', 'exec')
        return json.dumps({'ok': True})
    except SyntaxError as e:
        err = f"SyntaxError: {e.msg} (line {e.lineno})"
        if e.text:
            err += f"\\n  {e.text.strip()}"
        return json.dumps({'ok': False, 'error': err})

def _execute_case(code, input_str, max_output_chars=1000000):
    _reset_sandbox_state()
    fake_stdin = io.StringIO(input_str)
    fake_stdout = io.StringIO()
    sys.stdin = fake_stdin
    sys.stdout = fake_stdout
    
    # Fresh namespace for user code execution
    ns = {'__builtins__': builtins, '__name__': '__main__'}
    
    try:
        compiled = compile(code, '<submission>', 'exec')
        exec(compiled, ns)
        out = fake_stdout.getvalue()
        if len(out) > max_output_chars:
            return json.dumps({'output': '', 'error': 'Output Limit Exceeded'})
        return json.dumps({'output': out, 'error': None})
    except SyntaxError as e:
        err = f"SyntaxError: {e.msg} (line {e.lineno})"
        if e.text:
            err += f"\\n  {e.text.strip()}"
        return json.dumps({'output': fake_stdout.getvalue(), 'error': err})
    except MemoryError:
        return json.dumps({'output': fake_stdout.getvalue(), 'error': 'Memory Limit Exceeded'})
    except RecursionError:
        return json.dumps({'output': fake_stdout.getvalue(), 'error': 'Runtime Error: maximum recursion depth exceeded'})
    except Exception as e:
        import traceback
        cl, exc, tb = sys.exc_info()
        stack = traceback.extract_tb(tb)
        filtered = [f for f in stack if f.filename == '<submission>']
        if filtered:
            last = filtered[-1]
            err = f"{type(e).__name__}: {str(e)} (line {last.lineno})"
            if last.line:
                err += f"\\n  --> {last.line.strip()}"
        else:
            err = f"{type(e).__name__}: {str(e)}"
        return json.dumps({'output': fake_stdout.getvalue(), 'error': err})
    finally:
        _reset_sandbox_state()
`

/**
 * Loads and initializes the Pyodide runtime with security guards.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance
  if (pyodideFailed) return null

  if (!initPromise) {
    initPromise = (async () => {
      try {
        const { loadPyodide } = await import('pyodide')
        const py = await loadPyodide()
        py.runPython(PYTHON_SECURITY_BOOTSTRAP)
        pyodideInstance = py
        return py
      } catch (err) {
        pyodideFailed = true
        console.error('[CRITICAL] Pyodide failed to load; falling back to pythonRunner transpiler:', err)
        return null
      }
    })()
  }

  return initPromise
}

export function isPyodideReady(): boolean {
  return pyodideInstance !== null
}

/**
 * Checks Python code compilation and syntax.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkPythonSyntaxWithPyodide(py: any, code: string): { ok: boolean; error?: string } {
  try {
    const raw = py.runPython(`_check_syntax(${JSON.stringify(code)})`)
    const parsed = JSON.parse(raw)
    return parsed
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, error: msg }
  }
}

/**
 * Runs a single test case through Pyodide.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function executePythonWithPyodide(py: any, code: string, input: string): { output: string; error?: string } {
  try {
    const raw = py.runPython(`_execute_case(${JSON.stringify(code)}, ${JSON.stringify(input)})`)
    const parsed = JSON.parse(raw)
    return {
      output: (parsed.output || '').trim(),
      error: parsed.error || undefined,
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { output: '', error: msg }
  }
}

/**
 * Safe top-level Python executor that prefers Pyodide and loudly falls back to pythonRunner if unavailable.
 */
export async function executePythonSafely(code: string, input: string): Promise<{ output: string; error?: string }> {
  const py = await getPyodide()
  if (py) {
    return executePythonWithPyodide(py, code, input)
  }
  // Loud fallback log already emitted in getPyodide()
  return executePython(code, input)
}
