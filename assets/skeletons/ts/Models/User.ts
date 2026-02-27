// User.ts — Model de exemplo para entidade Usuário
// Define a interface de dados e métodos de acesso ao banco
// Em produção, substituir pelos métodos reais do ORM (Prisma, TypeORM, etc.)

interface IUser {
    id?: number;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Model de exemplo para Usuario
 * Este e um exemplo basico. Em producao, use um ORM como Sequelize, TypeORM ou Prisma
 */
class User implements IUser {
    id?: number;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    // Retorna todos os usuários do banco
    static async findAll(): Promise<User[]> {
        // TODO: Implementar busca no banco de dados
        return [];
    }

    // Busca um único usuário pelo ID
    static async findById(id: number): Promise<User | null> {
        // TODO: Implementar busca no banco de dados
        return null;
    }

    // Busca um usuário pelo email (usado para login e verificação de duplicatas)
    static async findByEmail(email: string): Promise<User | null> {
        // TODO: Implementar busca no banco de dados
        return null;
    }

    // Persiste um novo usuário no banco
    static async create(data: IUser): Promise<User> {
        // TODO: Implementar criacao no banco de dados
        return new User(data);
    }

    // Atualiza campos parciais do usuário
    async update(data: Partial<IUser>): Promise<User> {
        // TODO: Implementar atualizacao no banco de dados
        Object.assign(this, data);
        this.updatedAt = new Date();
        return this;
    }

    // Remove o usuário do banco
    async delete(): Promise<boolean> {
        // TODO: Implementar remocao do banco de dados
        return true;
    }
}

export default User;
