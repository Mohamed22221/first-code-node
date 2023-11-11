const express = require("express");
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
var multer = require('multer');
const routerCourses = require("./routes/coursesRouter");
const routerUsers = require("./routes/usersRouter");
const { ERROR } = require("./utils/httpStatus");

require("dotenv").config();
var cors = require("cors");
const port = process.env.PORT;
const url = process.env.MONGO_URL;
app.use(cors());
// for parsing application/json
app.use(bodyParser.json()); 

//form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 

//routes
app.use("/api/courses", routerCourses);
app.use("/api/users", routerUsers);
app.use("/uploads", express.static(path.join(__dirname , 'uploads')));


// global middleware for not found routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: ERROR,
    message: "Not Found Resource",
  });
});
// global middleware for handel error
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.status || ERROR,
    message: error.message,
    data: null,
  });
});

//listen local server 3000+
// getting-started.js
const mongoose = require("mongoose");

mongoose.connect(url).then(() => {
  console.log("conect mongoose");
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
