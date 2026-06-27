# Docker Quick Start Guide

## 🚀 Quick Start (Production)

```bash
# 1. Set environment variables (or create .env file)
export SECRET_KEY="your-secret-key-min-32-chars"
export GROQ_API_KEY="your-groq-key"
export TAVILY_API_KEY="your-tavily-key"

# 2. Start services
docker-compose up -d --build

# 3. Access application
# Frontend: http://localhost
# Backend: http://localhost:8009
# API Docs: http://localhost:8009/docs
```

## 🔧 Development Mode

```bash
# Start with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Frontend: http://localhost:5173
# Backend: http://localhost:8009
```

## 📋 Common Commands

```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Check status
docker-compose ps

# Execute commands in container
docker-compose exec backend bash
docker-compose exec frontend sh
```

## 🔍 Troubleshooting

**Port already in use?**
- Change ports in `docker-compose.yml`

**Services not starting?**
- Check logs: `docker-compose logs`
- Verify environment variables are set
- Ensure Docker has enough resources

**Database issues?**
- Remove volumes: `docker-compose down -v`
- Restart: `docker-compose up -d`

For detailed information, see [DOCKER_SETUP.md](./DOCKER_SETUP.md)
