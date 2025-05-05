import React from 'react'

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <p>ID: {profile.id}</p>
      <p>DOB: {profile.dob}</p>
      <p>{profile.email}</p>
    </div>
  );
}

export default ProfileCard