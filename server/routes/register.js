const express = require('express');
const router = express.Router();  // Corrected this line

const db = require('../database.js');
const crypto = require('crypto');


function getHash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

function padTo4(num) {
  return String(num).padStart(4, '0');
}

router.get('/register', async(req,res) => {
  //fetch classes in database and subject names
  const statement = `
  SELECT 
  classes.ClassId as id,
  classes.class_name as class,
  subjects.name as subject
  FROM classes
  INNER JOIN subjects on classes.SubjectId = subjects.SubjectId;
  `;
  db.query(statement, (err, results) => {

    if (err) {
    // log errors - returns to free server
    console.error('DB error:', err);
    return next(err);
    }


    console.log('Classes Found');
    const classes = results 

    if (results.length > 0) {

      const form_statment = `
      SELECT 
      FormId as id,
      name
      FROM form`;
      db.query(form_statment, (err, results) => {
      if (err) {
        console.error('❌ DB error:', err);
        return;
      }
      const forms = results
      // results is an array of row objects
      return res.status(200).json({ message: "Classes Found", classes: classes, forms: forms });
    });
      // process data
    } else {
      return res.status(404).json({ message: "No Classes" });
    }
  })
});

router.post('/register', async(req,res) => {
  const {firstname, surname, password, classes, form} = req.body;
  console.log(`Recived Request: name: ${firstname} ${surname} classes: ${classes} form: ${form}`)
  const password_hash = getHash(password);
  const statement = `
    INSERT INTO users
    (email,password_hash,firstname,surname,FormId,role)
    VALUES (?,?, ?, ?, ?, ?);`;
  const params = [
    '',
    password_hash,
    firstname,
    surname,
    form, 
    'student'   
  ];

  //insert user
  db.query(statement, params, (err, results) => {
  if (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Failure Creating User' });
  }
  const UserId = results.insertId;            // e.g. 9
  const email  = `${padTo4(UserId)}@GeekSchool.com`; // "0009@GeekSchool.com"
  const updateSql = `
  UPDATE users
  SET email = ?
  WHERE UserId = ?;
  `;

  //insert email
  db.query(updateSql, [email, UserId],(err,results) => {
    if(err){
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Failure Creating Email' });
    }

    //insert into enrollment
    let enrollment_data = [];
    for(let i=0; i < classes.length;i++){
      const row = [UserId,classes[i]]
      enrollment_data.push(row)
    }

    const enrollment_sql = `
    INSERT INTO enrollments (UserId, ClassId)
    VALUES ?
    `;

    db.query(enrollment_sql, [enrollment_data], (err, result) => {
    if (err){
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Failure Creating Enrollment' });
    };
    console.log('Inserted rows:', result.affectedRows);
    res.json({ message: "Successful Creation ", UserId: UserId });
    });
  })
});
})


module.exports = router;