const fs = require("fs");
const express = require("express");
const md5 = require("md5");
const app = express();
require("dotenv").config();

const { PORT, TOKEN } = process.env;

function GetUsernameAccess() {
  if (fs.existsSync("./a.txt"))
    return fs.readFileSync("./a.txt", "utf8").split(/\r?\n/);
  else return [];
}
function SaveUsernameAccess(users) {
  return fs.writeFileSync("./a.txt", users.join("\r\n"));
}
app.get("/nxoxhxu7x8x9", (req, res) => res.send("Hello World!"));
app.get("/nxoxhxu7x8x9/check/:username", (req, res) => {
  let { username } = req.params;

  if (!username) return res.status(400).json({ error: "username  require" });

  let is_ok = GetUsernameAccess().includes(md5(username));
  res.json({ is_ok });
});
app.get("/nxoxhxu7x8x9/manager", (req, res) => {
  let { token, action, username } = req.query;
  if (!token || token != TOKEN)
    return res.status(401).json({ error: "not auth" });
  if (!username || !action)
    return res.status(400).json({ error: "username action require" });

  username = md5(username);
  let users = GetUsernameAccess();

  if (action == "add") {
    users.push(username);
  }
  if (action == "remove") {
    users = users.filter((el) => el != username);
  }
  users = users.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
  });
  SaveUsernameAccess(users);
  res.json({ users });
});
app.listen(PORT, (e) => {
  console.log(`Active nxoxhxu7x8x9 app listening on port ${PORT}!`);
});
