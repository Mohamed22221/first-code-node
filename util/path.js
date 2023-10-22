// way to get file 
const process = require('process');
module.exports = process.mainModule.filename

// way to get root file 
// const path = require('path');
// console.log(path.join(__dirname, '../' , 'routes' , 'coursesRouter.js'))
// module.exports = path.dirname(process.mainModule.filename);
