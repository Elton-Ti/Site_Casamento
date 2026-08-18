# 💍 Lista de Presentes de Casamento | Elton & [Nome da Noiva]

Um site moderno, elegante, romântico e totalmente responsivo para lista de presentes de casamento. Desenvolvido em **React**, **Vite** e **Tailwind CSS**, permitindo que os convidados visualizem itens, realizem filtros e marquem presentes como reservados de forma simples e rápida, além de contar com um painel administrativo completo para os noivos.

---

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces modernas
- **Vite 6** - Bundler ultrarrápido para desenvolvimento e build otimizado
- **Tailwind CSS 3** - Framework de estilos utilitários com paleta e tipografia personalizadas
- **React Router DOM 6** - Roteamento dinâmico no lado do cliente (SPA)
- **Lucide React** - Conjunto de ícones elegantes e minimalistas
- **Canvas Confetti** - Efeito comemorativo ao reservar um presente
- **LocalStorage & Service Layer** - Persistência no navegador com camada desacoplada pronta para **Supabase** ou **Firebase**

---

## 📦 Como Instalar

Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado em sua máquina.

1. Abra o terminal na pasta raiz do projeto:
```bash
cd dashboard
```

2. Instale as dependências:
```bash
npm install
```

---

## 💻 Como Executar

Para iniciar o servidor de desenvolvimento local:

```bash
npm run dev
```

O terminal exibirá o link local (geralmente `http://localhost:3000` ou `http://localhost:5173`). Abra esse endereço no seu navegador.

---

## ⚙️ Configurações do Casamento

Todas as informações essenciais do casamento estão centralizadas em um único arquivo: **`src/config.js`**.

### 1. Como Alterar o Nome dos Noivos
Abra o arquivo `src/config.js` e edite as propriedades `groomName` e `brideName`:
```javascript
export const weddingConfig = {
  groomName: "Elton",
  brideName: "Mariana", // Substitua pelo nome da noiva
  // ...
};
```

### 2. Como Alterar a Data do Casamento
No mesmo arquivo `src/config.js`, edite o campo `weddingDate` no formato ISO (`YYYY-MM-DDTHH:mm:ss`):
```javascript
export const weddingConfig = {
  weddingDate: "2026-11-28T17:00:00", // Altere para a data e hora do casamento
  // ...
};
```
*O contador regressivo calculará automaticamente os dias, horas, minutos e segundos restantes.*

### 3. Como Alterar a Chave PIX
No arquivo `src/config.js`, personalize a chave e os dados do favorecido:
```javascript
export const weddingConfig = {
  pixKey: "seu-email-ou-cpf-ou-chave-aleatoria@pix.com.br",
  pixKeyType: "Chave Aleatória / E-mail",
  pixBeneficiaryName: "Elton & Mariana",
  // ...
};
```

---

## 🎁 Como Adicionar ou Gerenciar Presentes

Você pode gerenciar os presentes de duas formas:

### Opção 1: Diretamente pelo Painel Administrativo (/admin)
1. Acesse `http://localhost:3000/admin` no navegador.
2. Digite a senha administrativa (padrão: `123456`).
3. Clique no botão **"+ Novo Presente"**.
4. Preencha o nome, categoria, preço, descrição e URL da imagem.
5. Salve as alterações instantaneamente.

### Opção 2: Editando os Dados Iniciais no Código
Abra o arquivo `src/data/gifts.js` para modificar a lista de presentes padrão:
```javascript
{
  id: 1,
  name: "Jogo de Panelas Antiaderente",
  description: "Para deixar nossa cozinha ainda mais completa.",
  category: "Cozinha",
  price: 349.90,
  image: "https://images.unsplash.com/...",
  available: true,
  reservedBy: null,
  guestEmail: null,
  guestPhone: null
}
```

---

## 🛡️ Como Acessar o Painel Administrativo

1. Acesse a rota **`/admin`** ou clique no ícone de escudo no canto superior direito do menu.
2. Digite a senha configurada em `src/config.js`:
   - Senha padrão: `123456`
3. No painel você poderá:
   - Visualizar estatísticas de presentes e valores arrecadados;
   - Criar, editar e excluir presentes;
   - Ver os dados do convidado que reservou cada presente (nome, telefone/e-mail, data e mensagem de carinho);
   - Liberar um presente reservado para ficar disponível novamente;
   - Restaurar a lista para os itens padrão de fábrica.

---

## 🔒 Nota Importante sobre Segurança

> [!IMPORTANT]
> **Esta versão utiliza armazenamento local (LocalStorage) e autenticação simples apenas para protótipo.**
> Para uso em produção real aberto a centenas de convidados na internet, recomenda-se conectar o arquivo `src/services/giftService.js` a um banco de dados real com autenticação (como **Supabase**, **Firebase Firestore** ou uma **API REST com backend seguro**). A arquitetura do serviço já está 100% pronta e modularizada para essa transição.

---

## 🏗️ Como Fazer Build

Para gerar a versão de produção otimizada para publicação:

```bash
npm run build
```

Os arquivos estáticos compilados serão gerados na pasta `dist/`.

Para testar o build localmente antes de publicar:
```bash
npm run preview
```

---

## ☁️ Como Publicar na Vercel

O projeto já inclui o arquivo **`vercel.json`** configurado para lidar com rotas de Single Page Application (SPA) sem erros 404.

### Passo a passo para Deploy na Vercel:

1. Crie um repositório no seu GitHub (ex: `lista-presentes-casamento`) e envie os arquivos do projeto:
```bash
git add .
git commit -m "feat: site de lista de presentes de casamento"
git push origin main
```

2. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub.
3. Clique em **"Add New..."** -> **"Project"**.
4. Selecione o repositório do casamento.
5. Em **Framework Preset**, a Vercel detectará automaticamente **Vite**.
6. Clique no botão **"Deploy"**.
7. Em menos de 1 minuto seu site estará online com HTTPS gratuito!

---

## 📄 Licença

Projeto desenvolvido para celebração de casamento. Feito com ❤️ para o grande dia!
