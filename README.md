# 📚 Surdes Literaries - Backend

Este é o backend da aplicação **Surdes Literaries**, uma plataforma para o gerenciamento de um dicionário literário colaborativo. Desenvolvido em Node.js com Express e Prisma, o sistema oferece recursos de cadastro, listagem, edição e exclusão lógica de termos, bem como suporte para upload de imagens.

---

## 🚀 Funcionalidades

- 📖 Cadastro de palavras com significado e metadados (autor, editora, gênero, etc.)
- 🔍 Filtros de busca por nome, autor, editora e gênero
- 🧹 Exclusão lógica (soft delete)
- ✏️ Atualização parcial e total de registros (`PUT` e `PATCH`)
- 📦 Upload de imagens com suporte a serviços externos (como Cloudinary ou ImgBB)
- 🔢 Paginação via query string (`?limit=10`)
- 🔗 Suporte a filtros combinados (`AND` e `OR`)
- 🧱 Estruturação em MVC

---

## 🧱 Estrutura do Projeto
```bash
src/
├── controllers/
│ ├── dictionary-controller.js
│ └── upload-controller.js
├── routes/
│ ├── dictionary-routes.js
│ └── upload-routes.js
├── middlewares/
│ └── upload.js
├── prisma/
│ └── schema.prisma
├── app.js
└── server.js
```
---

## 💾 Requisitos

- Node.js 18+
- Banco de dados PostgreSQL
- Prisma ORM

---

## ⚙️ Instalação

1. Clone o projeto:
```bash
git clone https://github.com/seu-usuario/surdes-literaries-backend.git
cd surdes-literaries-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo .env do banco de dados
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/surdes"
```
4. Rode as Migrações:
```bash
npx prisma migrate dev
```
5. Inicie o servidor:
```bash
npm run dev
```

