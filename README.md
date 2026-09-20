# AI-Powered Financial Life Platform

A centralized platform that helps users organize insurance, claims, credit, and tax information, understand how their financial life has changed over time, and identify important items that need their attention.

## 🎯 Vision

**Financial Clarity Under Chaos**

Users face overwhelming financial complexity: scattered documents, multiple accounts, hidden risks, missed opportunities. Our platform brings everything together with AI-powered insights, predictive alerts, and intelligent automation.

## 🏗️ Architecture

```
Frontend (Next.js)
    ↓
NestJS API (Node.js) ←→ FastAPI AI Service (Python)
    ↓
PostgreSQL + Redis
```

### Services

- **Frontend** (`/frontend`) - Next.js 14+ with TypeScript, TailwindCSS, Recharts
- **Backend API** (`/backend`) - NestJS for user management, integrations, webhooks
- **AI Service** (`/ai-service`) - FastAPI for document processing, LLM, predictions
- **Database** - PostgreSQL for data persistence
- **Cache** - Redis for sessions, real-time data, notifications

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- Node.js 20+ (for local development)
- Python 3.10+ (for AI service local development)

### Setup with Docker Compose (Easiest)

1. Clone environment variables:
```bash
cp .env.example .env
```

2. Update `.env` with your API keys:
```
CLAUDE_API_KEY=sk-...
PLAID_CLIENT_ID=...
AWS_ACCESS_KEY_ID=...
```

3. Start all services:
```bash
docker-compose up -d
```

4. Initialize database:
```bash
# Run migrations (when ready)
docker-compose exec backend npm run migrate
```

5. Open browser:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- AI Service: http://localhost:8000

### Local Development Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

#### Backend
```bash
cd backend
npm install
npm run start:dev  # http://localhost:3001
```

#### AI Service
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload  # http://localhost:8000
```

## 📁 Project Structure

```
.
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/          # Pages and layouts
│   │   ├── components/   # React components
│   │   ├── services/     # API calls
│   │   └── utils/        # Helpers
│   ├── package.json
│   └── tsconfig.json
│
├── backend/               # NestJS API
│   ├── src/
│   │   ├── auth/         # Authentication
│   │   ├── users/        # User management
│   │   ├── documents/    # Document handling
│   │   ├── integrations/ # External APIs (Plaid, credit, etc)
│   │   ├── health-score/ # Financial health scoring
│   │   └── common/       # Guards, pipes, interceptors
│   ├── package.json
│   └── nest-cli.json
│
├── ai-service/            # FastAPI microservice
│   ├── app/
│   │   ├── core/         # Config, security
│   │   ├── models/       # Data models
│   │   ├── services/     # Business logic
│   │   │   ├── document_processing/
│   │   │   ├── ai_insights/
│   │   │   └── predictions/
│   │   ├── routers/      # API routes
│   │   └── main.py       # Entry point
│   ├── requirements.txt
│   └── docker/
│
├── docker-compose.yml     # Local dev environment
├── .env.example          # Environment variables template
└── README.md
```

## 📚 Core Features (12-Point Foundation)

### Phase 1: MVP
1. ✅ User Authentication & Profile
2. ✅ Document Upload & Storage
3. ✅ Financial Health Score (basic)
4. ✅ Family Member Management
5. ✅ AI Explanations (Claude integration)
6. ✅ Basic Alerts & Notifications

### Phase 2: Integrations
7. Banking Data (Plaid)
8. Credit Score Data (Experian)
9. Insurance Data Sync
10. Tax Software Integration

### Phase 3: Advanced AI
11. Predictive Alerts & Scenario Planning
12. Compliance & Regulatory Rules

## 🔐 Security

- JWT-based authentication
- Encrypted sensitive data (API keys, credentials)
- HTTPS only (in production)
- Database encryption at rest
- Environment-based secrets management
- OWASP compliance

## 📊 Database Schema (Core)

```sql
-- Users & Families
users (id, email, password_hash, role, created_at)
families (id, name, owner_id)
family_members (id, family_id, user_id, role)

-- Financial Data
financial_items (id, user_id, type, category, data_json)
insurance_policies (id, user_id, provider, policy_number, renewal_date)
claims (id, user_id, claim_number, status, amount)
credit_info (id, user_id, score, updated_at)
tax_returns (id, user_id, year, status)

-- Documents
documents (id, user_id, file_url, extracted_text, type, category)

-- Health & Scores
financial_health_scores (id, user_id, overall_score, breakdown_json)

-- Alerts & Notifications
alerts (id, user_id, type, message, read_at)

-- Integrations
integration_accounts (id, user_id, service, token_encrypted)
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# AI Service tests
cd ai-service
pytest
```

## 📝 API Documentation

Once services are running:
- Backend Swagger: http://localhost:3001/api/docs
- AI Service Docs: http://localhost:8000/docs

## 🚢 Deployment

### Docker
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Cloud Deployment
- Frontend: Vercel, Netlify
- Backend: AWS ECS, DigitalOcean, Railway
- AI Service: AWS Lambda, Google Cloud Run
- Database: AWS RDS, Heroku Postgres

## 🔧 Development Commands

```bash
# Backend
npm run start:dev      # Dev server with watch
npm run build         # Production build
npm run test          # Run tests
npm run lint          # ESLint

# Frontend
npm run dev           # Dev server
npm run build         # Production build
npm run test          # Jest tests

# AI Service
uvicorn main:app --reload     # Dev server
pytest                        # Run tests
black .                      # Format code
flake8 .                     # Lint
```

## 📞 Support & Contributing

- Create issues for bugs and feature requests
- Follow the contribution guidelines in CONTRIBUTING.md
- Check existing docs in `/docs` folder

## 📄 License

MIT License - See LICENSE file

---

**Built with:** Next.js, NestJS, FastAPI, PostgreSQL, Redis, Claude API
