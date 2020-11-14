const Sequelize = require("sequelize");
const sequelize = require("../Models");

const Student = sequelize.define("student", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    facultyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admissionNo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = Student;
