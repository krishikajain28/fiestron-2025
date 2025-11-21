
````markdown
# 🚀 Fiestron 2025 - Official Web Portal

The official full-stack web platform for **Fiestron 2025**, the annual Tech & Cultural Festival of **KC College**.

## 📖 Project Overview

This repository hosts the source code for the Fiestron 2025 website. It is designed as a centralized hub for students to register for events, view gallery highlights, meet the team, and contact the organizing committee.

The application is built as a **Full-Stack Monorepo**, separating the frontend user interface from the backend API logic.

### ✨ Key Features
* **Neon/Cyberpunk UI:** Custom "Neon Tunnel" aesthetics using Tailwind CSS.
* **Dynamic Event Catalog:** Filtering system for Technical, Gaming, and Cultural events.
* **Live Announcements:** Real-time fetching of news/updates via a custom Node.js API.
* **Sponsorship & Contact Forms:** Functional forms connected to the backend.
* **Gallery Lightbox:** Interactive image gallery for past event highlights.
* **Responsive Design:** Fully mobile-optimized navigation and layouts.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* **Framework:** React.js (via Vite)
* **Language:** TypeScript (.tsx)
* **Styling:** Tailwind CSS + Custom CSS Animations
* **Routing:** React Router DOM v6
* **HTTP Client:** Axios

### **Backend (Server)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Data Storage:** Local JSON Persistence (`/server/data/`)
* **Middleware:** CORS, Body-Parser

---

## ⚙️ Installation & Local Setup

To run this project, you need **Node.js** installed. You must run **two** terminals: one for the Backend (Port 5000) and one for the Frontend (Port 5173).

### 1. Clone the Repository
```bash
git clone [https://github.com/krishikajain28/fiestron-2025.git](https://github.com/krishikajain28/fiestron-2025.git)
cd fiestron-2025
````

### 2\. Setup & Run Backend (Server)

Open your **first terminal**:

```bash
cd server
npm install
npm run dev
```

*✅ Output: Server running on http://localhost:5000*

### 3\. Setup & Run Frontend (Client)

Open your **second terminal** (keep the first one running):

```bash
# If you are inside the server folder, go back one step:
cd .. 

# Install frontend dependencies
npm install

# Start the Vite server
npm run dev
```

*✅ Output: Local: http://localhost:5173*

-----

## 📡 API Documentation

The backend runs on Port `5000` and utilizes a local file system for data storage.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/announcements` | Fetches the latest news and updates. |
| **POST** | `/api/announcements` | (Admin) Adds a new announcement. |
| **POST** | `/api/contact` | Submits Contact or Sponsor inquiries. |

-----

## 📂 Project Structure

```
fiestron-2025/
├── public/             # Static assets (Images, Videos)
├── src/                # Frontend Logic (React)
│   ├── components/     # Reusable UI (Header, Footer, Cards)
│   ├── styles/         # Global CSS
│   └── App.tsx         # Main Routing Logic
├── server/             # Backend Logic (Node/Express)
│   ├── data/           # JSON Database (announcements.json)
│   └── index.js        # API Routes
└── README.md           # Documentation
```

-----

## ⚠️ Contribution Guidelines

**For the Web Team:**

1.  **No Direct Pushes:** Do not push directly to the `main` branch.
2.  **Branching:** Create a new branch for every feature (e.g., `git checkout -b feature-gallery`).
3.  **Review:** Send screenshots to the WhatsApp group before opening a Pull Request.

-----

## 📞 Contact

**Developed by the Fiestron 2025 Web Team.**

  * **Head of Website Team:** Krishika Jain
  * **Organization:** KC College Tech Club

<!-- end list -->

```
```