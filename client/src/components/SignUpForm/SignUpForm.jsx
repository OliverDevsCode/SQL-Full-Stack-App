import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RotateLoader } from "react-spinners";

import './SignUpForm.css';


const SignUpForm = () => {

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [tryRegister, setTryRegister] = useState(false);
  const [classes, setClasses] = useState([])
  const [forms, setForms] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedForm, setSelectedForm] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  

  useEffect( () =>{
        //check if already logged in
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

    }, [navigate])
    
    //get classes
    useEffect(()=>{
      const fetchClasses = async () => {
          console.log("Trying to fetch classes")
          try {
            const reponse = await axios.get('http://localhost:5000/api/register');
            const classes = reponse.data.classes
            const forms = reponse.data.forms
            setClasses(classes)
            setForms(forms)

          } catch (error) {
            console.log(error)
            console.log("failed to fetch classes")
          }
        };
        fetchClasses();
    },[])

    if (checkingAuth || tryRegister) {
        return (
          <div className="spinner-container">
            <RotateLoader loading={true} color="#36d7b7" size={30} />
          </div>
        );
    }

    if (registrationSuccess) {
    return (
      <div className='created-login'>
        <div className='box'>
        <h1>Account Created!</h1>
        <h2>UserId: {registrationSuccess}</h2>
        <button className="button" onClick={() => navigate('/login')}>Login Now!</button>
        </div>
      </div>
    );
  }

  const MAX_SUBJECTS = 4;
  const MAX_FORMS = 1;

  const toggleSubject = (subjectId) => {
  setSelectedSubjects(prev => {
    if (prev.includes(subjectId)) {
      // It was already selected - remove it
      return prev.filter(id => id !== subjectId);
    } else if (prev.length < MAX_SUBJECTS) {
      // Not yet selected and add it
      return [...prev, subjectId];
    }
    // max num do nothing
    return prev;
  });
  };

  const toggleForm = (FormId) => {
  setSelectedForm(prev => {
    if (prev.includes(FormId)) {
      // It was already selected - remove it
      return prev.filter(id => id !== FormId);
    } else if (prev.length < MAX_FORMS) {
      // Not yet selected and add it
      return [...prev, FormId];
    }
    // max num do nothing
    return prev;
  });
  };


  function capitaliseFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedSubjects.length === 0){
      window.alert('Please choose at least one subject before registering');
      return;
    }
    if(selectedForm.length === 0){
      window.alert('Please choose a form before registering');
      return;
    }
    if(firstname.length === 0 || surname.length === 0 || password.length === 0){
      window.alert('Please Enter a Name and Password');
      return;
      
    }
    setTryRegister(true)
    try {
            const reponse = await axios.post('http://localhost:5000/api/register',{
              firstname: capitaliseFirstLetter(firstname.toLowerCase()),
              surname: capitaliseFirstLetter(surname.toLowerCase()),
              password,
              classes: selectedSubjects,
              form: selectedForm
            }
            );
            console.log(reponse)
            setTryRegister(false)
            setRegistrationSuccess(reponse.data.UserId);  // ✅ store the returned UserId
            

          } catch (error) {
            console.log(error)
            console.log("Failed to Create Account")
            window.alert('Failed to Create Account Please Try Again');
            setTryRegister(false)
          }
  }

  return (
    <div className='signup-container'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className='input-box'>
                  <input type='text' 
                  placeholder='Firstname'
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}>
                  </input>
            </div>
            <div className='input-box'>
                  <input type='text' 
                  placeholder='Surname'
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}>
                  </input>
            </div>
            <div className='input-box'>
                  <input type='password' 
                  placeholder='Password'
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}>
                  </input>
            </div>
            <div className='classes'>
              <fieldset>
                  <legend>Choose up to {MAX_SUBJECTS} Classes</legend>
                  {classes.map((cls) => {
                  const inputId   = `subject-${cls.id}`;              // e.g. "subject-ENG101"
                  const isChecked = selectedSubjects.includes(cls.id);
                  const isDisabled =
                    !isChecked && selectedSubjects.length >= MAX_SUBJECTS;

                  return (
                    <div key={cls.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={inputId}
                        name="subjects"
                        value={cls.id}
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => toggleSubject(cls.id)}        // ← use cls.class here
                      />
                      <label htmlFor={inputId}> {cls.subject} {cls.class}</label> 
                    </div>
                  );
                })}

                  <p>
                    {selectedSubjects.length} / {MAX_SUBJECTS} selected
                  </p>
                </fieldset>
            </div>
            <div className='forms'>
              <fieldset>
                  <legend>Choose your Form</legend>
                  {forms.map((form) => {
                  const inputId   = `subject-${form.id}`;              // e.g. "subject-ENG101"
                  const isChecked = selectedForm.includes(form.id);
                  const isDisabled =
                    !isChecked && selectedForm.length >= MAX_SUBJECTS;

                  return (
                    <div key={form.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={inputId}
                        name="form"
                        value={form.id}
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => toggleForm(form.id)}        // ← use form.class here
                      />
                      <label htmlFor={inputId}> {form.name}</label> 
                    </div>
                  );
                })}

                  <p>
                    {selectedForm.length} / {MAX_FORMS} selected
                  </p>
                </fieldset>
            </div>
            <button type='submit'>Register</button>
            <div className='login-link'>
              <p>Already have an account? <a href='/login'>Login</a></p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm