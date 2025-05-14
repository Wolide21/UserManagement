import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post('/api/users/login', formData)
      .then((response) => {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        navigate('/');  // Redirect to home after successful login
      })
      .catch((error) => {
        // Display error message if login fails
        setErrorMessage('Invalid email or password');
      });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="custom-card shadow">
            <h2 className="text-center mb-4">Login</h2>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
            </form>
                {/* Link to Add User (Registration) page */}
                <p className="text-center mt-3">
              Don't have an account?{' '}
              <a href="/add" className="text-primary">
                Create a new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
