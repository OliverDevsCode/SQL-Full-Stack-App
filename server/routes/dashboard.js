const express = require('express');
const router = express.Router();  // Corrected this line

const db = require('../database.js');
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/data', authenticateJWT, (req, res, next) => {
  const userId = req.user.user_id;

  // load profile
  const profileSql = `
    SELECT 
      users.email,
      users.firstName,
      users.surname,
      form.name AS formName
    FROM users
    INNER JOIN form ON users.FormId = form.FormId
    WHERE users.UserId = ?;
  `;

  db.query(profileSql, [userId], (err, profileResults) => {
    if (err) return next(err);

    // load lessons
    const lessonsSql = `
    SELECT
      l.title,
      l.location, 
      l.Period,
      l.Day,
      CONCAT(LEFT(u.firstName, 1), '. ', u.surname) AS teacherName
    FROM enrollments AS e
    INNER JOIN classes AS c
      ON e.ClassId = c.ClassId
    INNER JOIN lessons AS l
      ON l.ClassId = c.ClassId
    INNER JOIN users AS u
      ON l.TeacherId = u.UserId
    WHERE
      e.UserId = ?;
  `;

    
    db.query(lessonsSql, [userId], (err, lessonsResults) => {
      if (err) return next(err);

      // Now we have both profileResults and lessonsResults load classesResults:

      const classesSQL = `
        SELECT s.name, c.class_name
        FROM enrollments e
        JOIN classes c ON e.ClassId = c.ClassId
        JOIN subjects s ON c.SubjectId = s.SubjectId
        WHERE e.UserId = ?;
        `;
       
      db.query(classesSQL, [userId], (err,classesResults)=>{
        if (err) return next(err);

        res.json({
        message: 'This is protected data.',
        user: req.user,
        data: {
          profile: profileResults[0],   // single object
          lessons: lessonsResults,       // array of lesson objects
          classes: classesResults
        }
      });
        
      }); // classes DB query 
    });// lessons DB query 
  }); //profile DB query 
});

module.exports = router;