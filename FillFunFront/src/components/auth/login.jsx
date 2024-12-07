

// src/components/LoginPage.jsx
import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
//   MDBBtn,
//   MDBIcon,
  MDBInput,
  MDBCheckbox
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
    <MDBContainer fluid className="p-3  h-custom" style={{maxHeight:'53vh', marginTop:'152px'}}>
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample"
          />
        </MDBCol>

        <MDBCol col="4" md="6" className="p-5">
          <form onSubmit={handleSubmit}>
       

          

            {serverMessage && (
              <p className="text-center text-danger">{serverMessage}</p>
            )}
                <h1 style={{marginBottom:'80px'}}>Login</h1>
            <MDBInput 
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
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
              id="formControlLg"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              size="lg"
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="#!">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <button type="submit"  size="lg">
                Login
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
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
