const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const facultyDb = require("../Models/facultyModels");
//may require more dbs

module.exports.getAllFaculty = function (req, res) {
    //filll
    //check is user's role is dean then only
    //outputs all the faculty
};

module.exports.assignFaculty = function (req, res) {
    //filll
    //will receive faculty id and student id
    //check that user's role is dean then only
    //assin that student under faculty
    //outputs ok message if no error
};