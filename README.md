# INTEXIA: Cyber Security Learning Management System (LMS)

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-green.svg?logo=node.js)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-lightblue.svg?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg?logo=postgresql)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-Testing_Suite-red.svg?logo=jest)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/Swagger-API_Docs-brightgreen.svg?logo=swagger)](https://swagger.io/)

**INTEXIA** is a modern, enterprise-grade, role-based Cybersecurity Learning Management System (LMS). Designed with a premium, futuristic dark-theme visual design language (featuring glassmorphism, responsive grids, and neon accents), the platform provides immersive learning paths for **Students**, course-creation tools for **Instructors (Teachers)**, and global moderation panels for **Administrators**.

---

## 🌟 Key Highlights & Visual Design

* **Futuristic Aesthetics**: Sleek HSL-tailored dark mode, neon borders, glassmorphic cards, responsive flex grids, and smooth CSS micro-animations.
* **Role-Based Access Control (RBAC)**: Custom routing, secure authorization layers, and targeted workspaces for Students, Instructors, and Admins.
* **Database Synergy**: Powered by **PostgreSQL** and the type-safe **Prisma ORM**, ensuring lightning-fast database transactions and relationship queries.
* **Security Shielding**: Implemented **Helmet HTTP security headers**, request rate limiters, token rotation, password crypt-hashing, and client-side route protection.
* **API Documentation**: Fully documented backend endpoints exposed via interactive **Swagger UI**.
* **Enterprise Testing**: Robust backend coverage using **Jest** and **Supertest** mocking integrations.

---

## 🚀 Features & User Journeys

### 🎓 1. Student Workspace
* **Personalized Dashboard**: View key statistics at a glance: enrolled course count, average progress percentage, recent activity feeds, and unlocked certificates.
* **Course Catalog & Details**: Explore available cyber tracks, difficulty levels (Beginner, Intermediate, Advanced), durations, and learning modules.
* **Instant Enrollment & Welcome Mail**: Securely enroll in any course. Upon enrollment, an automated, visually stunning HTML confirmation email is sent via Nodemailer.
* **Immersive Video Player**: View course lessons, toggle module completion statuses, and access course resources (PDF lecture notes, slide downloads, links).
* **Automated PDF Certificate Generation**: Completing all modules dynamically triggers backend PDF generation using `pdfkit` and registers a verified completion certificate. Students receive a certificate-ready notification email and can download the official PDF directly from the dashboard.
* **Settings & Custom Avatars**: Update contact details and upload profile photos processed through Multer and stored in Cloudinary (or local storage).

### 👨‍🏫 2. Instructor Portal
* **Analytics Panel**: Monitor active students count, course listing numbers, and interactive graphs showing student enrollment patterns.
* **Course Studio**: Create, edit, and update courses, map out structured learning modules, and attach external resources to specific lectures.
* **Resource Upload Engine**: Upload PDFs, documentation, and external links directly to learning modules (using Cloudinary or local disk fallback).
* **Student Roster**: Track the registration dates and course completion states of enrolled students.

### 🛡️ 3. Administrator Hub
* **System Command Center**: Global metrics tracking total registered accounts, active courses, pending approvals, and system-wide configurations.
* **User Directory (Roster)**: Search, page, and filter all platform users by role (Student, Instructor, Admin) and toggle activation statuses (`isActive` toggle to suspend/enable accounts).
* **Course Approval Queue**: Moderation pipeline to approve or reject instructor-submitted courses before they become public.
* **System Settings Manager**: Dynamic dashboard to customize platform configurations stored in a global `Setting` table.

---

## 🛠️ Technology Stack

### Frontend Architecture
* **Framework**: React 19 (Hooks, Context Provider state management)
* **Build tool**: Vite (ES Modules)
* **Routing**: React Router DOM v7 (Role-based `<ProtectedRoute>` component wrappers)
* **Data Visualization**: Recharts (Dynamic Bar, Area, and Pie charts for analytics)
* **Animations**: Framer Motion (for fluid transitions, hover effects, and slide-in panels)
* **Icons**: React Icons (Fa, Md, Io packages)
* **Styling**: Modern Custom Vanilla CSS (Design tokens, cyber neon theme, glassmorphic layout grids)

### Backend Architecture
* **Runtime & Framework**: Node.js, Express.js (v5)
* **Database ORM**: Prisma ORM (Client v7)
* **Database**: PostgreSQL
* **Authentication**: JSON Web Token (JWT) with Access & Refresh Token rotation + `bcryptjs` hashing
* **Security Headers**: Helmet & Express Rate Limiters (General and Authentication endpoints protection)
* **File Uploads**: Multer with `multer-storage-cloudinary` API connector (fallback to local `./uploads` directory if variables are absent)
* **PDF Engine**: PDFKit (Vector layout, fonts, and custom certificates formatting)
* **Mailer**: Nodemailer (SMTP config with auto-generating Ethereal Mail test credentials fallback for local offline development)
* **Input Validation**: Zod Schemas middleware

---

## 📁 Repository Structure

```text
├── backend
│   ├── prisma/             # Schema definitions, migrations, and seed scripts
│   ├── src/
│   │   ├── config/         # Swagger specifications and database connector
│   │   ├── middleware/     # JWT Auth, Zod Validation, and Error Handlers
│   │   ├── routes/         # Auth, Course, Instructor, Admin, and User routes
│   │   ├── utils/          # Nodemailer config and Cloudinary storage handler
│   │   └── index.js        # Main server entrypoint
│   └── tests/              # Jest API endpoint tests
│
├── frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, and Shared UI elements
│   │   ├── context/        # AuthContext for login sessions
│   │   ├── data/           # Mock data and constants
│   │   ├── pages/          # 21 dashboard and configuration page views
│   │   ├── routes/         # ProtectedRoute router handler
│   │   ├── styles/         # Visual styles and animations
│   │   ├── utils/          # API fetch helpers
│   │   ├── App.jsx         # Main router mapping
│   │   └── main.jsx        # App mounting configuration
│
└── package.json            # Root configuration running concurrently
```

---

## ⚙️ Setup & Configuration

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* A running [PostgreSQL](https://www.postgresql.org/) database
* *(Optional)* Cloudinary Account (for live media uploads)
* *(Optional)* SMTP credentials (for outbound email updates)

### 1. Environment Variables Configuration

#### Backend Env (`backend/.env`)
Create a file named `.env` inside the `backend` folder and populate it:
```env
# Server Port
PORT=5000

# JSON Web Token Key
JWT_SECRET=your-super-long-secure-jwt-secret-key

# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/intexia_db?schema=public"

# Optional: Cloudinary Credentials (falls back to local /uploads if not set)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Production SMTP Email Server (falls back to Ethereal Mail if not set)
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM='"INTEXIA Support" <noreply@intexia.com>'

# Frontend URL for Dynamic CORs
FRONTEND_URL=http://localhost:5173
```

#### Frontend Env (`frontend/.env`)
Create a file named `.env` inside the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🗄️ Database Initialization & Seeding

Run the following commands within the `backend` directory to establish migrations and insert initial platform resources:

```bash
# Generate Prisma Client & Migrate Schema
npx prisma migrate dev --name init

# Seed default mock courses, modules, and role test accounts
npx prisma db seed
```

### 🔐 Default Seed Credentials
The seed script populates the database with the following demo logins:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@lms.com` | `Admin@123` |
| **Instructor** | `teacher@lms.com` | `Teach@123` |
| **Student** | `student@lms.com` | `Learn@123` |

---

## 🚀 Running Locally

You can launch both the frontend and backend environments concurrently from the root directory:

```bash
# 1. Install all dependencies across workspace
npm run install-all

# 2. Run both Backend & Frontend in concurrently-watched development mode
npm run dev
```

* **Frontend Dashboard**: Access at [http://localhost:5173](http://localhost:5173)
* **Backend API server**: Runs at [http://localhost:5000](http://localhost:5000)

---

## 📑 Interactive API Documentation (Swagger)

The backend provides a Swagger interactive route detailing payload shapes, header parameters, and endpoint routes. 

1. Start the backend app server.
2. Navigate to: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

*Note: You can authenticate directly inside Swagger using the Bearer Auth token.*

---

## 🧪 Running Automated Tests

A comprehensive integration test suite is located in `backend/tests`. It tests:
* User registration, logging in, and token refresh.
* Student enrollment, progress checks, and completions toggle.
* Access control (ensuring student credentials cannot fetch instructor/admin data).
* Uploading course resources.
* Modifying user profile attributes and avatars.

Run the test suite from the backend directory:
```bash
cd backend
npm run test
```
*(Tests utilize mock nodemailer adapters to run entirely offline without triggering real email transmissions).*
