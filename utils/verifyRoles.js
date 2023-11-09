const sendError = require("./classError");
const { ERROR } = require("./httpStatus");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentRole.role)) {
      const error = sendError.create(
        404,
        ERROR,
        "This Role Is Not Authorized "
      );
      next(error);
    }
    next();
  };
};
