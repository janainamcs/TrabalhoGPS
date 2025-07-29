# DevClass Backend

Backend em Node.js + Express com MySQL e Sequelize.

## Scripts

```bash
npm install     # Instalar dependências
npm run dev     # Rodar em modo desenvolvimento
```

## Variáveis de ambiente

Verifique o arquivo `.env.example` e crie um `.env` com as credenciais corretas.

## Endpoints

- POST /api/register
- POST /api/login
- GET /api/profile (protegido por JWT)
