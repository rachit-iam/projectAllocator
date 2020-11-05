const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const projectDb = require("../Models/projectModels");
//may require more dbs


module.exports.getProjectsByStudentId = function (req, res) {
    //filll
    //all can access at this time
    //get student id
    //outputs all the projects under that student
};

module.exports.addProject = function (req, res) {
    //filll
    //will recieve student id and 
    //check if user is faculty and the student is under the user if he is faculty
};

module.exports.getProjectById = function (req, res) {
    //filll
    //will recieve projectId
    //if dean then ok
    //if faculty then project and faulty should be related
    //if student role then project and student should be related
};