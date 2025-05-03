const express = require('express');
const router = express.Router();  // Corrected this line

const db = require('../database.js');

router.get('/selectAll', (req, res, next) => {
  const statement = `SELECT * FROM users WHERE role = "student"`;
  db.query(statement, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

module.exports = router;
