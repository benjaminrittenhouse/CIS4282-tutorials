//Imports dependecies being used
const express = require("express");
const cors = require("cors");

//declares an express app
const app = express();

const db = require("./connection/DbConn");

var path = require('path');
//***Middleware start***

const mysql = require('mysql');
const bodyparser = require('body-parser');

// "Cross-Origin Resource Sharing"
//allows us to make api calls
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//***Middleware end***

app.get("/", (req, res) => {
  console.log("Homepage");
});

//get all user api
app.get("/api/listAllUsers", (req, res) => {
  const sqlGet = "SELECT * FROM web_user;";
  db.query(sqlGet, (req, result) => {
    console.log("Result: " + result);
    res.send(result);
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening...");
});