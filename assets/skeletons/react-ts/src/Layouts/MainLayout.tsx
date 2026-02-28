// MainLayout.tsx — Layout persistente da aplicação React (TypeScript)
// Header fixo com backdrop blur + conteúdo full-width

import { Link } from '@inertiajs/react'
import type { CSSProperties, ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div>
            <Link href="/" style={styles.brand}>Minha App</Link>
          </div>
          <ul style={styles.navLinks}>
            <li><Link href="/" style={styles.navLink}>Home</Link></li>
            <li><Link href="/about" style={styles.navLink}>Sobre</Link></li>
          </ul>
        </nav>
      </header>
      <main style={styles.content}>
        {children}
      </main>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  layout: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a' },
  header: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1f1f1f', padding: '0 2rem' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', height: '56px' },
  brand: { color: '#f97316', fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.02em' },
  navLinks: { listStyle: 'none', display: 'flex', gap: '1.5rem', margin: 0, padding: 0 },
  navLink: { color: '#a3a3a3', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 },
  content: { flex: 1, paddingTop: '56px' },
}
