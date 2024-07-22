### **Rotas da Aplicação**

1. **POST /livros**:
    - Descrição: Esta rota permite que os usuários cadastrem novos livros na plataforma.
    - Funcionalidade: Cadastro de Livro
    - Método HTTP: POST
    - Corpo da Requisição: Deve conter título, ano de publicação, autor e editora.
2. **POST /autores**:
    - Descrição: Esta rota permite que os usuários cadastrem novos autores na plataforma.
    - Funcionalidade: Cadastro de Autor
    - Método HTTP: POST
    - Corpo da Requisição: Deve conter nome, data de nascimento e nacionalidade.
3. **POST /editoras**:
    - Descrição: Esta rota permite que os usuários cadastrem novas editoras na plataforma.
    - Funcionalidade: Cadastro de Editora
    - Método HTTP: POST
    - Corpo da Requisição: Deve conter nome, país e ano de fundação.
4. **GET /livros/{id_livro}**:
    - Descrição: Esta rota permite visualizar as informações de um livro específico.
    - Funcionalidade: Visualização de Livro
    - Método HTTP: GET
    - Parâmetros da URL: ID do livro.
    - Resposta: Título, ano de publicação, autor e editora do livro.
5. **PUT /editoras/{id_livro}**:
    - Descrição: Esta rota permite atualizar as informações de uma editora específica.
    - Funcionalidade: Atualização de editora
    - Método HTTP: PUT
    - Parâmetros da URL: ID do livro.
    - Corpo da Requisição: Pode conter título, ano de publicação, autor e/ou editora.
6. **DELETE /autores/{id_livro}**:
    - Descrição: Esta rota permite deletar um autor específico da plataforma.
    - Funcionalidade: Deletar Autor
    - Método HTTP: DELETE
    - Parâmetros da URL: ID do livro.
7. **GET /editoras**:
    - Descrição: Esta rota permite visualizar todas as editoras cadastradas na plataforma.
    - Funcionalidade: Listagem de Editoras
    - Método HTTP: GET
