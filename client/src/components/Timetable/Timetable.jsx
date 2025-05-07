import React from 'react';
import LessonCard from '../LessonCard/LessonCard';

// Utility to break an array into subarrays of length `size`
function chunkArray(arr, size) {

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

let flat = arr.flat();

flat.sort((a, b) => {
  const dayDiff = dayOrder.indexOf(a.Day) - dayOrder.indexOf(b.Day);
  if (dayDiff !== 0) return dayDiff;
  return a.Period - b.Period;
});

  const out = [];
  for (let i = 0; i < flat.length; i += size) {
    out.push(flat.slice(i, i + size));
  }
  return out;
}

const Timetable = ({ lessons }) => {
  // Split into columns of 5
  const columns = chunkArray(lessons, 5);

  return (
    <div className="timetable">
      {columns.map((col, colIdx) => (
        <div className="timetable-column" key={colIdx}>
          {col.map((lesson, idx) => (
            <LessonCard
              key={lesson.id ?? idx}
              period={lesson.Period}
              subject={lesson.title}
              teacher={lesson.teacherName}
              location={lesson.location}
            />
          ))}
        </div>
      ))}
    </div>
  );
};


export default Timetable;