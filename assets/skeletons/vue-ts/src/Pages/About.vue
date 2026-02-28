<script setup lang="ts">
// About.vue — Página Sobre com props tipadas (TypeScript)
// Rota correspondente no Express: req.inertia.render('About', { versao })

import { Head, Link } from "@inertiajs/vue3";
import type { AboutPageProps } from "../types";

const props = withDefaults(defineProps<AboutPageProps>(), {
  versao: "1.0.0",
});
</script>

<template>
  <div class="page-about">
    <Head title="Sobre" />

    <section class="about-header">
      <h1>Sobre o Projeto</h1>
      <p class="version-badge">v{{ versao }}</p>
    </section>

    <section class="about-content">
      <div class="info-block">
        <h2>Stack Utilizada</h2>
        <ul class="stack-list">
          <li><strong>Backend:</strong> Express.js + Node.js</li>
          <li><strong>Frontend:</strong> Vue 3 + Composition API</li>
          <li><strong>Bridge:</strong> Inertia.js (sem REST API)</li>
          <li><strong>Build:</strong> Vite</li>
        </ul>
      </div>

      <div class="info-block">
        <h2>Como Funciona</h2>
        <p>
          O Inertia.js conecta seu backend Express diretamente ao Vue,
          eliminando a necessidade de criar endpoints REST para cada página. O
          servidor renderiza dados e o cliente hidrata os componentes Vue.
        </p>
      </div>
    </section>

    <div class="about-actions">
      <Link href="/" class="btn-secondary">← Voltar para Home</Link>
    </div>
  </div>
</template>

<style scoped>
.about-header {
  padding: 3rem 0 2rem;
}

.about-header h1 {
  font-size: 2rem;
  color: #eee;
  margin-bottom: 0.5rem;
}

.version-badge {
  display: inline-block;
  background-color: #0f3460;
  color: #e94560;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.about-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.info-block {
  background-color: #16213e;
  border: 1px solid #1a1a2e;
  border-radius: 6px;
  padding: 1.5rem;
}

.info-block h2 {
  color: #e94560;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.stack-list {
  list-style: none;
  padding: 0;
}

.stack-list li {
  color: #ccc;
  padding: 0.4rem 0;
  border-bottom: 1px solid #1a1a2e;
  font-size: 0.9rem;
}

.stack-list li:last-child {
  border-bottom: none;
}

.info-block p {
  color: #aaa;
  line-height: 1.7;
  font-size: 0.9rem;
}

.about-actions {
  padding: 2rem 0;
}

.btn-secondary {
  color: #e94560;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn-secondary:hover {
  opacity: 0.8;
}
</style>
