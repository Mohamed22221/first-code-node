const express = require("express");
const app = express();
const port = 3000;

app.use("/users", (req, res, next) => {
  console.log("user middelware");
  res.send("<h1>Hello from user middelware</h1>");
  // next()
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from all middelware</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
