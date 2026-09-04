export type AuthStatus = 'idle' | 'loading' | 'error' | 'success'

export interface AuthError {
  message: string
  code?: string
}
