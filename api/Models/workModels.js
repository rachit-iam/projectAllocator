const Sequelize = require("sequelize");
const sequelize = require("../Models");

const Work = sequelize.define("work", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Work;
