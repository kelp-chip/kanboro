const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const db = require("./database/connect");
const models = require("./database/models");

app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  db.sync({ force: true });
  console.log(`server now running on http://localhost:${PORT}!`);
});
