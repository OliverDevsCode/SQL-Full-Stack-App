import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form reload behavior

    // You can log the data or send it to an API
    console.log('Submitted:', { username, password });


    fetch(' http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='wrapper' >
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type = 'text' placeholder='Username' required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ></input>
          <FaUser className='icon'/>
        </div>
        <div className='input-box'>
          <input type = 'password' placeholder='Password' required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ></input>
          <FaLock className='icon'/>
        </div>

        <div className='remember'>
          <label><input type='checkbox'></input>Remember me</label>
        </div>

        <button type = 'submit'>Login</button>

        <div className='register-link '>
        <p>Don't have an account? <a href='/register'>Register</a></p> 
        {/* change href top point to the register section later */}
        </div>
          
      </form>
      </div>
  );
};

export default LoginForm