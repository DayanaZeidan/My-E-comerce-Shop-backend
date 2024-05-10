const { body } = require("express-validator");
const Products = require("../models/Products");

exports.validateCreateProduct = [
  body("name") //name of the property we want to body
    .notEmpty()
    .withMessage("name cannot be empty")
    .isString()
    .not()
    .withMessage("name should be a string")
    .isNumeric()
    .withMessage("name should not have numbers")
    .custom(async (value) => {
      const existingProduct = await Products.findOne({
        where: {
          name: value,
        },
      });
      if (existingProduct) {
        throw new Error("product with this name already exists");
      }
    })
    .bail(),
  body("description")
    .notEmpty()
    .withMessage("description cannot be empty")
    .isString()
    .not()
    .withMessage("description should be a string")
    .bail(),
  body("price")
    .trim()
    .escape()
    .not()
    .notEmpty()
    .withMessage("price should not be empty")
    .isString()
    .not()
    .withMessage("price should not be a string")
    .bail(),
];
