const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const workDb = require("../Models/workModels");
//may require more dbs


module.exports.getWorksByProjectId = function (req, res) {
    //filll
    //will get project id only
    //if dean then ok
    //if faculty then project and faulty should be related
    //if student role then project and student should be related
    //outputs the list of works
};

module.exports.addWork = function (req, res) {
    //filll
    //will recieve project_id 
    //check user is student role and projectid and studentId(user is student checked already) is related
};

module.exports.getWorkById = function (req, res) {
    //filll
    //will recieve work id
    //if dean then ok
    //if faculty then project_id(derived from work) and faulty should be related
    //if student role then project_id and student should be related
    //outputs the work details
};