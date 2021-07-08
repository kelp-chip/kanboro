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
  await Users.login(username, password, req, (token) => {
    res.json(token);
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("yo, we need a token >:(");
  } else {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "you failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/protected", verifyJWT, (req, res) => {
  res.send("Wow, you must be logged in!");
});

app.listen(PORT, () => {
  db.sync({ force: true });
  console.log(`server now running on http://localhost:${PORT}!`);
});
