const express = require("express");
var app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

//database connection
const conn = mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_validatore1",
  password: "ty57Jh$GC9pcATD",
  database: "freedb_userStorage",
});
// const conn = mysql.createConnection({
//     host: "sql.freedb.tech",
//     user: "freedb_validator2",
//     password: "%hk99M%9@sJHbvY",
//     database: "freedb_usersdata",
//   });

conn.connect((err) => {
  if (err) throw err;

  console.log("database connected");
});

//starting app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//to get users data
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

//  to select users data
app.post("/select", (req, res) => {
  var data = req.body;
  console.warn(data);
  conn.query("SELECT * FROM userdata WHERE  username= ?", data, (error, result) => {
    if (error) throw error;
    
    res.send(result);
  });
});


//to delete users data
app.post("/deleteuser", (req, res) => {
  var data = req.body;
  console.warn(data);
  conn.query("DELETE FROM userdata WHERE  ?", data, (error, result) => {
    if (error) throw error;

    res.send(result);
  });
});

// to update users data
app.post("/update", (req, res) => {
  var data = req.body;
  console.warn(data);
  conn.query("UPDATE userdata SET device = ? WHERE  username= ?", [data.os, data.username], (error, result) => {
    if (error) throw error;

    res.send(result);
  });
});


//to insert users data
app.post("/insertdata", (req, res) => {
  console.log(
    "SHOWING REQ BODY IN POST" +
      req.params.username +
      "  pass:" +
      req.params.password
  );
  // const username = req.body.username;s
  // const password = req.body.password;
  //   const username = 'directTEst';
  //   const password = 1;
  var data = req.body;
  console.log("SHOWING REQ IN POST" + req);
  conn.query("INSERT INTO userdata SET ?", data, (error, result) => {
    if (error) throw error;

    res.send(result);
  });
});

// Starting our server.
var server = app.listen(80, () => {
  console.log(
    "Go to http:// 192.168.29.237:19000/users so you can see the data."
  );
});
