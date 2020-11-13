const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const projectDb = require("../Models/projectModels");
const studentDb = require("../Models/studentModels");
const facultyDb = require("../Models/facultyModels");
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
    //will recieve student id and facultyid
    //check if user is faculty and the student is under the user if he is faculty and syudent id is valid
    if (res.locals.role !== "faculty") {
        res.status(403).send({
            message: "Require faculty Role!",
        });
    }
    studentDb
        .findOne({
            attributes: ["facultyId"],
            where: { id: req.body.studentId },
        })
        .then((data) => {
            if (data.facultyId != req.body.facultyId) {
                res.status(403).send({
                    message: "student is not under you!",
                });
            } else {
                facultyDb
                    .findOne({
                        attributes: ["userId"],
                        where: { id: req.body.facultyId },
                    })
                    .then((data) => {
                        if (data.userId !== res.locals.userId) {
                            res.status(403).send({
                                message: "dont send request for other people!",
                            });
                        } else {
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
                        }
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
