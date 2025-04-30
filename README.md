# InfoNime 🎬 #

Aplicação web desenvolvida com React consumindo o meu próprio backend, permitindo aos usuários explorarem animes, visualizarem informações detalhadas, adicionarem/removerem títulos à sua lista de animes pessoal e interagirem com comentários e avaliações.

## Sobre o projeto 🧠

Esse projeto foi desenvolvido com foco em praticar:
- **Estruturação de componentes reutilizáveis**
- **Boas práticas com hooks e contextAPI**
- **Reafatoração e maior legibilidade e clean code**
- **Tratamentos de erros e loading**
- **Requisições ao backend**

## Funcionalidades da aplicação ⚙
- 🔍 **Busca por animes**
- 📂 **Visualização de animes por categoria**
- ⭐ **Avaliação e comentários**
- 📌 **Adicionar/remover animes da lista pessoal**
- 🔒 **Sistema de autenticação (login/registro)**
- ⚙️ **Perfil de usuário editável**
- 🎨 **Interface responsiva e moderna** 

## Tecnologias 🛠
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ReactRouterDOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [ContextAPI](https://reactjs.org/docs/context.html)
- [Vite](https://vitejs.dev/)
- [CSSModules]()
- Backend: **Node.js + Express + JWT + MongoDB (Mongoose) + Multer**

## Como rodar o projeto localmente ✔

```bash
## Clone o repositório
git clone https://github.com/Gabriel-Labritz/infonime_frontend_vite.git

## Acesse a pasta
cd infonime_frontend_vite

# Instale as dependências
npm install

# Rode o projeto
npm run dev

```

## Variáveis de ambiente 🛠

```bash
  ### Crie um arquivo .env na raiz do projeto com:
  VITE_baseUrlApi="http://localhost:5000"
  VITE_baseUrlImg="http://localhost:5000/public/images/animes/"
```


