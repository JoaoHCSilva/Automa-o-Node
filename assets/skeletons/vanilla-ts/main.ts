// main.ts — Ponto de entrada da aplicação Vanilla (TypeScript)
// SPA simples com router hash-based e consumo de REST API

import { Router } from './router'
import { HomePage } from './pages/home'
import { AboutPage } from './pages/about'
import './style.css'

const router = new Router('app')

// Registra as páginas da aplicação
router.addRoute('/', HomePage)
router.addRoute('/about', AboutPage)

// Inicia o roteamento
router.start()
