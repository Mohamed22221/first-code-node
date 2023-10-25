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
//conect mongo
const { MongoClient } = require("mongodb");

// Connection URL
const url =
  "mongodb+srv://hamdymohame7:MohamedHamdy2003@cluster0.aclhqtt.mongodb.net/?";
const client = new MongoClient(url);

// Database Name

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("learn-node");
  const collection = db.collection("courses");
  const data = await collection.find().toArray();

  console.log(data);
}
main()
//get all routes
router.route("/").get(getAllcourses).post(courseValidator, createCourse);
router.route("/:id").get(getCourse).patch(updateCourse).delete(deleteCourse);


module.exports = router;
