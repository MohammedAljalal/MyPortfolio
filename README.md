# MERN Portfolio

A premium, high-performance portfolio application built with the MERN stack (MongoDB, Express, React, Node.js). 
Features a complete Admin CMS for managing all portfolio content dynamically.

## Features
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Admin Panel**: Full CMS to manage Projects, Experience, Skills, Education, Certificates, Testimonials, and Personal Info.
- **Security**: JWT Authentication, bcrypt password hashing.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Install admin dependencies:
   ```bash
   cd admin
   npm install
   ```

### Environment Variables

Create `.env` files in `backend` and `frontend` following the `.env.example` templates.

### Running the Project

Start all servers concurrently:
```bash
# In backend directory
npm run dev

# In frontend directory
npm run dev

# In admin directory
npm run dev
```
