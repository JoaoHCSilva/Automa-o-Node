// Pages/Index.tsx — Welcome page React (estilo dark premium)
import { Head } from '@inertiajs/react'

interface IndexProps {
    titulo?: string
    descricao?: string
}

export default function Index({ titulo = 'Minha App', descricao = 'Aplicação fullstack com Express + Inertia.js' }: IndexProps) {
    return (
        <div className="welcome-page">
            <Head title="Bem-vindo" />
            <section className="hero">
                <div className="hero-glow"></div>
                <div className="hero-content">
                    <div className="logo-mark">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="url(#g1)" strokeWidth="2" fill="none"/>
                            <path d="M24 4v40M6 14l18 10 18-10M6 34l18-10 18 10" stroke="url(#g1)" strokeWidth="2" opacity="0.5"/>
                            <defs><linearGradient id="g1" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#f97316"/><stop offset="1" stopColor="#ef4444"/></linearGradient></defs>
                        </svg>
                    </div>
                    <h1 className="hero-title">{titulo}</h1>
                    <p className="hero-subtitle">{descricao}</p>
                    <div className="hero-actions">
                        <a href="https://inertiajs.com" target="_blank" rel="noreferrer" className="btn btn-primary">Documentação</a>
                        <a href="https://github.com/JoaoHCSilva/Automa-o-Node" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
                    </div>
                </div>
            </section>

            <section className="features">
                {[
                    { icon: '⚡', title: 'Vite', desc: 'Build ultrarrápido com Hot Module Replacement para desenvolvimento ágil.' },
                    { icon: '🔗', title: 'Inertia.js', desc: 'SPA moderna sem API — o servidor controla a navegação, o cliente renderiza.' },
                    { icon: '⚛️', title: 'React', desc: 'Biblioteca declarativa com hooks, component-based architecture e ecossistema vasto.' },
                    { icon: '🚀', title: 'Express', desc: 'Framework minimalista e flexível para Node.js, rápido e descomplicado.' },
                ].map(f => (
                    <div key={f.title} className="feature-card">
                        <div className="feature-icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </section>

            <footer className="welcome-footer">
                <p>Express + Inertia.js + React · v1.0.0</p>
            </footer>
        </div>
    )
}
