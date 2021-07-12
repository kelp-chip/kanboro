const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { sequelize, User, List, Task } = require("./database/models");

const getOrder = require("./helpers/getOrder");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));

// const verifyJWT = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(token, process.env.SESSION_SECRET, (err, decodedToken) => {
//       if (err) {
//         res.status(400).json("unable to verify token");
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.send("no token found");
//   }
// };

//---------------------------End of Middleware--------------------------------

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.SESSION_SECRET, {
    expiresIn: maxAge,
  });
};

//ROUTES

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      bcrypt.hash(password, 12, async (err, hashedPassword) => {
        if (err) throw err;
        const newUser = await User.create({
          username: username,
          password: hashedPassword,
        });
        res.status(200).json(newUser);
      });
    } else {
      res.send("User already exists");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user) {
    const hashedPw = user.dataValues.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPw);
    if (passwordsMatch) {
      const id = user.id;
      const token = createToken(id, username);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: maxAge * 1000,
      });
      res.status(200).json({ verified: true, user: user });
    } else {
      res.send({ verified: false, message: "Wrong password" });
    }
  } else {
    res.send({ verified: false, message: "Wrong username" });
  }
});

app.get("/userInfo", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send({ user: null });
      } else {
        const user = await User.findOne({ where: { id: decodedToken.id } });
        console.log(user);
        res.send({ user: user.dataValues });
      }
    });
  } else {
    console.log("no user");
    res.send({ user: null });
  }
});

app.post("/logout", (req, res) => {
  console.log("hey");
  res.clearCookie("jwt");
  res.status(200).json("user logged out");
});

app.get("/lists", async (req, res) => {
  const { userId } = req.query;
  const lists = await List.findAll({
    where: { userId },
    include: [Task],
    order: [
      ["order", "ASC"],
      [Task, "order", "ASC"],
    ],
  });
  res.send(lists);
});

app.post("/lists", async (req, res) => {
  const { userId, name } = req.body;
  const lists = await List.create({
    name: name,
    userId: userId,
    order: 1,
  });
  res.send(lists);
});

app.delete("/lists", async (req, res) => {
  const { id } = req.body;
  //this method is the only way we can get cascade to work properly
  const list = await List.findOne({ where: { id } });
  await list.destroy();

  res.send("list deleted");
});

app.get("/tasks", async (req, res) => {
  const { listId } = req.query;
  const tasks = await Task.findAll({
    where: { listId },
    order: [["order", "ASC"]],
  });
  res.send(tasks);
});

app.post("/tasks", async (req, res) => {
  const { listId, name, intervals } = req.body;
  const order = await getOrder(listId);
  try {
    const task = await Task.create({
      name: name,
      listId: listId,
      order: order,
      intervals: intervals,
    });
    res.send(task);
  } catch (err) {
    console.log({
      success: false,
      message: "Sorry, something went wrong",
      error: err,
    });
  }
  // res.send({ order: order });
});

app.delete("/tasks", async (req, res) => {
  const { id } = req.body;
  Task.destroy({ where: { id } });
  res.send("task deleted");
});

app.patch("/tasks/:taskId/:listId/:order", async (req, res) => {
  const { taskId, listId, order } = req.params;
  const updatedTask = await Task.update(
    { order: order, listId: listId },
    { where: { id: taskId } }
  );
  res.json({ success: true });
});

app.get("/join", async (req, res) => {
  const { userId } = req.query;
  const lists = await List.findAll({
    where: { userId },
    include: [Task],
    order: [
      ["order", "ASC"],
      [Task, "order", "ASC"],
    ],
  });
  res.send(lists);
});

//-----------------------------End of Routes----------------------------------

//START SERVER
app.listen(PORT, async () => {
  // db.sync({ force: true });
  console.log(`server now running on http://localhost:${PORT}!`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
