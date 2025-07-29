// ==========================
// BACKEND - Servidor DevClass
// ==========================

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const porta = 8000;
const path = require('path');


// Middleware para requisições CORS e JSON
app.use(cors());
app.use(express.json());


// Conexão com o banco de dados MySQL
const conexao = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '#Jm1403@mySQL', 
  database: 'devclass'
});

// --------------------------
// ROTA: Tela inicial
// --------------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'html')));
// Servir a pasta 'css' para arquivos CSS
app.use('/css', express.static(path.join(__dirname, 'css'))); // O '/css' é o prefixo da URL

// Opcional: Servir a pasta 'images' para imagens
app.use('/images', express.static(path.join(__dirname, 'images'))); // O '/images' é o prefixo da URL

// Opcional: Servir a pasta 'images' para imagens
app.use('/icons', express.static(path.join(__dirname, 'icons'))); // O '/images' é o prefixo da URL

// Opcional: Servir a pasta 'images' para imagens
app.use('/js', express.static(path.join(__dirname, 'js'))); // O '/images' é o prefixo da URL



// --------------------------
// ROTA: Listar todas as lições
// --------------------------
app.get('/licoes', (req, res) => {
  conexao.query('SELECT * FROM Licoes ORDER BY ordem ASC', (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao buscar lições' });
    res.json(resultado);
  });
});

// --------------------------
// ROTA: Listar questões de uma lição
// --------------------------
app.get('/licoes/:id/questoes', (req, res) => {
  const idLicao = req.params.id;
  const sql = `
    SELECT q.id AS id_questao, q.enunciado, q.codigo_exemplo,
           a.id AS id_alternativa, a.texto, a.correta
    FROM Questoes q
    JOIN Alternativas a ON q.id = a.questao_id
    WHERE q.licao_id = ?
    ORDER BY q.id, a.id
  `;

  conexao.query(sql, [idLicao], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao buscar questões' });

    const questoesAgrupadas = {};
    resultado.forEach(linha => {
      if (!questoesAgrupadas[linha.id_questao]) {
        questoesAgrupadas[linha.id_questao] = {
          id: linha.id_questao,
          enunciado: linha.enunciado,
          codigo: linha.codigo_exemplo,
          alternativas: []
        };
      }

      questoesAgrupadas[linha.id_questao].alternativas.push({
        id: linha.id_alternativa,
        texto: linha.texto
      });
    });

    res.json(Object.values(questoesAgrupadas));
  });
});


// Iniciar o servidor
app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
