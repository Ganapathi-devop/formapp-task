const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

//database connection
const conn= mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_validatore1",
  password: "ty57Jh$GC9pcATD",
  database: "freedb_userStorage",
});

conn.connect((err) => {
  if (err) throw err;

  console.log("database connected");
});


//starting app
var app = express();
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/users", function (req, res) {
  // Executing the MySQL query (select all data from the 'userdata' table).
  conn.query("SELECT * FROM userdata", function (error, results, fields) {
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    console.log(results);
    console.log(fields);
    res.send(results);
  });
});


var server = app.listen(6566, () => {
    //  console.log('Go to http://localhost:3000/users so you can see the data.');
    var host = server.address().address;
    var port = server.address().address;
  });