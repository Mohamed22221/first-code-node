const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const {
  getAllcourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("./controler/coursesControler");

const {courseValidator} = require('./validator/courses')
//data corses
app.use(bodyParser.json());
//get all courses
app.get("/api/courses", getAllcourses);
//get single course
app.get("/api/courses/:id", getCourse);
//create course
app.post("/api/courses", courseValidator, createCourse);
//update course
app.patch("/api/courses/:id", updateCourse);
//delete course
app.delete("/api/courses/:id", deleteCourse);
//listen local server 3000+
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
