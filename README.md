### Diagramas

1. Classe

```mermaid
classDiagram
    class Usuario {
        +int id
        +String nome
        +String email
        +cadastrarTarefa()
    }

    class Tarefa {
        +int id
        +int idUsuario
        +String descricao
        +String setor
        +String prioridade
        +Date dataCadastro
        +String status
        +atualizarStatus()
        +editarTarefa()
        +excluirTarefa()
    }

    Usuario "1" --> "0..*" Tarefa : cadastra

```

  2. Uso
```mermaid
  usecaseDiagram
    actor Usuario as "Usuário"
    actor Admin as "Admin (Opcional)"

    Usuario --> (Cadastrar Tarefa)
    Usuario --> (Atualizar Status da Tarefa)
    Usuario --> (Editar Tarefa)
    Usuario --> (Excluir Tarefa)
    Admin --> (Gerenciar Usuários)

    (Cadastrar Tarefa) --> (Visualizar Tarefa)
    (Atualizar Status da Tarefa) --> (Visualizar Tarefa)
    (Editar Tarefa) --> (Visualizar Tarefa)
    (Excluir Tarefa) --> (Visualizar Tarefa)



```

  3. Fluxo
```mermaid
   flowchart TD
    A[Início] --> B[Cadastro de Usuário]
    B --> C[Cadastro de Tarefa]
    C --> D{Status da Tarefa}

    D --> |A Fazer| E[Coluna A Fazer]
    D --> |Fazendo| F[Coluna Fazendo]
    D --> |Pronto| G[Coluna Pronto]

    E --> H[Atualizar Status para Fazendo]
    F --> I[Atualizar Status para Pronto]
    G --> J[Concluir Tarefa]

    H --> F
    I --> G
    J --> K[Fim]

    E --> L[Editar Tarefa]
    F --> L
    G --> L

    L --> C


```