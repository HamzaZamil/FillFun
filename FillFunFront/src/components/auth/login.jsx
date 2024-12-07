// src/components/LoginPage.jsx
import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import "../../index.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
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
      const response = await axiosInstance.post('/login', formData);
      setServerMessage(response.data.message);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
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
            alt="Login illustration"
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
            <h2 className="mb-4 text-center">Login</h2>

            <MDBInput
              wrapperClass="mb-3"
              label="Email address"
              id="formControlLg"
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
              id="formControlLg"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              size="lg"
            />
            {errors.password && (
              <p className="text-danger small">{errors.password}</p>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="#!" className="small">
                Forgot password?
              </a>
            </div>

            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Login
              </button>
              <p className="small mt-3">
                Don't have an account?{' '}
                <a href="#!" className="link-danger">
                  Register
                </a>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
