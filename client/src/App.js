import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';

function App() {

  //testing that server works
  fetch('/students/selectAll')
    .then(res => res.json())
    .then(data => {
        console.log('Results - all students:', data);  // Log the data to the console
    })
    .catch(err => console.log('Error:', err));  // Log any errors if the fetch fails
  //test ends   

  return (
    <div className="App">
      <LoginForm/>
    </div>
  );
}

export default App;
