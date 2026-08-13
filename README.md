# Pet Daycare Management API

API Rest para acompanhamento e controle da creche de pets, gestão de clientes e animais de estimação.

## 📋 Funcionalidades

- **Registro de Pets**: Registre novos pets com informações como nome, raça, idade e peso
- **Busca de Dados**: Consulte dados dos pets incluindo informações do tutor, horários de entrada/saída
- **Relatórios Diários**: Acompanhe relatórios diários com informações sobre:
  - Se o pet dormiu (sim/não)
  - Quantidade de ração comida (pouco/esfomeado)
  - Nível de energia (pouca bateria/bateria cheia)
  - Status de pagamento (realizado/pendente)
- **Gerenciamento de Check-in/Check-out**: Registre entrada e saída dos pets
- **Segurança com JWT**: Autenticação segura por tipo de usuário
- **Múltiplos Tipos de Acesso**: 
  - Trabalhador da creche (userWorker)
  - Tutores dos pets

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

```
src/
├── middleware/          # Camada de middleware (autenticação JWT)
├── routes/              # Camada de rotas (definição de endpoints)
├── controllers/         # Camada de controladores (lógica de requisição)
├── services/            # Camada de serviços (lógica de negócio)
├── models/              # Camada de modelos (banco de dados em memória)
├── config/              # Arquivos de configuração
├── app.js              # Configuração do Express
└── server.js           # Inicialização do servidor
```

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação. Existem dois tipos de usuários:

### Trabalhador da Creche
- **Username**: `userWorker`
 - **Senha**: `worker123`
- **Permissões**: Acesso completo a todos os recursos

### Tutores
- **Username**: `tutor_<nome_do_pet>`
- **Senha**: `123456`
- **Permissões**: Consultar informações dos seus pets

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd mentoria_2026
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie o servidor**:
```bash
# Modo de desenvolvimento (com hot-reload)
npm run dev

# Modo de produção
npm start

# Rodar o teste
npm test
```

O servidor iniciará em `http://localhost:3001`

## 📚 Documentação da API

A documentação completa da API está disponível em Swagger:

**URL**: `http://localhost:3001/api-docs`

### Endpoints Principais

#### Autenticação

- **POST** `/auth/login-worker` - Login como trabalhador
- **POST** `/auth/login-tutor` - Login como tutor

#### Pets

- **GET** `/pets` - Obter todos os pets (apenas trabalhadores)
- **GET** `/pets/{petId}` - Obter dados de um pet específico
- **POST** `/pets` - Registrar novo pet (apenas trabalhadores)
- **PUT** `/pets/{petId}` - Atualizar dados de um pet (apenas trabalhadores)
- **DELETE** `/pets/{petId}` - Deletar um pet (apenas trabalhadores)

#### Relatórios da Creche

- **GET** `/daycare/report/{petId}/{date}` - Obter relatório de um dia específico
- **GET** `/daycare/reports/{petId}` - Obter todos os relatórios de um pet
- **GET** `/daycare/day?date=YYYY-MM-DD` - Obter todos os relatórios do dia (apenas trabalhadores)
- **POST** `/daycare/report` - Criar novo relatório diário (apenas trabalhadores)
- **PUT** `/daycare/report/{petId}/{date}` - Atualizar relatório (apenas trabalhadores)
- **DELETE** `/daycare/report/{petId}/{date}` - Deletar relatório (apenas trabalhadores)
 

## 💾 Banco de Dados

A API utiliza um **banco de dados em memória** com os seguintes dados pré-carregados:

### Pets
- **Bisteca** (vira-lata, 12 anos, 22kg) - Tutor: Caroline
- **Fumaça** (salsichinha, 10 anos, 13kg) - Tutor: Rafael
- **Bob** (vira-lata, 9 anos, 10kg) - Tutor: Joana
- **Paçoca** (salsichinha, 8 anos, 8kg) - Tutor: Renata
- **Estopim** (vira-lata, 4 anos, 6kg) - Tutor: Mara

