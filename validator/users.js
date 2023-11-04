const { body } = require("express-validator");
const regesterValidator = [
  body("firstName", "FirstName is required").notEmpty(),
  body("lastName", "LastName is required").notEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({ min: 6 }),
];

const loginValidator = [
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({ min: 6 }),
];
module.exports = { regesterValidator, loginValidator };
