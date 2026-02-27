// User.js — Model de exemplo para entidade Usuário
// Define métodos de acesso ao banco
// Em produção, substituir pelos métodos reais do ORM (Prisma, Sequelize, etc.)

/**
 * Model de exemplo para Usuario
 * Este e um exemplo basico. Em producao, use um ORM como Sequelize, TypeORM ou Prisma
 */
class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    // Retorna todos os usuários do banco
    static async findAll() {
        // TODO: Implementar busca no banco de dados
        return [];
    }

    // Busca um único usuário pelo ID
    static async findById(id) {
        // TODO: Implementar busca no banco de dados
        return null;
    }

    // Busca um usuário pelo email (usado para login e verificação de duplicatas)
    static async findByEmail(email) {
        // TODO: Implementar busca no banco de dados
        return null;
    }

    // Persiste um novo usuário no banco
    static async create(data) {
        // TODO: Implementar criacao no banco de dados
        return new User(data);
    }

    // Atualiza campos parciais do usuário
    async update(data) {
        // TODO: Implementar atualizacao no banco de dados
        Object.assign(this, data);
        this.updatedAt = new Date();
        return this;
    }

    // Remove o usuário do banco
    async delete() {
        // TODO: Implementar remocao do banco de dados
        return true;
    }
}

export default User;
