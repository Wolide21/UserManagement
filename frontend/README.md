README File
Project Title: MERN Full-Stack User Management System

Description: A full-stack application for managing user data, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to perform CRUD operations, authenticate securely, and view/manage data via an interactive data grid.

Features

User Authentication (Login/Logout) with JWT.
CRUD Operations: Add, view, edit, and delete user data.
Responsive Design using Bootstrap.
Dynamic Grid with AG Grid for sorting, filtering, and pagination.
Real-time validation on forms.
Technologies Used

Front-End: React.js, Axios, AG Grid, Bootstrap.
Back-End: Node.js, Express.js.
Database: MongoDB (Atlas).
Authentication: JSON Web Token (JWT).
Utilities: Faker.js for mock data generation.
Setup Instructions

Clone the repository.
Install dependencies:
bash
Copy code
npm install
cd frontend && npm install
Configure environment variables in .env:
makefile
Copy code
MONGO_URI=your_mongo_atlas_uri
JWT_SECRET=your_jwt_secret
Run the development servers:
Backend: npm start
Frontend: cd frontend && npm start
How to Use

Access the app at http://localhost:3000/.
Login using valid credentials.
user:- anirav52@gmail.com   
pas:- 1234456
Navigate to:
Add User: Create new user entries.
View Users: Manage user data using the dynamic grid.
Edit/Delete: Use buttons in the grid to update or remove user records.