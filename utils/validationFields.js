const { validationResult } = require("express-validator");
const sendError = require("./classError");
const { FAIL } = require("./httpStatus");

const validationFields= (req , next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = sendError.create(400, FAIL, errors.array());
      return next(error);
    }
  
}
module.exports = validationFields