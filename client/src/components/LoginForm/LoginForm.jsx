import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className='wrapper' >
      <form action = "">
        <h1>Login</h1>
        <div className='input-box'>
          <input type = 'text' placeholder='Username' required></input>
        </div>
        <div className='input-box'>
          <input type = 'password' placeholder='Password' required></input>
        </div>

        <div className='remember'>
          <label><input type='checkbox'></input>Remember me</label>
        </div>

        <button type = 'submit'>Login</button>
          <p>Don't have an account? <a href='#'>Register</a></p> 
          {/* change href top point to the register section later */}
      </form>
      </div>
  );
};

export default LoginForm