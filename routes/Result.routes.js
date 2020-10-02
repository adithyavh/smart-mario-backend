module.exports = (app) => {
  const result_fns = require("../controllers/Result.controllers.js");

  var router = require("express").Router();

  router.put("/", result_fns.addOrUpdate);
  router.get(
    "/:studentId&:minigameId&:difficulty&:level",
    result_fns.getOneResult,
  );
  router.get("/student/:studentId", result_fns.studentResults);

  app.use("/api/results", router);
};
