console.log("node app")
const result = require("./result")
result.add(5 , 6)
const http = require('http')
const server = http.createServer((req , res) =>{
    res.end("hello world my node")
})
server.listen(3000 , "localhost" , () =>{
    console.log("new local host server")
})