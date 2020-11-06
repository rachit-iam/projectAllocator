const Sequelize = require("sequelize");
const sequelize = require("../Models");
const Faculty = require("./facultyModels");

const Student = sequelize.define("student", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admissionNo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Faculty.hasMany(Student);

module.exports = Student;
