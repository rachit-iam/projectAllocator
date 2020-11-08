const con = require("../config");
const md5 = require("md5");
const jwt = require("jsonwebtoken"); //to generate signed web toket
const expressJwt = require("express-jwt"); // for authorization check
var Sequelize = require("sequelize");
//const usersDb = require('../Queries/users')
const usersDb = require("../Models/userModels");
const facultyDb = require("../Models/facultyModels");
const studentDb = require("../Models/studentModels");
const { countBy } = require("lodash");

module.exports.signup = function (req, res) {
    usersDb
        .create({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        })
        .then((user) => {
            if (user.role === "student") {
                studentDb.create({
                    userId: user.id,
                    name: req.body.name,
                    admissionNo: req.body.admissionNo,
                });
            } else if (user.role === "faculty") {
                facultyDb.create({
                    userId: user.id,
                    name: req.body.name,
                });
            }
            res.send({ message: "User registered successfully!" });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while signing up",
            });
        });
};

module.exports.login = function (req, res) {
    usersDb
        .findOne({
            where: {
                username: req.body.username,
            },
        })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            if (user.password !== req.body.password) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET , {
                expiresIn: 86400, // 24 hours
            });
            res.status(200).send({
                id: user.id,
                username: user.username,
                roles: user.role,
                accessToken: token,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while login",
            });
        });
};

