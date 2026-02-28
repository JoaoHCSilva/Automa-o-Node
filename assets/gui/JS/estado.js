// estado.js — Estado global da aplicação
// Exporta o objeto de estado que é compartilhado entre todos os módulos.

export const estado = {
    stepAtual: 1,
    nomeProjeto: '',
    caminho: '',
    linguagem: -1,     // 0 = JS, 1 = TS
    template: -1,      // 0 = React, 1 = Vue, 2 = Vanilla
    caminhoFinal: '',   // Preenchido após criação
    executando: false
};
