# 🗄️ Database Viewer Scripts - Complete Guide

## 📋 Scripts Available

I've created 4 scripts to view your database:

1. **`view_users.py`** - View all users
2. **`view_messages.py`** - View all messages
3. **`view_documents.py`** - View all uploaded documents
4. **`view_all.py`** - Combined view of everything

---

## 🚀 Quick Start

### Activate Virtual Environment First:
```powershell
cd backend
.\mediassis\Scripts\activate
```

---

## 📖 Individual Scripts

### 1. **View Users** 👥

```powershell
python view_users.py
```

**Shows:**
- User ID, Username, Email
- Admin status (✅ ADMIN or 👤 USER)
- Active status (🟢 Active or 🔴 Inactive)
- Creation date
- Statistics (total users, admins, active users)

**Example Output:**
```
============================================================
👥 ALL USERS
============================================================

────────────────────────────────────────────────────────────
  ID:           1
  Username:     john_doe
  Email:        john@example.com
  Role:         ✅ ADMIN
  Status:       🟢 Active
  Created:      2025-12-04 10:30:15

📊 Total Users: 5
   - Admins: 2
   - Regular Users: 3
```

---

### 2. **View Messages** 💬

```powershell
# View all messages
python view_messages.py

# View latest 10 messages
python view_messages.py --limit 10

# View messages from specific session
python view_messages.py --session 5

# View messages from specific user
python view_messages.py --user 2
```

**Shows:**
- Message ID, Role (USER/ASSISTANT)
- Session ID and title
- User who sent it
- Message content (truncated if long)
- Timestamp
- Statistics

**Example Output:**
```
============================================================
💬 ALL MESSAGES
============================================================

────────────────────────────────────────────────────────────
  Message ID:   42
  Role:         👤 USER
  Session ID:   5
  Session:      Medical Questions
  User:         john_doe (john@example.com)
  Created:      2025-12-04 14:30:15
  Content:      What are the symptoms of diabetes?

📊 Total Messages: 156
   - User Messages: 78
   - Assistant Messages: 78
```

---

### 3. **View Documents** 📄

```powershell
python view_documents.py
```

**Shows:**
- Document ID
- Original filename
- File size (human-readable)
- Processing status (✅ Completed, ⏳ Processing, ❌ Failed)
- Upload date
- File existence check
- Total size statistics

**Example Output:**
```
============================================================
📄 ALL DOCUMENTS
============================================================

────────────────────────────────────────────────────────────
  ID:               3
  Original Name:    medical_guide.pdf
  Stored Name:      d77fcba9-3397-480e-a735-63e8f3e65c88.pdf
  File Path:        uploads/d77fcba9-3397-480e-a735-63e8f3e65c88.pdf
  Size:             2.45 MB
  Type:             application/pdf
  Status:           ✅ Completed
  Uploaded:         2025-12-04 13:22:10
  File Exists:      ✅ Yes

📊 Total Documents: 7
💾 Total Size: 15.23 MB
   - Completed: 6
   - Failed: 1
```

---

### 4. **View Everything** 🗄️

```powershell
# View complete database overview
python view_all.py

# View specific sections
python view_all.py --users
python view_all.py --messages
python view_all.py --documents
```

**Shows:**
- Users summary
- Chat sessions summary
- Messages summary (latest 10)
- Documents summary
- Overall statistics

**Example Output:**
```
============================================================
🔍 MEDICAL ASSISTANT DATABASE - COMPLETE VIEW
============================================================

👥 USERS SUMMARY
  1. john_doe           | john@example.com              | ✅ ADMIN
  2. jane_smith         | jane@example.com              | 👤 USER

📊 Total Users: 2
   - Admins: 1
   - Active: 2

💭 CHAT SESSIONS SUMMARY
  1. Medical Questions              | User: john_doe      | Messages:  25 | 2025-12-04 14:30

💬 MESSAGES SUMMARY (Latest 10)
  👤 [2025-12-04 14:30] What are the symptoms of diabetes?
  🤖 [2025-12-04 14:31] Diabetes symptoms include increased thirst...

📄 DOCUMENTS SUMMARY
  ✅ medical_guide.pdf                    | 2.45 MB    | 2025-12-04 13:22

📈 OVERALL STATISTICS
  Total Users:          2
  Total Chat Sessions:  5
  Total Messages:       156
  Total Documents:      7
```

---

## 📝 Common Use Cases

### Check if a user exists:
```powershell
python view_users.py
```

### See recent conversations:
```powershell
python view_messages.py --limit 20
```

### Check document upload status:
```powershell
python view_documents.py
```

### Get complete database overview:
```powershell
python view_all.py
```

### Find messages from specific user:
```powershell
python view_all.py --messages
# Look for user ID in output
python view_messages.py --user 1
```

---

## 🎯 Quick Reference

| Script | Purpose | Options |
|--------|---------|---------|
| `view_users.py` | Show all users | None |
| `view_messages.py` | Show messages | `--limit`, `--session`, `--user` |
| `view_documents.py` | Show documents | None |
| `view_all.py` | Show everything | `--users`, `--messages`, `--documents` |

---

## 💡 Tips

1. **Before using scripts:**
   ```powershell
   cd backend
   .\mediassis\Scripts\activate
   ```

2. **To save output to file:**
   ```powershell
   python view_all.py > database_report.txt
   ```

3. **To search for specific content:**
   ```powershell
   python view_messages.py | findstr "diabetes"
   ```

4. **Combine with grep (Linux/Mac):**
   ```bash
   python view_users.py | grep "ADMIN"
   ```

---

## 🔍 What Each Script Shows

### Icons Used:
- 👥 Users
- 💬 Messages  
- 📄 Documents
- ✅ Success/Completed/Admin
- ❌ Failed
- ⏳ Processing
- 🟢 Active
- 🔴 Inactive
- 👤 Regular User
- 🤖 AI Assistant

---

## ⚙️ Advanced Usage

### View messages from a specific session with details:
```powershell
python view_all.py  # Find session ID
python view_messages.py --session 5
```

### Monitor recent activity:
```powershell
python view_messages.py --limit 5
```

### Check database health:
```powershell
python view_all.py
```

---

## 🆘 Troubleshooting

### Error: "Module not found"
**Solution:** Activate virtual environment first:
```powershell
cd backend
.\mediassis\Scripts\activate
```

### Error: "Database not found"
**Solution:** Make sure the backend has been run at least once to create the database.

### No data shown
**Solution:** This is normal if you haven't:
- Created any users
- Sent any messages
- Uploaded any documents

---

**All scripts are ready to use! Just activate the virtual environment and run them!** 🚀

