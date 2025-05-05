import React from 'react';
import './LessonCard.css';

const LessonCard = ({ period, subject, teacher, location }) => {
  return (
    <div className="lesson-card">
      <h4>Period {period}</h4>
      <h3>{subject}</h3>
      <p>{teacher}</p>
      <small>Room {location}</small>
    </div>
  );
};

export default LessonCard;