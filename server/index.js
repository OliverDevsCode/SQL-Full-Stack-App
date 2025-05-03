// index.js
const express = require('express');
const path = require('path');
const app = express();
const hostname = '127.0.0.1';
const port = 5000;

const studentRoute = require('./routes/students.js')

app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/students', studentRoute);  


// centralized error handler
app.use((err, req, res, next) => {
  console.error(`Error: ${err.stack}`);
  res.status(500).json({ error: err.message });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
