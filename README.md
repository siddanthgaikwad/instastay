Hotel Booking Website - InstaStay

Welcome to InstaStay, a modern hotel booking platform designed to provide seamless hotel search, booking, and payment experiences for users. This project is built using the MERN stack (MongoDB, Express.js, 
React.js, Node.js) and integrates Stripe for payments and Cloudinary for image management.

Table of Contents

  1.Project Overview
  2.Features
  3.Tech Stack
  4.Installation & Setup
  5.Usage
  6.Folder Structure
  7.API Endpoints
  8.Deployment
  9.Future Enhancements
  10.Contributing
  11.License


Project Overview

InstaStay allows users to:

  Browse hotels by city or destination
    View hotel details and availability
    Book rooms and make secure payments
    Manage their bookings and view history
    
  The admin panel allows hotel owners or admins to:
    Add, update, and delete hotels
    View bookings and manage availability
    
  This platform is mobile-friendly and optimized for fast performance.

Features
  User Authentication & Authorization (Signup/Login)
  Search hotels by city, availability, or price
  Detailed hotel page with images, amenities, and reviews
  Secure payment integration with Stripe
  Image management using Cloudinary
  Responsive design for desktop and mobile
  Admin panel to manage hotels and bookings

Tech Stack
  Frontend: React.js, Bootstrap, CSS3  
  Backend: Node.js, Express.js
  Database: MongoDB (Atlas)
  Authentication: JWT (JSON Web Tokens)
  Payment Gateway: Stripe
  Image Hosting: Cloudinary
  Deployment: Vercel (Frontend), Render (Backend)


Installation & Setup

  1.Clone the repository:
      git clone https://github.com/PranayPatel12/InstaStay.git
      cd InstaStay
  2.Setup Backend:
      cd backend
      npm install
      
    Create a .env file and add:

      MONGO_URI=<Your MongoDB Atlas URI>
      JWT_SECRET=<Your JWT Secret Key>
      STRIPE_SECRET_KEY=<Your Stripe Secret Key>
      CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
      CLOUDINARY_API_KEY=<Your Cloudinary API Key>
      CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>

    Start the backend server:
      npm run dev

  3. Setup Frontend:

     cd ../frontend
     npm install

     Update .env with:
       VITE_BASE_URL=http://localhost:5000/api
       VITE_BASE_STRIPE_PUBLIC_KEY=<Your Stripe Public Key>

    Start the frontend:
      npm start

Usage

  Navigate to the homepage to search for hotels
  Click on a hotel to view details
  Login/Signup to book rooms
  Make payments via Stripe
  Admin can log in to manage hotels and view bookings


Folder Structure

  InstaStay/
    │
    ├── backend/             # Node.js + Express backend
    │   ├── controllers/     # API controllers
    │   ├── models/          # Mongoose models
    │   ├── routes/          # API routes
    │   ├── middlewares/     # Auth & error handling
    │   └── server.js
    │
    ├── frontend/            # React frontend
    │   ├── src/
    │   │   ├── components/  # Reusable components
    │   │   ├── pages/       # App pages
    │   │   ├── context/     # Context API for state management
    │   │   └── App.jsx
    │   └── package.json
    │
    └── README.md

API Endpoints

  User Routes:
    POST /api/auth/signup - Register user
    POST /api/auth/login - Login user
    GET /api/hotels - Get all hotels
    GET /api/hotels/:id - Get hotel details
    POST /api/bookings - Create a booking

  Admin Routes:
    POST /api/hotels - Add a new hotel
    PUT /api/hotels/:id - Update hotel
    DELETE /api/hotels/:id - Delete hotel
    GET /api/bookings - Get all bookings

Deployment
  Frontend: Deployed on Vercel
  Backend: Deployed on Render
  Database: Hosted on MongoDB Atlas


Future Enhancements
  User reviews and ratings for hotels
  Filter hotels by amenities, ratings, and price
  Multi-language support
  Email notifications for booking confirmations
  Integration with Google Maps for hotel locations


Contributing
  Contributions are welcome! Please follow these steps:
  Fork the repository
  Create a new branch (git checkout -b feature/your-feature)
  Commit your changes (git commit -m "Add feature")
  Push to the branch (git push origin feature/your-feature)
  Open a pull request


License
  This project is licensed under the MIT License.
  
Preview 
  https://insta-stay-topaz.vercel.app/
