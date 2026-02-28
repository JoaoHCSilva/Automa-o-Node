// inertiaMiddleware.js — Middleware Inertia.js simplificado para Express
// Implementa o protocolo Inertia sem depender de pacotes externos

const VITE_PORT = process.env.VITE_PORT || 5173;
const isDev = process.env.NODE_ENV !== 'production';

// Gera o HTML shell com data-page para o Inertia
function generateHtml(page) {
    const pageJson = JSON.stringify(page).replace(/'/g, '&#039;');

    const scripts = isDev
        ? `<script type="module" src="http://localhost:${VITE_PORT}/@vite/client"></script>
           <script type="module" src="http://localhost:${VITE_PORT}/src/main.js"></script>`
        : `<script type="module" src="/assets/main.js"></script>
           <link rel="stylesheet" href="/assets/main.css">`;

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha App</title>
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
