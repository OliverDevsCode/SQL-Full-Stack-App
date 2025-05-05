import React from 'react'

const Dashboard = () => {

    //requesting data for UI elements
    const token = localStorage.getItem('authToken');

    // Call your protected endpoint
    fetch('http://localhost:5000/students/protected-data', {
      method: 'GET',                     // or 'POST', etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // <-- include the JWT here
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(data => {
        console.log('Protected data:', data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        // If 401/403, you can navigate back to /login here
      });

  return (
    <div>Dashboard</div>
  );
};

export default Dashboard