const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const verifyRoles = require("../utils/verifyRoles");


const {
  getAllcourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controler/coursesControler");

const { courseValidator } = require("../validator/courses");
const { ADMIN, MANGER } = require("../utils/rolesActions");

//get all routes
router
  .route("/")
  .get(getAllcourses)
  .post(verifyToken, courseValidator, createCourse);
router
  .route("/:id")
  .get(getCourse)
  .patch(verifyToken, updateCourse)
  .delete(verifyToken, verifyRoles(ADMIN, MANGER), deleteCourse);

module.exports = router;
