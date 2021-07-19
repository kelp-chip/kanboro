const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const maxAge = 3 * 24 * 60 * 60;
const CLIENT_URL2 = "https://kanboro.netlify.app";
const CLIENT_URL = "http://localhost:3000";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { sequelize, User, List, Task } = require("./database/models");

const { getTaskOrder, getListOrder } = require("./helpers/getOrder");
const { NONE } = require("sequelize");

//MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization", ""],
  })
);
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", CLIENT_URL);
  res.set("Access-Control-Allow-Credentials", true);
  next();
});
// app.use(cors());

app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET));

function authenticateToken(req, res, next) {
  //If Token doesn't exist, deny access
  if (!req.cookies.accessToken) res.send({ auth: "guest" }).status(401);
  const token = req.cookies.accessToken;
  console.log(req.cookies.accessToken);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //403: Token is no longer valid
    if (err) res.json({ auth: "guest" }).status(403);

    //user verified
    req.user = user;
    next();
  });
}

//---------------------------End of Middleware--------------------------------

const createToken = (id, username, newUser, intervalTime) => {
  return jwt.sign(
    { id, username, newUser, intervalTime },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: maxAge,
    }
  );
};

//ROUTES

//------------------AUTH ROUTES

app.post("/login", async (req, res) => {
  // res.send({ auth: "user", user: "none" });
  const { username, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ where: { username } });
  if (user) {
    const hashedPw = user.dataValues.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPw);
    if (passwordsMatch) {
      const { id, newUser, interval_time } = user;
      const token = createToken(id, username, newUser, interval_time);
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: maxAge * 1000,
        path: "/",
      });
      res.json({ auth: "user", user: user }).status(200);
      // res.status(200);
      //   // res.end();
    } else {
      res.json({ auth: "guest", user: user, message: "Wrong password" });
    }
  } else {
    res.json({ auth: "guest", user: user, message: "Wrong username" });
  }
});

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
        console.log(newUser.id);
        const todoList = await List.create({
          name: "todo",
          userId: newUser.id,
          order: 100,
        });
        await Task.create({
          name: "create your first task",
          listId: todoList.id,
          order: 100,
          intervals: 1,
        });
        await List.create({
          name: "in progress",
          userId: newUser.id,
          order: 200,
        });
        await List.create({
          name: "completed",
          userId: newUser.id,
          order: 300,
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

app.get("/userInfo", authenticateToken, async (req, res) => {
  // app.get("/userInfo", async (req, res) => {
  const user = req.user;
  res.send({ auth: "user", user: user });
});

app.post("/logout", authenticateToken, (req, res) => {
  //removes access token cookie

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
    path: "/",
  });
  res.send({ auth: "guest", user: null });
  // const user = req.user;
  // res.json(user);
});

//------------------END OF AUTH ROUTES

app.get("/lists/:userId", authenticateToken, async (req, res) => {
  res.set({ "Access-Control-Allow-Origin": CLIENT_URL });
  res.set({ "Access-Control-Allow-Credentials": "true" });

  const { userId } = req.params;
  const lists = await List.findAll({
    where: { userId },
    include: [Task],
    order: [
      ["order", "ASC"],
      [Task, "order", "ASC"],
    ],
  });
  res.send(lists);
  // res.send(lists);
});

app.post("/lists", authenticateToken, async (req, res) => {
  const { userId, name } = req.body;
  const order = await getListOrder(userId);
  const lists = await List.create({
    name: name,
    userId: userId,
    order: order,
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

app.post("/tasks", authenticateToken, async (req, res) => {
  const { listId, name, intervals } = req.body;

  const order = await getTaskOrder(listId);
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
});

app.delete("/tasks/:taskId", async (req, res) => {
  const { taskId: id } = req.params;

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

app.get("/cats", (req, res) => {
  res.send({ luka: "you got here" });
});

//NEW USER WELCOME IN PROGRESS
// app.patch("/newUser/:userId/:username", authenticateToken, async (req, res) => {
//   const { userId, username } = req.params;
//   console.log(username);
//   if (username !== "guest") {
//     const user = await User.update(
//       { newUser: false },
//       { where: { id: userId } }
//     );
//     const token = createToken(user.id, user.username, user.newUser);
//     res.cookie("accessToken", token, {
//       httpOnly: true,
//       secure: true,
//       maxAge: maxAge * 1000,
//     });
//   }
//   res.end();
// });

// app.get("/join", async (req, res) => {
//   const { userId } = req.query;
//   const lists = await List.findAll({
//     where: { userId },
//     include: [Task],
//     order: [
//       ["order", "ASC"],
//       [Task, "order", "ASC"],
//     ],
//   });
//   res.send(lists);
// });

//-----------------------------End of Routes----------------------------------

//START SERVER
app.listen(process.env.PORT || PORT, async () => {
  // db.sync({ force: true });
  console.log(`server now running on http://localhost:${PORT}!`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
