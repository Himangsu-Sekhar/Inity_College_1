# INITY – Hostel & PG Management System

🔗 **Live Project:** https://inity-college-1.onrender.com/  
📄 **Project Report:** https://docs.google.com/document/d/19yEBDWKDj7ebrgZzW5gh8h30V3TzxzoQ/edit?usp=drive_link&ouid=107862360425584760937&rtpof=true&sd=true  

---

## 📌 Overview

**INITY** is a web-based **Hostel & PG Management System** designed to help **property owners** manage their PGs and hostels efficiently from a single platform.

The system focuses on **owner-controlled management**, where the owner handles:
- PG and hostel creation
- Rooms and bed allocation
- Tenant details
- Monthly rent tracking
- Payment status monitoring

There is **no separate tenant login** — all tenant data is maintained by the owner, keeping the system simple and centralized.

---

## 🎯 Objectives

- Digitize PG/Hostel management
- Reduce manual record keeping
- Track tenant occupancy and rent status
- Provide a structured dashboard for owners
- Maintain payment history for transparency

---

## 🚀 Features

### 👤 Owner Features
- Secure authentication (Login / Logout)
- Create and manage multiple PGs/Hostels
- Add rooms under PGs
- Add beds under rooms
- Assign tenants to beds
- Vacate beds when tenants leave
- View all tenants in a centralized dashboard
- Track monthly rent payment status
- Maintain payment history records

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Tailwind CSS
- JavaScript
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose ODM

### Tools & Services
- Git & GitHub
- MongoDB Atlas (Cloud Database)
- Render (Deployment)

---

## 🧠 System Design

### Architecture
- MVC (Model–View–Controller) Architecture
- RESTful routing
- Middleware-based authentication
- Server-side rendering using EJS

### Database Design
- Owner (User)
- PG
- Room
- Bed
- Tenant
- Payment History

Relations are maintained using MongoDB references to ensure data consistency.

---

## ⚙️ Installation & Setup

Follow the steps below to run **INITY** locally on your system.

---

### 📌 Prerequisites

Make sure you have the following installed:

- Node.js (v18 or above recommended)
- npm (comes with Node.js)
- Git
- MongoDB (Local or MongoDB Atlas)

---

### 📥 Clone the Repository

```bash
git clone https://github.com/Himangsu-Sekhar/Inity_College_1.git
cd Inity_College_1

```

📦 Install Dependencies
```npm install```

🔐 Environment Variables

Create a .env file in the root directory and add the following

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

```


Example MongoDB URI (Atlas)

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inity

```

▶️ Run the Application
```npm start```

OR (for development mode):

```npm run dev```

🌐 Open in Browser
```http://localhost:8080```


## 📊 Data Flow Diagrams

- **Context Level (Level 0 DFD):**
  - Owner interacts with the INITY system
  - System stores and retrieves data from the database

- **Level 1 DFD:**
  - PG management
  - Room & bed management
  - Tenant allocation
  - Payment status handling
  - Data exchange through structured processes

(Refer to the project report for detailed diagrams)

---

## 🔐 Authentication & Security

- Session-based authentication
- Protected routes using middleware
- Only logged-in owners can access dashboards
- Secure handling of database operations

---

## 🌐 Deployment

- Backend hosted on **Render**
- Database hosted on **MongoDB Atlas**
- GitHub used for version control and deployment workflow

Live URL:  
👉 https://inity-college-1.onrender.com/

---

## ⚠️ Limitations

- No online payment gateway integration
- No tenant-side login or dashboard
- No ID verification or document upload
- No automated rent reminders
- Limited analytics and reporting features

---

## 🔮 Future Enhancements

- Online payment gateway integration
- Automated WhatsApp / SMS rent reminders
- Tenant login portal
- Document upload & verification
- Monthly revenue analytics
- Mobile app version
- Role-based access control

---

## 📚 References

- MDN Web Docs  
- MongoDB Documentation  
- Express.js Documentation  
- Apna College  
- Yahoo Baba  
- ChatGPT  

---

## 👨‍💻 Author

**Himangsu Sekhar**  
 
Project: INITY – Hostel & PG Management System  

---

⭐ If you like this project, consider giving it a star!
