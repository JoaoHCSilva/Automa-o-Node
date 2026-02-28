// Pages/Index.tsx — Welcome page React TypeScript (estilo Laravel)
import { Head } from '@inertiajs/react'
import type { CSSProperties } from 'react'

interface IndexProps {
    titulo?: string
    descricao?: string
}

export default function Index({ titulo = 'Minha App', descricao = 'Aplicação fullstack com Express + Inertia.js' }: IndexProps) {
    return (
        <>
            <Head title="Bem-vindo" />
            <div style={styles.page}>
                <section style={styles.hero}>
                    <div style={styles.heroGlow}></div>
                    <div style={styles.heroContent}>
                        <div style={styles.logoMark}>
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="url(#g1)" strokeWidth="2" fill="none"/>
                                <path d="M24 4v40M6 14l18 10 18-10M6 34l18-10 18 10" stroke="url(#g1)" strokeWidth="2" opacity="0.5"/>
                                <defs><linearGradient id="g1" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#f97316"/><stop offset="1" stopColor="#ef4444"/></linearGradient></defs>
                            </svg>
                        </div>
                        <h1 style={styles.heroTitle}>{titulo}</h1>
                        <p style={styles.heroSubtitle}>{descricao}</p>
                        <div style={styles.heroActions}>
                            <a href="https://inertiajs.com" target="_blank" rel="noreferrer" style={{...styles.btn, ...styles.btnPrimary}}>Documentação</a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" style={{...styles.btn, ...styles.btnOutline}}>GitHub</a>
                        </div>
                    </div>
                </section>

                <section style={styles.features}>
                    {[
                        { icon: '⚡', title: 'Vite', desc: 'Build ultrarrápido com Hot Module Replacement para desenvolvimento ágil.' },
                        { icon: '🔗', title: 'Inertia.js', desc: 'SPA moderna sem API — o servidor controla a navegação, o cliente renderiza.' },
                        { icon: '⚛️', title: 'React', desc: 'Biblioteca declarativa com hooks, component-based architecture e ecossistema vasto.' },
                        { icon: '🚀', title: 'Express', desc: 'Framework minimalista e flexível para Node.js, rápido e descomplicado.' },
                    ].map(f => (
                        <div key={f.title} style={styles.featureCard} className="feature-card">
                            <div style={styles.featureIcon}>{f.icon}</div>
                            <h3 style={styles.featureTitle}>{f.title}</h3>
                            <p style={styles.featureDesc}>{f.desc}</p>
                        </div>
                    ))}
                </section>

                <footer style={styles.footer}>
                    <p style={styles.footerText}>Express + Inertia.js + React · v1.0.0</p>
                </footer>
            </div>

            <style>{`
                @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                .feature-card:hover { border-color: #333 !important; background: #1a1a1a !important; transform: translateY(-2px); }
            `}</style>
        </>
    )
}

const styles: Record<string, CSSProperties> = {
    page: { minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5', fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' },
    hero: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', padding: '6rem 2rem 4rem' },
    heroGlow: { position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(249, 115, 22, 0.12) 0%, transparent 70%)', pointerEvents: 'none' },
    heroContent: { textAlign: 'center', maxWidth: '640px', position: 'relative', zIndex: 1, animation: 'fadeUp 0.8s ease-out' },
    logoMark: { width: '56px', height: '56px', margin: '0 auto 2rem', animation: 'float 6s ease-in-out infinite' },
    heroTitle: { fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #fff 0%, #a3a3a3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 1rem', lineHeight: 1.1 },
    heroSubtitle: { fontSize: '1.125rem', color: '#737373', lineHeight: 1.6, margin: '0 0 2.5rem' },
    heroActions: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
    btn: { padding: '0.75rem 1.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s ease' },
    btnPrimary: { background: 'linear-gradient(135deg, #f97316, #ef4444)', color: '#fff', border: 'none', boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)' },
    btnOutline: { background: 'transparent', color: '#d4d4d4', border: '1px solid #333' },
    features: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '900px', width: '100%', padding: '2rem', animation: 'fadeUp 0.8s ease-out 0.2s both' },
    featureCard: { background: '#141414', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '2rem 1.5rem', transition: 'all 0.3s ease', cursor: 'default' },
    featureIcon: { fontSize: '1.75rem', marginBottom: '0.75rem' },
    featureTitle: { fontSize: '1rem', fontWeight: 700, color: '#f5f5f5', margin: '0 0 0.5rem' },
    featureDesc: { fontSize: '0.8125rem', color: '#737373', lineHeight: 1.5, margin: 0 },
    footer: { marginTop: 'auto', padding: '2rem', textAlign: 'center' },
    footerText: { fontSize: '0.75rem', color: '#404040', margin: 0 },
}
