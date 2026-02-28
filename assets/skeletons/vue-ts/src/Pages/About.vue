<script setup>
import { Head, Link } from "@inertiajs/vue3";

defineProps({
  versao: { type: String, default: "1.0.0" },
});
</script>

<template>
  <Head title="Sobre" />

  <div class="about-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <h1 class="hero-title">Sobre o Projeto</h1>
        <p class="hero-subtitle">
          Conheça a stack, a arquitetura e como tudo se conecta.
        </p>
        <span class="version-badge">v{{ versao }}</span>
      </div>
    </section>

    <!-- Stack -->
    <section class="cards-section">
      <div class="info-card">
        <div class="card-icon">🛠️</div>
        <h3>Stack Utilizada</h3>
        <ul class="stack-list">
          <li><strong>Backend:</strong> Express.js + Node.js</li>
          <li><strong>Frontend:</strong> Vue 3 + Composition API</li>
          <li><strong>Bridge:</strong> Inertia.js (sem REST API)</li>
          <li><strong>Build:</strong> Vite</li>
          <li><strong>Logger:</strong> Winston</li>
        </ul>
      </div>
      <div class="info-card">
        <div class="card-icon">🔗</div>
        <h3>Como Funciona</h3>
        <p class="card-text">
          O Inertia.js conecta seu backend Express diretamente ao Vue,
          eliminando a necessidade de criar endpoints REST para cada página.
        </p>
        <p class="card-text">
          O servidor renderiza dados e o cliente hidrata os componentes Vue com
          reatividade completa.
        </p>
      </div>
      <div class="info-card">
        <div class="card-icon">📂</div>
        <h3>Estrutura</h3>
        <ul class="stack-list">
          <li><strong>Controllers/</strong> — Lógica de negócio</li>
          <li><strong>Routes/</strong> — Definição de rotas</li>
          <li><strong>Middleware/</strong> — Interceptadores</li>
          <li><strong>src/Pages/</strong> — Páginas Inertia</li>
          <li><strong>src/Layouts/</strong> — Layouts reutilizáveis</li>
        </ul>
      </div>
      <div class="info-card">
        <div class="card-icon">🚀</div>
        <h3>Links Úteis</h3>
        <div class="links-grid">
          <a href="https://inertiajs.com" target="_blank" class="useful-link"
            >📖 Inertia.js Docs</a
          >
          <a href="https://vuejs.org" target="_blank" class="useful-link"
            >💚 Vue.js Docs</a
          >
          <a href="https://expressjs.com" target="_blank" class="useful-link"
            >⚡ Express Docs</a
          >
          <a
            href="https://github.com/JoaoHCSilva/Automa-o-Node"
            target="_blank"
            class="useful-link"
            >🐙 GitHub</a
          >
        </div>
      </div>
    </section>

    <!-- Back -->
    <div class="back-section">
      <Link href="/" class="back-link">← Voltar para Home</Link>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #e5e5e5;
  font-family:
    "Inter",
    "Segoe UI",
    system-ui,
    -apple-system,
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5rem 2rem 3rem;
}

.hero-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 350px;
  background: radial-gradient(
    ellipse,
    rgba(249, 115, 22, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-content {
  text-align: center;
  max-width: 640px;
  position: relative;
  z-index: 1;
  animation: fadeUp 0.8s ease-out;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #fff 0%, #a3a3a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.75rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: #737373;
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.version-badge {
  display: inline-block;
  background: linear-gradient(135deg, #f97316, #ef4444);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
  letter-spacing: 0.02em;
}

.cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  max-width: 960px;
  width: 100%;
  padding: 0 2rem 2rem;
  animation: fadeUp 0.8s ease-out 0.15s both;
}

.info-card {
  background: #141414;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  transition: all 0.3s ease;
}
.info-card:hover {
  border-color: #333;
  background: #1a1a1a;
  transform: translateY(-2px);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}
.info-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f5f5f5;
  margin: 0 0 1rem;
}

.card-text {
  font-size: 0.8125rem;
  color: #737373;
  line-height: 1.6;
  margin: 0 0 0.75rem;
}
.card-text:last-child {
  margin-bottom: 0;
}

.stack-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.stack-list li {
  font-size: 0.8125rem;
  color: #a3a3a3;
  line-height: 1.4;
}
.stack-list li strong {
  color: #d4d4d4;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.useful-link {
  font-size: 0.8125rem;
  color: #a3a3a3;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: #1a1a1a;
  border: 1px solid #252525;
  transition: all 0.2s ease;
}
.useful-link:hover {
  border-color: #f97316;
  color: #f5f5f5;
}

.back-section {
  padding: 1.5rem 2rem 3rem;
  animation: fadeUp 0.8s ease-out 0.3s both;
}
.back-link {
  font-size: 0.875rem;
  color: #f97316;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.back-link:hover {
  color: #fb923c;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
