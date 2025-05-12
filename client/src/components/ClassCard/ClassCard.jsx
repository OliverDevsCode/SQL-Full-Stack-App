import React from 'react'
// import { useState, useEffect } from 'react';
import './ClassCard.css';

const ClassCard = ({subject, class_name}) => {
  return (
    <div className='ClassCard'>
      <h1>{subject}</h1>
      <p> Class code: {class_name}</p>
    </div>
  )
}

export default ClassCard