const fs = require("fs");



//================== SYNC
const syncFile = fs.writeFileSync("testSync.txt","Text1 data sync");
console.log(syncFile);
//================== A-SYNC
fs.writeFile("testAsync.txt","Text1 data async",(err,res)=>{console.log(err,res);});





