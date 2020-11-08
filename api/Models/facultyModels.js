const Sequelize = require("sequelize");
const sequelize = require("../Models");

const Faculty = sequelize.define("faculty", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Faculty;
