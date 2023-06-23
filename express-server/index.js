const express = require("express");


const app = express();

//========== /
app.get("/",(req,res)=>{ return res.end("get at '/' ")})




//========== /about?name=umer
app.get("/about",(req,res)=>{ return res.end("get at '/about' "+req.query.name)})



app.listen(8000,()=>{console.log("server started");})


// const http = require("http");
// const fs = require("fs");
// const url = require("url");


// const myServer = http.createServer(app);
// myServer.listen(8000,()=>{console.log("server started");})