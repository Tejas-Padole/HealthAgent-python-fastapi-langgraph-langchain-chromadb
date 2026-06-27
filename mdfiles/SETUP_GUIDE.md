# Medical Assistant App - Setup Guide

## 🚀 Quick Start

Follow these steps to get the Medical Assistant app running on your system.

---

## Step 1: Configure API Keys

The app requires API keys to function. You need to edit the `.env` file in the `backend` folder.

### Required API Keys:

1. **Google AI API Key** (Required for AI responses)
   - Visit: https://makersuite.google.com/app/apikey
   - Click "Create API Key"
   - Copy your API key

2. **Tavily API Key** (Required for web search - finding doctors/clinics)
   - Visit: https://tavily.com/
   - Sign up for a free account
   - Get your API key from the dashboard

3. **Groq API Key** (Optional - for alternative AI models)
   - Visit: https://console.groq.com/
   - Sign up and get your API key

### Edit the .env file:

1. Open `backend\.env` in a text editor
2. Replace the placeholder values:

```env
GOOGLE_API_KEY=AIzaSy...your-actual-key-here
TAVILY_API_KEY=tvly-...your-actual-key-here
GROQ_API_KEY=gsk_...your-actual-key-here
```

3. Save the file

---

## Step 2: Start the Backend

### On Windows:
```bash
# Double-click this file:
start-backend.bat

# OR run from command line:
.\start-backend.bat
```

### On Linux/Mac:
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**What to expect:**
- The backend will start on **http://localhost:8009**
- API docs will be available at **http://localhost:8009/docs**
- You should see "Uvicorn running on http://0.0.0.0:8009"

### Troubleshooting Backend:
- **"Module not found"**: Make sure you're using the mediassis virtual environment
- **"API Key error"**: Check that your `.env` file has valid API keys
- **"Port already in use"**: Another app is using port 8009, kill that process or change the port

---

## Step 3: Start the Frontend

Open a **NEW** terminal/command prompt window.

### On Windows:
```bash
# Double-click this file:
start-frontend.bat

# OR run from command line:
.\start-frontend.bat
```

### On Linux/Mac:
```bash
chmod +x start-frontend.sh
./start-frontend.sh
```

**What to expect:**
- The frontend will start on **http://localhost:3000**
- Your browser should automatically open
- You should see the Medical Assistant login/welcome page

### Troubleshooting Frontend:
- **"Cannot GET /"**: Make sure you're accessing http://localhost:3000
- **"Network Error"**: Make sure the backend is running on port 8009
- **"Port 3000 already in use"**: Change the port in `frontend/vite.config.js`

---

## Step 4: Test the Application

### Option 1: Guest Mode (No Login Required)
1. Open http://localhost:3000
2. You should see the guest chat interface
3. Try asking: "What are the symptoms of flu?"
4. The AI should respond with medical information

### Option 2: Create an Account
1. Click "Sign Up" button
2. Create a new account with:
   - Username
   - Email
   - Password (min 6 characters)
3. Login with your credentials
4. Start chatting!

---

## Features to Test

### 1. Medical Questions
Ask general medical questions:
- "What are the symptoms of diabetes?"
- "How to treat a fever?"
- "What causes headaches?"

### 2. Find Doctors
Ask about finding healthcare providers:
- "Find cardiologists in Mumbai"
- "Best hospitals in Delhi"
- "Dentists near Bangalore"

### 3. Book Appointments (Simulation)
Try booking an appointment:
- "I want to book an appointment with Dr. Smith"
- The AI will ask for:
  - Your name
  - Phone number
  - City
  - Age
  - Preferred time slot

### 4. Admin Features (For Admins Only)
To access admin features:
1. Create an account
2. Stop the backend
3. Edit the database (medical_assistant.db) and set `is_admin=true` for your user
4. Restart backend
5. Access `/admin` to upload medical documents

---

## Common Issues & Solutions

### Issue: "Connection refused" or "Network Error"
**Solution:** Make sure both backend AND frontend are running

### Issue: "Invalid API Key"
**Solution:** Check your `.env` file and ensure API keys are correct

### Issue: "No response from AI"
**Solution:** 
1. Check backend terminal for errors
2. Verify your Google API key is valid
3. Check if you have API quota remaining

### Issue: Frontend doesn't update after code changes
**Solution:** Vite has hot-reload, but sometimes you need to refresh the browser

### Issue: Database errors
**Solution:** Delete `backend/medical_assistant.db` and restart the backend to recreate the database

---

## Architecture Overview

```
Frontend (React + Vite)
    ↓ HTTP requests
Backend (FastAPI)
    ↓ RAG Agent (LangGraph)
    ├─→ Google Gemini AI (Main LLM)
    ├─→ Tavily (Web Search)
    ├─→ ChromaDB (Vector Store for documents)
    └─→ SQLite (User data, sessions, messages)
```

---

## File Structure Reference

```
medical-assistant-app/
├── backend/
│   ├── .env                    ← Configure your API keys here!
│   ├── mediassis/              ← Virtual environment (already set up)
│   ├── app/
│   │   ├── main.py            ← Backend entry point
│   │   ├── config.py          ← Configuration settings
│   │   └── ...
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── main.jsx           ← Frontend entry point
│   │   └── ...
│   └── package.json
├── start-backend.bat           ← Windows: Start backend
├── start-frontend.bat          ← Windows: Start frontend
├── start-backend.sh            ← Linux/Mac: Start backend
├── start-frontend.sh           ← Linux/Mac: Start frontend
├── README.md                   ← Project overview
└── SETUP_GUIDE.md             ← This file!
```

---

## Need Help?

1. Check the terminal/console for error messages
2. Verify both backend and frontend are running
3. Check your API keys are configured correctly
4. Try the guest mode first to test basic functionality

---

## Next Steps

Once everything is working:
1. Upload medical PDF documents via the admin panel to enhance the RAG system
2. Create multiple chat sessions to organize conversations
3. Explore the API documentation at http://localhost:8009/docs

---

**Enjoy your Medical Assistant! 🏥🤖**

