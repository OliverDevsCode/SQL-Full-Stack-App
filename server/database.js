var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "nodeAccount",
  password: "node123!",
  database: 'school'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to SQL Database!");

});

module.exports = db;
