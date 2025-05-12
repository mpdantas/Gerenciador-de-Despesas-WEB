# 💸 Gerenciador de Despesas

Este projeto é um sistema simples de controle de despesas pessoais e empresariais acessado via navegador. O usuário faz login, escolhe a categoria de despesa, insere os detalhes e valores correspondentes, e pode visualizar ou excluir os registros adicionados.

---

## 🚀 Funcionalidades

- Login de usuário com redirecionamento para painel.
- Cadastro de despesas por categoria (Casa, Empresa ou Cartão de Crédito).
- Subcategorias específicas por tipo de despesa.
- Validação de formulário para evitar envio incompleto.
- Exclusão de despesas (para categorias Casa e Empresa).
- Botão "Sair" fixo no canto inferior direito da tela.

---

## 🛠️ Tecnologias Utilizadas

### 🔧 Frontend

- **HTML5** – Estrutura das páginas.
- **CSS3** – Estilização da interface.
- **JavaScript (puro/vanilla)** – Manipulação da DOM, lógica do sistema e interações.

### 📁 Organização de Arquivos

/
├── index.html → Página de login
├── painel.html → Painel principal do sistema
├── js/
│ └── painel.js → Lógica JS principal do painel
├── css/
│ └── style.css → Estilos customizados
└── README.md → Documentação do projeto

---

## 🧠 Como funciona

1. **Login:** O usuário acessa a página `index.html` e faz login.
2. **Escolha de Categoria:** No painel (`painel.html`), seleciona-se uma categoria de despesa.
3. **Detalhamento:** Um menu de despesas específicas aparece conforme a categoria escolhida.
4. **Adição de Despesa:** O usuário preenche o valor, seleciona a despesa e clica em **"Adicionar"**.
5. **Listagem:** As despesas são listadas na interface.
6. **Exclusão:** É possível remover despesas das categorias "Casa" ou "Empresa".
7. **Sair:** O botão "Sair" redireciona para a tela de login.

---

## 🧪 Como testar localmente

1. Clone o repositório:

   git clone <https://github.com/seuusuario/gerenciador-despesas.git>
   cd gerenciador-despesas

2. Abra o arquivo index.html em seu navegador.

3. Faça login e comece a usar o painel.

✍️ Autor
Desenvolvido por Miguel Dantas
🔗 <https://github.com/mpdantas>
