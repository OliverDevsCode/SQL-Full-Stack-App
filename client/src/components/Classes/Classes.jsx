import React from 'react'
import ClassCard from '../ClassCard/ClassCard'

const Classes = ({classes}) => {
  console.log(`Classes:`)
  console.log(classes)
  return (
    <div className='Classes'>
        <div className="timetable-column">
          {classes.map((classes) => (
            <ClassCard
              subject={classes.name}
              class_name={classes.class_name}
            />
          ))}
        </div>
    </div>
  )
}

export default Classes