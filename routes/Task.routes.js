module.exports = (app) => {
  const task_fns = require("../controllers/Task.controllers.js");

  const router = require("express").Router();

  router.put("/:teacherId&:minigameId&:difficulty&:level", task_fns.createTask);
  router.put("/complete/:taskid", task_fns.completeTask);
  router.put("/reset/:taskid", task_fns.resetTask);

  router.get("/", task_fns.getAll);
  router.get("/student/:studentId", task_fns.getStudentTasks);
  router.get("/teacher/:teacherId&:minigameId&:difficulty&:level", task_fns.getTeacherTasksPerLevel);
  router.get("/teacher/:teacherId", task_fns.getTeacherTasks);

  app.use("/api/tasks", router);
};
