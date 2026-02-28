// api.ts — Wrapper de fetch para consumir REST API (TypeScript)

import type { ApiResponse } from './types'

const API_BASE = 'http://localhost:3000'

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const token = localStorage.getItem('token')
  if (token) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro de rede' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  get: <T = ApiResponse>(endpoint: string) =>
    request<T>(endpoint, { method: 'GET' }),

  post: <T = ApiResponse>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T = ApiResponse>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T = ApiResponse>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}
