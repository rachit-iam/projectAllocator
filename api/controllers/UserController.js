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
            } else if (user.password !== req.body.password) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            } else {
                var token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 86400, // 24 hours
                    }
                );
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    accessToken: token,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while login",
            });
        });
};

function getTokenFromHeader(req) {
    if (
        (req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Token") ||
        (req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer")
    ) {
        return req.headers.authorization.split(" ")[1];
    }

    return null;
}

module.exports.verifyToken = (req, res, next) => {
    let token = getTokenFromHeader(req);

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        res.locals.userId = decoded.id;
        res.locals.role = decoded.role;
        console.log(res.locals);
        next();
    });
};
