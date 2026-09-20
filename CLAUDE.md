# Development Guidelines for Financial Life Platform

## Project Vision
AI-Powered Financial Life Platform - A centralized platform helping users organize insurance, claims, credit, and tax information with AI-powered insights and predictive alerts.

**12 Core Features:**
1. Financial clarity under chaos (core insight)
2. Temporal dimension (timelines and trends)
3. Specific AI assistant (proactive, actionable)
4. Health score layer (unified wellness metric)
5. Prevention focus (early problem detection)
6. Intelligent integrations (banking, credit, insurance)
7. Predictive alerts & scenarios (what-if analysis)
8. Family & advisor collaboration (multi-user)
9. Document intelligence (OCR, extraction, categorization)
10. Personalized health scoring (comprehensive metric)
11. Explainable AI (why, what, impact, next steps)
12. Regulatory & compliance guardrails

## Tech Stack
- **Frontend:** Next.js 14 + TypeScript + TailwindCSS
- **Backend:** NestJS + Node.js
- **AI Service:** FastAPI + Python 3.11
- **Database:** PostgreSQL
- **Cache:** Redis
- **External APIs:** Claude API, Plaid, AWS Textract

## Git Workflow
- **Branch naming:** `feature/feature-name`, `fix/bug-name`, `docs/description`
- **Commit messages:** Conventional commits (feat:, fix:, docs:, etc.)
- **PR process:** Create PR, request review, merge to main
- **Deployment:** Auto-deploy from main (when CI/CD setup)

## Code Standards

### Backend (NestJS)
- Use dependency injection for testability
- Create modules for feature separation
- Use DTOs for data validation
- Add Swagger documentation to endpoints
- Write unit tests for services
- Environment variables for configuration

### Frontend (Next.js)
- Use TypeScript strictly
- Component-based architecture
- TailwindCSS for styling (no inline styles)
- React Query for server state
- Zustand for client state
- Test critical flows with Jest

### AI Service (FastAPI)
- Type hints on all functions
- Docstrings for public functions
- Pydantic models for validation
- Async/await for I/O operations
- Error handling with proper HTTP status codes

## Feature Development Order
### Phase 1 (Weeks 1-4): Core Platform
- [ ] User authentication & profiles
- [ ] Family member management
- [ ] Document upload & storage
- [ ] Basic health score calculation
- [ ] Notifications infrastructure

### Phase 2 (Weeks 5-8): AI & Integrations
- [ ] Claude API integration for explanations
- [ ] Document OCR & extraction
- [ ] Health score refinement
- [ ] Plaid banking integration
- [ ] Basic predictive alerts

### Phase 3 (Weeks 9+): Advanced Features
- [ ] Credit score integrations
- [ ] Insurance data sync
- [ ] Scenario planning
- [ ] Compliance rule engine
- [ ] CPA/advisor features

## Important Notes
- **Security:** Encrypt sensitive data, validate all inputs, use HTTPS
- **Performance:** Optimize database queries, cache frequently accessed data
- **Testing:** Unit tests for services, E2E tests for critical flows
- **Documentation:** Keep README and API docs updated
- **Error Handling:** Log errors properly, return meaningful messages

## Database Conventions
- Use snake_case for table/column names
- Timestamps: `created_at`, `updated_at` on all tables
- Foreign keys: `{table}_id` format
- Boolean fields: `is_` prefix (e.g., `is_active`)

## When to Ask for Help
- Architecture decisions affecting multiple services
- Security-related changes
- Breaking API changes
- Database schema migrations for production

## Useful Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Run database migrations
docker-compose exec backend npm run migrate

# Test
cd backend && npm test
cd frontend && npm test
cd ai-service && pytest

# Code formatting
cd backend && npm run format
cd ai-service && black .
```

## Repository
- **GitHub:** https://github.com/anindita-vani28/AI-Powered-Financial-Life-platform
- **Main Branch:** Protected, requires PR review
- **CI/CD:** [To be configured]

---

**Last Updated:** 2026-09-20
