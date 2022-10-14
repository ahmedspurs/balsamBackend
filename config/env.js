const Sequelize = require("sequelize");

const sequelize = new Sequelize("balsam", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
