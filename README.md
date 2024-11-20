# Gerenciador de Pedidos para Restaurante

Este projeto é uma aplicação web para gerenciamento de pedidos em um restaurante, com funcionalidades distintas para **administradores** e **usuários**. A aplicação permite realizar operações no carrinho, gerenciar produtos e pedidos, e conta com recursos completos de autenticação.

## Funcionalidades

### **Usuários**
- **Cadastro e Login:**
  - Registro de novos usuários com validação.
  - Login seguro utilizando autenticação JWT.
  - Recuperação de senha via e-mail.

- **Carrinho de Compras:**
  - Adicionar itens ao carrinho.
  - Modificar a quantidade de itens no carrinho.
  - Total do pedido calculado automaticamente.
  - Limpar o carrinho ou confirmar o pedido.

- **Navegação e Pesquisa:**
  - Filtro de categorias para produtos.
  - Botão "Saiba Mais" para visualizar informações detalhadas sobre os produtos.

- **Pedidos:**
  - Visualizar os pedidos confirmados.

---

### **Administradores**
- **Gerenciamento de Produtos:**
  - Adicionar novos produtos.
  - Editar produtos existentes.
  - Excluir produtos.

- **Gerenciamento de Usuários:**
  - Visualizar, adicionar, editar ou excluir usuários no sistema.

- **Pedidos:**
  - Visualizar todos os pedidos realizados por todos os usuários.
  - Alterar o status dos pedidos (exemplo: de "Pendente" para "Em preparo" e em seguida "Concluído").

---

## Tecnologias Utilizadas

### **Frontend**
- **React** com **TypeScript**.
- **Vite** para configuração do projeto.
- **Tailwind CSS** e **Shadcn** para estilização.
- **Axios** para chamadas de API.
- **Formik** e **Yup** para validações de formulários.
- **Toastify** para feedback visual ao usuário.

### **Backend**
- **Node.js** com **Express** e **Typescript**.
- **SQLite3** como banco de dados.
- **Prisma** para gerenciamento do banco de dados.
- **Nodemailer** para envio de e-mails no sistema de recuperação de senha.

---

## Instalação e Configuração

### Pré-requisitos
- **Node.js**
- **npm**
- Banco de dados **SQLite3**.

---
- **Clone este repositório:**
   ```bash
     git clone https://github.com/CauanLagrotta/restaurant-falae.git
   ```


### Passos
**No VScode:**

### Backend
1. Entre na pasta backend:
    ```bash
      cd backend
    ```

**Configure o backend**
1. Crie um arquivo **.env** na raíz do backend
2. Para fazer a recuperação de senha por e-mail funcionar, entre no site da <a target="_blank" href="https://www.brevo.com/landing/products/?utm_source=adwords_brand&utm_medium=lastclick&utm_content=SendinBlue&utm_extension=&utm_term=brevo%20com&utm_matchtype=e&utm_campaign=20035168739&utm_network=g&km_adid=660340698362&km_adposition=&km_device=c&utm_adgroupid=149273508900&gad_source=1&gclid=CjwKCAiArva5BhBiEiwA-oTnXTGpUAvo35rvgYJl-zop6DhvbXaq3i9MW5KoX-kcVlm23tauR5lDmxoCMAYQAvD_BwE">Brevo.com</a>
3. Crie uma conta, clique em <a target="_blank" href="https://app.brevo.com/settings/keys/smtp">SMTP & API</a> e pegue os dados de **SMTP server**, **Port**, **Login** e **SMTP key**.
4. Crie as variáveis dentro do arquivo **.env**:
   - **TOKEN** e crie um token (ex: restaurant-secret).
   - Crie: **BREVO_SMTP_HOST** e insira o **SMTP server**.
   - Crie: **BREVO_SMTP_PORT** e insira a **Port**.
   - Crie: **BREVO_SMTP_USER** e insira o **Login**.
   - Crie: **BREVO_SMTP_PASS** e insira o **SMTP key**.

5. Instale as dependências:
   ```bash
      npm install
   ```

6. Execute o backend:
    ```bash
      npm run dev
    ```

## Frontend    

1. Abra outro terminal e entre na pasta frontend:
   ```bash
     cd frontend
   ```

2. Instale as dependências do frontend:
    ```bash
      npm install
    ```

3. Execute o frontend:
   ```bash
      npm run dev
   ```
