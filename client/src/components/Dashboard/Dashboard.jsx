import { useState, useEffect } from 'react';
import  Navbar  from '../Navbar/Navbar';
import  Timetable  from '../Timetable/Timetable';
import  ProfileCard  from '../ProfileCard/ProfileCard';

import './Dashboard.css';

export default function Dashboard() {
  const [active, setActive] = useState('timetable');
  const [lessons, setLessons] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/api/dashboard/data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const { data, user } = await res.json();
      console.log(data)
      setLessons(data.lessons);
      setProfile(user.profile);
    }
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Navbar active={active} onNavigate={setActive} logout={() => {/* logout logic */}} />
      <main>
        {active === 'timetable' && <Timetable lessons={lessons} />}
        {active === 'profile' && <ProfileCard profile={profile} />}
      </main>
    </div>
  );
}
