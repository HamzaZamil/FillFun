import React from "react";

const EditProfile = ({ profile, onChange, onSave }) => (
  <div className="col-md-9">
    <div className="card mt-4">
      <div className="card-header bg-success text-white text-center">
        <h5 className="mb-0">Edit Profile</h5>
      </div>
      <div className="card-body">
        <form onSubmit={onSave}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={profile.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={profile.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={profile.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
);

export default EditProfile;
