# 👑 How to Make a User an Admin

## 📋 Quick Guide

### Step 1: Create an Account (if you haven't already)
1. Go to http://localhost:3001
2. Click **"Sign Up"**
3. Create your account (remember the username!)

### Step 2: Make Your User an Admin

#### **Option 1: Using the Script (Recommended)**

In a terminal, navigate to the backend folder and activate the virtual environment:

```powershell
cd backend
.\mediassis\Scripts\activate
python make_admin.py <your-username-or-email>
```

**Examples:**
```powershell
# By username
python make_admin.py john_doe

# By email
python make_admin.py john@example.com
```

---

#### **Option 2: List All Users First**

To see all registered users:

```powershell
python make_admin.py --list
```

This will show:
```
📋 ALL USERS:
================================================================

  Username: john_doe
  Email:    john@example.com
  Status:   👤 USER
  ID:       1

  Username: jane_smith
  Email:    jane@example.com
  Status:   ✅ ADMIN
  ID:       2
```

---

## 🎯 Step-by-Step Example

### 1. List existing users:
```powershell
cd backend
.\mediassis\Scripts\activate
python make_admin.py --list
```

### 2. Make a specific user admin (by username or email):
```powershell
# By username
python make_admin.py john_doe

# OR by email
python make_admin.py john@example.com
```

### 3. Expected Output:
```
==============================================================
🔧 MAKE USER ADMIN - Medical Assistant App
==============================================================

🎯 Target User: john_doe
--------------------------------------------------------------
✅ Success! User 'john_doe' is now an admin!

User Details:
  Username: john_doe
  Email: john@example.com
  Admin Status: ✅ ADMIN

==============================================================

✅ Done! The user can now access the admin panel at:
   http://localhost:3001/admin

==============================================================
```

---

## 🔐 Access Admin Panel

After making yourself an admin:

1. **Login** to your account at http://localhost:3001/login
2. **Navigate** to http://localhost:3001/admin
3. You should see the **Admin Dashboard** with options to:
   - 📤 Upload medical documents (PDFs)
   - 📋 View all uploaded documents
   - 🗑️ Delete documents
   - 👥 Manage users (if implemented)

---

## 📝 Script Usage

### Basic Commands:

```powershell
# Make a user admin (by username)
python make_admin.py <username>

# Make a user admin (by email)
python make_admin.py <email@example.com>

# List all users
python make_admin.py --list
python make_admin.py -l

# Get help
python make_admin.py
```

---

## ⚠️ Troubleshooting

### Error: "User not found"
**Solution:** 
1. Make sure the user has signed up first
2. Check the exact username/email with: `python make_admin.py --list`
3. Username and email are case-sensitive!
4. You can use either username OR email

### Error: "Module not found"
**Solution:** Make sure you activated the virtual environment:
```powershell
cd backend
.\mediassis\Scripts\activate
```

### Error: "Database not found"
**Solution:** The backend needs to have been run at least once to create the database. Start the backend first:
```powershell
python run.py
```
Then press Ctrl+C and run the make_admin script.

---

## 🎓 What Admins Can Do

Once you're an admin, you can:

### 1. **Upload Medical Documents**
- Upload PDF files containing medical information
- Documents are processed and added to the vector database
- The AI can then answer questions based on these documents

### 2. **View All Documents**
- See all uploaded documents
- View document metadata (filename, upload date, etc.)

### 3. **Delete Documents**
- Remove documents from the system
- Clean up outdated or incorrect information

### 4. **Access Admin API**
- Use admin-only API endpoints
- Manage system resources

---

## 🔄 Make Multiple Admins

You can make multiple users admins:

```powershell
python make_admin.py alice
python make_admin.py bob
python make_admin.py charlie
```

---

## 🔙 Remove Admin Rights (Manual)

If you need to remove admin rights, you'll need to manually edit the database:

1. Install a SQLite viewer (like DB Browser for SQLite)
2. Open `backend/medical_assistant.db`
3. Find the user in the `users` table
4. Set `is_admin` to `0` (false)

Or create a Python script similar to `make_admin.py` but set `is_admin = False`.

---

## 📚 Summary

1. ✅ Create an account via the web interface
2. ✅ Run: `python make_admin.py <username>`
3. ✅ Login and go to http://localhost:3001/admin
4. ✅ Start managing documents and users!

---

**That's it! You're now an admin! 👑**

