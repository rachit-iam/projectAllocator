const Sequelize = require("sequelize");
const sequelize = require("../Models");
const Project = require("./projectModels");

const Work = sequelize.define("work", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    description: {
        type: Sequelize.STRING,
    },
});

Project.hasMany(Work);

module.exports = Work;
