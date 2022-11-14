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
  res.send("web_user CRUD Homepage");
});

//get all user api
app.get("/api/listAllUsers", (req, res) => {
  const sqlGet = "SELECT * FROM web_user;";
  db.query(sqlGet, (req, result) => {
    console.log("Result: " + result);
    res.send(result);
  });
});

//Router to GET specific user by ID
app.get('/api/getUser/:id' , (req, res) => {
  db.query('SELECT * FROM web_user WHERE web_user_id=?',[req.params.id], (req, result) => {
    console.log("Resultt: " + result);
    res.send(result);
  })
});

//Router to GET specific user by ID
app.get('/api/getUser/:id/:email' , (req, res) => {
  db.query('SELECT * FROM web_user WHERE web_user_id=? AND user_email =?',[req.params.id, req.params.email], (req, result) => {
    console.log("Result: " + result);
    res.send(result);
  })
});

// https://www.w3resource.com/node.js/nodejs-mysql.php CHECK THIS

// api/insertUser/111/bbb@b.com/asdf1/img.jpg/100.0/2020-10-10/1
app.get("/api/insertUser/:email/:password/:image/:fee/:bday/:role", (req, res) => {
  // add insert validation ***
  // if there are no errors (string len is 0)
  try {
    const sqlIns = "INSERT INTO web_user (user_email, user_password, image, membership_fee, birthday, web_user.user_role_id) values (?,?,?,?,?,?)";
    const p = req.params;
    db.query(sqlIns,[p.email, p.password, p.image, p.fee, p.bday, p.role], (err, req, result) => {
      if(err){
        res.send(err);
        console.log("There was an error! Record not inserted!")
      } else {
        res.send(result);
        console.log("No errors! Record inserted!");
      }
    });
  } catch {
    res.send("Oh no DB error");
    console.log("console oh no db error");
  }
});

// mini test insert
app.get("/api/insertUser/:id/:email/:password/:role", (req, res) => {
  try {
    const sqlIns = "INSERT INTO web_user (web_user_id, user_email, user_password, user_role_id) values (?,?,?,?)";
    const p = req.params;
    db.query(sqlIns,[p.id, p.email, p.password, p.role], (err, req, result) => {
      if(err){
        res.send(err);
        console.log("There was an error! Record not inserted!")
      } else {
        res.send(result);
        console.log("No errors! Record inserted!");
      }
    });
  } catch {
    res.send("Oh no DB error");
    console.log("console oh no db error");
  }

});

// testing json object
// /api/insertUser2/{'web_user_id': '111', 'user_email': 'bbb@b.com', 'user_password': 'asdf1', 'image': 'img.jpg', 'membership_fee': '100.0', 'birthday': '2020-10-10', 'user_role_id': '1'}

// api/insertUser?id=555
app.get('/api/insertUser2/id=123', (req, res) => {
  //app.get("/api/insertUser/:id/:email/:password/:image/:fee/:bday/:role", (req, res) => {
    console.log("hardcoded URL: " + req.query.id);
    // line to get json data as object
   /* const sqlIns = "INSERT INTO web_user (web_user_id, user_email, user_password, image, membership_fee, birthday, user_role_id) values (?,?,?,?,?,?,?)";
    const p = req.params;
    db.query(sqlIns,[p.id, p.email, p.password, p.image, p.fee, p.bday, p.role], (req, result) => {
      console.log("Result of insert: " + result);
      res.send(result);
    });*/
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening...");
});