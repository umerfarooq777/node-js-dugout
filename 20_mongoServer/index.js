const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const USERS = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

//============= MONGODB connection
mongoose.connect("mongodb://127.0.0.1:27017/mongoServerDB")
.then(()=>{
  console.log("MongoDB connected Locally");
})
.catch(err=>{console.log("error connection",err);})



const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  }  
},
{
  timestampsz:true
}
);

const User = new mongoose.model("user",userSchema);


//=============== MIDDLEWARE
app.use(express.urlencoded({extended:false}));

// app.use((req,res,next)=>{
//   console.log("M1");
//   // return res.json({status:"Hello M1"});
//   next();
// });

//======== /users

app.get("/users", async (req, res) => {

   const allUsers = await User.find({});
  const listHTML = `<ul>${allUsers?.map(
    (user) => `<li>${user?.firstName} with email: ${user?.email}</li>`
  ).join("")}</ul>`;
  return res.send(listHTML);
});

//======== /api/users
app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});

  return res.json(allUsers);
});

//======== /api/user/:id
app
  .route("/api/user/:id")

  .get((req, res) => {
    const _id = Number(req.params.id);

    const user = USERS.find((user) => user.id === _id);
    return res.json(user);
  })
  .patch((req, res) => {
    const _id = Number(req.params.id);
    const body = req.body;
    index = USERS.findIndex((user) => user.id === _id);
    //  console.log(body);
    USERS[index] = { id: _id, ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(USERS), (err, data) => {
      return res.json({ status: "user updated", id: _id });
    });
  })
  .delete((req, res) => {
    const _id = Number(req.params.id);
    index = USERS.findIndex((user) => user.id === _id);
    //  console.log(body);
    USERS.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(USERS), (err, data) => {
      return res.json({ status: "user Deleted", id: _id });
    });
  });

//======== /api/createUser

app.post("/api/createUser", async (req, res) => {
  const body = req.body;
  //  console.log(body);
  if (!body || !body.first_name || !body.last_name || !body.email) {
    return res.status(400).json({msg:"all fields required"})
  }
  try {

    const createdUser = await User.create({
      firstName:body.first_name,
      lastName:body.last_name,
      email:body.email,
    });

    console.log(createdUser);

    return res.status(201).json({msg:"User created"})

    
  } catch (error) {
    
    return res.status(400).json({msg:error})
  }



  // USERS.push({ id: USERS.length + 1, ...body });

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(USERS), (err, data) => {
  //   return res.status(201).json({ status: "user created", id: USERS.length });
  // });
});

app.listen(port, () => {
  console.log("Server running on port :" + port);
});
