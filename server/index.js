const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

const bcrypt = require("bcryptjs");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = require("./database/connect");
const { User, List, Board, Task } = require("./database/models");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));

//ROUTES
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user) {
    res.send("user already exists");
  } else {
    bcrypt.hash(password, 12, async (err, hashedPassword) => {
      if (err) throw err;
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
        avatar_url: "hey",
      });
      res.send(newUser);
    });
  }
});

app.post("/login", async (req, res) => {
  // const { username, password } = req.body;
  res.send(req.body);
});

app.get("/user", (req, res) => {
  res.send("Wow, you must be logged in!");
});

//START SERVER
app.listen(PORT, () => {
  db.sync({ force: true });
  console.log(`server now running on http://localhost:${PORT}!`);
});
