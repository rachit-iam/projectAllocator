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
    workDb
        .findAll({
            attributes: ["id", "name"],
            where: { projectId: req.body.projectId },
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

module.exports.addWork = function (req, res) {
    //filll
    //will recieve project_id 
    //check user is student role and projectid and studentId(user is student checked already) is related
    workDb
        .create({
            name: req.body.name,
            description: req.body.description,
            projectId: req.body.projectId,
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

module.exports.getWorkById = function (req, res) {
    //filll
    //will recieve work id
    //if dean then ok
    //if faculty then project_id(derived from work) and faulty should be related
    //if student role then project_id and student should be related
    //outputs the work details
    workDb
        .findOne({
            where: {
                id: req.body.workId,
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