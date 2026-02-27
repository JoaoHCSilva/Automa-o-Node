// database.js — Configuração de conexão com banco de dados
// Suporta SQLite, PostgreSQL, MySQL e MongoDB

// Para SQLite (recomendado para desenvolvimento): npm install sqlite3
// Para PostgreSQL: npm install pg
// Para MySQL: npm install mysql2
// Para MongoDB: npm install mongodb

import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    // SQLite — banco local em arquivo, ideal para dev e prototipagem
    sqlite: {
        filename: './Database/database.sqlite',
        driver: 'sqlite3'
    },

    // PostgreSQL — banco robusto para produção
    postgres: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'myapp',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || ''
    },

    // MySQL — alternativa popular para produção
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'myapp',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    },

    // MongoDB — banco NoSQL baseado em documentos
    mongodb: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017/myapp'
    }
};

export default dbConfig;
