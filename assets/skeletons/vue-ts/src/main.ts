// main.ts — Bootstrap da aplicação Vue 3 com Inertia.js (TypeScript)
// Resolve páginas dinamicamente via import.meta.glob com tipagem

import { createApp, h, type DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import MainLayout from "./Layouts/MainLayout.vue";

// Verifica se o elemento #app possui data-page (fornecido pelo Express/Inertia).
// Quando o usuário acessa a porta do Vite diretamente, redireciona para o Express.
const appEl = document.getElementById("app");
if (!appEl?.dataset?.page) {
  const EXPRESS_URL = "http://localhost:3000";
  const REDIRECT_SECONDS = 3;

  document.body.style.cssText = "background:#0a0a0a;margin:0";
  document.body.innerHTML = "";

  const msg = document.createElement("div");
  msg.style.cssText =
    "font-family:system-ui;max-width:600px;margin:4rem auto;padding:2rem;color:#e5e5e5;background:#1a1a1a;border-radius:12px;border:1px solid #333;text-align:center";
  msg.innerHTML = `
    <h2 style="color:#f97316;margin-bottom:1rem">⚠️ Porta incorreta</h2>
    <p>Você acessou o servidor <strong>Vite</strong> (dev assets).</p>
    <p style="margin-top:.75rem">A aplicação roda pelo servidor <strong>Express</strong>.</p>
    <p style="margin-top:1.5rem">Redirecionando em <strong id="__countdown">${REDIRECT_SECONDS}</strong>s…</p>
    <a href="${EXPRESS_URL}" style="display:inline-block;margin-top:1rem;padding:.75rem 1.5rem;background:#4ade80;color:#0a0a0a;border-radius:8px;font-weight:600;text-decoration:none">
      Ir para ${EXPRESS_URL}
    </a>
  `;
  document.body.appendChild(msg);

  let remaining = REDIRECT_SECONDS;
  const timer = setInterval(() => {
    remaining--;
    const el = document.getElementById("__countdown");
    if (el) el.textContent = String(remaining);
    if (remaining <= 0) {
      clearInterval(timer);
      window.location.href = EXPRESS_URL;
    }
  }, 1000);

  console.warn(
    `[Inertia] data-page não encontrado. Redirecionando para ${EXPRESS_URL}…`,
  );
  // Interrompe a execução do restante do bootstrap
  throw new Error("[Inertia] Redirecionando para o servidor Express.");
}

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob<{ default: DefineComponent }>(
      "./Pages/**/*.vue",
      { eager: true },
    );
    const mod = pages[`./Pages/${name}.vue`];

    if (!mod) {
      console.error(
        `[Inertia] Página "${name}" não encontrada. Páginas disponíveis:`,
        Object.keys(pages),
      );
      throw new Error(`Página "${name}" não encontrada em ./Pages/`);
    }

    mod.default.layout = mod.default.layout || MainLayout;

    return mod.default;
  },
  setup({ el, App, props, plugin }) {
    return createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el!);
  },
});
