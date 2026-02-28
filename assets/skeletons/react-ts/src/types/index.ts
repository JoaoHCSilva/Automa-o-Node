// index.ts — Tipos compartilhados da aplicação React + Inertia

// Props padrão injetadas pelo Inertia em toda página
export interface InertiaPageProps {
  auth?: {
    user: UserProps | null
  }
  flash?: {
    success?: string
    error?: string
  }
}

// Dados do usuário retornados pelo backend
export interface UserProps {
  id: number
  nome: string
  email: string
  criado_em?: string
}

// Props da página Index
export interface IndexPageProps extends InertiaPageProps {
  titulo: string
  descricao: string
}

// Props da página About
export interface AboutPageProps extends InertiaPageProps {
  versao: string
}
