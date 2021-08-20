const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const maxAge = 3 * 24 * 60 * 60;

const path = require("path");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("./helpers/cloudinary");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

const { sequelize, User, List, Task } = require("./database/models");
const { getTaskOrder, getTaskTopOrder } = require("./helpers/getOrder");

//MIDDLEWARE
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
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

const createToken = (
  id,
  username,
  newUser,
  interval_time,
  short_break_time,
  long_break_time,
  background_url,
  avatar_url,
  alarm_sound
) => {
  return jwt.sign(
    {
      id,
      username,
      newUser,
      interval_time,
      short_break_time,
      long_break_time,
      background_url,
      avatar_url,
      alarm_sound,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: maxAge,
    }
  );
};

//ROUTES

app.get("/wakeserver", async (req, res) => {
  const user = await User.findOne({ where: { username: "guest" } });
  res.send(user);
});

//AUTH ROUTES------------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user) {
    const hashedPw = user.dataValues.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPw);
    if (passwordsMatch) {
      const {
        id,
        newUser,
        interval_time,
        short_break_time,
        long_break_time,
        background_url,
        avatar_url,
        alarm_sound,
      } = user;
      const token = createToken(
        id,
        username,
        newUser,
        interval_time,
        short_break_time,
        long_break_time,
        background_url,
        avatar_url,
        alarm_sound
      );
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
          avatar_url:
            "https://res.cloudinary.com/dli6sknqy/image/upload/v1629420818/kanboro/aad193df-6e0d-40e2-b9c7-91d79e202317.png",
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

app.patch("/user/:userId", async (req, res) => {
  const { userId: id } = req.params;
  const updatedAttributes = req.body;
  let { avatar_url: org } = await User.findOne({ where: { id } });
  await User.update(updatedAttributes, { where: { id } });
  let user = await User.findOne({ where: { id } });
  const {
    username,
    newUser,
    interval_time,
    short_break_time,
    long_break_time,
    background_url,
    avatar_url,
    alarm_sound,
  } = user;
  const token = createToken(
    id,
    username,
    newUser,
    interval_time,
    short_break_time,
    long_break_time,
    background_url,
    avatar_url,
    alarm_sound
  );

  res.send({ success: true, user: user, accessToken: token });
});

app.post("/api/upload", async (req, res) => {
  const { data: file, id } = req.body;
  try {
    const uploadedRes = await cloudinary.uploader.upload(file, {
      upload_preset: "kanboro",
      transformation: [{ width: 100 }],
      public_id: id,
      overwrite: true,
      invalidate: true,
      folder: "kanboro",
    });
    res.send(uploadedRes.secure_url);
  } catch (err) {
    console.log(err);
    res.send("something went wrong", err);
  }
});

//LIST ROUTES------------------
app.get("/lists/:userId", async (req, res) => {
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
  const { listId, name, intervals, notes, intervals_completed } = req.body;
  let task;
  if (!!intervals_completed) {
    const order = await getTaskTopOrder(listId);
    task = await Task.create({
      name: name,
      listId: listId,
      order: order,
      intervals: intervals,
      intervals_completed: intervals_completed,
      notes: notes,
    });
  } else {
    const order = await getTaskOrder(listId);
    task = await Task.create({
      name: name,
      listId: listId,
      order: order,
      intervals: intervals,
      notes: notes,
    });
  }
  res.send(task);
});

app.delete("/tasks/:taskId", async (req, res) => {
  const { taskId: id } = req.params;
  Task.destroy({ where: { id } });
  res.send("task deleted").status(200);
});

app.patch("/tasks/:taskId", async (req, res) => {
  const { taskId: id } = req.params;
  const updatedTask = req.body;
  await Task.update(updatedTask, { where: { id } });
  const task = await Task.findOne({ where: { id } });
  res.send({ success: true, task: task });
});

//-----------------------------End of Routes----------------------------------

//START SERVER
app.listen(process.env.PORT || PORT, async () => {
  // sequelize.sync({ force: true }); //drops all db tables before recreating them
  console.log(`server now running on http://localhost:${PORT}!`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
