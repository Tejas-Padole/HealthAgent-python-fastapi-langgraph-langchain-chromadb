# Start Frontend - Quick Guide

## 🐳 With Docker (Recommended)

```bash
# Start both frontend and backend
docker-compose up -d

# Access: http://localhost
```

## 💻 Without Docker

```bash
cd frontend
npm install  # First time only
npm run dev

# Access: http://localhost:5173
```

## 🔧 Development Mode (Hot Reload)

```bash
# With Docker
docker-compose -f docker-compose.dev.yml up

# Without Docker
cd frontend
npm run dev
```

**That's it!**
