import React from 'react';
import LessonCard from '../LessonCard/LessonCard';

const Timetable = ({ lessons }) => {
  return (
    <div className="timetable">
      {lessons.map((lesson, idx) => (
        <LessonCard
          key={idx}                  // or lesson.id if you have one
          period={lesson.Period}     // map Period → period
          subject={lesson.title}     // map title  → subject
          teacher={lesson.teacherName} // map teacherName → teacher
          location={lesson.location} // map location → location
        />
      ))}
    </div>
  );
}

export default Timetable;