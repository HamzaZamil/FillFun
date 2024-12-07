import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import RecentActivity from "./RecentActivity";
import EditProfile from "./EditProfile";
import Swal from 'sweetalert2'; // Import SweetAlert2

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
    const userId = localStorage.getItem('user_id');

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
    const userId = localStorage.getItem('user_id');

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

  const handleSaveProfile = (updatedProfile) => {
    const userId = localStorage.getItem('user_id'); // Replace with dynamic user ID

    // Prepare the data to send to the server
    const dataToUpdate = {
      name: updatedProfile.name,
      email: updatedProfile.email,
      password: updatedProfile.password,
      password_confirmation: updatedProfile.confirmPassword
    };

    // Only include the password if it has been changed
    if (updatedProfile.password === "********") {
      delete dataToUpdate.password;
      delete dataToUpdate.password_confirmation;
    }

    axiosInstance
      .put(`/users/${userId}`, dataToUpdate)
      .then((response) => {
        const user = response.data.user;
        setProfile({
          name: user.name,
          email: user.email,
          password: "********", // Mask password for security
          confirmPassword: "********" // Mask password for security
        });
        setView("profile"); // Show profile after saving

        // Show SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully.',
          confirmButtonText: 'OK'
        });
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
      <div className="container my-4">
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
