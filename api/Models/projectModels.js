const Sequelize = require("sequelize");
const sequelize = require("../Models");

const Project = sequelize.define("project", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Project;
