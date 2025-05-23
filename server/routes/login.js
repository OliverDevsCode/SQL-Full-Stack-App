const express = require('express');
const router = express.Router();  // Corrected this line

const db = require('../database.js');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');


function getHash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

router.post('/login',async(req,res)=>{
  const { username , password, rememberMe} = req.body

  // console.log(`received username:${username}, password:${password}, rememberMe: ${rememberMe}`) // only use in local testing

  //checking username/password

  if(!username){
    return res
    .status(400)
    .json({message: "username not added"})
  }

  if(!password){
    return res
    .status(400)
    .json({message: "password not added"})
  }

  //logic for authentication
  const login_password_Hash = getHash(password);
  console.log(`Password Hash = ${login_password_Hash}`)

  const statement = `SELECT * FROM users WHERE UserId = ?`;
  db.query(statement, [username], (err, results) => {
    if (err) return next(err);
    console.log(results)
    
    //only check is results appear
    if(results.length > 0){
      const storedHash = results[0].password_hash;
      if(login_password_Hash == storedHash){

        const payload = { user_id: results[0].UserId, email: results[0].email };

        // Choose token lifetime
        const expiresIn = rememberMe ? '30d' : '1h';

        // Sign the JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

        return res.status(200).json({
          message: "Login successful",
          token: token
        });

      }else{
        return res.status(401)
        .json({message: "Credentials Incorrect"})
        //password wrong
      }
    }else{
      return res.status(404)
        .json({message: "Credentials Incorrect"})
        //Username wrong

    }
    
  });


  

})

module.exports = router;