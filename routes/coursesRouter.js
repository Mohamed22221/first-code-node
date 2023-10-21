const express = require("express");
const router = express.Router();
const {
  getAllcourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controler/coursesControler");

const { courseValidator } = require("../validator/courses");

//get all routes
router.route("/").get(getAllcourses).post(courseValidator, createCourse);
router.route("/:id").get(getCourse).patch(updateCourse).delete(deleteCourse);


module.exports = router;
