// MainLayout.jsx — Layout persistente da aplicação React
// Mantém header/footer entre transições de página via Inertia

import { Link } from '@inertiajs/react'
import NavLink from '../Components/NavLink'

export default function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <nav className="app-nav">
          <div className="nav-brand">
            <Link href="/" className="brand-link">Minha App</Link>
          </div>
          <ul className="nav-links">
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/about">Sobre</NavLink></li>
          </ul>
        </nav>
      </header>

      <main className="app-content">
        {children}
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} — Construído com Inertia.js + React</p>
      </footer>
    </div>
  )
}
