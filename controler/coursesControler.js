const mongoose = require("mongoose");
const courseSchema = require("../models/modelCourses");
const { validationResult } = require("express-validator");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatus");

const getAllcourses = async (req, res) => {
  const courses = await courseSchema.find();
  res.json({
    status: SUCCESS,
    data: { courses },
  });
};

const getCourse = async (req, res) => {
  try {
    const dynamicId = req.params.id;
    const course = await courseSchema.findById(dynamicId);

    if (!course) {
      return res.status(404).json({
        status: FAIL,
        data: { course: "Not Found Course" },
      });
    }
    res.json({
      status: SUCCESS,
      data: { course: course },
    });
  } catch (err) {
    return res.status(404).json({
      status: ERROR,
      data: null,
      message: err.message,
    });
  }
};

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: FAIL,
      data: { course: { errors: errors.array() } },
    });
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
};

const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const courseUpdated = await courseSchema.updateOne(
      { _id: id },
      { ...req.body }
    );
    return res.status(200).json({
      status: SUCCESS,
      data: { course: courseUpdated },
    });
  } catch (err) {
    return res.status(404).json({
      status: ERROR,
      data: null,
      message: err.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const courseDeleted = await courseSchema.deleteOne({ _id: id });
    return res.status(200).json({
      status: SUCCESS,
      data: { course: courseDeleted },
    });
  } catch (err) {
    return res.status(404).json({
      status: ERROR,
      data: null,
      message: err.message,
    });
  }
};

module.exports = {
  getAllcourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