## 📝 Exemplos de Uso

### 1. Login como Trabalhador

```bash
curl -X POST http://localhost:3001/auth/login-worker \
  -H "Content-Type: application/json" \
  -d '{"username":"userWorker","password":"worker123"}'
```

**Resposta**:
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "worker"
}
```

### 2. Login como Tutor

```bash
curl -X POST http://localhost:3001/auth/login-tutor \
  -H "Content-Type: application/json" \
  -d '{"username":"tutor_bisteca","password":"123456"}'
```

### 3. Obter Todos os Pets

```bash
curl -X GET http://localhost:3001/pets \
  -H "Authorization: Bearer <token-do-trabalhador>"
```

Use `POST /daycare/report` (veja o exemplo a seguir) para registrar check-in e/ou check-out ao criar ou atualizar um relatório.

### 6. Criar Relatório Diário

```bash
curl -X POST http://localhost:3001/daycare/report \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token-do-trabalhador>" \
  -d '{
    "petId":1,
    "date":"2026-08-03",
    "checkin":"08:00",
    "checkout":"17:00",
    "dormiu":"sim",
    "consumoAlimentar":"esfomeado",
    "nivelEnergia":"bateria_cheia",
    "pagamentoRealizado":"sim"
  }'
```

## 🔒 Códigos de Status HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Criado - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token não fornecido ou inválido |
| 403 | Forbidden - Acesso negado (permissão insuficiente) |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Recurso já existe |
| 500 | Internal Server Error - Erro no servidor |

## 📦 Dependências

- **express**: Framework web para Node.js
- **jsonwebtoken**: Implementação de JWT para autenticação
- **swagger-ui-express**: Interface gráfica para documentação Swagger
- **dotenv**: Gerenciamento de variáveis de ambiente
- **js-yaml**: Parser de YAML (para Swagger)

## 🛠️ Scripts Disponíveis

```bash
# Iniciar em modo de desenvolvimento
npm run dev

# Iniciar em modo de produção
npm start
```

## 📂 Estrutura de Pastas

```
mentoria_2026/
├── src/
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticação JWT
│   ├── routes/
│   │   ├── auth.js              # Rotas de autenticação
│   │   ├── pets.js              # Rotas de pets
│   │   └── daycare.js           # Rotas de relatórios da creche
│   ├── controllers/
│   │   ├── authController.js    # Controlador de autenticação
│   │   ├── petsController.js    # Controlador de pets
│   │   └── daycareController.js # Controlador de creche
│   ├── services/
│   │   ├── authService.js       # Serviço de autenticação
│   │   ├── petsService.js       # Serviço de pets
│   │   └── daycareService.js    # Serviço de creche
│   ├── models/
│   │   └── db.js                # Banco de dados em memória
│   ├── app.js                   # Configuração do Express
│   └── server.js                # Inicialização do servidor
├── resources/
│   └── swagger.yaml             # Documentação Swagger
├── package.json                 # Configuração do projeto
└── README.md                    # Este arquivo
```

## 🔄 Fluxo de Autenticação

1. **Login**: Envie credenciais para `POST /auth/login-worker` ou `POST /auth/login-tutor`
2. **Receba Token**: A API retorna um token JWT válido por 24 horas
3. **Use Token**: Inclua o token no header `Authorization: Bearer <token>` em todas as requisições
4. **Sistema Valida**: O middleware valida o token antes de processar cada requisição

## ✅ Validações Implementadas

- Validação de credenciais de login
- Validação de tokens JWT
- Verificação de permissões por tipo de usuário (worker/tutor)
- Validação de dados de entrada
- Verificação de existência de recursos
- Prevenção de duplicação de relatórios

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Swagger em `/api-docs` ou revise os exemplos acima.

## 📄 Licença

Este projeto é fornecido como está, para fins educacionais.
