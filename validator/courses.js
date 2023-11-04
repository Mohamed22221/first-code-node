const { body } = require("express-validator");
const courseValidator = [
    body("learn", "requird course Empty").not().isEmpty(),
    body("name", "The minimum name length is 3 characters").isLength({
      min: 3,
    }),
  ];
  module.exports = {courseValidator}