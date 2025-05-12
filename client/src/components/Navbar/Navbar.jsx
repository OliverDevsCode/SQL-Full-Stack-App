import React from 'react'

import { SlCalender } from "react-icons/sl";
import { PiStudentFill } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { SiGoogleclassroom } from "react-icons/si";

import './Navbar.css';

// Props: active (string), onNavigate (function), logout (function)
const Navbar = ({ active, onNavigate, logout }) => {
  const navItems = [
    { key: 'timetable', label: 'Timetable', icon: <SlCalender /> },
    { key: 'classes', label: 'Classes', icon: <SiGoogleclassroom /> },
    { key: 'profile', label: 'Profile', icon: <PiStudentFill /> }
  ];

  return (
    <nav className="navbar">
      {navItems.map(item => (
        <button
          key={item.key}
          className={active === item.key ? 'nav-btn active' : 'nav-btn'}
          onClick={() => onNavigate(item.key)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
      <button className="nav-btn logout" onClick={logout}>
        <CiLogout />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;