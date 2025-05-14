import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/styles.css';

function UpdateUser() {
  const [formData, setFormData] = useState({
    // Initialize with empty strings to avoid undefined errors
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    userNotes: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User ID from params:', id);

    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        console.log('Fetched user data:', response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        setErrorMessage('Error fetching user details');
        console.error('Fetch error:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/api/users/${id}`, formData)
      .then(() => {
        console.log('User updated successfully');
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage('Error updating user details');
        console.error('Update error:', error);
      });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Edit User</h2>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address1" className="form-label">Address Line 1</label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address2" className="form-label">Address Line 2</label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Mobile Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                  pattern="[0-9]{10}"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

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
                <label htmlFor="userNotes" className="form-label">Notes</label>
                <textarea
                  id="userNotes"
                  name="userNotes"
                  value={formData.userNotes}
                  onChange={handleChange}
                  className="form-control"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-custom w-100 mt-3">
                Update user
              </button>
            </form>
    </div>
  );
}

export default UpdateUser;
