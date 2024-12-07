import React, { useState } from "react";

const EditProfile = ({ profile, onSave }) => {
  const [localProfile, setLocalProfile] = useState({
    name: profile.name,
    email: profile.email,
    password: profile.password,
    confirmPassword: profile.confirmPassword
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProfile({
      ...localProfile,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localProfile);
  };

  return (
    <div className="col-md-9">
      <div className="card">
        <div className="card-header bg-dark text-white text-center">
          <h5 className="mb-0">Edit Profile</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={localProfile.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={localProfile.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={localProfile.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={localProfile.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
