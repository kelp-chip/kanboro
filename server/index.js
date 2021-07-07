const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`server now running on http://localhost:${PORT}!`);
});
