
var mysql = require('mysql');

var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Rohan@123504",
          database : "blogs"
});

con.connect(function(err) {
           if (err) throw err;
          console.log("Connected!");
});

module.exports = con