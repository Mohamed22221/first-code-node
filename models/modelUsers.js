const mongoose = require("mongoose");
const validator = require("validator");
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    reqired: true,
  },
  lastName: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    reqired: true,
  },
});
module.exports = mongoose.model("User", usersSchema);
