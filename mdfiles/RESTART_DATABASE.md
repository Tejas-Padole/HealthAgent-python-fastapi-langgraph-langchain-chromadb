# Restart Database - Quick Guide

## 🐳 With Docker (Recommended)

```bash
# Stop and remove containers (keeps data)
docker-compose down

# Start again
docker-compose up -d
```

## 🔄 Reset Database (Delete All Data)

```bash
# Stop containers
docker-compose down

# Delete database file
rm backend/medical_assistant.db
# Windows: del backend\medical_assistant.db

# Start again (auto-creates new database)
docker-compose up -d
```

## 💻 Without Docker

```bash
# Delete database
rm backend/medical_assistant.db
# Windows: del backend\medical_assistant.db

# Restart backend
python backend/run.py
```

**That's it!** Database will auto-create on next startup.
