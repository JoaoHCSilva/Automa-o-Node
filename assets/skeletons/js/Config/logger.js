// logger.js — Configuração de logging profissional com Winston
// Grava logs em arquivo e exibe no console durante desenvolvimento

import winston from 'winston';
import path from 'path';

// Diretório onde os arquivos de log serão armazenados
const logsDir = path.join(process.cwd(), 'logs');

// Formato para arquivos de log — JSON estruturado com timestamp
const customFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Formato para console — colorido e legível para desenvolvimento
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let msg = `[${timestamp}] ${level}: ${message}`;
        if (Object.keys(meta).length > 0) {
            msg += ' ' + JSON.stringify(meta);
        }
        return msg;
    })
);

// Cria instância do logger — console sempre ativo para feedback rápido
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: customFormat,
    defaultMeta: { service: 'api' },
    transports: [
        // Console sempre ativo — formato colorido em dev, JSON em prod
        new winston.transports.Console({
            format: process.env.NODE_ENV === 'production' ? customFormat : consoleFormat,
        }),
    ],
});

// Em produção, adiciona logs em arquivo para persistência e auditoria
// NÃO ativa em dev porque node --watch detecta mudanças em logs/ e causa restart loop
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        maxsize: 5242880,
        maxFiles: 5,
    }));
    logger.add(new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        maxsize: 5242880,
        maxFiles: 5,
    }));
}

// Middleware Express que registra cada requisição HTTP
export const requestLogger = (req, res, next) => {
    const start = Date.now();

    // Captura métricas quando a resposta terminar
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress,
        });
    });

    next();
};

export default logger;
