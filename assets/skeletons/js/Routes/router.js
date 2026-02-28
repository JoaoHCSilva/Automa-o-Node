// router.js — Arquivo central de rotas da aplicação
// Define todas as rotas públicas, protegidas e o fallback 404

import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import { authMiddleware, logMiddleware, validateUser } from "../Middleware/middlewares.js";

const router = Router();

// Aplica log de requisições em todas as rotas
router.use(logMiddleware);

// =====================================================
// ROTAS DE PÁGINA (Inertia.js — renderização server-driven)
// =====================================================

// Home — renderiza o componente Index via Inertia
router.get("/", (req, res) => {
    req.inertia.render({
        component: 'Index',
        props: {
            titulo: 'Bem-vindo!',
            descricao: 'Aplicação fullstack com Express + Inertia.js',
        }
    });
});

// Sobre — renderiza o componente About via Inertia
router.get("/about", (req, res) => {
    req.inertia.render({
        component: 'About',
        props: {
            versao: '1.0.0',
        }
    });
});

// Health check — API REST (sem Inertia)
router.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString()
    });
});

// =====================================================
// ROTAS DE USUÁRIOS (CRUD completo)
// =====================================================

router.get("/api/users", UserController.index);           // Lista todos
router.get("/api/users/:id", UserController.show);         // Busca por ID
router.post("/api/users", validateUser, UserController.store);    // Cria novo
router.put("/api/users/:id", validateUser, UserController.update); // Atualiza
router.delete("/api/users/:id", UserController.destroy);   // Remove

// =====================================================
// ROTAS PROTEGIDAS (com autenticação)
// =====================================================
// Descomente para ativar rotas que exigem token JWT
// router.get("/api/protected", authMiddleware, (req, res) => {
//     res.json({ message: "Rota protegida acessada com sucesso!" });
// });

// =====================================================
// ROTA 404 — deve ser a última rota registrada
// =====================================================
router.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Rota não encontrada"
    });
});

export default router;
