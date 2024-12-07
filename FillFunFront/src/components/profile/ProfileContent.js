import React from "react";
import ProjectProgressCard from "./ProjectProgressCard";

const ProfileContent = ({ name, email, password }) => (
  <div className="col-md-9">
    <div className="card mb-4">
      <div className="card-header bg-dark text-white text-center">
        <h5 className="mb-0">User Information</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">Bio Graph</h5>
        <div className="row">
          <div className="col-md-6">
            <strong>Name:</strong> {name || "Loading..."}
          </div>
          <div className="col-md-6">
            <strong>Email:</strong> {email || "Loading..."}
          </div>
          <div className="col-md-6">
            <strong>Password:</strong> {password || "Loading..."}
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
