# 🚀 Quick Start - Medical Assistant App

## ⚡ 3 Steps to Run

### 1️⃣ Start Backend
Open a terminal and run:
```bash
.\start-backend.bat
```
Wait until you see: `Uvicorn running on http://0.0.0.0:8009`

### 2️⃣ Start Frontend  
Open a **NEW** terminal and run:
```bash
.\start-frontend.bat
```
Wait until you see: `Local: http://localhost:3000`

### 3️⃣ Open Browser
Go to: **http://localhost:3000**

---

## 🎯 Try It Out

### Guest Mode (No Login)
1. Open http://localhost:3000
2. Ask: **"What are the symptoms of diabetes?"**
3. The AI will respond using Groq's Llama 3.3 70B model

### Create Account
1. Click **"Sign Up"**
2. Enter username, email, password
3. Click **"Login"**
4. Start chatting!

---

## 💡 Example Questions

- "What are the symptoms of flu?"
- "Find cardiologists in Mumbai"
- "How to treat a fever?"
- "I want to book an appointment with Dr. Smith"

---

## ✅ What's Configured

- ✅ Groq API (Llama 3.3 70B) - Your key is set
- ✅ Tavily Web Search - Demo key configured
- ✅ Database - SQLite (auto-created)
- ✅ All dependencies - In mediassis virtual env

---

## 🆘 Troubleshooting

**Backend won't start?**
- Make sure you're in the project root directory
- Check that port 8009 is not in use

**Frontend won't start?**
- Check that port 3000 is not in use
- Make sure backend is running first

**AI not responding?**
- Check backend terminal for errors
- Verify your Groq API key in `backend/.env`

---

## 📚 More Info

- Full documentation: `README.md`
- Detailed setup: `SETUP_GUIDE.md`
- Project status: `PROJECT_STATUS.md`
- API docs: http://localhost:8009/docs

---

**That's it! You're ready to go! 🎉**

