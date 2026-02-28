// app.js — Ponto de entrada principal da aplicação Express
// Configura middlewares globais, sessão, Inertia e rotas

import express from "express";
import session from "express-session";
import inertia from "express-inertia";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import rateLimit from "express-rate-limit";
import routes from "./Routes/router.js";
import { errorHandler } from "./Middleware/middlewares.js";
import logger, { requestLogger } from "./Config/logger.js";

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';
const VITE_PORT = process.env.VITE_PORT || 5173;

// Limita requisições por IP para evitar abuso (100 req / 15min)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});

// Configura origens permitidas para CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Função que gera o HTML shell para o Inertia.js
// Em dev: carrega scripts do Vite dev server (HMR)
// Em prod: carrega assets compilados da pasta dist/
function htmlTemplate(page, viewData) {
    const pageJson = JSON.stringify(page).replace(/'/g, '&#039;');
    const title = viewData?.title || 'Minha App';

    const scripts = isDev
        ? `<script type="module" src="http://localhost:${VITE_PORT}/@vite/client"></script>
           <script type="module" src="http://localhost:${VITE_PORT}/src/main.js"></script>`
        : `<script type="module" src="/dist/assets/main.js"></script>
           <link rel="stylesheet" href="/dist/assets/main.css">`;

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <div id="app" data-page='${pageJson}'></div>
    ${scripts}
</body>
</html>`;
}

// Inicializa a aplicação dentro de uma função async
async function bootstrap() {
    // Registra middlewares globais na ordem correta
    app.use(limiter);
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger);

    // Em produção, serve arquivos compilados pelo Vite
    if (!isDev) {
        app.use(express.static(path.join(process.cwd(), 'dist')));
    }

    // Sessão necessária para flash messages e estado do Inertia
    app.use(session({
        secret: process.env.SESSION_SECRET || 'sua_chave_secreta',
        resave: false,
        saveUninitialized: false,
    }));

    // Integração com Inertia.js — a função html gera o shell HTML
    app.use(inertia({
        version: '1',
        html: htmlTemplate,
    }));

    // Monta todas as rotas da aplicação
    app.use(routes);

    // Handler de erros deve ser o último middleware registrado
    app.use(errorHandler);

    // Inicia o servidor e exibe informações no console
    app.listen(PORT, () => {
        logger.info('========================================');
        logger.info('  Servidor rodando com sucesso!');
        logger.info('========================================');
        logger.info(`  URL: http://localhost:${PORT}`);
        logger.info(`  Ambiente: ${isDev ? 'development' : 'production'}`);
        if (isDev) {
            logger.info(`  Vite: http://localhost:${VITE_PORT}`);
        }
        logger.info('========================================');
    });
}

bootstrap().catch((err) => {
    console.error('Falha ao iniciar servidor:', err);
    process.exit(1);
});
