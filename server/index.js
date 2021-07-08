const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

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
app.post("/signup", async (req, res) => {
  // const { username, password } = req.body;
  res.send(req.body);
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
