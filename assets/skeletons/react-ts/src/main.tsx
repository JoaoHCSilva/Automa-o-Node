// main.tsx — Bootstrap da aplicação React com Inertia.js (TypeScript)
// Resolve páginas dinamicamente via import.meta.glob com tipagem

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import type { ComponentType, ReactNode } from 'react'
import MainLayout from './Layouts/MainLayout'

interface PageModule {
  default: ComponentType & {
    layout?: (page: ReactNode) => ReactNode
  }
}

// Fallback para desenvolvimento sem backend (npm run dev apenas com Vite)
// Em produção, o Express injeta data-page automaticamente via Inertia
const appEl = document.getElementById('app')
if (appEl && !appEl.dataset.page) {
  appEl.dataset.page = JSON.stringify({
    component: 'Index',
    props: { titulo: 'Modo Desenvolvimento', descricao: 'Backend Express não conectado. Execute npm run dev:fullstack para o fluxo completo.' },
    url: '/',
    version: null
  })
}

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob<PageModule>('./Pages/**/*.tsx', { eager: true })
    const page = pages[`./Pages/${name}.tsx`]

    if (!page) {
      throw new Error(`Página "${name}" não encontrada em ./Pages/`)
    }

    // Aplica layout padrão se a página não definir um próprio
    page.default.layout = page.default.layout || ((page: ReactNode) => <MainLayout>{page}</MainLayout>)

    return page
  },
  setup({ el, App, props }) {
    createRoot(el!).render(<App {...props} />)
  },
})
