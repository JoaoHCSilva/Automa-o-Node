// main.ts — Bootstrap da aplicação Vue 3 com Inertia.js (TypeScript)
// Resolve páginas dinamicamente via import.meta.glob com tipagem

import { createApp, h, type DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import MainLayout from './Layouts/MainLayout.vue'

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
    const pages = import.meta.glob<DefineComponent>('./Pages/**/*.vue', { eager: true })
    const page = pages[`./Pages/${name}.vue`]

    if (!page) {
      throw new Error(`Página "${name}" não encontrada em ./Pages/`)
    }

    // Aplica layout padrão se a página não definir um próprio
    page.default.layout = page.default.layout || MainLayout

    return page
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
