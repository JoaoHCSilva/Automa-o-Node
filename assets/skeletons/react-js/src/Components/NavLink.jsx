// NavLink.jsx — Componente reutilizável de navegação Inertia
// Aplica classe .active automaticamente na rota atual

import { Link, usePage } from '@inertiajs/react'

export default function NavLink({ href, children }) {
  const { url } = usePage()
  const isActive = url === href

  return (
    <Link
      href={href}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  )
}
