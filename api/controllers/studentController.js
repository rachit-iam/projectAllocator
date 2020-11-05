const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const studentDb = require("../Models/studentModels");
//may require more dbs


module.exports.getAllStudents = function (req, res) {
    //filll
    //check is user's role is dean then only
    //outputs all students
};

module.exports.getStudentsByFacultyById = function (req, res) {
    //filll
    //check if the user's role is faculty
    //will recieve faculty id
    //outputs students under a faculty id
};

module.exports.getStudentDetails = function (req, res) {
    //filll
    //faculty or dean chill
    //will recieve student id in req
    //outputs all student details 
    //plus the projects he has done , for this we can use the project controller also
};