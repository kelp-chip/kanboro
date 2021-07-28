const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const maxAge = 3 * 24 * 60 * 60;

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });
const bcrypt = require("bcryptjs");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const { sequelize, User, List, Task } = require("./database/models");
const { getTaskOrder, getListOrder } = require("./helpers/getOrder");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(process.env.CLIENT_URL));

function authenticateToken(req, res, next) {
  if (!req.query.token) res.send({ success: false }).status(401);
  const { token } = req.query;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.json({ success: false }).status(403);
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

//AUTH ROUTES------------------

app.get("/wakeserver", async (req, res) => {
  const user = await User.findOne({ where: { username: "guest" } });
  res.send(user);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user) {
    const hashedPw = user.dataValues.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPw);
    if (passwordsMatch) {
      const { id, newUser, interval_time } = user;
      const token = createToken(id, username, newUser, interval_time);
      res.send({ success: true, user: user, accessToken: token });
    } else {
      res.send({
        success: false,
        message: "username and password do not match",
      });
    }
  } else {
    res.send({ success: false, message: "username and password do not match" });
  }
});

app.post("/user", async (req, res) => {
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
        res.status(200).send({ success: true, user: newUser });
      });
    } else {
      res.send({ success: false, message: ["sorry, username already exists"] });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: ["sorry, couldn't connect to server", "please try again later"],
    });
  }
});

app.get("/user", authenticateToken, async (req, res) => {
  const user = req.user;
  res.send({ success: false, user: user });
});

// app.post("/logout", (req, res) => {
//   //clears access token cookie
//   res.clearCookie("accessToken", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     maxAge: 0,
//     path: "/",
//   });
//   res.send({ auth: "guest", user: null });
// });

//LIST ROUTES------------------

app.get("/lists/:userId", async (req, res) => {
  // res.set({ "Access-Control-Allow-Origin": process.env.CLIENT_URL });
  // res.set({ "Access-Control-Allow-Credentials": "true" });

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
});

app.post("/lists", async (req, res) => {
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

//TASK ROUTES------------------

app.get("/tasks", async (req, res) => {
  const { listId } = req.query;
  const tasks = await Task.findAll({
    where: { listId },
    order: [["order", "ASC"]],
  });
  res.send(tasks);
});

app.post("/tasks", async (req, res) => {
  const { listId, name, intervals, addToTop } = req.body;

  const order = await getTaskOrder(listId);
  try {
    //Adds task to top of list by order
    if (addToTop) {
      const prevTask = await Task.findOne({
        where: { listId },
        order: [["order", "ASC"]],
      });

      let order = prevTask ? prevTask.order / 2 : 100;
      const task = await Task.create({
        name: name,
        listId: listId,
        order: order,
        intervals: intervals,
      });
      res.send(task);

      //Adds task to bottom of list
    } else {
      const task = await Task.create({
        name: name,
        listId: listId,
        order: order,
        intervals: intervals,
      });
      res.send(task);
    }
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
  res.send("task deleted").status(200);
});

app.patch("/tasks/:taskId/:listId/:order", async (req, res) => {
  const { taskId, listId, order } = req.params;
  await Task.update(
    { order: order, listId: listId },
    { where: { id: taskId } }
  );
  res.json({ success: true });
});

app.patch("/tasks/:taskId/:intervalsCompleted", async (req, res) => {
  const { taskId, intervalsCompleted } = req.params;
  await Task.update(
    { intervals_completed: intervalsCompleted },
    { where: { id: taskId } }
  );
  res.json({ success: true });
});

app.patch("/edittasks/:taskId/:taskName/:intervals", async (req, res) => {
  const { taskId, taskName, intervals } = req.params;
  await Task.update({ intervals, name: taskName }, { where: { id: taskId } });
  const task = await Task.findOne({ where: { id: taskId } });
  res.send(task);
});

//-----------------------------End of Routes----------------------------------

//START SERVER
app.listen(process.env.PORT || PORT, async () => {
  // db.sync({ force: true }); //drops all db tables before recreating them
  console.log(`server now running on http://localhost:${PORT}!`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
