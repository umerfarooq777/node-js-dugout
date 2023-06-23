const http = require("http");
const fs = require("fs");


const myServer = http.createServer(
    (req,res)=>{
        const log = `===========\n${Date.now()}: ${req.url}: req noted\n`;
        fs.appendFile("logs.txt",log,(err,data)=>{

            // console.log(Date.now());
            // res.end("hello hit"+Date.now());

            switch(req.url){
                case '/' : res.end("home page");
                break;

                case '/about' : res.end("about page");
                break;

                default: res.end("404 page");




            }

        })
    }
);



myServer.listen(8000,()=>{console.log("server started");})