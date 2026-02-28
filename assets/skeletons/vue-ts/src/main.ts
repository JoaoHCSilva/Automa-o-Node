// main.ts — Bootstrap da aplicação Vue 3 com Inertia.js (TypeScript)
// Resolve páginas dinamicamente via import.meta.glob com tipagem

import { createApp, h, type DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import MainLayout from "./Layouts/MainLayout.vue";

// Verifica se o elemento #app possui data-page (fornecido pelo Express/Inertia)
const appEl = document.getElementById("app");
if (!appEl?.dataset?.page) {
  const msg = document.createElement("div");
  msg.style.cssText =
    "font-family:system-ui;max-width:600px;margin:4rem auto;padding:2rem;color:#e5e5e5;background:#1a1a1a;border-radius:12px;border:1px solid #333";
  msg.innerHTML = `
    <h2 style="color:#f97316;margin-bottom:1rem">⚠️ Inertia.js — Erro de inicialização</h2>
    <p>O atributo <code>data-page</code> não foi encontrado no elemento <code>#app</code>.</p>
    <p style="margin-top:1rem">Isso geralmente acontece quando você acessa o <strong>servidor Vite</strong> diretamente.</p>
    <p style="margin-top:1rem">Acesse a aplicação pelo <strong>servidor Express</strong>:</p>
    <code style="display:block;margin-top:.5rem;padding:.75rem;background:#0a0a0a;border-radius:8px;color:#4ade80">http://localhost:3000</code>
  `;
  document.body.style.cssText = "background:#0a0a0a;margin:0";
  document.body.innerHTML = "";
  document.body.appendChild(msg);
  throw new Error(
    "[Inertia] data-page não encontrado. Acesse pelo servidor Express (ex: http://localhost:3000), não pelo Vite.",
  );
}

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob<DefineComponent>("./Pages/**/*.vue", {
      eager: true,
    });
    const page = pages[`./Pages/${name}.vue`];

    if (!page) {
      console.error(
        `[Inertia] Página "${name}" não encontrada. Páginas disponíveis:`,
        Object.keys(pages),
      );
      throw new Error(`Página "${name}" não encontrada em ./Pages/`);
    }

    page.default.layout = page.default.layout || MainLayout;

    return page;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el!);
  },
});
