module.exports = (app) => {
  const result_fns = require("../controllers/Result.controllers.js");

  var router = require("express").Router();

  router.post("/", result_fns.addResult);
  router.get("/:id", result_fns.studentResults);

  app.use("/api/results", router);
};
