const sequelize = require("../Models");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;
