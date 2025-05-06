// index.js
const express = require('express');
const path = require('path');
const app = express();
const hostname = '127.0.0.1';
const port = 5000;
const cors = require('cors');
require('dotenv').config();

const studentRoute = require('./routes/students.js')
const loginRoute = require('./routes/login.js')
const dashboard = require('./routes/dashboard.js')
const auth = require('./routes/auth.js')

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'  // only allow React app
}));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/students', studentRoute);  
app.use('/api', loginRoute);  
app.use('/api/dashboard', dashboard);  
app.use('/api/auth', auth);  


// centralized error handler
app.use((err, req, res, next) => {
  console.error(`Error: ${err.stack}`);
  res.status(500).json({ error: err.message });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
