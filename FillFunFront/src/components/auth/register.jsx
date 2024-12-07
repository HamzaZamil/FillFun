// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
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
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <p className="lead fw-normal mb-0 me-3">Sign up with</p>
              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>
              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>
              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            {serverMessage && (
              <p className="text-center text-danger">{serverMessage}</p>
            )}

            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="formName"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="lg"
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}

            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="formEmail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              size="lg"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formPassword"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              size="lg"
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}

            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              id="formPasswordConfirm"
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              size="lg"
            />
            {errors.password_confirmation && (
              <p className="text-danger">{errors.password_confirmation}</p>
            )}

            <div className="text-center text-md-start mt-4 pt-2">
              <button type="submit" className="mb-0 px-5" size="lg">
                Register
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Already have an account?{' '}
                <a href="#!" className="link-danger">
                  Login
                </a>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="facebook-f" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="twitter" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="google" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="linkedin-in" size="md" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
};

export default Register;
