// Pages/About.jsx — Página Sobre (estilo dark premium)
import { Head, Link } from '@inertiajs/react'

export default function About({ versao = '1.0.0' }) {
    return (
        <>
            <Head title="Sobre" />
            <div style={styles.page}>
                <section style={styles.hero}>
                    <div style={styles.heroGlow}></div>
                    <div style={styles.heroContent}>
                        <h1 style={styles.heroTitle}>Sobre o Projeto</h1>
                        <p style={styles.heroSubtitle}>Conheça a stack, a arquitetura e como tudo se conecta.</p>
                        <span style={styles.badge}>v{versao}</span>
                    </div>
                </section>

                <section style={styles.cards}>
                    {[
                        { icon: '🛠️', title: 'Stack Utilizada', content: (
                            <ul style={styles.list}>
                                <li><strong style={{color:'#d4d4d4'}}>Backend:</strong> Express.js + Node.js</li>
                                <li><strong style={{color:'#d4d4d4'}}>Frontend:</strong> React + Hooks</li>
                                <li><strong style={{color:'#d4d4d4'}}>Bridge:</strong> Inertia.js (sem REST API)</li>
                                <li><strong style={{color:'#d4d4d4'}}>Build:</strong> Vite</li>
                                <li><strong style={{color:'#d4d4d4'}}>Logger:</strong> Winston</li>
                            </ul>
                        )},
                        { icon: '🔗', title: 'Como Funciona', content: (
                            <>
                                <p style={styles.text}>O Inertia.js conecta seu backend Express diretamente ao React, eliminando a necessidade de criar endpoints REST para cada página.</p>
                                <p style={styles.text}>O servidor renderiza dados e o cliente hidrata os componentes React com reatividade completa.</p>
                            </>
                        )},
                        { icon: '📂', title: 'Estrutura', content: (
                            <ul style={styles.list}>
                                <li><strong style={{color:'#d4d4d4'}}>Controllers/</strong> — Lógica de negócio</li>
                                <li><strong style={{color:'#d4d4d4'}}>Routes/</strong> — Definição de rotas</li>
                                <li><strong style={{color:'#d4d4d4'}}>Middleware/</strong> — Interceptadores</li>
                                <li><strong style={{color:'#d4d4d4'}}>src/Pages/</strong> — Páginas Inertia</li>
                                <li><strong style={{color:'#d4d4d4'}}>src/Layouts/</strong> — Layouts reutilizáveis</li>
                            </ul>
                        )},
                        { icon: '🚀', title: 'Links Úteis', content: (
                            <div style={styles.linksGrid}>
                                <a href="https://inertiajs.com" target="_blank" rel="noreferrer" style={styles.usefulLink} className="useful-link">📖 Inertia.js Docs</a>
                                <a href="https://react.dev" target="_blank" rel="noreferrer" style={styles.usefulLink} className="useful-link">⚛️ React Docs</a>
                                <a href="https://expressjs.com" target="_blank" rel="noreferrer" style={styles.usefulLink} className="useful-link">⚡ Express Docs</a>
                                <a href="https://github.com/JoaoHCSilva/Automa-o-Node" target="_blank" rel="noreferrer" style={styles.usefulLink} className="useful-link">🐙 GitHub</a>
                            </div>
                        )},
                    ].map(c => (
                        <div key={c.title} style={styles.card} className="info-card">
                            <div style={{fontSize:'1.5rem',marginBottom:'0.75rem'}}>{c.icon}</div>
                            <h3 style={styles.cardTitle}>{c.title}</h3>
                            {c.content}
                        </div>
                    ))}
                </section>

                <div style={styles.back}>
                    <Link href="/" style={styles.backLink}>← Voltar para Home</Link>
                </div>
            </div>

            <style>{`
                @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .info-card:hover { border-color: #333 !important; background: #1a1a1a !important; transform: translateY(-2px); }
                .useful-link:hover { border-color: #f97316 !important; color: #f5f5f5 !important; }
            `}</style>
        </>
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
    cardTitle: { fontSize: '1.05rem', fontWeight: 700, color: '#f5f5f5', margin: '0 0 1rem' },
    text: { fontSize: '0.8125rem', color: '#737373', lineHeight: 1.6, margin: '0 0 0.75rem' },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#a3a3a3' },
    linksGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    usefulLink: { fontSize: '0.8125rem', color: '#a3a3a3', textDecoration: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #252525', transition: 'all 0.2s ease' },
    back: { padding: '1.5rem 2rem 3rem', animation: 'fadeUp 0.8s ease-out 0.3s both' },
    backLink: { fontSize: '0.875rem', color: '#f97316', textDecoration: 'none', fontWeight: 500 },
}
