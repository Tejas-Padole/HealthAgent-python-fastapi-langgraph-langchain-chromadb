# Troubleshooting Guide

## ❓ Docker Compose Version 3.8

**No, it's NOT Python version!** 

`version: '3.8'` in docker-compose.yml is the **Docker Compose file format version**, not Python version.

- **Docker Compose version**: Defines the syntax/features available (3.8 is a stable format)
- **Python version**: Defined in Dockerfile (`FROM python:3.12-slim`)

## 🐳 Virtual Environment vs Docker

### **Using Docker? → NO Virtual Environment Needed!**

Docker containers **ARE** isolated environments. You don't need:
- ❌ `python -m venv venv`
- ❌ `source venv/bin/activate`
- ❌ `pip install` on your laptop

**Docker handles everything inside containers!**

### **Running Locally (Without Docker)? → YES, Virtual Environment Needed!**

If you want to run code directly on your laptop:
```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt
```

**But why do this when Docker is easier?** 🤔

## 🐛 Common Errors Before Containerization

### Problem: Friend Getting Errors When Running Code

**Common Issues & Solutions:**

### 1. **Python Version Mismatch**
```
Error: Python 3.12 required but found 3.10
```
**Solution:**
- Install Python 3.12 from python.org
- Or use Docker (recommended) - handles version automatically

### 2. **Missing Dependencies**
```
Error: ModuleNotFoundError: No module named 'fastapi'
```
**Solution:**
```bash
# Install dependencies
cd backend
pip install -r requirements.txt
```

### 3. **Missing Environment Variables**
```
Error: GROQ_API_KEY not configured
```
**Solution:**
```bash
# Copy example file
cp backend/env.example backend/.env
# Edit backend/.env with your API keys
```

### 4. **Port Already in Use**
```
Error: Address already in use (port 8009)
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :8009
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8009 | xargs kill -9
```

### 5. **Database Not Initialized**
```
Error: No such table: users
```
**Solution:**
```bash
# Delete old database
rm backend/medical_assistant.db
# Restart - it will auto-create
```

### 6. **Node Modules Missing**
```
Error: Cannot find module 'react'
```
**Solution:**
```bash
cd frontend
npm install
```

### 7. **Permission Errors (Linux/Mac)**
```
Error: Permission denied
```
**Solution:**
```bash
chmod +x start-backend.sh start-frontend.sh
# Or use Docker (no permission issues)
```

## ✅ **BEST SOLUTION: Use Docker**

**Why Docker Solves Everything:**
- ✅ No Python version conflicts
- ✅ All dependencies included
- ✅ Same environment for everyone
- ✅ No "works on my machine" issues
- ✅ Easy to share and deploy

**Quick Start with Docker:**
```bash
# 1. Install Docker Desktop
# 2. Clone repository
# 3. Run:
docker-compose up -d --build

# Done! No setup needed.
```

## 📋 Setup Comparison

### **With Docker (Recommended) ✅**
```bash
# That's it! No virtual environment, no manual installs
docker-compose up -d --build
```
- ✅ No virtual environment needed
- ✅ No manual dependency installation
- ✅ Works on any OS
- ✅ Isolated from your system

### **Without Docker (Traditional Way) ❌**
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install Python dependencies
pip install -r backend/requirements.txt

# Install Node dependencies
cd frontend
npm install

# Setup environment variables
cp backend/env.example backend/.env
# Edit backend/.env

# Run backend
python backend/run.py

# Run frontend (new terminal)
cd frontend
npm run dev
```
- ❌ Need virtual environment
- ❌ Manual dependency management
- ❌ Python version conflicts
- ❌ "Works on my machine" issues

## 🚀 Recommended: Always Use Docker

**Before:** 10+ steps, version conflicts, dependency hell
**After:** 1 command, works everywhere

```bash
docker-compose up -d --build
```

That's it! 🎉
