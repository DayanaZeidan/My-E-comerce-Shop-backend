const { body } = require("express-validator");
const Users = require("../models/Users");

exports.validateCreateUser = [
  body("name") //name of the property we want to body
    .notEmpty()
    .withMessage("name cannot be empty")
    .isString()
    .not()
    .withMessage("name should be a string")
    .isNumeric()
    .withMessage("name should not be all numbers")
    .bail(),
  body("username")
    .trim()
    .escape()
    .not()
    .notEmpty()
    .withMessage("username cannot be empty")
    //avoid dupliacate in username
    .custom(async (value) => {
      const existingUser = await Users.findOne({
        where: {
          username: value,
        },
      });
      if (existingUser) {
        throw new Error("user with this username already exists");
      }
    })
    .bail(),
  body("email")
    .trim()
    .normalizeEmail()
    .not()
    .notEmpty()
    .withMessage("email should not be empty")
    .isEmail()
    .not()
    .withMessage("invalid email address")
    .custom(async (value) => {
      const existingUser = await Users.findOne({
        where: {
          email: value,
        },
      });
      if (existingUser) {
        throw new Error("user with this email already exists");
      }
    })
    .bail(),
  body("password")
    .trim()
    .escape()
    .not()
    .notEmpty()
    .withMessage("password cannot be empty")
    //minimum password length
    .isLength({
      min: 8,
      max: 24,
    })
    .withMessage("password must be at least 8 character and max of 24")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    )
    .bail(),
  body("role")
    .notEmpty()
    .withMessage("role cannot be empty")
    .isString()
    .not()
    .withMessage("role should be a string")
    .isNumeric()
    .withMessage("role should not have numbers")
    .bail(),
];
