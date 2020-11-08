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
    projectDb
        .findAll({
            attributes: ["id", "name"],
            where: { studentId: req.body.studentId },
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving projects.",
            });
        });
};

module.exports.addProject = function (req, res) {
    //filll
    //will recieve student id and
    //check if user is faculty and the student is under the user if he is faculty and syudent id is valid
    projectDb
        .create({
            name: req.body.name,
            description: req.body.description,
            studentId: req.body.studentId,
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the project.",
            });
        });
};

module.exports.getProjectById = function (req, res) {
    //filll
    //will recieve projectId
    //if dean then ok
    //if faculty then project and faulty should be related
    //if student role then project and student should be related
    projectDb
        .findOne({
            where: {
                id: req.body.projectId,
            },
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving project.",
            });
        });
};
