import './App.css';
import React from 'react';
import CreateAccountButton from './components/CreateAccountButton';

function App() {

  fetch('/students/selectAll')
    .then(res => res.json())
    .then(data => {
        console.log('Results:', data);  // Log the data to the console
    })
    .catch(err => console.log('Error:', err));  // Log any errors if the fetch fails


  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Geek School</h1>
        <CreateAccountButton />
      </header>
    </div>
  );
}

export default App;
