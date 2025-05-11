const express = require('express');
const router = express.Router();  
const authenticateJWT = require('../middleware/authenticateJWT');


router.get('/verify-token', authenticateJWT, (req, res) => {
    // If it reaches here, the token is valid
    res.status(200).json({ message: 'Token is valid', user: req.user });
  });


module.exports = router;
  
