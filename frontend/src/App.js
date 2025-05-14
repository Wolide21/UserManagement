import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Login Page component
import UserTable from './components/UsersTable'; // User Table component
import AddUser from './components/AddUser'; // Add User component
import Navbar from './components/Navbar'; // Navbar component
import UpdateUser from './components/UpdateUser';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Define the login route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Define a protected route for UserTable */}
          <Route path="/" element={<PrivateRoute element={<UserTable />} />} />

          {/* Add User route */}
          <Route path="/add" element={<AddUser />} />

          {/* update user route */}
          <Route path="/update/:id" element={<UpdateUser />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
