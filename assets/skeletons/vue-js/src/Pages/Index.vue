<script setup>
// Index.vue — Página inicial (recebe props do backend via Inertia)
// Rota correspondente no Express: req.inertia.render('Index', { titulo, descricao })

import { Head, Link } from "@inertiajs/vue3";

const props = defineProps({
  titulo: {
    type: String,
    default: "Bem-vindo",
  },
  descricao: {
    type: String,
    default: "Aplicação criada com Express + Inertia.js + Vue 3",
  },
});
</script>

<template>
  <div class="page-index">
    <Head title="Home" />

    <section class="hero">
      <h1>{{ titulo }}</h1>
      <p class="hero-desc">{{ descricao }}</p>
      <Link href="/about" class="btn-primary">Saiba mais</Link>
    </section>

    <section class="features">
      <div class="feature-card">
        <h3>⚡ Vite</h3>
        <p>Build ultrarrápido com HMR instantâneo</p>
      </div>
      <div class="feature-card">
        <h3>🔗 Inertia.js</h3>
        <p>SPA sem API — renderização server-driven</p>
      </div>
      <div class="feature-card">
        <h3>🟢 Vue 3</h3>
        <p>Composition API com reatividade moderna</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 0 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  color: #e94560;
  margin-bottom: 0.75rem;
}

.hero-desc {
  color: #aaa;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.btn-primary {
  display: inline-block;
  background-color: #e94560;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #c73652;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
}

.feature-card {
  background-color: #16213e;
  border: 1px solid #1a1a2e;
  border-radius: 6px;
  padding: 1.5rem;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  color: #eee;
}

.feature-card p {
  color: #999;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
