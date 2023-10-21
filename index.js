const express = require("express");
const bodyParser = require('body-parser')
const routerCourses = require('./routes/coursesRouter')
const app = express()
const port =3000
//data corses
app.use(bodyParser.json());
app.use('/api/courses' , routerCourses );
//listen local server 3000+
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


