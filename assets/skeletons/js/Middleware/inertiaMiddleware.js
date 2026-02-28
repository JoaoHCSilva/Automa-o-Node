// inertiaMiddleware.js — Middleware Inertia.js simplificado para Express
// Implementa o protocolo Inertia sem depender de pacotes externos

import { existsSync } from 'fs';
import { join } from 'path';

const VITE_PORT = process.env.VITE_PORT || 5173;
const isDev = process.env.NODE_ENV !== 'production';

// Detecta automaticamente o entry point (jsx, tsx, js, ts)
function detectEntry() {
    const exts = ['jsx', 'tsx', 'js', 'ts'];
    for (const ext of exts) {
        if (existsSync(join(process.cwd(), `src/main.${ext}`))) {
            return `src/main.${ext}`;
        }
    }
    return 'src/main.js';
}
const ENTRY_FILE = detectEntry();

// Gera o HTML shell com data-page para o Inertia
function generateHtml(page) {
    const pageJson = JSON.stringify(page).replace(/'/g, '&#039;');

    const scripts = isDev
        ? `<script type="module" src="http://localhost:${VITE_PORT}/@vite/client"></script>
           <script type="module" src="http://localhost:${VITE_PORT}/${ENTRY_FILE}"></script>`
        : `<script type="module" src="/assets/main.js"></script>
           <link rel="stylesheet" href="/assets/main.css">`;

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha App</title>
    <style>*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } html, body { width: 100%; overflow-x: hidden; }</style>
</head>
<body>
    <div id="app" data-page='${pageJson}'></div>
    ${scripts}
</body>
</html>`;
}

// Middleware que adiciona res.inertia ao Express
export function inertiaMiddleware(req, res, next) {
    const isInertiaRequest = req.headers['x-inertia'] === 'true';

    res.inertia = {
        render(component, props = {}) {
            const page = {
                component,
                props,
                url: req.originalUrl,
                version: '1',
            };

            if (isInertiaRequest) {
                res.setHeader('X-Inertia', 'true');
                res.setHeader('Vary', 'X-Inertia');
                return res.json(page);
            }

            res.type('html').send(generateHtml(page));
        }
    };

    next();
}
