# 🚀 Financial Life Platform - Setup Guide

## Prerequisites

- Docker & Docker Compose (recommended for full stack)
- Node.js 20+ (for local backend development)
- Python 3.11+ (for local AI service development)
- Git

## Option 1: Docker Compose (Easiest - Recommended)

### Step 1: Clone and Setup Environment

```bash
git clone https://github.com/anindita-vani28/AI-Powered-Financial-Life-platform.git
cd AI-Powered-Financial-Life-platform
cp .env.example .env
```

### Step 2: Update Environment Variables

Edit `.env` and add your API keys:

```bash
# Required for AI features
CLAUDE_API_KEY=your_claude_api_key_here

# Optional: For banking integrations
PLAID_CLIENT_ID=your_plaid_id
PLAID_SECRET=your_plaid_secret

# Optional: For document processing
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

### Step 3: Start All Services

```bash
docker-compose up -d
```

### Step 4: Access Services

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Web application |
| Backend | http://localhost:3001 | API server |
| API Docs | http://localhost:3001/api/docs | Swagger documentation |
| AI Service | http://localhost:8000 | AI microservice |
| AI Docs | http://localhost:8000/docs | FastAPI documentation |

### Step 5: Verify Everything Works

```bash
# Check all services are healthy
curl http://localhost:3001/health
curl http://localhost:8000/health
```

---

## Option 2: Local Development Setup

### Backend Setup (NestJS)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp ../.env.example .env.local

# Start development server
npm run start:dev
```

Backend runs on: **http://localhost:3001**

### Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:3000**

### AI Service Setup (FastAPI)

```bash
cd ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn main:app --reload
```

AI Service runs on: **http://localhost:8000**

---

## Database Setup

### With Docker Compose
Database is automatically initialized. Connect with:
- **Host:** localhost
- **Port:** 5432
- **User:** financiallife
- **Password:** devpassword
- **Database:** financial_life_dev

### Local PostgreSQL

If running locally without Docker:

```bash
# Install PostgreSQL
brew install postgresql@15  # macOS
# Or apt-get install postgresql (Linux)

# Create database
createdb financial_life_dev

# Update .env with your local connection
DATABASE_URL=postgres://your_user:your_password@localhost:5432/financial_life_dev
```

---

## Useful Commands

### Backend (NestJS)
```bash
npm run start:dev      # Development with hot reload
npm run build          # Production build
npm run test           # Run tests
npm run lint           # ESLint
```

### Frontend (Next.js)
```bash
npm run dev            # Development server
npm run build          # Production build
npm run test           # Jest tests
npm run lint           # ESLint
```

### AI Service (FastAPI)
```bash
uvicorn main:app --reload    # Development server
pytest                       # Run tests
black .                      # Format code
flake8 .                     # Lint
```

### Docker Compose
```bash
docker-compose up -d         # Start all services
docker-compose down          # Stop all services
docker-compose logs -f       # View logs
docker-compose ps            # Check service status
docker-compose exec backend npm run start:dev  # Run commands in container
```

---

## Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### Database Connection Error
```bash
# Verify PostgreSQL is running
docker-compose exec postgres psql -U financiallife -d financial_life_dev

# Check connection string in .env
DATABASE_URL=postgres://financiallife:devpassword@postgres:5432/financial_life_dev
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For Python
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Docker Issues
```bash
# Rebuild images
docker-compose build --no-cache

# Clean up Docker
docker system prune -a
```

---

## Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create pull request on GitHub**

---

## Project Structure

```
.
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── pages/           # Page routes
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API service calls
│   │   └── styles/          # CSS/TailwindCSS
│   ├── public/              # Static files
│   └── package.json
│
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── main.ts          # Entry point
│   │   ├── app.module.ts    # Main module
│   │   ├── auth/            # Authentication
│   │   ├── users/           # User management
│   │   ├── documents/       # Document handling
│   │   ├── health-score/    # Health score logic
│   │   └── common/          # Guards, pipes, filters
│   ├── dist/                # Compiled output
│   └── package.json
│
├── ai-service/              # FastAPI microservice
│   ├── main.py             # Entry point
│   ├── requirements.txt     # Python dependencies
│   └── [services]/         # AI modules (TBA)
│
├── docker-compose.yml      # Docker orchestration
├── .env.example            # Environment template
├── README.md               # Project overview
└── SETUP.md               # This file
```

---

## Next Steps

1. ✅ Clone repository
2. ✅ Set up local environment
3. ⬜ Create first feature branch
4. ⬜ Build core features (12-point plan)
5. ⬜ Implement integrations (Plaid, credit bureaus)
6. ⬜ Deploy to production

---

## Support & Resources

- **Documentation:** See README.md
- **API Reference:** http://localhost:3001/api/docs
- **GitHub Issues:** https://github.com/anindita-vani28/AI-Powered-Financial-Life-platform/issues
- **Tech Stack Reference:** See SETUP.md
