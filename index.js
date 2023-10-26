const express = require("express");
const bodyParser = require("body-parser");
const routerCourses = require("./routes/coursesRouter");
const app = express();
const port = 3000;
//data corses
app.use(bodyParser.json());
app.use("/api/courses", routerCourses);
//listen local server 3000+
// getting-started.js
const mongoose = require("mongoose");

const url =
  "mongodb+srv://hamdymohame7:MohamedHamdy2003@cluster0.aclhqtt.mongodb.net/learn-node?retryWrites=true&w=majority";
mongoose.connect(url).then(() => {
  console.log("conect mongo");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
