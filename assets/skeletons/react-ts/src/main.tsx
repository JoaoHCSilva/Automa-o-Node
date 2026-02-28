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
