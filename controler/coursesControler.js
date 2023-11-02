const mongoose = require("mongoose");
const courseSchema = require("../models/modelCourses");
const { validationResult } = require("express-validator");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const sendError = require("../utils/classError");

const getAllcourses = asyncWrapper( async (req, res) => {
  //handel pagination
  const query = req.query;
  const limit = 2;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  //handel courses and pagination
  const courses = await courseSchema
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.json({
    status: SUCCESS,
    data: { courses },
  });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  // try {
  const dynamicId = req.params.id;
  const course = await courseSchema.findById(dynamicId);

  if (!course) {
    const error = sendError.create(404, FAIL, { course: "Not Found Course" });
    return next(error);
  }
  res.json({
    status: SUCCESS,
    data: { course: course },
  });
});

const createCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = sendError.create(400, FAIL, {
      course: { errors: errors.array() },
    });
    return next(error);
  }
  const newCourse = await courseSchema({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  await newCourse.save();
  res.status(201).json({
    status: SUCCESS,
    data: newCourse,
  });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const courseUpdated = await courseSchema.updateOne(
    { _id: id },
    { ...req.body }
  );
  return res.status(200).json({
    status: SUCCESS,
    data: { course: courseUpdated },
  });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const courseDeleted = await courseSchema.deleteOne({ _id: id });
  return res.status(200).json({
    status: SUCCESS,
    data: { course: courseDeleted },
  });
}) ;

module.exports = {
  getAllcourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
