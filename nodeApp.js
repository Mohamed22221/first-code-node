// console.log("node app");
// const result = require("./result");
// result.add(5, 6);
// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.end("hello world my node");
// });
// server.listen(3000, "localhost", () => {
//   console.log("new local host server");
// });



// file system
console.log("start");
const fs = require("node:fs");
//read file
fs.readFile("./readFile.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err, "errReadFile");
  }
  console.log(data, "dataReadFile");
});
console.log("end");
//create new file
fs.writeFile("message.txt", "Hello Node.js", "utf-8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
// remove file
fs.unlink("message.txt",(err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  })
