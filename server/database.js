var mysql = require('mysql');

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(function(err) {
  if (err) throw err;
  console.log(`Connected to SQL Database! HOST:${process.env.DB_HOST}`);

});

module.exports = db;
