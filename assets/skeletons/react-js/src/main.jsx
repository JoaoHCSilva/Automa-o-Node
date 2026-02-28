// main.jsx — Bootstrap da aplicação React com Inertia.js
// Resolve páginas dinamicamente e aplica layout padrão

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import MainLayout from './Layouts/MainLayout'

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
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    const page = pages[`./Pages/${name}.jsx`]

    // Aplica layout padrão se a página não definir um próprio
    page.default.layout = page.default.layout || ((page) => <MainLayout>{page}</MainLayout>)

    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
