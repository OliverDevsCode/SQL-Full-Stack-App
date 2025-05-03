import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';

function App() {

  fetch('/students/selectAll')
    .then(res => res.json())
    .then(data => {
        console.log('Results:', data);  // Log the data to the console
    })
    .catch(err => console.log('Error:', err));  // Log any errors if the fetch fails


  return (
    <div className="App">
      <LoginForm/>
    </div>
  );
}

export default App;
