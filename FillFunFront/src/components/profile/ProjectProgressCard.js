import React from "react";

const ProjectProgressCard = ({ progress, title, started, deadline }) => (
  <div className="col-md-6 mb-4">
    <div className="card p-2">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0 me-3">
            <div className="progress-circle d-flex align-items-center justify-content-center rounded-circle">
              <strong>{progress}</strong>
            </div>
          </div>
          <div>
            <h6 className="mb-1 text-dark">{title}</h6>
            <p className="mb-0">description</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectProgressCard;
