import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          User Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/add">
                    Add User
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
