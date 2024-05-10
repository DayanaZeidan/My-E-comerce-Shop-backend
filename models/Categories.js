const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Categories = sequelize.define(
  "Categories",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_category_id: {
      type: DataTypes.STRING,
      allowNull: true,
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

module.exports = Categories;
