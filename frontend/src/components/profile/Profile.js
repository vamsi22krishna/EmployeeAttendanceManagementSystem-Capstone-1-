import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function UserProfile() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    if (!loginId) {
      navigate('/login');
    }
    fetchProfile(loginId);
  }, [navigate]);

  const fetchProfile = (loginId) => {
    axios.get(`http://localhost:8080/api/userinfo/profile/${loginId}`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => console.error('Error fetching profile:', error));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar-container">
          <img className="profile-avatar" alt={profile.firstName} src="./images/profile.png" />
        </div>
        <div className="profile-details">
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p><strong>Email:</strong> {profile.userEmail}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Salary:</strong> ${profile.salary}</p>
          <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
