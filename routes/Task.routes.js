module.exports = (app) => {
  const task_fns = require("../controllers/Task.controllers.js");

  const router = require("express").Router();

  router.put("/", task_fns.createTask);
  router.put("/complete/:taskid", task_fns.completeTask);
  router.put("/reset/:taskid", task_fns.resetTask);

  router.get("/", task_fns.getAll);
  router.get("/:studentId", task_fns.getStudentTasks);

  app.use("/api/tasks", router);
};
