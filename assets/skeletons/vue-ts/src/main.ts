// main.ts — Bootstrap da aplicação Vue 3 com Inertia.js (TypeScript)
// Resolve páginas dinamicamente via import.meta.glob com tipagem

import { createApp, h, type DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import MainLayout from './Layouts/MainLayout.vue'

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
