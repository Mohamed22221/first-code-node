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

const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const courseUpdated = await courseSchema.updateOne(
      { _id: id },
      { ...req.body }
    );
    return res.status(200).json(courseUpdated);
  } catch (err) {
    return res.status(404).json({ msg: "not found course" });
  }
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const courseDeleted = await courseSchema.deleteOne({ _id: id });
    return res.status(200).json(courseDeleted);
  } catch (err) {
    return res.status(404).json({ msg: "not found course" });
  }
};

module.exports = {
  getAllcourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
