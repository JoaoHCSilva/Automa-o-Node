<script setup lang="ts">
// MainLayout.vue — Layout persistente da aplicação (TypeScript)
// Mantém o menu de navegação entre transições de página

import { Link } from "@inertiajs/vue3";
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <nav class="app-nav">
        <div class="nav-brand">
          <Link href="/" class="brand-link">Minha App</Link>
        </div>
        <ul class="nav-links">
          <li>
            <Link href="/" class="nav-link">Home</Link>
          </li>
          <li>
            <Link href="/about" class="nav-link">Sobre</Link>
          </li>
        </ul>
      </nav>
    </header>

    <main class="app-content">
      <slot />
    </main>

    <footer class="app-footer">
      <p>
        &copy; {{ new Date().getFullYear() }} — Construído com Inertia.js + Vue
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #1a1a2e;
  padding: 0 2rem;
}

.app-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
}

.brand-link {
  color: #e94560;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #eee;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #e94560;
}

.app-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.app-footer {
  background-color: #16213e;
  color: #888;
  text-align: center;
  padding: 1rem 2rem;
  font-size: 0.85rem;
}
</style>
