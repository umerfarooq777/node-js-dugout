const express = require("express");
const USERS = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

//======== GET

app.get("/users", (req, res) => {
    const listHTML = `<ul>${USERS?.map((user)=>`<li>${user?.first_name}</li>`).join("")}</ul>`
  return res.send(listHTML);
});
app.get("/api/users", (req, res) => {
  return res.json(USERS);
});
app.get("/api/user/:id", (req, res) => {
    const _id = Number(req.params.id);

    const user = USERS.find((user)=>user.id === _id);
     return res.json(user);
});








app.listen(port, () => {
  console.log("Server running on port :" + port);
});
