# Attendance Monitoring System - Backend

A RESTful API built with Node.js, Express, and MySQL for managing student attendance.

---
## 👤 Author

- 👨‍💻 Sherom Granada  
- 🔗 GitHub: https://github.com/SheromG  
- 📧 Portfolio: https://portfolio-sheromgranada.vercel.app/
- 💼 Role: Full Stack Developer
---

## 🚀 Tech Stack
- Node.js
- Express.js
- MySQL
- JWT Authentication

---

## 📌 Features

### 👨‍🏫 Teacher Features
- Authentication
- Create & manage sections
- Create & manage classes
- Create subjects
- Assign class schedules
- Enroll students
- View students per class
- View attendance records

### 🎓 Student Features
- Authentication
- View enrolled classes
- View schedules
- Submit attendance
- View attendance history

---

## 🗄️ Database Tables

- users
- sections
- classes
- subjects
- class_schedules
- enrolled_students
- attendance

---

## 🔁 Database Flow
- USERS
- ├── TEACHERS
- │ └── CLASSES
- │ ├── SECTIONS
- │ └── CLASS_SCHEDULES
- │
- └── STUDENTS
- └── ATTENDANCE

---

## 🔁 Backend Flow

Request → Middleware → Routes → Controller → Model → Database → Response

---

## 📦 Setup

```bash
npm install
npm run dev
