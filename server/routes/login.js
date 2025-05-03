const express = require('express');
const router = express.Router();  // Corrected this line

const db = require('../database.js');
const crypto = require('crypto');


function getHash(input, salt) {
  const hash = crypto.createHash('sha256');
  hash.update(input + salt);
  return hash.digest('hex');
}

router.post('/login',async(req,res)=>{
  const { email , password} = req.body

  //checking email/password

  if(!email){
    return res
    .status(400)
    .json({message: "Email not added"})
  }

  if(!password){
    return res
    .status(400)
    .json({message: "password not added"})
  }

  //logic for authentication
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = getHash(password, salt);
  console.log(`Password Hash = ${passwordHash}`)
})