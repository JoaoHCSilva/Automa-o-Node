// UserController.ts — Controller responsável pelo CRUD de usuários
// Recebe requisições HTTP e delega a lógica para o UserService

import type { Request, Response } from 'express';
import UserService from '../Services/UserService.ts';


/**
 * Controller de exemplo para gerenciar usuarios
 */
class UserController {
    // GET /api/users — Retorna lista de todos os usuários
    async index(req: Request, res: Response): Promise<void> {
        try {
            const result = await UserService.getAllUsers();

            if (!result.success) {
                return res.status(500).json(result);
            }

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuarios',
                error: error.message
            });
        }
    }

    // GET /api/users/:id — Retorna um usuário específico por ID
    async show(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await UserService.getUserById(Number(id));

            if (!result.success) {
                return res.status(404).json(result);
            }

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuario',
                error: error.message
            });
        }
    }

    // POST /api/users — Cria um novo usuário com dados do body
    async store(req: Request, res: Response): Promise<void> {
        try {
            const { name, email } = req.body;
            const result = await UserService.createUser({ name, email });

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao criar usuario',
                error: error.message
            });
        }
    }

    // PUT /api/users/:id — Atualiza dados de um usuário existente
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const result = await UserService.updateUser(Number(id), { name, email });

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao atualizar usuario',
                error: error.message
            });
        }
    }

    // DELETE /api/users/:id — Remove um usuário pelo ID
    async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(Number(id));

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao remover usuario',
                error: error.message
            });
        }
    }
}

export default new UserController();
