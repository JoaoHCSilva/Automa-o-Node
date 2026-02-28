// main.js — Ponto de entrada da aplicação Vanilla
// SPA simples com router hash-based e consumo de REST API

import { Router } from './router.js'
import { HomePage } from './pages/home.js'
import { AboutPage } from './pages/about.js'
import './style.css'

const router = new Router('app')

// Registra as páginas da aplicação
router.addRoute('/', HomePage)
router.addRoute('/about', AboutPage)

// Inicia o roteamento
router.start()
