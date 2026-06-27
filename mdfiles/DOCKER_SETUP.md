# Docker Setup Guide

This guide explains how to containerize and run the Medical Assistant application using Docker.

## Prerequisites

- Docker Engine 20.10+ installed
- Docker Compose 2.0+ installed
- At least 2GB of free disk space

## Quick Start

### Production Mode

1. **Create environment file** (optional - can use environment variables):
   ```bash
   cp backend/env.example backend/.env
   # Edit backend/.env with your API keys
   ```

2. **Set environment variables** (or use .env file):
   ```bash
   export SECRET_KEY="your-super-secret-key-min-32-chars"
   export GROQ_API_KEY="your-groq-api-key"
   export TAVILY_API_KEY="your-tavily-api-key"
   export GOOGLE_API_KEY="your-google-api-key"
   ```

3. **Build and start services**:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the application**:
   - Frontend: http://localhost
   - Backend API: http://localhost:8009
   - API Docs: http://localhost:8009/docs

5. **View logs**:
   ```bash
   docker-compose logs -f
   ```

6. **Stop services**:
   ```bash
   docker-compose down
   ```

### Development Mode

For development with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

- Frontend: http://localhost:5173 (with hot reload)
- Backend: http://localhost:8009 (with auto-reload)

## Configuration

### Environment Variables

Create a `.env` file in the project root or set environment variables:

```env
SECRET_KEY=your-super-secret-key-min-32-chars-required
GROQ_API_KEY=your-groq-api-key-here
TAVILY_API_KEY=your-tavily-api-key-here
GOOGLE_API_KEY=your-google-api-key-here
```

### Volume Mounts

The following directories are persisted as volumes:
- `./backend/uploads` - Uploaded documents and images
- `./backend/chroma_db` - Vector database
- `./backend/medical_assistant.db` - SQLite database

## Docker Commands

### Build images
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Start services
```bash
# Start in detached mode
docker-compose up -d

# Start with logs
docker-compose up

# Start specific service
docker-compose up backend
```

### Stop services
```bash
# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Execute commands
```bash
# Run command in backend container
docker-compose exec backend python make_admin.py

# Access shell
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Health Checks

Both services include health checks:
- Backend: `http://localhost:8009/health`
- Frontend: `http://localhost/`

Check health status:
```bash
docker-compose ps
```

## Troubleshooting

### Port Already in Use

If ports 80 or 8009 are already in use:

1. Edit `docker-compose.yml`:
   ```yaml
   ports:
     - "8080:80"  # Change frontend port
     - "8009:8009"  # Change backend port if needed
   ```

2. Update frontend API URL in `frontend/src/services/api.js` if backend port changes

### Permission Issues

If you encounter permission issues with volumes:

```bash
# Fix ownership (Linux/Mac)
sudo chown -R $USER:$USER backend/uploads backend/chroma_db

# Or run with user mapping in docker-compose.yml
```

### Database Issues

If database doesn't initialize:

```bash
# Remove and recreate
docker-compose down -v
docker-compose up -d
```

### Build Failures

Clear Docker cache and rebuild:

```bash
docker-compose build --no-cache
docker-compose up -d
```

### View Container Logs

```bash
# All logs
docker-compose logs

# Last 100 lines
docker-compose logs --tail=100

# Follow logs
docker-compose logs -f backend
```

## Production Deployment

### Security Checklist

1. ✅ Change `SECRET_KEY` to a strong random value
2. ✅ Set all API keys in environment variables
3. ✅ Use secrets management (Docker secrets, AWS Secrets Manager, etc.)
4. ✅ Enable HTTPS with reverse proxy (nginx/traefik)
5. ✅ Set proper CORS origins in backend
6. ✅ Use production database (PostgreSQL) instead of SQLite
7. ✅ Set resource limits in docker-compose.yml
8. ✅ Enable logging and monitoring

### Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Using PostgreSQL

For production, replace SQLite with PostgreSQL:

1. Add PostgreSQL service to `docker-compose.yml`
2. Update `DATABASE_URL` environment variable
3. Update backend requirements if needed

## Architecture

```
┌─────────────────┐
│   Frontend      │  (Nginx serving React build)
│   Port: 80      │
└────────┬────────┘
         │
         │ /api/* → proxy
         │
┌────────▼────────┐
│   Backend       │  (FastAPI + Python)
│   Port: 8009    │
└─────────────────┘
```

## File Structure

```
.
├── docker-compose.yml          # Production compose file
├── docker-compose.dev.yml      # Development compose file
├── backend/
│   ├── Dockerfile              # Production backend image
│   ├── Dockerfile.dev          # Development backend image
│   ├── .dockerignore
│   └── requirements.txt
└── frontend/
    ├── Dockerfile              # Production frontend image
    ├── Dockerfile.dev          # Development frontend image
    ├── nginx.conf              # Nginx configuration
    └── .dockerignore
```

## Support

For issues or questions:
1. Check container logs: `docker-compose logs`
2. Verify environment variables are set
3. Ensure ports are not in use
4. Check Docker daemon is running
