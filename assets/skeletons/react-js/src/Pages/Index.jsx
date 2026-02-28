// Index.jsx — Página inicial (recebe props do backend via Inertia)
// Rota correspondente no Express: req.inertia.render('Index', { titulo, descricao })

import { Head, Link } from '@inertiajs/react'

export default function Index({ titulo = 'Bem-vindo', descricao = 'Aplicação criada com Express + Inertia.js + React' }) {
  return (
    <div className="page-index">
      <Head title="Home" />

      <section className="hero">
        <h1>{titulo}</h1>
        <p className="hero-desc">{descricao}</p>
        <Link href="/about" className="btn-primary">Saiba mais</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>⚡ Vite</h3>
          <p>Build ultrarrápido com HMR instantâneo</p>
        </div>
        <div className="feature-card">
          <h3>🔗 Inertia.js</h3>
          <p>SPA sem API — renderização server-driven</p>
        </div>
        <div className="feature-card">
          <h3>⚛️ React</h3>
          <p>Hooks e componentes funcionais modernos</p>
        </div>
      </section>
    </div>
  )
}
