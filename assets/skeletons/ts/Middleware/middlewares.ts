// middlewares.ts — Middlewares reutilizáveis da aplicação
// Contém: autenticação, logging, validação de dados e tratamento de erros

import type { Request, Response, NextFunction } from 'express';

// Middleware de autenticação — verifica presença e validade do token JWT
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token nao fornecido'
        });
    }

    try {
        // TODO: Validar o token (JWT, por exemplo)
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token invalido'
        });
    }
};

// Middleware de log — registra timestamp, método HTTP e path de cada requisição
export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log('[' + timestamp + ']', req.method, req.path);
    next();
};

// Middleware de validação — verifica se name e email estão presentes e válidos
export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome e obrigatorio'
        });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({
            success: false,
            message: 'Email invalido'
        });
    }

    next();
};

// Middleware de erros — captura erros não tratados e retorna JSON padronizado
// Em development, inclui stack trace para facilitar debug
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
