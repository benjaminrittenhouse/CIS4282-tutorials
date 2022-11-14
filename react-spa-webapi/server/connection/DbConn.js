const mysql = require("mysql");

//Creates connection
//create pool defaults to 10 connnections. Can change by specifying connectionLimit: #
const db = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b23560dbdb2fe8",
    password: "f91b7e9b",
    database: "heroku_73fd5bf53ffabe9",
    connectionLimit: 50
});

console.log("Database Connection");

module.exports = db;