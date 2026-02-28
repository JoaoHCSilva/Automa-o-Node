// Pages/About.tsx — Página Sobre (estilo dark premium)
import { Head, Link } from '@inertiajs/react'

interface AboutProps {
    versao?: string
}

export default function About({ versao = '1.0.0' }: AboutProps) {
    return (
        <div className="about-page">
            <Head title="Sobre" />
            <section className="hero">
                <div className="hero-glow"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Sobre o Projeto</h1>
                    <p className="hero-subtitle">Conheça a stack, a arquitetura e como tudo se conecta.</p>
                    <span className="version-badge">v{versao}</span>
                </div>
            </section>

            <section className="cards-section">
                <div className="info-card">
                    <div className="card-icon">🛠️</div>
                    <h3>Stack Utilizada</h3>
                    <ul className="stack-list">
                        <li><strong>Backend:</strong> Express.js + Node.js</li>
                        <li><strong>Frontend:</strong> React + Hooks</li>
                        <li><strong>Bridge:</strong> Inertia.js (sem REST API)</li>
                        <li><strong>Build:</strong> Vite</li>
                        <li><strong>Logger:</strong> Winston</li>
                    </ul>
                </div>
                <div className="info-card">
                    <div className="card-icon">🔗</div>
                    <h3>Como Funciona</h3>
                    <p className="card-text">
                        O Inertia.js conecta seu backend Express diretamente ao React,
                        eliminando a necessidade de criar endpoints REST para cada página.
                    </p>
                    <p className="card-text">
                        O servidor renderiza dados e o cliente hidrata os componentes React com
                        reatividade completa.
                    </p>
                </div>
                <div className="info-card">
                    <div className="card-icon">📂</div>
                    <h3>Estrutura</h3>
                    <ul className="stack-list">
                        <li><strong>Controllers/</strong> — Lógica de negócio</li>
                        <li><strong>Routes/</strong> — Definição de rotas</li>
                        <li><strong>Middleware/</strong> — Interceptadores</li>
                        <li><strong>src/Pages/</strong> — Páginas Inertia</li>
                        <li><strong>src/Layouts/</strong> — Layouts reutilizáveis</li>
                    </ul>
                </div>
                <div className="info-card">
                    <div className="card-icon">🚀</div>
                    <h3>Links Úteis</h3>
                    <div className="links-grid">
                        <a href="https://inertiajs.com" target="_blank" rel="noreferrer" className="useful-link">📖 Inertia.js Docs</a>
                        <a href="https://react.dev" target="_blank" rel="noreferrer" className="useful-link">⚛️ React Docs</a>
                        <a href="https://expressjs.com" target="_blank" rel="noreferrer" className="useful-link">⚡ Express Docs</a>
                        <a href="https://github.com/JoaoHCSilva/Automa-o-Node" target="_blank" rel="noreferrer" className="useful-link">🐙 GitHub</a>
                    </div>
                </div>
            </section>

            <div className="back-section">
                <Link href="/" className="back-link">← Voltar para Home</Link>
            </div>
        </div>
    )
}
