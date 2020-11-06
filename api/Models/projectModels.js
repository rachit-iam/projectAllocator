const Sequelize = require("sequelize");
const sequelize = require("../Models");
const Student = require("./studentModels");

const Project = sequelize.define("project", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
});
Student.hasMany(Project);

module.exports = Project;
