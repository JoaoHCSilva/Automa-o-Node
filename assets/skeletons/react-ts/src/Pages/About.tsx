// About.tsx — Página Sobre com props tipadas (TypeScript)
// Rota correspondente no Express: req.inertia.render('About', { versao })

import { Head, Link } from '@inertiajs/react'
import type { AboutPageProps } from '../types'

export default function About({ versao = '1.0.0' }: AboutPageProps) {
  return (
    <div className="page-about">
      <Head title="Sobre" />

      <section className="about-header">
        <h1>Sobre o Projeto</h1>
        <p className="version-badge">v{versao}</p>
      </section>

      <section className="about-content">
        <div className="info-block">
          <h2>Stack Utilizada</h2>
          <ul className="stack-list">
            <li><strong>Backend:</strong> Express.js + Node.js</li>
            <li><strong>Frontend:</strong> React + TypeScript</li>
            <li><strong>Bridge:</strong> Inertia.js (sem REST API)</li>
            <li><strong>Build:</strong> Vite</li>
          </ul>
        </div>

        <div className="info-block">
          <h2>Como Funciona</h2>
          <p>
            O Inertia.js conecta seu backend Express diretamente ao React,
            eliminando a necessidade de criar endpoints REST para cada página.
            O servidor renderiza dados e o cliente hidrata os componentes React.
          </p>
        </div>
      </section>

      <div className="about-actions">
        <Link href="/" className="btn-secondary">← Voltar para Home</Link>
      </div>
    </div>
  )
}
