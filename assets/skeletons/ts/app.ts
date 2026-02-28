// app.ts — Ponto de entrada principal da aplicação Express
// Configura middlewares globais, sessão, Inertia e rotas

import express from "express";
import session from "express-session";
import inertia from "express-inertia";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import routes from "./Routes/router.ts";
import { errorHandler } from "./Middleware/middlewares.ts";
import logger, { requestLogger } from "./Config/logger.ts";

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

// Inicializa a aplicação dentro de uma função async
// (necessário para await do middleware Inertia)
async function bootstrap() {
    // Registra middlewares globais na ordem correta
    app.use(limiter);
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger); // Logger de requisições HTTP

    // Sessão necessária para flash messages e estado do Inertia
    app.use(session({
        secret: process.env.SESSION_SECRET || 'sua_chave_secreta',
        resave: false,
        saveUninitialized: false,
    }));

    // Integração com Inertia.js para SSR/CSR híbrido
    app.use(await inertia({
        rootElementId: 'app',
        assetsVersion: 'v1',
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
        logger.info('  URL: http://localhost:' + PORT);
        logger.info('  Ambiente: ' + (process.env.NODE_ENV || 'development'));
        logger.info('========================================');
    });
}

bootstrap().catch((err) => {
    logger.error('Falha ao iniciar servidor:', err);
    process.exit(1);
});
