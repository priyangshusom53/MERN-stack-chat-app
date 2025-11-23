# 💬 MERN Stack Chat App

A full-stack real-time chat application built with the **MERN stack**  
(**M**ongoDB, **E**xpress, **R**eact, **N**ode.js).

The repository is organized as a multi-service project:

- `backend-v2` – latest backend implementation (recommended)
- `backend` – older/initial backend version
- `frontend` – React-based client
- `next-app` – experimental Next.js frontend (optional)

---

## ✨ Features

- 🔐 **User Authentication**
  - Sign up / login
  - Secure password hashing (e.g. bcrypt)
  - JWT or session-based authentication (depending on implementation)

- 💬 **Real-Time Chat**
  - One-to-one messaging
  - (Optional) group chats / rooms
  - Messages delivered instantly using WebSockets (e.g. Socket.io)

- 👥 **User & Conversation Management**
  - Search/select users to start a chat
  - Conversation list with latest message preview
  - Online / offline presence (if enabled in the backend)

- 🧭 **Clean UI**
  - React single-page application
  - Responsive layout (works on desktop & mobile)
  - Separate views for auth, chat list, and active conversation

- 🗄️ **Persistent Storage**
  - MongoDB collections for users, conversations, and messages
  - Timestamps for messages & chats

---

## 🧱 Tech Stack

**Frontend**

- React (JavaScript)
- React Router (for navigation)
- Fetch / Axios for API calls
- CSS for styling (and possibly UI libraries)

**Backend**

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io (or similar) for real-time communication
- JSON Web Tokens (JWT) or sessions for auth
- dotenv for environment variables

---

## 📁 Project Structure

At the root of the repo:

```text
MERN-stack-chat-app/
├─ backend/        # Original backend implementation
├─ backend-v2/     # Updated / improved backend (recommended)
├─ frontend/       # React SPA client
├─ next-app/       # Optional Next.js frontend
├─ package.json
└─ readme.md

Use backend-v2 + next-app for the main stack.
backend and frontend are old implementation.