const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const db = require("./database/connect");
const { Users } = require("./database/routes");

app.use(express.json());
app.use(express.urlencoded());

app.post("/signup", async (req, res) => {
  const { username, password } = req.query;
  await Users.create(username, password);
  res.send("ok");
});

app.get("/login", async (req, res) => {
  const { username, password } = req.query;
  await Users.login(username, password);
  res.send("ok");
});

app.listen(PORT, () => {
  db.sync({ force: true });
  console.log(`server now running on http://localhost:${PORT}!`);
});
