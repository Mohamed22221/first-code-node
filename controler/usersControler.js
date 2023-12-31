const mongoose = require("mongoose");
const usersSchema = require("../models/modelUsers");
const validationFields = require("../utils/validationFields");
const { SUCCESS, FAIL, Error } = require("../utils/httpStatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const sendError = require("../utils/classError");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT");

const getAllusers = asyncWrapper(async (req, res) => {
  //handel pagination
  const query = req.query;
  const limit = 6;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  //handel courses and pagination
  const users = await usersSchema
    .find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  res.json({
    status: SUCCESS,
    data: { users },
  });
});

const regester = asyncWrapper(async (req, res, next) => {
  //express-validator
  validationFields(req, next);

  const { firstName, lastName, email, password, role , avatar} = req.body;
  const uniqeUser = await usersSchema.findOne({ email: email }, { __v: false });
  if (uniqeUser) {
    const error = sendError.create(400, FAIL, "User Already Exist");
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new usersSchema({
    _id: new mongoose.Types.ObjectId(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar : req.file.filename,
  });
  const token = await generateJWT({
    email: newUser.email,
    _id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;

  await newUser.save();
  res.status(201).json({
    status: SUCCESS,
    data: newUser,
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  //express-validator
  validationFields(req, next);
  const user = await usersSchema.findOne({ email }, { __v: false });
  if (!user) {
    const error = sendError.create(400, FAIL, "User Not Found");
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = await generateJWT({
      email: user.email,
      _id: user._id,
      role: user.role,
    });

    return res.status(200).json({
      status: SUCCESS,
      data: { token: token },
    });
  } else {
    const error = sendError.create(404, Error, "Password Not Matching");
    return next(error);
  }
});

module.exports = {
  getAllusers,
  regester,
  login,
};
