const { courses } = require("../database/courses");
const { validationResult } = require("express-validator");
const courseSchema = require("../models/modelCourses");
const mongoose = require("mongoose");

const getAllcourses = async (req, res) => {
  const courses = await courseSchema.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  try {
    const dynamicId = req.params.id;
    const course = await courseSchema.findById(dynamicId);

    if (!course) {
      return res.status(404).json({ msg: "not found course" });
    }
    res.json(course);
  } catch (err) {
    return res.status(404).json({ msg: "invalid object id" });
  }
};

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCourse = await courseSchema({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = (req, res) => {
  const id = +req.params.id;
  let course = courses.find((item) => item.id === id);
  if (!course) {
    return res.status(404).json({ msg: "not found course" });
  }
  course = { ...course, ...req.body };

  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const id = +req.params.id;
  let course = courses.filter((item) => item.id !== id);

  res.status(200).json(course);
};

module.exports = {
  getAllcourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
