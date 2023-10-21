const {courses} = require('../database/courses')
const { validationResult } = require("express-validator");
//get all courses
const getAllcourses = (req, res) => {
  res.json(courses);
};

//get single course
const getCourse = (req, res) => {
  const dynamicId = +req.params.id;
  const course = courses.find((item) => item.id === dynamicId);
  if (!course) {
    return res.status(404).json({ msg: "not found course" });
  }
  res.json(course);
};
//create course

const createCourse = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push({ id: courses.length + 1, ...req.body });
  res.json(newCourse);
};
//update course
const updateCourse =  (req, res) => {
  const id = +req.params.id;
  let course = courses.find((item) => item.id === id);
  if (!course) {
    return res.status(404).json({ msg: "not found course" });
  }
  course = { ...course, ...req.body };

  res.status(200).json(course);
};
//delete course
const deleteCourse =   (req, res) => {
  const id = +req.params.id;
  let course = courses.filter((item) => item.id !== id);

  res.status(200).json(course);
};

module.exports = {
    getAllcourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}