# 🔍 Campus Lost & Found System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Deployment](https://img.shields.io/badge/Deployment-Render-brightgreen)
![UI/UX](https://img.shields.io/badge/UI-Glassmorphism-purple)

A full-stack MERN application that helps students and faculty **report, search, and recover lost items on campus**.
Built with a modern glassmorphism UI, secure authentication, and a seamless user experience.

> 💡 Designed to solve real campus problems by making lost item recovery fast, simple, and organized.

---

## 🚀 Live Demo

👉 https://lostandfound-frontend-h8m4.onrender.com/

---

## 📸 Screenshots

<img src="https://github.com/user-attachments/assets/a6c9e3ae-f31e-4cb9-8d0d-65347e582905" width="70%" />
<img src="https://github.com/user-attachments/assets/6006f4de-7f33-4917-bb92-c983ebba9530" width="70%" />

---

## ✨ Key Features

* 🔐 **Secure Authentication** — JWT-based login & registration with Bcrypt hashing
* 🧾 **Lost & Found Listings** — Report items with description, location, and contact details
* ✏️ **Owner Controls** — Edit/Delete only your own items
* 🔍 **Smart Search** — Real-time filtering to quickly find items
* 🛡️ **Protected Routes** — Only authenticated users can access dashboard
* 📱 **Responsive Design** — Optimized for mobile and desktop
* 🎨 **Modern UI** — Glassmorphism + bento-style layout

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Bootstrap 5 (Custom Themed)
* Lucide React (Icons)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

---

## 📁 Project Structure

```text
Lost-Found-System/
├── backend/
│   ├── models/        # Mongoose Schemas (User, Item)
│   ├── routes/        # API Endpoints (Auth, Items)
│   ├── middleware/    # JWT Authentication
│   └── index.js       # Server Entry Point
├── frontend/
│   ├── src/
│   │   ├── api/        # Axios Instance
│   │   ├── components/ # Reusable UI Components
│   │   ├── pages/      # Pages (Login, Register, Dashboard)
│   │   └── App.jsx     # Routing
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/aditya-mishra-007/LostAndFound-App
cd LostAndFound-App
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the **backend** folder:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4. Run the Application

#### Start Backend

```bash
cd backend
npm start
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔌 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Items

* GET /api/items
* POST /api/items
* PUT /api/items/:id
* DELETE /api/items/:id

---

## 🌐 Deployment

* Frontend & Backend deployed on Render
* Database hosted on MongoDB Atlas

---

## 🎯 Purpose of the Project

This project was built to:

* Practice full-stack MERN development
* Implement secure authentication systems
* Build a real-world, user-focused application
* Deploy and manage a production-ready app

---

## 🚀 Future Improvements

* 📸 Image upload for items
* 🔔 Notification system
* 📍 Location-based filtering
* 📨 Chat between finder & owner

---

## 👨‍💻 Author

**Aditya Mishra**
GitHub: https://github.com/aditya-mishra-007

---
