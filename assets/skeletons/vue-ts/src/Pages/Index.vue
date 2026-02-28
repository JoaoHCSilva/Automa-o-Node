<script setup>
import { Head } from "@inertiajs/vue3";

defineProps({
  titulo: { type: String, default: "Minha App" },
  descricao: {
    type: String,
    default: "Aplicação fullstack com Express + Inertia.js",
  },
});
</script>

<template>
  <Head title="Bem-vindo" />

  <div class="welcome-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <div class="logo-mark">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 4L6 14v20l18 10 18-10V14L24 4z"
              stroke="url(#g1)"
              stroke-width="2"
              fill="none"
            />
            <path
              d="M24 4v40M6 14l18 10 18-10M6 34l18-10 18 10"
              stroke="url(#g1)"
              stroke-width="2"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="48" y2="48">
                <stop stop-color="#f97316" />
                <stop offset="1" stop-color="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 class="hero-title">{{ titulo }}</h1>
        <p class="hero-subtitle">{{ descricao }}</p>
        <div class="hero-actions">
          <a
            href="https://inertiajs.com"
            target="_blank"
            class="btn btn-primary"
            >Documentação</a
          >
          <a
            href="https://github.com/JoaoHCSilva/Automa-o-Node"
            target="_blank"
            class="btn btn-outline"
            >GitHub</a
          >
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Vite</h3>
        <p>
          Build ultrarrápido com Hot Module Replacement para desenvolvimento
          ágil.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔗</div>
        <h3>Inertia.js</h3>
        <p>
          SPA moderna sem API — o servidor controla a navegação, o cliente
          renderiza.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💚</div>
        <h3>Vue 3</h3>
        <p>Composition API com reatividade moderna e ecossistema robusto.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3>Express</h3>
        <p>
          Framework minimalista e flexível para Node.js, rápido e descomplicado.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="welcome-footer">
      <p>Express + Inertia.js + Vue 3 · v1.0.0</p>
    </footer>
  </div>
</template>

<style scoped>
.welcome-page {
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
  padding: 6rem 2rem 4rem;
}

.hero-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(
    ellipse,
    rgba(249, 115, 22, 0.12) 0%,
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

.logo-mark {
  width: 56px;
  height: 56px;
  margin: 0 auto 2rem;
  animation: float 6s ease-in-out infinite;
}

.logo-mark svg {
  width: 100%;
  height: 100%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #fff 0%, #a3a3a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #737373;
  line-height: 1.6;
  margin: 0 0 2.5rem;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #f97316, #ef4444);
  color: #fff;
  border: none;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
}
.btn-primary:hover {
  box-shadow: 0 6px 24px rgba(249, 115, 22, 0.5);
  transform: translateY(-1px);
}
.btn-outline {
  background: transparent;
  color: #d4d4d4;
  border: 1px solid #333;
}
.btn-outline:hover {
  border-color: #555;
  background: rgba(255, 255, 255, 0.04);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  max-width: 900px;
  width: 100%;
  padding: 0 2rem 2rem;
  animation: fadeUp 0.8s ease-out 0.2s both;
}

.feature-card {
  background: #141414;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  transition: all 0.3s ease;
}
.feature-card:hover {
  border-color: #333;
  background: #1a1a1a;
  transform: translateY(-2px);
}
.feature-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}
.feature-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #f5f5f5;
  margin: 0 0 0.5rem;
}
.feature-card p {
  font-size: 0.8125rem;
  color: #737373;
  line-height: 1.5;
  margin: 0;
}

.welcome-footer {
  margin-top: auto;
  padding: 2rem;
  text-align: center;
}
.welcome-footer p {
  font-size: 0.75rem;
  color: #404040;
  margin: 0;
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
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
