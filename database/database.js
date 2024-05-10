const { Sequelize } = require("sequelize");
const dbconfig = require("../config/config");

const sequelize = new Sequelize(
  dbconfig.database,
  dbconfig.user,
  dbconfig.password,
  {
    host: dbconfig.server,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connection to database established");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
  });

  module.exports = sequelize;