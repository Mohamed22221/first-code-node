const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    name: {
        type : String,
        reqired : true
    } ,
    learn: {
        type : String,
        reqired : true
    }   

  });
 module.exports = mongoose.model('Course' , courseSchema)