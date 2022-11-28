//Imports dependecies being used
const express = require("express");
const cors = require("cors");

//declares an express app
const app = express();

const db = require("./dbUtils/DbConn");
const DbMods = require("./models/webUser/DbMods");


//***Middleware start***
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

// get all user api 
app.get("/api/listAllUsers", (req, res) => {
  try {
    const sqlGet = "SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, web_user.user_role_id, role_type "
    + " FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id ORDER BY web_user_id ASC";
    db.query(sqlGet, (req, result) => {
        var users = [];
        for(var ele of result){
            users.push(DbMods.formatWebUser(ele));
        }
        res.send(users);
    });
  } catch (error) {
      console.log("ERROR DISPLAYING: " + error);
  }
}); 

//Router to GET specific user by ID
app.get('/api/getUser/:id', (req, res) => {
  const sqlGet = "SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, web_user.user_role_id, role_type "
  + "FROM web_user, user_role WHERE web_user_id=?";
  db.query(sqlGet, [req.params.id], (req, result) => {
      var user = []
      // only 1 record (unique web id)
      user.push(DbMods.formatWebUser(result[0]));
      res.send(user);
  })
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening...");
});