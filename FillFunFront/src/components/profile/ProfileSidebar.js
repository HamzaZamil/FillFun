import React from "react";

const ProfileSidebar = ({ name, email, onProfileClick, onRecentActivityClick, onEditProfileClick }) => (
  <div className="col-md-3">
    <div className="card">
      <div className="card-header bg-white text-center">
        <img
          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          alt=""
          className="rounded-circle mb-3"
          width="100"
        />
        <h5 className="mb-0">{name || "Loading..."}</h5>
        <p className="mb-0">{email || "Loading..."}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <a
            href="#"
            className="text-decoration-none text-dark"
            onClick={onProfileClick}
          >
            <i className="fa fa-user me-2"></i> Profile
          </a>
        </li>
        <li className="list-group-item">
          <a
            href="#"
            className="text-decoration-none text-dark"
            onClick={onRecentActivityClick}
          >
            <i className="fa fa-calendar me-2"></i> Recent Activity
          </a>
        </li>
        <li className="list-group-item">
          <a
            href="#"
            className="text-decoration-none text-dark"
            onClick={onEditProfileClick}
          >
            <i className="fa fa-edit me-2"></i> Edit Profile
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default ProfileSidebar;
