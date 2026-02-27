// AuthController.js — Controller de autenticação JWT
// Gerencia login, registro e verificação de token

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Controller de autenticação
 */
class AuthController {
    // POST /auth/login — Autentica usuário e retorna token JWT
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validação de campos obrigatórios
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email e senha são obrigatórios'
                });
            }

            // TODO: Substituir pelo acesso real ao banco de dados
            const user = {
                id: 1,
                email: 'usuario@example.com',
                password: await bcrypt.hash('senha123', 10),
                name: 'Usuário Teste'
            };

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Compara senha fornecida com o hash armazenado
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Gera token JWT com expiração de 24 horas
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'seu-secret-super-secreto',
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    },
                    token
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao realizar login',
                error: error.message
            });
        }
    }

    // POST /auth/register — Cria novo usuário com hash de senha
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validação de campos obrigatórios
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome, email e senha são obrigatórios'
                });
            }

            // Validação de tamanho mínimo da senha
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Senha deve ter pelo menos 6 caracteres'
                });
            }

            // TODO: Verificar se email já existe no banco
            // const existingUser = await User.findByEmail(email);

            // Gera hash da senha com salt rounds de 10
            const hashedPassword = await bcrypt.hash(password, 10);

            // TODO: Persistir no banco de dados
            const newUser = {
                id: Date.now(),
                name,
                email,
                password: hashedPassword
            };

            // Gera token JWT automaticamente após registro
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email },
                process.env.JWT_SECRET || 'seu-secret-super-secreto',
                { expiresIn: '24h' }
            );

            return res.status(201).json({
                success: true,
                message: 'Usuário registrado com sucesso',
                data: {
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        name: newUser.name
                    },
                    token
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao registrar usuário',
                error: error.message
            });
        }
    }

    // GET /auth/verify — Valida se o token JWT do header é válido
    async verifyToken(req, res) {
        try {
            // Extrai token do header Authorization (formato: "Bearer <token>")
            const token = req.headers.authorization?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Token não fornecido'
                });
            }

            // Decodifica e verifica assinatura do token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'seu-secret-super-secreto'
            );

            return res.status(200).json({
                success: true,
                message: 'Token válido',
                data: decoded
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido',
                error: error.message
            });
        }
    }
}

export default new AuthController();
