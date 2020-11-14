const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const workDb = require("../Models/workModels");
const studentDb = require("../Models/studentModels");
const projectDb = require("../Models/projectModels");
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
            where: { projectId: req.params.projectId },
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
    if (res.locals.role != "student") {
        res.status(403).send({
            message: "Require Student Role!",
        });
    }
    studentDb
        .findOne({
            attributes: ["id"],
            where: { userId: res.locals.userId },
        })
        .then((student) => {
            if (!student) {
                res.status(403).send({
                    message: "Student not admitted!",
                });
            } else {
                projectDb
                    .findOne({
                        attributes: ["studentId"],
                        where: { id: req.params.projectId },
                    })
                    .then((project) => {
                        if (project.studentId !== student.id) {
                            res.status(403).send({
                                message: "Cannot add work to others project",
                            });
                        } else {
                            workDb
                                .create({
                                    name: req.body.name,
                                    description: req.body.description,
                                    projectId: req.params.projectId,
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
                        }
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while retrieving projects.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving projects.",
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
                id: req.params.workId,
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
