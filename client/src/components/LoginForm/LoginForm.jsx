import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { RotateLoader } from "react-spinners";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate(); 
  const [rememberMe, setRememberMe] = useState(false);

  // Check if the token is valid
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setCheckingAuth(false);
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.get('http://localhost:5000/api/auth/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate('/dashboard', { replace: true });
      } catch (error) {
        localStorage.removeItem('authToken');
        setCheckingAuth(false);
      }
    };

    verifyToken();
  }, [navigate]);

  // Show spinner when checking auth or logging in
  if (checkingAuth || isLoggingIn) {
    return (
      <div className="spinner-container">
        <RotateLoader loading={true} color="#36d7b7" size={30} />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password, rememberMe })
        })
        .then(async res => {
          const data = await res.json();
          
          if (!res.ok) {
            // Handle status-specific errors
            window.alert(data.message || 'Login failed');
            throw new Error(data.message); // Ensure .catch is triggered
          }

          const token = data.token;
          localStorage.setItem('authToken', token);
          navigate('/dashboard', { replace: true });
        })
        .catch(error => {
          console.error('Login error:', error);
          setIsLoggingIn(false);
});
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Username' 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className='icon'/>
          </div>
          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Password'
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className='icon'/>
          </div>
          <div className='remember'>
            <label>
              <input type='checkbox'
              value={rememberMe}
              onChange= {(e)=> setRememberMe(e.target.checked)}
              />Remember me
            </label>
          </div>
          <button type='submit'>Login</button>
          <div className='register-link'>
            <p>Don't have an account? <a href='/register'>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;