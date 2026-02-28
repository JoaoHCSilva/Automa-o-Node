// Pages/About.jsx — Página Sobre (estilo dark premium)
import { Head, Link } from '@inertiajs/react'

export default function About({ versao = '1.0.0' }) {
    const features = [
        { icon: '🛠️', title: 'Stack Utilizada', items: ['Backend: Express.js + Node.js', 'Frontend: React + Hooks', 'Bridge: Inertia.js (sem REST API)', 'Build: Vite', 'Logger: Winston'] },
        { icon: '📂', title: 'Estrutura', items: ['Controllers/ — Lógica de negócio', 'Routes/ — Definição de rotas', 'Middleware/ — Interceptadores', 'src/Pages/ — Páginas Inertia', 'src/Layouts/ — Layouts reutilizáveis'] },
    ]

    const links = [
        { emoji: '📖', label: 'Inertia.js Docs', url: 'https://inertiajs.com' },
        { emoji: '⚛️', label: 'React Docs', url: 'https://react.dev' },
        { emoji: '⚡', label: 'Express Docs', url: 'https://expressjs.com' },
        { emoji: '🐙', label: 'GitHub', url: 'https://github.com/JoaoHCSilva/Automa-o-Node' },
    ]

    return (
        <div style={styles.page}>
            <Head title="Sobre" />
            <section style={styles.hero}>
                <div style={styles.heroGlow}></div>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>Sobre o Projeto</h1>
                    <p style={styles.heroSubtitle}>Conheça a stack, a arquitetura e como tudo se conecta.</p>
                    <span style={styles.badge}>v{versao}</span>
                </div>
            </section>

            <section style={styles.cards}>
                {features.map(f => (
                    <div key={f.title} style={styles.card} className="info-card">
                        <div style={styles.cardIcon}>{f.icon}</div>
                        <h3 style={styles.cardTitle}>{f.title}</h3>
                        <ul style={styles.list}>
                            {f.items.map(item => <li key={item} style={styles.listItem}>{item}</li>)}
                        </ul>
                    </div>
                ))}

                <div style={styles.card} className="info-card">
                    <div style={styles.cardIcon}>🔗</div>
                    <h3 style={styles.cardTitle}>Como Funciona</h3>
                    <p style={styles.text}>O Inertia.js conecta seu backend Express diretamente ao React, eliminando a necessidade de criar endpoints REST para cada página.</p>
                    <p style={{...styles.text, marginBottom: 0}}>O servidor renderiza dados e o cliente hidrata os componentes React com reatividade completa.</p>
                </div>

                <div style={styles.card} className="info-card">
                    <div style={styles.cardIcon}>🚀</div>
                    <h3 style={styles.cardTitle}>Links Úteis</h3>
                    <div style={styles.linksGrid}>
                        {links.map(l => (
                            <a key={l.label} href={l.url} target="_blank" rel="noreferrer" style={styles.usefulLink} className="useful-link">
                                {l.emoji} {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <div style={styles.back}>
                <Link href="/" style={styles.backLink}>← Voltar para Home</Link>
            </div>
        </div>
    )
}

const styles = {
    page: { minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5', fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center' },
    hero: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', padding: '5rem 2rem 3rem' },
    heroGlow: { position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '350px', background: 'radial-gradient(ellipse, rgba(249, 115, 22, 0.1) 0%, transparent 70%)', pointerEvents: 'none' },
    heroContent: { textAlign: 'center', maxWidth: '640px', position: 'relative', zIndex: 1, animation: 'fadeUp 0.8s ease-out' },
    heroTitle: { fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #fff 0%, #a3a3a3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 0.75rem', lineHeight: 1.1 },
    heroSubtitle: { fontSize: '1.05rem', color: '#737373', lineHeight: 1.6, margin: '0 0 1.25rem' },
    badge: { display: 'inline-block', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: '9999px' },
    cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '960px', width: '100%', padding: '0 2rem 2rem', animation: 'fadeUp 0.8s ease-out 0.15s both' },
    card: { background: '#141414', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '2rem 1.5rem', transition: 'all 0.3s ease' },
    cardIcon: { fontSize: '1.5rem', marginBottom: '0.75rem' },
    cardTitle: { fontSize: '1.05rem', fontWeight: 700, color: '#f5f5f5', margin: '0 0 1rem' },
    text: { fontSize: '0.8125rem', color: '#737373', lineHeight: 1.6, margin: '0 0 0.75rem' },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    listItem: { fontSize: '0.8125rem', color: '#a3a3a3', lineHeight: 1.4 },
    linksGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    usefulLink: { fontSize: '0.8125rem', color: '#a3a3a3', textDecoration: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #252525', transition: 'all 0.2s ease' },
    back: { padding: '1.5rem 2rem 3rem', animation: 'fadeUp 0.8s ease-out 0.3s both' },
    backLink: { fontSize: '0.875rem', color: '#f97316', textDecoration: 'none', fontWeight: 500 },
}
