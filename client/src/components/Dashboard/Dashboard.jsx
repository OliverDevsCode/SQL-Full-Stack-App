import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  Navbar  from '../Navbar/Navbar';
import  Timetable  from '../Timetable/Timetable';
import  ProfileCard  from '../ProfileCard/ProfileCard';


import './Dashboard.css';

export default function Dashboard() {
  const [active, setActive] = useState('timetable');
  const [lessons, setLessons] = useState([]);
  const [profile, setProfile] = useState({});
  const [UserId, setUserId] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/api/dashboard/data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const { data, user } = await res.json();
      console.log(data)
      console.log(user)
      setLessons(data.lessons);
      setProfile(data.profile);
      setUserId(user.user_id)
    }
    fetchData();
  }, []);

  function logout(){  
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true });
    
  }

  return (
    <div className="dashboard">
      <Navbar active={active} onNavigate={setActive} logout={() => logout()} />
      <main>
        {active === 'timetable' && <Timetable lessons={lessons} />}
        {active === 'profile' && <ProfileCard profile={profile} UserId={UserId} />}
      </main>
    </div>
  );
}
