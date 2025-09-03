# 🎮 Trilha Bíblica Gamificada - API

API REST para plataforma de aprendizado bíblico gamificado com NestJS + Prisma + Supabase.

## 🚀 Setup Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Setup banco
npx prisma generate
npx prisma migrate deploy

# 4. Executar
npm run start:dev
```

## 🏗️ Arquitetura

Clean Architecture com módulos por funcionalidade:
- **modules/**: users, journeys, missions, user-progress, ai
- **shared/**: database, errors, validation, services

## 🎯 Endpoints da API

### 👤 Usuários
- `POST /api/users` - Criar usuário

### 🗺️ Jornadas
- `POST /api/journeys` - Criar jornada
- `GET /api/journeys` - Listar jornadas
- `GET /api/journeys/{id}` - Buscar jornada

### 🎯 Missões
- `POST /api/missions` - Criar missão
- `GET /api/missions/journey/{journeyId}` - Listar missões da jornada
- `GET /api/missions/{id}` - Buscar missão

### 🎮 Progresso
- `POST /api/user-progress/journeys/start` - Iniciar jornada
- `POST /api/user-progress/missions/complete` - Completar missão
- `GET /api/user-progress/stats/{userId}` - Ver estatísticas

### 🤖 AI
- `POST /api/ai/ask` - Consultar Apologist AI

## 🧪 Fluxo de Teste

Use o arquivo `client.http` (VS Code + REST Client):

1. **Criar usuário** → Senha hasheada automaticamente
2. **Criar jornada** → Slug gerado do título
3. **Criar missões** → 5 tipos: READING, QUICK_TASK, CHAT_TUTOR, QUIZ, REWARD
4. **Iniciar jornada** → Primeira missão desbloqueada
5. **Completar missões** → Ganha XP, progride sequencialmente
6. **Ver estatísticas** → XP total, streak, progresso
7. **Consultar AI** → Perguntas teológicas

## 🚀 Deploy AWS ECS

Infraestrutura automatizada com Terraform:

```bash
# Deploy completo
cd infra/
terraform init
terraform apply
```

### Arquitetura:
- **ECS Fargate** (256 CPU, 512MB RAM)
- **Acesso direto** (sem Load Balancer)
- **ECR** para Docker images
- **VPC simplificada** (sem NAT Gateway)

### Custo estimado: ~$15/mês

**Nota**: Load Balancer removido temporariamente (não disponível na conta). Acesso direto via IP público do container.

---

**Pronto para o hackathon! 🎉**
