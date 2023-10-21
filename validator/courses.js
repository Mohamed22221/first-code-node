const { body } = require("express-validator");
const courseValidator = [
    body("learn", "requird course Empty").not().isEmpty(),
    body("name", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ];
  module.exports = {courseValidator}