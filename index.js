const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routerCourses = require("./routes/coursesRouter");
const { ERROR } = require("./utils/httpStatus");
require("dotenv").config();
var cors = require("cors");
const port = process.env.PORT;
const url = process.env.MONGO_URL;
app.use(cors());
//data corses
app.use(bodyParser.json());
app.use("/api/courses", routerCourses);
app.all("*", (req, res) => {
  res.status(404).json({
    status: ERROR,
    message: "Not Found Resource",
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
