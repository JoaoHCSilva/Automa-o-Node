// UserService.ts — Camada de lógica de negócio para usuários
// Intermediário entre o Controller e o Model, aplica validações e regras

import User from '../Models/User.ts';

/**
 * Service de exemplo para logica de negocio de usuarios
 * Services contem a logica de negocio e sao chamados pelos Controllers
 */
class UserService {
    // Busca todos os usuários e retorna resultado padronizado
    async getAllUsers() {
        try {
            const users = await User.findAll();
            return {
                success: true,
                data: users
            };
        } catch (error: any) {
            return {
                success: false,
                message: 'Erro ao buscar usuarios',
                error: error.message
            };
        }
    }

    // Busca um usuário por ID, retorna 404 se não encontrado
    async getUserById(id: number) {
        try {
            const user = await User.findById(id);

            if (!user) {
                return {
                    success: false,
                    message: 'Usuario nao encontrado'
                };
            }

            return {
                success: true,
                data: user
            };
        } catch (error: any) {
            return {
                success: false,
                message: 'Erro ao buscar usuario',
                error: error.message
            };
        }
    }

    // Cria usuário após validar campos obrigatórios e unicidade do email
    async createUser(data: any) {
        try {
            // Validação de campos obrigatórios
            if (!data.name || !data.email) {
                return {
                    success: false,
                    message: 'Nome e email sao obrigatorios'
                };
            }

            // Verifica se o email já está em uso
            const existingUser = await User.findByEmail(data.email);
            if (existingUser) {
                return {
                    success: false,
                    message: 'Email ja cadastrado'
                };
            }

            const user = await User.create(data);

            return {
                success: true,
                message: 'Usuario criado com sucesso',
                data: user
            };
        } catch (error: any) {
            return {
                success: false,
                message: 'Erro ao criar usuario',
                error: error.message
            };
        }
    }

    // Atualiza usuário existente, verifica se ele existe antes
    async updateUser(id: number, data: any) {
        try {
            const user = await User.findById(id);

            if (!user) {
                return {
                    success: false,
                    message: 'Usuario nao encontrado'
                };
            }

            await user.update(data);

            return {
                success: true,
                message: 'Usuario atualizado com sucesso',
                data: user
            };
        } catch (error: any) {
            return {
                success: false,
                message: 'Erro ao atualizar usuario',
                error: error.message
            };
        }
    }

    // Remove usuário, verifica existência antes de deletar
    async deleteUser(id: number) {
        try {
            const user = await User.findById(id);

            if (!user) {
                return {
                    success: false,
                    message: 'Usuario nao encontrado'
                };
            }

            await user.delete();

            return {
                success: true,
                message: 'Usuario removido com sucesso'
            };
        } catch (error: any) {
            return {
                success: false,
                message: 'Erro ao remover usuario',
                error: error.message
            };
        }
    }
}

export default new UserService();
