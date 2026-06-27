# 🚀 How to Start the Medical Assistant App

## ✅ Fixed Issues:
1. ✅ Migrated from Google Gemini to ChatGroq (Llama 3.3 70B)
2. ✅ Fixed deprecated LangChain imports
3. ✅ Disabled ChromaDB telemetry (was causing crashes)
4. ✅ Configured your Groq API key
5. ✅ Added Tavily API key for web search

---

## 🎯 Simple Start Instructions

### Step 1: Start Backend

Open a terminal in the project root and run:

```powershell
cd backend
.\mediassis\Scripts\activate
python run.py
```

**Wait until you see:**
```
✅ All API keys configured!
INFO:     Uvicorn running on http://0.0.0.0:8009
INFO:     Application startup complete.
```

> **Note:** First time startup may take 1-2 minutes to download the embeddings model.

### Step 2: Start Frontend

Open a **NEW** terminal and run:

```powershell
cd frontend
npm run dev
```

**Wait until you see:**
```
Local: http://localhost:3000
```

### Step 3: Open Browser

Go to: **http://localhost:3000**

---

## 🔧 If You Get Errors

### Error: "Port 8009 already in use"
**Solution:**
```powershell
# Find the process using port 8009
netstat -ano | findstr :8009

# Kill it (replace PID with the actual process ID)
taskkill /PID <PID> /F

# Then start backend again
```

### Error: "Module not found"
**Solution:** Make sure you activated the virtual environment:
```powershell
cd backend
.\mediassis\Scripts\activate
```

You should see `(mediassis)` at the start of your prompt.

### Error: ChromaDB or embeddings issues
**Solution:** The first run downloads a ~80MB embeddings model. Just wait 1-2 minutes.

---

## 📝 Manual Commands (if scripts don't work)

### Backend:
```powershell
cd D:\my_Codes\medical-assistant-app\backend
.\mediassis\Scripts\activate
python run.py
```

### Frontend:
```powershell
cd D:\my_Codes\medical-assistant-app\frontend
npm run dev
```

---

## ✅ Verification

### Test Backend:
```powershell
curl http://localhost:8009/health
# Should return: {"status":"healthy"}
```

### Test Frontend:
Open http://localhost:3000 in your browser

---

## 🎯 What's Working Now

- ✅ **ChatGroq AI** (Llama 3.3 70B) - Your API key is configured
- ✅ **Guest Mode** - Try without login
- ✅ **User Authentication** - Signup/Login
- ✅ **Chat Sessions** - Multiple conversations
- ✅ **Streaming Responses** - Real-time AI
- ✅ **Web Search** - Find doctors/clinics
- ✅ **RAG System** - Answer from documents

---

## 💡 Example Questions to Try

1. "What are the symptoms of diabetes?"
2. "Find cardiologists in Mumbai"
3. "How to treat a fever?"
4. "I want to book an appointment"

---

## 🆘 Still Having Issues?

1. Make sure you're in the correct directory
2. Check that `(mediassis)` appears in your terminal prompt
3. Wait for the embeddings model to download (first time only)
4. Check no other process is using port 8009 or 3000
5. Try restarting your terminal

---

**Your app is ready! Just follow the steps above. 🎉**

