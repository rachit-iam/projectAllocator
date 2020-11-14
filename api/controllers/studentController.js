const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const studentDb = require("../Models/studentModels");

const FacultyDb = require("../Models/facultyModels");
//may require more dbs

module.exports.getAllStudents = function (req, res) {
    //filll
    //check is user's role is dean then only
    //outputs all students
    if (res.locals.role === "dean") {
        res.status(403).send({
            message: "Require Admin Role!",
        });
    } else if (res.locals.role === "faculty") {
        FacultyDb.findOne({
            attributes: ["id"],
            where: { userId: res.locals.userId },
        })
            .then((faculty) => {
                studentDb
                    .findAll({
                        attributes: ["id", "name", "admissionNo"],
                        where: { facultyId: faculty.id },
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
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while retrieving projects.",
                });
            });
    } else {
        res.status(403).send({
            message: "Require Admin Role!",
        });
    }
};

module.exports.getStudentsByFacultyById = function (req, res) {
    //filll
    //check if the user's role is faculty
    //will recieve faculty id
    //outputs students under a faculty id
    res.send("incorrect");
};

module.exports.getStudentDetails = function (req, res) {
    //filll
    //faculty or dean chill
    //will recieve student id in req
    //outputs all student details
    //plus the projects he has done , for this we can use the project controller also
    studentDb
        .findOne({
            where: {
                id: req.params.studentId,
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
