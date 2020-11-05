const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test",
    multipleStatements: true
});
con.connect(function(err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
        console.log(err);
    }
});
module.exports = con;
