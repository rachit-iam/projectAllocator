const Sequelize = require("sequelize");
const sequelize = require("../Models");

const Faculty = sequelize.define("faculty", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Faculty;
