const express = require('express');
const router = express.Router();  // Corrected this line

const db = require('../database.js');
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/protected-data', authenticateJWT, (req, res) => {
  res.json({ 
    message: 'This is protected data.',
    user: req.user,
    data: [1, 2, 3, 4]
  });
});


router.get('/selectAll', (req, res, next) => {
  const statement = `SELECT * FROM users WHERE role = "student"`;
  db.query(statement, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

module.exports = router;
