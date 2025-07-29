-- ================================================
-- BANCO DE DADOS - DevClass
-- Script único com estrutura + dados iniciais
-- ================================================

-- Criar banco e selecionar
CREATE DATABASE IF NOT EXISTS devclass;
USE devclass;

-- =============================
-- Tabela de Usuários
-- =============================
CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- Tabela de Lições
-- =============================
CREATE TABLE IF NOT EXISTS Licoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    ordem INT NOT NULL,
    xp INT NOT NULL
);

-- =============================
-- Tabela de Questões
-- =============================
CREATE TABLE IF NOT EXISTS Questoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    licao_id INT NOT NULL,
    enunciado TEXT NOT NULL,
    codigo_exemplo TEXT,
    FOREIGN KEY (licao_id) REFERENCES Licoes(id)
);

-- =============================
-- Tabela de Alternativas das Questões
-- =============================
CREATE TABLE IF NOT EXISTS Alternativas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questao_id INT NOT NULL,
    texto TEXT NOT NULL,
    correta BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (questao_id) REFERENCES Questoes(id)
);

-- =============================
-- Tabela de Progresso dos Usuários nas Lições
-- =============================
CREATE TABLE IF NOT EXISTS ProgressoLicoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    licao_id INT NOT NULL,
    concluido BOOLEAN DEFAULT FALSE,
    data_conclusao TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (licao_id) REFERENCES Licoes(id)
);

-- =============================
-- Tabela de Conquistas Pré-definidas
-- =============================
CREATE TABLE IF NOT EXISTS Conquistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    tipo ENUM('licoes', 'xp', 'streak') NOT NULL,
    alvo INT NOT NULL
);

-- =============================
-- Tabela de Conquistas do Usuário
-- =============================
CREATE TABLE IF NOT EXISTS ConquistasUsuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    conquista_id INT NOT NULL,
    data_desbloqueio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (conquista_id) REFERENCES Conquistas(id)
);

-- =======================================
-- INSERÇÃO DE UMA LIÇÃO EXEMPLO (JavaScript)
-- =======================================
INSERT INTO Licoes (titulo, descricao, ordem, xp) VALUES
('Variáveis e Operadores', 'Aprenda os fundamentos das variáveis e operadores em JavaScript', 1, 25);

-- =============================
-- INSERÇÃO DE 15 QUESTÕES
-- =============================
INSERT INTO Questoes (licao_id, enunciado, codigo_exemplo) VALUES
(1, 'Qual a saída do código abaixo?', 'let nome = "João";\nalert(nome);'),
(1, 'Qual o resultado de 2 + 2 * 2 em JavaScript?', NULL),
(1, 'Qual o tipo da variável abaixo?\n\nlet ativo = true;', NULL),
(1, 'Qual é a finalidade do operador === em JavaScript?', NULL),
(1, 'O que acontece ao declarar:\nlet x;\nalert(x);', NULL),
(1, 'Qual o valor final de x?\n\nlet x = 5;\nx += 3;', NULL),
(1, 'O que esse código imprime?\n\nlet a = 10;\nlet b = "10";\nalert(a == b);', NULL),
(1, 'Qual a diferença entre var, let e const?', NULL),
(1, 'O que esse código retorna?\n\nconsole.log(typeof null);', NULL),
(1, 'Qual o valor de resultado?\n\nlet resultado = "5" + 3;', NULL),
(1, 'Qual operador é usado para negar uma expressão lógica?', NULL),
(1, 'Como declarar um array vazio em JavaScript?', NULL),
(1, 'Como acessar o terceiro elemento de um array chamado numeros?', NULL),
(1, 'O que o seguinte código imprime?\n\nalert(typeof undefined);', NULL),
(1, 'O que acontece se você tentar redeclarar uma variável let?', NULL);

-- =============================
-- INSERÇÃO DE ALTERNATIVAS PARA 5 QUESTÕES
-- =============================
INSERT INTO Alternativas (questao_id, texto, correta) VALUES
(1, 'João', TRUE),
(1, 'nome', FALSE),
(1, 'undefined', FALSE),
(1, 'alert', FALSE),

(2, '6', FALSE),
(2, '8', FALSE),
(2, '6 (por precedência dos operadores)', TRUE),
(2, 'Erro', FALSE),

(3, 'string', FALSE),
(3, 'boolean', TRUE),
(3, 'number', FALSE),
(3, 'undefined', FALSE),

(4, 'Compara valor e tipo', TRUE),
(4, 'Compara apenas valor', FALSE),
(4, 'Concatena strings', FALSE),
(4, 'Atribui valor', FALSE),

(5, 'undefined', TRUE),
(5, 'null', FALSE),
(5, '0', FALSE),
(5, 'erro de sintaxe', FALSE);
