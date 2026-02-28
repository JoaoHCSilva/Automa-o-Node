// MainLayout.tsx — Layout persistente da aplicação React (TypeScript)
// Header fixo com backdrop blur + conteúdo full-width

import './MainLayout.css'
import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <nav className="app-nav">
          <div className="nav-brand">
            <Link href="/" className="brand-link">Minha App</Link>
          </div>
          <ul className="nav-links">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/about" className="nav-link">Sobre</Link></li>
          </ul>
        </nav>
      </header>
      <main className="app-content">
        {children}
      </main>
    </div>
  )
}
