const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

//data corses
app.use(bodyParser.json());
const courses = [
  { id: 1, name: "react", learn: "udemy" },
  { id: 2, name: "next", learn: "udemy" },
  { id: 3, name: "pwa", learn: "udemy" },

];

//get all courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});
//get single course
app.get("/api/courses/:id", (req, res) => {
  const dynamicId = +req.params.id;
  const course = courses.find((item) => item.id === dynamicId);
  if (!course) {
    return res.status(404).json({ msg: "not found course" });
  }
  res.json(course);
});
//create course
const courseValidator = [
  body("learn", "requird course Empty").not().isEmpty(),
  body("name", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];
app.post("/api/courses", courseValidator, (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push({ id: courses.length + 1, ...req.body });
  res.json(newCourse);
});
//update course
app.patch("/api/courses/:id", (req, res) => {
  const id = +req.params.id;
  let course = courses.find((item) => item.id === id);
  if (!course) {
    return res.status(404).json({ msg: "not found course" });
  }
  course = { ...course, ...req.body };

  res.status(200).json(course);
});
//delete course
app.delete("/api/courses/:id", (req, res) => {
  const id = +req.params.id;
  let course = courses.filter((item) => item.id !== id);

  res.status(200).json(course);
});
//listen local server 3000+
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

