// index.ts — Tipos compartilhados da aplicação Vanilla TypeScript

// Resposta genérica da API
export interface ApiResponse {
  success?: boolean
  message?: string
  data?: unknown
}

// Health check endpoint
export interface HealthResponse {
  status: string
  timestamp: string
}

// Dados do usuário retornados pela API
export interface UserData {
  id: number
  nome: string
  email: string
  criado_em?: string
}

// Resposta da listagem de usuários
export interface UsersResponse {
  success: boolean
  data: UserData[]
}
