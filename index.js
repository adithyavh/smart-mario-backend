// https://bezkoder.com/node-js-express-sequelize-mysql/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set Header Content-Type = application/json (no quotes)

const db = require("./models/index.js");

db.sequelize.sync({ force: false }).then(() => {
  console.log("DB Synced");
});

// Test call

let count = 1;
app.get("/", function (req, res) {
  res.send("API Call: " + count++);
});

require("./routes/Student.routes")(app);
require("./routes/Teacher.routes")(app);
require("./routes/Question.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

