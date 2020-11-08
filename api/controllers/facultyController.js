const con = require("../config");
const SQL = require("sql-template-strings");
var Sequelize = require("sequelize");
const facultyDb = require("../Models/facultyModels");
const studentDb = require("../Models/studentModels");
//may require more dbs

module.exports.getAllFaculty = function (req, res) {
    //check is user's role is dean then only
    facultyDb
        .findAll({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving faculties.",
            });
        });
};

module.exports.assignFaculty = function (req, res) {
    //check that user's role is dean then only
    const { facultyId, studentId } = req.body;
    console.log(req.body.studentId);
    studentDb
        .findOne({ where: { id: studentId } })
        .then((data) => {
            if (data.facultyId !== null) {
                res.status(500).send({
                    message: "Student has already a faculty.",
                });
            } else {
                data.update({ facultyId: facultyId });
                res.send({
                    message: "Student assigned to Faculty",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving faculties.",
            });
        });
};
