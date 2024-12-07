import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import RecentActivity from "./RecentActivity";
import EditProfile from "./EditProfile";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [gameHistory, setGameHistory] = useState([]);
  const [view, setView] = useState("profile"); // profile, recentActivity, editProfile

  useEffect(() => {
    const userId = 1; // Replace with dynamic user ID

    axiosInstance
      .get(`/profile/${userId}`)
      .then((response) => {
        const user = response.data.user; // Access the user object
        setProfile({
          name: user.name,
          email: user.email,
          password: "********", // Mask password for security
          confirmPassword: "********" // Mask password for security
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const fetchGameHistory = () => {
    const userId = 1; // Replace with dynamic user ID

    axiosInstance
      .get(`/board/getHistory`, {
        params: {
          user_id: userId,
        },
      })
      .then((response) => {
        setGameHistory(response.data.history);
        setView("recentActivity"); // Show recent activity
      })
      .catch((error) => {
        console.error("Error fetching game history:", error);
      });
  };

  const showProfile = () => {
    setView("profile"); // Show profile content
  };

  const showEditProfile = () => {
    setView("editProfile"); // Show edit profile form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const userId = 1; // Replace with dynamic user ID

    // Prepare the data to send to the server
    const updatedProfile = {
      name: profile.name,
      email: profile.email,
      password: profile.password,
      password_confirmation: profile.confirmPassword
    };

    // Only include the password if it has been changed
    if (profile.password === "********") {
      delete updatedProfile.password;
      delete updatedProfile.password_confirmation;
    }

    axiosInstance
      .put(`/users/${userId}`, updatedProfile)
      .then((response) => {
        const user = response.data.user;
        setProfile({
          name: user.name,
          email: user.email,
          password: "********", // Mask password for security
          confirmPassword: "********" // Mask password for security
        });
        setView("profile"); // Show profile after saving
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  return (
    <div className="bg-light">
      <div className="page-title dark-background" data-aos="fade">
        <div className="p-5">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <p className="mb-0"></p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <h1>Profile Page</h1>
          </div>
        </nav>
      </div>
      <div className="container mt-4">
        <div className="row">
          <ProfileSidebar
            name={profile.name}
            email={profile.email}
            onProfileClick={showProfile}
            onRecentActivityClick={fetchGameHistory}
            onEditProfileClick={showEditProfile}
          />
          {view === "recentActivity" ? (
            <RecentActivity gameHistory={gameHistory} />
          ) : view === "editProfile" ? (
            <EditProfile
              profile={profile}
              onChange={handleInputChange}
              onSave={handleSaveProfile}
            />
          ) : (
            <ProfileContent
              name={profile.name}
              email={profile.email}
              password={profile.password}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
