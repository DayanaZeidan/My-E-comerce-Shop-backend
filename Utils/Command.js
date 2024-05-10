const { validationResult } = require("express-validator");

const validator = (req) => {
  const errors = validationResult(req); //serach for any errors in the req
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return firstError.msg;
  }
  return null;
};

module.exports = { validator };
