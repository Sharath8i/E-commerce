# MERN E-Commerce Website

A modern, full-stack e-commerce website inspired by Flipkart and Amazon, built with the **MERN stack** (MongoDB, Express.js, React, Node.js).

## Features
- Modern, responsive UI/UX (Flipkart/Amazon style)
- Product grid, category filter, and similar products
- Product management (CRUD, via backend API)
- User authentication (JWT-based login/register)
- Shopping cart with quantity, checkout, and persistent storage
- Wishlist/favorites functionality
- Category menu with icons/images
- Product quick view modal
- Toast notifications and error handling
- Mobile-friendly and accessible design

## Tech Stack
- **Frontend:** React, React Router, Bootstrap, React Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, CORS

## Project Structure
```
pro/
  client/    # React frontend
    src/
    public/
    ...
  server/    # Node.js/Express backend
    models/
    routes/
    ...
  README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd pro
   ```
2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```
3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```
4. **Set up environment variables:**
   - Create a `.env` file in `server/` with your MongoDB URI and JWT secret:
     ```env
     MONGO_URI=mongodb://localhost:27017/your-db
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
5. **Seed the database with sample products:**
   ```bash
   cd ../server
   node seed.js
   ```
6. **Start the backend server:**
   ```bash
   npm start
   ```
7. **Start the frontend React app:**
   ```bash
   cd ../client
   npm start
   ```
8. **Visit the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api/products](http://localhost:5000/api/products)

## API Endpoints
- **Products:** `GET/POST /api/products`
- **Auth:** `POST /api/auth/login`, `POST /api/auth/register`
- **Cart:** (handled client-side)

## Design & UX
- Modern color scheme, glassmorphism, smooth animations
- Sticky navbar, animated cart, wishlist, and product modals
- Responsive grid and mobile-first design

## License
MIT 