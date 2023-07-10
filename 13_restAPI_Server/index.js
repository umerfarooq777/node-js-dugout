const express = require("express");
const fs = require("fs");
const USERS = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

app.use(express.urlencoded({extended:false}));




//======== /users

app.get("/users", (req, res) => {
  const listHTML = `<ul>${USERS?.map((user)=>`<li>${user?.first_name}</li>`).join("")}</ul>`
  return res.send(listHTML);
});


//======== /api/users
app.get("/api/users", (req, res) => {
  return res.json(USERS);
});


//======== /api/user/:id
app.route("/api/user/:id")

  .get((req, res) => {
    const _id = Number(req.params.id);

    const user = USERS.find((user)=>user.id === _id);
     return res.json(user);
  })
  .patch((req, res) => {
    
    const _id = Number(req.params.id);
    const  body = req.body;
    index = USERS.findIndex(user => user.id ===_id);
    //  console.log(body);
    USERS[index] = {id:_id,...body}
    
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(USERS),(err,data)=>{
    
      return res.json({status:"user updated", id :_id});
    })
  })
  .delete((req, res) => {
    const _id = Number(req.params.id);
    index = USERS.findIndex(user => user.id ===_id);
    //  console.log(body);
    USERS.splice(index,1);
    
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(USERS),(err,data)=>{
    
      return res.json({status:"user Deleted", id :_id});
    })
  })
  ;

//======== /api/createUser

app.post("/api/createUser", (req, res) => {
 const  body = req.body;
//  console.log(body);
USERS.push({id:USERS.length+1,...body});

fs.writeFile("./MOCK_DATA.json",JSON.stringify(USERS),(err,data)=>{

  return res.json({status:"user created", id :USERS.length});
})
});







app.listen(port, () => {
  console.log("Server running on port :" + port);
});
