// logger.ts — Configuração de logging profissional com Winston
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

// Cria instância do logger com múltiplos transportes
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: customFormat,
    defaultMeta: { service: 'api' },
    transports: [
        // Arquivo exclusivo para erros — facilita debug em produção
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 5242880, // Rotação a cada 5MB
            maxFiles: 5,
        }),
        // Arquivo com todos os logs combinados
        new winston.transports.File({
            filename: path.join(logsDir, 'combined.log'),
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ],
});

// Em desenvolvimento, exibe logs no terminal para feedback rápido
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleFormat,
    }));
}

// Middleware Express que registra cada requisição HTTP
export const requestLogger = (req: any, res: any, next: any) => {
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
