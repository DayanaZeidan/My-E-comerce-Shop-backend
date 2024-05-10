const { DataTypes } = require("sequelize");
const Sequelize = require("../database/database");

const Cartitems = Sequelize.define(
  "Cartitems",
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);
module.exports = Cartitems;
