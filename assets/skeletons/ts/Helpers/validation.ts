// validation.ts — Validações reutilizáveis com express-validator
// Define regras de validação para cada rota (users, auth)

import { body, param, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

// Middleware genérico que verifica erros das validações anteriores no chain
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Erro de validação',
            errors: errors.array()
        });
    }
    next();
};

// Regras de validação para operações CRUD de usuários
export const userValidation = {
    // POST /api/users — nome obrigatório, email válido, senha opcional
    create: [
        body('name')
            .trim()
            .notEmpty().withMessage('Nome é obrigatório')
            .isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres')
            .escape(),
        body('email')
            .trim()
            .notEmpty().withMessage('Email é obrigatório')
            .isEmail().withMessage('Email inválido')
            .normalizeEmail(),
        body('password')
            .optional()
            .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
            .matches(/\d/).withMessage('Senha deve conter pelo menos um número'),
        handleValidationErrors
    ],

    // PUT /api/users/:id — campos opcionais, ID obrigatório
    update: [
        param('id')
            .isInt({ min: 1 }).withMessage('ID inválido'),
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres')
            .escape(),
        body('email')
            .optional()
            .trim()
            .isEmail().withMessage('Email inválido')
            .normalizeEmail(),
        handleValidationErrors
    ],

    // GET /api/users/:id — valida que ID é inteiro positivo
    getById: [
        param('id')
            .isInt({ min: 1 }).withMessage('ID deve ser um número positivo'),
        handleValidationErrors
    ],

    // DELETE /api/users/:id — valida que ID é inteiro positivo
    delete: [
        param('id')
            .isInt({ min: 1 }).withMessage('ID deve ser um número positivo'),
        handleValidationErrors
    ]
};

// Regras de validação para autenticação
export const authValidation = {
    // POST /auth/login — email e senha obrigatórios
    login: [
        body('email')
            .trim()
            .notEmpty().withMessage('Email é obrigatório')
            .isEmail().withMessage('Email inválido')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Senha é obrigatória'),
        handleValidationErrors
    ],

    // POST /auth/register — nome, email e senha com regras de segurança
    register: [
        body('name')
            .trim()
            .notEmpty().withMessage('Nome é obrigatório')
            .isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres')
            .escape(),
        body('email')
            .trim()
            .notEmpty().withMessage('Email é obrigatório')
            .isEmail().withMessage('Email inválido')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Senha é obrigatória')
            .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
            .matches(/\d/).withMessage('Senha deve conter pelo menos um número'),
        handleValidationErrors
    ]
};

// Helper para sanitizar qualquer campo de texto genérico
export const sanitizeString = (fieldName: string) => {
    return body(fieldName)
        .trim()
        .escape();
};
