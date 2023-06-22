const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer(
    (req,res)=>{

        if (req.url==="/favicon.ico") return res.end();


        const log = `${Date.now()} : ${req.method} : ${req.url} ==> req noted\n`;
        const myUrl = url.parse(req.url,true); //query params parse true
        
        
        
        fs.appendFile("logs.txt",log,(err,data)=>{

            // console.log(Date.now());
            // res.end("hello hit"+Date.now());

            switch(myUrl.pathname){
                case '/' : res.end("home page");
                break;

                case '/about' :
                const user =  myUrl.query.user;
                res.end(`about page, with user ${user}`);
                break;
                case '/signup' :

                if (req.method==='GET') {
                    
                    res.end(`signup form`);
                } else if (req.method==='POST') {
                    
                    res.end(`query success`);
                }
                break;

                default: res.end("404 page");




            }

        })
    }
);



myServer.listen(8000,()=>{console.log("server started");})