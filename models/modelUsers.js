const mongoose = require("mongoose");
const validator = require("validator");
const { USER, ADMIN, MANGER } = require("../utils/rolesActions");
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
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [USER, ADMIN, MANGER],
    default: USER,
  },
  avatar: {
    type: String,
    default: "uploads/profile.jpg",
  },
});
module.exports = mongoose.model("User", usersSchema);
