// about.js — Página Sobre da SPA Vanilla

export function AboutPage() {
  return `
    <div class="page-about">
      <section class="about-header">
        <h1>Sobre o Projeto</h1>
        <p class="version-badge">v1.0.0</p>
      </section>

      <section class="about-content">
        <div class="info-block">
          <h2>Stack Utilizada</h2>
          <ul class="stack-list">
            <li><strong>Backend:</strong> Express.js + Node.js</li>
            <li><strong>Frontend:</strong> Vanilla JavaScript (sem framework)</li>
            <li><strong>Comunicação:</strong> REST API via fetch</li>
            <li><strong>Build:</strong> Vite</li>
          </ul>
        </div>

        <div class="info-block">
          <h2>Como Funciona</h2>
          <p>
            O frontend é uma SPA pura que se comunica com o backend Express
            via chamadas REST. Sem framework, sem overhead — apenas JavaScript
            moderno com ES Modules e Vite para o build.
          </p>
        </div>
      </section>

      <div class="about-actions">
        <a href="#/" data-link class="btn-secondary">← Voltar para Home</a>
      </div>
    </div>
  `
}
