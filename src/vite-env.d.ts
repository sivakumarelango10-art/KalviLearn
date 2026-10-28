/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_APP_URL?: string
  readonly NEXT_PUBLIC_SUPABASE_URL?: string
  readonly NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'canvas-confetti' {
  export default function confetti(options?: any): Promise<null | undefined>;
}

declare module 'pyodide' {
  export function loadPyodide(options?: any): Promise<any>;
}
