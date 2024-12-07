import React from "react";
import ProjectProgressCard from "./ProjectProgressCard";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const ProfileContent = ({ name, email, password }) => (
  <div className="col-md-9">
    <div className="card mb-4">
      <div className="card-header bg-dark text-white text-center">
        <h5 className="mb-0">User Information</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Name:</strong> {name || "Loading..."}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Email:</strong> {email || "Loading..."}</p>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Password:</strong> {password || "Loading..."}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      {/* Add more <ProjectProgressCard /> as needed */}
    </div>
  </div>
);

export default ProfileContent;
