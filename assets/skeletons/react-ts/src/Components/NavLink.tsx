// NavLink.tsx — Componente reutilizável de navegação Inertia (TypeScript)

import { Link, usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
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
