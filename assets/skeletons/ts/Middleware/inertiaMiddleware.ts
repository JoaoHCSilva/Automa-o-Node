// inertiaMiddleware.ts — Middleware Inertia.js simplificado para Express
// Implementa o protocolo Inertia sem depender de pacotes externos

import type { Request, Response, NextFunction } from "express";
import { existsSync } from "fs";
import { join } from "path";

interface InertiaRenderOptions {
    component: string;
    props?: Record<string, unknown>;
}

const VITE_PORT = process.env.VITE_PORT || 5173;
const isDev = process.env.NODE_ENV !== 'production';

// Detecta automaticamente o entry point (tsx, jsx, ts, js)
function detectEntry(): string {
    const exts = ['tsx', 'jsx', 'ts', 'js'];
    for (const ext of exts) {
        if (existsSync(join(process.cwd(), `src/main.${ext}`))) {
            return `src/main.${ext}`;
        }
    }
    return 'src/main.ts';
}
const ENTRY_FILE = detectEntry();

// Gera o HTML shell com data-page para o Inertia
function generateHtml(page: Record<string, unknown>): string {
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
export function inertiaMiddleware(req: Request, res: Response, next: NextFunction) {
    const isInertiaRequest = req.headers['x-inertia'] === 'true';

    (res as any).inertia = {
        render(component: string, props: Record<string, unknown> = {}) {
            const page = {
                component,
                props,
                url: req.originalUrl,
                version: '1',
            };

            if (isInertiaRequest) {
                // Requisição Inertia (navegação SPA): retorna JSON
                res.setHeader('X-Inertia', 'true');
                res.setHeader('Vary', 'X-Inertia');
                return res.json(page);
            }

            // Primeira visita: retorna HTML completo com data-page
            res.type('html').send(generateHtml(page));
        }
    };

    next();
}
