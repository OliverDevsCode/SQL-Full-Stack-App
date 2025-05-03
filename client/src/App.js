import './App.css';

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
        <h1>Welcome to Login Home Screen</h1>
      </header>
    </div>
  );
}

export default App;
