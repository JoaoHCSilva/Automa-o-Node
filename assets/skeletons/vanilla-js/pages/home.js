// home.js — Página inicial da SPA Vanilla
// Renderiza HTML e demonstra chamada à API

import { api } from '../api.js'

export function HomePage() {
  // Carrega dados da API após a renderização
  setTimeout(async () => {
    try {
      const data = await api.get('/health')
      const statusEl = document.getElementById('api-status')
      if (statusEl) {
        statusEl.textContent = `API: ${data.status}`
        statusEl.classList.add('status-ok')
      }
    } catch {
      const statusEl = document.getElementById('api-status')
      if (statusEl) {
        statusEl.textContent = 'API: Offline'
        statusEl.classList.add('status-error')
      }
    }
  }, 0)

  return `
    <div class="page-index">
      <section class="hero">
        <h1>Bem-vindo</h1>
        <p class="hero-desc">Aplicação criada com Express + Vite (Vanilla JS)</p>
        <span id="api-status" class="status-badge">Verificando API...</span>
        <br><br>
        <a href="#/about" data-link class="btn-primary">Saiba mais</a>
      </section>

      <section class="features">
        <div class="feature-card">
          <h3>⚡ Vite</h3>
          <p>Build ultrarrápido com HMR instantâneo</p>
        </div>
        <div class="feature-card">
          <h3>🌐 REST API</h3>
          <p>Comunicação via fetch com o backend Express</p>
        </div>
        <div class="feature-card">
          <h3>📦 Vanilla JS</h3>
          <p>Zero dependências de framework no frontend</p>
        </div>
      </section>
    </div>
  `
}
