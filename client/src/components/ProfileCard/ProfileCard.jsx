import React from 'react'
import './ProfileCard.css';

const ProfileCard = ({ profile, UserId }) => {
  console.log("Profile Recieved:")
  console.log(profile)
  return (
    <div className="profile-card">
      <p>Account ID: {UserId}</p>
      <p>Name: {profile.firstName + " "+ profile.surname}</p>
      <p>Form: {profile.formName}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
}

export default ProfileCard