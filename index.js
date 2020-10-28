/**
 * Main file run on server startup. It creates access routes
 * @module index.js
 * @file
 *
 * @requires express
 * @requires body-parser
 * @requires ./models/index
 * @requires ./models/dataLoader
 * @requires ./routes/Student.routes
 * @requires ./routes/Teacher.routes
 * @requires ./routes/Question.routes
 * @requires ./routes/Result.routes
 */

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Set Header Content-Type = application/json (no quotes)

const db = require("./models/index.js");

db.sequelize.sync({ force: false }).then(() => {
  console.log("DB Synced");
});

const loader = require("./models/dataLoader.js");

loader(db);

// Basic API call

let count = 1;
app.get("/", (req, res) => {
  res.send(`API Call: ${count++}`);
});

require("./routes/Student.routes")(app);
require("./routes/Teacher.routes")(app);
require("./routes/Question.routes")(app);
require("./routes/Result.routes")(app);
require("./routes/Task.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
