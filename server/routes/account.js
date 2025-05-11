const express = require('express');
const router = express.Router();
const db = require('../database.js');
const authenticateJWT = require('../middleware/authenticateJWT');

const crypto = require('crypto');
const { get } = require('http');

function getHash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

router.post('/delete',authenticateJWT, (req, res) => {
  const user = req.user
  const UserId = user.user_id
  console.log(`Request to Delete, user: ${UserId}`)
  const statement = `DELETE FROM users WHERE UserId = ?`

  db.query(statement, [UserId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({
        message: 'Failed to delete account',
        error: err.message || 'Unknown error',
      });
    }

    // If user is deleted successfully
    console.log('Deleted:', result);
    return res.status(200).json({
      message: 'Account deleted successfully',
      deleted: true,
    });
  });
})

router.post('/change-password',authenticateJWT, (req,res) => {
  const user = req.user
  const UserId = user.user_id
  const { new: newPassword, previous: previousPassword } = req.body
  console.log(`Request to Change Password, user: ${UserId}`)
  
  const previousServerHash = getHash(previousPassword);
  const newServerHash = getHash(newPassword);

  const statement = `SELECT password_hash FROM users WHERE UserId = ?`;
  db.query(statement, [UserId], (err, results) => {
    const databaseHash = results[0].password_hash
    if(databaseHash !== previousServerHash){
      return res.status(200).json({
        message: 'Existing Password Does Not Match'
      })
    }
    const statement = 'UPDATE users SET password_hash = ? WHERE UserId = ?';
    db.query(statement, [newServerHash, UserId], (err, results) => {
      if (err) {
        return res.status(500).json({
          message: 'Error Updating DB'
        });
      } else {
        console.log("Successful");
        return res.status(200).json({
          message: 'Password changed successfully',
          changed: true
        });
      }
    });

  });

})

module.exports = router;
