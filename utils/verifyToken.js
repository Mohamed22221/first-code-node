var jwt = require('jsonwebtoken');
const sendError = require("./classError");
const {  ERROR } = require("./httpStatus");

const verifyToken = async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  if (!auth) {
    const error = sendError.create(401, ERROR, "Token is required");
    return next(error);
  }
  const token = auth?.split("  ")[1];
  try {
    const currentRole = jwt.verify(token, process.env.TOKEN_KEY);
    req.currentRole = currentRole
    next();
  } catch (err) {
    const error = sendError.create(401, ERROR, "Invalid token");
    return next(error);
  }
};

module.exports = verifyToken;
