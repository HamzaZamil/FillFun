// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
} from 'mdb-react-ui-kit';
import axiosInstance from '../../api/axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (
      formData.password &&
      formData.password !== formData.password_confirmation
    )
      errors.password_confirmation = 'Passwords do not match';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('/register', formData);
      setServerMessage(response.data.message);
    } catch (error) {
      const serverErrors = error.response?.data?.errors || {};
      setErrors(serverErrors);
      setServerMessage(
        error.response?.data?.message || 'Something went wrong!'
      );
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ maxWidth: '900px', margin: 'auto' }}
    >
      <MDBRow className="w-100">
        <MDBCol md="6" className="d-none d-md-block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Register illustration"
            style={{ borderRadius: '10px' }}
          />
        </MDBCol>

        <MDBCol
          md="6"
          className="d-flex flex-column align-items-center justify-content-center p-4"
        >
          <form onSubmit={handleSubmit} className="w-100">
            {serverMessage && (
              <p className="text-center text-danger">{serverMessage}</p>
            )}
            <h2 className="mb-4 text-center">Register</h2>

            <MDBInput
              wrapperClass="mb-3"
              label="Name"
              id="formName"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="lg"
            />
            {errors.name && <p className="text-danger small">{errors.name}</p>}

            <MDBInput
              wrapperClass="mb-3"
              label="Email"
              id="formEmail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              size="lg"
            />
            {errors.email && <p className="text-danger small">{errors.email}</p>}

            <MDBInput
              wrapperClass="mb-3"
              label="Password"
              id="formPassword"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              size="lg"
            />
            {errors.password && (
              <p className="text-danger small">{errors.password}</p>
            )}

            <MDBInput
              wrapperClass="mb-3"
              label="Confirm Password"
              id="formPasswordConfirm"
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              size="lg"
            />
            {errors.password_confirmation && (
              <p className="text-danger small">{errors.password_confirmation}</p>
            )}

            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Register
              </button>
              <p className="small mt-3">
                Already have an account?{' '}
                <a href="#!" className="link-danger">
                  Login
                </a>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
